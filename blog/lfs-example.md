---
authors: lessica
tags: [lfs, luafilesystem, lua]
---

# LuaFileSystem Examples

LuaFileSystem is a Lua library that provides access to the filesystem. It allows you to perform file and directory operations in Lua, such as creating, deleting, renaming files and directories, getting file attributes, etc.

<!-- truncate -->

## Get All Filenames in a Path

```lua
local lfs = require("lfs")
for filename in lfs.dir("/var/mobile") do
  if filename ~= ".." and filename ~= "." then
    print(filename)
  end
end
sys.alert(print.out())
```

## Get File Attributes

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

## Get and Change Current Directory of Script Process

```lua
local lfs = require 'lfs'
--
sys.alert(lfs.currentdir())  -- Output "/private/var/root"
--
lfs.chdir('/var/mobile/Media/1ferver/lua/scripts')
--
sys.alert(lfs.currentdir())  -- Output "/var/mobile/Media/1ferver/lua/scripts"
```
