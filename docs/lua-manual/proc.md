---
sidebar_position: 14
---

# Process Dictionary Module

## Process Dictionary Module - proc

### Process Dictionary

The *Process Dictionary* is a global *dictionary* that can be [accessed across processes](https://elite.82flex.com/api-283425324) from anywhere.

The lifecycle of the *Process Dictionary* is the same as the operating system: when the operating system shuts down or restarts, the *Process Dictionary* is also cleared.

* In the *Process Dictionary*, the value corresponding to each key is a *string*.
* The value set cannot be an empty string `""`.

:::caution Limitations
When XXTouch Elite is restarted, uninstalled, or reinstalled, the *Process Dictionary* will also be cleared.
Keys starting with `ch.xxtou.` or `xxtouch.` are reserved internally and cannot be used.
:::

### Store a Value in the Process Dictionary \(**proc\.put**\)

#### Declaration

```lua
original_value = proc.put(key, value)
```

#### Parameters and Return Value

* key *string*
* value *string*
* original_value
  * *string*, the value previously stored at the **key** position. If there was no value, it returns an empty string `""`.

#### Description

Storing an empty string clears the **key** position.

#### Example

```lua title="proc.put"
local bill = ""
while bill == "" do
  bill = proc.put("billno", "")
end
nLog("billno: ".. bill)
```

### View the Value Stored in the Process Dictionary \(**proc\.get**\)

#### Declaration

```lua
value = proc.get(key)
```

#### Parameters and Return Value

* key *string*
* value
  * *string*, the value stored at the **key** position. If there is no value, it returns an empty string `""`.

#### Example

```lua title="proc.get"
local bill = proc.get("billno")
if bill ~= "" then
  nLog("has a bill: ".. bill)
else
  nLog("no bill")
end
```

### Process Queue Dictionary

The *Process Queue Dictionary* is a global *dictionary* that can be [accessed across processes](https://elite.82flex.com/api-283425324) from anywhere.

The lifecycle of the *Process Queue Dictionary* is the same as the operating system: when the operating system shuts down or restarts, the *Process Queue Dictionary* is also cleared.

* In the *Process Queue Dictionary*, the value corresponding to each key is a *queue*, which is a *string-ordered list*.
* The values in the *queue* are arranged in the order they were pushed.
* The pushed value cannot be an empty string `""`.

:::caution Limitations
When XXTouch Elite is restarted, uninstalled, or reinstalled, the *Process Queue Dictionary* will also be cleared.
Keys starting with `ch.xxtou.` or `xxtouch.` are reserved internally and cannot be used.
:::

### Push a Value into the Process Queue Dictionary \(**proc\.queue\_push**\)

#### Declaration

```lua
queue_size = proc.queue_push(key, value)
```

#### Parameters and Return Value

* key *string*
* value
  * *string*, cannot be an empty string `""`.
* queue_size
  * *integer*, the size of the queue after pushing **any type**. If the push fails, it returns `0`.

#### Description

Pushes **any type** to the **end** of the queue at the **key** position. If there is no queue at that position, a new queue is created.

:::info
To push a value to the **head** of the queue, use the function name `proc.queue_unshift`.
:::

#### Example

```lua title="proc.queue_push"
local size = proc.queue_push("billnos", "name")
if size ~= 0 then
  nLog("has "..size.." bill(s)")
else
  nLog("failed")
end
```

### Pop a Value from the Process Queue Dictionary \(**proc\.queue\_pop**\)

#### Declaration

```lua
value = proc.queue_pop(key)
```

#### Parameters and Return Value

* key *string*
* value
  * *string*, if the queue does not exist or is empty, it returns an empty string `""`.

#### Description

Pops **any type** from the **end** of the queue at the **key** position.

:::info
To pop a value from the **head** of the queue, use the function name `proc.queue_shift`.
:::

#### Example

```lua title="proc.queue_pop"
local billno = proc.queue_pop("billnos")
if billno ~= "" then
  nLog(billno)
else
  nLog("no bill")
end
```

### Clear All Values from the Process Queue Dictionary \(**proc\.queue\_clear**\)

#### Declaration

```lua
ordered_list = proc.queue_clear(key)
```

#### Parameters and Return Value

* key *string*
* ordered_list
  * *string-ordered list*, if the queue does not exist or is empty, it returns an empty table `{}`.

#### Description

Returns an **ordered list** containing all values in the queue at the **key** position, and then clears the queue.

#### Example

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

### Get the Size of the Process Queue Dictionary \(**proc\.queue\_size**\)

#### Declaration

```lua
queue_size = proc.queue_size(key)
```

#### Parameters and Return Value

* key *string*
* queue_size
  * *integer*, the size of the queue at the **key** position. If the queue does not exist or is empty, it returns `0`.

#### Example

```lua title="proc.queue_size"
local size = proc.queue_size("billnos")
if size ~= 0 then
  nLog("has "..size.." bill(s)")
else
  nLog("no bill")
end
```
