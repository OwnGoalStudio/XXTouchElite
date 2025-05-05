---
sidebar_position: 2
---

# 设备模块

## 设备模块 - device

### 重置自动锁屏倒计时 \(**device\.reset\_idle**\)

#### 声明

```lua
device.reset_idle()
```

#### 说明

重置自动锁屏倒计时（使屏幕常亮）。

:::caution 性能
不推荐太高频率使用此函数，太高频率（每秒超过 `10` 次）使用此函数可能导致服务崩溃或系统崩溃。
:::

#### 示例

```lua title="device.reset_idle"
thread.dispatch(function()
  while 1 do
    device.reset_idle()
    sys.msleep(29 * 1000)
  end
end)  -- 派发一个每 29 秒重置 IDLE 倒计时的任务
```

### 锁定、解锁屏幕 \(**device\.lock,unlock\_screen/device\.is\_screen\_locked**\)

#### 声明

```lua
device.lock_screen()                -- 锁定屏幕
device.unlock_screen([ 锁屏密码 ])    -- 解锁屏幕
是否锁屏 = device.is_screen_locked()  -- 获取屏幕锁定状态
```

#### 参数及返回值

- 锁屏密码
  - *文本型*，*可选*，如果没有设置锁屏密码则不填
- 是否锁屏 *布尔型*

#### 示例

```lua title="device.is_screen_locked"
if device.is_screen_locked() then
  -- 屏幕已锁定
else
  -- 屏幕是解锁状态
end
```

### 获取前台应用的画面方向 \(**device\.front\_orien**\)

#### 声明

```lua
旋转状态 = device.front_orien()
```

#### 参数及返回值

- 旋转状态 *整数型*
  - 返回 `0` 表示 home 在下
  - 返回 `1` 表示 home 在右
  - 返回 `2` 表示 home 在左
  - 返回 `3` 表示 home 在上
  - 返回 `4` 表示 出错了

#### 示例

```lua title="device.front_orien"
sys.toast('这个提示会以前台应用的旋转方向显示', device.front_orien())
```

### 锁定、解锁设备屏幕旋转 \(**device\.lock,unlock\_orien/device\.is\_orien\_locked**\)

#### 声明

```lua
device.lock_orien()                -- 锁定屏幕旋转
device.unlock_orien()              -- 解锁屏幕旋转
是否锁定 = device.is_orien_locked()  -- 获取屏幕旋转锁定状态
```

#### 参数及返回值

- 是否锁定 *布尔型*

#### 示例

```lua title="device.is_orien_locked"
if device.is_orien_locked() then
  -- 屏幕旋转已锁定
else
  -- 屏幕旋转没锁定
end
```

### 振动设备 \(**device\.vibrator**\)

#### 声明

```lua
device.vibrator()
```

#### 说明

振我一下（没有振动马达的设备不能振）。

### 后台播放声音 \(**device\.play\_sound**\)

#### 声明

```lua
device.play_sound(声音文件路径[, 是否异步播放])
```

#### 参数及返回值

- 声音文件路径
  - *文本型*，声音文件的绝对路径，支持 `mp3`、`wav`、`aac` 等音频格式
- 是否异步播放
  - *布尔型*，*可选*，如果不填则默认为 `false`，即同步播放

#### 说明

后台播放一段声音。

:::note
以异步方式调用此函数时，不会影响脚本运行。播放的声音会在脚本结束时停止，如果脚本需要播放完整声音，请做好延迟退出。
:::

#### 示例

```lua title="device.play_sound"
device.play_sound("/var/mobile/十年.mp3", true)  -- 异步播放
sys.msleep(205 * 1000)  -- 等待 205 秒（3 分 25 秒）
```

### 获取设备类型 \(**device\.type**\)

#### 声明

```lua
设备类型 = device.type()
```

#### 参数及返回值

- 设备类型
  - *文本型*，`"iPhone3,1"` 这种形式的字符串

#### 示例

```lua title="device.type"
if device.type() == "iPhone3,1" then
  -- 是 iPhone 4
end
```

### 获取、设置设备名 \(**device\.name/device\.set\_name**\)

#### 声明

```lua
设备名 = device.name()   -- 获取设备名
device.set_name(设备名)  -- 设置设备名
```

#### 参数及返回值

- 设备名 *文本型*

#### 说明

设备名，是用户在 **设置** -> **通用** -> **关于** 给设备取的名字。

#### 示例

```lua title="device.name"
device.set_name("iPhavonz")  -- 设置设备名为 “iPhavonz”
sys.alert("设备的名字是："..device.name())
```

### 获取设备UDID \(**device\.udid**\)

#### 声明

```lua
udid = device.udid()
```

#### 参数及返回值

- udid *文本型*

#### 说明

