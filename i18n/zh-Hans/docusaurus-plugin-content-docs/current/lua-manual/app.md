---
sidebar_position: 3
---

# 应用程序模块

## 应用程序模块 - app

:::tip

* 此模块支持以 [OpenAPI](https://elite.82flex.com/api-283425316) 方式独立调用。

:::

### 标识符

标识符，即应用程序包名（Bundle ID）。可在 **X.X.T. 应用程序** -> **更多** -> **应用列表** 中查看。

### 获取 App 的捆绑包路径 \(**app\.bundle\_path**\)

#### 声明

```lua
捆绑包路径 = app.bundle_path(标识符)
```

#### 参数及返回值

* 标识符 *文本型*
* 捆绑包路径
  * *文本型*，如果 App 不存在则返回 `nil`

#### 示例

```lua title="app.bundle_path"
path = app.bundle_path("com.cardify.tinder")  -- 获得 “Tinder” 的捆绑包路径
nLog(path)
```

#### 示例输出

```lua
"/private/var/containers/Bundle/Application/8B9C7B8C-8B9C-7B8C-B9C7-B8C7B8C7B8C7/Tinder.app"
```

### 获取 App 的捆绑包版本 \(**app\.bundle\_version**\)

#### 声明

```lua
捆绑包版本 = app.bundle_version(标识符)
```

#### 参数及返回值

* 标识符 *文本型*
* 捆绑包版本
  * *文本型*，如果 App 不存在则返回 `nil`

#### 示例

```lua title="app.bundle_version"
version = app.bundle_version("com.cardify.tinder")  -- 获得 “Tinder” 的捆绑包版本
nLog(version)
```

#### 示例输出

```lua
"12.0.0"
```

### 获取 App 的捆绑包信息表 \(**app\.bundle\_info**\)

#### 声明

```lua
捆绑包信息表 = app.bundle_info(标识符)
```

#### 参数及返回值

* 标识符 *文本型*
* 捆绑包信息表
  * *关联表*，结构如下。如果 App 不存在则返回 `nil`

```lua title="app.bundle_info"
{
  bid = "com.cardify.tinder",
  version = "13.20.0",
  group_containers = {
    group.com.cardify.tinder = "/private/var/mobile/Containers/Shared/AppGroup/967D5BA2-30EC-494C-8834-E9D322F67AF3",
  },
  name = "Tinder",
  data_container = "/private/var/mobile/Containers/Data/Application/18219BE0-86DC-4409-8C40-CAA80A8EFB42",
  bundle_path = "/private/var/containers/Bundle/Application/03B7AABA-C4D7-4A06-8FCF-4E29DDB008B8/Tinder.app",
  plugin_containers = {},
  bundle_container = "/private/var/containers/Bundle/Application/03B7AABA-C4D7-4A06-8FCF-4E29DDB008B8",
  type = "User",
  apple_id = "buyer@icloud.com",
  identifier = "com.cardify.tinder",
}
```

### 获取 App 的数据容器路径 \(**app\.data\_path**\)

#### 声明

```lua
数据容器路径 = app.data_path(标识符)
```

#### 参数及返回值

* 标识符 *文本型*
* 数据容器路径
  * *文本型*，如果 App 不存在则返回 `nil`

#### 示例

```lua title="app.data_path"
path = app.data_path("com.cardify.tinder")  -- 获得 “Tinder” 的数据容器路径
nLog(path)
```

#### 示例输出

```lua
"/private/var/mobile/Containers/Data/Application/8B9C7B8C-8B9C-7B8C-B9C7-B8C7B8C7B8C7"
```

### 获取 App 的分组信息 \(**app\.group\_info**\)

#### 声明

```lua
分组信息 = app.group_info(标识符)
```

#### 参数及返回值

* 标识符 *文本型*
* 分组信息
  * *文本型关联表*，如果 App 不存在返回 `nil`

#### 说明

App 分组，即 [App Group](https://developer.apple.com/documentation/xcode/configuring-app-groups)，是 Apple 提供给开发者的一种数据共享方式，可以让开发者团队名下的多个 App 之间共享数据。

#### 示例

```lua title="app.group_info"
local function sh_escape(path)
  path = string.gsub(path, "([ \\()<>'\"`#&*;?~$])", "\\%1")
  return path
end
--
local info = app.group_info("com.cardify.tinder")  -- 获得 “Tinder” 的分组信息
--
-- 循环删除所有分组目录中的内容
for _,v in pairs(info) do
  os.execute('rm -rf '..sh_escape(v)..'/Library/*')
  os.execute('rm -rf '..sh_escape(v)..'/Documents/*')
  os.execute('rm -rf '..sh_escape(v)..'/tmp/*')
end
```

#### 示例输出

```lua
{
  group.com.cardify.tinder = "/private/var/mobile/Containers/Shared/AppGroup/967D5BA2-30EC-494C-8834-E9D322F67AF3"
}
```

### 获取 App 的插件信息 \(**app\.plugin\_info**\)

#### 声明

```lua
插件信息 = app.plugin_info(标识符)
```

#### 参数及返回值

* 标识符 *文本型*
* 插件信息
  * *文本型关联表*，如果 App 不存在返回 `nil`

#### 说明

App 插件，又称为 [App Extension](https://developer.apple.com/app-extensions/)，是 Apple 提供给开发者的一种 App 扩展方式，可以让开发者在 App 中添加一些功能，比如分享、自定义键盘等。

### 弹出一个 App 通知 \(**app\.pop\_banner**\)

#### 声明

```lua
app.pop_banner(标识符, 通知标题, 通知内容)
```

#### 参数及返回值

* 标识符 *文本型*
* 通知标题 *文本型*
* 通知内容 *文本型*

#### 说明

此函数要求 App 开启了通知权限，否则无任何效果。

#### 示例

```lua title="app.pop_banner"
app.pop_banner('com.apple.AppStore', 'App Store', 'Hello, world!')
```

### 运行 App \(**app\.run**\)

#### 声明

```lua
运行状态 = app.run(标识符[, 是否后台运行])
```

#### 参数及返回值

* 标识符 *文本型*
* 是否后台运行
  * *布尔型*，*可选*，默认为 `false`
* 运行状态 *整数型*
  * 返回 `0` 表示启动成功
  * 返回 *其他值* 表示启动失败

#### 说明

如果设备处于锁屏状态，此函数调用会自动解锁设备并启动 App。

#### 示例

```lua title="app.run"
-- 打开内置天气 App，然后退出
local r = app.run("com.apple.weather")  -- 启动 App
sys.msleep(10 * 1000)  -- 等 10 秒
if r == 0 then
  app.close("com.apple.weather")  -- 退出 App
else
  sys.alert("启动失败", 3)
end
```

### 关闭 App \(**app\.close**\)

#### 声明

```lua
关闭状态 = app.close(标识符 或 进程号)
```

#### 参数及返回值

* 标识符 *文本型*
* 进程号 *整数型*
* 关闭状态 *整数型*
  * 返回 `0` 表示关闭成功
  * 返回 *其他值* 表示关闭失败

#### 说明

关闭 App，参数可以是 **标识符** 也可以是 **进程号**。

:::caution
这个关闭 App 是不可拒绝的强杀，目标 App 在被关闭的时候不会收到任何通知，请谨慎使用。
:::

#### 示例

* [参考 `app.run` 示例](#运行-app-apprun)
* [参考 `app.bundles` 示例](#获取-app-标识符列表-appbundles)

### 模拟使用上划退出 App \(**app\.quit**\)

#### 声明

```lua
app.quit(标识符)
```

#### 参数及返回值

* 标识符 *文本型*

:::info
**标识符** 传入 `"*"` 表示退出所有运行中的 App。
:::

#### 说明

与 [`app.close`](#关闭-app-appclose) 不同的是，App 在退出前会收到通知。  
App 在完全关闭之前有至多 3 秒时间保存存档，并且它会清除掉多任务切换界面的标签。

:::caution 限制
请不要在锁屏状态调用此函数。
:::

#### 示例

```lua title="app.quit"
-- 退出所有正在运行的 App
app.quit("*")
--
-- 退出 “Tinder”，如果它正在运行的话
app.quit("com.cardify.tinder")
```

### 检测 App 是否正在运行 \(**app\.is\_running**\)

#### 声明

```lua
运行状态 = app.is_running(标识符)
```

#### 参数及返回值

* 标识符 *文本型*
* 运行状态 *布尔型*

#### 说明

本函数用于检查一个 App 是否正在运行，它不区分前后台。

:::note
如果要判断一个 App 是否在前台运行，可以使用 [`app.front_bid`](#获取前台-app-的标识符-appfront_bid) 获取前台 App 的标识符进行对比，如下

```lua
if "com.cardify.tinder" == app.front_bid() then
  sys.alert('Tinder 正在前台运行')
end
```

:::

#### 示例

```lua title="app.is_running"
if app.is_running("com.cardify.tinder") then
  sys.alert('Tinder 正在运行')
end
```

### 获取 App 的本地化名字 \(**app\.localized\_name**\)

#### 声明

```lua
本地化名字 = app.localized_name(标识符)
```

#### 参数及返回值

* 标识符 *文本型*
* 本地化名字
  * *文本型*，如果 App 不存在则返回 `nil`

#### 示例

```lua title="app.localized_name"
local name = app.localized_name("com.cardify.tinder")
sys.alert(name)  -- 弹出显示 “Tinder”
```

### 获取 App 的图标数据 \(**app\.png\_data\_for\_bid**\)

#### 声明

```lua
PNG图片数据 = app.png_data_for_bid(标识符)
```

#### 参数及返回值

* 标识符 *文本型*
* PNG图片数据
  * *字符串型*，App 图标的 png 数据（二进制数据），如果 App 不存在则返回 `nil`

#### 示例

```lua title="app.png_data_for_bid"
-- 将 “Tinder” 的图标保存到相册
image.load_data(app.png_data_for_bid("com.cardify.tinder")):save_to_album()
```

### 获取正在运行 App 的进程号 \(**app\.pid\_for\_bid**\)

#### 声明

```lua
进程号 = app.pid_for_bid(标识符)
```

#### 参数及返回值

* 标识符 *文本型*
* 进程号
  * *整数型*，如果 App 正在运行，则返回其进程号，否则返回 `0`

#### 示例

```lua title="app.pid_for_bid"
local tinder_pid = app.pid_for_bid("com.cardify.tinder")
if tinder_pid ~= 0 then
    sys.alert("当前 Tinder 正在运行，进程号是："..tinder_pid)
else
    sys.alert("当前 Tinder 没有在运行")
end
```

### 获取 App 当前内存消耗 \(**app\.used\_memory**\)

#### 声明

```lua
内存占用 = app.used_memory(标识符 或 进程号)
```

#### 参数及返回值

* 标识符 *文本型*
* 进程号 *整数型*
* 内存占用
  * *实数型*，如果 App 正在运行则返回其所占用的内存，单位：MB。否则返回 `nil`

#### 示例

```lua title="app.used_memory"
local tinder_mem = app.used_memory("com.cardify.tinder")
sys.alert("当前 Tinder 进程所占用的内存是："..tinder_mem.."MB")
```

### 获取前台 App 的标识符 \(**app\.front\_bid**\)

#### 声明

```lua
标识符 = app.front_bid()
```

#### 参数及返回值

* 标识符
  * *文本型*，前台 App 的标识符
    * 没有 App 处于前台，但春板已加载，返回 `"com.apple.springboard"`
    * 没有 App 处于前台，且春板尚未启动，返回 `"com.apple.backboardd"`

#### 示例

```lua title="app.front_bid"
local bid = app.front_bid()
sys.alert("前台 App 的标识符是："..bid)
```

### 获取前台 App 的进程号 \(**app\.front\_pid**\)

#### 声明

```lua
进程号 = app.front_pid()
```

#### 参数及返回值

* 进程号
  * *整数型*，前台没有 App 则返回 `0`

#### 说明

前台没有 App 返回 `0`，而不是春板 `SpringBoard` 的进程号。

:::note
要获取春板的进程号，可以参考以下代码片段：

```lua
local desktop_pid = app.pid_for_bid('com.apple.springboard')
sys.alert("春板的进程号是："..desktop_pid)
```

:::

#### 示例

```lua title="app.front_pid"
local pid = app.front_pid()
sys.alert("前台 App 的进程号是："..pid)
```

### 前台打开一个 URL \(**app\.open\_url**\)

#### 声明

```lua
app.open_url(URL)
```

#### 参数及返回值

* URL *文本型*

#### 说明

前台打开一个 URL，可以打开 [URL Scheme](https://developer.apple.com/library/ios/featuredarticles/iPhoneURLScheme_Reference/Introduction/Introduction.html)。

:::tip
参考附录：[“设置” 中常用的 URL Scheme](./appendix/supported-url-schemes.md#设置-url-协议)
:::

#### 示例

```lua title="app.open_url"
app.open_url("http://www.google.com")  -- 用 “Safari” 打开 “Google”
--
app.open_url("prefs:root=General")  -- 跳转到通用设置
```

### 获取 App 标识符列表 \(**app\.bundles**\)

#### 声明

```lua
标识符数组 = app.bundles()
```

#### 参数及返回值

* 标识符数组
  * *顺序表*，返回包含所有已安装 App 标识符的列表，包括系统 App

#### 示例

```lua title="app.bundles"
-- 遍历打印所有 App 的显示名称
for _, bid in ipairs(app.bundles()) do
  nLog(app.localized_name(bid))
end
```

### 获取进程列表 \(**app\.all\_procs**\)

#### 声明

```lua
进程列表 = app.all_procs()
```

#### 参数及返回值

* 进程列表
  * *顺序表*，结构如下：

```lua
{ {pid = 进程号1, name = 进程名1 }, {pid = 进程号2, name = 进程名2 }, ... }
```

#### 说明

不能获取到进程全名。

### 安装 IPA \(**app\.install**\)

#### 声明

```lua
操作成败, 失败原因 = app.install(文件路径)
```

#### 参数及返回值

* 文件路径 *文本型*
* 操作成败 *布尔型*
* 失败原因 *文本型*

#### 说明

同步 **阻塞** 安装一个 `.ipa` 包，安装包必须具备 Apple 合法有效的签名。

:::tip
从 Apple 下载任意 App、版本 `.ipa` 包的方法，可参考 [`ipatool-py`](https://github.com/NyaMisty/ipatool-py)。
:::

#### 示例

```lua title="app.install"
local ok, msg = app.install("/var/mobile/Media/Downloads/Tinder.ipa")
if ok then
  -- 安装成功
else
  sys.alert(msg)  -- 安装失败
end
```

### 卸载一个 App \(**app\.uninstall**\)

#### 声明

```lua
操作成败, 失败原因 = app.uninstall(标识符)
```

#### 参数及返回值

* 标识符 *文本型*
* 操作成败 *布尔型*
* 失败原因 *文本型*

#### 说明

同步**阻塞**卸载一个 App。

#### 示例

```lua title="app.uninstall"
local ok, msg = app.uninstall("com.cardify.tinder")
if ok then
  -- 卸载成功
else
  sys.alert(msg)  -- 卸载失败
end
```
