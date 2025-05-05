---
sidebar_position: 8
---

# Command Line Tools

In addition to script processes governed by global [process scheduling](process-scheduling.md), you can also use the Lua command-line interpreter to execute other scripts.

:::caution
The command-line tools introduced in this chapter require root privileges to execute.
:::

## Activate the Environment

After logging into the device via OpenSSH, you need to execute the following command to activate the XXTouch Elite command-line environment. Otherwise, the commands in subsequent sections will not work.

```bash
. xxtouch
```

## Modes of Operation

### Interactive Mode

The Lua command-line interpreter can run in interactive mode (REPL mode), which means you can input Lua code in the command line and execute it immediately. After activating the environment, interactive mode can be started with the following command:

```bash
lua
```

You will then see the prompt of the Lua command-line interpreter. Type a Lua expression and press Enter, and it will execute immediately and display the result:

```text
Lua 5.3.6  Copyright (C) 1994-2020 Lua.org, PUC-Rio
> print("Hello, World!")
Hello, World!
>
```

### Enhanced Interactive Mode

[`croissant`](https://github.com/giann/croissant) is a variant of the interactive mode, offering additional features such as syntax highlighting and auto-expansion. After activating the environment, the enhanced interactive mode can be started with the following command:

```bash
. xxtouch
croissant
```

You will then see the prompt of the Lua command-line interpreter. Type a Lua expression and press Enter, and it will execute immediately and display the result:

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

### Interpreter Mode

Save the script as a file and upload it to the device at `/path/to/script.lua`, then execute it using the Lua command-line interpreter.

```bash
lua /path/to/script.lua
```

:::note
To omit the `lua` command, you can start the script file with `#!/usr/bin/env lua` and change its extension to `.lua`.

```bash
/path/to/script.lua
```

:::

:::note
To further omit the path, you can place the script file in the `/usr/local/bin` directory.

```bash
script.lua
```

:::

### Daemon Mode `daemon.lua`

Daemon mode is a lower-level mode compared to [**Daemon Mode**](daemon-mode.md). It is a system-level service launched by [`launchd`](https://www.launchd.info/).  
When the device is in a non-LAN environment but requires centralized control, a daemon can be enabled to actively communicate with external servers.

* The daemon can be managed using [`launchctl`](https://support.apple.com/zh-cn/guide/terminal/apdc6c1077b-5d5d-4d35-9c19-60f2397b2369/mac).
* The daemon starts automatically with the system and will restart automatically 30 seconds after an unexpected crash.
* Developers can further use the [`lockfile`](process-scheduling.md#lock-process-id-file-lockfile) function to lock a file to ensure its singleton state.

#### Instructions

You can write a daemon named `daemon.lua` and upload it to `/usr/local/xxtouch/bin/daemon.lua`.

:::caution Restriction
Daemon mode takes effect after a reboot, soft reboot, or restarting XXTouch Elite.
:::

#### Example

The daemon in this example pushes a text description of the current time into the [process queue dictionary](../proc.md) `xxtouch.daemon.test` every 3 seconds.

```lua title="daemon.lua" showLineNumbers
if not G_reload then
  if not lockfile("/tmp/daemon.lua.singleton") then
    return  -- If the file is already locked by another process, no need to run again
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

## Built-in Command Line Tools

### Record HID Events \(**hidrecorder**\)

#### Instructions

Used to dump HID event streams to standard output. See [Record and Replay Scripts](../../tutorial/record-and-replay.md) for details.

#### Example

```text
hidrecorder > /path/to/hid-events.lua
```

### Install and Uninstall Apps \(**installer\.lua**\)

#### Declaration

```text
usage: installer.lua install   [ipa-path]
       installer.lua uninstall [bundle-id]
```

#### Parameters and Return Values

* `ipa-path` Path to the IPA installation package
* `bundle-id` Installed [App Identifier](../app.md#identifier)

#### Example

```bash
installer.lua install /path/to/MyApp.ipa   # Install App
```

```bash
installer.lua uninstall com.example.MyApp  # Uninstall App
```

### Start and Stop Remote Access \(**remote\-access\.lua**\)

#### Declaration

```text
remote-access.lua [on|off]
```

#### Instructions

Equivalent to [Enable Remote Access](../../tutorial/ready-to-develop.md#enable-remote-access).

#### Example

```bash
remote-access.lua on   # Start remote access
```

```bash
remote-access.lua off  # Stop remote access
```

### Remote Lock and Unlock \(**remote\-lock\.lua**\)

#### Declaration

```text
usage: remote-lock.lua unlock [password]
       remote-lock.lua lock
       remote-lock.lua status
```

#### Parameters and Return Values

- `password` Device lock screen password

#### Example

```bash
remote-lock.lua unlock       # Unlock device without password
```

```bash
remote-lock.lua unlock 1234  # Unlock device with password
```

```bash
remote-lock.lua lock         # Lock device
```

```bash
remote-lock.lua status       # Display device lock screen status, returns `true` or `false`
```

### Uninstall XXTouch Elite \(**uninstall\-xxtouch\.sh**\)

#### Example

```text
uninstall-xxtouch.sh
```

:::danger
This operation is irreversible.  
It will also remove all [user data](paths-and-permissions.md) related to XXTouch Elite.
:::
