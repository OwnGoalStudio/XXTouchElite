---
sidebar_position: 16
---

# FTP 模块

## FTP 模块 - ftp

此模块默认会对 URL 调用 [`string.encode_uri`](exstring.md#-url-编码-stringencode_uristringencode_uri_component) 进行处理。

FTP 协议的惯用 URL 格式为 `ftp://[用户名[:密码]@]服务器地址[:服务器端口][/路径]`。  
用户名或密码中包含 `@`、`:`、`/` 这三个字符可分别用 `%40`、`%3A`、`%2F` 代替。若还有其他 URL 中不能包含的字符可使用 [`string.encode_uri_component`](exstring.md#-url-编码-stringencode_uristringencode_uri_component) 进行编码。

标有 🚥 的函数在 [**线程模块**](thread.md) 中会发生 **让出**。在这些函数调用返回之前，其他的 **线程** 可能会得到运行机会。

### 🚥 FTP 文件下载 \(**ftp\.download**\)

#### 声明

```lua
下载成败, 下载信息 = ftp.download(URL, 本地文件路径[, 连接超时秒, 断点续传模式, 分块回调函数, 缓冲区尺寸])
```

#### 参数及返回值

- URL
  - *文本型*，远端文件地址，账号及密码被包含在这一参数中
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

已知 FTP 账号是 `havonz` 密码是 `11@@22`：

```lua title="ftp.download"
local done, info = ftp.download("ftp://havonz:11%40%4022@192.168.31.13/1.zip", "/var/mobile/1.zip")
if done then
  sys.alert("如果没有意外，已经下载好了")
else
  sys.alert("连接失败："..info)
end
```

#### 示例 2

```lua title="ftp.download"
local done, info = ftp.download("ftp://havonz:123456@192.168.31.13/1.zip", "/var/mobile/1.zip", 10, true, function(binfo)
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

### 🚥 FTP 文件上传 \(**ftp\.upload**\)

#### 声明

```lua
上传成败, 上传信息 = ftp.upload(本地文件路径, URL[, 连接超时秒, 断点续传模式, 分块回调函数, 缓冲区尺寸])
```

#### 参数及返回值

- 本地文件路径 *文本型*
- URL
  - *文本型*，远端文件地址，账号及密码被包含在这一参数中
- 连接超时秒
  - *实数型*，*可选*，单位秒，默认为 `10`
- 断点续传模式
  - *布尔型*，*可选*，默认为 `false`
- 分块回调函数 *函数型*，*可选*
  - 每上传完一个数据块都会回调一次这个函数，默认为 **空函数**
  - 传入 **分块回调函数** 的第一个参数为当前上传的信息，回调函数返回 `true` 则打断此次上传
- 缓冲区尺寸
  - *整数型*，*可选*，缓冲区大小字节数，默认为 **自动**
- 上传成败 *布尔型*
- 上传信息
  - *关联表* 或 *文本型*，如果连接成功则返回上传信息详情，失败则返回原因

```lua title="上传信息表结构"
{
  resource_size = 本地文件总字节数,
  start_pos = 本次上传从本地文件的开始的位置,
  size_upload = 本次上传的字节数,
  speed_upload = 本次上传的速度 (单位：字节/秒) ,
}
```

#### 示例 1

已知 FTP 账号是 `havonz` 密码是 `11@@22`：

```lua title="ftp.upload"
local done, info = ftp.upload("/var/mobile/1.zip", "ftp://havonz:11%40%4022@192.168.31.13/1.zip")
if done then
  sys.alert("如果没有意外，已经上传好了")
else
  sys.alert("连接失败："..info)
end
```

#### 示例 2

```lua title="ftp.upload"
local done, info = ftp.upload("/var/mobile/1.zip", "ftp://havonz:123456@192.168.31.13/1.zip", 10, true, function(binfo)
  local percent = math.floor(((binfo.start_pos + binfo.size_upload) / binfo.resource_size) * 100)
  sys.toast("上传进度 "..percent.."%")
  return false  -- 返回 true 则打断此次上传
end, 4096 * 1024)
--
if done then
  if info.start_pos + info.size_upload < info.resource_size then
    sys.alert(
      "上传中断\n本次上传 "..info.size_upload.." 字节"
      .."\n从第 "..info.start_pos.." 字节开始上传"
      .."\n平均速度为 "..math.floor(info.speed_upload/1024).." kB/s"
      .."\n还剩 "..(info.resource_size - (info.start_pos + info.size_upload)).." 字节"
    )
  else
    sys.alert(
      "上传完成\n本次上传 "..info.size_upload.." 字节"
      .."\n从第 "..info.start_pos.." 字节开始上传"
      .."\n平均速度为 "..math.floor(info.speed_upload/1024).." kB/s"
    )
  end
else
  sys.alert("连接失败："..info)
end
```
