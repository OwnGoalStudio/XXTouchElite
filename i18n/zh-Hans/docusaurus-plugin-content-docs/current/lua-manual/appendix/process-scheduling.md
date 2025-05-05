---
sidebar_position: 5
---

# 进程调度

XXTouch Elite 的每个脚本都是独立运行的进程，即 **脚本进程**。为避免多个脚本进程同时运行造成的冲突和管理不便，通过以下方式派发的脚本进程，同一时间 **只能有一个实例**：

- 通过音量键启动的脚本
- 通过 [OpenAPI](https://elite.82flex.com/api-283425278) 调用启动的脚本
- 通过 [Activator](https://cydia.saurik.com/package/libactivator/) 事件触发启动的脚本
- 通过 X.X.T. 应用程序界面启动的脚本
- 通过 VSCode 插件、XXTStudio 等 IDE 直接调试或运行的脚本
- 通过群控软件、云控软件等 “远程运行” 的脚本
- 因脚本异常终止，触发 “[守护模式](daemon-mode.md)” 重新启动的脚本
- 由 “[开机启动](https://elite.82flex.com/api-283425313)”、“计划任务” 等功能启动的脚本

:::info

- 你可以通过 `utils.launch_args` 获取当前脚本的启动参数，以便根据不同的启动方式做出不同的处理。
- 由命令行、云控守护服务 `daemon.lua` 等方式启动的脚本，不受以上限制。

:::

## 结束脚本进程

脚本进程可以通过以下方式结束：

- [`os.exit`](https://cloudwu.github.io/lua53doc/manual.html#pdf-os.exit)
- 脚本运行结束
- 通过音量键停止脚本
- 通过 [OpenAPI](https://elite.82flex.com/api-283425274) 调用停止脚本
- 通过 [Activator](https://cydia.saurik.com/package/libactivator/) 事件触发停止脚本
- 通过 VSCode 插件、XXTStudio 等 IDE 停止脚本
- 通过群控软件、云控软件等 “远程停止” 脚本
- 通过命令行 `kill` 向脚本进程发送 `SIGINT`、`SIGTERM` 或 `SIGKILL` 等信号

脚本进程结束时，会立即停止事件监听，关闭 UI，终止其派发的所有线程和*子进程（忽略 `SIGHUP` 信号的除外）*，并释放该进程组占用的所有 CPU 和内存资源。

## 重启脚本进程

### 重启脚本 \(**os\.restart**\)

#### 声明

```lua
操作成败, 失败原因 = os.restart([ 脚本名称 ])
```

#### 参数及返回值

- 脚本名称
  - *文本型*，*可选*，一个有效的脚本名称。默认为 `""`
- 操作成败
  - *布尔型*，只有传递了 **脚本名称** 的情况下才可能操作失败，操作成功则这个函数不会返回
- 失败原因 *文本型*

#### 说明

- 结束当前脚本进程，并计划在 2 秒后重新加载 **当前脚本文件**。
- 如果传入了 **脚本文件**，则会重新加载此路径下的脚本文件。
- 如果操作失败，此函数返回 `false` 并附带失败原因。常见原因是传入的脚本文件不存在。

:::caution

- **当前脚本** 指的是启动入口脚本。
- 若 **当前脚本** 发生改动，`os.restart` 会从文件系统 **重新读取** 并运行更改之后的脚本文件。
- 请 **不要** 在多线程环境使用此函数，短延迟重启会导致的其他逻辑问题也需要你规避。

:::

#### 示例 1

```lua title="os.restart"
os.restart()  -- 重启到 “当前脚本文件”
```

#### 示例 2

```lua title="os.restart.path"
os.restart("main.lua")  -- 重启到 “/var/mobile/Media/1ferver/lua/scripts/main.lua”
```

## 派发新进程

### 执行 Bash 命令 \(**os\.run**\)

#### 声明

```lua
执行成败, 返回原因, 退出状态码或信号值, 标准输出, 标准错误 = os.run(命令内容[, 超时秒])
```

#### 参数及返回值

- 命令内容 *文本型*
- 超时秒 *整数型*，*可选*
- 执行成败 *布尔型*
  - 执行成功返回 `true`
  - 执行失败返回 `nil` 而不是 `false`
- 返回原因 *枚举型*
  - `exit`: 命令正常结束；接下来的数字是命令的 **退出状态码**
  - `signal`: 命令被信号打断；接下来的数字是打断该命令的 **信号值**
- 退出状态码或信号值 *整数型*
- 标准输出 *文本型*
- 标准错误 *文本型*

#### 说明

此函数用法和效果与 [`os.execute`](https://cloudwu.github.io/lua53doc/manual.html#pdf-os.execute) 基本一致，在其基础上新增如下特性：

- 支持 **标准输出**、**标准错误** 流重定向
  - 将命令执行时打印的内容，作为返回值传递回调用方
- 支持可选参数 **超时秒**：
  1. 命令执行超时前 1 秒：向系统解释器发送 `SIGTERM` 信号
  2. 命令执行超时：向系统解释器发送 `SIGKILL` 信号
  3. 强行关闭标准输出、标准错误流
  4. 直接将流内已取出的数据返回

:::tip
参考 [命令行工具](command-line-tools.md)，可以执行另一个 Lua 解释器，并设置超时时间。
:::

:::caution
不建议传入多行或过于复杂的 **命令内容**；出现问题时，排查会非常困难。  
可以先将复杂的 Bash/Lua 脚本内容写入文件，再执行该文件。
:::

#### 示例 1：命令执行

```lua title="os.run"
os.execute("echo -n aaa")       --> true "exit" 0
--
-- os.run 与 os.execute 相比，返回了命令执行时打印的内容
os.run("echo -n aaa")           --> true "exit" 0 "aaa" ""
os.run("sleep 5; echo -n aaa")  --> true "exit" 0 "aaa" ""
```

#### 示例 2：命令执行超时（正常终止）

```lua title="os.run.timeout"
--
-- 第一条命令还未执行完毕就已经超时
-- 发出 SIGTERM 信号 15 使系统解释器及其子进程终止
os.run("sleep 5; echo -n aaa", 3)  --> nil "signal" 15 "" ""
--
-- 第二条命令还未执行完毕就已经超时
-- 发出 SIGTERM 信号 15 使系统解释器及其子进程终止
-- 终止后会返回已经从输出流中取出的部分内容
os.run("echo -n bbb; sleep 5; echo -n aaa", 3)  --> nil "signal" 15 "bbb" ""
--
-- 命令未超时，返回输出流中的全部内容
os.run("echo -n bbb; sleep 5; echo -n aaa", 3)  --> true "exit" 0 "bbbaaa" ""
```

#### 示例 3：命令执行超时（无法正常终止）

```bash title="trap.sh"
#!/bin/bash
trap "" SIGTERM
exec "$@"
```

```lua title="os.run.kill"
--
-- 第 2 秒结束时，发出 SIGTERM 信号 15 给系统解释器，但信号被忽略
-- 第 3 秒结束时，发出 SIGKILL 信号 9 给系统解释器，强行杀死进程
os.run("trap.sh sleep 5", 3)
nil "signal" 9 "" ""
```

#### 示例 4：执行另一个 Lua 解释器（套娃）

```lua title="os.run.lua"
os.run("lua -e \"sys.alert(1)\"", 3)
```

## 脚本终止回调

这不是一个函数，而是利用 Lua 的垃圾回收机制实现的，用于在脚本结束（或被结束）时执行一些代码的方法。

### 简易示例

```lua
-- 关键词 脚本终止回调 脚本结束回调
随便取个变量名 = {}
setmetatable(随便取个变量名, {
  __gc = function(...)
    sys.toast('被终止了！')
    sys.msleep(500)
  end
})
--
while true do
  sys.toast("现在可尝试手动结束脚本\n\n"..os.date("%Y-%m-%d %H:%M:%S"))
  sys.msleep(1000)
end
```

:::note
定义一个全局对象（表型值），将其 **析构函数** 设为一个函数，当 Lua 虚拟机结束之时，所有 Lua 对象（也包括你定义的这个）的 **析构函数** 会被调用。Lua 中的 **析构函数** 是指对象的[\_\_gc 元方法](http://cloudwu.github.io/lua53doc/manual.html#2.4)。
:::

### 完整封装示例

```lua title="atexit.lua" showLineNumbers
function atexit(callback)  -- 参数为一个函数，使用 atexit(一个函数) 注册一个函数在脚本结束时执行，建议不要耗时太长
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
    error('别用 `____atexit_guard____` 命名你的变量。')
  end
end
-- 以上代码可拷贝到你的脚本的开头，以下为使用示例
--
-- 使用 atexit 注册一个终止回调函数
atexit(function() 
  sys.toast('被终止了！')
  sys.msleep(500)
end)
--
while true do
  sys.toast("现在可尝试手动结束脚本\n\n"..os.date("%Y-%m-%d %H:%M:%S"))
  sys.msleep(1000)
end
```

## 其他函数

### 发送全局通知 \(**notify\_post**\)

#### 声明

```lua
notify_post(通知名称)
```

#### 参数及返回值

- 通知名称 *文本型*
  - `ch.xxtou.notification.remote-access.on`：[打开远程访问](../../tutorial/ready-to-develop.md#enable-remote-access)
  - `ch.xxtou.notification.remote-access.off`：关闭远程访问
  - `ch.xxtou.notification.restart`：立即结束脚本，并重启 XXTouch Elite 守护进程
  - `ch.xxtou.notification.boom`：立即结束脚本，并卸载 XXTouch Elite

#### 说明

向 Darwin 操作系统发送一个最高级别的全局通知，与原生 [`notify_post`](https://developer.apple.com/documentation/darwinnotify/1433472-notify_post) 函数的功能相同。

### 锁定进程号文件 \(**lockfile**\)

#### 声明

```lua
操作成败 = lockfile(文件路径)
```

#### 参数及返回值

- 文件路径 *文本型*
- 操作成败 *布尔型*

#### 说明

创建或锁定 **文件路径**，并写入脚本进程的进程号文本。即 [`pidfile`](https://unix.stackexchange.com/questions/12815/what-are-pid-and-lock-files-for)，防止多个单例脚本同时运行。

#### 示例

```lua title="lockfile"
if not lockfile("/tmp/daemon.lua.singleton") then
  return  -- 如果文件已经被别的进程锁定，那么说明不需要再次运行
end
```
