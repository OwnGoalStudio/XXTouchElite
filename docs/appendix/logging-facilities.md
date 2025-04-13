---
sidebar_position: 3
---

# Logging Facilities

XXTouch Elite provides three logging methods: `print`, `sys.log`, and `nLog`. Their differences are as follows:

- [`print`](#print): Outputs to **standard output (console)** and an additional buffer [`print.out`](#extract-the-content-of-the-print-buffer-printout), visible only in the command line.
- [`sys.log`](../developer-manual/sys.md#standard-system-log-output-syslog): Based on `print`, it outputs to the **log file** `/var/mobile/Media/1ferver/log/sys.log` and the **floating log bar**.
- [`nLog`](#nlog): Based on `sys.log`, it outputs to the log window of the current development environment. **Only available in the development environment**.

This section introduces the usage of `print` and `nLog`.

## print

### Print content to the buffer \(**print**\)

#### Declaration

```lua
print([ argument1, argument2, ... ])
```

#### Parameters and Return Values

- argument1, argument2, ...
  - *any*, *optional*, *variadic arguments*, will be converted to text and output to the buffer, separated by `"\t"`.

:::note
[`print`](http://cloudwu.github.io/lua53doc/manual.html#pdf-print) is a built-in Lua function for printing. In XXTouch Elite, it prints content to the buffer.
:::

#### Example

```lua title="print"
print("Hello, world!")
```

### Extract the content of the print buffer \(**print\.out**\)

#### Declaration

```lua
buffer_content = print.out()
```

#### Description

Clears the buffer printed by the [`print`](#print-content-to-the-buffer-print) function and returns the buffer content.

#### Example

```lua title="print.out"
-- Display the print buffer content in a popup
sys.alert(print.out())
```

## nLog

### Network Logging \(**nLog**\)

#### Declaration

```lua
nLog([ argument1, argument2, ... ])
```

#### Parameters and Return Values

- argument1, argument2, ...
  - *any*, *optional*, *variadic arguments*, will be converted to text and output to the buffer, separated by `"\t"`.

#### Description

This function is a protocol function (empty function). By default, it does not produce any effect. The implementation details depend on the accompanying development environment.
When debugging with the accompanying development environment, this function sends logs to the log window of the development environment.

#### Example

```lua title="nLog"
-- Send the print buffer content back to the log window of the development tool
nLog(print.out())
```
