---
sidebar_position: 11
---

# 扩展字符串模块

## 扩展字符串模块 - string

标有 🔤 的函数将传入的 `string` 类型作为 UTF-8 *文本型* 进行处理。

### 转成十六进制文本 \(**string\.to\_hex**\)

#### 声明

```lua
十六进制文本 = string.to_hex(数据内容)
```

#### 参数及返回值

- 数据内容 *字符串型*
- 十六进制文本 *文本型*

#### 说明

将 **数据内容** 转换成可打印的 **十六进制文本**。

#### 示例 1

```lua title="string.to_hex"
sys.alert(string.to_hex('一些数据'))
-- 输出 "e4b880e4ba9be695b0e68dae"
```

#### 示例 2

```lua title="string.to_hex"
sys.alert((string.to_hex('一些数据'):gsub('(..)', '\\x%1')))
-- 输出 "\xe4\xb8\x80\xe4\xba\x9b\xe6\x95\xb0\xe6\x8d\xae"
```

### 从十六进制文本转回 \(**string\.from\_hex**\)

#### 声明

```lua
数据内容 = string.from_hex(十六进制文本)
```

#### 参数及返回值

- 十六进制文本 *文本型*
- 数据内容
  - *字符串型*，如果输入参数不是十六进制文本，则返回 `nil`

#### 说明

