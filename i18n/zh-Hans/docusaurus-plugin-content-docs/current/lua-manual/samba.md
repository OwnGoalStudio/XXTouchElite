---
sidebar_position: 17
---

# SMB 模块

## SMB 模块 - samba

此模块默认会对 URL 调用 [`string.encode_uri`](exstring.md#-url-编码-stringencode_uristringencode_uri_component) 进行处理。

SMB 协议的惯用 URL 格式为 `smb://[用户名[:密码]@]服务器地址[:服务器端口]/共享文件夹[/路径]`。

标有 🚥 的函数在 [**线程模块**](./thread.md) 中会发生 **让出**。在这些函数调用返回之前，其他的 **线程** 可能会得到运行机会。

### Samba 客户端 \(**samba\.client**\)

*SMB客户端* 是一种 [Lua *用户数据*](https://cloudwu.github.io/lua53doc/manual.html#2.1)，包含了用于访问 SMB 服务器的共享文件夹、用户名和密码等配置信息。

#### 声明

```lua
客户端 = samba.client(共享文件夹, 用户名, 密码)
```

```lua
客户端 = samba.client {
  workgroup = 共享文件夹,
  username = 用户名,
  password = 密码,
}
```

#### 参数及返回值

- 共享文件夹
  - *文本型*，通常情况下会是 `WORKGROUP`
- 用户名 *文本型*
- 密码 *文本型*
- 客户端 *SMB客户端*

#### 说明

所有对此客户端的操作都会使用上述信息进行身份验证，无需再通过 URL 传入用户名和密码。

#### 示例

```lua title="samba.client"
client = samba.client {
  workgroup = "WORKGROUP",
  username = 'guest',
  password = 'mypassword123'
}
```

### 判断一个值是否为 SMB 客户端 \(**samba\.is**\)

#### 声明

```lua
是否为SMB客户端 = samba.is(需要判断的值)
```

#### 参数及返回值

- 需要判断的值 *任意类型*
- 是否为SMB客户端 *布尔型*

### 🚥 列出 SMB 服务器上的目录内容 \(**samba\:list**\)

#### 声明

```lua
目录内容, 失败原因 = 客户端:list(URL)
```

#### 参数及返回值

- 客户端 *SMB客户端*
- URL
  - *文本型*，以 `smb://` 开头的 SMB 服务器上的目录 URL
- 目录内容
  - *顺序表*，**URL** 的目录内容，每个成员都是一个 *关联表*，包含了文件名、文件大小、文件类型等信息。无法访问目录时，返回 `nil`
- 失败原因
  - *文本型*，无法访问目录时，返回失败原因描述

#### 示例

```lua title="samba:list"
tab, err = smbclient:list('smb://WORKGROUP/Documents/JSTColorPicker')
```

#### 示例输出

```lua
{
  [1] = {
    modification = 1654506149.0,  -- 最后修改时间戳
    name = "TagList.sqlite-wal",  -- 文件名
    path = "smb://WORKGROUP/Documents/JSTColorPicker/TagList.sqlite-wal",    -- 文件完整路径
    size = 74192,                 -- 文件尺寸
    type = "file",                -- 文件类型，文件 "file" 或者目录 "dir"
    access = 1654533327.0,        -- 最后访问时间戳
    mode = 33252,
    creation = 1654506149.0,      -- 创建时间戳
  },
  [2] = {
    modification = 1656912977.0,
    name = "TagList.sqlite-shm",
    path = "smb://WORKGROUP/Documents/JSTColorPicker/TagList.sqlite-shm",
    size = 32768,
    type = "file",
    access = 1656912977.0,
    mode = 33252,
    creation = 1656913376.0,
  },
  ...
}
```

### 🚥 在 SMB 服务器上创建目录 \(**samba\:mkdir**\)

#### 声明

```lua
目录属性表, 失败原因 = 客户端:mkdir(URL)
```

#### 参数及返回值

- 客户端 *SMB客户端*
- URL
  - *文本型*，以 `smb://` 开头的 SMB 服务器上的目录 URL
- 目录属性表
  - *关联表*，**URL** 的目录属性，包含了文件名、文件大小、文件类型等信息。无法创建目录时，返回 `nil`
- 失败原因
  - *文本型*，操作失败时，返回失败原因描述

:::caution 限制
此函数调用不支持递归创建多级目录。
:::

#### 示例

```lua title="samba:mkdir"
tab, err = smbclient:mkdir('smb://WORKGROUP/Documents/JSTColorPicker/test_dir')
```

#### 示例输出

```lua
{
  modification = 1657130592.0,
  name = "test_dir",
  path = "smb://WORKGROUP/Documents/JSTColorPicker/test_dir",
  size = 0,
  type = "dir",
  access = 1657130592.0,
  mode = 16877,
  creation = 1657130592.0,
}
```

### 🚥 在 SMB 服务器上创建空白文件 \(**samba\:touch**\)

#### 声明

```lua
操作成败, 失败原因 = 客户端:touch(URL)
```

#### 参数及返回值

- 客户端 *SMB客户端*
- URL
  - *文本型*，以 `smb://` 开头的 SMB 服务器上的文件 URL
- 操作成败 *布尔型*
- 失败原因
  - *文本型*，操作失败时，返回失败原因描述

#### 示例

```lua title="samba:touch"
ok, err = smbclient:touch('smb://WORKGROUP/Documents/JSTColorPicker/test_dir/aaa')
```

### 🚥 在 SMB 服务器上删除文件或空目录 \(**samba\:remove**\)

#### 声明

```lua
操作成败, 失败原因 = 客户端:remove(URL)
```

#### 参数及返回值

- 客户端 *SMB客户端*
- URL
  - *文本型*，以 `smb://` 开头的 SMB 服务器上的文件或空目录 URL
- 操作成败 *布尔型*
- 失败原因
  - *文本型*，操作失败时，返回失败原因描述

#### 说明

删除目录时，目录必须为空。删除非空目录时会报错 `directory not empty`。

#### 示例

```lua title="samba:remove"
ok, err = smbclient:remove('smb://WORKGROUP/Documents/JSTColorPicker/test_dir')
```

### 🚥 在 SMB 服务器上递归删除目录 \(**samba\:rmdir**\)

#### 声明

```lua
操作成败, 失败原因 = 客户端:rmdir(URL)
```

#### 参数及返回值

- 客户端 *SMB客户端*
- URL
  - *文本型*，以 `smb://` 开头的 SMB 服务器上的目录 URL
- 操作成败 *布尔型*
- 失败原因
  - *文本型*，删除失败时，返回失败原因描述

#### 说明

递归删除 **URL** 目录下的所有文件和子目录。

#### 示例

```lua title="samba:rmdir"
ok, err = smbclient:rmdir('smb://WORKGROUP/Documents/JSTColorPicker/test_dir')
```

### 🚥 在 SMB 服务器上重命名文件或目录 \(**samba\:rename**\)

#### 声明

```lua
操作成败, 失败原因 = 客户端:rename(原URL, 新URL)
```

#### 参数及返回值

- 客户端 *SMB客户端*
- 原URL, 新URL
  - *文本型*，以 `smb://` 开头的 SMB 服务器上的文件或目录 URL
- 操作成败 *布尔型*
- 失败原因
  - *文本型*，操作失败时，返回失败原因描述

#### 说明

将 **原URL** 的文件或目录重命名（移动）为 **新URL**。

#### 示例

```lua title="samba:rename"
ok, err = smbclient:rename('smb://WORKGROUP/Documents/JSTColorPicker/.DS_Store', 'smb://WORKGROUP/Documents/JSTColorPicker/DS_Store')
```

### 🚥 在 SMB 服务器上复制文件 \(**samba\:copy**\)

#### 声明

```lua
操作成败, 失败原因 = 客户端:copy(原URL, 新URL[, 是否覆盖写入])
```

#### 参数及返回值

- 客户端 *SMB客户端*
- 原URL, 新URL
  - *文本型*，以 `smb://` 开头的 SMB 服务器上的文件 URL
- 是否覆盖写入
  - *布尔型*，如果 **新URL** 已存在，是否删除后再写入
- 操作成败 *布尔型*
- 失败原因
  - *文本型*，操作失败时，返回失败原因描述

#### 说明

将 **原URL** 的文件复制到 **新URL**。

:::caution 限制

- 此函数调用只支持复制常规文件，不支持递归复制目录。
  - **原URL** 和 **新URL** 必须是文件 URL，不能是目录 URL。
  - **新URL** 的父目录必须已存在。
- 此函数调用暂不支持在服务器端直接进行复制操作，即 Server-Side Copy。
  - 目前的实现方式是先下载到本地，再上传到服务器。

:::

#### 示例

```lua title="samba:copy"
ok, err = smbclient:copy('smb://WORKGROUP/Downloads/Archive.zip', 'smb://WORKGROUP/Downloads/Archive_1.zip', true)  -- 覆盖写入
```

### 🚥 从 SMB 服务器上下载文件或目录 \(**samba\:download**\)

#### 声明

```lua
操作成败, 失败原因 = 客户端:download(远程URL, 本地路径[, 进度回调函数])
```

#### 参数及返回值

- 客户端 *SMB客户端*
- 远程URL
  - *文本型*，以 `smb://` 开头的 SMB 服务器上的文件或目录 URL
- 本地路径
  - *文本型*，本地文件或目录路径
- 进度回调函数
  - *函数型*，*可选*，用于接收下载进度回调。返回值为 `true` 时，终止此次下载。传入回调函数的参数如下：
    - 当前文件属性表 *关联表*
    - 当前文件已传输字节数 *整数型*
- 操作成败 *布尔型*
- 失败原因
  - *文本型*，操作失败时，返回失败原因描述

```lua title="当前文件属性表结构"
{
  modification = 1654506149.0,  -- 最后修改时间戳
  name = "TagList.sqlite-wal",  -- 文件名
  path = "smb://WORKGROUP/Documents/JSTColorPicker/TagList.sqlite-wal",    -- 文件完整路径
  size = 74192,                 -- 文件尺寸
  type = "file",                -- 文件类型，文件 "file" 或者目录 "dir"
  access = 1654533327.0,        -- 最后访问时间戳
  mode = 33252,
  creation = 1654506149.0,      -- 创建时间戳
}
```

#### 说明

如果 **远程URL** 指向一个远程目录，那么会 **递归** 下载目录下的所有文件和子目录。

#### 示例

```lua title="samba:download"
-- 本地路径支持相对路径和绝对路径
ok, err = smbclient:download('smb://WORKGROUP/Documents/JSTColorPicker', 'JSTColorPicker')
```

### 🚥 上传文件或目录到 SMB 服务器 \(**samba\:upload**\)

#### 声明

```lua
操作成败, 失败原因 = 客户端:upload(本地路径, 远程URL[, 进度回调函数])
```

#### 参数及返回值

- 客户端 *SMB客户端*
- 本地路径
  - *文本型*，本地文件或目录路径
- 远程URL
  - *文本型*，以 `smb://` 开头的 SMB 服务器上的文件或目录 URL
- 进度回调函数
  - *函数型*，*可选*，用于接收上传进度回调。返回值为 `true` 时，终止此次上传。传入回调函数的参数如下：
    - 当前文件属性表
      - *关联表*，参考 [`samba:download`](#从-smb-服务器上下载文件或目录-sambadownload) 中的 **当前文件属性表结构**
    - 当前文件已传输字节数 *整数型*
- 操作成败 *布尔型*
- 失败原因
  - *文本型*，操作失败时，返回失败原因描述

#### 说明

如果 **本地路径** 指向一个本地目录，那么会 **递归** 上传目录下的所有文件和子目录。

#### 示例

```lua title="samba:upload"
ok, err = smbclient:upload('plugins', 'smb://WORKGROUP/Documents/plugins')
```
