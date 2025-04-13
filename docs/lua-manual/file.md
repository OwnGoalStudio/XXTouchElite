---
sidebar_position: 18
---

# File Operation Module

## File Operation Module - file

Functions marked with 🔤 process the read file as a UTF-8 text file.

### Check if a File or Directory Exists \(**file\.exists**\)

#### Declaration

```lua
existence_info = file.exists(path_to_file_or_directory)
```

#### Parameters and Return Values

- path_to_file_or_directory *string*
- existence_info
  - `false` or `"file"` or `"directory"`
    - `false` Path does not exist
    - `"file"` Path is a file
    - `"directory"` Path is a directory

#### Example

```lua title="file.exists"
if file.exists("/var/mobile/1.zip") then
  sys.alert("`/var/mobile/1.zip` exists")
else
  sys.alert("`/var/mobile/1.zip` does not exist")
end
--
if file.exists("/var/mobile/1.zip") == "file" then
  sys.alert("`/var/mobile/1.zip` exists and is a file")
else
  sys.alert("`/var/mobile/1.zip` is not a file")
end
--
if file.exists("/var/mobile/123/") == "directory" then
  sys.alert("`/var/mobile/123/` exists and is a directory")
else
  sys.alert("`/var/mobile/123/` is not a directory")
end
```

### List All File Names in a Directory \(**file\.list**\)

#### Declaration

```lua
file_list = file.list(directory_path)
```

#### Parameters and Return Values

- directory_path *string*
- file_list
  - *array of strings*, returns `nil` if the directory does not exist or the specified path is a file

#### Example

```lua title="file.list"
local list = file.list("/var/mobile/")
if list then
  nLog("There are " .. #list .. " files or directories in `/var/mobile/`")
  for _, name in ipairs(list) do
    nLog(name)
  end
  sys.alert(print.out())
else
  sys.alert("`/var/mobile/` is not a directory")
end
```

### Get the Size of a File \(**file\.size**\)

#### Declaration

```lua
file_size = file.size(file_path)
```

#### Parameters and Return Values

- file_path *string*
- file_size
  - *integer*, size in bytes, returns `nil` if the file does not exist or the specified path is a directory

#### Example

```lua title="file.size"
local fsize = file.size("/var/mobile/1.zip")
if fsize then
  sys.alert("The size of `/var/mobile/1.zip` is: " .. fsize .. " bytes")
else
  sys.alert("`/var/mobile/1.zip` is not a file")
end
```

### Read Data from a File \(**file\.reads**\)

#### Declaration

```lua
file_content = file.reads(file_path)
```

#### Parameters and Return Values

- file_path *string*
- file_content
  - *string*, the entire content of the file, returns `nil` if the file does not exist or the specified path is a directory

#### Example

```lua title="file.reads"
local data = file.reads("/var/mobile/1.zip")
if data then
  sys.alert("The size of `/var/mobile/1.zip` is: " .. #data .. " bytes")
else
  sys.alert("`/var/mobile/1.zip` is not a file")
end
```

### Write Data to a File \(**file\.writes**\)

#### Declaration

```lua
operation_success = file.writes(file_path, content_to_write)
```

#### Parameters and Return Values

- file_path *string*
- content_to_write *string*
- operation_success *boolean*

#### Description

Overwrites data to **file_path**. If the file does not exist, it will be created. If the parent directory of the specified path does not exist, it will return `false`.

#### Example

```lua title="file.writes"
local success = file.writes("/var/mobile/1.txt", "Serve")
if success then
  sys.alert("Write successful")
else
  sys.alert("Write failed")
end
```

### Append Data to the End of a File \(**file\.appends**\)

#### Declaration

```lua
operation_success = file.appends(file_path, content_to_append)
```

#### Parameters and Return Values

- file_path *string*
- content_to_append *string*
- operation_success *boolean*

#### Description

Appends **content_to_append** to the end of the file. If the file does not exist, it will be created. If the parent directory of the specified path does not exist, it will return `false`.

#### Example

```lua title="file.appends"
local success = file.appends("/var/mobile/1.txt", "to serve my country")
if success then
  sys.alert("Write successful")
else
  sys.alert("Write failed")
end
```

### 🔤 Count the Total Number of Lines in a Text File \(**file\.line_count**\)

#### Declaration

```lua
line_count = file.line_count(file_path)
```

#### Parameters and Return Values

- file_path *string*
- line_count
  - *integer*, an empty file will return `1`, a non-existent file will return `nil`

#### Example

```lua title="file.line_count"
local cnt = file.line_count("/var/mobile/1.txt")
if cnt then
  sys.alert("`/var/mobile/1.txt` has " .. cnt .. " lines")
else
  sys.alert("`/var/mobile/1.txt` is not a file")
end
```

### 🔤 Get the Content of a Specific Line in a Text File \(**file\.get_line**\)

#### Declaration

```lua
line_content = file.get_line(file_path, line_number)
```

#### Parameters and Return Values

- file_path *string*
- line_number
  - *integer*, pass a positive integer to specify the line number, `0` is invalid, negative numbers refer to lines from the end
- line_content
  - *string*, returns `nil` if the operation fails

#### Description

Line numbers start from `1`. If the line number is out of range or the file does not exist, it returns `nil`.

#### Example

