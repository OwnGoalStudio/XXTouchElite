---
sidebar_position: 19
---

# Clear Module

## Clear Module - clear

:::caution Deprecated
The function calls in this module may take a long time, block all coroutines, and do not support interruption. It is recommended to use other third-party tools for clearing.
:::

### Clear specific or grouped keychain information \(**clear\.keychain**\)

#### Declaration

```lua
success = clear.keychain(reverse_domain)
```

#### Parameters and Return Values

- reverse_domain
  - *string*, typically the reverse domain of the app developer ([Reverse Domain](https://en.wikipedia.org/wiki/Reverse_domain_name_notation)), e.g., `"com.cardify"`. Do not pass arbitrary parameters.
- success *boolean*

#### Description

Clears the keychain information of a specific app or app group. If unsure, directly use [`clear.all_keychain`](#clear-all-app-keychain-information-clearall_keychain).

#### Example

```lua title="clear.keychain"
clear.keychain("com.cardify")  -- Clears keychain information related to com.cardify
```

### Clear all app keychain information \(**clear\.all\_keychain**\)

#### Declaration

```lua
success = clear.all_keychain()
```

#### Parameters and Return Values

- success *boolean*

:::caution
Calling this will clear the keychain information of all third-party apps.
:::

### Revoke specific app privacy permissions \(**clear\.privileges**\)

#### Declaration

```lua
success = clear.privileges(identifier)
```

#### Parameters and Return Values

- identifier
  - *string*, [App Identifier](app.md#identifier)
- success *boolean*

#### Description

Revokes various privacy permissions of a specific app in **Settings** → **Privacy & Security**. After the app restarts, it will no longer be able to access related data and may prompt the user for access permission.

### Revoke all app privacy permissions \(**clear\.all\_privileges**\)

#### Declaration

```lua
success = clear.all_privileges()
```

#### Parameters and Return Values

- success *boolean*

:::caution
Calling this will revoke all privacy permissions of all apps (including system apps).
:::

### Clear clipboard \(**clear\.pasteboard**\)

#### Declaration

```lua
clear.pasteboard()
```

#### Description

Some tracking information may exist in the clipboard.

:::caution Limitation
You may need to restart the app to continue using the clipboard service.
:::

### Clear browser cookies \(**clear\.cookies**\)

#### Declaration

```lua
clear.cookies()
```

#### Description

Some tracking information may exist in browser cookies. This only applies to Safari.

### Clear system caches \(**clear\.caches**\)

#### Declaration

```lua
success = clear.caches()
```

#### Parameters and Return Values

- success *boolean*

:::note
This function call will forcibly restart the `configd` and `cfprefsd` services.
:::

#### Example

```lua title="clear.caches"
clear.caches()
--
clear.caches { uicache = true }  -- Also rebuild icon cache
```

### Clear all local photos in the album \(**clear\.all\_photos**\)

#### Declaration

```lua
clear.all_photos()
```

#### Description

Clears all local photos in the album. This will not affect iCloud Photo Stream. All threads are blocked during the clearing process.

:::caution Performance
This may take a very long time.
:::

### Clear specific app archive data \(**clear\.app\_data**\)

#### Declaration

```lua
success = clear.app_data(identifier)
```

#### Parameters and Return Values

- identifier
  - *string*, [App Identifier](app.md#identifier)
- success *boolean*

#### Description

Clears the app archive. All threads are blocked during the clearing process.

:::caution Performance
This may take a very long time.
:::

#### Example

```lua title="clear.app_data"
clear.app_data("com.cardify.tinder")
```

### Clear IDFA/V \(**clear\.idfav**\)

#### Declaration

```lua
success, old_idfav_table = clear.idfav(new_idfa[, new_idfav_table])
```

#### Parameters and Return Values

- new_idfa
  - *string*, IDFA text in [RFC 4122](https://www.ietf.org/rfc/rfc4122.txt) format
- new_idfav_table
  - *table*, *optional*, pass in new IDFA/V information. If not passed, the **new_idfa** will be used.
- success *boolean*
- old_idfav_table
  - *table*, returns the **original** IDFA/V information. Returns `nil` if the operation fails.

#### Description

Resets the system IDFA and IDFV identifiers, i.e., the **IDFA/V table**.

:::info
When the **new_idfa** is `"READ"`, it only reads without clearing or modifying.
:::

:::note
You do not need to worry about the specific format of the **IDFA/V table**. Simply pass the return value **old_idfav_table** from the previous call as the parameter **new_idfav_table** to restore the system IDFA and IDFV identifiers to their original state.  
The **IDFA/V table** can be safely serialized by the [`plist`](plist.md) module.
:::

#### Example 1

```lua title="clear.idfav.read"
ok, tab = clear.idfav("READ")
--
sys.alert(ok and tab.LSAdvertiserIdentifier or "Read failed")
```

#### Example 2

```lua title="clear.idfav.reset"
-- Read the original IDFA/V table and back it up
ok, tab1 = clear.idfav("READ")
if ok then
  plist.write("lsd.plist", tab1)
  sys.alert(ok and "Backup successful" or "Backup failed")
end
--
-- Clear the IDFA/V table
ok, tab2 = clear.idfav("00000000-0000-0000-0000-000000000000")
assert(tab1.LSAdvertiserIdentifier == tab2.LSAdvertiserIdentifier)
--
-- Read the backed-up IDFA/V table and restore
oldtab = plist.read("lsd.plist")
if oldtab then
  ok, tab3 = clear.idfav(oldtab.LSAdvertiserIdentifier, oldtab)
  sys.alert(ok and "Restore successful" or "Restore failed")
end
```

### Clear location caches \(**clear\.location\_caches**\)

#### Declaration

```lua
success = clear.location_caches()
```

#### Parameters and Return Values

- success *boolean*

:::note
This function call will forcibly restart the `locationd` service.
:::

### Clear push notification caches \(**clear\.push\_notifications**\)

#### Declaration

```lua
success = clear.push_notifications(identifier)
```

#### Parameters and Return Values

- identifier
  - *string*, [App Identifier](app.md#identifier)
- success *boolean*

:::info
Passing `"*"` as the **identifier** will log out all running apps.
:::

:::note
This function call will forcibly restart the `apsd` service.
:::

### Clear Safari history and website data \(**clear\.safari**\)

#### Declaration

```lua
success = clear.safari()
```

#### Parameters and Return Values

- success *boolean*

:::info

- This function call will not clear **Safari** bookmarks.
- This function call is equivalent to selecting **Clear History and Website Data** in **Settings** → **Safari**.

:::
