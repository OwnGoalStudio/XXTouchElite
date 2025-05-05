---
sidebar_position: 10
---

# 扩展表模块

## 扩展表模块 - table

### 深拷贝一个表 \(**table\.deep\_copy**\)

#### 声明

```lua
传入表的副本 = table.deep_copy(传入表)
```

#### 参数及返回值

- 传入表
  - *表型*，需要拷贝的表
- 传入表的副本 *表型*

#### 说明

递归拷贝 **传入表**，生成其副本，表中除 `function` 和 `userdata` 以外的所有值都会拷贝。  
传入表中如果包含循环引用，那么其引用关系也会获得拷贝。

#### 示例

```lua title="table.deep_copy"
_g = table.deep_copy(_G)
```

### 深打印一个表 \(**table\.deep\_print/stringify**\)

#### 声明

```lua
表文本 = table.deep_print(关联表)  -- 输出到标准输出
表文本 = stringify(关联表)         -- 不输出到标准输出，仅返回字符串
```

#### 参数及返回值

- 关联表
  - *表型*，需要打印成字符串的表
- 表文本
  - *文本型*，返回表的树形结构的文本

#### 说明

将一个表的树形结构打印出来。

:::note

- 打印出来的结构 **不保证格式兼容**，不同版本打印出来可能不一样。
- `table.deep_print` 函数调用会将内容输出到 [`print`](./appendix/logging-facilities.md#打印内容到缓冲区-print) 缓冲区，而 `stringify` 不会。
- 非表型引用类型（用户数据、函数）不可通过 [`table.load_string`](#从字符串加载一个表-tableload_string) 反序列，只保证人类可读性。

:::

#### 示例

```lua title="table.deep_print"
local s = table.deep_print(_G)
sys.alert(s)
```

### 从字符串加载一个表 \(**table\.load\_string**\)

#### 声明

```lua
关联表 = table.load_string(表文本)
```

#### 参数及返回值

- 表文本
  - *文本型*，表的树形结构的文本，只能包含静态数据，不能包含任何动态代码
- 关联表
  - *表型*，加载成功返回表结构，失败返回 `nil`

#### 说明

将一个树形结构文本描述转换成一个表对象。

:::note

- 在没有循环引用或非表引用类型时，`table.load_string` 是 [`stringify`](#深打印一个表-tabledeep_printstringify) 的逆函数。
- 此函数与 [`load`](http://cloudwu.github.io/lua53doc/manual.html#pdf-load) 的区别在于，它不会运行文本中的代码，只会使用静态数据。
- 例如，以下示例包含运行时代码，结果是 `b` 为 `nil`。

  ```lua
  b = table.load_string[[ {
    a = os.execute('reboot'), -- 这里的代码将不会运行，并且会返回 nil
  } ]]
  ```

:::

#### 示例

```lua title="table.load_string"
local t = table.load_string[[ {
  a = 1,
  b = 2,
  c = 3,
} ]]
sys.alert(t.b)
```
