---
authors: lessica
tags: [webserv, ports, openapi]
---

# XXTouch Elite 相关端口说明

- `WEBSERV_PORT`: XXTouchNG OpenAPI 协议端口、IDE 服务端口
- `WEBSERV_PORT_V1`: 触动精灵、XXTouch 旧版 IDE 服务端口
- `WEBSERV_BROADCAST_PORT`: XXTouchNG 广播端口
- `WEBSERV_BROADCAST_PORT_V1`: 触动精灵、触摸精灵广播端口
- `WEBSERV_LOGGING_UDP_RECV_PORT`: 本地日志接收端口
- `WEBSERV_LOGGING_SERVER_PORT`: 外部日志传输端口

<!-- truncate -->

```c
#define WEBSERV_PORT 46952
#define WEBSERV_PORT_V1 46059            /* TouchSprite / XXTouch Legacy IDE */
#define WEBSERV_BROADCAST_PORT 46953
#define WEBSERV_BROADCAST_PORT_V1 14099  /* TouchSprite & TouchElf */

#define WEBSERV_LOGGING_UDP_RECV_PORT 46956
#define WEBSERV_LOGGING_SERVER_PORT 46957
```
