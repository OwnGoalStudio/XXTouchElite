---
authors: lessica
tags: [luasocket, socket, lua]
---

# LuaSocket Examples

LuaSocket is a network library for Lua, providing support for TCP, UDP, HTTP, and other protocols. Below are some simple examples to help you get started quickly.

<!-- truncate -->

## Connection Timeout

```lua title="luasocket-test.lua" showLineNumbers
local socket = require("socket")
local sock = socket.tcp()
sock:settimeout(0.2)  -- Set connection timeout in seconds
if (sock:connect("220.181.57.217", 80)) then
  sock:close()      -- Close connection
  sys.alert("Connected successfully")
else
  sys.alert("Timeout")
end
```

## Request Bing Homepage

```lua title="luasocket-example.lua" showLineNumbers
local socket = require('socket')

local sock = socket.tcp()
local ip = assert(socket.dns.toip('www.bing.com'), 'DNS resolution failed')
sock:settimeout(10)
assert(sock:connect(ip, 80) == 1, 'Connection failed or timeout')

assert(
  sock:send(
    'GET / HTTP/1.1\r\n'..
    'Host: www.bing.com\r\n'..
    'Accept: */*\r\n'..
    'Connection: close\r\n'..
    '\r\n'
  ),
  'Data send timeout'
)

local buf = {}
repeat
  local chunk, status, partial = sock:receive(4096)
  if (chunk) then
    buf[#buf + 1] = chunk
  else
    if (partial) then
      buf[#buf + 1] = partial
    end
  end
until status == "closed"
sock:close()

sys.alert(table.concat(buf))
```
