---
sidebar_position: 23
---

# Web 视图模块

## Web 视图模块 - webview

### 展现一个 Web 视图 \(**webview\.show**\)

#### 声明

```lua
webview.show {  -- 所有参数皆为可选参数
  id = 视图ID,
  html = HTML内容,
  x = 原点横坐标,
  y = 原点纵坐标,
  width = 宽度,
  height = 高度,
  corner_radius = 圆角半径,
  alpha = 不透明度,
  animation_duration = 动画时间,
  rotate = 旋转角度,
  level = 窗体层级,
  opaque = 范围不透明,
  ignores_hit = 是否忽略触摸事件,
  can_drag = 是否能被拖动,
}
```

#### 字段说明

- 视图ID
  - *整数型*，*可选*，可使用不同的 **视图ID** 来同时展现多个 Web 视图。取值范围为 1 ~ 1000，默认为 `1`
- HTML内容
  - *文本型*，*可选*，默认为 **上次调用 `webview.show` 时候所设置的内容**
- 原点横坐标
  - *整数型*，*可选*，距离屏幕左侧的距离。默认为 `0`
- 原点纵坐标
  - *整数型*，*可选*，距离屏幕顶端的距离。默认为 `0`
- 宽度
  - *整数型*，*可选*，默认为 **屏幕宽度**
- 高度
  - *整数型*，*可选*，默认为 **屏幕高度**
- 不透明度
  - *实数型*，*可选*，取值范围为 0.0 ~ 1.0。默认为 `1.0`
- 圆角半径
  - *实数型*，*可选*，默认为 `0.0`
- 动画时间
  - *实数型*，*可选*，从上次状态到此次状态的动画时间。默认为 `0.0`
- 旋转角度 *实数型*，*可选*
  - 竖屏：`0.0`，默认值
  - 横屏 Home 在右：`90.0`
  - 竖屏翻转：`180.0`
  - 横屏 Home 在左：`270.0`
- 窗体层级
  - *实数型*，*可选*，默认 `1100.0`
- 范围不透明
  - *布尔型*，*可选*，默认为 `true`，即背景不透明
- 是否忽略触摸事件
  - *布尔型*，*可选*，默认为 `false`，即不忽略，此属性在 Web 视图创建后不能更改
- 是否能被拖动
  - *布尔型*，*可选*，默认为 `false`，即不能拖动

#### 说明

让 Web 视图以指定参数展现在屏幕上。如果 Web 视图已经展现，则会更新 Web 视图的参数。