```lua title="file.get_line"
local data = file.get_line("/var/mobile/1.txt", 1)
if data then
  data = string.strip_utf8_bom(data) -- Remove possible UTF8-BOM
  sys.alert("The content of the first line in `/var/mobile/1.txt` is " .. data)
else
  sys.alert("`/var/mobile/1.txt` is not a file")
end
```

### 🔤 Set the Content of a Specific Line in a Text File \(**file\.set_line**\)

#### Declaration

```lua
operation_success = file.set_line(file_path, line_number, content_to_write)
```

#### Parameters and Return Values

- file_path *string*
- line_number
  - *integer*, pass a positive integer to specify the line number, `0` means the last line + 1, negative numbers refer to lines from the end
- content_to_write *string*
- operation_success *boolean*

#### Description

Sets the content of a specific line in a text file. If the number of lines is insufficient, empty lines will be added. If the file does not exist, it will be created. If the parent directory of the specified path does not exist, it will return `false`.

#### Example

```lua title="file.set_line"
local success = file.set_line("/var/mobile/1.txt", 3, "Hahaha")
if success then
  sys.alert("Operation successful")
else
  sys.alert("Operation failed")
end
```

### 🔤 Insert Content Before a Specific Line in a Text File \(**file\.insert_line**\)

#### Declaration

```lua
operation_success = file.insert_line(file_path, line_number, content_to_insert)
```

#### Parameters and Return Values

- file_path *string*
- line_number
  - *integer*, pass a positive integer to specify the line number, `0` means the last line + 1, negative numbers refer to lines from the end
- content_to_insert *string*
- operation_success *boolean*

#### Description

Inserts content before a specific line in a text file. If the number of lines is insufficient, empty lines will be added. If the file does not exist, it will be created. If the parent directory of the specified path does not exist, it will return `false`.

#### Example

```lua title="file.insert_line"
local success = file.insert_line("/var/mobile/1.txt", 2, "Regardless of fortune or misfortune")
if success then
  sys.alert("Operation successful")
else
  sys.alert("Operation failed")
end
```

### 🔤 Remove a Specific Line from a Text File \(**file\.remove_line**\)

#### Declaration

```lua
operation_success, removed_line_content = file.remove_line(file_path, line_number)
```

#### Parameters and Return Values

- file_path *string*
- line_number
  - *integer*, pass a positive integer to specify the line number, `0` means the last line + 1, negative numbers refer to lines from the end
- operation_success *boolean*
- removed_line_content
  - *string*, returns `nil` if the operation fails

#### Description

- Line numbers start from `1`. If the line number is out of range or the file does not exist, it returns `nil`.
- If there is content after the removed line, subsequent lines will move up.

#### Example

```lua title="file.remove_line"
local success, line = file.remove_line("/var/mobile/1.txt", 3)
if success then
  sys.alert("Operation successful, the content of the removed line is: " .. line)
else
  sys.alert("Operation failed")
end
```

### 🔤 Get All Lines of a Text File \(**file\.get_lines**\)

#### Declaration

```lua
line_array = file.get_lines(file_path)
```

#### Parameters and Return Values

- file_path *string*
- line_array
  - *array of strings*, returns `nil` if the file does not exist

#### Description

Gets all lines of a text file. An empty file returns `{ [1] = "" }`, a non-existent file returns `nil`.

#### Example

```lua title="file.get_lines"
local lines = file.get_lines("/var/mobile/1.txt")
if lines then
  lines[1] = string.strip_utf8_bom(lines[1])  -- Remove possible UTF8-BOM
  if #lines[1] > 0 then
    sys.alert("The content of the first line is " .. lines[1])
  else
    sys.alert("The file is empty")
  end
else
  sys.alert("Operation failed")
end
```

### 🔤 Overwrite a File with an Array of Strings Line by Line \(**file\.set_lines**\)

#### Declaration

```lua
operation_success = file.set_lines(file_path, line_array)
```

#### Parameters and Return Values

- file_path *string*
- line_array *array of strings*
- operation_success *boolean*

#### Description

Overwrites a file with an array of strings line by line. If the file does not exist, it will be created. If the parent directory of the specified path does not exist, it will return `false`.

#### Example

```lua title="file.set_lines"
local success = file.set_lines("/var/mobile/1.txt", {
  "Serve my country at all costs",
  "Regardless of fortune or misfortune",
})
if success then
  sys.alert("+1s")
else
  sys.alert("Operation failed")
end
```

### 🔤 Insert an Array of Strings Line by Line Before a Specific Line in a File \(**file\.insert_lines**\)

#### Declaration

```lua
operation_success = file.insert_lines(file_path, line_number, line_array)
```

#### Parameters and Return Values

- file_path *string*
- line_number
  - *integer*, pass a positive integer to specify the line number, `0` means the last line + 1, negative numbers refer to lines from the end
- line_array *array of strings*
- operation_success *boolean*

#### Description

Inserts an array of strings line by line before a specific line in a file. If the file does not exist, it will be created. If the parent directory of the specified path does not exist, it will return `false`.

#### Example

```lua title="file.insert_lines"
local success = file.insert_lines("/var/mobile/1.txt", 0, { -- Append the following two lines to the end of the file
  "I will do whatever it takes to serve my country even at the cost of my own life,",
  "regardless of fortune or misfortune to myself.",
})
if success then
  sys.alert("+1s")
else
  sys.alert("Operation failed")
end
```
