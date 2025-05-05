---
authors: lessica
tags: [luaiconv, iconv, lua]
---

# luaiconv 编码转换例程

luaiconv 是一个 Lua 编码转换库，支持多种字符编码之间的转换。以下是一些常见的编码转换示例。

<!-- truncate -->

## GBK 转 UTF-8

```lua
local iconv = require("iconv")
local cd = iconv.new("utf-8", "gbk")  -- 新建一个 GBK 编码到 UTF8 编码的转换器
local f = io.open("/var/mobile/1.txt", "rb")
local s = f:read("*a")
f:close()
sys.alert(cd:iconv(s))
```

## UTF-16LE 转 UTF-8

```lua
local iconv = require("iconv")
local cd = iconv.new("utf-8", "utf-16le")  -- 新建一个 UTF-16LE 编码到 UTF8 编码的转换器
local f = io.open("/var/mobile/1.txt", "rb")
local s = f:read("*a")
f:close()
sys.alert(cd:iconv(s))
```

## UTF-16BE 转 UTF-8

```lua
local iconv = require("iconv")
local cd = iconv.new("utf-8", "utf-16be")  -- 新建一个 UTF-16BE 编码到 UTF8 编码的转换器
local f = io.open("/var/mobile/1.txt", "rb")
local s = f:read("*a")
f:close()
sys.alert(cd:iconv(s))
```
