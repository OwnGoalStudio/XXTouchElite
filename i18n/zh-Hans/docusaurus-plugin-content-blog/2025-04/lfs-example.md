---
authors: lessica
tags: [lfs, luafilesystem, lua]
---

# LuaFileSystem 例程

LuaFileSystem 是一个 Lua 库，提供对文件系统的访问。它允许您在 Lua 中执行文件和目录操作，例如创建、删除、重命名文件和目录、获取文件属性等。

<!-- truncate -->

## 获取路径中所有文件名

```lua
local lfs = require("lfs")
for filename in lfs.dir("/var/mobile") do
  if filename ~= ".." and filename ~= "." then
    print(filename)
  end
end
sys.alert(print.out())
```

## 获取文件属性

```lua
local lfs = require("lfs")
--
local attr = lfs.attributes("/var/mobile")
--
print("Type", attr.mode)
print("Last access time", os.date("%Y-%m-%d %H:%M:%S", attr.access))
print("Last modification time", os.date("%Y-%m-%d %H:%M:%S", attr.modification))
print("Last status change time", os.date("%Y-%m-%d %H:%M:%S", attr.change))
--
sys.alert(print.out())
```

## 获取及切换脚本进程当前目录

```lua
local lfs = require 'lfs'
--
sys.alert(lfs.currentdir())  -- 输出 "/private/var/root"
--
lfs.chdir('/var/mobile/Media/1ferver/lua/scripts')
--
sys.alert(lfs.currentdir())  -- 输出 "/var/mobile/Media/1ferver/lua/scripts"
```
