---
sidebar_position: 25
---

# 网络配置模块

## 网络配置模块 - ethconf

:::info 引入
此模块不会自动引入，需要显式引入。

```lua
ethconf = require("ethconf")
```

:::

### 获取当前网络接口列表 \(**ethconf\.interfaces**\)

#### 声明

```lua
接口列表 = ethconf.interfaces()
```

#### 参数及返回值

- 接口列表 *文本型顺序表*

#### 示例输出

```lua title="ethconf.interfaces"
{
  [1] = "awdl0",
  [2] = "en2",
  [3] = "en3",
  [4] = "en0",
  [5] = "ip1",
  [6] = "ip2",
  [7] = "ip3",
  [8] = "ip4",
  [9] = "ip5",
  [10] = "ip6",
  [11] = "ip7",
  [12] = "ip8",
}
```

### 获取、设置指定网络接口配置 \(**ethconf\.get\_config/ethconf\.set\_config**\)

#### 声明

```lua
配置表 = ethconf.get_config(接口名称)
操作成败, 失败原因 = ethconf.set_config(接口名称, 配置表)
```

#### 参数及返回值

- 接口名称 *文本型*
- 配置表 *关联表*
  - `UserDefinedName` *文本型* 用户自定义名称
  - `Interface` *文本型关联表* 网络接口属性表
  - `IPv4` *关联表* IPv4 协议配置表
  - `IPv6` *关联表* IPv6 协议配置表
  - `DNS` *关联表* DNS 协议配置列表
  - `Proxies` *关联表* 代理配置表
- 操作成败 *布尔型*
- 失败原因 *文本型*

#### 说明

输出结果中，各协议配置表结构由 iOS/macOS 系统决定。  
本节只提供一些常见场景的示例配置，仅供参考。

:::caution
请务必参考示例配置，不要缺失字段，避免配置错误导致网络无法使用、“设置” 无法打开等故障。  
如果网络出现异常，请尝试通过 [`sys.reset`](sys.md#还原-sysreset) 还原网络设置。
:::

#### 示例配置 1

```lua title="DHCP 自动获取地址、手动配置 DNS、未配置代理"
{
  ["UserDefinedName"] = "Wi-Fi",     -- 用户自定义名称：Wi-Fi
  ["Interface"] = {
    ["Type"] = "Ethernet",           -- 类型：以太网
    ["Hardware"] = "AirPort",        -- 硬件类型：无线以太网
    ["UserDefinedName"] = "Wi-Fi",
    ["DeviceName"] = "en0",          -- 网络接口设备名：en0
  },
  ["IPv4"] = {
    ["ConfigMethod"] = "DHCP",       -- IPv4 地址获取方式：自动（DHCP）
  },
  ["IPv6"] = {
    ["ConfigMethod"] = "Automatic",  -- IPv6 地址获取方式：自动
  },
  -- 手动配置 DNS 服务器地址
  ["DNS"] = {
    ["ServerAddresses"] = {          -- DNS 服务器地址文本型顺序表
      [1] = "8.8.8.8",
      [2] = "8.8.4.4",
    },
  },
  --
  ["Proxies"] = {                    -- 未设置代理
    ["FTPPassive"] = 1,
    ["ExceptionsList"] = {
      [1] = "*.local",
      [2] = "169.254/16",
    },
  },
}
```

#### 示例配置 2

```lua title="DHCP 自动获取地址、自动配置 DNS、未配置代理"
{
  ["UserDefinedName"] = "Wi-Fi",     -- 用户自定义名称：Wi-Fi
  ["Interface"] = {
    ["Type"] = "Ethernet",           -- 类型：以太网
    ["Hardware"] = "AirPort",        -- 硬件类型：无线以太网
    ["UserDefinedName"] = "Wi-Fi",
    ["DeviceName"] = "en0",          -- 网络接口设备名：en0
  },
  ["IPv4"] = {
    ["ConfigMethod"] = "DHCP",       -- IPv4 地址获取方式：自动（DHCP）
  },
  ["IPv6"] = {
    ["ConfigMethod"] = "Automatic",  -- IPv6 地址获取方式：自动
  },
  ["DNS"] = {},                      -- 自动配置 DNS
  ["Proxies"] = {                    -- 未设置代理
    ["FTPPassive"] = 1,
    ["ExceptionsList"] = {
      [1] = "*.local",
      [2] = "169.254/16",
    },
  },
}
```

#### 示例配置 3

```lua title="手动配置地址、自动配置 DNS、未配置代理"
{
  ["UserDefinedName"] = "Wi-Fi",     -- 用户自定义名称：Wi-Fi
  ["Interface"] = {
    ["Type"] = "Ethernet",           -- 类型：以太网
    ["Hardware"] = "AirPort",        -- 硬件类型：无线以太网
    ["UserDefinedName"] = "Wi-Fi",
    ["DeviceName"] = "en0",          -- 网络接口设备名：en0
  },
  -- 手动配置 IPv4 地址
  ["IPv4"] = {
    ["ConfigMethod"] = "Manual",     -- IPv4 地址获取方式：手动
    ["Addresses"] = {
      [1] = "192.168.2.31",          -- IP 地址
    },
    ["SubnetMasks"] = {
      [1] = "255.255.255.0",         -- 子网掩码
    },
    ["Router"] = "192.168.2.1",      -- 路由器
  },
  --
  ["IPv6"] = {
    ["ConfigMethod"] = "Automatic",  -- IPv6 地址获取方式：自动
  },
  ["DNS"] = {},                      -- 自动配置 DNS
  ["Proxies"] = {                    -- 未设置代理
    ["FTPPassive"] = 1,
    ["ExceptionsList"] = {
      [1] = "*.local",
      [2] = "169.254/16",
    },
  },
}
```

#### 示例配置 4

```lua title="DHCP 自动获取地址、自动配置 DNS、手动配置代理"
{
  ["UserDefinedName"] = "Wi-Fi",       -- 用户自定义名称：Wi-Fi
  ["Interface"] = {
    ["Type"] = "Ethernet",             -- 类型：以太网
    ["Hardware"] = "AirPort",          -- 硬件类型：无线以太网
    ["UserDefinedName"] = "Wi-Fi",
    ["DeviceName"] = "en0",            -- 网络接口设备名：en0
  },
  ["IPv4"] = {
    ["ConfigMethod"] = "DHCP",         -- IPv4 地址获取方式：自动（DHCP）
  },
  ["IPv6"] = {
    ["ConfigMethod"] = "Automatic",    -- IPv6 地址获取方式：自动
  },
  ["DNS"] = {},                        -- 自动配置 DNS
  -- 配置 HTTP/HTTPS 代理服务器
  ["Proxies"] = {
    ["HTTPEnable"] = 1,                -- 启用 HTTP 代理
    ["HTTPProxy"] = "192.168.2.174",   -- HTTP 代理地址
    ["HTTPPort"] = 6152,               -- HTTP 代理端口
    ["HTTPSEnable"] = 1,               -- 启用 HTTPS 代理
    ["HTTPSProxy"] = "192.168.2.174",  -- HTTPS 代理地址
    ["HTTPSPort"] = 6152,              -- HTTPS 代理端口
    ["FTPPassive"] = 1,
    ["ExceptionsList"] = {
      [1] = "*.local",
      [2] = "169.254/16",
    },
  },
  --
}
```
