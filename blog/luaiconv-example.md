---
authors: lessica
tags: [luaiconv, iconv, lua]
---

# luaiconv Examples

luaiconv is a Lua encoding conversion library that supports conversion between various character encodings. Below are some common encoding conversion examples.

<!-- truncate -->

## GBK to UTF-8

```lua
local iconv = require("iconv")
local cd = iconv.new("utf-8", "gbk")  -- Create a converter from GBK encoding to UTF-8 encoding
local f = io.open("/var/mobile/1.txt", "rb")
local s = f:read("*a")
f:close()
sys.alert(cd:iconv(s))
```

## UTF-16LE to UTF-8

```lua
local iconv = require("iconv")
local cd = iconv.new("utf-8", "utf-16le")  -- Create a converter from UTF-16LE encoding to UTF-8 encoding
local f = io.open("/var/mobile/1.txt", "rb")
local s = f:read("*a")
f:close()
sys.alert(cd:iconv(s))
```

## UTF-16BE to UTF-8

```lua
local iconv = require("iconv")
local cd = iconv.new("utf-8", "utf-16be")  -- Create a converter from UTF-16BE encoding to UTF-8 encoding
local f = io.open("/var/mobile/1.txt", "rb")
local s = f:read("*a")
f:close()
sys.alert(cd:iconv(s))
```
