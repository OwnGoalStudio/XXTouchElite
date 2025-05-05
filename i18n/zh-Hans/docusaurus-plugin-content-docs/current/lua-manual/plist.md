---
sidebar_position: 13
---

# 属性表模块

## 属性表模块 - plist

### 读取属性表文件 \(**plist\.read**\)

#### 声明

```lua
表 = plist.read(文件路径)
```

#### 参数及返回值

- 文件路径 *文本型*
- 表
  - *关联表*，读取失败返回 `nil`

#### 示例

```lua title="plist.read"
local plfilename = "/var/mobile/Library/Caches/com.apple.mobile.installation.plist"  -- 设置属性表文件路径
local tmp2 = plist.read(plfilename)                 -- 读取属性表文件内容并返回一个 Lua 表
sys.alert(tmp2['Metadata']['ProductBuildVersion'])  -- 显示 ProductBuildVersion 的键值
```

### 写入属性表文件 \(**plist\.write**\)

#### 声明

```lua
操作成败 = plist.write(文件路径, 表)
```

#### 参数及返回值

- 文件路径 *文本型*
- 表 *关联表*
- 操作成败 *布尔型*

:::caution 限制
- 请注意不要传入有 **引用环** 的表，会导致脚本无法终止甚至卡死。  
- 不是任何 Lua 值都可以转储为属性表数据，如用户数据、函数及包含用户数据或函数的表。这些值在转储时会被忽略。  
- 操作属性表文件会导致其所有者变为 `root`，如果需要更改用户 App 的属性表，需要修正其所有者。
:::

#### 示例

```lua
local plfilename = "/var/mobile/Library/Caches/com.apple.mobile.installation.plist"  -- 设置属性表路径
local tmp2 = plist.read(plfilename)                -- 读取属性表文件内容并返回一个 Lua 表
tmp2["Metadata"]["ProductBuildVersion"] = "havonz" -- 将表中 ProductBuildVersion 键值改为 “havonz”
plist.write(plfilename, tmp2)                      -- 将修改后的表写入属性表文件
--
local posix = require("posix")                     -- 导入 posix 模块
posix.chmod(plfilename, "rw-r--r--")               -- 将属性表文件权限修正为 0644
--
local unistd = require("posix.unistd")             -- 导入 posix.unistd 模块
unistd.chown(plfilename, 501, 501)                 -- 将属性表文件所有者修正为 501
```

### 将属性表数据加载为 Lua 表 \(**plist\.load**\)

#### 声明

```lua
表 = plist.load(属性表数据)
```

#### 参数及返回值

- 属性表数据 *字符串型*
- 表
  - *关联表*，加载失败返回 `nil`

#### 示例 1

```lua title="plist.load"
local jtmp = plist.load([[
{
  arr = (
    46,
    99,
    7,
  );
  dict = {
    a = 55;
    b = 65;
    c = 9;
  };
}
]])
sys.alert(jtmp.arr[1])  -- 输出 46
sys.alert(jtmp.dict.c)  -- 输出 9
```

#### 示例 2

```lua title="plist.load"
local xtmp = plist.load([[
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>arr</key>
  <array>
    <string>46</string>
    <string>99</string>
    <string>7</string>
  </array>
  <key>dict</key>
  <dict>
    <key>a</key>
    <string>55</string>
    <key>b</key>
    <string>65</string>
    <key>c</key>
    <string>9</string>
  </dict>
</dict>
</plist>
]])
sys.alert(xtmp.arr[1])  -- 输出 46
sys.alert(xtmp.dict.c)  -- 输出 9
```

### 将 Lua 表转储为属性表数据 \(**plist\.dump**\)

#### 声明

```lua
属性表数据 = plist.dump(表[, 数据格式])
```

#### 参数及返回值

- 表 *关联表*
- 数据格式
  - *文本型*，*可选*，只能是 `binary` 或者 `XML`，默认为 `XML`
- 属性表数据
  - *字符串型*，转换失败返回 `nil`

:::caution 限制
- 请注意不要传入有 **引用环** 的表，会导致脚本无法终止甚至卡死。  
- 不是任何 Lua 值都可以转储为属性表数据，如用户数据、函数及包含用户数据或函数的表。这些值在转储时会被忽略。
:::

#### 示例

```lua title="plist.dump"
local tab = {
  arr = {
    46,
    99,
    7,
  };
  dict = {
    a = 55;
    b = 65;
    c = 9;
  };
}
--
local xplist = plist.dump(tab)
sys.alert(xplist)  -- 输出 XML 格式的属性表数据
--
local bplist = plist.dump(tab, "binary")
sys.alert(bplist)  -- 二进制格式的属性表数据，打印出来会乱码
```
