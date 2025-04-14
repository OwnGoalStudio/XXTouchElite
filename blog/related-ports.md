---
authors: lessica
tags: [webserv, ports, openapi]
---

# Ports of XXTouch Elite

- `WEBSERV_PORT`: XXTouch OpenAPI protocol port, IDE service port
- `WEBSERV_PORT_V1`: TouchSprite, XXTouch legacy IDE service port
- `WEBSERV_BROADCAST_PORT`: XXTouch broadcast port
- `WEBSERV_BROADCAST_PORT_V1`: TouchSprite, TouchElf broadcast port
- `WEBSERV_LOGGING_UDP_RECV_PORT`: Local logging reception port
- `WEBSERV_LOGGING_SERVER_PORT`: External logging transmission port

<!-- truncate -->

```c
#define WEBSERV_PORT 46952
#define WEBSERV_PORT_V1 46059            /* TouchSprite / XXTouch Legacy IDE */
#define WEBSERV_BROADCAST_PORT 46953
#define WEBSERV_BROADCAST_PORT_V1 14099  /* TouchSprite & TouchElf */

#define WEBSERV_LOGGING_UDP_RECV_PORT 46956
#define WEBSERV_LOGGING_SERVER_PORT 46957
```
