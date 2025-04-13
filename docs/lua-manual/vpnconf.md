---
sidebar_position: 24
---

# VPN Configuration Module

## VPN Configuration Module - vpnconf

:::info Import
This module is not automatically imported and needs to be explicitly imported.

```lua
vpnconf = require("vpnconf")
```

:::

### Create a VPN Configuration \(**vpnconf\.create**\)

#### Declaration

```lua
success = vpnconf.create(configTable)
```

#### Declaration: IKEv2

```lua
success = vpnconf.create {
  dispName = description,
  VPNType = 'IKEv2',  -- VPN type
  server = serverAddress,
  authorization = username,
  password = password,
  VPNLocalIdentifier = localID,
  VPNRemoteIdentifier = remoteID,
}
```

#### Declaration: IPSec

```lua
success = vpnconf.create {
  dispName = description,
  VPNType = 'IPSec',  -- VPN type
  server = serverAddress,
  authorization = username,
  password = password,
  group = IPSecGroup,
  secret = IPSecSecret,
}
```

#### Declaration: L2TP

```lua
success = vpnconf.create {
  dispName = description,
  VPNType = 'L2TP',  -- VPN type
  server = serverAddress,
  authorization = username,
  password = password,
  secret = L2TPSecret,
  VPNSendAllTraffic = sendAllTraffic,
}
```

#### Parameters and Return Values

- configTable *table*
- success *boolean*
- description *string*
- VPN type *enum*
  - `IKEv2`, recommended
  - `IPSec`
  - `L2TP`
- serverAddress *string*
- username *string*
- password *string*, *optional*, if not provided, a prompt will appear for input during connection
- localID *string*, *optional*
- remoteID *string*
- IPSecGroup *string*, *optional*
- IPSecSecret *string*
- L2TPSecret *string*
- sendAllTraffic *boolean*, *optional*, defaults to `true`

#### Example: IKEv2

```lua title="vpnconf.create.ikev2"
vpnconf = require "vpnconf"
ok = vpnconf.create {
  dispName = 'xtzn',           -- VPN display name
  VPNType = "IKEv2",           -- VPN type
  server = '47.57.242.167',    -- Server address
  authorization = 'xtzn',      -- Username
  password = 'xtznmima321',    -- Password
  VPNLocalIdentifier = 'xtzn',           -- Local ID
  VPNRemoteIdentifier = '47.57.242.167'  -- Remote ID
}
```

#### Example: IPSec

```lua title="vpnconf.create.ipsec"
vpnconf = require "vpnconf"
ok = vpnconf.create {
  dispName = 'xtzn',           -- VPN display name
  VPNType = "IPSec",           -- VPN type
  server = '47.57.242.167',    -- Server address
  authorization = 'xtzn',      -- Username
  password = 'xtznmima321',    -- Password
  group = '',      -- IPSec group
  secret = 'xtzn'  -- IPSec secret
}
```

#### Example: L2TP

```lua title="vpnconf.create.l2tp"
vpnconf = require "vpnconf"
ok = vpnconf.create {
  dispName = 'xtzn',           -- VPN display name
  VPNType = "L2TP",            -- VPN type
  server = '47.57.242.167',    -- Server address
  authorization = 'xtzn',      -- Username
  password = 'xtznmima321',    -- Password
  secret = 'xtzn',             -- L2TP secret
  VPNSendAllTraffic = true     -- Send all traffic
}
```

### Get the List of Current System VPNs \(**vpnconf\.list**\)

#### Declaration

```lua
vpnList = vpnconf.list()
```

#### Parameters and Return Values

- vpnList
  - *array*, returns `nil` if retrieval fails

```lua title="VPN List Structure"
{
  {dispName = display_name1, vpn_id = vpn_id1},
  {dispName = display_name2, vpn_id = vpn_id2},
  ...
}
```

#### Example

```lua title="vpnconf.list"
vpnconf = require "vpnconf"
local list = vpnconf.list()
if list then
  sys.alert(table.deep_print(list))
else
  sys.alert('Failed to retrieve, are you sure your luck is okay?')
end
```

### Select a VPN Configuration \(**vpnconf\.select**\)

#### Declaration

```lua
success = vpnconf.select(display_name or vpn_id)
```

