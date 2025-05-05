---
sidebar_position: 24
---

# VPN 配置模块

## VPN 配置模块 - vpnconf

:::caution 限制
此模块仅支持 iOS 14 及以上版本。
:::

:::info 引入
此模块不会自动引入，需要显式引入。

```lua
vpnconf = require("vpnconf")
```

:::

### 创建一个 VPN 配置 \(**vpnconf\.create**\)

#### 声明

```lua
创建成败 = vpnconf.create(配置表)
```

#### 声明：IKEv2

```lua
创建成败 = vpnconf.create {
  dispName = 描述,
  VPNType = 'IKEv2',  -- VPN类型
  server = 服务器地址,
  authorization = 用户名,
  password = 密码,
  VPNLocalIdentifier = 本地ID,
  VPNRemoteIdentifier = 远程ID,
}
```

#### 声明：IPSec

```lua
创建成败 = vpnconf.create {
  dispName = 描述,
  VPNType = 'IPSec',  -- VPN类型
  server = 服务器地址,
  authorization = 用户名,
  password = 密码,
  group = IPSec组,
  secret = IPSec密钥,
}
```

#### 声明：L2TP

```lua
创建成败 = vpnconf.create {
  dispName = 描述,
  VPNType = 'L2TP',  -- VPN类型
  server = 服务器地址,
  authorization = 用户名,
  password = 密码,
  secret = L2TP密钥,
  VPNSendAllTraffic = 是否发送所有流量,
}
```

#### 参数及返回值

- 配置表 *关联表*
- 创建成败 *布尔型*
- 描述 *文本型*
- VPN类型 *枚举型*
  - `IKEv2`，推荐使用
  - `IPSec`
  - `L2TP`
- 服务器地址 *文本型*
- 用户名 *文本型*
- 密码 *文本型*，*可选*，如果不填写，每次连接时会弹出输入框
- 本地ID *文本型*，*可选*
- 远程ID *文本型*
- IPSec组 *文本型*，*可选*
- IPSec密钥 *文本型*
- L2TP密钥 *文本型*
- 是否发送所有流量 *布尔型*，*可选*，默认为 `true`

#### 示例：IKEv2

```lua title="vpnconf.create.ikev2"
vpnconf = require "vpnconf"
ok = vpnconf.create {
  dispName = 'xtzn',           -- VPN 的显示名
  VPNType = "IKEv2",           -- VPN 的类型
  server = '47.57.242.167',    -- 服务器地址
  authorization = 'xtzn',      -- 用户名
  password = 'xtznmima321',    -- 密码
  VPNLocalIdentifier = 'xtzn',           -- 本地ID
  VPNRemoteIdentifier = '47.57.242.167'  -- 远程ID
}
```

#### 示例：IPSec

```lua title="vpnconf.create.ipsec"
vpnconf = require "vpnconf"
ok = vpnconf.create {
  dispName = 'xtzn',           -- VPN 的显示名
  VPNType = "IPSec",           -- VPN 的类型
  server = '47.57.242.167',    -- 服务器地址
  authorization = 'xtzn',      -- 用户名
  password = 'xtznmima321',    -- 密码
  group = '',      -- IPSec组
  secret = 'xtzn'  -- IPSec密钥
}
```

#### 示例：L2TP

```lua title="vpnconf.create.l2tp"
vpnconf = require "vpnconf"
ok = vpnconf.create {
  dispName = 'xtzn',           -- VPN 的显示名
  VPNType = "L2TP",            -- VPN 的类型
  server = '47.57.242.167',    -- 服务器地址
  authorization = 'xtzn',      -- 用户名
  password = 'xtznmima321',    -- 密码
  secret = 'xtzn',             -- L2TP密钥
  VPNSendAllTraffic = true     -- 是否发送所有流量
}
```

### 获取当前系统 VPN 的列表 \(**vpnconf\.list**\)

#### 声明

```lua
VPN列表 = vpnconf.list()
```

#### 参数及返回值

- VPN列表
  - *顺序表*，获取失败返回 `nil`

```lua title="VPN列表结构"
{
  {dispName = 显示名1, VPNID = VPNID1},
  {dispName = 显示名2, VPNID = VPNID2},
  ...
}
```

#### 示例

```lua title="vpnconf.list"
vpnconf = require "vpnconf"
local list = vpnconf.list()
if list then
  sys.alert(table.deep_print(list))
else
  sys.alert('获取失败，确定人品没有问题？')
end
```

### 选择一个 VPN 配置 \(**vpnconf\.select**\)

