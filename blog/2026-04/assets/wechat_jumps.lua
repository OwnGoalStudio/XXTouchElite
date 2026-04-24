#!/usr/bin/env lua

-- WeChat Jump auto-player for XXTouch Elite
-- Target device: iPad7,11 (2160x1620), fixed landscape (HOME on right)

math.randomseed(sys.rnd())

-- Optional: pass max loop count from CLI, e.g. `lua wechat_jump_xxt.lua 20`
local MAX_STEPS = tonumber(arg and arg[1] or nil)

-- Runtime mode
local FIXED_ORIENTATION = 0 -- landscape, HOME on right

-- Detection parameters (hardcoded for current device)
local UNDER_GAME_SCORE_Y = 600
local PIECE_BASE_HEIGHT_HALF = 36
local PIECE_BODY_WIDTH = 110
local PIECE_SCAN_STEP_X = 2
local PIECE_SCAN_STEP_Y = 2
local BOARD_SCAN_STEP_X = 2
local BOARD_SCAN_STEP_Y = 2
local SCAN_LINE_STEP = 50
local SCAN_LINE_SAMPLE_STEP = 12
local BOARD_COLOR_DIFF = 10
local BOARD_REFINE_RADIUS = 280
local BOARD_TOP_MIN_PIXELS = 6
local BOARD_TOP_MIN_WIDTH = 18
local BOARD_TOP_BAND_HEIGHT = 18
local BOARD_REFINE_MAX_SHIFT = 260

-- Press parameters
local PRESS_COEFFICIENT = 0.92 -- press_ms = distance * coefficient
local MIN_PRESS_MS = 200
local PRESS_X_MIN_RATIO = 0.25 
local PRESS_X_MAX_RATIO = 0.75
local PRESS_Y_MIN_RATIO = 0.70
local PRESS_Y_MAX_RATIO = 0.92
local PRESS_END_JITTER = 8

-- Loop timing
local WAIT_MIN_MS = 1250
local WAIT_MAX_MS = 1500
local IDLE_RESET_EVERY = 25

-- Debug logging and screenshot dump
local DEBUG_ROOT_DIR = "/var/mobile/Media/1ferver/lua/scripts/wechat_jump_debug"
local DEBUG_FRAME_DIR = DEBUG_ROOT_DIR .. "/frames"
local DEBUG_LOG_FILE = DEBUG_ROOT_DIR .. "/jump.log"
local SAVE_FRAME_ON_DECISION = true
local SAVE_FRAME_ON_DETECT_FAIL = true

local function ensure_debug_paths()
  if file.exists(DEBUG_ROOT_DIR) ~= "directory" then
    os.execute("mkdir -p " .. DEBUG_ROOT_DIR)
  end
  if file.exists(DEBUG_FRAME_DIR) ~= "directory" then
    os.execute("mkdir -p " .. DEBUG_FRAME_DIR)
  end
end

local function log_info(fmt, ...)
  local msg = string.format(fmt, ...)
  local line = string.format("%s %s\n", os.date("%Y-%m-%d %H:%M:%S"), msg)
  sys.log(msg)
  pcall(function()
    file.appends(DEBUG_LOG_FILE, line)
  end)
end

local function save_debug_frame(tag)
  local path = string.format("%s/%s_%d.png", DEBUG_FRAME_DIR, tag, sys.mtime())
  local ok, err = pcall(function()
    screen.image():save_to_png_file(path)
  end)
  if ok then
    return path
  end
  log_info("save frame failed: tag=%s err=%s", tostring(tag), tostring(err))
  return nil
end

local function can_get_color(x, y)
  local ok = pcall(function()
    screen.keep()
    screen.get_color(x, y)
    screen.unkeep()
  end)
  if not ok then
    pcall(function() screen.unkeep() end)
  end
  return ok
end

local function oriented_size(raw_w, raw_h, orientation)
  -- In practice, screen.size() and coordinate space may differ by orientation/runtime.
  -- Probe coordinates directly and choose the valid one.
  if can_get_color(raw_w - 1, raw_h - 1) then
    return raw_w, raw_h
  end

  if can_get_color(raw_h - 1, raw_w - 1) then
    return raw_h, raw_w
  end

  -- Fallback to orientation heuristic when probing fails.
  if orientation == 1 or orientation == 2 then
    return raw_h, raw_w
  end
  return raw_w, raw_h
end

local function rgb(color)
  local r = (color >> 16) & 0xff
  local g = (color >> 8) & 0xff
  local b = color & 0xff
  return r, g, b
end

local function color_diff(c1, c2)
  local r1, g1, b1 = rgb(c1)
  local r2, g2, b2 = rgb(c2)
  return math.abs(r1 - r2) + math.abs(g1 - g2) + math.abs(b1 - b2)
end

