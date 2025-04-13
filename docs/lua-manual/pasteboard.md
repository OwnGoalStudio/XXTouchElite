---
sidebar_position: 9
---

# Clipboard Module

## Clipboard Module - pasteboard

### Get Data from Clipboard \(**pasteboard\.read**\)

#### Declaration

```lua
content = pasteboard.read([ uniform_type_identifier ])
```

#### Parameters and Return Values

- uniform_type_identifier
  - *string*, *optional*, [Uniform Type Identifiers](https://developer.apple.com/library/ios/documentation/Miscellaneous/Reference/UTIRef/Articles/System-DeclaredUniformTypeIdentifiers.html), default is `"public.utf8-plain-text"`
- content
  - *string*, the content read from the universal clipboard. If it cannot be read as the **uniform_type_identifier** type, it returns `nil`.

#### Example

```lua title="pasteboard.read"
sys.alert("Content in clipboard: "..pasteboard.read())
--
sys.alert("Content in clipboard: "..pasteboard.read('public.text'))  -- Forcefully read rich text as plain text from the clipboard
```

### Write Content to Clipboard \(**pasteboard\.write**\)

#### Declaration

```lua
pasteboard.write(content[, uniform_type_identifier])
```

#### Parameters and Return Values

- content
  - *string*, the content to be written to the universal clipboard
- uniform_type_identifier
  - *string*, *optional*, [Uniform Type Identifiers](https://developer.apple.com/library/ios/documentation/Miscellaneous/Reference/UTIRef/Articles/System-DeclaredUniformTypeIdentifiers.html), default is `"public.utf8-plain-text"`

#### Example

```lua title="pasteboard.write"
pasteboard.write("Demo")  -- Write "Demo" (without quotes) to the clipboard
--
pasteboard.write(screen.image():png_data(), 'public.png')  -- Write the current screen screenshot to the clipboard
```
