---
sidebar_position: 12
---

# JSON 模块

## JSON 模块 - json

### 将 Lua 值转储为 JSON 文本 \(**json\.encode**\)

#### 声明

```lua
JSON文本 = json.encode(值)
```

#### 参数及返回值

- 值 *任意类型* 或 `json.null`
- JSON文本
  - *文本型*，转换失败返回 `nil`

:::caution 限制
不是任何 Lua 值都可以转成 JSON，如用户数据、函数及包含用户数据或函数的表。这些值在转换时会被忽略。
:::

#### 示例

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

### 将 JSON 文本加载为 Lua 值 \(**json\.decode**\)

#### 声明

```lua
值 = json.decode(JSON文本)
```

#### 参数及返回值

- JSON文本 *文本型*
- 值
  - *任意类型* 或 `json.null`，转换失败返回 `nil`

#### 示例

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
-- 使用 json.decode 转换 Unicode 编码为文字
sys.alert(json.decode([["\u82cf\u6cfd"]]))
```

### JSON 中的 NULL 常量 \(**json\.null**\)

#### 声明

```lua
json.null
```

#### 说明

这不是一个函数，是一个常量。以文本形式打印为 `"userdata: 0x0"`。它用于表示 JSON 中对应的 `null` 值。

:::note 为什么它有必要存在？
因为 Lua 表中的 `nil` 会被判定为不存在，转换成 JSON 之后，键会消失，所以需要一个特定的值来表示这个 `null`。
:::

#### 示例

```lua title="json.null"
local tb = json.decode('{"nullvalue":null}')
if tb['nullvalue'] == json.null then
  sys.alert(json.null)
end
```