local function find_scan_start_y(w, h)
  local scan_start_y = UNDER_GAME_SCORE_Y
  local scan_end_y = math.floor(h * 0.8)
  local found = false

  for y = UNDER_GAME_SCORE_Y, scan_end_y, SCAN_LINE_STEP do
    local last_color = screen.get_color(0, y)
    for x = SCAN_LINE_SAMPLE_STEP, w - 1, SCAN_LINE_SAMPLE_STEP do
      if screen.get_color(x, y) ~= last_color then
        scan_start_y = y - SCAN_LINE_STEP
        found = true
        break
      end
    end
    if found then
      break
    end
  end

  if scan_start_y < UNDER_GAME_SCORE_Y then
    scan_start_y = UNDER_GAME_SCORE_Y
  end
  return scan_start_y
end

local function is_board_pixel(piece_x, x, y, h, last_color)
  if math.abs(x - piece_x) < PIECE_BODY_WIDTH then
    return false
  end
  local c = screen.get_color(x, y)
  if color_diff(c, last_color) <= BOARD_COLOR_DIFF then
    return false
  end
  local y2 = y + 5
  if y2 >= h then
    y2 = h - 1
  end
  local c2 = screen.get_color(x, y2)
  return color_diff(c2, last_color) > BOARD_COLOR_DIFF
end

local function refine_board_x_by_topband(piece_x, coarse_board_x, w, h)
  local left = math.max(0, math.floor(coarse_board_x - BOARD_REFINE_RADIUS))
  local right = math.min(w - 1, math.floor(coarse_board_x + BOARD_REFINE_RADIUS))
  local scan_y_start = math.floor(h / 3)
  local scan_y_end = math.floor(h * 2 / 3)
  local top_y = nil

  for y = scan_y_start, scan_y_end, BOARD_SCAN_STEP_Y do
    local last_color = screen.get_color(0, y)
    local count = 0
    local min_x = w
    local max_x = -1
    for x = left, right, BOARD_SCAN_STEP_X do
      if is_board_pixel(piece_x, x, y, h, last_color) then
        count = count + 1
        if x < min_x then
          min_x = x
        end
        if x > max_x then
          max_x = x
        end
      end
    end
    if count >= BOARD_TOP_MIN_PIXELS and max_x >= min_x and (max_x - min_x) >= BOARD_TOP_MIN_WIDTH then
      top_y = y
      break
    end
  end

  if not top_y then
    return coarse_board_x, nil, false
  end

  local band_end_y = math.min(scan_y_end, top_y + BOARD_TOP_BAND_HEIGHT)
  local sum_x = 0
  local cnt_x = 0
  for y = top_y, band_end_y, BOARD_SCAN_STEP_Y do
    local last_color = screen.get_color(0, y)
    for x = left, right, BOARD_SCAN_STEP_X do
      if is_board_pixel(piece_x, x, y, h, last_color) then
        sum_x = sum_x + x
        cnt_x = cnt_x + 1
      end
    end
  end

  if cnt_x == 0 then
    return coarse_board_x, top_y, false
  end

  local refined_x = sum_x / cnt_x
  if math.abs(refined_x - coarse_board_x) > BOARD_REFINE_MAX_SHIFT then
    return coarse_board_x, top_y, false
  end

  return refined_x, top_y, true
end

local function find_piece_and_board(w, h)
  local piece_x_sum = 0
  local piece_count = 0
  local piece_y_max = 0

  local board_x = 0
  local coarse_board_x = 0
  local board_top_y = nil
  local board_refined = false
  local board_y = 0

  local scan_x_border = math.floor(w / 8)
  local scan_start_y = find_scan_start_y(w, h)

  for y = scan_start_y, math.floor(h * 2 / 3), PIECE_SCAN_STEP_Y do
    for x = scan_x_border, w - scan_x_border, PIECE_SCAN_STEP_X do
      local c = screen.get_color(x, y)
      local r, g, b = rgb(c)
      if r > 50 and r < 60 and g > 53 and g < 63 and b > 95 and b < 110 then
        piece_x_sum = piece_x_sum + x
        piece_count = piece_count + 1
        if y > piece_y_max then
          piece_y_max = y
        end
      end
    end
  end

  if piece_count == 0 then
    return nil, nil, nil, nil
  end

  local piece_x = piece_x_sum / piece_count
  local piece_y = piece_y_max - PIECE_BASE_HEIGHT_HALF

  local board_x_start, board_x_end
  if piece_x < w / 2 then
    board_x_start = piece_x
    board_x_end = w - 1
  else
    board_x_start = 0
    board_x_end = piece_x
  end

  for y = math.floor(h / 3), math.floor(h * 2 / 3), BOARD_SCAN_STEP_Y do
    local last_color = screen.get_color(0, y)
    local board_x_sum = 0
    local board_x_count = 0

    for x = math.floor(board_x_start), math.floor(board_x_end), BOARD_SCAN_STEP_X do
      if is_board_pixel(piece_x, x, y, h, last_color) then
        board_x_sum = board_x_sum + x
        board_x_count = board_x_count + 1
      end
    end

    if board_x_count > 0 then
      board_x = board_x_sum / board_x_count
      break
    end
  end

  if board_x == 0 then
    return nil, nil, nil, nil
  end

  coarse_board_x = board_x
  board_x, board_top_y, board_refined = refine_board_x_by_topband(piece_x, coarse_board_x, w, h)

  board_y = piece_y - math.abs(board_x - piece_x) * math.sqrt(3) / 3
  if board_y <= 0 then
    return nil, nil, nil, nil
  end

  return piece_x, piece_y, board_x, board_y, scan_start_y, coarse_board_x, board_top_y, board_refined
