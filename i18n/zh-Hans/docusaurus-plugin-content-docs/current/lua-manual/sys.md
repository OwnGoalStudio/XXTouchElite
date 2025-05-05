---
sidebar_position: 1
---

# 系统模块

## 系统模块 - sys

标有 🚥 的函数在 [**线程模块**](thread.md) 中会发生 **让出**。在这些函数调用返回之前，其他的 **线程** 可能会得到运行机会。

### 显示提示文字 \(**sys\.toast**\)

#### 声明

```lua
sys.toast(文字内容[, 旋转方向])
```

#### 参数及返回值

- 文字内容
  - *文本型*，代表需要显示的文字
- 旋转方向
  - *整数型*，*可选*，屏幕旋转方向，默认为最后一次调用 [`screen.init`](screen.md#初始化旋转坐标系-screeninit) 所设置的方向
    - `0` 表示竖屏 home 在下
    - `1` 表示横屏 home 在右
    - `2` 表示横屏 home 在左
    - `3` 表示竖屏 home 在上
    - `-1` 表示立刻隐藏提示文字

#### 说明

在当前旋转坐标系的屏幕下方显示提示文字。

:::info
异步进行，提示文字总计显示时间约为 2.8 秒，会影响取色，不会拦截点击。
:::

#### 示例 1

```lua title="sys.toast"
-- 显示一个 toast
sys.toast("果断 hello world")
```

#### 示例 2

```lua title="sys.toast"
-- 实时显示当前日期时间
while true do
  sys.toast("默认长按音量键可停止脚本\n\n"..os.date("%Y年%m月%d日%H点%M分%S秒"), device.front_orien())
  sys.msleep(1000)
end
```

### 弹出系统提示 \(**sys\.alert**\)

#### 声明

```lua
选择 = sys.alert(文字内容[, 自动消失秒数, 标题, 按钮0标题, 按钮1标题, 按钮2标题])
```

#### 参数及返回值

- 文字内容 *文本型*
- 自动消失秒数
  - *实数型*，*可选*，单位秒，设置 `0` 不自动消失，默认 `0`
- 标题
  - *文本型*，*可选*，默认标题为 `"脚本提示"`
- 按钮0（取消按钮）标题
  - *文本型*，*可选*，默认按钮的标题，默认为 `"好"`
- 按钮1标题
  - *文本型*，*可选*，额外的第 1 个按钮标题，默认不显示
- 按钮2标题
  - *文本型*，*可选*，额外的第 2 个按钮标题，默认不显示
- 选择
  - *整数型*
    - 返回 `0` 选择了 *按钮0（取消按钮）*
    - 返回 `1` 选择了 *按钮1*
    - 返回 `2` 选择了 *按钮2*
    - 返回 `3` 超时自动消失
    - 返回 `71` 代表春板 `SpringBoard` 挂了

#### 说明

弹出一个系统提示对话框，最多可以有 3 个按钮，阻塞所有线程等待返回。

#### 示例

```lua title="sys.alert"
local choice = sys.alert('你现在将要干啥？', 10, '你的选择', '取消', '吃饭', '睡觉')
if choice == 0 then
  sys.alert('你选择 ‘取消’')
elseif choice == 1 then
  sys.alert('你选择 ‘吃饭’')
elseif choice == 2 then
  sys.alert('你选择 ‘睡觉’')
elseif choice == 3 then
  sys.alert('你没有选择，超时了')
else
  sys.alert('春板挂了')
end
```

### 弹出输入提示 \(**sys\.input\_box**\)

#### 说明

弹出一个系统输入对话框，最多可以有 3 个按钮，2 个文本框，阻塞所有线程等待返回。  
默认标题为 `"脚本提示"`。

#### 示例

```lua title="sys.input_box"
输入的内容 = sys.input_box("描述内容")
--
输入的内容 = sys.input_box("标题", "这是描述内容")
--
输入的内容 = sys.input_box("标题", "这是描述内容", 0)
--
输入的内容 = sys.input_box("标题", "描述内容", "文本框阴影提示", 0)
--
输入的内容 = sys.input_box("标题", "描述内容", "文本框阴影提示", "文本框里面的内容", 0)
--
输入的内容 = sys.input_box("标题", "描述内容", "文本框阴影提示", "文本框里面的内容", "默认按钮标题", 0)
--
输入的内容, 做出的选择 = sys.input_box("标题", "描述内容", "文本框阴影提示", "文本框里面的内容", "默认按钮标题", "按钮1标题", 0)
--
输入的内容, 做出的选择 = sys.input_box("标题", "描述内容", "文本框阴影提示", "文本框里面的内容", "默认按钮标题", "按钮1标题", "按钮2标题", 0)
--
输入的内容1, 输入的内容2 = sys.input_box("标题", "描述内容", {"文本框1阴影提示", "文本框2阴影提示"}, 0)
--
输入的内容1, 输入的内容2 = sys.input_box("标题", "描述内容", {"文本框1阴影提示", "文本框2阴影提示"}, {"文本框1里面的内容", "文本框2里面的内容"}, 0)
--
输入的内容1, 输入的内容2, 做出的选择 = sys.input_box("标题", "描述内容", {"文本框1阴影提示", "文本框2阴影提示"}, {"文本框1里面的内容", "文本框2里面的内容"}, "默认按钮标题", "按钮1标题", "按钮2标题", 0)
```

### 输入文字 \(**sys\.input\_text**\)

#### 声明

```lua
sys.input_text(文字内容[, 输入完成按回车])
```

#### 参数及返回值

- 文字内容
  - *文本型*，需要输入的文字，**不支持** `"\b"`（退格键）
- 输入完成按回车
  - *布尔型*，*可选*，是否在输入完毕后按下键盘上的回车键（发送、搜索等），默认 `false`

#### 说明

在前台程序的可以输入文本的地方输入文字。

:::note
此函数原理为先将文本写入剪贴板，然后调用粘贴快捷键（**Command \+ V**）粘贴文本。
:::

:::caution
调用此函数会覆盖剪贴板，请注意在调用之前备份好剪贴板中的重要数据。
:::

#### 示例

```lua title="sys.input_text"
sys.input_text("我爱你")  -- 在当前光标所在文本框输入 “我爱你”
--
sys.input_text("我爱你", true)  -- 在聊天界面输入 “我爱你” 然后按下回车发送出去
```

### 🚥 秒级延迟 \(**sys\.sleep**\)

#### 声明

```lua
sys.sleep(秒数)
```

#### 参数及返回值

- 秒数
  - *实数型*，需要延迟等待的时间，单位秒

#### 说明

让当前线程阻塞等待一定时间。

#### 示例

```lua title="sys.sleep"
sys.sleep(10)  -- 等待 10 秒
```

### 🚥 毫秒级延迟 \(**sys\.msleep**\)

#### 声明

```lua
sys.msleep(毫秒数)
```

#### 参数及返回值

- 毫秒数
  - *实数型*，需要延迟等待的时间，单位毫秒

#### 说明

让当前线程阻塞等待一定时间。

#### 示例

```lua title="sys.msleep"
sys.msleep(1000)  -- 等待 1000 毫秒，即 1 秒
```

### 获取当前毫秒级时间戳 \(**sys\.mtime**\)

#### 声明

```lua
时间戳 = sys.mtime()
```

#### 参数及返回值

- 时间戳
  - *整数型*，毫秒级 UNIX 时间戳

#### 示例

```lua title="sys.mtime"
local ms = sys.mtime()
screen.keep()
sys.alert('一次 screen.keep 耗时：'..sys.mtime()-ms..'毫秒')
```

### 获取网络时间 \(**sys\.net\_time**\)

#### 声明

```lua
秒级时间戳, 是否已同步 = sys.net_time()
```

#### 参数及返回值

- 秒级时间戳
  - *整数型*，成功则返回 **当前网络时间** 的秒级 UNIX 时间戳，尚未成功同步前，返回 **当前本地时间**
- 是否已同步
  - *布尔型*，尚未成功同步前返回 `false`

:::note
此函数调用是 **非阻塞** 的，首次调用后，会在后台轮询并持续保持与网络时间服务器的同步。
:::

#### 示例

```lua title="sys.net_time"
local nt, sync = sys.net_time()  -- 获取网络时间
if not sync then
  sys.alert('尚未同步网络时间')
else
  sys.alert(os.date('当前网络时间\n%Y-%m-%d %H:%M:%S', nt))
end
```

### 产生一个随机数 \(**sys\.rnd**\)

#### 声明

```lua
随机数字 = sys.rnd()
```

#### 参数及返回值

- 随机数字
  - *整数型*，返回一个随机数字，范围 0 ~ 4294967295

#### 说明

产生一个真随机数。

:::info
产生的随机数是 **真随机数**，不是伪随机数。  
每次启动脚本时，会自动使用真随机数初始化随机数种子。因此你通常 **无需** 显式调用 `sys.rnd`，[`math.random`](https://cloudwu.github.io/lua53doc/manual.html#pdf-math.random) 产生的随机数也是安全的。
:::

#### 示例

```lua title="sys.rnd"
math.randomseed(sys.rnd())  -- 初始化随机因子为一个真随机数
local r = math.random(1, 100)  -- 产生一个 1 ~ 100 范围的随机数
```

### 获取设备当前可用内存值 \(**sys\.available\_memory**\)

#### 声明

```lua
可用内存 = sys.available_memory()
```

#### 参数及返回值

- 可用内存
  - *实数型*，返回当前设备的空闲内存值，单位：MB

#### 示例

```lua title="sys.available_memory"
sys.alert('当前可用内存为：'..sys.available_memory()..'MB')
```

### 获取设备当前总内存值 \(**sys\.total\_memory**\)

#### 声明

```lua
总内存 = sys.total_memory()
```

#### 参数及返回值

- 总内存
  - *实数型*，返回当前设备的总内存值，单位：MB

#### 示例

```lua title="sys.total_memory"
sys.alert('当前设备总内存为：'..sys.total_memory()..'MB')
```

### 列出设备挂载点 \(**sys\.disks**\)

#### 声明

```lua
挂载点信息表 = sys.disks()
```

#### 参数及返回值

- 挂载点信息表
  - *文本型关联表*，返回一个关联表，其键为挂载点路径，值为挂载的设备名称

#### 示例

```lua title="sys.disks"
local disks = sys.disks()  -- 获取设备挂载点信息
for k, v in pairs(disks) do
  nLog(k..' -> '..v)
end
```

#### 示例输出

```lua
{
  / = "/dev/disk0s1s1",
  /private/var = "/dev/disk0s1s2",
  /Developer = "/dev/disk2",
  /private/preboot = "/dev/disk0s1s6",
  /private/var/hardware = "/dev/disk0s1s7",
  /System/Library/Pearl/ReferenceFrames = "/private/var/hardware/Pearl/System/Library/Pearl/ReferenceFrames",
  /private/var/wireless/baseband_data = "/dev/disk0s1s3",
  /System/Library/Caches/com.apple.factorydata = "/private/var/hardware/FactoryData/System/Library/Caches/com.apple.factorydata",
  /dev = "devfs",
  /private/xarts = "/dev/disk0s1s5",
  /private/var/MobileSoftwareUpdate = "/dev/disk0s1s4",
}
```

### 获取设备当前未使用的存储空间值 \(**sys\.free\_disk\_space**\)

#### 声明

```lua
剩余空间 = sys.free_disk_space(挂载点)
```

#### 参数及返回值

- 挂载点
  - *文本型*，默认有效取值范围为 `"/var"` 或是 `"/"`，分别代表用户空间和系统空间。有外部存储比如内存卡的时候可以有其他值
- 剩余空间
  - *实数型*，返回设备当前未使用的存储空间值，单位：MB

#### 示例

```lua title="sys.free_disk_space"
sys.alert(
 '当前系统空间剩余\n'..sys.free_disk_space('/')..'MB\n\n'..
 '当前用户空间剩余\n'..sys.free_disk_space('/var')..'MB'
)
```

### 获取设备当前总存储空间值 \(**sys\.total\_disk\_space**\)

#### 声明

```lua
总空间 = sys.total_disk_space(挂载点)
```

#### 参数及返回值

- 挂载点
  - *文本型*，默认有效取值范围为 `"/var"` 或是 `"/"`，分别代表用户空间和系统空间。有外部存储比如内存卡的时候可以有其他值
- 总空间
  - *实数型*，返回设备当前总存储空间值 \(单位：MB\)

#### 示例

```lua title="sys.total_disk_space"
sys.alert(
  '当前系统空间总量\n'..sys.total_disk_space('/')..'MB\n\n'..
  '当前用户空间总量\n'..sys.total_disk_space('/var')..'MB'
)
```

### 输出标准系统日志 \(**sys\.log**\)

#### 声明

```lua
sys.log([ 参数1, 参数2, ... ])
```

#### 参数及返回值

- 参数1, 参数2, \.\.\.
  - *任意类型*，*可选*，*可变参数*，将会转换成文本输出，参数之间用 `"\t"` 隔开

#### 说明

输出标准系统日志至标准输出 `stdout`，并存储到日志文件。

:::note
日志会 **自动分卷** 存储到设备上的 `/var/mobile/Meida/1ferver/log/sys.log` 文件中，每卷 10 MB，最多 10 卷。
:::

:::info
日志可以使用电脑浏览器打开远程接口 `http://<设备IP地址>:46952/log.html` 实时查看。
:::

#### 示例

```lua title="sys.log"
sys.log("当然是 Hello World 啦")
```

### 问系统一个问题 \(**sys\.mgcopyanswer**\)

#### 声明

```lua
系统回复 = sys.mgcopyanswer(问题名称)
```

#### 参数及返回值

- 问题名称
  - *文本型*，参考 [MobileGestalt.h](https://github.com/Cykey/ios-reversed-headers/blob/master/MobileGestalt/MobileGestalt.h)
- 系统回复
  - *任意类型*，如果问题不被支持则返回 `nil`

#### 说明

获取一些系统信息，底层使用 [MGCopyAnswer](http://iphonedevwiki.net/index.php/LibMobileGestalt.dylib) 完成。

:::note 关键词
获取系统信息 读取系统信息 获取设备信息 读取设备信息 设备标识
:::

#### 示例

```lua title="sys.mgcopyanswer"
sys.alert("设备的序列号是："..sys.mgcopyanswer("SerialNumber"))
```

### 获取系统版本 \(**sys\.version**\)

#### 声明

```lua
系统版本 = sys.version()
```

#### 参数及返回值

- 系统版本 *文本型*

#### 示例

```lua title="sys.version"
sys.alert('当前系统版本：'..sys.version())
```

### 获取 XXTouch Elite 版本 \(**sys\.xtversion**\)

#### 声明

```lua
版本号 = sys.xtversion()
```

#### 参数及返回值

- 版本号
  - *文本型*，XXTouch Elite 版本号

#### 示例

```lua title="sys.xtversion"
sys.alert('当前 XXTouch Elite 版本：'..sys.xtversion())
```

### 重启春板（妙手回春） \(**sys\.respring**\)

#### 声明

```lua
sys.respring()
```

#### 说明

重启春板和背板，相当于命令行 `killall -9 SpringBoard backboardd`。

:::caution
春板重启完成前，许多依赖春板的函数调用将会失败。  
调用此函数后，建议使用 [`app.front_bid`](app.md#获取前台-app-的标识符-appfront_bid) 轮询检测春板启动状态，春板启动完成后再进行其他操作。
:::

#### 示例

```lua title="sys.respring"
sys.respring()
sys.sleep(1)
while app.front_bid() ~= "com.apple.springboard" do
  sys.sleep(1)
end
sys.alert("春板重启完成")
```

### 重启 \(**sys\.reboot**\)

#### 声明

```lua
sys.reboot()
```

#### 说明

重启，相当于命令行 `reboot`。

:::caution
设备重启，所有正在运行的应用都会被强制关闭，脚本立即结束。  
**需要重新越狱**。
:::

### 关机 \(**sys\.halt**\)

#### 声明

```lua
sys.halt()
```

#### 说明

关机，相当于命令行 `halt`。

:::caution
设备关机，所有正在运行的应用都会被强制关闭，脚本立即结束。  
**需要重新越狱**。
:::

### 用户态重启（软重启） \(**sys\.ldrestart**\)

#### 声明

```lua
sys.ldrestart()
```

#### 说明

用户态重启，越狱状态不会丢失。相当于命令行 `ldrestart`。

:::caution
用户态重启，所有正在运行的应用都会被强制关闭，脚本立即结束。  
**不需要重新越狱**，但可能会失败，变成硬重启。
:::

### 获取、设置语言 \(**sys\.language/sys\.set_language**\)

#### 声明

```lua
语言代码 = sys.language()   -- 获取语言
sys.set_language(语言代码)  -- 设置语言
```

#### 参数及返回值

- 语言代码
  - *文本型*，返回当前系统语言代码，如 `zh-Hans`、`en-US` 等

#### 说明

支持 [ISO 639-1](https://www.iso.org/iso-639-language-codes.html) 标准语言代码。

:::caution
设置语言后会自动 [回春](#重启春板妙手回春-sysrespring)。
:::

### 获取、设置区域 \(**sys\.locale/sys\.set_locale**\)

#### 声明

```lua
区域代码 = sys.locale()   -- 获取区域
sys.set_locale(区域代码)  -- 设置区域
```

#### 参数及返回值

- 区域代码
  - *文本型*，返回当前系统区域代码，如 `zh_CN`、`en_US` 等

#### 说明

```js
language + "_" + country + "_" + (variant + "_#" | "#") + script + "-" + extensions
```

:::caution
设置区域后会自动 [回春](#重启春板妙手回春-sysrespring)。
:::

### 获取、设置时区 \(**sys\.timezone/sys\.set_timezone**\)

#### 声明

```lua
时区代码 = sys.timezone()   -- 获取时区
sys.set_timezone(时区代码)  -- 设置时区
```

#### 参数及返回值

- 时区代码
  - *文本型*，返回当前系统时区代码，如 `Asia/Shanghai`、`America/New_York` 等

#### 说明

支持 [IANA 时区数据库](https://www.iana.org/time-zones) 时区代码。

### 获取、设置外观 \(**sys\.appearance/sys\.set_appearance**\)

#### 声明

```lua
外观样式 = sys.appearance()   -- 获取外观样式
sys.set_appearance(外观样式)  -- 设置外观样式
```

#### 参数及返回值

- 外观样式 *枚举型*
  - `1` 为浅色
  - `2` 为深色

### 获取、设置文字大小 \(**sys\.textsize/sys\.set_textsize**\)

#### 声明

```lua
文字大小 = sys.textsize()   -- 获取文字大小
sys.set_textsize(文字大小)  -- 设置文字大小
```

#### 参数及返回值

- 文字大小
  - *枚举型*，取值范围 0 ~ 11，默认为 `3`

### 获取、设置粗体字 \(**sys\.is_boldtext_on/sys\.boldtext_on,off**\)

#### 声明

```lua
是否开启 = sys.is_boldtext_on()  -- 获取粗体字开关状态
sys.boldtext_on()               -- 开启粗体字
sys.boldtext_off()              -- 关闭粗体字
```

#### 参数及返回值

- 是否开启 *布尔型*

### 获取、设置放大模式 \(**sys\.is_zoom_on/sys\.zoom_on,off**\)

#### 声明

```lua
是否开启 = sys.is_zoom_on()  -- 获取放大模式开关状态
sys.zoom_on()               -- 开启放大模式
sys.zoom_off()              -- 关闭放大模式
```

#### 参数及返回值

- 是否开启 *布尔型*

#### 说明

设置放大模式后，[`screen.size`](screen.md#获取屏幕尺寸-screensize) 获取到的屏幕尺寸将会发生变化，屏幕和模拟触摸坐标系也会随之变化。

:::caution

- 设置放大模式后会自动 [回春](#重启春板妙手回春-sysrespring)。
- 此函数调用会造成后续脚本运行异常。如果后续脚本中，需要用到 **屏幕模块** 或 **模拟触摸模块**，请务必先通过 [`os.restart`](./appendix/process-scheduling.md#重启脚本-osrestart) 重新启动脚本进程。

:::

### 设置壁纸 \(**sys\.set_wallpaper**\)

#### 声明

```lua
sys.set_wallpaper(浅色图片路径[, 深色图片路径, 生效位置, 是否透视])
```

#### 参数及返回值

- 浅色图片路径
  - *文本型*，浅色模式下的壁纸图片路径
- 深色图片路径
  - *文本型*，*可选*，深色模式下的壁纸图片路径
- 生效位置
  - *整数型*，*可选*，壁纸生效位置，取值范围 1 ~ 3，`1` 为锁屏，`2` 为主屏幕，`3` 为锁屏和主屏幕，默认为 `3`
- 是否透视
  - *布尔型*，*可选*，是否采用平行透视效果，默认为 `false`

#### 说明

支持 `jpg`、`jpeg`、`png` 和 `heic` 等格式的图片。

### 获取、设置图标布局 \(**sys\.icon_state/sys\.set_icon_state**\)

#### 声明

```lua
图标布局表 = sys.icon_state()   -- 获取图标布局
sys.set_icon_state(图标布局表)  -- 设置图标布局
```

#### 参数及返回值

- 图标布局表 *关联表*

#### 说明

你可以在一台开发设备上排列好图标布局，然后通过 `sys.icon_state` 获取 **图标布局表**，再通过 `sys.set_icon_state` 设置到其他设备上。

:::note
你不必关心 **图标布局表** 的具体格式，只需要将 `sys.icon_state` 的返回值传入 `sys.set_icon_state` 即可。  
**图标布局表** 可以被 [`plist`](plist.md) 模块安全序列化。
:::

### 获取、设置 Assistive Touch \(**sys\.is_assistive_touch_on/sys\.assistive_touch_on,off**\)

#### 声明

```lua
是否开启 = sys.is_assistive_touch_on()  -- 获取 Assistive Touch 开关状态
sys.assistive_touch_on()               -- 开启 Assistive Touch
sys.assistive_touch_off()              -- 关闭 Assistive Touch
```

#### 参数及返回值

- 是否开启 *布尔型*

### 获取、设置减弱动态效果 \(**sys\.is_reduce_motion_on/sys\.reduce_motion_on,off**\)

#### 声明

```lua
是否开启 = sys.is_reduce_motion_on()  -- 获取减弱动态效果开关状态
sys.reduce_motion_on()               -- 开启减弱动态效果
sys.reduce_motion_off()              -- 关闭减弱动态效果
```

#### 参数及返回值

- 是否开启 *布尔型*

### 获取、设置定位服务 \(**sys\.is_location_services_on/sys\.location_services_on,off**\)

#### 声明

```lua
是否开启 = sys.is_location_services_on()  -- 获取定位服务开关状态
sys.location_services_on()               -- 开启定位服务
sys.location_services_off()              -- 关闭定位服务
```

#### 参数及返回值

- 是否开启 *布尔型*

### 获取、设置允许 App 追踪 \(**sys\.is_tracking_on/sys\.tracking_on,off**\)

#### 声明

```lua
是否开启 = sys.is_tracking_on()  -- 获取是否允许 App 追踪
sys.tracking_on()               -- 允许 App 追踪
sys.tracking_off()              -- 不允许 App 追踪
```

#### 参数及返回值

- 是否开启 *布尔型*

### 获取、设置后台 App 刷新 \(**sys\.background_app_refresh_state/sys\.set_background_app_refresh_state**\)

#### 声明

```lua
状态 = sys.background_app_refresh_state()  -- 获取后台 App 刷新状态
sys.set_background_app_refresh_state(状态) -- 设置后台 App 刷新状态
```

#### 参数及返回值

- 状态 *枚举型*
  - `0`：关闭
  - `1`：仅 Wi-Fi
  - `2`：Wi-Fi 和蜂窝网络

### 还原 \(**sys\.reset**\)

#### 声明

```lua
sys.reset(还原类型名称)
```

#### 参数及返回值

- 还原类型名称
  - *字符串型*，**设置** -> **通用** -> **还原** 中的选项英文名称
    - `Reset All Settings`：还原所有设置（设备自动重启）
    - `Erase All Content and Settings`：还原所有内容和设置（设备自动重启）
    - `Reset Network Settings`：还原网络设置（设备自动重启）
    - `Reset Keyboard Dictionary`：还原键盘字典
    - `Reset Home Screen Layout`：还原主屏幕布局
    - `Reset Location & Privacy`：还原位置和隐私

#### 说明

等同于在设置中手动还原，但不会弹出确认框，直接还原。
