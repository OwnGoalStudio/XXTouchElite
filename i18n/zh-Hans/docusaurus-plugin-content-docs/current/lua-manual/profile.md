---
sidebar_position: 27
---

# 描述文件模块

## 描述文件模块 - profile

### 导入描述文件 \(**profile\.import**\)

#### 声明

```lua
操作成败, 失败原因 = profile.import(描述文件路径[, 是否安装])
```

#### 参数及返回值

- 描述文件路径 *文本型*
- 是否安装 *布尔型*，可选，默认为 `false`
- 操作成败 *布尔型*
- 失败原因 *文本型*

#### 说明

导入一个指定的描述文件到 **“设置”** -> **“已下载的描述文件”** 中。  
如果指定 **是否安装** 为 `true`，则继续安装指定的描述文件到 **“设置”** -> **“通用”** -> **“描述文件与设备管理”** 中。

:::info
安装的描述文件如果是根证书，会自动安装到 **“设置”** -> **“通用”** -> **“关于本机”** -> **“证书信任设置”** -> **“针对根证书启用完全信任”** 列表中并启用完全信任。
:::

:::note
相同的描述文件多次安装会被覆盖。
:::

#### 示例

```lua title="profile.import"
profile.import("XXTouch_Root_CA.pem")
```

### 列出所有描述文件 \(**profile.list**\)

#### 声明

```lua
描述文件列表 = profile.list()
```

#### 参数及返回值

- 描述文件列表
  - *顺序表*，其中的每个元素都是一个描述文件的 *关联表*，结构参见 [描述文件结构](#描述文件结构)。

#### 示例

```lua title="profile.list"
local profiles = profile.list()
for _, profile in ipairs(profiles) do
  nLog(profile.PayloadDisplayName)
end
```

### 获取描述文件 \(**profile.fetch**\)

#### 声明

```lua
描述文件 = profile.fetch(描述文件ID)
```

#### 参数及返回值

- 描述文件ID *文本型*
- 描述文件
  - *关联表*，结构如下。如果指定的描述文件不存在，则返回 `nil`

#### 描述文件结构

以下内容部分字段因过长而被省略作 `...`。  
其中的 `PayloadIdentifier` 即为 **描述文件ID**。

```lua
{
  ["PayloadType"] = "CertificateWrapper",
  ["PayloadUUID"] = "B53CE4EA-23F1-48A8-9289-EFA36489D9AA",
  ["PayloadIdentifier"] = "aef166f14b22d087e040a4708d7548bc8a531be9a",  -- 描述文件ID
  ["PayloadVersion"] = 1,
  ["PayloadDisplayName"] = "XXTouch Root CA",
  ["ProfileWasEncrypted"] = false,
  ["InstallDate"] = 1665686224.0,
  ["TargetDeviceType"] = 0,
  ["PayloadContent"] = {
    [1] = {
      ["PayloadUUID"] = "40F0B824-1C65-4A3F-9D28-23A1F1BD6993",
      ["PayloadIdentifier"] = "aef166f14b22d087e040a4708d7548bc8a531be9a",
      ["IsIdentity"] = false,
      ["UDID"] = "0cca9d9258359bc9e1416b29ce94aa05b981abe7",
      ["PayloadType"] = "com.apple.security.pkcs1",
      ["Expiry"] = 995617667.0,
      ["PayloadDisplayName"] = "XXTouch Root CA",
      ["PayloadVersion"] = 1,
      ["IsRoot"] = true,
      ["PERSISTENT_REF"] = ...,
    },
  },
  ["SignerCerts"] = { ... },
  ["InstallOptions"] = { ... },
  ["MCProfileIsRemovalStub"] = true,
}
```

#### 示例

```lua title="profile.fetch"
local res = profile.fetch("aef166f14b22d087e040a4708d7548bc8a531be9a")
if res then
  nLog(res.PayloadDisplayName)
end
```

### 移除描述文件 \(**profile.remove**\)

#### 声明

```lua
profile.remove(描述文件ID)
```

#### 参数及返回值

- 描述文件ID *文本型*

#### 示例

```lua title="profile.remove"
profile.remove("aef166f14b22d087e040a4708d7548bc8a531be9a")
```

### 清空所有的描述文件 \(**profile.clear**\)

#### 声明

```lua
profile.clear()
```

:::caution
立即清空所有已安装的描述文件，谨慎使用。
:::
