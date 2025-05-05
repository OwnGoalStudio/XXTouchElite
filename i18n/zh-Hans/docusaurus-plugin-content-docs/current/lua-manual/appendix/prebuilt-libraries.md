---
sidebar_position: 9
---

# 编程接口与扩展库

XXTouch Elite 完整支持 [Lua 编程接口](https://cloudwu.github.io/lua53doc/manual.html#4)。你可以从 [LuaRocks](https://luarocks.org/) 下载并安装扩展库，然后移植到 XXTouch Elite 中使用。

:::note
你也可以参照以下模板，编写自己的扩展库使用。  
⏬ [Extension\_Template\.zip \(1\.9 MB\)](./assets/Extension_Template.zip)
:::

## Open-Source Credits

`/usr/local/xxtouch/lib/` 包含了许多预编译好的第三方开源 Lua 扩展库。  
你可以从它们的官方网站或开源仓库页面上找到相关版权及更多信息。

### lua-zip

- Package Name: `brimworks.zip`
- Author: `Brian Maher`
- License: [MIT License](https://github.com/brimworks/lua-zip/blob/291ca28a5b36792c8cda23c8de37d07c69f82a8a/README.txt)
- Home Page: [`https://github.com/brimworks/lua-zip`](https://github.com/brimworks/lua-zip)

### lua-cjson

- Package Name: `cjson`
- Author: `Mark Pulford`
- License: [MIT License](https://github.com/mpx/lua-cjson/blob/e8972ac754788d3ef10a57a36016d6c3e85ba20d/LICENSE)
- Home Page: [`https://github.com/mpx/lua-cjson`](https://github.com/mpx/lua-cjson)

### Copas

`Copas` is a dispatcher based on coroutines that can be used for asynchronous networking. For example TCP or UDP based servers. But it also features timers and client support for http(s), ftp and smtp requests.

- Package Name: `copas`
- Author: `Thijs Schreijer`
- License: [MIT License](https://github.com/lunarmodules/copas/blob/0e2ca2a269b379c5b7f9de31d85a9c46f10ed4eb/LICENSE)
- Home Page: [`https://github.com/lunarmodules/copas`](https://github.com/lunarmodules/copas)

### croissant

A Lua REPL and debugger implemented in Lua.

- Author: `Benoit Giannangeli`
- License: [MIT License](https://github.com/Lua-cURL/Lua-cURLv3/blob/9f8b6dba8b5ef1b26309a571ae75cda4034279e5/LICENSE)
- Home Page: [`https://github.com/giann/croissant`](https://github.com/giann/croissant)

### Lua-cURLv3

- Package Name: `cURL`
- Author: `Alexey Melnichuk`
- License: [MIT License](https://github.com/Lua-cURL/Lua-cURLv3/blob/9f8b6dba8b5ef1b26309a571ae75cda4034279e5/LICENSE)
- Home Page: [`https://github.com/Lua-cURL/Lua-cURLv3`](https://github.com/Lua-cURL/Lua-cURLv3)

### hump

`hump` is a small collection of tools for developing games with LÖVE.

- Package Name: `hump`
- Author: `Matthias Richter`
- License: [MIT License](https://github.com/vrld/hump/blob/08937cc0ecf72d1a964a8de6cd552c5e136bf0d4/README.md)
- Home Page: [`https://github.com/vrld/hump`](https://github.com/vrld/hump)

### lua-llthreads2

A simple Lua wrapper for pthreads & WIN32 threads.

Each thread gets it’s own `lua_State` and there is no shared global state. The parent thread can pass data to a child thread only as parameters when creating the child thread. The child threads can return data back to the parent thread only when it return (i.e. ends). The parent needs to call child:join() to get the return values from a child thread, this call will block until the child thread ends.

The design goals of this module is only provide support for creating new `lua_State` and running them in a different thread. This module will not provide any methods of thread-to-thread data passing between running threads (i.e. no locks, no shared state).

- Package Name: `llthreads2`
- Author: `Alexey Melnichuk`
- License: [MIT License](https://github.com/moteus/lua-llthreads2/blob/edd6035a955d5e12939cb5467cfd1614fea0910e/LICENSE)
- Home Page: [`https://github.com/moteus/lua-llthreads2`](https://github.com/moteus/lua-llthreads2)

### lua-lluv

Lua low level binding to [`libuv`](https://github.com/libuv/libuv).

`libuv` is a multi-platform support library with a focus on asynchronous I/O. It was primarily developed for use by Node.js, but it’s also used by [Luvit](http://luvit.io/), [Julia](http://julialang.org/), [uvloop](https://github.com/MagicStack/uvloop), and [others](https://github.com/libuv/libuv/blob/v1.x/LINKS.md).

- Package Name: `lluv`
- Author: `Alexey Melnichuk`
- License: [MIT License](https://github.com/moteus/lua-lluv/blob/9eca25458a232616f99a7d7ede79c0560cdf7941/LICENSE)
- Home Page: [`https://github.com/moteus/lua-lluv`](https://github.com/moteus/lua-lluv)

### lua-lluv-ssl

SSL/TLS sockets for `lua-lluv` library.

- Package Name: `lluv.ssl`
- Author: `Alexey Melnichuk`
- License: [MIT License](https://github.com/moteus/lua-lluv-ssl/blob/8a780c3317b4a44dec28ff72425f9bec8768181a/LICENSE)
- Home Page: [`https://github.com/moteus/lua-lluv-ssl`](https://github.com/moteus/lua-lluv-ssl)

### lua-lluv-websocket

This library includes stream interface for `lua-lluv` and `lua-lluv` backend for [`lua-websockets`](https://github.com/lipp/lua-websockets).

- Package Name: `lluv.websocket`
- Author: `Alexey Melnichuk`
- License: [MIT License](https://github.com/moteus/lua-lluv-websocket/blob/8202354c51fb04d75b37183470ad40f3ebd35630/LICENSE)
- Home Page: [`https://github.com/moteus/lua-lluv-websocket`](https://github.com/moteus/lua-lluv-websocket)

### lua-lluv-ftp

FTP client for `lua-lluv` library.

- Package Name: `lluv.ftp`
- Author: `Alexey Melnichuk`
- License: [MIT License](https://github.com/moteus/lua-lluv-ftp/blob/e6591020f732b4cc01c63c1a171aa8be2f2478dd/LICENSE)
- Home Page: [`https://github.com/moteus/lua-lluv-ftp`](https://github.com/moteus/lua-lluv-ftp)

### lua-lluv-poll-zmq

ZMQ poller for `lua-lluv` library.

- Package Name: `lluv.poll_zmq`
- Author: `Alexey Melnichuk`
- License: [MIT License](https://github.com/moteus/lua-lluv-poll-zmq/blob/2385e7221e03659d37b3a81112e55757c94c5fa3/LICENSE)
- Home Page: [`https://github.com/moteus/lua-lluv-poll-zmq`](https://github.com/moteus/lua-lluv-poll-zmq)

### lua-lluv-curl

Make asyncronus requests using `libuv` and `libcurl`.

This module provide async version of curl multi class. Also module implement async request queue class which allows control number of parallel requests.

- Package Name: `lluv.curl`
- Author: `Alexey Melnichuk`
- License: [MIT License](https://github.com/moteus/lua-lluv-curl/blob/8a02dd8542383419060151f4de0a2e35eaf2ecbe/LICENSE)
- Home Page: [`https://github.com/moteus/lua-lluv-curl`](https://github.com/moteus/lua-lluv-curl)

### lua-log

- Package Name: `log`
- Author: `Alexey Melnichuk`
- License: [MIT License](https://github.com/moteus/lua-log/blob/2f07d4174c4caeffdcf7cc54d4dad0e1da2bad9a/LICENCE.txt)
- Home Page: [`https://github.com/moteus/lua-log`](https://github.com/moteus/lua-log)

### lzmq

Lua binding to [`ZeroMQ`](http://zeromq.org/) library.

- Package Name: `lzmq`
- Author: `Alexey Melnichuk`
- License: [MIT License](https://github.com/zeromq/lzmq/blob/210609b27c6955854a9f44e5b6df1ac8b06cc8f8/LICENCE.txt)
- Home Page: [`https://github.com/zeromq/lzmq`](https://github.com/zeromq/lzmq)

### luasocket

`LuaSocket` is a Lua extension library composed of two parts:

1. a set of C modules that provide support for the TCP and UDP transport layers, and
2. a set of Lua modules that provide functions commonly needed by applications that deal with the Internet.

- Package Name: `socket`
- Author: `Caleb Maclennan`
- License: [MIT License](https://github.com/lunarmodules/luasocket/blob/1d61853ab84f0724502205f45849c2347d6a49ac/LICENSE)
- Home Page: [`https://github.com/lunarmodules/luasocket`](https://github.com/lunarmodules/luasocket)

### neturl

A Robust URL Parser and Builder for Lua.

This small Lua library provides a few functions to parse URL with querystring and build new URL easily.

- Package Name: `net.url`
- Author: `Bertrand Mansion`
- License: [MIT License](https://github.com/golgote/neturl/blob/32acd84d06e16ddffc975adafce9cea26f3b2dd1/LICENSE.txt)
- Home Page: [`https://github.com/golgote/neturl`](https://github.com/golgote/neturl)

### lua-path

- Package Name: `path`
- Author: `Alexey Melnichuk`
- License: [MIT License](https://github.com/moteus/lua-path/blob/5a32c7052e84cdb9dcbcd45648aae3f6927376ac/LICENCE.txt)
- Home Page: [`https://github.com/moteus/lua-path`](https://github.com/moteus/lua-path)

### lua-pop3

POP3 client library for Lua 5.1 / 5.2 / 5.3.

- Package Name: `pop3`
- Author: `Alexey Melnichuk`
- License: [MIT License](https://github.com/moteus/lua-pop3/blob/89978f17238b8d7e57b4fb130088925620a22e5a/LICENCE.txt)
- Home Page: [`https://github.com/moteus/lua-pop3`](https://github.com/moteus/lua-pop3)

### luaposix

This is a POSIX binding for LuaJIT, Lua 5.1, 5.2, 5.3 and 5.4; like most libraries it simply binds to C APIs on the underlying system, so it won’t work on non-POSIX systems. However, it does try to detect the level of POSIX conformance of the underlying system and bind only available APIs.

- Package Name: `posix`
- Author: `Gary V. Vaughan`
- License: [MIT License](https://github.com/luaposix/luaposix/blob/aa9b3ca204ce0602a1501a0a3e50809a2a590585/LICENSE)
- Home Page: [`https://github.com/luaposix/luaposix`](https://github.com/luaposix/luaposix)

### sirocco

A collection of interactive command line prompts for Lua.

- Package Name: `sirocco`
- Author: `Benoit Giannangeli`
- License: [MIT License](https://github.com/giann/sirocco/blob/b2af2d336e808e763b424d2ea42e6a2c2b4aa24d/LICENSE)
- Home Page: [`https://github.com/giann/sirocco`](https://github.com/giann/sirocco)

### LuaSec

`LuaSec` depends on OpenSSL, and integrates with LuaSocket to make it easy to add secure connections to any Lua applications or scripts.

- Package Name: `ssl`
- Author: `Bruno Silvestre`
- License: [LuaSec 1.1.0 License](https://github.com/lunarmodules/luasec/blob/2c248947df0ffa6064546d0c85f607f4a32ecbab/LICENSE)
- Home Page: [`https://github.com/brunoos/luasec`](https://github.com/brunoos/luasec)

### lua-term

`lua-term` is a Lua module for manipulating a terminal.

- Package Name: `term`
- Author: `Rob Hoelz`
- License: [MIT License](https://github.com/hoelzro/lua-term/blob/375fa065efc9a95b289371cf0eb7bf8b3be0bc9c/COPYING)
- Home Page: [`https://github.com/hoelzro/lua-term`](https://github.com/hoelzro/lua-term)

### lua-tui

A library for doing things with terminals.

- Package Name: `tui`
- Author: [`daurnimator`](https://github.com/daurnimator)
- License: [MIT License](https://github.com/daurnimator/lua-tui/blob/9e854fc22074d73a26fbf25cf24690c60b042b11/LICENSE.md)
- Home Page: [`https://github.com/daurnimator/lua-tui`](https://github.com/daurnimator/lua-tui)

### lua-wcwidth

When writing output to a fixed-width output system (such as a terminal), the displayed length of a string does not always match the number of characters (also known as [runes](https://swtch.com/plan9port/unix/man/rune3.html), or code points) contained by the string. Some characters occupy two spaces (full-wide characters), and others occupy none.

POSIX.1-2001 and POSIX.1-2008 specify the [wcwidth(3)](http://man7.org/linux/man-pages/man3/wcwidth.3.html) function which can be used to know how many spaces (or cells) must be used to display a Unicode code point. This Lua contains a portable and standalone implementation based on the Unicode Standard release files.

This module is useful mainly for implementing programs which must produce output to terminals, while handling proper alignment for double-width and zero-width Unicode code points.

- Package Name: `wcwidth`
- Author: `Adrian Perez`
- License: [MIT License](https://github.com/aperezdc/lua-wcwidth/blob/ee444b92f50ff4866c44989c37dd8077e120c148/luarocks/wcwidth-0.5-1.rockspec)
- Home Page: [`https://github.com/aperezdc/lua-wcwidth`](https://github.com/aperezdc/lua-wcwidth)

### Alien

Alien is a Foreign Function Interface (FFI) for Lua. An FFI lets you call functions in dynamic libraries (.so, .dylib, .dll, etc.) from Lua code without having to write, compile and link a C binding from the library to Lua. In other words, it lets you write extensions that call native code using just Lua.

- Package Name: `alien`
- Author: `Fabio Mascarenhas`
- License: [MIT License](https://github.com/mascarenhas/alien/blob/d19b4022188a961af2e6931f748f71fcb36426d7/README)
- Home Page: [`https://github.com/mascarenhas/alien`](https://github.com/mascarenhas/alien)

### ansicolors.lua

`ansicolors` is a simple Lua function for printing to the console in color.

- Package Name: `ansicolors`
- Author: `Enrique García Cota`
- License: [MIT License](https://github.com/kikito/ansicolors.lua/blob/a788ef99bbb54b3f1e22aaa34e2c99a44cb0606a/COPYING)
- Home Page: [`https://github.com/kikito/ansicolors.lua`](https://github.com/kikito/ansicolors.lua)

### argparse

`Argparse` is a feature-rich command line parser for Lua inspired by argparse for Python.

`Argparse` supports positional arguments, options, flags, optional arguments, subcommands and more. Argparse automatically generates usage, help and error messages.

- Package Name: `argphase`
- Author: `Peter Melnichenko`
- License: [MIT License](https://github.com/mpeterv/argparse/blob/412e6aca393e365f92c0315dfe50181b193f1ace/LICENSE)
- Home Page: [`https://github.com/mpeterv/argparse`](https://github.com/mpeterv/argparse)

### lbase64

Pure Lua [base64](https://en.wikipedia.org/wiki/Base64) encoder/decoder. Works with Lua 5.1+ and LuaJIT. Fallbacks to pure Lua bit operations if bit/bit32/native bit operators are not available.

- Package Name: `base64`
- Author: [`iskolbin`](https://github.com/iskolbin)
- License: [MIT License](https://github.com/iskolbin/lbase64/blob/c261320edbdf82c16409d893a96c28c704aa0ab8/rockspec/base64-1.5-3.rockspec)
- Home Page: [`https://github.com/iskolbin/lbase64`](https://github.com/iskolbin/lbase64)

### binaryheap.lua

[Binary heap](http://en.wikipedia.org/wiki/Binary_heap) implementation.

- Package Name: `binaryheap`
- Author: `Thijs Schreijer`
- License: [MIT License](https://github.com/Tieske/binaryheap.lua/blob/478d40df3ff32d2f3427eeb4104a6216a64f0669/LICENSE)
- Home Page: [`https://github.com/Tieske/binaryheap.lua`](https://github.com/Tieske/binaryheap.lua)

### LuaDate

Lua Date and Time module for Lua 5.x.

- Package Name: `date`
- Author: `Thijs Schreijer`
- License: [MIT License](https://github.com/Tieske/date/blob/e5d38bb4e8b8d258d4fc07f3423aa0ac8d1deb6f/LICENSE)
- Home Page: [`https://github.com/Tieske/date`](https://github.com/Tieske/date)

### lua-ftp

Simple wrapper around `LuaSocket` ftp.

- Package Name: `ftp`
- Author: `Alexey Melnichuk`
- License: [MIT License](https://github.com/moteus/lua-ftp/blob/f1e2a821d853fdbed45efbfbb65c1a15eef8d822/LICENCE.txt)
- Home Page: [`https://github.com/moteus/lua-ftp`](https://github.com/moteus/lua-ftp)

### imap4.lua

Simple IMAP4 protocol wrapper, based on [RFC3501](https://tools.ietf.org/html/rfc3501).

- Package Name: `imap4`
- Author: `Matthias Richter`
- [License](https://github.com/vrld/imap4.lua/tree/027a4eea9162b95851716d531b085039b2b36da8)
- Home Page: [`https://github.com/vrld/imap4.lua`](https://github.com/vrld/imap4.lua)

### LuaPanda

- Package Name: `LuaPanda`
- Author: `Tencent`
- License: [BSD 3-Clause License](https://github.com/Tencent/LuaPanda/blob/80e5f7ff521b5789e6716d5d1f00ce04a517ea3f/LICENSE.txt)
- Home Page: [`https://github.com/Tencent/LuaPanda`](https://github.com/Tencent/LuaPanda)

### LuaUnit

`LuaUnit` is a popular unit-testing framework for Lua, with an interface typical of xUnit libraries (Python unittest, Junit, NUnit, ...). It supports several output formats (Text, TAP, JUnit, ...) to be used directly or work with Continuous Integration platforms (Jenkins, Hudson, ...).

`LuaUnit` may be installed as a [rock](https://luarocks.org/modules/bluebird75/luaunit) or directly added to your project. For simplicity, `LuaUnit` is contained into a single-file and has no external dependency.

Tutorial and reference documentation is available on [read-the-docs](http://luaunit.readthedocs.org/en/latest/).

`LuaUnit` may also be used as an assertion library, to validate assertions inside a running program. In addition, it provides a pretty stringifier which converts any type into a nicely formatted string (including complex nested or recursive tables).

- Package Name: `luaunit`
- Author: `Philippe F`
- License: [BSD License](https://github.com/bluebird75/luaunit/blob/5e9ae05ba3d53e7d8f70689c589e6cf35554646f/LICENSE.txt)
- Home Page: [`https://github.com/bluebird75/luaunit`](https://github.com/bluebird75/luaunit)

### LuaXML

`LuaXML` provides a minimal set of functions for the processing of XML data in Lua. It offers a very simple and natural mapping between the XML data format and Lua tables, which allows one to parse XML data just using Lua’s normal table access and iteration methods: Substatements and text content is represented as array data having numerical keys, attributes and tags use string keys. This representation makes sure that the structure of XML data is exactly preserved in a read/write cycle.

Since version 1.7, `LuaXML` consists of a well-optimized portable ISO-standard C file and a small Lua file. It is published under the same liberal licensing conditions as Lua itself (see below). It has been successfully compiled and used under Linux, various flavours of MS Windows, and Mac OS X.

- Package Name: `LuaXML`
- Author: `Peter Drahoš`
- License: [MIT License](https://github.com/LuaDist/luaxml/blob/c5f544c3b758d7aef6c119abb520871699f4785c/readme.txt)
- Home Page: [`https://github.com/LuaDist/luaxml`](https://github.com/LuaDist/luaxml)

### lua-protobuf

This project offers a C module for Lua (5.1, 5.2, 5.3, 5.4 and LuaJIT) manipulating Google’s protobuf protocol, both for version 2 and 3 syntax and semantics. It splits to the lower-level and the high-level parts for different goals.

For converting between binary protobuf data with Lua tables, using `pb.load()` loads the compiled protobuf schema content (`*.pb` file) generated by Google protobuf’s compiler named `protoc` and call `pb.encode()`/`pb.decode()`.

Or use these modules to manipulate the raw wire format in lower-level way:

- `pb.slice`: a wire format decoding module.
- `pb.buffer`: a buffer implement that use to encode basic types into protobuf’s wire format. It can be used to support streaming decode protobuf data.
- `pb.conv`: a module converting integers in the protobuf wire format.
- `pb.io`: a module access stdin/stdout or other files in binary mode.

If you don’t want to depend Google’s protobuf compiler, `protoc.lua` is a pure Lua module translating text-based protobuf schema content into the `*.pb` binary format.

- Package Name: `pb`, `protoc`
- Author: `Xavier Wang`
- License: [MIT License](https://github.com/starwing/lua-protobuf/blob/739bf67692cf6becc2485d502bd35f7971a9ef26/LICENSE)
- Home Page: [`https://github.com/starwing/lua-protobuf`](https://github.com/starwing/lua-protobuf)

### LPeg

`LPeg` is a new pattern-matching library for Lua, based on [Parsing Expression Grammars](http://pdos.csail.mit.edu/~baford/packrat/) (PEGs). This text is a reference manual for the library. For a more formal treatment of `LPeg`, as well as some discussion about its implementation, see [A Text Pattern-Matching Tool based on Parsing Expression Grammars](http://www.inf.puc-rio.br/~roberto/docs/peg.pdf). (You may also be interested in my [talk about `LPeg`](http://vimeo.com/1485123) given at the III Lua Workshop.)

- Package Name: `lpeg`
- Author: `Lua.org, PUC-Rio.`
- [License](https://www.inf.puc-rio.br/~roberto/lpeg/#license)
- Home Page: [`http://www.inf.puc-rio.br/~roberto/lpeg/`](http://www.inf.puc-rio.br/~roberto/lpeg/)
- Tree: [`v1.0.2`](http://www.inf.puc-rio.br/~roberto/lpeg/lpeg-1.0.2.tar.gz)

### lua-sendmail

Simple wrapper around `LuaSocket` `smtp.send`.

- Package Name: `sendmail`
- Author: `Alexey Melnichuk`
- License: [MIT License](https://github.com/moteus/lua-sendmail/blob/e3c40d0f6c419a8b530104ee219c9cd2741d8e8a/LICENCE.txt)
- Home Page: [`https://github.com/moteus/lua-sendmail`](https://github.com/moteus/lua-sendmail)

### Serpent

Lua serializer and pretty printer.

- Package Name: `serpent`
- Author: `Paul Kulchenko`
- License: [MIT License](https://github.com/pkulchenko/serpent/blob/139fc18263bc5ffecc1729147891f1eb383046bf/LICENSE)
- Home Page: [`https://github.com/pkulchenko/serpent`](https://github.com/pkulchenko/serpent)

### Lua-Split

- Package Name: `split`
- Author: `Alexey Melnichuk`
- License: [MIT License](https://github.com/moteus/lua-split/blob/ea32e4602ffd87783f9a224636455e3475c078fb/LICENSE)
- Home Page: [`https://github.com/moteus/lua-split`](https://github.com/moteus/lua-split)

### timerwheel.lua

Efficient timer for timeout related timers: fast insertion, deletion, and execution (all as O(1) implemented), but with lesser precision.

This module will not provide the timer/runloop itself. Use your own runloop and call `wheel:step` to check and execute timers.

- Package Name: `timerwheel`
- Author: `Thijs Schreijer`
- License: [MIT License](https://github.com/Tieske/timerwheel.lua/blob/68c468e687c2c17d357644c11290112e934760c7/LICENSE)
- Home Page: [`https://github.com/Tieske/timerwheel.lua`](https://github.com/Tieske/timerwheel.lua)

### lua-iconv

`Lua-iconv` is POSIX `iconv` binding for the Lua Programming Language. The `iconv` library converts a sequence of characters from one codeset into a sequence of corresponding characters in another codeset. The codesets are those specified in the `iconv.new()` call that returned the conversion descriptor, cd.

- Package Name: `iconv`
- Author: `Alexandre Erwin Ittner`
- [License](https://github.com/lunarmodules/lua-iconv/blob/b761918588736348698eb060a3a490f448786f01/COPYING)
- Home Page: [`https://github.com/ittner/lua-iconv`](https://github.com/ittner/lua-iconv)

### lua-utf8-simple

- Package Name: `utf8_simple`
- Author: [`blitmap`](https://github.com/blitmap)
- License: [MIT License](https://github.com/blitmap/lua-utf8-simple/blob/7ef030750d8e408ac5d724aefab2ec8769731005/LICENSE)
- Home Page: [`https://github.com/blitmap/lua-utf8-simple`](https://github.com/blitmap/lua-utf8-simple)

### LuaSQLite3

- Package Name: `lsqlite3`
- Author: `Tiago Dionizio, Doug Currie`
- [License](http://lua.sqlite.org/home/doc/tip/doc/lsqlite3.wiki#license)
- Home Page: [`http://lua.sqlite.org`](http://lua.sqlite.org/index.cgi/index)
- Tree: [`v0.9.5`](http://lua.sqlite.org/index.cgi/zip/lsqlite3_fsl09y.zip?uuid=fsl_9y)

### lua-archive

Lua 5.1 interface to `libarchive`.

- Package Name: `archive`
- Author: `Brian Maher`
- License: [MIT License](https://github.com/brimworks/lua-archive/blob/042b4be1425c11bb9b051609c8ccab68921cefc0/README)
- Home Page: [`https://github.com/brimworks/lua-archive`](https://github.com/brimworks/lua-archive)

### lua-ev

- Package Name: `ev`
- Author: `Brian Maher`
- License: [MIT License](https://github.com/brimworks/lua-ev/blob/2d11066b6f96a7501805e8c28d92f70dd2c0ab13/LICENSE)
- Home Page: [`https://github.com/brimworks/lua-ev`](https://github.com/brimworks/lua-ev)

### lua-http-parser

Lua 5.1 interface to ry’s `http-parser`.

- Package Name: `http.parser`
- Author: `Brian Maher`
- License: [MIT License](https://github.com/brimworks/lua-http-parser/blob/b4225939e3413938cc674732086fe4f8578902e9/LICENSE-MIT)
- Home Page: [`https://github.com/brimworks/lua-http-parser`](https://github.com/brimworks/lua-http-parser)

### lua-openssl

A free, MIT-licensed OpenSSL binding for Lua.

- Package Name: `openssl`
- Author: `George Zhao`
- License: [MIT License](https://github.com/zhaozg/lua-openssl/blob/2a391e2be61fecbe6232e1f0a5b53dfdc00deb80/LICENSE)
- Home Page: [`https://github.com/zhaozg/lua-openssl`](https://github.com/zhaozg/lua-openssl)

### lua-spawn

A lua library to spawn programs.

- Package Name: `spawn`
- Author: [`daurnimator`](https://github.com/daurnimator)
- License: [MIT License](https://github.com/daurnimator/lua-spawn/blob/b2f1629754a3e78edab1f69c71e7d7334cbe4e92/LICENSE)
- Home Page: [`https://github.com/daurnimator/lua-spawn`](https://github.com/daurnimator/lua-spawn)

### lua-vararg

`vararg` is a Lua library for manipulation of variable arguements (vararg) of functions. These functions basically allow you to do things with `vararg` that cannot be efficiently done in pure Lua but can be easily done through the C API.

Actually, the main motivation for this library was the 'pack' function, which is an elegant alternative for the possible new standard function ’table.pack' and the praised 'apairs'. Also 'pack' allows an interesting implementaiton of tuples in pure Lua.

- Package Name: `vararg`
- Author: `Alexey Melnichuk`
- License: [MIT License](https://github.com/moteus/lua-vararg/blob/418aa4f2a5624746869b8bbf7eab279383bcfc34/LICENSE)
- Home Page: [`https://github.com/moteus/lua-vararg`](https://github.com/moteus/lua-vararg)

### lua-zlib

Lua 5.1 interface to `zlib`.

- Package Name: `zlib`
- Author: `Brian Maher`
- License: [MIT License](https://github.com/brimworks/lua-zlib/blob/3f5c326760e62137a48fd8288541f51ee80b256b/README)
- Home Page: [`https://github.com/brimworks/lua-zlib`](https://github.com/brimworks/lua-zlib)

### luafilesystem

`LuaFileSystem` is a Lua library developed to complement the set of functions related to file systems offered by the standard Lua distribution.

`LuaFileSystem` offers a portable way to access the underlying directory structure and file attributes. `LuaFileSystem` is free software and uses the same license as Lua 5.x (MIT).

- Package Name: `lfs`
- Author: `Hisham Muhammad`
- License: [MIT License](https://github.com/lunarmodules/luafilesystem/blob/9cbe5cba9047b449308e1365690b0a5acfdef181/LICENSE)
- Home Page: [`https://github.com/lunarmodules/luafilesystem`](https://github.com/lunarmodules/luafilesystem)

### lunix

`lunix` is a Lua bindings library module to common Unix system APIs. The module is regularly tested on recent versions of AIX, FreeBSD, Linux/glibc, Linux/musl, NetBSD, OpenBSD, OS X, and Solaris. The best way to describe it is in contradistinction to luaposix, the most popular bindings module for Unix APIs in Lua.

- Package Name: `unix`
- Author: `William Ahern`
- License: [MIT License](https://github.com/wahern/lunix/blob/b4c1a08381c4d041dc73cb1df24b7b10925c97ea/LICENSE)
- Home Page: [`https://github.com/wahern/lunix`](https://github.com/wahern/lunix)

### lua-websockets

- Package Name: `websocket`
- Author: `Gerhard Preuss`
- License: [MIT License](https://github.com/lipp/lua-websockets/blob/1c6e94b27fe7cb157877987fba86299fb326be0c/COPYRIGHT)
- Home Page: [`https://github.com/lipp/lua-websockets`](https://github.com/lipp/lua-websockets)

### Lua IMagick

Pure-C Lua bindings to `ImageMagick`.

- Package Name: `imagick`
- Author: `Epifanov Ivan`
- License: [Do What The F*ck You Want To Public License](https://github.com/isage/lua-imagick/blob/345d6b44a9c4a866e2f295a705005de4ed934964/LICENSE)
- Home Page: [`https://github.com/isage/lua-imagick`](https://github.com/isage/lua-imagick)

### lyaml

[LibYAML](http://pyyaml.org/wiki/LibYAML) binding for [Lua](http://www.lua.org/), with a fast C implementation for converting between [%YAML 1.1](http://yaml.org/spec/1.1/) and [Lua](http://www.lua.org/) tables, and a low-level [YAML](http://yaml.org/) event parser for implementing more intricate [YAML](http://yaml.org/) document loading.

- Package Name: `lyaml`
- Author: `Gary V. Vaughan`
- License: [MIT License](https://github.com/gvvaughan/lyaml/blob/0701528f79bd3d0fb118b9a6a7321dcb8512c654/LICENSE)
- Home Page: [`https://github.com/gvvaughan/lyaml`](https://github.com/gvvaughan/lyaml)

### luaexif

[luaexif](https://github.com/minoki/luaexif) is a Lua binding for [libexif](https://github.com/libexif/libexif). Compatible with Lua 5.1 or later.

- Package Name: `exif`
- Author: `Minoki`
- License: [MIT License](https://github.com/minoki/luaexif/blob/9d2cc14d940e138834285bd2cd05987b8aaa3918/COPYRIGHT)
- Home Page: [`https://github.com/minoki/luaexif`](https://github.com/minoki/luaexif)

### inspect.lua

This library transforms any Lua value into a human-readable representation. It is especially useful for debugging errors in tables.

The objective here is human understanding (i.e. for debugging), not serialization or compactness.

- Package Name: `inspect`
- Author: `Enrique García Cota`
- License: [MIT License](https://github.com/kikito/inspect.lua/blob/8686162bce74913c4d3a577e7324642ddc4e21c0/MIT-LICENSE.txt)
- Home Page: [`https://github.com/kikito/inspect.lua`](https://github.com/kikito/inspect.lua)
