---
sidebar_position: 20
---

# 线程模块

## 线程模块 - thread

线程模块使用 Lua 自带协程 [`coroutine`](https://cloudwu.github.io/lua53doc/manual.html#2.6) 实现，非通常意义上的多线程。  
在 XXTouchNG 中，线程模块 **默认关闭**。如要启用此模块，需要将代码块以如下形式包裹：

```lua
require("thread")(function ()
  -- 代码块
end)
```

:::note 已实现 **让出** 的函数或模块

- [`sys.sleep`](sys.md#-秒级延迟-syssleep) 和 [`sys.msleep`](sys.md#-毫秒级延迟-sysmsleep)
- [`touch:msleep`](touch.md#-毫秒级延迟-touchmsleep)
- [HTTP 模块](http.md)
- [FTP 模块](ftp.md)
:::

### 派发一个任务 \(**thread\.dispatch**\)

#### 声明

```lua
任务ID = thread.dispatch(任务函数[, 错误回调])
```

#### 参数及返回值

- 任务函数
  - *函数型*，将加入任务队列
- 错误回调
  - *函数型*，*可选*，当执行 **任务函数** 时发生异常，则会回调这个函数并不再抛出。默认在异常时抛出错误
- 任务ID
  - *整数型*，记录此值以用于后续结束或是等待 **任务**

#### 说明

派发一个 **任务** 到 RunLoop 队列，当其他任务空闲时则会开始此项 **任务**。

### 获取当前任务的 ID \(**thread\.current\_id**\)

#### 声明

```lua
任务ID = thread.current_id()
```

#### 参数及返回值

- 任务ID
  - *整数型*，记录此值以用于后续结束或是等待 **任务**

### 从队列中移除一项任务 \(**thread\.kill**\)

#### 声明

```lua
thread.kill(任务ID)
```

#### 参数及返回值

- 任务ID
  - *整数型*，先前派发任务时返回的 **任务ID**

#### 说明

从 RunLoop 队列中移除一项任务，不管它是否已经开始，是否已经完成。

### 阻塞等待一个任务完成 \(**thread\.wait**\)

#### 声明

```lua
thread.wait(任务ID, 超时秒)
```

#### 参数及返回值

- 超时秒
  - *实数型*，等待超时时间，超时后将返回。单位：秒
- 任务ID
  - *整数型*，先前派发任务时返回的 **任务ID**

#### 说明

阻塞当前线程，以等待至少一个任务完成。

### 注册监听一个事件 \(**thread\.register\_event**\)

#### 声明

```lua
事件监听ID = thread.register_event(事件名称, 事件回调[, 错误回调])
```

#### 参数及返回值

- 事件名称
  - *文本型*，详见 [可用的事件名称](#可用的事件名称)
- 事件回调
  - *函数型*，事件发生时将会触发执行的回调函数
- 错误回调
  - *函数型*，*可选*，当执行 **事件回调** 时发生异常，则会回调这个函数并不再抛出。默认在异常时抛出错误
- 事件监听ID
  - *整数型*，记录此值以用于后续反注册监听该事件

### 反注册监听一个事件 \(**thread\.unregister\_event**\)

#### 声明

```lua
事件监听ID = thread.unregister_event(事件名称, 事件监听ID)
```

#### 参数及返回值

- 事件名称
  - *文本型*，详见 [可用的事件名称](#可用的事件名称)
- 事件监听ID
  - *整数型*，先前注册监听时返回的 **事件监听ID**

## 示例代码

```lua title="thread.runloop"
require("thread")(function ()
  tmid = thread.dispatch(function ()  -- 派发一个异步任务
    sys.msleep(2700)
    sys.toast("这是第 2.7 秒")
  end)
  --
  tid = thread.dispatch(function ()   -- 派发一个异步任务
    sys.msleep(300)
    for i=1,10 do
      sys.toast("线程 " .. thread.current_id() .. ": "..i)
      sys.msleep(1000)
    end
    sys.toast("应该运行不到这里")
  end)
  --
  -- iPhone 5C 双指合拢缩小相册图片示例
  --
  thread.dispatch(function ()         -- 派发一个滑动任务
    touch.on(59,165)
      :move(297,522)
      :msleep(500)
      :off()
  end)
  --
  thread.dispatch(function ()         -- 再派发一个滑动任务
    touch.on(580,1049)
      :move(371,1049)
      :msleep(500)
      :off()
  end)
  --
  proc.queue_clear("来自远方的消息")
  eid = thread.register_event(        -- 注册监听字典状态有值事件
    "来自远方的消息",
    function (val)
      sys.toast("收到消息："..val)
    end
  )
  --
  sys.msleep(300)
  thread.wait(tmid)
  --
  for i=1,10 do
    sys.toast("线程 " .. thread.current_id() .. ": "..i)
    sys.msleep(400)
  end
  --
  thread.kill(tid)  -- 杀死 线程 2
  thread.unregister_event("来自远方的消息", eid)  -- 取消一个字典状态有值事件
  --
  sys.toast("完了")
end)
```

## 可用的事件名称

本节列出了可用于 [`thread.register_event`](#注册监听一个事件-threadregister_event) 和 [`thread.unregister_event`](#反注册监听一个事件-threadunregister_event) 的事件名称。

### 电话呼入呼出 \(**xxtouch\.callback\.call**\)

#### 声明

```lua
thread.register_event("xxtouch.callback.call", function (val)
  if val == "in" then
    -- 来电
  elseif val == "out" then
    -- 去电
  elseif val == "disconnected" then
    -- 来电或去电挂断
  end
end)
```

#### 示例

```lua title="xxtouch.callback.call"
require("thread")(function ()
  --
  -- 清空消息队列
  proc.queue_clear("xxtouch.callback.call")
  --
  sys.toast("脚本从现在开始监听来电事件，二十秒后取消监听")
  --
  -- 开始建立监听回调
  local eid = thread.register_event("xxtouch.callback.call", function(val)
    if val == "in" then
      sys.toast("来电话了")
    elseif val == "out" then
      sys.toast("正在打电话出去")
    elseif val == "disconnected" then
      sys.toast("电话挂断了")
    end
  end)
  --
  sys.sleep(20)  -- 等待 20 秒
  --
  -- 反注册回调函数，如果不反注册监听，那么脚本不会在此结束
  thread.unregister_event("xxtouch.callback.call", eid)
end)
```

### Activator 事件 \(**xxtouch\.callback\.activator**\)

#### 声明

```lua
thread.register_event("xxtouch.callback.activator", function (val)
  local ret = json.decode(val)
  sys.toast("mode: " .. ret.mode .. "\n"  -- 事件类型
        ..  "name: " .. ret.name .. "\n"  -- 事件名称
        ..  "time: " .. ret.time)         -- 发生时间
end)
```

#### 说明

  1. 安装 [Activator](http://cydia.saurik.com/package/libactivator/)
  2. 注销后从主屏幕进入 Activator
  3. 将 “脚本事件回调” 触发器配置给一个或多个事件
  4. 在脚本中注册 `xxtouch.callback.activator` 事件的监听
  5. 手动触发上述事件
  6. 在脚本中处理事件回调消息

#### 示例

```lua title="xxtouch.callback.activator"
require("thread")(function ()
  --
  -- 清空消息队列
  proc.queue_clear("xxtouch.callback.activator")
  --
  -- 开始建立监听回调
  local eid = thread.register_event("xxtouch.callback.activator", function(val)
    local ret = json.decode(val)
    if ret.event == "libactivator.statusbar.tap.double" then
        sys.toast("双击状态栏回调")
    end
  end)
  --
  sys.sleep(20)  -- 等待 20 秒
  --
  -- 反注册回调函数，如果不反注册监听，那么脚本不会在此结束
  thread.unregister_event("xxtouch.callback.activator", eid)
end)
```

### HID 事件 \(**xxtouch\.callback\.hid**\)

#### 声明

```lua
thread.register_event("xxtouch.callback.hid", function (val)
  local event = json.decode(val)
  if event.event_type == "touch" then
    if event.event_name == "touch.on" then
      sys.toast("触摸接触位置: (" .. event.x .. ", " .. event.y .. ")\n" .. event.time)
    elseif event.event_name == "touch.move" then
      sys.toast("触摸移动到位置: (" .. event.x .. ", " .. event.y .. ")\n" .. event.time)
    elseif event.event_name == "touch.off" then
      sys.toast("触摸从位置: (" .. event.x .. ", " .. event.y .. ") 离开屏幕\n" .. event.time)
    end
  else
    if event.event_name == "key.down" then
      sys.toast("按下按键: " .. event.key_name .. "\n" .. event.time)
    elseif event.event_name == "key.up" then
      sys.toast("抬起按键: " .. event.key_name .. "\n" .. event.time)
    end
  end
end)
```

:::info
此事件中的坐标以 **竖屏 HOME 在下** 为初始坐标系。  
可以使用 [`screen.rotate_xy`](screen.mdx#坐标旋转转换-screenrotate_xy) 进行转换。
:::

#### 示例

```lua title="xxtouch.callback.hid"
require("thread")(function ()
  --
  -- 清空消息队列
  proc.queue_clear("xxtouch.callback.hid")
  --
  -- 建立监听回调
  local eid = thread.register_event("xxtouch.callback.hid", function (val)
    local event = json.decode(val)
    if event.event_type == "touch" then
      if event.event_name == "touch.on" then
        sys.toast("触摸接触位置: (" .. event.x .. ", " .. event.y .. ")\n" .. event.time)
      elseif event.event_name == "touch.move" then
        sys.toast("触摸移动到位置: (" .. event.x .. ", " .. event.y .. ")\n" .. event.time)
      elseif event.event_name == "touch.off" then
        sys.toast("触摸从位置: (" .. event.x .. ", " .. event.y .. ") 离开屏幕\n"..event.time)
      end
    else
      if event.event_name == "key.down" then
        sys.toast("按下按键: " .. event.key_name .. "\n" .. event.time)
      elseif event.event_name == "key.up" then
        sys.toast("抬起按键: " .. event.key_name .. "\n" .. event.time)
      end
    end
  end)
  --
  touch.on(100, 100):off()
  sys.msleep(1000)
  key.press('HOMEBUTTON')
  --
  sys.sleep(20)  -- 等待 20 秒
  --
  -- 反注册回调函数，如果不反注册监听，那么脚本不会在此结束
  thread.unregister_event("xxtouch.callback.hid", eid)
end)
```