此 Web 视图的界面显示方向默认为最后一次调用 [`screen.init`](./screen.md#initialize-rotated-coordinate-system-screeninit) 时设置的方向。

#### [本节示例](#示例代码)

### 隐藏一个 Web 视图 \(**webview\.hide**\)

#### 声明

```lua
webview.hide([ 视图ID ])
```

#### 参数及返回值

- 视图ID
  - *整数型*，*可选*，默认为 `1`

#### 说明

暂时隐藏一个 Web 视图。

#### [本节示例](#示例代码)

### 在一个 Web 视图上执行一段 JavaScript \(**webview\.eval**\)

#### 声明

```lua
执行结果文本 = webview.eval(JS文本[, 视图ID])
```

#### 参数及返回值

- JS文本
  - *文本型*，需要执行的 JavaScript 代码
- 视图ID
  - *整数型*，*可选*，默认为 `1`
- 执行结果文本
  - *文本型*，返回执行代码产生的返回值

#### 说明

在一个 Web 视图上执行一段 JavaScript 并获得返回值文本。

#### 示例

```lua title="webview.eval"
r = webview.eval("a = 3; b = 2; a * b;")
```

### 获取一个 Web 视图的区域及层级信息 \(**webview\.frame**\)

#### 声明

```lua
区域及层级信息表 = webview.frame([ 视图ID ])
```

#### 参数及返回值

- 视图ID
  - *整数型*，*可选*，默认为 `1`
- 区域及层级信息表 *关联表*

#### 示例

```lua title="webview.frame"
local frame = webview.frame()
sys.alert(
  "位置为：".."("..frame.x..","..frame.y..")\n"..
  "大小为：".."(w: "..frame.width..", h: "..frame.height..")\n"..
  "层级为：".."("..frame.level..")"
)
```

### 销毁一个 Web 视图 \(**webview\.destroy**\)

#### 声明

```lua
webview.destroy([ 视图ID ])
```

#### 参数及返回值

- 视图ID
  - *整数型*，*可选*，默认为 `1`

:::info
脚本结束时，会自动调用销毁所有展现过的 Web 视图。
:::

#### [本节示例](#示例代码)

## 示例代码

```lua title="webview.demo"
require("thread")(function ()  -- 启用线程模块
  local html = [==[
  <!DOCTYPE html>
  <html>
    <head>
      <script src="/js/jquery.min.js"></script>
      <script src="/js/jquery.json.min.js"></script>
      <script type="text/javascript">
        $(document).ready(function() {
          $("#toast_content").val("吐司内容");
          $("#close_page").click(function() {
            $.post("/proc_queue_push", '{"key": "来自 Web 视图的消息","value": "关闭页面"}', function() {});
          });
          $("#show_toast").click(function() {
            $.post("/proc_put", $.toJSON({
              key: "吐司内容",
              value: $("#toast_content").val()
            }), function() {});
            $.post("/proc_queue_push", '{"key": "来自 Web 视图的消息","value": "显示吐司"}', function() {});
          });
          $("#slide_down").click(function() {
            $.post("/proc_queue_push", '{"key": "来自 Web 视图的消息","value": "往下滑动"}', function() {});
            $(this).hide();
          });
          $("#full_vertical").click(function() {
            $.post("/proc_queue_push", '{"key": "来自 Web 视图的消息","value": "竖屏全屏"}', function() {});
          });
          $("#full_landscape").click(function() {
            $.post("/proc_queue_push", '{"key": "来自 Web 视图的消息","value": "横屏全屏"}', function() {});
          });
        });
      </script>
    </head>
    <body>
      <p>动脚 Web 视图演示</p>
      <p>
        <button id="close_page" type="button">点我关闭页面</button>
      </p>
      <p>
        <button id="show_toast" type="button">显示一个吐司</button>
        <input type="text" id="toast_content" />
      </p>
      <p>
        <button id="full_vertical" type="button">竖屏全屏</button>
        <button id="full_landscape" type="button">横屏全屏</button>
      </p>
      <p>
        <button id="slide_down" type="button">视图往下滑动</button>
      </p>
      <select>
        <option value="o1">第1个选项</option>
        <option value="o2">第2个选项</option>
        <option value="o3">第3个选项</option>
        <option value="o4">第4个选项</option>
      </select>
    </body>
  </html>
  ]==]
  --
  local w, h = screen.size()
  --
  local factor = 1  -- 默认高度为 2x 设备所设
  if w == 1242 or w == 1080 then
    factor = 1.5    -- iPhone 6S Plus 的分辨率是 3x 的
  elseif w == 320 or w == 768 then
    factor = 0.5    -- 3Gs 以前的 iPhone 的分辨率是 1x 的
  end
  --
  webview.show {    -- 重置 Web 视图位置到左上角
    x = 0,
    y = 0,
    width = w - 40 * factor,
    height = (500) * factor,
    alpha = 0,
    animation_duration = 0,
  }
  --
  webview.show {    -- 从左上角用 0.3 秒的时间滑动出来
    html = html,
    x = 20 * factor,
    y = 50 * factor,
    width = (w - 40 * factor),
    height = (500) * factor,
    corner_radius = 10,
    alpha = 0.7,
    animation_duration = 0.3,
  }
  --
  proc.queue_clear("来自 Web 视图的消息", "")  -- 清空需要监听的字典的值
  local eid = thread.register_event(         -- 注册监听字典状态有值事件
    "来自 Web 视图的消息",
    function(val)
      if val == "关闭页面" then
        webview.show {
          x = 20 * factor,
          y = 500 * factor * 2,
          width = (w - 40 * factor),
          height = (500 - 70) * factor,
          corner_radius = 10,
          alpha = 0,
          animation_duration = 0.8,
        }
        sys.msleep(800)
        webview.destroy()
        sys.toast("页面线程结束")
        return true                          -- 返回 true 停止当前监听
      elseif val == "往下滑动" then
        webview.show {
          x = 20 * factor,
          y = (50 + 300) * factor,           -- 纵坐标 + 300
          width = (w - 40  * factor),
          height = (500 - 70) * factor,      -- 往下滑动按钮被隐藏了，高度调整
          corner_radius = 10,
          alpha = 0.7,
          animation_duration = 0.5,          -- 耗时 0.5 秒
        }
      elseif val == "竖屏全屏" then
        webview.show {}                      -- 此处将会把 Web 视图置为全屏
      elseif val == "横屏全屏" then
        webview.show { rotate = 90 }         -- 此处将会把 Web 视图置为横屏全屏
      elseif val == "显示吐司" then
        sys.toast(proc.get("吐司内容"))
      end
    end
  )
  --
  sys.msleep(3000)
  sys.toast("主线程结束")
end)
```