end

local function compute_press_ms(distance)
  local press_ms = math.floor(distance * PRESS_COEFFICIENT)
  if press_ms < MIN_PRESS_MS then
    press_ms = MIN_PRESS_MS
  end
  return press_ms
end

local function do_press(w, h, press_ms)
  local press_x = math.random(math.floor(w * PRESS_X_MIN_RATIO), math.floor(w * PRESS_X_MAX_RATIO))
  local press_y = math.random(math.floor(h * PRESS_Y_MIN_RATIO), math.floor(h * PRESS_Y_MAX_RATIO))
  local end_x = press_x + math.random(-PRESS_END_JITTER, PRESS_END_JITTER)
  local end_y = press_y + math.random(-PRESS_END_JITTER, PRESS_END_JITTER)
  touch.on(press_x, press_y):msleep(press_ms):off(end_x, end_y)
end

local function main()
  ensure_debug_paths()
  local old_orien = screen.init(FIXED_ORIENTATION)
  local raw_w, raw_h = screen.size()
  local w, h = oriented_size(raw_w, raw_h, FIXED_ORIENTATION)
  local step = 0

  log_info(
    "wechat_jump_xxt: start xt=%s ios=%s device=%s raw=%dx%d coord=%dx%d old_orien=%d fixed_orien=%d max_steps=%s coef=%.3f",
    tostring(sys.xtversion()),
    tostring(sys.version()),
    tostring(device.type()),
    raw_w,
    raw_h,
    w,
    h,
    old_orien,
    FIXED_ORIENTATION,
    tostring(MAX_STEPS),
    PRESS_COEFFICIENT
  )

  while true do
    step = step + 1
    local t0 = sys.mtime()
    local piece_x, piece_y, board_x, board_y, scan_start_y, coarse_board_x, board_top_y, board_refined

    local ok, err = pcall(function()
      screen.keep()
      piece_x, piece_y, board_x, board_y, scan_start_y, coarse_board_x, board_top_y, board_refined = find_piece_and_board(w, h)
      screen.unkeep()
    end)

    if not ok then
      pcall(function() screen.unkeep() end)
      log_info("wechat_jump_xxt: detect error: %s", tostring(err))
      break
    end

    if not (piece_x and board_x) then
      local fail_frame = nil
      if SAVE_FRAME_ON_DETECT_FAIL then
        fail_frame = save_debug_frame(string.format("detect_fail_%06d", step))
      end
      log_info("#%d detect failed, exit fail_frame=%s", step, tostring(fail_frame))
      break
    end

    do
      local dx = board_x - piece_x
      local dy = board_y - piece_y
      local distance = math.sqrt(dx * dx + dy * dy)
      local press_ms = compute_press_ms(distance)
      local decision_frame = nil
      if SAVE_FRAME_ON_DECISION then
        decision_frame = save_debug_frame(string.format("decision_%06d", step))
      end
      do_press(w, h, press_ms)

      local wait_ms = math.random(WAIT_MIN_MS, WAIT_MAX_MS)
      local cost_ms = sys.mtime() - t0
      log_info(
        "#%d piece(%.1f,%.1f) board(%.1f,%.1f) coarse_board_x=%.1f top_y=%s refined=%s scan_start_y=%d dist=%.2f press=%dms coef=%.4f frame=%s wait=%dms scan_cost=%dms",
        step, piece_x, piece_y, board_x, board_y, coarse_board_x, tostring(board_top_y), tostring(board_refined), scan_start_y, distance, press_ms, PRESS_COEFFICIENT, tostring(decision_frame), wait_ms, cost_ms
      )
      sys.msleep(wait_ms)
    end

    if step % IDLE_RESET_EVERY == 0 then
      device.reset_idle()
    end

    if MAX_STEPS and step >= MAX_STEPS then
      log_info("wechat_jump_xxt: reached max steps, exit")
      break
    end
  end

  log_info("wechat_jump_xxt: finished")
end

main()
