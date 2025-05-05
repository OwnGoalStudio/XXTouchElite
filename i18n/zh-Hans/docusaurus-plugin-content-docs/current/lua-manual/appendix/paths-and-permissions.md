---
sidebar_position: 2
---

# 环境与全局环境

XXTouch Elite 的**运行时根目录**为 `/usr/local/xxtouch`，其中包含了所有的配置文件、守护进程日志、内置及第三方的 Lua 扩展等。

XXTouch Elite 的**用户根目录**为 `/var/mobile/Media/1ferver`，你开发的脚本、输出的日志和数据、所依赖的资源和配置文件，都应该放置在此目录下。你可以在 `utils.paths` 表中获取这些路径：

```lua title="utils.paths"
{
  MEDIA_UID = 501,
  MEDIA_GID = 501,
  MEDIA_ROOT = "/var/mobile/Media/1ferver",                         -- 用户根目录
  MEDIA_LUA_DIR = "/var/mobile/Media/1ferver/lua",                  -- 用户脚本根目录
  MEDIA_LUA_SCRIPTS_DIR = "/var/mobile/Media/1ferver/lua/scripts",  -- 用户脚本目录
  MEDIA_BIN_DIR = "/var/mobile/Media/1ferver/bin",                  -- *可执行文件目录
  MEDIA_LIB_DIR = "/var/mobile/Media/1ferver/lib",                  -- *动态库目录
  MEDIA_LOG_DIR = "/var/mobile/Media/1ferver/log",                  -- 日志目录
  MEDIA_CONF_DIR = "/var/mobile/Media/1ferver/conf",                -- *配置文件目录
  MEDIA_WEB_DIR = "/var/mobile/Media/1ferver/web",                  -- Web 静态资源目录
  MEDIA_IMG_DIR = "/var/mobile/Media/1ferver/img",                  -- 图片目录
  MEDIA_RES_DIR = "/var/mobile/Media/1ferver/res",                  -- 资源目录
  MEDIA_CACHES_DIR = "/var/mobile/Media/1ferver/caches",            -- 缓存目录
  MEDIA_SNIPPETS_DIR = "/var/mobile/Media/1ferver/snippets",        -- 代码片段目录
  MEDIA_UICFG_DIR = "/var/mobile/Media/1ferver/uicfg",              -- UI 配置目录
  MEDIA_TESSDATA_DIR = "/var/mobile/Media/1ferver/tessdata",        -- Tesseract 数据目录
  LOG_SYS = "/var/mobile/Media/1ferver/log/sys.log",                             -- 系统日志
  LOG_LAUNCHER_OUTPUT = "/var/mobile/Media/1ferver/log/script_output.log",       -- 脚本输出日志
  LOG_LAUNCHER_ERROR = "/var/mobile/Media/1ferver/log/script_error.log",         -- 脚本错误日志
}
```

:::danger

* 你不应该篡改、删除**运行时根目录**下的任何内容。
* 你不应该篡改、删除**用户根目录**下带 `*` 号的子目录（可执行文件目录、动态库目录和配置文件目录）。

:::

## 权限及所有者

XXTouch Elite 脚本进程由 `root` 用户启动。所以，你在脚本中创建的文件，其默认所有者为 `root`。

所有写入应用容器或**用户根目录**的文件，都应当设置为 `rw-r--r--` 的权限，即 `0644`；所有创建在应用容器或**用户根目录**当中的子目录，都应当设置为 `rwxr-xr-x`，即 `0755`。并且应当设置为 `mobile` 所有者和 `mobile` 所属组，即 `501`。为保证效率，XXTouch Elite 不会帮你做这些事。你应当使用 `luaposix` 库来设置文件的权限及所有者：

```lua
local posix = require("posix")
local unistd = require("posix.unistd")
local my_path = utils.paths.MEDIA_LUA_DIR .. "/cloud_cc.lua"
nLog(posix.chmod(my_path, "rw-r--r--"))
nLog(unistd.chown(my_path, 
                  utils.paths.MEDIA_UID, 
                  utils.paths.MEDIA_GID))
```

:::caution

* 不正确的文件系统权限或所有者可能会导致你的脚本无法正常运行、应用闪退、操作系统异常等诸多问题。

:::
