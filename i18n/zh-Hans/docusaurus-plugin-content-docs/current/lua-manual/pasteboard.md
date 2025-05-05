---
sidebar_position: 9
---

# 剪贴板模块

## 剪贴板模块 - pasteboard

### 获取剪贴板中的数据 \(**pasteboard\.read**\)

#### 声明

```lua
数据 = pasteboard.read([ 通用类型标识 ])
```

#### 参数及返回值

- 通用类型标识
  - *文本型*，*可选*，[Uniform Type Identifiers](https://developer.apple.com/library/ios/documentation/Miscellaneous/Reference/UTIRef/Articles/System-DeclaredUniformTypeIdentifiers.html)，默认为 `"public.utf8-plain-text"`
- 数据
  - *字符串型*，从通用剪贴板中读取到的内容。如果无法以 **通用类型标识** 类型读取，则返回 `nil`

#### 示例

```lua title="pasteboard.read"
sys.alert("剪贴板中的内容："..pasteboard.read())
--
sys.alert("剪贴板中的内容："..pasteboard.read('public.text'))  -- 富文本也强行以文本方式读取剪贴板
```

### 写内容进剪贴板 \(**pasteboard\.write**\)

#### 声明

```lua
pasteboard.write(数据[, 通用类型标识])
```

#### 参数及返回值

- 数据
  - *字符串型*，需要写入到通用剪贴板的内容
- 通用类型标识
  - *文本型*，*可选*，[Uniform Type Identifiers](https://developer.apple.com/library/ios/documentation/Miscellaneous/Reference/UTIRef/Articles/System-DeclaredUniformTypeIdentifiers.html)，默认为 `"public.utf8-plain-text"`

#### 示例

```lua title="pasteboard.write"
pasteboard.write("演示啊")  -- 将 “演示啊”（不含引号）写入到剪贴板中
--
pasteboard.write(screen.image():png_data(), 'public.png')  -- 将当前屏幕截图写入到剪贴板
```
