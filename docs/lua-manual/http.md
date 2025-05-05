---
sidebar_position: 15
---

# HTTP Module

## HTTP Module - http

This module will automatically process the URL using [`string.encode_uri`](./exstring.md#-url-encoding-stringencode_uristringencode_uri_component) by default.

Functions marked with 🚥 may **yield** in the [**Thread Module**](./thread.md). Before these functions return, other **threads** may get a chance to run.

### 🚥 Initiate a GET Request \(**http\.get**\)

#### Declaration

```lua
http_status_code, response_header_json_text, response_body = http.get(url[, timeout_seconds, request_headers ])
```

#### Parameters and Return Values

- url *string*
- timeout_seconds
  - *number*, *optional*, in seconds, default is `10`
- request_headers
  - *table*, *optional*, headers for the request, format `{field1 = value1, field2 = value2, ...}`, default is an empty table `{}`
- http_status_code
  - *integer*, returns `-1` if the request times out
- response_header_json_text
  - *string*, returns the JSON text of the response headers if the request completes, returns `nil` if it times out
- response_body
  - *string*, returns the response content if the request completes, returns `nil` if it times out

#### Description

Uses the HTTP/1.1 protocol’s GET method to request and retrieve a network resource.

:::note
Resources will not be stored on disk. If you need to download large network resources, consider using [`http.download`](#-http-file-download-httpdownload).
:::

#### Example 1

```lua title="http.get"
local code, res_headers, body = http.get("http://www.baidu.com", 1, {
  ["User-Agent"] = "Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.0)";  -- Simulate an IE8 request
  ["Cookie"] = "Do you even know how to do this?";  -- Submit a Cookie along with the request
})
if code == 200 then  -- If the returned status code is HTTP_OK
  sys.alert(body)    -- Output the HTML content of Baidu's homepage
end
```

#### Example 2

```lua title="http.get"
-- Chinese URLs will be automatically escaped by default, URLs containing Chinese characters can be called directly as shown below
local c, h, r = http.get("https://www.xxtouch.com/测试文本.txt")
if c == 200 then  -- If the returned status code is HTTP_OK
  sys.alert(r)    -- Output the content
end
--
-- The following example is equivalent to the above example
local c, h, r = http.get("https://www.xxtouch.com/%E6%B5%8B%E8%AF%95%E6%96%87%E6%9C%AC.txt", 5, {}, true--[[here]])
if c == 200 then  -- If the returned status code is HTTP_OK
  sys.alert(r)    -- Output the content
end
```

#### Example 3

```lua title="http.get"
-- Get external IPv4 address
function get_ip()
  local done = false
  thread.dispatch(function()
    while true do
      if done then
        sys.toast("", -1)
        return
      else
        sys.toast("Getting IP address…", device.front_orien())
      end
      sys.msleep(2000)
    end
  end)
  while true do
    local c, h, b = http.get("http://lumtest.com/myip.json?ts="..tostring(sys.rnd()), 60)
    if c == 200 then
      sys.toast("", -1)
      done = true
      return b:match('%d+%.%d+%.%d+%.%d+')
    end
  end
end
--
-- Copy the above code to the beginning of your script, then use it in your script
sys.alert(get_ip())
```

### 🚥 Initiate a POST Request \(**http\.post**\)

#### Declaration

```lua
http_status_code, response_header_json_text, response_body = http.post(url[, timeout_seconds, request_headers, request_body ])
```

#### Parameters and Return Values

- url *string*
- timeout_seconds
  - *number*, *optional*, in seconds, default is `10`
- request_headers
  - *table*, *optional*, headers for the request, format `{field1 = value1, field2 = value2, ...}`, default is an empty table `{}`
- request_body
  - *string*, *optional*, data content to be sent with the request, default is an empty string `""`
- http_status_code
  - *integer*, returns `-1` if the request times out
- response_header_json_text
  - *string*, returns the JSON text of the response headers if the request completes, returns `nil` if it times out
- response_body
  - *string*, returns the response content if the request completes, returns `nil` if it times out

#### Description

Uses the HTTP/1.1 protocol’s POST method to submit data to the server.

:::caution
You need to specify the [`Content-Type`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Type) request header yourself, otherwise the server may refuse to accept the data.
:::

#### Example 1

```lua title="http.post"
local code, res_headers, body = http.post("http://www.baidu.com", 1, {
  ["User-Agent"] = "Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.0)",  -- Simulate an IE8 request
  ["Cookie"] = "Do you even know how to do this?";  -- Submit a Cookie along with the request
}, "Data to be sent")
if code == 200 then  -- If the returned status code is HTTP_OK
    sys.alert(body)  -- Output the HTML content of Baidu's homepage
end
```

#### Example 2

```lua title="http.post"
local c, h, r = http.post('http://httpbin.org/post', 60, {}, 'name=havonz&qq=1004695100&wechat=havonz')
if c == 200 then
  sys.alert(r, 0, 'Submission successful')
else
  if c == -1 then
    sys.alert('Request failed, please check your network connection', 0, 'Connection timeout')
  else
    sys.alert('Error code #'..c..'\n'..r, 0, 'HTTP Error')
  end
end
```

### 🚥 HTTP File Download \(**http\.download**\)

#### Declaration

```lua
download_success, download_info = http.download(url, local_file_path[, connection_timeout_seconds, resume_mode, chunk_callback_function, buffer_size ])
```

#### Parameters and Return Values

- url *string*
- local_file_path *string*
- connection_timeout_seconds
  - *number*, *optional*, in seconds, default is `10`
- resume_mode
  - *boolean*, *optional*, default is `false`
- chunk_callback_function *function*, *optional*
  - This function is called once for each downloaded chunk, default is **empty function**
  - The first parameter passed to the **chunk_callback_function** is the current download information, the callback function returns `true` to interrupt the download
- buffer_size
  - *integer*, *optional*, buffer size in bytes, default is **automatic**
- download_success *boolean*
- download_info
  - *table* or *string*, returns download details if the connection is successful, returns the reason if it fails

```lua title="DownloadInfo Table Structure"
{
  resource_size = Total bytes of the remote resource,
  start_pos = Starting position of this download in the resource,
  size_download = Bytes downloaded in this download,
  speed_download = Download speed (in bytes/second),
}
```

#### Example 1

```lua title="http.download"
local done, info = http.download("http://192.168.31.13/1.zip", "/var/mobile/1.zip")
if done then
  sys.alert("If there were no accidents, the download should be complete")
else
  sys.alert("Connection failed: "..info)
end
```

#### Example 2

```lua title="http.download"
local done, info = http.download("http://192.168.31.13/1.zip", "/var/mobile/1.zip", 10, true, function(binfo)
  local percent = math.floor(((binfo.start_pos + binfo.size_download) / binfo.resource_size) * 100)
  sys.toast("Download progress "..percent.."%")
  return false  -- Return true to interrupt the download
end, 4096 * 1024)
--
if done then
  if info.start_pos + info.size_download < info.resource_size then
    sys.alert(
      "Download interrupted\nThis download "..info.size_download.." bytes"
      .."\nStarted downloading from byte "..info.start_pos
      .."\nAverage speed is "..math.floor(info.speed_download/1024).." kB/s"
      .."\nRemaining "..(info.resource_size - (info.start_pos + info.size_download)).." bytes"
    )
  else
    sys.alert(
      "Download complete\nThis download "..info.size_download.." bytes"
      .."\nStarted downloading from byte "..info.start_pos
      .."\nAverage speed is "..math.floor(info.speed_download/1024).." kB/s"
    )
  end
else
  sys.alert("Connection failed: "..info)
end
```

### 🚥 Initiate a HEAD Request \(**http\.head**\)

#### Declaration

```lua
http_status_code, response_header_json_text = http.head(url[, timeout_seconds, request_headers ])
```

#### Parameters and Return Values

- url *string*
- timeout_seconds
  - *number*, *optional*, in seconds, default is `10`
- request_headers
  - *table*, *optional*, headers for the request, format `{field1 = value1, field2 = value2, ...}`, default is an empty table `{}`
- http_status_code
  - *integer*, returns `-1` if the request times out
- response_header_json_text
  - *string*, returns the JSON text of the response headers if the request completes, returns `nil` if it times out

#### Description

Uses the HTTP/1.1 protocol’s HEAD method to request and retrieve the headers of a network resource.  
The HEAD method usually returns the same headers as the GET method, but the HEAD request does not return the body content of the resource.

#### Example

```lua title="http.head"
local c, h = http.head("https://www.xxtouch.com/测试文本.txt")
if c == 200 then  -- If the returned status code is HTTP_OK
  sys.alert(h)    -- Output the retrieved headers
end
```

### 🚥 Initiate a DELETE Request \(**http\.delete**\)

#### Declaration

```lua
http_status_code, response_header_json_text, response_body = http.delete(url[, timeout_seconds, request_headers])
```

#### Parameters and Return Values

- url *string*
- timeout_seconds
  - *number*, *optional*, in seconds, default is `10`
- request_headers
  - *table*, *optional*, headers for the request, format `{field1 = value1, field2 = value2, ...}`, default is an empty table `{}`
- http_status_code
  - *integer*, returns `-1` if the request times out
- response_header_json_text
  - *string*, returns the JSON text of the response headers if the request completes, returns `nil` if it times out
- response_body
  - *string*, returns the response content if the request completes, returns `nil` if it times out

#### Description

Uses the HTTP/1.1 protocol’s DELETE method to request and retrieve a network resource. It is usually used to delete a network resource and generally requires authentication.

#### Example

```lua title="http.delete"
local c, h, r = http.delete("https://www.xxtouch.com/测试文本.txt")
if c == 200 then  -- If the returned status code is HTTP_OK
  sys.alert(r)    -- Output the result
end
```

### 🚥 Initiate a PUT Request \(**http\.put**\)

#### Declaration

```lua
http_status_code, response_header_json_text, response_body = http.put(url[, timeout_seconds, request_headers, request_body])
```

#### Parameters and Return Values

- url *string*
- timeout_seconds
  - *number*, *optional*, in seconds, default is `10`
- request_headers
  - *table*, *optional*, headers for the request, format `{field1 = value1, field2 = value2, ...}`, default is an empty table `{}`
- request_body
  - *string*, *optional*, data content to be sent with the request, default is an empty string `""`
- http_status_code
  - *integer*, returns `-1` if the request times out
- response_header_json_text
  - *string*, returns the JSON text of the response headers if the request completes, returns `nil` if it times out
- response_body
  - *string*, returns the response content if the request completes, returns `nil` if it times out

#### Description

Uses the HTTP/1.1 protocol’s PUT method to submit data to the server. It is used in the same way as the POST method.

#### Example

```lua title="http.put"
local code, res_headers, body = http.put("http://www.baidu.com", 1, {
  ["User-Agent"] = "Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.0)",  -- Simulate an IE8 request
  ["Cookie"] = "Do you even know how to do this?";  -- Submit a Cookie along with the request
}, "Data to be sent")
if code == 200 then  -- If the returned status code is HTTP_OK
  sys.alert(body)    -- Output the HTML content of Baidu's homepage
end
```
