---
authors: lessica
tags: [touch, screen, ocr_text, find_color, testcase, lua]
---

# 一个简单的测试用例

这是一个简单的测试用例，演示了如何使用 [`touch`](/docs/lua-manual/touch) 和 [`screen`](/docs/lua-manual/screen) 模块在 iOS 设备上自动化一些任务。

<!-- truncate -->

:::note
下载多点触控手势录制文件：  
⏬ [rec_20221011184701.lua](./assets/rec_20221011184701.lua)
:::

脚本内容如下：

```lua title="a-simple-testcase.lua"
local function tapWord(word)
  local txts, details = screen.ocr_text {}
  local tapped = false
  for i, v in ipairs(txts) do
    if v == word then
      touch.tap(details[i].center[1], details[i].center[2])
      tapped = true
    end
  end
  return tapped
end

function string:startswith(start)
    return self:sub(1, #start) == start
end

touch.show_pose(true)
if not sys.language():startswith("en") then
    nLog("Set language…")
    sys.set_language("en")
    sys.sleep(10)
end

while true do
  nLog("Exit all applications…")
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
  sys.sleep(1)
  touch.tap(375, 1300)
  sys.sleep(1)
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
        {1056,2341,0xe4af0a},
        {1057,2388,0xe4af0a},
        {1105,2389,0xe4af0a},
        {1079,2366,0xe4af0a},
        {1106,2339,0xe4af0a},
        {1113,2332,0xe4af0a},
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
