---
sidebar_position: 1
---

# Scripts and Modules

The supported script and module file extensions for XXTouch Elite are:

* `.lua`: Lua scripts
* `.xxt`: **Compiled and encrypted** XXTouch Elite scripts
* `.so`: Dynamic libraries

## Encrypted Scripts

You can use [OpenAPI](https://elite.82flex.com/api-283425279) to encrypt plain Lua scripts. During encryption, you can choose whether to retain debug symbols. If debug symbols are retained, the script can display function names and line numbers from the source file when errors occur; otherwise, this information is removed to ensure the security of the source code.

XXTouch Elite does not support encrypted scripts from XXTouch, nor does it support `.luac` Lua bytecode that is only compiled but not encrypted.

## Modules and Packages

XXTouch Elite supports using [`require`](https://cloudwu.github.io/lua53doc/manual.html#pdf-require) to reference [Lua modules and packages](https://cloudwu.github.io/lua53doc/manual.html#6.3). It also supports referencing encrypted XXTouch Elite scripts `.xxt` as modules. You can retrieve the default module search paths from the [`package.path`](https://cloudwu.github.io/lua53doc/manual.html#pdf-package.path) and [`package.cpath`](https://cloudwu.github.io/lua53doc/manual.html#pdf-package.cpath) variables, and you can also add custom module search paths:

```txt title="package.path (formatted)"
/var/mobile/Media/1ferver/lua/scripts/?.lua;
/var/mobile/Media/1ferver/lua/scripts/?/init.lua;
/var/mobile/Media/1ferver/lua/scripts/?.xxt;
/var/mobile/Media/1ferver/lua/scripts/?/init.xxt;
/var/mobile/Media/1ferver/lua/?.lua;
/var/mobile/Media/1ferver/lua/?/init.lua;
/usr/local/xxtouch/lib/?.lua;
/usr/local/xxtouch/lib/?/init.lua;
./?.lua;
./?/init.lua;
```

```txt title="package.cpath (formatted)"
/usr/local/xxtouch/lib/?.so;
/usr/local/xxtouch/lib/loadall.so;
./?.so;
```

:::caution

* You can supplement custom module search paths, but do not remove the default module search paths, as this may cause XXTouch Elite to malfunction.

:::
