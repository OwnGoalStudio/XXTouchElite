---
sidebar_position: 18
---

# 文件操作模块

## 文件操作模块 - file

标有 🔤 的函数将读入的文件作为 UTF-8 文本文件进行处理。

### 判断文件或目录是否存在 \(**file\.exists**\)

#### 声明

```lua
存在信息 = file.exists(文件或目录路径)
```

#### 参数及返回值

- 文件或目录路径 *文本型*
- 存在信息
  - `false` 或 `"file"` 或 `"directory"`
    - `false` 路径不存在
    - `"file"` 路径是一个文件
    - `"directory"` 路径是一个目录

#### 示例

```lua title="file.exists"
if file.exists("/var/mobile/1.zip") then
  sys.alert("`/var/mobile/1.zip` 存在")
else
  sys.alert("`/var/mobile/1.zip` 不存在")
end
--
if file.exists("/var/mobile/1.zip") == "file" then
  sys.alert("`/var/mobile/1.zip` 存在并且是个文件")
else
  sys.alert("`/var/mobile/1.zip` 不是文件")
end
--
if file.exists("/var/mobile/123/") == "directory" then
  sys.alert("`/var/mobile/123/` 存在并且是个目录")
else
  sys.alert("`/var/mobile/123/` 不是目录")
end
```

### 列出目录内所有文件名 \(**file\.list**\)

#### 声明

```lua
文件列表 = file.list(目录路径)
```

#### 参数及返回值

- 目录路径 *文本型*
- 文件列表
  - *文本型顺序表*，如果目录不存在或指定路径是一个文件则返回 `nil`

#### 示例

```lua title="file.list"
local list = file.list("/var/mobile/")
if list then
  nLog("目录 `/var/mobile/` 中有" .. #list .. "个文件或目录")
  for _, name in ipairs(list) do
    nLog(name)
  end
  sys.alert(print.out())
else
  sys.alert("`/var/mobile/` 不是目录")
end
```

### 获得文件的尺寸 \(**file\.size**\)

#### 声明

```lua
文件尺寸 = file.size(文件路径)
```

#### 参数及返回值

- 文件路径 *文本型*
- 文件尺寸
  - *整数型*，单位为字节，如果文件不存在或指定路径是一个目录则返回 `nil`

#### 示例

```lua title="file.size"
local fsize = file.size("/var/mobile/1.zip")
if fsize then
  sys.alert("`/var/mobile/1.zip` 的尺寸为：" .. fsize .. "字节")
else
  sys.alert("`/var/mobile/1.zip` 不是文件")
end
```

### 读取文件中的数据 \(**file\.reads**\)

#### 声明

```lua
文件内容 = file.reads(文件路径)
```

#### 参数及返回值

- 文件路径 *文本型*
- 文件内容
  - *字符串型*，整个文件的数据内容，如果文件不存在或指定路径是一个目录则返回 `nil`

#### 示例

```lua title="file.reads"
local data = file.reads("/var/mobile/1.zip")
if data then
  sys.alert("`/var/mobile/1.zip` 的尺寸为：" .. #data .. "字节")
else
  sys.alert("`/var/mobile/1.zip` 不是文件")
end
```

### 将数据写入到文件 \(**file\.writes**\)

#### 声明

```lua
操作成败 = file.writes(文件路径, 待写入内容)
```

#### 参数及返回值

- 文件路径 *文本型*
- 待写入内容 *字符串型*
- 操作成败 *布尔型*

#### 说明

将数据覆盖写入到 **文件路径**，文件不存在会创建文件，指定路径的上级目录不存在则会返回 `false`。

#### 示例

```lua title="file.writes"
local success = file.writes("/var/mobile/1.txt", "苟")
if success then
  sys.alert("写入成功")
else
  sys.alert("写入失败")
end
```

### 将数据追加到文件末尾 \(**file\.appends**\)

#### 声明

```lua
操作成败 = file.appends(文件路径, 待追加内容)
```

#### 参数及返回值

- 文件路径 *文本型*
- 待追加内容 *字符串型*
- 操作成败 *布尔型*

#### 说明

将 **待追加内容** 追加到文件末尾，文件不存在会创建文件，指定路径的上级目录不存在则会返回 `false`。

#### 示例

```lua title="file.appends"
local success = file.appends("/var/mobile/1.txt", "利国家生死矣")
if success then
  sys.alert("写入成功")
else
  sys.alert("写入失败")
end
```

### 🔤 统计文本文件的总行数 \(**file\.line\_count**\)

#### 声明

```lua
行数 = file.line_count(文件路径)
```

#### 参数及返回值

- 文件路径 *文本型*
- 行数
  - *整数型*，空文件将返回 `1`，文件不存在返回 `nil`

#### 示例

```lua title="file.line_count"
local cnt = file.line_count("/var/mobile/1.txt")
if cnt then
  sys.alert("`/var/mobile/1.txt` 一共有 " .. cnt .. " 行")
else
  sys.alert("`/var/mobile/1.txt` 不是文件")
end
```

### 🔤 获取文本文件指定行的内容 \(**file\.get\_line**\)

#### 声明

```lua
行内容 = file.get_line(文件路径, 行号)
```

#### 参数及返回值

- 文件路径 *文本型*
- 行号
  - *整数型*，传入正整数以指定行号，传入 `0` 无效，负数则为倒数行号
- 行内容
  - *文本型*，操作失败返回 `nil`

#### 说明

行号从 `1` 开始，如果行号超出范围或文件不存在则返回 `nil`。

#### 示例

