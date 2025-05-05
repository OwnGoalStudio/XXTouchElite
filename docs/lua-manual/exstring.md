---
sidebar_position: 11
---

# Extended String Module

## Extended String Module - string

Functions marked with 🔤 process the input `string` type as UTF-8 *text*.

### Convert to Hexadecimal Text \(**string\.to\_hex**\)

#### Declaration

```lua
hexadecimal_text = string.to_hex(data_content)
```

#### Parameters and Return Values

- data_content *string*
- hexadecimal_text *text*

#### Description

Converts **data_content** into printable **hexadecimal text**.

#### Example 1

```lua title="string.to_hex"
sys.alert(string.to_hex('some data'))
-- Output: "e4b880e4ba9be695b0e68dae"
```

#### Example 2

```lua title="string.to_hex"
sys.alert((string.to_hex('some data'):gsub('(..)', '\\x%1')))
-- Output: "\xe4\xb8\x80\xe4\xba\x9b\xe6\x95\xb0\xe6\x8d\xae"
```

### Convert Hexadecimal Text Back \(**string\.from\_hex**\)

#### Declaration

```lua
data_content = string.from_hex(hexadecimal_text)
```

#### Parameters and Return Values

- hexadecimal_text *text*
- data_content
  - *string*, returns `nil` if the input parameter is not hexadecimal text.

#### Description

