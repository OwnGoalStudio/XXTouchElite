---
sidebar_position: 15
---

# HTTP 模块

## HTTP 模块 - http

此模块默认会对 URL 调用 [`string.encode_uri`](exstring.md#-url-编码-stringencode_uristringencode_uri_component) 进行处理。

标有 🚥 的函数在 [**线程模块**](thread.md) 中会发生 **让出**。在这些函数调用返回之前，其他的 **线程** 可能会得到运行机会。

### 🚥 发起 GET 请求 \(**http\.get**\)

#### 声明

```lua
HTTP状态码, 返回头JSON文本, 返回主体 = http.get(URL[, 超时秒, 请求头 ])
```

#### 参数及返回值

- URL *文本型*
- 超时秒
  - *实数型*，*可选*，单位秒，默认为 `10`
- 请求头
  - *文本型关联表*，*可选*，发出请求的头部信息，格式为 `{field1 = value1, field2 = value2, ...}`，默认为空表 `{}`
- HTTP状态码
  - *整数型*，请求超时返回 `-1`
- 返回头JSON文本
  - *文本型*，请求完成返回头部信息的 JSON 文本，请求超时返回 `nil`
- 返回主体
  - *字符串型*，请求完成返回数据内容，请求超时返回 `nil`

#### 说明

使用 HTTP/1.1 协议的 GET 方法请求获取网络实体。

:::note
不会将资源存储到磁盘上，如果需要下载较大的网络实体，建议使用 [`http.download`](#-http-文件下载-httpdownload)。
:::

#### 示例 1

```lua title="http.get"
local code, res_headers, body = http.get("http://www.baidu.com", 1, {
  ["User-Agent"] = "Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.0)";  -- 模拟 IE8 的请求
  ["Cookie"] = "大佬你会不会啊？";  -- 顺带 Cookie 提交
})
if code == 200 then  -- 如果返回的状态码是 HTTP_OK
  sys.alert(body)    -- 输出百度首页的网页 HTML 内容
end
```

#### 示例 2

```lua title="http.get"
-- 中文 URL 默认自动会 escape，包含中文的 URL 可直接像下面这样调用
local c, h, r = http.get("https://www.xxtouch.com/测试文本.txt")
if c == 200 then  -- 如果返回的状态码是 HTTP_OK
  sys.alert(r)    -- 输出内容
end
--
-- 下面的例子与上面例子等效
local c, h, r = http.get("https://www.xxtouch.com/%E6%B5%8B%E8%AF%95%E6%96%87%E6%9C%AC.txt", 5, {}, true--[[这里]])
if c == 200 then  -- 如果返回的状态码是 HTTP_OK
  sys.alert(r)    -- 输出内容
end
```

#### 示例 3

```lua title="http.get"
-- 获取外网 IPv4 地址
function get_ip()
  local done = false
  thread.dispatch(function()
    while true do
      if done then
        sys.toast("", -1)
        return
      else
        sys.toast("正在获取 IP 地址…", device.front_orien())
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
-- 将以上代码拷贝到自己的脚本最前面，然后在脚本中使用
sys.alert(get_ip())
```

### 🚥 发起 POST 请求 \(**http\.post**\)

#### 声明

```lua
HTTP状态码, 返回头JSON文本, 返回主体 = http.post(URL[, 超时秒, 请求头, 请求主体 ])
```

#### 参数及返回值

- URL *文本型*
- 超时秒
  - *实数型*，*可选*，单位秒，默认为 `10`
- 请求头
  - *文本型关联表*，*可选*，发出请求的头部信息，格式为 `{field1 = value1, field2 = value2, ...}`，默认为空表 `{}`
- 请求主体
  - *字符串型*，*可选*，发出请求的数据内容，默认是空字符串 `""`
- HTTP状态码
  - *整数型*，请求超时返回 `-1`
- 返回头JSON文本
  - *文本型*，请求完成返回头部信息的 JSON 文本，请求超时返回 `nil`
- 返回主体
  - *字符串型*，请求完成返回数据内容，请求超时返回 `nil`

#### 说明

使用 HTTP/1.1 协议的 POST 方法提交数据到服务器。

:::caution
需自行指定 [`Content-Type`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Type) 请求头，否则服务器可能会拒绝接收数据。
:::

#### 示例 1

```lua title="http.post"
local code, res_headers, body = http.post("http://www.baidu.com", 1, {
  ["User-Agent"] = "Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.0)",  -- 模拟 IE8 的请求
  ["Cookie"] = "大佬你会不会啊？";  -- 顺带 Cookie 提交
}, "需要发送过去的数据")
if code == 200 then  -- 如果返回的状态码是 HTTP_OK
    sys.alert(body)  -- 输出百度首页的网页 HTML 内容
end
```

#### 示例 2

```lua title="http.post"
local c, h, r = http.post('http://httpbin.org/post', 60, {}, 'name=havonz&qq=1004695100&wechat=havonz')
if c == 200 then
  sys.alert(r, 0, '提交成功')
else
  if c == -1 then
    sys.alert('请求失败，请检查网络连接', 0, '连接超时')
  else
    sys.alert('错误代码 #'..c..'\n'..r, 0, 'HTTP 错误')
  end
end
```

### 🚥 HTTP 文件下载 \(**http\.download**\)

#### 声明

```lua
下载成败, 下载信息 = http.download(URL, 本地文件路径[, 连接超时秒, 断点续传模式, 分块回调函数, 缓冲区尺寸 ])
```

#### 参数及返回值

- URL *文本型*
- 本地文件路径 *文本型*
- 连接超时秒
  - *实数型*，*可选*，单位秒，默认为 `10`
- 断点续传模式
  - *布尔型*，*可选*，默认为 `false`
- 分块回调函数 *函数型*，*可选*
  - 每下载完一个数据块都会回调一次这个函数，默认为 **空函数**
  - 传入 **分块回调函数** 的第一个参数为当前下载的信息，回调函数返回 `true` 则打断此次下载
- 缓冲区尺寸
  - *整数型*，*可选*，缓冲区大小字节数，默认为 **自动**
- 下载成败 *布尔型*
- 下载信息
  - *关联表* 或 *文本型*，如果连接成功则返回下载信息详情，失败则返回原因

```lua title="下载信息表结构"
{
  resource_size = 远端资源总字节数,
  start_pos = 本次下载从资源的开始的位置,
  size_download = 本次下载的字节数,
  speed_download = 本次下载的速度 (单位：字节/秒) ,
}
```

#### 示例 1

```lua title="http.download"
local done, info = http.download("http://192.168.31.13/1.zip", "/var/mobile/1.zip")
if done then
  sys.alert("如果没有意外，已经下载好了")
else
  sys.alert("连接失败："..info)
end
```

#### 示例 2

```lua title="http.download"
local done, info = http.download("http://192.168.31.13/1.zip", "/var/mobile/1.zip", 10, true, function(binfo)
  local percent = math.floor(((binfo.start_pos + binfo.size_download) / binfo.resource_size) * 100)
  sys.toast("下载进度 "..percent.."%")
  return false  -- 返回 true 则打断此次下载
end, 4096 * 1024)
--
if done then
  if info.start_pos + info.size_download < info.resource_size then
    sys.alert(
      "下载中断\n本次下载 "..info.size_download.." 字节"
      .."\n从第 "..info.start_pos.." 字节开始下载"
      .."\n平均速度为 "..math.floor(info.speed_download/1024).." kB/s"
      .."\n还剩 "..(info.resource_size - (info.start_pos + info.size_download)).." 字节"
    )
  else
    sys.alert(
      "下载完成\n本次下载 "..info.size_download.." 字节"
      .."\n从第 "..info.start_pos.." 字节开始下载"
      .."\n平均速度为 "..math.floor(info.speed_download/1024).." kB/s"
    )
  end
else
  sys.alert("连接失败："..info)
end
```

### 🚥 发起 HEAD 请求 \(**http\.head**\)

#### 声明

```lua
HTTP状态码, 返回头JSON文本 = http.head(URL[, 超时秒, 请求头 ])
```

#### 参数及返回值

- URL *文本型*
- 超时秒
  - *实数型*，*可选*，单位秒，默认为 `10`
- 请求头
  - *文本型关联表*，*可选*，发出请求的头部信息，格式为 `{field1 = value1, field2 = value2, ...}`，默认为空表 `{}`
- HTTP状态码
  - *整数型*，请求超时返回 `-1`
- 返回头JSON文本
  - *文本型*，请求完成返回头部信息的 JSON 文本，请求超时返回 `nil`

#### 说明

使用 HTTP/1.1 协议的 HEAD 方法请求获取网络实体的头部信息。  
HEAD 方法通常会获得和 GET 方法一样的返回头，但 HEAD 请求不会返回实体的主体内容。

#### 示例

```lua title="http.head"
local c, h = http.head("https://www.xxtouch.com/测试文本.txt")
if c == 200 then  -- 如果返回的状态码是 HTTP_OK
  sys.alert(h)    -- 输出请求到的头信息
end
```

### 🚥 发起 DELETE 请求 \(**http\.delete**\)

#### 声明

```lua
HTTP状态码, 返回头JSON文本, 返回主体 = http.delete(URL[, 超时秒, 请求头])
```

#### 参数及返回值

- URL *文本型*
- 超时秒
  - *实数型*，*可选*，单位秒，默认为 `10`
- 请求头
  - *文本型关联表*，*可选*，发出请求的头部信息，格式为 `{field1 = value1, field2 = value2, ...}`，默认为空表 `{}`
- HTTP状态码
  - *整数型*，请求超时返回 `-1`
- 返回头JSON文本
  - *文本型*，请求完成返回头部信息的 JSON 文本，请求超时返回 `nil`
- 返回主体
  - *字符串型*，请求完成返回数据内容，请求超时返回 `nil`

#### 说明

使用 HTTP/1.1 协议的 DELETE 方法请求获取网络实体，它通常用于删除一个网络实体，该方法一般会有权限验证。

#### 示例

```lua title="http.delete"
local c, h, r = http.delete("https://www.xxtouch.com/测试文本.txt")
if c == 200 then  -- 如果返回的状态码是 HTTP_OK
  sys.alert(r)    -- 输出结果
end
```

### 🚥 发起 PUT 请求 \(**http\.put**\)

#### 声明

```lua
HTTP状态码, 返回头JSON文本, 返回主体 = http.put(URL[, 超时秒, 请求头, 请求主体])
```

#### 参数及返回值

- URL *文本型*
- 超时秒
  - *实数型*，*可选*，单位秒，默认为 `10`
- 请求头
  - *文本型关联表*，*可选*，发出请求的头部信息，格式为 `{field1 = value1, field2 = value2, ...}`，默认为空表 `{}`
- 请求主体
  - *字符串型*，*可选*，发出请求的数据内容，默认是空字符串 `""`
- HTTP状态码
  - *整数型*，请求超时返回 `-1`
- 返回头JSON文本
  - *文本型*，请求完成返回头部信息的 JSON 文本，请求超时返回 `nil`
- 返回主体
  - *字符串型*，请求完成返回数据内容，请求超时返回 `nil`

#### 说明

使用 HTTP/1.1 协议的 PUT 方法提交数据到服务器，它与 POST 方法的用法一致。

#### 示例

```lua title="http.put"
local code, res_headers, body = http.put("http://www.baidu.com", 1, {
  ["User-Agent"] = "Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.0)",  -- 模拟 IE8 的请求
  ["Cookie"] = "大佬你会不会啊？";  -- 顺带 Cookie 提交
}, "需要发送过去的数据")
if code == 200 then  -- 如果返回的状态码是 HTTP_OK
  sys.alert(body)    -- 输出百度首页的网页html
end
```
