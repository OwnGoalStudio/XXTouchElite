---
sidebar_position: 10
---

# Extended Table Module

## Extended Table Module - table

### Deep Copy a Table \(**table\.deep\_copy**\)

#### Declaration

```lua
copied_table = table.deep_copy(input_table)
```

#### Parameters and Return Values

- input_table
  - *table*, the table to be copied
- copied_table
  - *table*, the copy of the input table

#### Description

Recursively copies the **input_table** to create its duplicate. All values in the table, except for `function` and `userdata`, will be copied.
If the input table contains circular references, the reference relationships will also be copied.

#### Example

```lua title="table.deep_copy"
_g = table.deep_copy(_G)
```

### Deep Print a Table \(**table\.deep\_print/stringify**\)

#### Declaration

```lua
table_text = table.deep_print(associated_table)  -- Outputs to standard output
table_text = stringify(associated_table)         -- Does not output to standard output, only returns a string
```

#### Parameters and Return Values

- associated_table
  - *table*, the table to be printed as a string
- table_text
  - *string*, the textual representation of the table’s tree structure

#### Description

Prints the tree structure of a table.

:::note

- The printed structure **does not guarantee format compatibility** and may vary between versions.
- The `table.deep_print` function outputs content to the [`print`](../appendix/logging-facilities.md#print) buffer, while `stringify` does not.
- Non-table reference types (userdata, functions) cannot be deserialized using [`table.load_string`](#load-a-table-from-a-string-tableload_string), and only human readability is guaranteed.

:::

#### Example

```lua title="table.deep_print"
local s = table.deep_print(_G)
sys.alert(s)
```

### Load a Table from a String \(**table\.load\_string**\)

#### Declaration

```lua
associated_table = table.load_string(table_text)
```

#### Parameters and Return Values

- table_text
  - *string*, the textual representation of the table’s tree structure, which can only contain static data and no dynamic code
- associated_table
  - *table*, returns the table structure if successful, or `nil` if failed

#### Description

Converts a textual tree structure description into a table object.

:::note

- When there are no circular references or non-table reference types, `table.load_string` is the inverse function of [`stringify`](#deep-print-a-table-tabledeep_printstringify).
- This function differs from [`load`](http://cloudwu.github.io/lua53doc/manual.html#pdf-load) in that it does not execute code in the text and only uses static data.
- For example, the following example contains runtime code, resulting in `b` being `nil`.

  ```lua
  b = table.load_string[[ {
    a = os.execute('reboot'), -- This code will not execute and will return nil
  } ]]
  ```

:::

#### Example

```lua title="table.load_string"
local t = table.load_string[[ {
  a = 1,
  b = 2,
  c = 3,
} ]]
sys.alert(t.b)
```