The inverse function of [`string.to_hex`](#convert-to-hexadecimal-text-stringto_hex), converts printable **hexadecimal text** back to **data_content**.

#### Example

```lua title="string.from_hex"
sys.alert(string.from_hex('e4b880e4ba9be695b0e68dae'))
-- Output: "some data"
```

### Convert GBK Encoded Text to UTF-8 Encoded Text \(**string\.from\_gbk**\)

#### Declaration

```lua
usable_text = string.from_gbk(gbk_encoded_string)
```

#### Parameters and Return Values

- gbk_encoded_string *string*
- usable_text
  - *text*, returns UTF-8 encoded text. If encoding errors prevent conversion, returns `nil`.

#### Description

Converts GBK/GB2312 encoded text to UTF-8 encoded text.

:::caution
Conversion returning garbled text may be due to incorrect encoding, but the function is not at fault if the conversion completes.
:::

#### Example

```lua title="string.from_gbk"
-- Chinese encoding Chinese standard encoding National standard extended encoding GB2312
gbkstr = '\x58\x58\x54\x6f\x75\x63\x68\x20\xba\xdc\xc7\xbf'
--
sys.alert(gbkstr)                  -- GBK encoded string cannot be displayed
sys.alert(string.from_gbk(gbkstr)) -- Output: "XXTouch is strong"
```

### Calculate String Hash Value \(**string\.md5,sha1,sha256,sha512**\)

#### Declaration

```lua
hash_value = string.md5(data_content)     -- Calculate MD5
hash_value = string.sha1(data_content)    -- Calculate SHA-1
hash_value = string.sha256(data_content)  -- Calculate SHA-256
hash_value = string.sha512(data_content)  -- Calculate SHA-512
```

#### Parameters and Return Values

- data_content *string*
- hash_value
  - *text*, returns the hexadecimal text of the specified type hash value of **data_content**

#### Example

```lua title="string.md5"
sys.alert(string.md5('XXTouch is awesome'))   -- Output: "4921dbf380df452fa959dc47cef30e4b"
```

```lua title="string.sha1"
sys.alert(string.sha1('XXTouch is awesome'))  -- Output: "a959c48d904c1075c7ddfdb1fda49effb2142493"
```

```lua title="string.hash"
local str = "sozereal"
sys.alert('The hexadecimal encoding of "'..str..'" is: <'..str:to_hex()..'>')
sys.alert('The plaintext of <'..str:to_hex()..'> is: "'..str:to_hex():from_hex()..'"')
sys.alert('The MD5 value of "'..str..'" is: '..str:md5())
sys.alert('The SHA1 value of "'..str..'" is: '..str:sha1())
local binstr = "\0\1\2\3\4\5"
sys.alert('The MD5 value of <'..binstr:to_hex()..'> is: '..binstr:md5())
sys.alert('The SHA1 value of <'..binstr:to_hex()..'> is: '..binstr:sha1())
```

### Base64 Encode and Decode Strings \(**string\.base64\_encode,decode**\)

#### Declaration

```lua
b64_text = string.base64_encode(data_content)  -- Encode
data_content = string.base64_decode(b64_text)  -- Decode
```

#### Parameters and Return Values

- data_content *string*
- b64_text
  - *text*, the base64 encoded text of **data_content**

#### Example

```lua title="string.base64_encode"
-- Base64 encode the png format data of a screen area
b64s = screen.image(0, 0, 100, 100):png_data():base64_encode()

-- Read file data and base64 encode it
b64s = file.reads('/var/mobile/1.png'):base64_encode()
```

### Encrypt and Decrypt Strings \(**string\.aes128\_encrypt,decrypt**\)

#### Declaration

```lua
encrypted_data = string.aes128_encrypt(data_content, key)  -- Encrypt
data_content = string.aes128_decrypt(encrypted_data, key)  -- Decrypt
```

#### Parameters and Return Values

- data_content *string*
- key *string*
- encrypted_data *string*

#### Description

- `string.aes128_encrypt` uses the AES128 algorithm in ECB mode to encrypt the original **data_content** into **encrypted_data**.
- `string.aes128_decrypt` uses the AES128 algorithm in ECB mode to decrypt **encrypted_data** back to the original **data_content**.

:::note
The AES128 algorithm in ECB mode does not have an iv (initialization vector) parameter. If it is required in development, it should be `0`.
:::

#### Example

```lua title="string.crypto"
local msg = "\5\4\3\2\1\0"
local key = "sozereal"
local emsg = msg:aes128_encrypt(key)
local emsgb64 = emsg:base64_encode()
sys.alert('Binary data <'..msg:to_hex()..'> \n Encrypted using AES128 algorithm with key "'..key..'" is: <'..emsg:to_hex()..'> \n Base64 string is "'..emsgb64..'"')
local tmp = emsgb64:base64_decode()
msg = tmp:aes128_decrypt(key)
sys.alert('The data after base64 decoding "'..emsgb64..'" is <'..tmp:to_hex()..'> \n Decrypted using AES128 algorithm with key "'..key..'" is: <'..msg:to_hex()..'>')
```

### 🔤 Split a Text Using a Delimiter \(**string\.split**\)

#### Declaration

```lua
split_text_array = string.split(text_to_split, delimiter[, max_return_count])
```

#### Parameters and Return Values

- text_to_split *text*
- delimiter *text*
- max_return_count
  - *integer*, *optional*, split results exceeding this count will be **discarded**
- split_text_array
  - *list of texts*, the split text fragments are arranged in order in this table

#### Example 1

```lua title="string.split"
t = string.split('lfue6841214----123456', '----')
sys.alert('Account is: '..t[1])
```

#### Example 2

```lua title="string.split"
t = string.split('Hello, the verification code is #4937#, valid for 15 minutes. [Explosive Technology]', '#')
sys.alert('Verification code is: '..t[2])
```

#### Example 3

```lua title="string.split"
t = string.split('Hello, the verification code is 4937, valid for 15 minutes. [Explosive Technology]', 'Verification code is')
t = string.split(t[2], ', valid for 15 minutes')
sys.alert('Verification code is: '..t[1])
```

#### Example 4

```lua title="string.split"
assert(#string.split(multi_line, "\n") == 8)
assert(#string.split(multi_line, "hello") == 9)
assert(#string.split(multi_line, "\n", 4) == 4)
assert(string.split(multi_line, "HELLO", 4)[1] == multi_line)
assert(string.split(multi_line, "\n", 1)[1] == "hello001")
assert(string.split("", "\n")[1] == "")
```

#### Encapsulation Example 1

```lua title="string.split"
-- Encapsulation to get the middle part of the text (returns nil if no match is found)
function str_middle(str, sep1, sep2)
  assert(type(str) == 'string', '`str_middle` parameter #1 must be a string')
  assert(type(sep1) == 'string', '`str_middle` parameter #2 must be a string')
  assert(type(sep2) == 'nil' or type(sep2) == 'string', '`str_middle` parameter #3 is optional but must be a string')
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
-- The above encapsulation can be copied to the script for use
--
r = str_middle('Hello, the verification code is 4937, valid for 15 minutes. [Explosive Technology]', 'code is', ', valid for 15 minutes')
sys.alert('Verification code is: '..r)
-- Output: "Verification code is: 4937"
--
r = str_middle('Hello, the verification code is #8346#, valid for 15 minutes. [Explosive Technology]', '#')
sys.alert('Verification code is: '..r)
-- Output: "Verification code is: 8346"
```

#### Encapsulation Example 2

```lua title="string.split"
-- Get the file name from the absolute path
function str_strip_dirname(path)
  local d = string.split(path, '/')
  return d[#d]
end
-- Get the directory from the absolute path
function str_strip_filename(path)
  local d = string.split(path, '/')
  d[#d] = nil
  return table.concat(d, '/')
end
-- Remove the extension (suffix) from the last part of the path
function str_strip_extension(path)
  local d = string.split(path, '/')
  local fnt = string.split(d[#d], '.')
  d[#d] = fnt[1]
  return table.concat(d, '/')
end
-- Get the extension (suffix) from the last part of the path
function str_get_extension(path)
  local d = string.split(path, '/')
  local fnt = string.split(d[#d], '.')
  table.remove(fnt, 1)
  return table.concat(fnt, '.')
end
--
sys.alert(str_strip_dirname("/private/var/mobile/Media/1ferver/lua/scripts/1.lua.xxt"))
-- Output: "1.lua.xxt"
sys.alert(str_strip_filename("/private/var/mobile/Media/1ferver/lua/scripts/1.lua.xxt"))
-- Output: "/private/var/mobile/Media/1ferver/lua/scripts"
sys.alert(str_strip_extension("/private/var/mobile/Media/1ferver/lua/scripts/1.lua.xxt"))
-- Output: "/private/var/mobile/Media/1ferver/lua/scripts/1"
sys.alert(str_get_extension("/private/var/mobile/Media/1ferver/lua/scripts/1.lua.xxt"))
-- Output: "lua.xxt"
sys.alert(str_strip_extension(str_strip_dirname("/private/var/mobile/Media/1ferver/lua/scripts/1.lua.xxt")))
-- Output: "1"
```

#### Related Example: Split Text Character by Character

```lua title="string.explode"
-- This is not an example using string.split
-- Explode mixed Chinese and English text into individual characters, only supports UTF-8 encoded text
function string.explode(text)
  local ret = {}
  for p, c in utf8.codes(text) do
    ret[#ret + 1] = utf8.char(c)
  end
  return ret
end
--
local t = string.explode('Hello, XXTouch')
sys.alert(table.concat(t, '/'))
-- Output: "H/e/l/l/o/,/ /X/X/T/o/u/c/h"
```

### 🔤 Remove Whitespace Characters from Text \(**string\.ltrim,rtrim,trim,atrim**\)

#### Declaration

```lua
processed_text = string.ltrim(original_text)  -- Remove whitespace characters from the left side of the text
processed_text = string.rtrim(original_text)  -- Remove whitespace characters from the right side of the text
processed_text = string.trim(original_text)   -- Remove whitespace characters from both sides of the text
processed_text = string.atrim(original_text)  -- Remove all whitespace characters from the text
```

#### Parameters and Return Values

- original_text *text*
- processed_text *text*

:::note
Whitespace characters include `"\r"` `"\n"` `"\t"` etc.
:::

#### Example

```lua title="string.trim"
assert(string.trim("  sp a ces  ") == "sp a ces")
assert(string.ltrim("  sp a ces  ") == "sp a ces  ")
assert(string.rtrim("  sp a ces  ") == "  sp a ces")
assert(string.atrim("  sp a ces  ") == "spaces")
```

```lua title="string.utils"
str = "  Haha,he he,1,3,6  "
new = str:split(",")    -- Split the string str by `,` and return a table
sys.alert(new[2])
sys.alert(str:rtrim())  -- Result: "  Haha,he he,1,3,6", remove whitespace characters from the end of the string
sys.alert(str:ltrim())  -- Result: "Haha,he he,1,3,6  ", remove whitespace characters from the beginning of the string
sys.alert(str:trim())   -- Result: "Haha,he he,1,3,6", remove whitespace characters from both ends of the string
sys.alert(str:atrim())  -- Result: "Haha,hehe,1,3,6", remove all whitespace characters from the string
```

### 🔤 Left and Right Padding \(**string\.lpad,rpad**\)

#### Declaration

```lua
processed_text = string.lpad(original_text, pad_length, [pad_text = " "])  -- Left padding
processed_text = string.rpad(original_text, pad_length, [pad_text = " "])  -- Right padding
```

#### Parameters and Return Values

- original_text *text*
- pad_length *integer*
- pad_text
  - *text*, *optional*, the text used to pad **original_text** to **pad_length**
- processed_text *text*

#### Description

- Repeatedly pad **original_text** with **pad_text** on the left or right until the text length reaches or exceeds **pad_length**.
- If the last padding exceeds **pad_length**, the **pad_text** used for padding will be truncated to make the final text length exactly equal to **pad_length**.
- If **pad_length** is less than **original_text**, nothing will happen. The length of **processed_text** is always greater than or equal to the length of **original_text**.

#### Example

```lua title="string.lpad"
assert(string.lpad("text_message", 16) == "    text_message")
assert(string.lpad("text_message", 8) == "text_message")
assert(string.lpad("text_message", 20, "0") == "00000000text_message")
assert(string.lpad("text_message", 20, "0ab") == "0ab0ab0atext_message")  -- Exceeds pad length, truncates pad text
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
assert(string.rpad("text_message", 20, "0ab") == "text_message0ab0ab0a")  -- Exceeds pad length, truncates pad text
assert(string.rpad("text", 6, "longmessage") == "textlo")

local _, err = pcall(function ()
  string.rpad("text_message", -7)
end)
assert(err)
```

### 🔤 Remove UTF8-BOM from Text \(**string\.strip\_utf8\_bom**\)

#### Declaration

```lua
processed_text = string.strip_utf8_bom(original_text)
```

#### Parameters and Return Values

- original_text *text*
- processed_text *text*

:::note
The UTF-8-BOM appears as three invisible characters `"\xEF\xBB\xBF"` at the beginning of the document.  
**BOM (Byte Order Mark)** is prepared for UTF-16 and UTF-32 to mark the byte order. Microsoft uses BOM in UTF-8 to clearly distinguish UTF-8 from ASCII and other encodings, but such files can cause problems on non-Windows operating systems.  
UTF-8 **does not need** BOM, although the Unicode standard allows BOM in UTF-8. Placing BOM in UTF-8 files is a Microsoft habit (calling little-endian UTF-16 with BOM "Unicode" without further explanation is also a Microsoft habit).
:::

#### Example

```lua title="string.strip_utf8_bom"
txt = "\xEF\xBB\xBFXXTouch"
sys.alert(txt..', '..#txt) -- Output: "XXTouch, 10"
--
txt = string.strip_utf8_bom(txt)
sys.alert(txt..', '..#txt) -- Output: "XXTouch, 7"
```

### 🔤 Generate Random Text \(**string\.random**\)

#### Declaration

```lua
random_text = string.random(character_pool[, character_count])
```

#### Parameters and Return Values

- character_pool
  - *text*, the dictionary for generating text
- character_count
  - *integer*, *optional*, the number of characters to generate in the random text, default is `6`
- random_text
  - *text*, returns the generated random text

#### Example

```lua title="string.random"
rs = string.random("qwertyuiopasdfghjklzxcvbnm", 20)
rs = string.random("一二三四五六七八九十", 20)
```

### 🔤 Text Comparison \(**string\.compare/string\.localized\_compare**\)

#### Declaration

```lua
comparison_result = string.compare(text1, text2[, case_sensitive])  -- Dictionary order comparison
comparison_result = string.localized_compare(text1, text2)        -- Comparison based on the standard sorting rules set by the operating system and locale
```

#### Parameters and Return Values

- text1, text2
  - *text*, the two texts to compare
- case_sensitive
  - *boolean*, *optional*, whether to distinguish between uppercase and lowercase, default is `false`
- comparison_result
  - *integer*, **text1** greater than **text2** returns `1`, **text1** less than **text2** returns `-1`, texts are equal returns `0`

#### Description

- `string.compare` compares in dictionary order
- `string.localized_compare` compares based on the standard sorting rules set by the operating system and locale

#### Example

```lua title="string.compare"
assert(string.compare("test1.luaBB", "test2.luaAA") == -1)
assert(string.compare("test3.luaDD", "test2.luaGG") == 1)
assert(string.compare("1.2-2", "1.2-10") == 1)
assert(string.compare("AaBbCcDd", "AAbbCCdd", true) == 0)
assert(string.compare("AaBbCcDd", "AAbbCCdd", false) == 1)
assert(string.compare("test.lua", "test.lua") == 0)
assert(string.compare("", "") == 0)
```

### 🔤 Compare Two Version Numbers \(**string\.compare\_version**\)

#### Declaration

```lua
comparison_result = string.compare_version(version1, version2)
```

#### Parameters and Return Values

- version1, version2
  - *text*, the two version numbers to compare
- comparison_result
  - *integer*, **version1** greater than **version2** returns `1`, **version1** less than **version2** returns `-1`, version numbers are equal returns `0`

#### Description

Compares the size of two version number strings, following the comparison rules below:

- Pure numeric values separated by dots `.` or hyphens `-` or spaces
- Different separators have the same effect, multiple separators together are considered as one separator
- The weight decreases gradually from left to right
- Any illegal characters encountered will truncate and not compare the following content
- If the number of segments is not equal, the missing segments are compared with `0`
- Empty strings or illegal strings are considered as version number `"0"`

:::note

- `'1.1'` and `'1.1.0'` are equal version numbers
- `'1.1'` and `'1.1-0'` are equal version numbers
- `'1.1'` and `'1-1'` are equal version numbers
- `'1.0'` and `'1 0'` are equal version numbers
- `'1.0'` is greater than `'0.99999'`

:::

#### Example

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

### 🔤 URL Encoding \(**string\.encode\_uri/string\.encode\_uri\_component**\)

#### Declaration

```lua
encoded_text = string.encode_uri(text_to_encode)            -- Encode the entire URL/URI
encoded_text = string.encode_uri_component(text_to_encode)  -- Encode the components of the URL/URI
```

#### Parameters and Return Values

- text_to_encode *text*
- encoded_text *text*

#### Description

Encodes certain characters in the URL/URI as `%` prefixed text.

- `string.encode_uri` encodes the character range including
  - `;,/?:@&=+$#` Reserved Characters
  - `-_.!~*'()` Unreserved Marks
- `string.encode_uri_component` encodes the character range including
  - `-_.!~*'()` Unreserved Marks

### 🔤 URL Decoding \(**string\.decode\_uri**\)

#### Declaration

```lua
decoded_text = string.decode_uri(text_to_decode)
```

#### Parameters and Return Values

- text_to_decode *text*
- decoded_text *text*

#### Description

Removes `%` prefixed text and converts it back to its pre-encoded text.

:::note

- This function is the inverse of [`string.encode_uri`](#-url-encoding-stringencode_uristringencode_uri_component) and [`string.encode_uri_component`](#-url-encoding-stringencode_uristringencode_uri_component).
- This function is an alias for `string.decode_uri_component`, both have the same functionality.

:::

### 🔤 Convert Halfwidth to Fullwidth \(**string\.to\_fullwidth**\)

#### Declaration

```lua
fullwidth_text = string.to_fullwidth(halfwidth_text)
```

#### Parameters and Return Values

- halfwidth_text *text*
- fullwidth_text *text*

#### Description

Converts halfwidth text to fullwidth text, e.g., `"a"` to `"ａ"`, `"1"` to `"１"`, etc.

:::note
This function is the inverse of [`string.to_halfwidth`](#-convert-fullwidth-to-halfwidth-stringto_halfwidth).
:::

#### Example

```lua title="string.to_fullwidth"
assert(string.to_fullwidth(",.?123abc") == "，．？１２３ａｂｃ")
assert(string.to_fullwidth(",.?123abc汉字") == "，．？１２３ａｂｃ汉字")
assert(string.to_fullwidth("") == "")
```

### 🔤 Convert Fullwidth to Halfwidth \(**string\.to\_halfwidth**\)

#### Declaration

```lua
halfwidth_text = string.to_halfwidth(fullwidth_text)
```

#### Parameters and Return Values

- fullwidth_text *text*
- halfwidth_text *text*

#### Description

Converts fullwidth text to halfwidth text, e.g., `"ａ"` to `"a"`, `"１"` to `"1"`, etc.

:::note
This function is the inverse of [`string.to_fullwidth`](#-convert-halfwidth-to-fullwidth-stringto_fullwidth).
:::

#### Example

```lua title="string.to_halfwidth"
assert(string.to_halfwidth("，．？１２３ａｂｃ") == ",.?123abc")
assert(string.to_halfwidth("，．？１２３ａｂｃ汉字") == ",.?123abc汉字")
assert(string.to_halfwidth("") == "")
```

### 🔤 Capitalize First Letter \(**string\.to\_capitalized**\)

#### Declaration

```lua
capitalized_text = string.to_capitalized(text)
```

#### Parameters and Return Values

- text *text*
- capitalized_text *text*

#### Description

Converts the first letter of the text to uppercase, while keeping the rest of the letters unchanged. For example, `"hello"` becomes `"Hello"`, `"HELLO"` remains `"HELLO"`, `"123"` remains `"123"`, etc.

#### Example

```lua title="string.to_capitalized"
assert(string.to_capitalized("good night my baby boy") == "Good Night My Baby Boy")
assert(string.to_capitalized("Do you like 中文 2333?") == "Do You Like 中文 2333?")
assert(string.to_capitalized("") == "")
```

### 🔤 Convert to Pinyin Text \(**string\.to\_pinyin**\)

#### Declaration

```lua
pinyin_text = string.to_pinyin(text, [remove_tone])
```

#### Parameters and Return Values

- text *text*
- remove_tone *boolean*
- pinyin_text *text*

#### Description

Converts text to pinyin text. For example, `你好` becomes `"nǐ hǎo"`.  
If `remove_tone` is `true`, the tone is removed. For example, `你好` becomes `"ni hao"`.

#### Example

```lua title="string.to_pinyin"
assert(string.to_pinyin("你好, zhe shi 中文！") == "nǐ hǎo, zhe shi zhōng wén！")
assert(string.to_pinyin("你好, zhe shi 中文！", true) == "ni hao, zhe shi zhong wen！")
assert(string.to_pinyin("") == "")
```

### 🔤 Is Numeric Form \(**string\.is\_number**\)

#### Declaration

```lua
result = string.is_number(text)
```

#### Parameters and Return Values

- text *text*
- result *boolean*

#### Description

Determines whether the text is in numeric form, such as `"123"`, `"123.456"`, `"1.2e3"`, etc.

:::note
[`string.is_numeric`](#-is-alphabetic-or-numeric-stringis_letterupperlowernumericalphanumeric) only determines whether the text consists solely of digits 0 ~ 9, while this function `string.is_number` determines whether the text is in numeric form.
:::

#### Example

```lua title="string.is_number"
assert(string.is_number('1234567890'))
assert(string.is_number('12345678.90'))
assert(string.is_number('1.2e3'))
assert(string.is_number('') == false)
assert(string.is_number('123abc') == false)
assert(string.is_number('123abc7890') == false)
```

### 🔤 Is Integer Form \(**string\.is\_integer**\)

#### Declaration

```lua
result = string.is_integer(text)
```

#### Parameters and Return Values

- text *text*
- result *boolean*

#### Description

Determines whether the text is in integer form, such as `"123"`, `"-123"`, etc.

:::note
[`string.is_numeric`](#-is-alphabetic-or-numeric-stringis_letterupperlowernumericalphanumeric) only determines whether the text consists solely of digits 0 ~ 9, while this function `string.is_integer` determines whether the text is in integer form.
:::

#### Example

```lua title="string.is_integer"
assert(string.is_integer('1234567890'))
assert(string.is_integer('-1234567890'))
assert(string.is_integer('') == false)
assert(string.is_integer('123abc') == false)
assert(string.is_integer('123abc7890') == false)
```

### 🔤 Is Email Address \(**string\.is\_email**\)

#### Declaration

```lua
result = string.is_email(text)
```

#### Parameters and Return Values

- text *text*
- result *boolean*

#### Description

Determines whether the text is an email address using the regular expression `"[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}"`.  
Empty text returns `false`.

#### Example

```lua title="string.is_email"
assert(string.is_email('123abc7890') == false)
assert(string.is_email('') == false)
assert(string.is_email('http://www.baidu.com') == false)
assert(string.is_email('bug@xxtou.ch'))
assert(string.is_email('i.82@me.com'))
assert(string.is_email('darwindev@mail.me.com'))
```

### 🔤 Is Link Address \(**string\.is\_link**\)

#### Declaration

```lua
result = string.is_link(text)
```

#### Parameters and Return Values

- text *text*
- result *boolean*

#### Description

Determines whether the text is a link address using the regular expression `"https?://[%w%.%-/:]+"`.  
Empty text returns `false`.

#### Example

```lua title="string.is_link"
assert(string.is_link('123abc7890') == false)
assert(string.is_link('') == false)
assert(string.is_link('http://www.baidu.com'))
assert(string.is_link('bug@xxtou.ch') == false)
assert(string.is_link('http://iphonedevwiki.net/index.php/Preferences_specifier_plist#PSEditTextCell_.26_PSSecureEditTextCell'))
assert(string.is_link('https://www.baidu.com/link?url=x_ZHKOUxi0VTwAXF4CFR8t2zW2qtph1p6SM1LsAgjcRyHFXnCQaCnYqmstyTWpBhRzs_00TZLwVrju24jGMEG_&wd=&eqid=8a23ea0b0003da8f000000045b1bae78'))
assert(string.is_link('https://82flex.com/2018/04/12/difference-between-UTF8String-and-fileSystemRepresentation.html'))
```

### 🔤 Is Alphabetic or Numeric \(**string\.is\_letter,upper,lower,numeric,alphanumeric**\)

#### Declaration

```lua
result = string.is_letter(text)        -- Is it all letters
result = string.is_upper(text)         -- Is it all uppercase letters
result = string.is_lower(text)         -- Is it all lowercase letters
result = string.is_numeric(text)       -- Is it all digits
result = string.is_alphanumeric(text)  -- Is it all letters or digits
```

#### Parameters and Return Values

- text *text*
- result *boolean*

#### Description

Determines whether the text contains only uppercase and lowercase letters `[A-Za-z]` or digits `[0-9]`, or a combination of both.  
Empty text returns `false`.

#### Example

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

### 🔤 Is Chinese \(**string\.is\_chinese**\)

#### Declaration

```lua
result = string.is_chinese(text)
```

#### Parameters and Return Values

- text *text*
- result *boolean*

#### Description

Determines whether the first character of the UTF-8 text is Chinese.  
Empty text returns `false`.

#### Example

```lua title="string.is_chinese"
assert(string.is_chinese("是汉字吗"))
assert(string.is_chinese("是 Chinese Character 吗"))
assert(string.is_chinese("is 汉字吗") == false)
assert(string.is_chinese("Chinese Character") == false)
assert(string.is_chinese("") == false)
```
