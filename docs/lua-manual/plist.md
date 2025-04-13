---
sidebar_position: 13
---

# Property List Module

## Property List Module - plist

### Read Property List File \(**plist\.read**\)

#### Declaration

```lua
tab = plist.read(file_path)
```

#### Parameters and Return Values

- file_path *string*
- tab
  - *associative table*, returns `nil` if reading fails

#### Example

```lua title="plist.read"
local plfilename = "/var/mobile/Library/Caches/com.apple.mobile.installation.plist"  -- Set the property list file path
local tmp2 = plist.read(plfilename)                 -- Read the property list file content and return a Lua table
sys.alert(tmp2['Metadata']['ProductBuildVersion'])  -- Display the value of the ProductBuildVersion key
```

### Write Property List File \(**plist\.write**\)

#### Declaration

```lua
success = plist.write(file_path, tab)
```

#### Parameters and Return Values

- file_path *string*
- tab *associative table*
- success *boolean*

:::caution Limitations

- Be careful not to pass in tables with **reference loops**, as this will cause the script to hang or crash.
- Not all Lua values can be serialized into property list data, such as userdata, functions, or tables containing userdata or functions. These values will be ignored during serialization.
- Modifying property list files will change their owner to `root`. If you need to modify the property list of a user app, you must correct its ownership.

:::

#### Example

```lua
local plfilename = "/var/mobile/Library/Caches/com.apple.mobile.installation.plist"  -- Set the property list file path
local tmp2 = plist.read(plfilename)                -- Read the property list file content and return a Lua table
tmp2["Metadata"]["ProductBuildVersion"] = "havonz" -- Modify the ProductBuildVersion key value in the table to "havonz"
plist.write(plfilename, tmp2)                      -- Write the modified table back to the property list file
--
local posix = require("posix")                     -- Import the posix module
posix.chmod(plfilename, "rw-r--r--")               -- Correct the file permissions of the property list file to 0644
--
local unistd = require("posix.unistd")             -- Import the posix.unistd module
unistd.chown(plfilename, 501, 501)                 -- Correct the owner of the property list file to 501
```

### Load Property List Data as Lua Table \(**plist\.load**\)

#### Declaration

```lua
tab = plist.load(property_list_data)
```

#### Parameters and Return Values

- property_list_data *string*
- tab
  - *associative table*, returns `nil` if loading fails

#### Example 1

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
sys.alert(jtmp.arr[1])  -- Output 46
sys.alert(jtmp.dict.c)  -- Output 9
```

#### Example 2

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
sys.alert(xtmp.arr[1])  -- Output 46
sys.alert(xtmp.dict.c)  -- Output 9
```

### Dump Lua Table to Property List Data \(**plist\.dump**\)

#### Declaration

```lua
property_list_data = plist.dump(tab[, format])
```

#### Parameters and Return Values

- tab *associative table*
- format
  - *string*, *optional*, can only be `binary` or `XML`, defaults to `XML`
- property_list_data
  - *string*, returns `nil` if conversion fails

:::caution Limitations

- Be careful not to pass in tables with **reference loops**, as this will cause the script to hang or crash.
- Not all Lua values can be serialized into property list data, such as userdata, functions, or tables containing userdata or functions. These values will be ignored during serialization.

:::

#### Example

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
sys.alert(xplist)  -- Output property list data in XML format
--
local bplist = plist.dump(tab, "binary")
sys.alert(bplist)  -- Binary format property list data, will appear garbled when printed
```
