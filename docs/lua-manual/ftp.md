---
sidebar_position: 16
---

# FTP Module

## FTP Module - ftp

This module will automatically process the URL using [`string.encode_uri`](./exstring.md#-url-encoding-stringencode_uristringencode_uri_component) by default.

The conventional URL format for the FTP protocol is `ftp://[username[:password]@]server_address[:server_port][/path]`.  
If the username or password contains the characters `@`, `:`, or `/`, they can be replaced with `%40`, `%3A`, and `%2F`, respectively. For other characters that are not allowed in URLs, you can use [`string.encode_uri_component`](./exstring.md#-url-encoding-stringencode_uristringencode_uri_component) for encoding.

Functions marked with 🚥 will **yield** in the [**Thread Module**](./thread.md). Before these function calls return, other **threads** may get a chance to run.

### 🚥 FTP File Download \(**ftp\.download**\)

#### Declaration

```lua
success, download_info = ftp.download(URL, local_file_path[, timeout_seconds, resume_mode, chunk_callback, buffer_size])
```

#### Parameters and Return Values

- URL
  - *string*, the remote file address, with the account and password included in this parameter
- Local File Path *string*
- Timeout Seconds
  - *number*, *optional*, in seconds, default is `10`
- Resume Mode
  - *boolean*, *optional*, default is `false`
- Chunk Callback *function*, *optional*
  - This function is called after each data chunk is downloaded, default is **empty function**
  - The first parameter passed to the **chunk callback** is the current download information. If the callback function returns `true`, the download will be interrupted.
- Buffer Size
  - *integer*, *optional*, buffer size in bytes, default is **automatic**
- Success *boolean*
- Download Info
  - *table* or *string*, returns detailed download information if the connection is successful, or the reason for failure otherwise

```lua title="Download Info Table Structure"
{
  resource_size = total bytes of the remote resource,
  start_pos = starting position of this download in the resource,
  size_download = bytes downloaded in this session,
  speed_download = download speed in bytes/second,
}
```

#### Example 1

Given the FTP account `havonz` and password `11@@22`:

```lua title="ftp.download"
local done, info = ftp.download("ftp://havonz:11%40%4022@192.168.31.13/1.zip", "/var/mobile/1.zip")
if done then
  sys.alert("If nothing went wrong, the download is complete")
else
  sys.alert("Connection failed: "..info)
end
```

#### Example 2

```lua title="ftp.download"
local done, info = ftp.download("ftp://havonz:123456@192.168.31.13/1.zip", "/var/mobile/1.zip", 10, true, function(binfo)
  local percent = math.floor(((binfo.start_pos + binfo.size_download) / binfo.resource_size) * 100)
  sys.toast("Download progress "..percent.."%")
  return false  -- Returning true will interrupt the download
end, 4096 * 1024)
--
if done then
  if info.start_pos + info.size_download < info.resource_size then
    sys.alert(
      "Download interrupted\nDownloaded "..info.size_download.." bytes"
      .."\nStarted from byte "..info.start_pos
      .."\nAverage speed "..math.floor(info.speed_download/1024).." kB/s"
      .."\nRemaining "..(info.resource_size - (info.start_pos + info.size_download)).." bytes"
    )
  else
    sys.alert(
      "Download complete\nDownloaded "..info.size_download.." bytes"
      .."\nStarted from byte "..info.start_pos
      .."\nAverage speed "..math.floor(info.speed_download/1024).." kB/s"
    )
  end
else
  sys.alert("Connection failed: "..info)
end
```

### 🚥 FTP File Upload \(**ftp\.upload**\)

#### Declaration

```lua
success, upload_info = ftp.upload(local_file_path, URL[, timeout_seconds, resume_mode, chunk_callback, buffer_size])
```

#### Parameters and Return Values

- Local File Path *string*
- URL
  - *string*, the remote file address, with the account and password included in this parameter
- Timeout Seconds
  - *number*, *optional*, in seconds, default is `10`
- Resume Mode
  - *boolean*, *optional*, default is `false`
- Chunk Callback *function*, *optional*
  - This function is called after each data chunk is uploaded, default is **empty function**
  - The first parameter passed to the **chunk callback** is the current upload information. If the callback function returns `true`, the upload will be interrupted.
- Buffer Size
  - *integer*, *optional*, buffer size in bytes, default is **automatic**
- Success *boolean*
- Upload Info
  - *table* or *string*, returns detailed upload information if the connection is successful, or the reason for failure otherwise

```lua title="Upload Info Table Structure"
{
  resource_size = total bytes of the local file,
  start_pos = starting position of this upload in the local file,
  size_upload = bytes uploaded in this session,
  speed_upload = upload speed in bytes/second,
}
```

#### Example 1

Given the FTP account `havonz` and password `11@@22`:

```lua title="ftp.upload"
local done, info = ftp.upload("/var/mobile/1.zip", "ftp://havonz:11%40%4022@192.168.31.13/1.zip")
if done then
  sys.alert("If nothing went wrong, the upload is complete")
else
  sys.alert("Connection failed: "..info)
end
```

#### Example 2

```lua title="ftp.upload"
local done, info = ftp.upload("/var/mobile/1.zip", "ftp://havonz:123456@192.168.31.13/1.zip", 10, true, function(binfo)
  local percent = math.floor(((binfo.start_pos + binfo.size_upload) / binfo.resource_size) * 100)
  sys.toast("Upload progress "..percent.."%")
  return false  -- Returning true will interrupt the upload
end, 4096 * 1024)
--
if done then
  if info.start_pos + info.size_upload < info.resource_size then
    sys.alert(
      "Upload interrupted\nUploaded "..info.size_upload.." bytes"
      .."\nStarted from byte "..info.start_pos
      .."\nAverage speed "..math.floor(info.speed_upload/1024).." kB/s"
      .."\nRemaining "..(info.resource_size - (info.start_pos + info.size_upload)).." bytes"
    )
  else
    sys.alert(
      "Upload complete\nUploaded "..info.size_upload.." bytes"
      .."\nStarted from byte "..info.start_pos
      .."\nAverage speed "..math.floor(info.speed_upload/1024).." kB/s"
    )
  end
else
  sys.alert("Connection failed: "..info)
end
