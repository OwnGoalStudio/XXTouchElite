---
sidebar_position: 6
---

# 命令行工具

除受到全局 [进程调度](process-scheduling.md) 的脚本进程外，你还可以使用 Lua 命令行解释器来执行另外的脚本。

:::caution
本章中所介绍的命令行工具，都需要 root 权限才能执行。
:::

## 激活环境

通过 OpenSSH 登录到设备后，你需要执行以下命令来激活 XXTouch Elite 命令行环境。否则后续章节中的命令将无法执行。

```bash
. xxtouch
```

## 运行模式

### 交互式模式

Lua 命令行解释器可以在交互式模式下运行（REPL 模式），这意味着你可以在命令行中输入 Lua 代码并立即执行。激活环境后，交互式模式可以通过以下命令启动：

```bash
lua
```

随后你将看到 Lua 命令行解释器的提示符，键入 Lua 表达式并按下回车键，它将立即执行并显示结果：

```text
Lua 5.3.6  Copyright (C) 1994-2020 Lua.org, PUC-Rio
> print("Hello, World!")
Hello, World!
> 
```

### 增强型交互式模式

[`croissant`](https://github.com/giann/croissant) 是交互式模式的一个变体，它提供了额外的代码高亮、自动展开等增强特性。激活环境后，增强型交互式模式可以通过以下命令启动：

```bash
. xxtouch
croissant
```

随后你将看到 Lua 命令行解释器的提示符，键入 Lua 表达式并按下回车键，它将立即执行并显示结果：

```text
🥐  Croissant 0.0.1 (C) 2019 Benoit Giannangeli
Lua 5.3 Copyright (C) 1994-2018 Lua.org, PUC-Rio
→ pasteboard
{  -- table: 0x12bd2d870
  _VERSION = "3.0.1",
  read = function: 0x105ea9424,
  write = function: 0x105ea9558,
}
→ 
```

### 解释器模式

将脚本保存为文件并上传至设备 `/path/to/script.lua`，然后使用 Lua 命令行解释器来执行它。

```bash
lua /path/to/script.lua
```

:::note
如果希望省略 `lua` 命令，可以将脚本文件以 `#!/usr/bin/env lua` 开头，扩展名改为 `.lua`。

```bash
/path/to/script.lua
```

:::

:::note
如果希望进一步省略路径，可以将脚本文件放置于 `/usr/local/bin` 目录下。

```bash
script.lua
```

:::

### 守护者模式 `daemon.lua`

守护者模式比 [**守护模式**](daemon-mode.md) 更为底层，是一个由 [`launchd`](https://www.launchd.info/) 启动的系统级服务。  
当设备处于非局域网环境却需要集中控制，就可以启用一个守护者主动与外界的服务器保持通讯。

* 守护者可使用 [`launchctl`](https://support.apple.com/zh-cn/guide/terminal/apdc6c1077b-5d5d-4d35-9c19-60f2397b2369/mac) 来管理
* 守护者随系统启动自动运行，发生异常崩溃会在 30 秒后自动重启
* 开发者可进一步使用 [`lockfile`](process-scheduling.md#锁定进程号文件-lockfile) 函数锁定一个文件以确保其单例状态

#### 说明

你可以编写以 `daemon.lua` 命名的守护者，上传到 `/usr/local/xxtouch/bin/daemon.lua`。

:::caution 限制
守护者模式将在重启、软重启或重启 XXTouch Elite 后生效。
:::

#### 示例

本节示例中的守护者将每 3 秒向[进程队列字典](../proc.md#进程队列字典) `xxtouch.daemon.test` 中压入一个描述当前时间的文本。

```lua title="daemon.lua" showLineNumbers
if not G_reload then
  if not lockfile("/tmp/daemon.lua.singleton") then
    return  -- 如果文件已经被别的进程锁定，那么说明不需要再次运行
  end
else
  G_reload = nil
end
--
local daemon_file_name = "/var/mobile/Media/1ferver/bin/daemon.lua"
local socket = require("socket")
local lfs = require("lfs")
--
function file_change_date(file_name)
  local fattr = lfs.attributes(file_name)
  if type(fattr) == "table" and fattr.mode == "file" then
    return fattr.change
  end
  return 0
end
--
local orig_change = file_change_date(daemon_file_name)
--
while true do
  sys.log(string.format("daemon.lua: %d", os.time()))
  proc_queue_push("xxtouch.daemon.test", string.format("daemon.lua: %d", os.time()))
  if file_change_date(daemon_file_name) ~= orig_change then
    break
  end
  socket.sleep(3)
end
--
G_reload = true
dofile(daemon_file_name)
```

## 已集成的命令行工具

### 录制 HID 事件 \(**hidrecorder**\)

#### 说明

用于转储 HID 事件流到标准输出，详见 [录制回放脚本](../../tutorial/record-and-replay.md)。

#### 示例

```text
hidrecorder > /path/to/hid-events.lua
```

### 安装、卸载 App \(**installer\.lua**\)

#### 声明

```text
usage: installer.lua install   [ipa-path]
       installer.lua uninstall [bundle-id]
```

#### 参数及返回值

* `ipa-path` IPA 安装包文件路径
* `bundle-id` 已安装的 [App 标识符](../app.md#标识符)

#### 示例

```bash
installer.lua install /path/to/MyApp.ipa   # 安装 App
```

```bash
installer.lua uninstall com.example.MyApp  # 卸载 App
```

### 启动、停止远程访问 \(**remote\-access\.lua**\)

#### 声明

```text
remote-access.lua [on|off]
```

#### 说明

效果等同于 [打开远程访问](../../tutorial/ready-to-develop.md#启用远程访问)。

#### 示例

```bash
remote-access.lua on   # 启动远程访问
```

```bash
remote-access.lua off  # 停止远程访问
```

### 远程锁定、解锁 \(**remote\-lock\.lua**\)

#### 声明

```text
usage: remote-lock.lua unlock [password]
       remote-lock.lua lock
       remote-lock.lua status
```

#### 参数及返回值

* `password` 设备锁屏密码

#### 示例

```bash
remote-lock.lua unlock       # 无密码解锁设备
```

```bash
remote-lock.lua unlock 1234  # 有密码解锁设备
```

```bash
remote-lock.lua lock         # 锁定设备
```

```bash
remote-lock.lua status       # 显示设备锁屏状态，返回 `true` 或 `false`
```

### 卸载 XXTouch Elite \(**uninstall\-xxtouch\.sh**\)

#### 示例

```text
uninstall-xxtouch.sh
```

:::danger
此操作不可逆。  
将同时移除所有与 XXTouch Elite 有关的 [用户数据](paths-and-permissions.md)。
:::
