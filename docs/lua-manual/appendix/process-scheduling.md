---
sidebar_position: 5
---

# Process Scheduling

Each script in XXTouch Elite runs as an independent process, referred to as a **script process**. To avoid conflicts and management difficulties caused by multiple script processes running simultaneously, script processes dispatched in the following ways can only have **one instance** at a time:

- Started via volume keys
- Started via [OpenAPI](https://elite.82flex.com/api-283425278) calls
- Triggered by [Activator](https://cydia.saurik.com/package/libactivator/) events
- Started via the X.X.T.E. application interface
- Directly debugged or launched via IDEs like VSCode plugins, XXTStudio, etc.
- Started remotely via group control software, cloud control software, etc.
- Restarted by “[Daemon Mode](daemon-mode.md)” after unexpected termination
- Started by features like “[Startup Script](https://elite.82flex.com/api-283425313)” or “Scheduled Tasks”

:::info

- You can use `utils.launch_args` to retrieve the launch arguments of the current script, allowing you to handle different launch methods accordingly.
- Scripts started via command line or the cloud control daemon service `daemon.lua` are not subject to the above restrictions.

:::

## Terminate Script Process

Script processes can be terminated in the following ways:

- [`os.exit`](https://cloudwu.github.io/lua53doc/manual.html#pdf-os.exit)
- Script execution completion
- Stopped via volume keys
- Stopped via [OpenAPI](https://elite.82flex.com/api-283425274) calls
- Stopped via [Activator](https://cydia.saurik.com/package/libactivator/) events
- Stopped via IDEs like VSCode plugins, XXTStudio, etc.
- Stopped remotely via group control software, cloud control software, etc.
- Sending `SIGINT`, `SIGTERM`, or `SIGKILL` signals to the script process via the command line `kill`

When a script process terminates, it immediately stops event listeners, closes the UI, terminates all threads and *subprocesses (except those ignoring the `SIGHUP` signal)* it has dispatched, and releases all CPU and memory resources occupied by the process group.

## Restart Script Process

### Restart Script \(**os\.restart**\)

#### Declaration

```lua
success, failure_reason = os.restart([ script_name ])
```

#### Parameters and Return Values

- script_name
  - *string*, *optional*, a valid script name. Defaults to `""`
- success
  - *boolean*, operation can only fail if a **script name** is provided; if successful, this function does not return
- failure_reason *string*

#### Description

- Terminates the current script process and schedules a reload of the **current script file** after 2 seconds.
- If a **script file** is provided, it reloads the script file at the specified path.
- If the operation fails, this function returns `false` along with the failure reason. Common reasons include the provided script file not existing.

:::caution

- **Current script** refers to the entry script at startup.
- If the **current script** is modified, `os.restart` will **re-read** and run the updated script file from the file system.
- **Do not** use this function in a multithreaded environment. Short-delay restarts may cause other logical issues that you need to handle.

:::

#### Example 1

```lua title="os.restart"
os.restart()  -- Restart to the "current script file"
```

#### Example 2

```lua title="os.restart.path"
os.restart("main.lua")  -- Restart to "/var/mobile/Media/1ferver/lua/scripts/main.lua"
```

## Dispatch New Process

### Execute Bash Command \(**os\.run**\)

#### Declaration

```lua
success, reason, exit_code_or_signal, stdout, stderr = os.run(command[, timeout_seconds])
```

#### Parameters and Return Values

- command *string*
- timeout_seconds *integer*, *optional*
- success *boolean*
  - Returns `true` if successful
  - Returns `nil` instead of `false` if failed
- reason *enum*
  - `exit`: Command completed normally; the next number is the **exit code**
  - `signal`: Command was interrupted by a signal; the next number is the **signal value**
- exit_code_or_signal *integer*
- stdout *string*
- stderr *string*

#### Description

This function is similar to [`os.execute`](https://cloudwu.github.io/lua53doc/manual.html#pdf-os.execute) but adds the following features:

- Supports **stdout** and **stderr** stream redirection
  - Captures the output of the command as return values
- Supports an optional **timeout_seconds** parameter:
  1. 1 second before timeout: Sends a `SIGTERM` signal to the system interpreter
  2. On timeout: Sends a `SIGKILL` signal to the system interpreter
  3. Forcefully closes stdout and stderr streams
  4. Returns the data already retrieved from the streams

:::tip
Refer to [Command Line Tools](command-line-tools.md) to execute another Lua interpreter and set a timeout.
:::

:::caution
Avoid passing multi-line or overly complex **commands**; troubleshooting issues can be very difficult. Write complex Bash/Lua script content to a file first, then execute the file.
:::

#### Example 1: Command Execution

```lua title="os.run"
os.execute("echo -n aaa")       --> true "exit" 0
--
-- Compared to os.execute, os.run returns the output of the command
os.run("echo -n aaa")           --> true "exit" 0 "aaa" ""
os.run("sleep 5; echo -n aaa")  --> true "exit" 0 "aaa" ""
```

#### Example 2: Command Execution Timeout (Normal Termination)

```lua title="os.run.timeout"
--
-- The first command times out before completion
-- Sends SIGTERM signal 15 to terminate the system interpreter and its subprocesses
os.run("sleep 5; echo -n aaa", 3)  --> nil "signal" 15 "" ""
--
-- The second command times out before completion
-- Sends SIGTERM signal 15 to terminate the system interpreter and its subprocesses
-- Returns the partial output retrieved from the stream before termination
os.run("echo -n bbb; sleep 5; echo -n aaa", 3)  --> nil "signal" 15 "bbb" ""
--
-- Command completes without timeout, returns the full output from the stream
os.run("echo -n bbb; sleep 5; echo -n aaa", 3)  --> true "exit" 0 "bbbaaa" ""
```

#### Example 3: Command Execution Timeout (Unable to Terminate Normally)

```bash title="trap.sh"
#!/bin/bash
trap "" SIGTERM
exec "$@"
```

```lua title="os.run.kill"
--
-- At the end of the 2nd second, sends SIGTERM signal 15 to the system interpreter, but the signal is ignored
-- At the end of the 3rd second, sends SIGKILL signal 9 to the system interpreter, forcibly killing the process
os.run("trap.sh sleep 5", 3)
nil "signal" 9 "" ""
```

#### Example 4: Execute Another Lua Interpreter (Nesting)

```lua title="os.run.lua"
os.run("lua -e \"sys.alert(1)\"", 3)
```

## Script Termination Callback

This is not a function but a method that utilizes Lua’s garbage collection mechanism to execute some code when the script ends (or is terminated).

### Simple Example

```lua
-- Keywords: Script Termination Callback, Script End Callback
any_variable_name = {}
setmetatable(any_variable_name, {
  __gc = function(...)
    sys.toast('Terminated!')
    sys.msleep(500)
  end
})
--
while true do
  sys.toast("You can try manually terminating the script now\n\n"..os.date("%Y-%m-%d %H:%M:%S"))
  sys.msleep(1000)
end
```

:::note
Define a global object (table value) and set its **destructor** to a function. When the Lua virtual machine ends, the **destructor** of all Lua objects (including the one you defined) will be called. In Lua, a **destructor** refers to the object’s [\_\_gc metamethod](http://cloudwu.github.io/lua53doc/manual.html#2.4).
:::

### Complete Encapsulation Example

```lua title="atexit.lua" showLineNumbers
function atexit(callback)  -- The parameter is a function. Use atexit(a_function) to register a function to execute when the script ends. Avoid long execution times.
  ____atexit_guard____ = ____atexit_guard____ or {}
  if type(____atexit_guard____) == 'table' then
    if not getmetatable(____atexit_guard____) then
      setmetatable(____atexit_guard____, {
        __gc = function(self)
          if type(self.callback) == 'function' then
            pcall(self.callback)
          end
        end
      })
    end
    ____atexit_guard____.callback = callback
  else
    error('Do not name your variable `____atexit_guard____`.')
  end
end
-- The above code can be copied to the beginning of your script. Below is an example of usage.
--
-- Use atexit to register a termination callback function
atexit(function()
  sys.toast('Terminated!')
  sys.msleep(500)
end)
--
while true do
  sys.toast("You can try manually terminating the script now\n\n"..os.date("%Y-%m-%d %H:%M:%S"))
  sys.msleep(1000)
end
```

## Other Functions

### Send Global Notification \(**notify\_post**\)

#### Declaration

```lua
notify_post(notification_name)
```

#### Parameters and Return Values

- notification_name *string*
  - `ch.xxtou.notification.remote-access.on`: [Enable Remote Access](../../tutorial/ready-to-develop.md#enable-remote-access)
  - `ch.xxtou.notification.remote-access.off`: Disable Remote Access
  - `ch.xxtou.notification.restart`: Immediately terminate the script and restart the XXTouch Elite daemon
  - `ch.xxtou.notification.boom`: Immediately terminate the script and uninstall XXTouch Elite

#### Description

Sends a top-level global notification to the Darwin operating system, equivalent to the native [`notify_post`](https://developer.apple.com/documentation/darwinnotify/1433472-notify_post) function.

### Lock Process ID File \(**lockfile**\)

#### Declaration

```lua
success = lockfile(file_path)
```

#### Parameters and Return Values

- file_path *string*
- success *boolean*

#### Description

Creates or locks the **file path** and writes the script process’s process ID as text. This is equivalent to a [`pidfile`](https://unix.stackexchange.com/questions/12815/what-are-pid-and-lock-files-for), preventing multiple singleton scripts from running simultaneously.

#### Example

```lua title="lockfile"
if not lockfile("/tmp/daemon.lua.singleton") then
  return  -- If the file is already locked by another process, it indicates no need to run again.
end
```