#### Parameters and Return Values

- display_name or vpn_id
  - *string*, selects a VPN. If multiple VPNs have the same **display_name**, it is not guaranteed which one will be selected. For precise selection, pass **vpn_id**.
- success
  - *boolean*, operation fails if the specified configuration does not exist

:::note
**vpn_id** can be obtained through the [`vpnconf.list`](#get-the-list-of-current-system-vpns-vpnconflist) function.
:::

#### Example

```lua title="vpnconf.select"
vpnconf = require "vpnconf"
local success = vpnconf.select('Test VPN 1')
if success then
  sys.alert('Operation successful')
else
  sys.alert('Operation failed, are you sure the VPN configuration you want to select exists?')
end
```

### Delete a VPN Configuration \(**vpnconf\.delete**\)

#### Declaration

```lua
success = vpnconf.delete(display_name or vpn_id)
```

#### Parameters and Return Values

- display_name or vpn_id
  - *string*, deletes a VPN. If multiple VPNs have the same **display_name**, it is not guaranteed which one will be deleted. For precise deletion, pass **vpn_id**.
- success
  - *boolean*, operation fails if the specified configuration does not exist

:::note
**vpn_id** can be obtained through the [`vpnconf.list`](#get-the-list-of-current-system-vpns-vpnconflist) function.
:::

#### Example

```lua title="vpnconf.delete"
vpnconf = require "vpnconf"
local success = vpnconf.delete('Test VPN 1')
if success then
  sys.alert('Operation successful')
else
  sys.alert('Operation failed, are you sure the VPN configuration you want to delete exists?')
end
```

### Clear All VPN Configurations \(**vpnconf\.clear**\)

#### Declaration

```lua
success = vpnconf.clear()
```

#### Parameters and Return Values

- success *boolean*

:::caution
This function clears all VPN configurations and cannot be undone. Use with caution!
:::

### Establish a Connection with the Currently Selected VPN \(**vpnconf\.connect**\)

#### Declaration

```lua
success = vpnconf.connect()
```

#### Parameters and Return Values

- success
  - *boolean*, operation fails if no configuration is selected

:::caution
A successful operation does not guarantee a successful connection. Use the [`vpnconf.status`](#get-the-status-of-the-currently-selected-vpn-vpnconfstatus) function to check.
:::

#### Example

```lua title="vpnconf.connect"
vpnconf = require "vpnconf"
local success = vpnconf.connect()
if success then
  sys.alert('Operation successful, establishing connection...')
else
  sys.alert('No VPN configuration is currently selected. After successfully creating a VPN, remember to call vpnconf.select to select it.')
end
```

### Disconnect the Current VPN Connection \(**vpnconf\.disconnect**\)

#### Declaration

```lua
success = vpnconf.disconnect()
```

#### Parameters and Return Values

- success
  - *boolean*, operation fails if no configuration is selected

:::caution
A successful operation does not guarantee a successful disconnection. Use the [`vpnconf.status`](#get-the-status-of-the-currently-selected-vpn-vpnconfstatus) function to check.
:::

#### Example

```lua title="vpnconf.disconnect"
vpnconf = require "vpnconf"
local success = vpnconf.disconnect()
if success then
  sys.alert('Operation successful, disconnecting...')
else
  sys.alert('No VPN configuration is currently selected. After successfully creating a VPN, remember to call vpnconf.select to select it.')
end
```

### Get the Status of the Currently Selected VPN \(**vpnconf\.status**\)

#### Declaration

```lua
status_tab = vpnconf.status()
```

#### Parameters and Return Values

- status_tab
  - *table*, returns `nil` if no VPN is selected

```lua title="Status Table Structure"
{
  text = description of the current status,
  connected = whether the connection is successful,
  disconnected = whether the connection is disconnected,
}
```

:::caution
For VPN configurations created by apps (e.g., Surge iOS), the status table may not correctly reflect the current connection status. Please check the app for details.
:::

#### Example

```lua title="vpnconf.status"
vpnconf = require "vpnconf"
local status = vpnconf.status()
if status then
  sys.alert(table.deep_print(status))
else
  sys.alert('No VPN configuration is currently selected. After successfully creating a VPN, remember to call vpnconf.select to select it.')
end
```
