---
sidebar_position: 25
---

# Network Configuration Module

## Network Configuration Module - ethconf

:::info Import
This module is not automatically imported and needs to be explicitly required.

```lua
ethconf = require("ethconf")
```

:::

### Get the Current Network Interface List \(**ethconf\.interfaces**\)

#### Declaration

```lua
interface_list = ethconf.interfaces()
```

#### Parameters and Return Values

- interface_list *list of strings*

#### Example Output

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

### Get and Set Configuration for a Specific Network Interface \(**ethconf\.get\_config/ethconf\.set\_config**\)

#### Declaration

```lua
config_table = ethconf.get_config(interface_name)
success, failure_reason = ethconf.set_config(interface_name, config_table)
```

#### Parameters and Return Values

- interface_name *string*
- config_table *associative table*
  - `UserDefinedName` *string* User-defined name
  - `Interface` *string-indexed associative table* Network interface property table
  - `IPv4` *associative table* IPv4 protocol configuration table
  - `IPv6` *associative table* IPv6 protocol configuration table
  - `DNS` *associative table* DNS protocol configuration list
  - `Proxies` *associative table* Proxy configuration table
- success *boolean*
- failure_reason *string*

#### Description

The structure of each protocol configuration table in the output is determined by the iOS/macOS system.  
This section provides example configurations for common scenarios for reference only.

:::caution
Please refer to the example configurations and ensure no fields are missing to avoid issues such as network unavailability or inability to open “Settings”.  
If network issues occur, try restoring network settings using [`sys.reset`](./sys.md#reset-sysreset).
:::

#### Example Configuration 1

```lua title="DHCP Automatic Address Acquisition, Manual DNS Configuration, No Proxy"
{
  ["UserDefinedName"] = "Wi-Fi",     -- User-defined name: Wi-Fi
  ["Interface"] = {
    ["Type"] = "Ethernet",           -- Type: Ethernet
    ["Hardware"] = "AirPort",        -- Hardware type: Wireless Ethernet
    ["UserDefinedName"] = "Wi-Fi",
    ["DeviceName"] = "en0",          -- Network interface device name: en0
  },
  ["IPv4"] = {
    ["ConfigMethod"] = "DHCP",       -- IPv4 address acquisition method: Automatic (DHCP)
  },
  ["IPv6"] = {
    ["ConfigMethod"] = "Automatic",  -- IPv6 address acquisition method: Automatic
  },
  -- Manually configure DNS server addresses
  ["DNS"] = {
    ["ServerAddresses"] = {          -- DNS server address: list of strings
      [1] = "8.8.8.8",
      [2] = "8.8.4.4",
    },
  },
  --
  ["Proxies"] = {                    -- No proxy configured
    ["FTPPassive"] = 1,
    ["ExceptionsList"] = {
      [1] = "*.local",
      [2] = "169.254/16",
    },
  },
}
```

#### Example Configuration 2

```lua title="DHCP Automatic Address Acquisition, Automatic DNS Configuration, No Proxy"
{
  ["UserDefinedName"] = "Wi-Fi",     -- User-defined name: Wi-Fi
  ["Interface"] = {
    ["Type"] = "Ethernet",           -- Type: Ethernet
    ["Hardware"] = "AirPort",        -- Hardware type: Wireless Ethernet
    ["UserDefinedName"] = "Wi-Fi",
    ["DeviceName"] = "en0",          -- Network interface device name: en0
  },
  ["IPv4"] = {
    ["ConfigMethod"] = "DHCP",       -- IPv4 address acquisition method: Automatic (DHCP)
  },
  ["IPv6"] = {
    ["ConfigMethod"] = "Automatic",  -- IPv6 address acquisition method: Automatic
  },
  ["DNS"] = {},                      -- Automatic DNS configuration
  ["Proxies"] = {                    -- No proxy configured
    ["FTPPassive"] = 1,
    ["ExceptionsList"] = {
      [1] = "*.local",
      [2] = "169.254/16",
    },
  },
}
```

#### Example Configuration 3

```lua title="Manual Address Configuration, Automatic DNS Configuration, No Proxy"
{
  ["UserDefinedName"] = "Wi-Fi",     -- User-defined name: Wi-Fi
  ["Interface"] = {
    ["Type"] = "Ethernet",           -- Type: Ethernet
    ["Hardware"] = "AirPort",        -- Hardware type: Wireless Ethernet
    ["UserDefinedName"] = "Wi-Fi",
    ["DeviceName"] = "en0",          -- Network interface device name: en0
  },
  -- Manually configure IPv4 address
  ["IPv4"] = {
    ["ConfigMethod"] = "Manual",     -- IPv4 address acquisition method: Manual
    ["Addresses"] = {
      [1] = "192.168.2.31",          -- IP address
    },
    ["SubnetMasks"] = {
      [1] = "255.255.255.0",         -- Subnet mask
    },
    ["Router"] = "192.168.2.1",      -- Router
  },
  --
  ["IPv6"] = {
    ["ConfigMethod"] = "Automatic",  -- IPv6 address acquisition method: Automatic
  },
  ["DNS"] = {},                      -- Automatic DNS configuration
  ["Proxies"] = {                    -- No proxy configured
    ["FTPPassive"] = 1,
    ["ExceptionsList"] = {
      [1] = "*.local",
      [2] = "169.254/16",
    },
  },
}
```

#### Example Configuration 4

```lua title="DHCP Automatic Address Acquisition, Automatic DNS Configuration, Manual Proxy Configuration"
{
  ["UserDefinedName"] = "Wi-Fi",       -- User-defined name: Wi-Fi
  ["Interface"] = {
    ["Type"] = "Ethernet",             -- Type: Ethernet
    ["Hardware"] = "AirPort",          -- Hardware type: Wireless Ethernet
    ["UserDefinedName"] = "Wi-Fi",
    ["DeviceName"] = "en0",            -- Network interface device name: en0
  },
  ["IPv4"] = {
    ["ConfigMethod"] = "DHCP",         -- IPv4 address acquisition method: Automatic (DHCP)
  },
  ["IPv6"] = {
    ["ConfigMethod"] = "Automatic",    -- IPv6 address acquisition method: Automatic
  },
  ["DNS"] = {},                        -- Automatic DNS configuration
  -- Configure HTTP/HTTPS proxy server
  ["Proxies"] = {
    ["HTTPEnable"] = 1,                -- Enable HTTP proxy
    ["HTTPProxy"] = "192.168.2.174",   -- HTTP proxy address
    ["HTTPPort"] = 6152,               -- HTTP proxy port
    ["HTTPSEnable"] = 1,               -- Enable HTTPS proxy
    ["HTTPSProxy"] = "192.168.2.174",  -- HTTPS proxy address
    ["HTTPSPort"] = 6152,              -- HTTPS proxy port
    ["FTPPassive"] = 1,
    ["ExceptionsList"] = {
      [1] = "*.local",
      [2] = "169.254/16",
    },
  },
  --
}
```
