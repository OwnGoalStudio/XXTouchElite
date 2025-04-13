---
sidebar_position: 12
---

# JSON Module

## JSON Module - json

### Dump Lua values to JSON text \(**json\.encode**\)

#### Declaration

```lua
json_text = json.encode(value)
```

#### Parameters and Return Values

- value *any* or `json.null`
- json_text
  - *string*, returns `nil` if conversion fails

:::caution Limitations
Not all Lua values can be converted to JSON, such as userdata, functions, and tables containing userdata or functions. These values will be ignored during conversion.
:::

#### Example

```lua title="json.encode"
local tb = {
  ["膜"] = "图样图森破桑叹斯乃衣服",
  ["蛤"] = "比你们高到不知道哪里去了",
  moha = {
      1,0,0,4,6,9,5,1,0,0,
  },
  nullvalue = json.null,
}
--
local jsonstr = json.encode(tb)
sys.alert(jsonstr)
--
local tmp = json.decode(jsonstr)
sys.alert(tmp.moha[5])
sys.alert(tostring(tmp.nullvalue))
```

### Load JSON text as Lua values \(**json\.decode**\)

#### Declaration

```lua
value = json.decode(json_text)
```

#### Parameters and Return Values

- json_text *string*
- value
  - *any* or `json.null`, returns `nil` if conversion fails

#### Example

```lua title="json.decode"
nLog(json.decode('true'))
nLog(json.decode('17'))
nLog(json.decode('"哈哈"'))
nLog(json.decode('null'))
nLog(json.decode(''))
--
table.deep_print(json.decode('{}'))
table.deep_print(json.decode('{"娘子":"啊哈","你好":"世界"}'))
table.deep_print(json.decode('[]'))
table.deep_print(json.decode('[1, 0, 0, "4695100"]'))
--
sys.alert(print.out())
```

```lua
-- Use json.decode to convert Unicode encoding to text
sys.alert(json.decode([["\u82cf\u6cfd"]]))
```

### NULL constant in JSON \(**json\.null**\)

#### Declaration

```lua
json.null
```

#### Description

This is not a function but a constant. When printed as text, it appears as `"userdata: 0x0"`. It is used to represent the `null` value in JSON.

:::note Why is it necessary?
Because `nil` in Lua tables is treated as non-existent, the key will disappear after being converted to JSON. Therefore, a specific value is needed to represent this `null`.
:::

#### Example

```lua title="json.null"
local tb = json.decode('{"nullvalue":null}')
if tb['nullvalue'] == json.null then
  sys.alert(json.null)
end
```