#### 声明

```lua
操作成败 = vpnconf.select(显示名 或 VPNID)
```

#### 参数及返回值

- 显示名 或 VPNID
  - *文本型*，选择一个 VPN，如果存在多个同样 **显示名** 的 VPN 则不保证选择哪个。如果需要精确选择可传入 **VPNID**
- 操作成败
  - *布尔型*，操作失败通常是因为指定配置不存在

:::note
**VPNID** 可通过 [`vpnconf.list`](#获取当前系统-vpn-的列表-vpnconflist) 函数获得。
:::

#### 示例

```lua title="vpnconf.select"
vpnconf = require "vpnconf"
local success = vpnconf.select('1个测试VPN')
if success then
  sys.alert('操作成功')
else
  sys.alert('操作失败，确认你要选中的 VPN 配置存在？')
end
```

### 删除一个 VPN 配置 \(**vpnconf\.delete**\)

#### 声明

```lua
操作成败 = vpnconf.delete(显示名 或 VPNID)
```

#### 参数及返回值

- 显示名 或 VPNID
  - *文本型*，删除一个 VPN，如果存在多个同样 **显示名** 的 VPN 则不保证删除哪个。如果需要精确删除可传入 **VPNID**
- 操作成败
  - *布尔型*，操作失败通常是因为指定配置不存在

:::note
**VPNID** 可通过 [`vpnconf.list`](#获取当前系统-vpn-的列表-vpnconflist) 函数获得。
:::

#### 示例

```lua title="vpnconf.delete"
vpnconf = require "vpnconf"
local success = vpnconf.delete('1个测试VPN')
if success then
  sys.alert('操作成功')
else
  sys.alert('操作失败，确认你要删除的 VPN 配置存在？')
end
```

### 清空所有 VPN 配置 \(**vpnconf\.clear**\)

#### 声明

```lua
操作成败 = vpnconf.clear()
```

#### 参数及返回值

- 操作成败 *布尔型*

:::caution
此函数会清空所有 VPN 配置且无法恢复，慎用！
:::

### 以当前选择的 VPN 建立连接 \(**vpnconf\.connect**\)

#### 声明

```lua
操作成败 = vpnconf.connect()
```

#### 参数及返回值

- 操作成败
  - *布尔型*，操作失败通常是因为没有选中的配置

:::caution
操作成功并不代表连接成功，需要通过 [`vpnconf.status`](#获取当前选择的-vpn-的状态-vpnconfstatus) 函数来判断。
:::

#### 示例

```lua title="vpnconf.connect"
vpnconf = require "vpnconf"
local success = vpnconf.connect()
if success then
  sys.alert('操作成功，正在建立连接……')
else
  sys.alert('当前并无选中任何 VPN 配置，成功创建 VPN 之后，记得调用 vpnconf.select 选中它。')
end
```

### 断开当前的 VPN 连接 \(**vpnconf\.disconnect**\)

#### 声明

```lua
操作成败 = vpnconf.disconnect()
```

#### 参数及返回值

- 操作成败
  - *布尔型*，操作失败通常是因为没有选中的配置

:::caution
操作成功并不代表断开成功，需要通过 [`vpnconf.status`](#获取当前选择的-vpn-的状态-vpnconfstatus) 函数来判断。
:::

#### 示例

```lua title="vpnconf.disconnect"
vpnconf = require "vpnconf"
local success = vpnconf.disconnect()
if success then
  sys.alert('操作成功，正在断开连接……')
else
  sys.alert('当前并无选中任何 VPN 配置，成功创建 VPN 之后，记得调用 vpnconf.select 选中它。')
end
```

### 获取当前选择的 VPN 的状态 \(**vpnconf\.status**\)

#### 声明

```lua
状态描述表 = vpnconf.status()
```

#### 参数及返回值

- 状态描述表
  - *关联表*，没有选择任何 VPN 返回 `nil`

```lua title="状态描述表结构"
{
  text = 当前状态的文字描述,
  connected = 是否已经连接成功,
  disconnected = 是否已经断开连接,
}
```

:::caution
由 App 创建的 VPN 配置（如 Surge iOS），状态描述表可能无法正确反映当前的连接状态，请打开 App 查看。
:::

#### 示例

```lua title="vpnconf.status"
vpnconf = require "vpnconf"
local status = vpnconf.status()
if status then
  sys.alert(table.deep_print(status))
else
  sys.alert('当前并无选中任何 VPN 配置，成功创建 VPN 之后，记得调用 vpnconf.select 选中它。')
end
```
