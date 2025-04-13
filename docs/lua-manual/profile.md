---
sidebar_position: 27
---

# Profile Module

## Profile Module - profile

### Import Profile \(**profile\.import**\)

#### Declaration

```lua
success, error_message = profile.import(profile_path[, install])
```

#### Parameters and Return Values

- profile_path *string*
- install *boolean*, optional, defaults to `false`
- success *boolean*
- error_message *string*

#### Description

Imports a specified profile into **"Settings"** → **"Downloaded Profiles"**.
If **install** is set to `true`, the specified profile will also be installed into **"Settings"** → **"General"** → **"Profiles & Device Management"**.

:::info
If the installed profile is a root certificate, it will automatically be added to **"Settings"** → **"General"** → **"About"** → **"Certificate Trust Settings"** → **"Enable Full Trust for Root Certificates"** and fully trusted.
:::

:::note
Installing the same profile multiple times will overwrite the previous one.
:::

#### Example

```lua title="profile.import"
profile.import("XXTouch_Root_CA.pem")
```

### List All Profiles \(**profile.list**\)

#### Declaration

```lua
profile_list = profile.list()
```

#### Parameters and Return Values

- profile_list
  - *array*, where each element is a *table* representing a profile. The structure is detailed in [Profile Structure](#profile-structure).

#### Example

```lua title="profile.list"
local profiles = profile.list()
for _, profile in ipairs(profiles) do
  nLog(profile.PayloadDisplayName)
end
```

### Fetch Profile \(**profile.fetch**\)

#### Declaration

```lua
profile = profile.fetch(profile_id)
```

#### Parameters and Return Values

- profile_id *string*
- profile
  - *table*, with the following structure. If the specified profile does not exist, returns `nil`.

#### Profile Structure

Some fields are truncated as `...` for brevity.
The `PayloadIdentifier` is the **profile_id**.

```lua
{
  ["PayloadType"] = "CertificateWrapper",
  ["PayloadUUID"] = "B53CE4EA-23F1-48A8-9289-EFA36489D9AA",
  ["PayloadIdentifier"] = "aef166f14b22d087e040a4708d7548bc8a531be9a",  -- profile_id
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

#### Example

```lua title="profile.fetch"
local res = profile.fetch("aef166f14b22d087e040a4708d7548bc8a531be9a")
if res then
  nLog(res.PayloadDisplayName)
end
```

### Remove Profile \(**profile.remove**\)

#### Declaration

```lua
profile.remove(profile_id)
```

#### Parameters and Return Values

- profile_id *string*

#### Example

```lua title="profile.remove"
profile.remove("aef166f14b22d087e040a4708d7548bc8a531be9a")
```

### Clear All Profiles \(**profile.clear**\)

#### Declaration

```lua
profile.clear()
```

:::caution
Immediately clears all installed profiles. Use with caution.
:::
