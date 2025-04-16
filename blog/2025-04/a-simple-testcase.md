---
authors: lessica
tags: [touch, screen, ocr_text, find_color, testcase, lua]
---

# A Simple Testcase

This is a simple testcase that demonstrates how to use the [`touch`](/docs/lua-manual/touch) and [`screen`](/docs/lua-manual/screen) modules in Lua to automate some tasks on an iOS device.

<!-- truncate -->

The script performs the following actions:

```lua title="a-simple-testcase.lua"
local function tapWord(word)
  local txts, details =
    screen.ocr_text {
      languages = {"en-US"},
      words = {word},
      confidence = 0.8
    }
  local tapped = false
  for i, v in ipairs(txts) do
    if v == word then
      touch.tap(details[i].center[1], details[i].center[2])
      tapped = true
    end
  end
  return tapped
end

while true do
  nLog("Exit all applications…")
  touch.show_pose(true)
  app.quit("*")
  sys.sleep(2)

  nLog("Open “Settings”…")
  app.run("com.apple.Preferences")
  sys.sleep(2)

  nLog("Test gestures…")
  for _ = 1, 5 do
    touch.on(375, 1300):move(375, 275):step_delay(20):step_len(1):move(375, 255):off()
    sys.sleep(1)
  end
  sys.sleep(2)

  nLog("Exit all applications…")
  app.quit("*")
  sys.sleep(2)

  nLog("Open “Photos”…")
  app.run("com.apple.mobileslideshow")
  sys.sleep(2)

  nLog("Test multi-touch gestures…")
  assert(app.front_bid() == "com.apple.mobileslideshow")
  require("rec_20221011184701")
  sys.sleep(2)

  nLog("Exit all applications…")
  app.quit("*")

  nLog("Open “Notes”…")
  app.run("com.apple.mobilenotes")
  sys.sleep(2)

  nLog("Test hardware keyboard simulation…")
  assert(app.front_bid() == "com.apple.mobilenotes")
  x, y =
    screen.find_color(
      {
        {713, 1497, 0xe3ae09, 90.00}, -- 1
        {688, 1522, 0xe3ae09, 90.00}, -- 2
        {698, 1501, 0xe3ae09, 90.00}, -- 3
        {674, 1518, 0xe3ae09, 90.00}, -- 4
        {692, 1536, 0xe3ae09, 90.00}, -- 5
        {709, 1512, 0xe3ae09, 90.00}, -- 6
        {698, 1506, 0xffffff, 90.00}, -- 7
        {704, 1513, 0xffffff, 90.00}, -- 8
        {678, 1506, 0xffffff, 90.00}, -- 9
        {678, 1532, 0xffffff, 90.00}, -- 10
        {704, 1532, 0xffffff, 90.00} -- 11
      }
    )
  if x > -1 then
    touch.tap(x, y)
    sys.sleep(2)

    key.send_text("Hello, World!")
    sys.sleep(2)

    assert(tapWord("Done"))
  end
  sys.sleep(2)

  nLog("Exit all applications…")
  app.quit("*")

  sys.sleep(5)
end
```
