---
sidebar_position: 3
---

# 日志输出设施

XXTouch Elite 提供了 `print`、`sys.log` 和 `nLog` 三种日志输出方式，其区别如下：

- [`print`](#print)：输出到 **标准输出（控制台）** 和一个额外的缓冲区 [`print.out`](#将打印缓冲区的内容提出来-printout)，仅在命令行下可见。
- [`sys.log`](../sys.md#输出标准系统日志-syslog)：在 `print` 的基础上，输出到 **日志文件** `/var/mobile/Media/1ferver/log/sys.log` 和 **悬浮日志条**。
- [`nLog`](#nlog)：在 `sys.log` 的基础上，输出到当前开发环境的日志框。**仅开发环境下可用**。

本节将介绍 `print` 和 `nLog` 这两种日志输出方式的使用方法。

## print

### 打印内容到缓冲区 \(**print**\)

#### 声明

```lua
print([ 参数1, 参数2, ... ])
```

#### 参数及返回值

- 参数1, 参数2, \.\.\.
  - *任意类型*，*可选*，*可变参数*，将会转换成文本输出到缓冲区，参数之间用 `"\t"` 隔开

:::note
[`print`](http://cloudwu.github.io/lua53doc/manual.html#pdf-print) 是 lua 自带的打印输入函数，在 XXTouch Elite 是将内容打印到缓冲区。
:::

#### 示例

```lua title="print"
print("Hello, world!")
```

### 将打印缓冲区的内容提出来 \(**print\.out**\)

#### 声明

```lua
缓冲区内容 = print.out()
```

#### 说明

将 [`print`](#打印内容到缓冲区-print) 函数打印的缓冲区清空并返回缓冲区内容。

#### 示例

```lua title="print.out"
-- 使用一个弹窗显示 print 缓冲区内容
sys.alert(print.out())
```

## nLog

### 网络日志 \(**nLog**\)

#### 声明

```lua
nLog([ 参数1, 参数2, ... ])
```

#### 参数及返回值

- 参数1, 参数2, \.\.\.
  - *任意类型*，*可选*，*可变参数*，将会转换成文本输出到缓冲区，参数之间用 `"\t"` 隔开

#### 说明

这个函数是协议函数（空函数），默认执行不会产生任何效果，实现细节由配套开发环境决定。  
当使用配套开发环境进行调试的时候这个函数将会将日志发送至开发环境的日志框。

#### 示例

```lua title="nLog"
-- 将 print 缓冲区内容发回开发开发工具的日志窗
nLog(print.out())
```
