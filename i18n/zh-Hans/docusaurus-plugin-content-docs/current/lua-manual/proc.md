---
sidebar_position: 14
---

# 进程字典模块

## 进程字典模块 - proc

### 进程字典

*进程字典* 是一个全局的 *字典*，可以在任何地方[跨进程访问](https://elite.82flex.com/api-283425324)。  
*进程字典* 的生命周期与操作系统相同：当操作系统关机或重启时，*进程字典* 也会被清空。

* 在 *进程字典* 中，每个键位置对应的值是一个 *文本型*
* 设置的值不能是空文本 `""`

:::caution 限制
重启、卸载或重装 XXTouch Elite 时，*进程字典* 也会被清空。  
以 `ch.xxtou.` 或 `xxtouch.` 开头的键被内部保留，不可使用。
:::

### 存储值到进程字典 \(**proc\.put**\)

#### 声明

```lua
原值 = proc.put(键, 值)
```

#### 参数及返回值

* 键 *文本型*
* 值 *文本型*
* 原值
  * *文本型*，**键** 位置 **原先** 存储的值。如果该位置没有值则返回空文本 `""`

#### 说明

存储空文本代表清空 **键** 位置。

#### 示例

```lua title="proc.put"
local bill = ""
while bill == "" do
  bill = proc.put("billno", "")
end
nLog("billno: ".. bill)
```

### 查看进程字典存储的值 \(**proc\.get**\)

#### 声明

```lua
值 = proc.get(键)
```

#### 参数及返回值

* 键 *文本型*
* 值
  * *文本型*，**键** 位置存储的值，如果该位置没有值则返回空文本 `""`

#### 示例

```lua title="proc.get"
local bill = proc.get("billno")
if bill ~= "" then
  nLog("has a bill: ".. bill)
else
  nLog("no bill")
end
```

### 进程队列字典

*进程队列字典* 是一个全局的 *字典*，可以在任何地方[跨进程访问](https://elite.82flex.com/api-283425324)。  
*进程队列字典* 的生命周期与操作系统相同：当操作系统关机或重启时，*进程队列字典* 也会被清空。

* 在 *进程队列字典* 中，每个键位置对应的值是一个 *队列*，即 *文本型顺序表*
* *队列* 中的值是按照压入的顺序排列的
* 压入的值不能是空文本 `""`

:::caution 限制
重启、卸载或重装 XXTouch Elite 时，*进程队列字典* 也会被清空。  
以 `ch.xxtou.` 或 `xxtouch.` 开头的键被内部保留，不可使用。
:::

### 向进程队列字典中压入一个值 \(**proc\.queue\_push**\)

#### 声明

```lua
队列尺寸 = proc.queue_push(键, 值)
```

#### 参数及返回值

* 键 *文本型*
* 值
  * *文本型*，不能为空文本 `""`
* 队列尺寸
  * *整数型*，压入 **任意类型** 之后的队列尺寸。压入失败则返回 `0`

#### 说明

在 **键** 位置的队列 **尾部** 压入一个 **任意类型**，如果该位置没有队列则创建一个队列。

:::info
如果要在队列 **头部** 压入值，请使用函数名 `proc.queue_unshift`。
:::

#### 示例

```lua title="proc.queue_push"
local size = proc.queue_push("billnos", "name")
if size ~= 0 then
  nLog("has "..size.." bill(s)")
else
  nLog("failed")
end
```

### 从进程队列字典中弹出一个值 \(**proc\.queue\_pop**\)

#### 声明

```lua
值 = proc.queue_pop(键)
```

#### 参数及返回值

* 键 *文本型*
* 值
  * *文本型*，如果队列不存在或为空，则返回空字符串 `""`

#### 说明

在 **键** 位置的队列 **尾部** 弹出一个 **任意类型**。

:::info
如果要在队列 **头部** 弹出值，请使用函数名 `proc.queue_shift`。
:::

#### 示例

```lua title="proc.queue_pop"
local billno = proc.queue_pop("billnos")
if billno ~= "" then
  nLog(billno)
else
  nLog("no bill")
end
```

### 从进程队列字典中弹出所有值 \(**proc\.queue\_clear**\)

#### 声明

```lua
顺序表 = proc.queue_clear(键)
```

#### 参数及返回值

* 键 *文本型*
* 顺序表
  * *文本型顺序表*，如果队列不存在或为空，则返回空表 `{}`

#### 说明

返回包含 **键** 位置的队列所有值的 **顺序表**，随后该队列将被清空。

#### 示例

```lua title="proc.queue_clear"
local billnos = proc.queue_clear("billnos")
if #billnos ~= 0 then
  for i, billno in ipairs(billnos) do
    nLog(i, billno)
  end
else
  nLog("no bill")
end
```

### 获取进程队列字典的尺寸 \(**proc\.queue\_size**\)

#### 声明

```lua
队列尺寸 = proc.queue_size(键)
```

#### 参数及返回值

* 键 *文本型*
* 队列尺寸
  * *整数型*，**键** 位置的队列尺寸。如果队列不存在或为空，则返回 `0`

#### 示例

```lua title="proc.queue_size"
local size = proc.queue_size("billnos")
if size ~= 0 then
  nLog("has "..size.." bill(s)")
else
  nLog("no bill")
end
```