[`string.to_hex`](#转成十六进制文本-stringto_hex) 的逆函数，将可打印的 **十六进制文本** 转换回 **数据内容**。

#### 示例

```lua title="string.from_hex"
sys.alert(string.from_hex('e4b880e4ba9be695b0e68dae'))
-- 输出 "一些数据"
```

### 将 GBK 编码的文本转成 UTF-8 编码的文本 \(**string\.from\_gbk**\)

#### 声明

```lua
可以直接用的文本 = string.from_gbk(GBK编码的字符串)
```

#### 参数及返回值

- GBK编码的字符串 *字符串型*
- 可以直接用的文本
  - *文本型*，返回 UTF-8 编码的文本。如果编码错误导致转换无法完成，返回 `nil`

#### 说明

将 GBK/GB2312 编码的文本转成 UTF-8 编码的文本。

:::caution
转换返回乱码字符串可能是编码不正确，但是能完成编码对应转换，这不是函数的问题。
:::

#### 示例

```lua title="string.from_gbk"
-- 中文编码 中文标准编码 国标扩展编码 GB2312
gbkstr = '\x58\x58\x54\x6f\x75\x63\x68\x20\xba\xdc\xc7\xbf'
--
sys.alert(gbkstr)                  -- GBK 编码的字符串无法显示
sys.alert(string.from_gbk(gbkstr)) -- 输出 "XXTouch 很强"
```

### 计算字符串的哈希值 \(**string\.md5,sha1,sha256,sha512**\)

#### 声明

```lua
哈希值 = string.md5(数据内容)     -- 计算 MD5
哈希值 = string.sha1(数据内容)    -- 计算 SHA-1
哈希值 = string.sha256(数据内容)  -- 计算 SHA-256
哈希值 = string.sha512(数据内容)  -- 计算 SHA-512
```

#### 参数及返回值

- 数据内容 *字符串型*
- 哈希值
  - *文本型*，返回 **数据内容** 指定类型哈希值的十六进制文本

#### 示例

```lua title="string.md5"
sys.alert(string.md5('XXTouch 真棒'))   -- 输出 "4921dbf380df452fa959dc47cef30e4b"
```

```lua title="string.sha1"
sys.alert(string.sha1('XXTouch 真棒'))  -- 输出 "a959c48d904c1075c7ddfdb1fda49effb2142493"
```

```lua title="string.hash"
local str = "sozereal"
sys.alert('"'..str..'" 的十六进制编码为: <'..str:to_hex()..'>')
sys.alert('<'..str:to_hex()..'> 转换成明文为: "'..str:to_hex():from_hex()..'"')
sys.alert('"'..str..'" 的 MD5 值是: '..str:md5())
sys.alert('"'..str..'" 的 SHA1 值是: '..str:sha1())
local binstr = "\0\1\2\3\4\5"
sys.alert('<'..binstr:to_hex()..'> 的 MD5 值是: '..binstr:md5())
sys.alert('<'..binstr:to_hex()..'> 的 SHA1 值是: '..binstr:sha1())
```

### 对字符串进行 base64 编解码 \(**string\.base64\_encode,decode**\)

#### 声明

```lua
b64文本 = string.base64_encode(数据内容)  -- 编码
数据内容 = string.base64_decode(b64文本)  -- 解码
```

#### 参数及返回值

- 数据内容 *字符串型*
- b64文本
  - *文本型*，**数据内容** 的 base64 编码文本

#### 示例

```lua title="string.base64_encode"
-- 取屏幕区域 png 格式数据进行 base64 编码
b64s = screen.image(0, 0, 100, 100):png_data():base64_encode()

-- 读取文件数据并进行 base64 编码
b64s = file.reads('/var/mobile/1.png'):base64_encode()
```

### 对字符串进行加解密 \(**string\.aes128\_encrypt,decrypt**\)

#### 声明

```lua
加密后的数据 = string.aes128_encrypt(数据内容, 密钥)  -- 加密
数据内容 = string.aes128_decrypt(加密后的数据, 密钥)  -- 解密
```

#### 参数及返回值

- 数据内容 *字符串型*
- 密钥 *字符串型*
- 加密后的数据 *字符串型*

#### 说明

- `string.aes128_encrypt` 使用 AES128 算法 ECB 模式将原始 **数据内容** 加密为 **加密后的数据**。
- `string.aes128_decrypt` 使用 AES128 算法 ECB 模式将 **加密后的数据** 解密为原始 **数据内容**。

:::note
AES128 算法 ECB 模式不存在 iv（偏移向量）参数，如果对接开发中一定需要写，那么是 `0`。
:::

#### 示例

```lua title="string.crypto"
local msg = "\5\4\3\2\1\0"
local key = "sozereal"
local emsg = msg:aes128_encrypt(key)
local emsgb64 = emsg:base64_encode()
sys.alert('二进制数据 <'..msg:to_hex()..'> \n 使用 AES128 算法 密钥 "'..key..'" 加密 值是: <'..emsg:to_hex()..'> \n base64 串为 "'..emsgb64..'"')
local tmp = emsgb64:base64_decode()
msg = tmp:aes128_decrypt(key)
sys.alert('"'..emsgb64..'" base64 解码后的数据为 <'..tmp:to_hex()..'> \n使用 AES128 算法 密钥 "'..key..'" 解密 值是: <'..msg:to_hex()..'>')
```

### 🔤 用分隔符规则分割一个文本 \(**string\.split**\)

#### 声明

```lua
分割好的文本数组 = string.split(待分割文本, 分隔符[, 最大返回个数])
```

#### 参数及返回值

- 待分割文本 *文本型*
- 分隔符 *文本型*
- 最大返回个数
  - *整数型*，*可选*，超出数量的分割结果将会被 **丢弃**
- 分割好的文本数组
  - *文本型顺序表*，分割后的文本片段按顺序排列于此表

#### 示例 1

```lua title="string.split"
t = string.split('lfue6841214----123456', '----')
sys.alert('账号是：'..t[1])
```

#### 示例 2

```lua title="string.split"
t = string.split('您好，验证码是#4937#，15分钟内有效。【爆炸科技】', '#')
sys.alert('验证码是：'..t[2])
```

#### 示例 3

```lua title="string.split"
t = string.split('您好，验证码是4937，15分钟内有效。【爆炸科技】', '验证码是')
t = string.split(t[2], '，15分钟')
sys.alert('验证码是：'..t[1])
```

#### 示例 4

```lua title="string.split"
assert(#string.split(multi_line, "\n") == 8)
assert(#string.split(multi_line, "hello") == 9)
assert(#string.split(multi_line, "\n", 4) == 4)
assert(string.split(multi_line, "HELLO", 4)[1] == multi_line)
assert(string.split(multi_line, "\n", 1)[1] == "hello001")
assert(string.split("", "\n")[1] == "")
```

#### 封装示例 1

```lua title="string.split"
-- 取文本中间部分的封装（找不到匹配返回 nil）
function str_middle(str, sep1, sep2)
  assert(type(str) == 'string', '`str_middle` 第 #1 参数必须是字符串')
  assert(type(sep1) == 'string', '`str_middle` 第 #2 参数必须是字符串')
  assert(type(sep2) == 'nil' or type(sep2) == 'string', '`str_middle` 第 #3 参数可选，但必须是字符串')
  local t = string.split(str, sep1)
  if not sep2 or sep1 == sep2 then
    return t[2]
  else
    if t[2] == nil then
      return nil
    else
      t = string.split(t[2], sep2)
      if t[2] == nil then
        return nil
      else
        return t[1]
      end
    end
  end
end
-- 以上封装可复制到脚本中用
--
r = str_middle('您好，验证码是4937，15分钟内有效。【爆炸科技】', '码是', '，15分')
sys.alert('验证码是：'..r)
-- 输出 "验证码是：4937"
--
r = str_middle('您好，验证码是#8346#，15分钟内有效。【爆炸科技】', '#')
sys.alert('验证码是：'..r)
-- 输出 "验证码是：8346"
```

#### 封装示例 2

```lua title="string.split"
-- 取绝对路径的文件名
function str_strip_dirname(path)
  local d = string.split(path, '/')
  return d[#d]
end
-- 取绝对路径的目录
function str_strip_filename(path)
  local d = string.split(path, '/')
  d[#d] = nil
  return table.concat(d, '/')
end
-- 剔除路径最后一部分的扩展名（后缀名）
function str_strip_extension(path)
  local d = string.split(path, '/')
  local fnt = string.split(d[#d], '.')
  d[#d] = fnt[1]
  return table.concat(d, '/')
end
-- 获取路径最后一部分的扩展名（后缀名）
function str_get_extension(path)
  local d = string.split(path, '/')
  local fnt = string.split(d[#d], '.')
  table.remove(fnt, 1)
  return table.concat(fnt, '.')
end
--
sys.alert(str_strip_dirname("/private/var/mobile/Media/1ferver/lua/scripts/1.lua.xxt"))
-- 输出 "1.lua.xxt"
sys.alert(str_strip_filename("/private/var/mobile/Media/1ferver/lua/scripts/1.lua.xxt"))
-- 输出 "/private/var/mobile/Media/1ferver/lua/scripts"
sys.alert(str_strip_extension("/private/var/mobile/Media/1ferver/lua/scripts/1.lua.xxt"))
-- 输出 "/private/var/mobile/Media/1ferver/lua/scripts/1"
sys.alert(str_get_extension("/private/var/mobile/Media/1ferver/lua/scripts/1.lua.xxt"))
-- 输出 "lua.xxt"
sys.alert(str_strip_extension(str_strip_dirname("/private/var/mobile/Media/1ferver/lua/scripts/1.lua.xxt")))
-- 输出 "1"
```

#### 相关示例：逐字分割文本

```lua title="string.explode"
-- 这不是使用 string.split 实现的例子
-- 将中英混合的文本爆开成一个个的字符，仅支持 UTF-8 编码文本
function string.explode(text)
  local ret = {}
  for p, c in utf8.codes(text) do
    ret[#ret + 1] = utf8.char(c)
  end
  return ret
end
--
local t = string.explode('你好，XXTouch')
sys.alert(table.concat(t, '/'))
-- 输出 "你/好/，/X/X/T/o/u/c/h"
```

### 🔤 去除文本中的空白字符 \(**string\.ltrim,rtrim,trim,atrim**\)

#### 声明

```lua
处理后文本 = string.ltrim(处理前文本)  -- 去除文本左边的空白字符
处理后文本 = string.rtrim(处理前文本)  -- 去除文本右边的空白字符
处理后文本 = string.trim(处理前文本)   -- 去除文本两边的空白字符
处理后文本 = string.atrim(处理前文本)  -- 去除文本中所有的空白字符
```

#### 参数及返回值

- 处理前文本 *文本型*
- 处理后文本 *文本型*

:::note
空白字符包括 `"\r"` `"\n"` `"\t"` 等。
:::

#### 示例

```lua title="string.trim"
assert(string.trim("  sp a ces  ") == "sp a ces")
assert(string.ltrim("  sp a ces  ") == "sp a ces  ")
assert(string.rtrim("  sp a ces  ") == "  sp a ces")
assert(string.atrim("  sp a ces  ") == "spaces")
```

```lua title="string.utils"
str = "  哈哈,he he,1,3,6  "
new = str:split(",")    -- 将字符串 str 按照 `,` 分割并返回一个表
sys.alert(new[2])
sys.alert(str:rtrim())  -- 结果 "  哈哈,he he,1,3,6"，删除字符串尾部的空白字符
sys.alert(str:ltrim())  -- 结果 "哈哈,he he,1,3,6  "，删除字符串首部的空白字符
sys.alert(str:trim())   -- 结果 "哈哈,he he,1,3,6"，删除字符串首尾的空白字符
sys.alert(str:atrim())  -- 结果 "哈哈,hehe,1,3,6"，删除字符串所有的空白字符
```

### 🔤 左右补齐 \(**string\.lpad,rpad**\)

#### 声明

```lua
处理后文本 = string.lpad(处理前文本, 补齐长度, [补齐文本 = " "])  -- 左补齐
处理后文本 = string.rpad(处理前文本, 补齐长度, [补齐文本 = " "])  -- 右补齐
```

#### 参数及返回值

- 处理前文本 *文本型*
- 补齐长度 *整数型*
- 补齐文本
  - *文本型*，*可选*，用来将 **处理前文本** 填充至 **补齐长度** 的文本
- 处理后文本 *文本型*

#### 说明

- 在 **处理前文本** 的左边或右边，多次循环重复 **补齐文本** 进行填充，直至文本长度达到或超过 **补齐长度**。  
- 若最后一次填充将超出 **补齐长度**，将会截断此次用于填充的 **补齐文本**，使最终的文本长度正好等于 **补齐长度**。
- 若 **补齐长度** 小于 **处理前文本**，则什么事都不会发生。**处理后文本** 的长度始终大于等于 **处理前文本** 的长度。

#### 示例

```lua title="string.lpad"
assert(string.lpad("text_message", 16) == "    text_message")
assert(string.lpad("text_message", 8) == "text_message")
assert(string.lpad("text_message", 20, "0") == "00000000text_message")
assert(string.lpad("text_message", 20, "0ab") == "0ab0ab0atext_message")  -- 超出补齐长度，截断补齐文本
assert(string.lpad("text", 6, "longmessage") == "lotext")

local _, err = pcall(function ()
  string.lpad("text_message", -7)
end)
assert(err)
```

```lua title="string.rpad"
assert(string.rpad("text_message", 16) == "text_message    ")
assert(string.rpad("text_message", 8) == "text_message")
assert(string.rpad("text_message", 20, "0") == "text_message00000000")
assert(string.rpad("text_message", 20, "0ab") == "text_message0ab0ab0a")  -- 超出补齐长度，截断补齐文本
assert(string.rpad("text", 6, "longmessage") == "textlo")

local _, err = pcall(function ()
  string.rpad("text_message", -7)
end)
assert(err)
```

### 🔤 去除掉文本前的 UTF8-BOM \(**string\.strip\_utf8\_bom**\)

#### 声明

```lua
处理后文本 = string.strip_utf8_bom(处理前文本)
```

#### 参数及返回值

- 处理前文本 *文本型*
- 处理后文本 *文本型*

:::note
UTF-8-BOM 的表现形式是文档开头的三个看不见的字符 `"\xEF\xBB\xBF"`。  
**BOM (Byte Order Mark)** 是为 UTF-16 和 UTF-32 准备的，用于标记字节序（Byte Order）。微软在 UTF-8 中使用 BOM 是因为这样可以把 UTF-8 和 ASCII 等编码明确区分开，但这样的文件在 Windows 之外的操作系统里会带来问题。  
UTF-8 **不需要** BOM，尽管 Unicode 标准允许在 UTF-8 中使用 BOM。在 UTF-8 文件中放置 BOM 是微软的习惯（把带有 BOM 的小端序 UTF-16 称作「Unicode」而又不详细说明，也是微软的习惯）。
:::

#### 示例

```lua title="string.strip_utf8_bom"
txt = "\xEF\xBB\xBFXXTouch"
sys.alert(txt..', '..#txt) -- 输出 "XXTouch, 10"
--
txt = string.strip_utf8_bom(txt)
sys.alert(txt..', '..#txt) -- 输出 "XXTouch, 7"
```

### 🔤 生成随机文本 \(**string\.random**\)

#### 声明

```lua
随机文本 = string.random(字符池[, 生成字符个数])
```

#### 参数及返回值

- 字符池
  - *文本型*，需要生成文本的字典
- 生成字符个数
  - *整数型*，*可选*，需要生成的随机文本中的字符个数，默认 `6`
- 随机文本
  - *文本型*，返回生成的随机文本

#### 示例

```lua title="string.random"
rs = string.random("qwertyuiopasdfghjklzxcvbnm", 20)
rs = string.random("一二三四五六七八九十", 20)
```

### 🔤 文本比较 \(**string\.compare/string\.localized\_compare**\)

#### 声明

```lua
比较结果 = string.compare(文本1, 文本2[, 是否区分大小写])  -- 字典序比较
比较结果 = string.localized_compare(文本1, 文本2)        -- 以操作系统、语言环境设定的标准排序规则进行比较
```

#### 参数及返回值

- 文本1, 文本2
  - *文本型*，需要比较大小的两个文本
- 是否区分大小写
  - *布尔型*，*可选*，是否区分大小写，默认 `false`
- 比较结果
  - *整数型*，**文本1** 大于 **文本2** 返回 `1`，**文本1** 小于 **文本2** 返回 `-1`，文本相等返回 `0`

#### 说明

- `string.compare` 以字典序进行比较
- `string.localized_compare` 以操作系统、语言环境设定的标准排序规则进行比较

#### 示例

```lua title="string.compare"
assert(string.compare("test1.luaBB", "test2.luaAA") == -1)
assert(string.compare("test3.luaDD", "test2.luaGG") == 1)
assert(string.compare("1.2-2", "1.2-10") == 1)
assert(string.compare("AaBbCcDd", "AAbbCCdd", true) == 0)
assert(string.compare("AaBbCcDd", "AAbbCCdd", false) == 1)
assert(string.compare("test.lua", "test.lua") == 0)
assert(string.compare("", "") == 0)
```

### 🔤 比较两个版本号大小 \(**string\.compare\_version**\)

#### 声明

```lua
比较结果 = string.compare_version(版本号1, 版本号2)
```

#### 参数及返回值

- 版本号1, 版本号2
  - *文本型*，需要比较大小的两个版本号
- 比较结果
  - *整数型*，**版本号1** 大于 **版本号2** 返回 `1`，**版本号1** 小于 **版本号2** 返回 `-1`，版本号相等返回 `0`

#### 说明

比较两个版本号字符串大小，遵守如下比较规则：

- 使用点 `.` 或减号 `-` 或空格隔开的纯数字值
- 不同分隔符效果相等，多个分隔符连在一起被认为是一个分隔符
- 权值随分段从左至右逐步降低
- 遇到任何非法字符将截断不对比后面的内容
- 如果段数不等，则不够段数用 `0` 补齐对比
- 空字符串或非法串会被认为版本号是 `"0"`

:::note

- `'1.1'` 与 `'1.1.0'` 是相等的两个版本号
- `'1.1'` 与 `'1.1-0'` 是相等的两个版本号
- `'1.1'` 与 `'1-1'` 是相等的两个版本号
- `'1.0'` 与 `'1 0'` 是相等的两个版本号
- `'1.0'` 大于 `'0.99999'`

:::

#### 示例

```lua title="string.compare_version"
assert(string.compare_version("", "") == 0)
assert(string.compare_version("1", "") == 1)
assert(string.compare_version("", "1") == -1)
assert(string.compare_version("1", "1") == 0)
assert(string.compare_version("1.0", "1") == 0)
assert(string.compare_version("1", "1.0") == 0)
assert(string.compare_version("1.", "1") == 0)
assert(string.compare_version("1", "1.") == 0)
assert(string.compare_version("1.", "1.0") == 0)
assert(string.compare_version("1.0", "1.") == 0)
assert(string.compare_version("1.0", "1.0") == 0)
assert(string.compare_version("1.0.0", "1.0.0") == 0)
assert(string.compare_version("1.1", "1.0") == 1)
assert(string.compare_version("1.0", "1.1") == -1)
assert(string.compare_version("1.1", "1.10") == -1)
assert(string.compare_version("1.2", "1.11") == -1)
assert(string.compare_version("1.1", "1.1.1") == -1)
assert(string.compare_version("1.2", "1.1.1") == 1)
assert(string.compare_version("1.0", "0.99999") == 1)
assert(string.compare_version("1.10.1", "1.10") == 1)
assert(string.compare_version("1.2-4", "1.2-3") == 1)
assert(string.compare_version("1.2-3", "1.2.3") == 0)
assert(string.compare_version("1.2-4", "1.2.3.0") == 1)
assert(string.compare_version("1.2-4", "1.2.3.10") == 1)
assert(string.compare_version("1.2-4", "1.2.30.10") == -1)
assert(string.compare_version("1.2-3", "1.2.4") == -1)
assert(string.compare_version("2.2", "1.2") == 1)
assert(string.compare_version("2.2", "10.2") == -1)
assert(string.compare_version("2..2", "2.2") == 0)
assert(string.compare_version("2.2.x.3", "2.2") == 0)
assert(string.compare_version("x", "") == 0)
```

### 🔤 URL 编码 \(**string\.encode\_uri/string\.encode\_uri\_component**\)

#### 声明

```lua
编码结果文本 = string.encode_uri(待编码文本)            -- 编码整个 URL/URI
编码结果文本 = string.encode_uri_component(待编码文本)  -- 编码 URL/URI 的参数等组成部分
```

#### 参数及返回值

- 待编码文本 *文本型*
- 编码结果文本 *文本型*

#### 说明

将 URL/URI 中的部分字符编码为 `%` 修饰的文本。

- `string.encode_uri` 所编码的字符范围包括
  - `;,/?:@&=+$#` 保留字符 Reversed Characters
  - `-_.!~*'()` 未保留标记字符 Unreserved Marks
- `string.encode_uri_component` 所编码的字符范围包括
  - `-_.!~*'()` 未保留标记字符 Unreserved Marks

### 🔤 URL 解码 \(**string\.decode\_uri**\)

#### 声明

```lua
解码后的文本 = string.decode_uri(待解码文本)
```

#### 参数及返回值

- 待解码文本 *文本型*
- 解码后的文本 *文本型*

#### 说明

移除 `%` 修饰的文本并转回其编码前的文本。

:::note

- 此函数是 [`string.encode_uri`](#-url-编码-stringencode_uristringencode_uri_component) 和 [`string.encode_uri_component`](#-url-编码-stringencode_uristringencode_uri_component) 的逆函数。
- 此函数是 `string.decode_uri_component` 的别名，二者功能完全一致。

:::

### 🔤 半角转全角 \(**string\.to\_fullwidth**\)

#### 声明

```lua
全角文本 = string.to_fullwidth(半角文本)
```

#### 参数及返回值

- 半角文本 *文本型*
- 全角文本 *文本型*

#### 说明

将半角文本转换为全角文本，如：`"a"` 转换为 `"ａ"`，`"1"` 转换为 `"１"` 等。

:::note
此函数为 [`string.to_halfwidth`](#-全角转半角-stringto_halfwidth) 的逆函数。
:::

#### 示例

```lua title="string.to_fullwidth"
assert(string.to_fullwidth(",.?123abc") == "，．？１２３ａｂｃ")
assert(string.to_fullwidth(",.?123abc汉字") == "，．？１２３ａｂｃ汉字")
assert(string.to_fullwidth("") == "")
```

### 🔤 全角转半角 \(**string\.to\_halfwidth**\)

#### 声明

```lua
半角文本 = string.to_halfwidth(全角文本)
```

#### 参数及返回值

- 全角文本 *文本型*
- 半角文本 *文本型*

#### 说明

将全角文本转换为半角文本。如：`"ａ"` 转换为 `"a"`，`"１"` 转换为 `"1"` 等。

:::note
此函数为 [`string.to_fullwidth`](#-半角转全角-stringto_fullwidth) 的逆函数。
:::

#### 示例

```lua title="string.to_halfwidth"
assert(string.to_halfwidth("，．？１２３ａｂｃ") == ",.?123abc")
assert(string.to_halfwidth("，．？１２３ａｂｃ汉字") == ",.?123abc汉字")
assert(string.to_halfwidth("") == "")
```

### 🔤 首字母大写 \(**string\.to\_capitalized**\)

#### 声明

```lua
首字母大写的文本 = string.to_capitalized(文本)
```

#### 参数及返回值

- 文本 *文本型*
- 首字母大写的文本 *文本型*

#### 说明

将文本的首字母转换为大写，其余字母保留原样。如：`"hello"` 转换为 `"Hello"`，`"HELLO"` 转换为 `"HELLO"`，`"123"` 转换为 `"123"` 等。

#### 示例

```lua title="string.to_capitalized"
assert(string.to_capitalized("good night my baby boy") == "Good Night My Baby Boy")
assert(string.to_capitalized("Do you like 中文 2333?") == "Do You Like 中文 2333?")
assert(string.to_capitalized("") == "")
```

### 🔤 转拼音文本 \(**string\.to\_pinyin**\)

#### 声明

```lua
拼音文本 = string.to_pinyin(文本, [是否移除声调])
```

#### 参数及返回值

- 文本 *文本型*
- 是否移除声调 *布尔型*
- 拼音文本 *文本型*

#### 说明

将文本转换为拼音文本。如：`你好` 转换为 `"nǐ hǎo"`。  
如果 `是否移除声调` 为 `true`，则移除声调。如：`你好` 转换为 `"ni hao"`。

#### 示例

```lua title="string.to_pinyin"
assert(string.to_pinyin("你好, zhe shi 中文！") == "nǐ hǎo, zhe shi zhōng wén！")
assert(string.to_pinyin("你好, zhe shi 中文！", true) == "ni hao, zhe shi zhong wen！")
assert(string.to_pinyin("") == "")
```

### 🔤 是否为数值形式 \(**string\.is\_number**\)

#### 声明

```lua
判断结果 = string.is_number(文本)
```

#### 参数及返回值

- 文本 *文本型*
- 判断结果 *布尔型*

#### 说明

判断文本是否为数值形式，如：`"123"`、`"123.456"`、`"1.2e3"` 等。

:::note
[`string.is_numeric`](#-是否为大小写字母或数字-stringis_letterupperlowernumericalphanumeric) 只判断文本是否仅由数字 0 ~ 9 组成，而此函数 `string.is_number` 则判断文本是否为数值形式。
:::

#### 示例

```lua title="string.is_number"
assert(string.is_number('1234567890'))
assert(string.is_number('12345678.90'))
assert(string.is_number('1.2e3'))
assert(string.is_number('') == false)
assert(string.is_number('123abc') == false)
assert(string.is_number('123abc7890') == false)
```

### 🔤 是否为整数形式 \(**string\.is\_integer**\)

#### 声明

```lua
判断结果 = string.is_integer(文本)
```

#### 参数及返回值

- 文本 *文本型*
- 判断结果 *布尔型*

#### 说明

判断文本是否为整数形式，如：`"123"`、`"-123"` 等。

:::note
[`string.is_numeric`](#-是否为大小写字母或数字-stringis_letterupperlowernumericalphanumeric) 只判断文本是否仅由数字 0 ~ 9 组成，而此函数 `string.is_integer` 则判断文本是否为整数形式。
:::

#### 示例

```lua title="string.is_integer"
assert(string.is_integer('1234567890'))
assert(string.is_integer('-1234567890'))
assert(string.is_integer('') == false)
assert(string.is_integer('123abc') == false)
assert(string.is_integer('123abc7890') == false)
```

### 🔤 是否为电子邮箱地址 \(**string\.is\_email**\)

#### 声明

```lua
判断结果 = string.is_email(文本)
```

#### 参数及返回值

- 文本 *文本型*
- 判断结果 *布尔型*

#### 说明

以正则表达式 `"[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}"` 判断文本是否为电子邮箱地址。  
空文本返回 `false`。

#### 示例

```lua title="string.is_email"
assert(string.is_email('123abc7890') == false)
assert(string.is_email('') == false)
assert(string.is_email('http://www.baidu.com') == false)
assert(string.is_email('bug@xxtou.ch'))
assert(string.is_email('i.82@me.com'))
assert(string.is_email('darwindev@mail.me.com'))
```

### 🔤 是否为链接地址 \(**string\.is\_link**\)

#### 声明

```lua
判断结果 = string.is_link(文本)
```

#### 参数及返回值

- 文本 *文本型*
- 判断结果 *布尔型*

#### 说明

以正则表达式 `"https?://[%w%.%-/:]+"` 判断文本是否为链接地址。  
空文本返回 `false`。

#### 示例

```lua title="string.is_link"
assert(string.is_link('123abc7890') == false)
assert(string.is_link('') == false)
assert(string.is_link('http://www.baidu.com'))
assert(string.is_link('bug@xxtou.ch') == false)
assert(string.is_link('http://iphonedevwiki.net/index.php/Preferences_specifier_plist#PSEditTextCell_.26_PSSecureEditTextCell'))
assert(string.is_link('https://www.baidu.com/link?url=x_ZHKOUxi0VTwAXF4CFR8t2zW2qtph1p6SM1LsAgjcRyHFXnCQaCnYqmstyTWpBhRzs_00TZLwVrju24jGMEG_&wd=&eqid=8a23ea0b0003da8f000000045b1bae78'))
assert(string.is_link('https://82flex.com/2018/04/12/difference-between-UTF8String-and-fileSystemRepresentation.html'))
```

### 🔤 是否为大小写字母或数字 \(**string\.is\_letter,upper,lower,numeric,alphanumeric**\)

#### 声明

```lua
判断结果 = string.is_letter(文本)        -- 是否全为字母
判断结果 = string.is_upper(文本)         -- 是否全为大写字母
判断结果 = string.is_lower(文本)         -- 是否全为小写字母
判断结果 = string.is_numeric(文本)       -- 是否全为数字
判断结果 = string.is_alphanumeric(文本)  -- 是否全为字母或数字
```

#### 参数及返回值

- 文本 *文本型*
- 判断结果 *布尔型*

#### 说明

判断文本是否仅包含大小写字母 `[A-Za-z]` 或数字 `[0-9]`，或两者的组合。  
空文本返回 `false`。

#### 示例

```lua title="string.is_letter"
assert(string.is_letter('abcDEFGHijk'))
assert(string.is_letter('') == false)
assert(string.is_letter('123aBc') == false)
assert(string.is_letter('123aBc7890') == false)
```

```lua title="string.is_upper"
assert(string.is_upper('ABCDEFGHIJK'))
assert(string.is_upper('') == false)
assert(string.is_upper('abcdefghijk') == false)
assert(string.is_upper('123ABC') == false)
assert(string.is_upper('123abc7890') == false)
```

```lua title="string.is_lower"
assert(string.is_lower('ABCDEFGHIJK') == false)
assert(string.is_lower('') == false)
assert(string.is_lower('abcdefghijk'))
assert(string.is_lower('123ABC') == false)
assert(string.is_lower('123abc7890') == false)
```

```lua title="string.is_numeric"
assert(string.is_numeric('1234567890'))
assert(string.is_numeric('12345.67890') == false)
assert(string.is_numeric('') == false)
assert(string.is_numeric('123abc') == false)
assert(string.is_numeric('123abc7890') == false)
```

### 🔤 是否为中文 \(**string\.is\_chinese**\)

#### 声明

```lua
判断结果 = string.is_chinese(文本)
```

#### 参数及返回值

- 文本 *文本型*
- 判断结果 *布尔型*

#### 说明

判断 UTF-8 文本 **首字** 是否为中文。  
空文本返回 `false`。

#### 示例

```lua title="string.is_chinese"
assert(string.is_chinese("是汉字吗"))
assert(string.is_chinese("是 Chinese Character 吗"))
assert(string.is_chinese("is 汉字吗") == false)
assert(string.is_chinese("Chinese Character") == false)
assert(string.is_chinese("") == false)
```
