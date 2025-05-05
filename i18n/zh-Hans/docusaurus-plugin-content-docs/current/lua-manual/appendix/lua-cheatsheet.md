---
sidebar_position: 99
---

# Lua 备忘条

## 学习 Lua 注意避开的坑

- 数组下标是从 1 开始的（区别于 C、JavaScript 等语言的从 0 开始）
- [`string.len`](https://cloudwu.github.io/lua53doc/manual.html#pdf-string.len) 不是取字符串的字符个数，而是取字节数
- 所有未初始化的变量都是 `nil`，对一个表中的值赋 `nil` 会从表中删除它
- 只有 `nil` 和 `false` 是逻辑假，其它值都是逻辑真，包括 `0`
- 字符串和数字在做数学运算和对比大小时会自动转换，例如 `a = '1' + 2`
- 两个浮点数（带小数点的数）不能用全等号 `==` 做对比，错误用法比如 `if 89.7 == (3 * 29.9) then`
- 一个可以完全表示为整数的浮点数和对应的整数相等，例如 `1.0 == 1`

## 开发常见运行期错误参考

|错误描述片段|原因|处理方式|
|------|----|----|
|`attempt to perform arithmetic on a`|尝试对非数值进行了数学运算（`+`、`-`、`*`、`/`）|数学运算之前，检查运算输入是否都为数字|
|`attempt to compare`|尝试对非法值进行了比较运算（`>`、`<`、`>=`、`<=`）|比较运算之前，检查运算输入是否双方可以进行比较运算|
|`attempt to concatenate a`|尝试对非字符串值进行了连接（`..`）|在进行字符串连接之前，先确定连接双方都为字符串|
|`attempt to call a`|尝试调用了一个不是函数的变量|调用一个函数之前，先确定其是否为一个函数|
|`attempt to index a`|尝试对一个非表变量进行索引（下标运算）|在从数组变量或关联数组变量中取值前，先确定其是否为一个表|
|`attempt to yield across a C-call boundary`|尝试在不能让出的调用块中让出|[`require`](http://cloudwu.github.io/lua53doc/manual.html#pdf-require) 一个模块的时候，请确认被 [`require`](http://cloudwu.github.io/lua53doc/manual.html#pdf-require) 的模块返回之前没有调用会让出的函数（手册上函数前带叹号）。还有就是不要尝试在带 C 回调的函数中使用会让出的函数（手册上函数前带叹号）。|
|`invalid order function for sorting`|非法的排序函数，通常发生在排序函数的规则逻辑不够明确的情况下|调用排序函数时，明确排序规则，不要出现 a 大于 b 成立同时小于 b 也成立的规则|
|`bad argument #1 to 'xxx' (number expected, got nil)`|调用某函数时，第 1 个参数的类型不正确，需要 `number` 却传入了 `nil`|参数错误，传入合适的参数就不会出错了|
|`bad argument #2 to 'xxx' (number has no integer representation)`|调用某函数时，第 2 个参数无法转换成整数|参数错误，传入合适的参数就不会出错了|
|`bad argument #3 to 'xxx'`|调用某函数时，第 3 个参数非法|参数错误，传入合适的参数就不会出错了|

## [`os.date`](http://cloudwu.github.io/lua53doc/manual.html#pdf-os.date) 的用法

|格式|示例|描述|结果|
|----|----|----|----|
|`%Y-%m-%d %H:%M:%S`|`os.date("%Y-%m-%d %H:%M:%S", 1487356783)`|一种常用日期时间格式|`2017-02-18 02:39:43`|
|`%Y-%m-%d`|`os.date("%Y-%m-%d", 1487356783)`|一种常用日期格式|`2017-02-18`|
|`%a`|`os.date("%a", 1487356783)`|短星期名|`Sat`|
|`%A`|`os.date("%A", 1487356783)`|全星期名|`Saturday`|
|`%b`|`os.date("%b", 1487356783)`|简写的月份名|`Feb`|
|`%B`|`os.date("%B", 1487356783)`|月份的全称|`February`|
|`%c`|`os.date("%c", 1487356783)`|标准的日期的时间串|`Sat Feb 18 02:39:43 2017`|
|`%d`|`os.date("%d", 1487356783)`|月当中的某一天，取值范围 01 \- 31|`18`|
|`%H`|`os.date("%H", 1487356783)`|24 小时制的时，取值范围 00 \- 23|`02`|
|`%I`|`os.date("%I", 1487356783)`|12 小时制的时，取值范围 01 \- 12|`02`|
|`%j`|`os.date("%j", 1487356783)`|年当中的某一天，取值范围 001 \- 366|`049`|
|`%M`|`os.date("%M", 1487356783)`|分钟，取值范围 00 \- 59|`39`|
|`%m`|`os.date("%m", 1487356783)`|月份，取值范围 01 \- 12|`02`|
|`%p`|`os.date("%p", 1487356783)`|上午为 `AM`，下午为 `PM`|`AM`|
|`%S`|`os.date("%S", 1487356783)`|秒钟，可能出现闰秒，取值范围 00 \- 61|`43`|
|`%w`|`os.date("%w", 1487356783)`|星期几（星期日为0），取值范围 0 \- 6|`6`|
|`%x`|`os.date("%x", 1487356783)`|标准的日期串|`02/18/17`|
|`%X`|`os.date("%X", 1487356783)`|标准的时间串|`02:39:43`|
|`%y`|`os.date("%y", 1487356783)`|不带世纪的年份|`17`|
|`%Y`|`os.date("%Y", 1487356783)`|带世纪部分的年份|`2017`|
|`%%`|`os.date("%%", 1487356783)`|百分号|`%`|

## [`string`](http://cloudwu.github.io/lua53doc/manual.html#6.4) 库的用法

### 基本函数

|函数|描述|示例|结果|
|----|----|----|----|
|[`string.len`](https://cloudwu.github.io/lua53doc/manual.html#pdf-string.len)|计算字符串长度|`string.len("abcd")`|`4`|
|[`string.rep`](https://cloudwu.github.io/lua53doc/manual.html#pdf-string.rep)|返回字符串 s 的 n 个拷贝|`string.rep("abcd", 2)`|`abcdabcd`|
|[`string.lower`](https://cloudwu.github.io/lua53doc/manual.html#pdf-string.lower)|返回字符串全部字母小写|`string.lower("AbcD")`|`abcd`|
|[`string.upper`](https://cloudwu.github.io/lua53doc/manual.html#pdf-string.upper)|返回字符串全部字母大写|`string.upper("AbcD")`|`ABCD`|
|[`string.format`](https://cloudwu.github.io/lua53doc/manual.html#pdf-string.format)|格式化字符串|`string.format("the value is: %d", 4)`|`the value is: 4`|
|[`string.sub`](https://cloudwu.github.io/lua53doc/manual.html#pdf-string.sub)|从字符串里截取字符串|`string.sub("abcd", 2)`|`bcd`|
|||`string.sub("abcd", -2)`|`cd`|
|||`string.sub("abcd", 2, -2)`|`bc`|
|||`string.sub("abcd", 2, 3)`|`bc`|
|[`string.find`](https://cloudwu.github.io/lua53doc/manual.html#pdf-string.find)|在字符串中查找（显示位置）|`string.find("cdcdcdcd", "ab")`|`nil`|
|||`string.find("cdcdcdcd", "cd")`|`1 2`|
|||`string.find("cdcdcdcd", "cd", 7)`|`7 8`|
|[`string.match`](https://cloudwu.github.io/lua53doc/manual.html#pdf-string.match)|在字符串中查找（显示内容）|`string.match("cdcdcdcd", "ab")`|`nil`|
|||`string.match("cdcdcdcd", "cd")`|`cd`|
|[`string.gsub`](https://cloudwu.github.io/lua53doc/manual.html#pdf-string.gsub)|在字符串中替换|`string.gsub("abcdabcd", "a", "z")`|`zbcdzbcd 2`|
|||`string.gsub("aaaa", "a", "z", 3)`|`zzza 3`|
|[`string.byte`](https://cloudwu.github.io/lua53doc/manual.html#pdf-string.byte)|返回字符的整数形式|`string.byte("ABCD", 4)`|`68`|
|[`string.char`](https://cloudwu.github.io/lua53doc/manual.html#pdf-string.char)|将整型数字转成字符并连接|`string.char(97, 98, 99, 100)`|`abcd`|

### 基本模式串

|字符类|描述|示例|结果|
|------|----|----|----|
|`.`|任意字符|`string.find("", ".")`|`nil`|
|`%s`|空白符|`string.find("ab cd", "%s%s")`|`3 4`|
|`%S`|非空白符|`string.find("ab cd", "%S%S")`|`1 2`|
|`%p`|标点字符|`string.find("ab,.cd", "%p%p")`|`3 4`|
|`%P`|非标点字符|`string.find("ab,.cd", "%P%P")`|`1 2`|
|`%c`|控制字符|`string.find("abcd\t\n", "%c%c")`|`5 6`|
|`%C`|非控制字符|`string.find("\t\nabcd", "%C%C")`|`3 4`|
|`%d`|数字|`string.find("abcd12", "%d%d")`|`5 6`|
|`%D`|非数字|`string.find("12abcd", "%D%D")`|`3 4`|
|`%x`|十六进制数字|`string.find("efgh", "%x%x")`|`1 2`|
|`%X`|非十六进制数字|`string.find("efgh", "%X%X")`|`3 4`|
|`%a`|字母|`string.find("AB12", "%a%a")`|`1 2`|
|`%A`|非字母|`string.find("AB12", "%A%A")`|`3 4`|
|`%l`|小写字母|`string.find("ABab", "%l%l")`|`3 4`|
|`%L`|大写字母|`string.find("ABab", "%L%L")`|`1 2`|
|`%u`|大写字母|`string.find("ABab", "%u%u")`|`1 2`|
|`%U`|非大写字母|`string.find("ABab", "%U%U")`|`3 4`|
|`%w`|字母和数字|`string.find("a1()", "%w%w")`|`1 2`|
|`%W`|非字母非数字|`string.find("a1()", "%W%W")`|`3 4`|

### 转义字符 `%`

|字符类|描述|示例|结果|
|------|----|----|----|
|`%`|转义字符|`string.find("abc%..", "%%")`|`4 4`|
|||`string.find("abc..d", "%.%.")`|`4 5`|

### 用 `[]` 表示字符集，`-` 表示连字符，`^` 表示字符集的补集

|字符类|描述|示例|结果|
|------|----|----|----|
|`[01]`|匹配二进制数|`string.find("32123", "[01]")`|`3 3`|
|`[AB][CD]`|匹配 `AC`、`AD`、`BC`、`BD`|`string.find("ABCDEF", "[AB][CD]")`|`2 3`|
|`[[]]`|匹配一对方括号 `[]`|`string.find("ABC[]D", "[[]]")`|`4 5`|
|`[1-3]`|匹配数字 `1`、`2`、`3`|`string.find("312", "[1-3][1-3][1-3]")`|`1 3`|
|`[b-d]`|匹配字母 `b`、`c`、`d`|`string.find("dbc", "[b-d][b-d][b-d]")`|`1 3`|
|`[^%s]`|匹配任意非空字符|`string.find(" a ", "[^%s]")`|`3 3`|
|`[^%d]`|匹配任意非数字字符|`string.find("123a", "[^%d]")`|`4 4`|
|`[^%a]`|匹配任意非字母字符|`string.find("abc1", "[^%a]")`|`4 4`|

### 用 `()` 进行捕获

|字符类|描述|示例|结果|
|------|----|----|----|
|`()`|捕获字符串|`string.find("12ab", "(%a%a)")`|`3 4 ab`|
|||`string.find("ab12", "(%d%d)")`|`3 4 12`|

### 模式修饰符

|修饰符|描述|示例|结果|
|------|----|----|----|
|`+`|表示 1 个或多个，匹配最多个|`string.find("aaabbb", "(a+b)")`|`1 4 aaab`|
|||`string.find("cccbbb", "(a+b)")`|`nil`|
|`-`|表示 0 个或多个，匹配最少个|`string.find("zzxyyy", "(xy-)")`|`3 3 x`|
|||`string.find("zzzyyy", "(x-y)")`|`4 4 y`|
|`*`|表示 0 个或多个，匹配最多个|`string.find("mmmnnn", "(m*n)")`|`1 4 mmmb`|
|||`string.find("lllnnn", "(m*n)")`|`4 4 n`|
|`?`|表示 0 个或 1 个|`string.find("aaabbb", "(a?b)")`|`3 4 ab`|
|||`string.find("cccbbb", "(a?b)")`|`4 4 b`|

### [`string.match`](https://cloudwu.github.io/lua53doc/manual.html#pdf-string.match) 的常见用法

|描述|示例|结果|
|----|----|----|
|匹配中文|`string.match("男女abc123", "([^%w%p]+)")`|`男女`|
|匹配英文|`string.match("男女abc123", "(%a+)")`|`abc`|
|匹配数字|`string.match("男女abc123", "(%d+)")`|`123`|
|匹配英文和数字|`string.match("男女abc123", "(%w+)")`|`abc123`|

## [`math`](https://cloudwu.github.io/lua53doc/manual.html#6.7) 库的用法

|函数名|描述|示例|结果|
|------|----|----|----|
|[`math.pi`](https://cloudwu.github.io/lua53doc/manual.html#pdf-math.pi)|圆周率|`math.pi`|`3.1415926535898`|
|[`math.abs`](https://cloudwu.github.io/lua53doc/manual.html#pdf-math.abs)|取绝对值|`math.abs(-2012)`|`2012`|
|[`math.ceil`](https://cloudwu.github.io/lua53doc/manual.html#pdf-math.ceil)|向上取整|`math.ceil(9.1)`|`10`|
|[`math.floor`](https://cloudwu.github.io/lua53doc/manual.html#pdf-math.floor)|向下取整|`math.floor(9.9)`|`9`|
|[`math.max`](https://cloudwu.github.io/lua53doc/manual.html#pdf-math.max)|取参数最大值|`math.max(2, 4, 6, 8)`|`8`|
|[`math.min`](https://cloudwu.github.io/lua53doc/manual.html#pdf-math.min)|取参数最小值|`math.min(2, 4, 6, 8)`|`2`|
|[`math.sqrt`](https://cloudwu.github.io/lua53doc/manual.html#pdf-math.sqrt)|开平方|`math.sqrt(65536)`|`256.0`|
|[`math.modf`](https://cloudwu.github.io/lua53doc/manual.html#pdf-math.modf)|取整数和小数部分|`math.modf(20.12)`|`20 0.12`|
|[`math.randomseed`](https://cloudwu.github.io/lua53doc/manual.html#pdf-math.randomseed)|设随机数种子|`math.randomseed(os.time())`||
|[`math.random`](https://cloudwu.github.io/lua53doc/manual.html#pdf-math.random)|取随机数|`math.random(5, 90)`||
|[`math.rad`](https://cloudwu.github.io/lua53doc/manual.html#pdf-math.rad)|角度转弧度|`math.rad(180)`|`3.1415926535898`|
|[`math.deg`](https://cloudwu.github.io/lua53doc/manual.html#pdf-math.deg)|弧度转角度|`math.deg(math.pi)`|`180.0`|
|[`math.exp`](https://cloudwu.github.io/lua53doc/manual.html#pdf-math.exp)|e 的 x 次方|`math.exp(4)`|`54.598150033144`|
|[`math.log`](https://cloudwu.github.io/lua53doc/manual.html#pdf-math.log)|计算 x 的自然对数|`math.log(54.598150033144)`|`4.0`|
|[`math.sin`](https://cloudwu.github.io/lua53doc/manual.html#pdf-math.sin)|正弦|`math.sin(math.rad(30))`|`0.5`|
|[`math.cos`](https://cloudwu.github.io/lua53doc/manual.html#pdf-math.cos)|余弦|`math.cos(math.rad(60))`|`0.5`|
|[`math.tan`](https://cloudwu.github.io/lua53doc/manual.html#pdf-math.tan)|正切|`math.tan(math.rad(45))`|`1.0`|
|[`math.asin`](https://cloudwu.github.io/lua53doc/manual.html#pdf-math.asin)|反正弦|`math.deg(math.asin(0.5))`|`30.0`|
|[`math.acos`](https://cloudwu.github.io/lua53doc/manual.html#pdf-math.acos)|反余弦|`math.deg(math.acos(0.5))`|`60.0`|
|[`math.atan`](https://cloudwu.github.io/lua53doc/manual.html#pdf-math.atan)|反正切|`math.deg(math.atan(1))`|`45.0`|
