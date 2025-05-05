---
sidebar_position: 1
---

# 脚本与模块

XXTouchNG 支持的脚本、模块文件扩展名有：

* `.lua`：Lua 脚本
* `.xxt`：**编译并加密** 的 XXTouchNG 脚本
* `.so`：动态库

## 加密脚本

你可以使用 [OpenAPI](https://openapi-ng.82flex.com/api-111064051) 对明文的 Lua 脚本进行加密。加密时，你可以选择是否保留调试符号，如果保留调试符号，则脚本发生错误时能够显示源文件中的函数名称及行号；反之则移除这些信息以确保源代码安全。

XXTouchNG 不支持来自 XXTouch 的加密脚本，也不支持仅编译但未加密的 `.luac` Lua 字节码。

## 模块与包

XXTouchNG 支持 [`require`](https://cloudwu.github.io/lua53doc/manual.html#pdf-require) 引用 [Lua 模块与包](https://cloudwu.github.io/lua53doc/manual.html#6.3)，同时也支持将加密的 XXTouchNG 脚本 `.xxt` 作为模块引用。你可以在 [`package.path`](https://cloudwu.github.io/lua53doc/manual.html#pdf-package.path) 和 [`package.cpath`](https://cloudwu.github.io/lua53doc/manual.html#pdf-package.cpath) 变量中获取默认的模块搜索路径，也可以添加自定义的模块搜索路径：

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

* 你可以补充自定义的模块搜索路径，但是不要移除默认的模块搜索路径，这样可能会造成 XXTouchNG 无法正常工作。

:::
