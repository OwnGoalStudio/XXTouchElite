---
sidebar_position: 2
---

# Paths and Permissions

The **runtime root directory** of XXTouch Elite is `/usr/local/xxtouch`, which contains all configuration files, daemon logs, built-in and third-party Lua extensions, etc.

The **user root directory** of XXTouch Elite is `/var/mobile/Media/1ferver`. The scripts you develop, the logs and data you output, the resources and configuration files you depend on should all be placed in this directory. You can retrieve these paths in the `utils.paths` table:

```lua title="utils.paths"
{
  MEDIA_UID = 501,
  MEDIA_GID = 501,
  MEDIA_ROOT = "/var/mobile/Media/1ferver",                         -- User root directory
  MEDIA_LUA_DIR = "/var/mobile/Media/1ferver/lua",                  -- User script root directory
  MEDIA_LUA_SCRIPTS_DIR = "/var/mobile/Media/1ferver/lua/scripts",  -- User script directory
  MEDIA_BIN_DIR = "/var/mobile/Media/1ferver/bin",                  -- *Executable file directory
  MEDIA_LIB_DIR = "/var/mobile/Media/1ferver/lib",                  -- *Dynamic library directory
  MEDIA_LOG_DIR = "/var/mobile/Media/1ferver/log",                  -- Log directory
  MEDIA_CONF_DIR = "/var/mobile/Media/1ferver/conf",                -- *Configuration file directory
  MEDIA_WEB_DIR = "/var/mobile/Media/1ferver/web",                  -- Web static resource directory
  MEDIA_IMG_DIR = "/var/mobile/Media/1ferver/img",                  -- Image directory
  MEDIA_RES_DIR = "/var/mobile/Media/1ferver/res",                  -- Resource directory
  MEDIA_CACHES_DIR = "/var/mobile/Media/1ferver/caches",            -- Cache directory
  MEDIA_SNIPPETS_DIR = "/var/mobile/Media/1ferver/snippets",        -- Code snippet directory
  MEDIA_UICFG_DIR = "/var/mobile/Media/1ferver/uicfg",              -- UI configuration directory
  MEDIA_TESSDATA_DIR = "/var/mobile/Media/1ferver/tessdata",        -- Tesseract data directory
  LOG_SYS = "/var/mobile/Media/1ferver/log/sys.log",                             -- System log
  LOG_LAUNCHER_OUTPUT = "/var/mobile/Media/1ferver/log/script_output.log",       -- Script output log
  LOG_LAUNCHER_ERROR = "/var/mobile/Media/1ferver/log/script_error.log",         -- Script error log
}
```

:::danger

* You should not tamper with or delete any content under the **runtime root directory**.
* You should not tamper with or delete subdirectories marked with `*` under the **user root directory** (executable file directory, dynamic library directory, and configuration file directory).

:::

## Permissions and Ownership

The XXTouch Elite script process is started by the `root` user. Therefore, files created in your script will have `root` as the default owner.

All files written to the application container or the **user root directory** should be set to `rw-r--r--` permissions, i.e., `0644`. All subdirectories created in the application container or the **user root directory** should be set to `rwxr-xr-x`, i.e., `0755`. They should also be set to `mobile` as the owner and `mobile` as the group, i.e., `501`. For efficiency, XXTouch Elite will not handle this for you. You should use the `luaposix` library to set file permissions and ownership:

```lua
local posix = require("posix")
local unistd = require("posix.unistd")
local my_path = utils.paths.MEDIA_LUA_DIR .. "/cloud_cc.lua"
nLog(posix.chmod(my_path, "rw-r--r--"))
nLog(unistd.chown(my_path, utils.paths.MEDIA_UID, utils.paths.MEDIA_GID))
```

:::caution

* Incorrect file system permissions or ownership may cause your script to fail, the application to crash, the operating system to behave abnormally, and other issues.

:::

## RootHide Instructions

### System Root (rootfs)

In the RootHide environment, the **system root** refers to the root directory of the iOS system, which is unmodified and contains no additional paths.

### Jailbreak Root (jbroot)

In the RootHide environment, the **jailbreak root** is a randomly mounted path under the system root. It is usually located at `/var/containers/Bundle/Application/.jbroot-XXXXXXXXXXXXXXXX/` (where the long string of Xs is a random value).

Using the `jbroot` function, you can convert a normal path into a path within the jailbreak root. For example, if you want to access `/var/mobile/Library/Preferences/1.txt` in the jailbreak root, you should use `jbroot("/var/mobile/Library/Preferences/1.txt")` to access it. In a script, using `f = io.open(jbroot("/var/mobile/Library/Preferences/1.txt"), "r")` will actually open the file located at `/var/containers/Bundle/Application/.jbroot-XXXXXXXXXXXXXXXX/var/mobile/Library/Preferences/1.txt`.

### Shell Environment

As described in the previous sections, the jailbreak root is mounted at a random path under the system root. However, in the Shell environment (e.g., `.deb` installation scripts), it is impossible to determine where the jailbreak root is located under the system root. Therefore, RootHide sets the runtime of Shell scripts to the jailbreak root. This means that `/Applications/XXTExplorer.app` in a `.deb` package will be installed to `/var/containers/Bundle/Application/.jbroot-XXXXXXXXXXXXXXXX/Applications/XXTExplorer.app`. This ensures that the installed jailbreak plugins do not pollute the system root.

However, this approach introduces a problem: when using functions like `os.execute` or `io.popen` in XXTouch Elite, since `os.execute` indirectly uses bash or zsh to execute Shell commands, their runtime will also be in the jailbreak root. As a result, all Shell commands cannot access files in the system root. For example, if you originally wanted to execute `ls /var/mobile/Library/Preferences` in the Shell to list a large number of user preference `.plist` files in the system root, the Shell runtime in the jailbreak root will instead execute `ls /var/containers/Bundle/Application/.jbroot-XXXXXXXXXXXXXXXX/var/mobile/Library/Preferences`, where there may be no files at all.

To address this, RootHide mounts the system root back into the jailbreak root at `/rootfs/`. This allows you to use `os.execute("ls /rootfs/var/mobile/Library/Preferences")` in scripts to list the user preference `.plist` files in the system root.

:::tip
You can use the `rootfs` function to convert a normal path into a path within the system root **for use in the Shell environment** — essentially, it just adds the `/rootfs/` prefix. The above example can also be written as `os.execute("ls " .. rootfs("/var/mobile/Library/Preferences"))`.
:::