[UDID 参考资料](https://www.theiphonewiki.com/wiki/UDID)

#### 示例

```lua title="device.udid"
sys.alert("设备的 UDID 是："..device.udid())
```

### 获取设备的序列号 \(**device\.serial\_number**\)

#### 声明

```lua
序列号 = device.serial_number()
```

#### 参数及返回值

- 序列号 *文本型*

#### 示例

```lua title="device.serial_number"
sys.alert("设备的序列号是："..device.serial_number())
```

### 获取设备的 Wi-Fi MAC 地址 \(**device\.wifi\_mac**\)

#### 声明

```lua
歪坏麦克 = device.wifi_mac()
```

#### 参数及返回值

- 歪坏麦克 *文本型*

#### 示例

```lua title="device.wifi_mac"
sys.alert("设备的 Wi-Fi MAC 地址是："..device.wifi_mac())
```

### 获取设备的蓝牙 MAC 地址 \(**device\.bluetooth\_mac**\)

#### 声明

```lua
布鲁提麦克 = device.bluetooth_mac()
```

#### 参数及返回值

- 布鲁提麦克 *文本型*

### 获取设备所有的接口 IP \(**device\.ifaddrs**\)

#### 声明

```lua
接口信息数组 = device.ifaddrs()
```

#### 参数及返回值

- 接口信息数组
  - *顺序表*，结构如下

```lua
{ {"接口名1", "IP1"}, {"接口名2", "IP2"}, ... }
```

#### 说明

获取设备所有的接口 IP。

#### 示例

```lua title="device.ifaddrs"
-- 获取设备的 Wi-Fi IP
local ip = "没开 Wi-Fi"
for i,v in ipairs(device.ifaddrs()) do
  if (v[1]=="en0") then
    ip = v[2]
  end
end
sys.alert(ip)
```

### 获取当前设备电池剩余电量 \(**device\.battery\_level**\)

#### 声明

```lua
电量 = device.battery_level()
```

#### 参数及返回值

- 电量
  - *实数型*，电池剩余电量，范围 0.0 ~ 1.0

#### 示例

```lua title="device.battery_level"
sys.alert("当前设备电池剩余电量："..(device.battery_level() * 100).."%")
```

### 获取当前设备充电状态 \(**device\.battery\_state**\)

#### 声明

```lua
充电状态 = device.battery_state()
```

#### 参数及返回值

- 充电状态 *文本型*
  - 返回 `"Full"` 表示连接了电源并已经充满
  - 返回 `"Charging"` 表示连接了电源并正在充电中
  - 返回 `"Unplugged"` 表示没有接电源
  - 返回 `"Unknown"` 表示未知状态

#### 示例

```lua title="device.battery_state"
状态表 = {
  Full = "连接并已充满",
  Charging = "连接并在充电",
  Unplugged = "没插电源",
  Unknown = "未知状态",
}
--
sys.alert("当前设备电池充电状态："..状态表[device.battery_state()])
```

### 打开、关闭设备 Wi-Fi \(**device\.turn\_on,off\_wifi**\)

#### 声明

```lua
device.turn_on_wifi()          -- 打开 Wi-Fi
device.turn_off_wifi()         -- 关闭 Wi-Fi
开关状态 = device.is_wifi_on()  -- 获取 Wi-Fi 开关状态
```

#### 参数及返回值

- 开关状态 *布尔型*

### 打开、关闭设备蜂窝数据 \(**device\.turn\_on,off\_data**\)

#### 声明

```lua
device.turn_on_data()         -- 打开蜂窝数据
device.turn_off_data()        -- 关闭蜂窝数据
开关状态 = device.is_data_on()  -- 获取蜂窝数据开关状态
```

#### 参数及返回值

- 开关状态 *布尔型*

### 打开、关闭设备蓝牙 \(**device\.turn\_on,off\_bluetooth**\)

#### 声明

```lua
device.turn_on_bluetooth()         -- 打开蓝牙
device.turn_off_bluetooth()        -- 关闭蓝牙
开关状态 = device.is_bluetooth_on()  -- 获取蓝牙开关状态
```

#### 参数及返回值

- 开关状态 *布尔型*

### 打开、关闭设备飞行模式 \(**device\.turn\_on,off\_airplane**\)

#### 声明

```lua
device.turn_on_airplane()         -- 打开飞行模式
device.turn_off_airplane()        -- 关闭飞行模式
开关状态 = device.is_airplane_on()  -- 获取飞行模式开关状态
```

#### 参数及返回值

- 开关状态 *布尔型*

### 连接、断开当前所选 VPN \(**device\.turn\_on,off\_vpn**\)

#### 声明

```lua
device.turn_on_vpn()         -- 连接当前所选 VPN
device.turn_off_vpn()        -- 断开当前已连接的 VPN
开关状态 = device.is_vpn_on()  -- 获取 VPN 开关状态
```

#### 参数及返回值

- 开关状态 *布尔型*

#### 说明

- 尝试连接到所选 VPN，如果没选，则什么也不发生。
- 尝试断开已经连上的 VPN 连接，如果当前没有尝试连接或已经连接的 VPN 则什么也不发生。
- 当 VPN 正在连接（还没有连接成功）的时候，**开关状态** 为 `true`。

:::tip
推荐使用 [`vpnconf`](./vpnconf.md) 模块。
:::

#### 示例

```lua title="device.is_vpn_on"
while true do
  local is_on, stat = device.is_vpn_on()
  if is_on then
    sys.toast(stat)
  else
    device.turn_on_vpn()
  end
end
```

### 打开、关闭设备闪光灯 \(**device\.flash\_on,off**\)

#### 声明

```lua
操作成败 = device.flash_on()     -- 打开闪光灯
操作成败 = device.flash_off()    -- 关闭闪光灯
是否开启 = device.is_flash_on()  -- 获取闪光灯开关状态
```

#### 参数及返回值

- 操作成败
  - *布尔型*，设备是否可以打开相机并且有闪光灯硬件
- 是否开启 *布尔型*

#### 说明

打开设备闪光灯，脚本终止的时候，由脚本启动的闪光灯会自动关闭。

#### 示例

```lua title="device.flash_off"
if device.flash_off() then
  -- 设备有闪光灯
else
  -- 设备没闪光灯
end
```

### 获取、设置背光亮度 \(**device\.brightness/device\.set\_brightness**\)

#### 声明

```lua
亮度 = device.brightness()   -- 获取背光亮度
device.set_brightness(亮度)  -- 设置背光亮度
```

#### 参数及返回值

- 亮度
  - *实数型*，范围 0.0 ~ 1.0

#### 说明

设置背光亮度会关闭设备的自动调整背光功能。

#### 示例

```lua title="device.set_brightness"
sys.toast(device.brightness())
for i = 1, 10 do
  device.set_brightness(i/10)
  sys.msleep(200)
end
for i = 10, 5, -1 do
  device.set_brightness(i/10)
  sys.msleep(200)
end
```

### 获取、设置自动锁屏分钟数 \(**device\.autolock\_time/device\.set\_autolock\_time**\)

#### 声明

```lua
分钟数 = device.autolock_time()   -- 获取自动锁屏分钟数
device.set_autolock_time(分钟数)  -- 设置自动锁屏分钟数
```

#### 参数及返回值

- 分钟数
  - *整数型*，设置 `<= 0` 则永不锁屏

#### 说明

只能设置为设备有的分钟等级。

#### 示例

```lua title="device.set_autolock_time"
device.set_autolock_time(0)  -- 永不锁屏
```

### 设置设备音量 \(**device\.set\_volume**\)

#### 声明

```lua
device.set_volume(音量)
```

#### 参数及返回值

- 音量
  - *实数型*，范围 0.0 ~ 1.0

#### 示例

```lua title="device.set_volume"
device.set_volume(0)  -- 设备静音
```

### 获取、设置设备静音 \(**device\.is\_mute\_on/device\.mute\_on,off**\)

#### 声明

```lua
是否静音 = device.is_mute_on()  -- 获取设备静音状态
device.mute_on()               -- 开启设备静音
device.mute_off()              -- 关闭设备静音
```

#### 参数及返回值

- 是否静音 *布尔型*

### 扫描无线接入点 \(**device\.scan\_wifi**\)

#### 声明

```lua
接入点列表 = device.scan_wifi()
```

#### 参数及返回值

- 接入点列表
  - *顺序表*，结构如下

```lua
{ {"SSID1", "BSSID1"}, {"SSID2", "BSSID2"}, ... }
```

### 加入到一个无线接入点 \(**device\.join\_wifi**\)

#### 声明

```lua
操作成败 = device.join_wifi(SSID, 密码[, 安全类型, 超时时间])
```

#### 参数及返回值

- SSID *文本型*
- 密码 *文本型*
- 安全类型 *枚举型*，*可选*
  - `0` 表示不加密网络
  - `1` 表示有密码网络，如果密码不为空，那么为默认值
- 超时时间
  - *整数型*，*可选*，连接超时时间，单位毫秒，默认为 `5000`，即 `5` 秒

#### 说明

同步阻塞脚本直到加入成功或者失败。

#### 示例

```lua title="device.join_wifi"
joined = device.join_wifi('Tenda_9B3F', '12345678')
if joined then
  sys.toast('无线接入点 Tenda_9B3F 加入成功')
else
  sys.toast('无线接入点 Tenda_9B3F 加入失败')
end
```

### 退出、遗忘无线接入点 \(**device\.leave,forget\_wifi**\)

#### 声明

```lua
device.leave_wifi([ 是否遗忘 ])  -- 退出无线接入点
device.forget_wifi(SSID)        -- 遗忘无线接入点
```

#### 参数及返回值

- 是否遗忘
  - *布尔型*，*可选*，是否遗忘当前连接的无线接入点，默认为 `false`，即不遗忘
- SSID *文本型*

#### 说明

不能调用 `device.forget_wifi` 直接遗忘当前连接的无线接入点，会重新记住并连接。

#### 示例

```lua title="device.leave_wifi"
device.leave_wifi(true)  -- 退出并遗忘当前连接的无线接入点
```
