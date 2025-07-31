---
sidebar_position: 17
---

# SMB Module

## SMB Module - samba

This module will automatically process the URL using [`string.encode_uri`](./exstring.md#-url-encoding-stringencode_uristringencode_uri_component) by default.

The conventional URL format for the SMB protocol is `smb://[username[:password]@]server_address[:server_port]/share[/path]`.

Functions marked with 🚥 will **yield** in the [**Thread Module**](./thread.md). Before these function calls return, other **threads** may get a chance to run.

### Samba Client \(**samba\.client**\)

*SMB Client* is a type of [Lua *userdata*](https://www.lua.org/manual/5.3/manual.html#2.1) that contains configuration information for accessing SMB server shared folders, including username and password.

#### Declaration

```lua
client = samba.client(workgroup, username, password)
```

```lua
client = samba.client {
  workgroup = workgroup,
  username = username,
  password = password,
}
```

#### Parameters and Return Values

- workgroup
  - *string*, typically this would be `WORKGROUP`
- username *string*
- password *string*
- client *SMB Client*

#### Description

All operations on this client will use the above information for authentication, eliminating the need to pass username and password through the URL.

#### Example

```lua title="samba.client"
client = samba.client {
  workgroup = "WORKGROUP",
  username = 'guest',
  password = 'mypassword123'
}
```

### Check if a Value is an SMB Client \(**samba\.is**\)

#### Declaration

```lua
is_samba_client = samba.is(value_to_check)
```

#### Parameters and Return Values

- value_to_check *any type*
- is_samba_client *boolean*

### 🚥 List Directory Contents on SMB Server \(**samba\:list**\)

#### Declaration

```lua
directory_contents, error_message = client:list(URL)
```

#### Parameters and Return Values

- client *SMB Client*
- URL
  - *string*, directory URL on the SMB server starting with `smb://`
- directory_contents
  - *array*, contents of the **URL** directory, where each element is a *table* containing information such as file name, file size, file type, etc. Returns `nil` when the directory cannot be accessed
- error_message
  - *string*, returns the error description when the directory cannot be accessed

#### Example

```lua title="samba:list"
tab, err = smbclient:list('smb://WORKGROUP/Documents/JSTColorPicker')
```

#### Example Output

```lua
{
  [1] = {
    modification = 1654506149.0,  -- Last modification timestamp
    name = "TagList.sqlite-wal",  -- File name
    path = "smb://WORKGROUP/Documents/JSTColorPicker/TagList.sqlite-wal",    -- Full file path
    size = 74192,                 -- File size
    type = "file",                -- File type, either "file" or "dir"
    access = 1654533327.0,        -- Last access timestamp
    mode = 33252,
    creation = 1654506149.0,      -- Creation timestamp
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

### 🚥 Create Directory on SMB Server \(**samba\:mkdir**\)

#### Declaration

```lua
directory_attributes, error_message = client:mkdir(URL)
```

#### Parameters and Return Values

- client *SMB Client*
- URL
  - *string*, directory URL on the SMB server starting with `smb://`
- directory_attributes
  - *table*, directory attributes of **URL**, containing information such as file name, file size, file type, etc. Returns `nil` when the directory cannot be created
- error_message
  - *string*, returns the error description when the operation fails

:::caution Limitation
This function does not support recursive creation of multi-level directories.
:::

#### Example

```lua title="samba:mkdir"
tab, err = smbclient:mkdir('smb://WORKGROUP/Documents/JSTColorPicker/test_dir')
```

#### Example Output

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

### 🚥 Create Empty File on SMB Server \(**samba\:touch**\)

#### Declaration

```lua
success, error_message = client:touch(URL)
```

#### Parameters and Return Values

- client *SMB Client*
- URL
  - *string*, file URL on the SMB server starting with `smb://`
- success *boolean*
- error_message
  - *string*, returns the error description when the operation fails

#### Example

```lua title="samba:touch"
ok, err = smbclient:touch('smb://WORKGROUP/Documents/JSTColorPicker/test_dir/aaa')
```

### 🚥 Delete File or Empty Directory on SMB Server \(**samba\:remove**\)

#### Declaration

```lua
success, error_message = client:remove(URL)
```

#### Parameters and Return Values

- client *SMB Client*
- URL
  - *string*, file or empty directory URL on the SMB server starting with `smb://`
- success *boolean*
- error_message
  - *string*, returns the error description when the operation fails

#### Description

When deleting a directory, the directory must be empty. Attempting to delete a non-empty directory will result in a `directory not empty` error.

#### Example

```lua title="samba:remove"
ok, err = smbclient:remove('smb://WORKGROUP/Documents/JSTColorPicker/test_dir')
```

### 🚥 Recursively Delete Directory on SMB Server \(**samba\:rmdir**\)

#### Declaration

```lua
success, error_message = client:rmdir(URL)
```

#### Parameters and Return Values

- client *SMB Client*
- URL
  - *string*, directory URL on the SMB server starting with `smb://`
- success *boolean*
- error_message
  - *string*, returns the error description when the deletion fails

#### Description

Recursively deletes all files and subdirectories under the **URL** directory.

#### Example

```lua title="samba:rmdir"
ok, err = smbclient:rmdir('smb://WORKGROUP/Documents/JSTColorPicker/test_dir')
```

### 🚥 Rename File or Directory on SMB Server \(**samba\:rename**\)

#### Declaration

```lua
success, error_message = client:rename(old_URL, new_URL)
```

#### Parameters and Return Values

- client *SMB Client*
- old_URL, new_URL
  - *string*, file or directory URL on the SMB server starting with `smb://`
- success *boolean*
- error_message
  - *string*, returns the error description when the operation fails

#### Description

Renames (moves) the file or directory from **old_URL** to **new_URL**.

#### Example

```lua title="samba:rename"
ok, err = smbclient:rename('smb://WORKGROUP/Documents/JSTColorPicker/.DS_Store', 'smb://WORKGROUP/Documents/JSTColorPicker/DS_Store')
```

### 🚥 Copy File on SMB Server \(**samba\:copy**\)

#### Declaration

```lua
success, error_message = client:copy(source_URL, destination_URL[, overwrite])
```

#### Parameters and Return Values

- client *SMB Client*
- source_URL, destination_URL
  - *string*, file URL on the SMB server starting with `smb://`
- overwrite
  - *boolean*, whether to delete and then write if **destination_URL** already exists
- success *boolean*
- error_message
  - *string*, returns the error description when the operation fails

#### Description

Copies the file from **source_URL** to **destination_URL**.

:::caution Limitations

- This function only supports copying regular files, not recursive copying of directories.
  - **source_URL** and **destination_URL** must be file URLs, not directory URLs.
  - The parent directory of **destination_URL** must already exist.
- This function does not currently support Server-Side Copy operations.
  - The current implementation downloads to local storage first, then uploads to the server.

:::

#### Example

```lua title="samba:copy"
ok, err = smbclient:copy('smb://WORKGROUP/Downloads/Archive.zip', 'smb://WORKGROUP/Downloads/Archive_1.zip', true)  -- Overwrite
```

### 🚥 Download File or Directory from SMB Server \(**samba\:download**\)

#### Declaration

```lua
success, error_message = client:download(remote_URL, local_path[, progress_callback])
```

#### Parameters and Return Values

- client *SMB Client*
- remote_URL
  - *string*, file or directory URL on the SMB server starting with `smb://`
- local_path
  - *string*, local file or directory path
- progress_callback
  - *function*, *optional*, used to receive download progress callbacks. When the return value is `true`, the download is terminated. The parameters passed to the callback function are:
    - current_file_attributes *table*
    - current_file_transferred_bytes *integer*
- success *boolean*
- error_message
  - *string*, returns the error description when the operation fails

```lua title="Current File Attributes Structure"
{
  modification = 1654506149.0,  -- Last modification timestamp
  name = "TagList.sqlite-wal",  -- File name
  path = "smb://WORKGROUP/Documents/JSTColorPicker/TagList.sqlite-wal",    -- Full file path
  size = 74192,                 -- File size
  type = "file",                -- File type, either "file" or "dir"
  access = 1654533327.0,        -- Last access timestamp
  mode = 33252,
  creation = 1654506149.0,      -- Creation timestamp
}
```

#### Description

If **remote_URL** points to a remote directory, all files and subdirectories under the directory will be downloaded **recursively**.

#### Example

```lua title="samba:download"
-- Local path supports both relative and absolute paths
ok, err = smbclient:download('smb://WORKGROUP/Documents/JSTColorPicker', 'JSTColorPicker')
```

### 🚥 Upload File or Directory to SMB Server \(**samba\:upload**\)

#### Declaration

```lua
success, error_message = client:upload(local_path, remote_URL[, progress_callback])
```

#### Parameters and Return Values

- client *SMB Client*
- local_path
  - *string*, local file or directory path
- remote_URL
  - *string*, file or directory URL on the SMB server starting with `smb://`
- progress_callback
  - *function*, *optional*, used to receive upload progress callbacks. When the return value is `true`, the upload is terminated. The parameters passed to the callback function are:
    - current_file_attributes
      - *table*, refer to the **Current File Attributes Structure** in [`samba:download`](#download-file-or-directory-from-smb-server-sambadownload)
    - current_file_transferred_bytes *integer*
- success *boolean*
- error_message
  - *string*, returns the error description when the operation fails

#### Description

If **local_path** points to a local directory, all files and subdirectories under the directory will be uploaded **recursively**.

#### Example

```lua title="samba:upload"
ok, err = smbclient:upload('plugins', 'smb://WORKGROUP/Documents/plugins')
```