```lua title="file.get_line"
local data = file.get_line("/var/mobile/1.txt", 1)
if data then
  data = string.strip_utf8_bom(data) -- 处理掉可能存在的 UTF8-BOM
  sys.alert("`/var/mobile/1.txt` 第一行的内容是 " .. data)
else
  sys.alert("`/var/mobile/1.txt` 不是文件")
end
```

### 🔤 设置文本文件指定行的内容 \(**file\.set\_line**\)

#### 声明

```lua
操作成败 = file.set_line(文件路径, 行号, 待写入内容)
```

#### 参数及返回值

- 文件路径 *文本型*
- 行号
  - *整数型*，传入正整数以指定行号，`0` 为最后一行 + 1，负数则为倒数行号
- 待写入内容 *文本型*
- 操作成败 *布尔型*

#### 说明

设置文本文件指定行的内容，行数不够用空行补足，文件不存在会创建文件，指定路径的上级目录不存在则会返回 `false`。

#### 示例

```lua title="file.set_line"
local success = file.set_line("/var/mobile/1.txt", 3, "哈哈哈")
if success then
  sys.alert("操作成功")
else
  sys.alert("操作失败")
end
```

### 🔤 在文本文件指定行前插入内容 \(**file\.insert\_line**\)

#### 声明

```lua
操作成败 = file.insert_line(文件路径, 行号, 待插入的内容)
```

#### 参数及返回值

- 文件路径 *文本型*
- 行号
  - *整数型*，传入正整数以指定行号，`0` 为最后一行 + 1，负数则为倒数行号
- 待插入的内容 *文本型*
- 操作成败 *布尔型*

#### 说明

在文本文件指定行前插入内容，行数不够用空行补足，文件不存在会创建文件，指定路径的上级目录不存在则会返回 `false`。

#### 示例

```lua title="file.insert_line"
local success = file.insert_line("/var/mobile/1.txt", 2, "岂因祸福避趋之")
if success then
  sys.alert("操作成功")
else
  sys.alert("操作失败")
end
```

### 🔤 移除文本文件指定行 \(**file\.remove\_line**\)

#### 声明

```lua
操作成败, 被删除行的内容 = file.remove_line(文件路径, 行号)
```

#### 参数及返回值

- 文件路径 *文本型*
- 行号
  - *整数型*，传入正整数以指定行号，`0` 为最后一行 + 1，负数则为倒数行号
- 操作成败 *布尔型*
- 被删除行的内容
  - *文本型*，操作失败返回 `nil`

#### 说明

- 行号从 `1` 开始，如果行号超出范围或文件不存在则返回 `nil`。
- 如果被移除的行之后还有内容，那么后面行会向前移动。

#### 示例

```lua title="file.remove_line"
local success, line = file.remove_line("/var/mobile/1.txt", 3)
if success then
  sys.alert("操作成功，被删除的行的内容是：" .. line)
else
  sys.alert("操作失败")
end
```

### 🔤 获取一个文本文件的所有行 \(**file\.get\_lines**\)

#### 声明

```lua
行数组 = file.get_lines(文件路径)
```

#### 参数及返回值

- 文件路径 *文本型*
- 行数组
  - *文本型顺序表*，文件不存在返回 `nil`

#### 说明

获取一个文本文件的所有行，空文件返回 `{ [1] = "" }`，文件不存在返回 `nil`。

#### 示例

```lua title="file.get_lines"
local lines = file.get_lines("/var/mobile/1.txt")
if lines then
  lines[1] = string.strip_utf8_bom(lines[1])  -- 处理掉可能存在的 UTF8-BOM
  if #lines[1] > 0 then
    sys.alert("文件第一行的内容是 " .. lines[1])
  else
    sys.alert("文件是空的")
  end
else
  sys.alert("操作失败")
end
```

### 🔤 将一个顺序表转换逐行覆盖写入到文件中 \(**file\.set\_lines**\)

#### 声明

```lua
操作成败 = file.set_lines(文件路径, 行数组)
```

#### 参数及返回值

- 文件路径 *文本型*
- 行数组 *文本型顺序表*
- 操作成败 *布尔型*

#### 说明

将一个顺序表转换逐行覆盖写入到文件中，文件不存在会创建文件，指定路径的上级目录不存在则会返回 `false`。

#### 示例

```lua title="file.set_lines"
local success = file.set_lines("/var/mobile/1.txt", {
  "苟利国家生死以",
  "岂因祸福避趋之",
})
if success then
  sys.alert("+1s")
else
  sys.alert("操作失败")
end
```

### 🔤 将一个顺序表转换逐行插入到文件指定行前 \(**file\.insert\_lines**\)

#### 声明

```lua
操作成败 = file.insert_lines(文件路径, 行号, 行数组)
```

#### 参数及返回值

- 文件路径 *文本型*
- 行号
  - *整数型*，传入正整数以指定行号，`0` 为最后一行 + 1，负数则为倒数行号
- 行数组 *文本型顺序表*
- 操作成败 *布尔型*

#### 说明

将一个顺序表转换逐行插入到文件指定行前，文件不存在会创建文件，指定路径的上级目录不存在则会返回 `false`。

#### 示例

```lua title="file.insert_lines"
local success = file.insert_lines("/var/mobile/1.txt", 0, { -- 将下面两行字追加到文件末尾
  "I will do whatever it takes to serve my country even at the cost of my own life,",
  "regardless of fortune or misfortune to myself.",
})
if success then
  sys.alert("+1s")
else
  sys.alert("操作失败")
end
```
