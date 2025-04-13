---
sidebar_position: 99
---

# Lua Cheatsheet

## Pitfalls to Avoid When Learning Lua

- Array indices start from 1 (unlike C, JavaScript, and other languages where they start from 0)
- [`string.len`](https://cloudwu.github.io/lua53doc/manual.html#pdf-string.len) does not return the number of characters in a string but the number of bytes
- All uninitialized variables are `nil`, and assigning `nil` to a value in a table removes it from the table
- Only `nil` and `false` are logically false; all other values, including `0`, are logically true
- Strings and numbers are automatically converted when performing mathematical operations or comparisons, e.g., `a = '1' + 2`
- Two floating-point numbers (numbers with decimals) cannot be compared using the equality operator `==`, e.g., `if 89.7 == (3 * 29.9) then` is incorrect
- A floating-point number that can be fully represented as an integer is equal to its corresponding integer, e.g., `1.0 == 1`

## Common Runtime Errors

|Error Message Fragment|Cause|Solution|
|------|----|----|
|`attempt to perform arithmetic on a`|Attempted to perform arithmetic (`+`, `-`, `*`, `/`) on a non-numeric value|Check if all inputs for arithmetic operations are numbers|
|`attempt to compare`|Attempted to perform comparison (`>`, `<`, `>=`, `<=`) on invalid values|Check if both inputs for comparison operations are valid for comparison|
|`attempt to concatenate a`|Attempted to concatenate (`..`) a non-string value|Ensure both values being concatenated are strings|
|`attempt to call a`|Attempted to call a variable that is not a function|Ensure the variable being called is a function|
|`attempt to index a`|Attempted to index (subscript operation) a non-table variable|Ensure the variable being accessed as an array or associative array is a table|
|`attempt to yield across a C-call boundary`|Attempted to yield in a non-yieldable call block|When using [`require`](http://cloudwu.github.io/lua53doc/manual.html#pdf-require), ensure the required module does not call yieldable functions (marked with an exclamation mark in the manual) before returning. Also, avoid using yieldable functions in functions with C callbacks (marked with an exclamation mark in the manual).|
|`invalid order function for sorting`|Invalid sorting function, usually due to unclear sorting logic|Define clear sorting rules when calling the sorting function to avoid contradictory rules (e.g., `a > b` and `a < b` both being true)|
|`bad argument #1 to 'xxx' (number expected, got nil)`|The first argument to a function is of the wrong type, expecting a `number` but got `nil`|Fix the argument and pass the correct value|
|`bad argument #2 to 'xxx' (number has no integer representation)`|The second argument to a function cannot be converted to an integer|Fix the argument and pass the correct value|
|`bad argument #3 to 'xxx'`|The third argument to a function is invalid|Fix the argument and pass the correct value|

## Usage of [`os.date`](http://cloudwu.github.io/lua53doc/manual.html#pdf-os.date)

|Format|Example|Description|Result|
|----|----|----|----|
|`%Y-%m-%d %H:%M:%S`|`os.date("%Y-%m-%d %H:%M:%S", 1487356783)`|A common date-time format|`2017-02-18 02:39:43`|
|`%Y-%m-%d`|`os.date("%Y-%m-%d", 1487356783)`|A common date format|`2017-02-18`|
|`%a`|`os.date("%a", 1487356783)`|Abbreviated weekday name|`Sat`|
|`%A`|`os.date("%A", 1487356783)`|Full weekday name|`Saturday`|
|`%b`|`os.date("%b", 1487356783)`|Abbreviated month name|`Feb`|
|`%B`|`os.date("%B", 1487356783)`|Full month name|`February`|
|`%c`|`os.date("%c", 1487356783)`|Standard date-time string|`Sat Feb 18 02:39:43 2017`|
|`%d`|`os.date("%d", 1487356783)`|Day of the month, range 01 - 31|`18`|
|`%H`|`os.date("%H", 1487356783)`|Hour in 24-hour format, range 00 - 23|`02`|
|`%I`|`os.date("%I", 1487356783)`|Hour in 12-hour format, range 01 - 12|`02`|
|`%j`|`os.date("%j", 1487356783)`|Day of the year, range 001 - 366|`049`|
|`%M`|`os.date("%M", 1487356783)`|Minute, range 00 - 59|`39`|
|`%m`|`os.date("%m", 1487356783)`|Month, range 01 - 12|`02`|
|`%p`|`os.date("%p", 1487356783)`|AM or PM|`AM`|
|`%S`|`os.date("%S", 1487356783)`|Second, may include leap second, range 00 - 61|`43`|
|`%w`|`os.date("%w", 1487356783)`|Day of the week (Sunday is 0), range 0 - 6|`6`|
|`%x`|`os.date("%x", 1487356783)`|Standard date string|`02/18/17`|
|`%X`|`os.date("%X", 1487356783)`|Standard time string|`02:39:43`|
|`%y`|`os.date("%y", 1487356783)`|Year without century|`17`|
|`%Y`|`os.date("%Y", 1487356783)`|Year with century|`2017`|
|`%%`|`os.date("%%", 1487356783)`|Percent sign|`%`|

## Usage of the [`string`](http://cloudwu.github.io/lua53doc/manual.html#6.4) Library

### Basic Functions

|Function|Description|Example|Result|
|----|----|----|----|
|[`string.len`](https://cloudwu.github.io/lua53doc/manual.html#pdf-string.len)|Calculate the length of a string|`string.len("abcd")`|`4`|
|[`string.rep`](https://cloudwu.github.io/lua53doc/manual.html#pdf-string.rep)|Return `n` copies of string `s`|`string.rep("abcd", 2)`|`abcdabcd`|
|[`string.lower`](https://cloudwu.github.io/lua53doc/manual.html#pdf-string.lower)|Return the string in all lowercase|`string.lower("AbcD")`|`abcd`|
|[`string.upper`](https://cloudwu.github.io/lua53doc/manual.html#pdf-string.upper)|Return the string in all uppercase|`string.upper("AbcD")`|`ABCD`|
|[`string.format`](https://cloudwu.github.io/lua53doc/manual.html#pdf-string.format)|Format a string|`string.format("the value is: %d", 4)`|`the value is: 4`|
|[`string.sub`](https://cloudwu.github.io/lua53doc/manual.html#pdf-string.sub)|Extract a substring from a string|`string.sub("abcd", 2)`|`bcd`|
|||`string.sub("abcd", -2)`|`cd`|
|||`string.sub("abcd", 2, -2)`|`bc`|
|||`string.sub("abcd", 2, 3)`|`bc`|
|[`string.find`](https://cloudwu.github.io/lua53doc/manual.html#pdf-string.find)|Find a substring in a string (returns position)|`string.find("cdcdcdcd", "ab")`|`nil`|
|||`string.find("cdcdcdcd", "cd")`|`1 2`|
|||`string.find("cdcdcdcd", "cd", 7)`|`7 8`|
|[`string.match`](https://cloudwu.github.io/lua53doc/manual.html#pdf-string.match)|Find a substring in a string (returns content)|`string.match("cdcdcdcd", "ab")`|`nil`|
|||`string.match("cdcdcdcd", "cd")`|`cd`|
|[`string.gsub`](https://cloudwu.github.io/lua53doc/manual.html#pdf-string.gsub)|Replace a substring in a string|`string.gsub("abcdabcd", "a", "z")`|`zbcdzbcd 2`|
|||`string.gsub("aaaa", "a", "z", 3)`|`zzza 3`|
|[`string.byte`](https://cloudwu.github.io/lua53doc/manual.html#pdf-string.byte)|Return the integer representation of a character|`string.byte("ABCD", 4)`|`68`|
|[`string.char`](https://cloudwu.github.io/lua53doc/manual.html#pdf-string.char)|Convert integer numbers to characters and concatenate them|`string.char(97, 98, 99, 100)`|`abcd`|

### Basic Patterns

|Character Class|Description|Example|Result|
|------|----|----|----|
|`.`|Any character|`string.find("", ".")`|`nil`|
|`%s`|Whitespace character|`string.find("ab cd", "%s%s")`|`3 4`|
|`%S`|Non-whitespace character|`string.find("ab cd", "%S%S")`|`1 2`|
|`%p`|Punctuation character|`string.find("ab,.cd", "%p%p")`|`3 4`|
|`%P`|Non-punctuation character|`string.find("ab,.cd", "%P%P")`|`1 2`|
|`%c`|Control character|`string.find("abcd\t\n", "%c%c")`|`5 6`|
|`%C`|Non-control character|`string.find("\t\nabcd", "%C%C")`|`3 4`|
|`%d`|Digit|`string.find("abcd12", "%d%d")`|`5 6`|
|`%D`|Non-digit|`string.find("12abcd", "%D%D")`|`3 4`|
|`%x`|Hexadecimal digit|`string.find("efgh", "%x%x")`|`1 2`|
|`%X`|Non-hexadecimal digit|`string.find("efgh", "%X%X")`|`3 4`|
|`%a`|Letter|`string.find("AB12", "%a%a")`|`1 2`|
|`%A`|Non-letter|`string.find("AB12", "%A%A")`|`3 4`|
|`%l`|Lowercase letter|`string.find("ABab", "%l%l")`|`3 4`|
|`%L`|Uppercase letter|`string.find("ABab", "%L%L")`|`1 2`|
|`%u`|Uppercase letter|`string.find("ABab", "%u%u")`|`1 2`|
|`%U`|Non-uppercase letter|`string.find("ABab", "%U%U")`|`3 4`|
|`%w`|Alphanumeric character|`string.find("a1()", "%w%w")`|`1 2`|
|`%W`|Non-alphanumeric character|`string.find("a1()", "%W%W")`|`3 4`|

### Escape Character `%`

|Character Class|Description|Example|Result|
|------|----|----|----|
|`%`|Escape character|`string.find("abc%..", "%%")`|`4 4`|
|||`string.find("abc..d", "%.%.")`|`4 5`|

### Using `[]` to Represent Character Sets, `-` for Ranges, and `^` for Complement of Character Sets

|Character Class|Description|Example|Result|
|------|----|----|----|
|`[01]`|Match binary digits|`string.find("32123", "[01]")`|`3 3`|
|`[AB][CD]`|Match `AC`, `AD`, `BC`, `BD`|`string.find("ABCDEF", "[AB][CD]")`|`2 3`|
|`[[]]`|Match a pair of square brackets `[]`|`string.find("ABC[]D", "[[]]")`|`4 5`|
|`[1-3]`|Match digits `1`, `2`, `3`|`string.find("312", "[1-3][1-3][1-3]")`|`1 3`|
|`[b-d]`|Match letters `b`, `c`, `d`|`string.find("dbc", "[b-d][b-d][b-d]")`|`1 3`|
|`[^%s]`|Match any non-whitespace character|`string.find(" a ", "[^%s]")`|`3 3`|
|`[^%d]`|Match any non-digit character|`string.find("123a", "[^%d]")`|`4 4`|
|`[^%a]`|Match any non-letter character|`string.find("abc1", "[^%a]")`|`4 4`|

### Using `()` for Capturing

|Character Class|Description|Example|Result|
|------|----|----|----|
|`()`|Capture string|`string.find("12ab", "(%a%a)")`|`3 4 ab`|
|||`string.find("ab12", "(%d%d)")`|`3 4 12`|

### Pattern Modifiers

|Modifier|Description|Example|Result|
|------|----|----|----|
|`+`|Matches 1 or more occurrences, matches the most|`string.find("aaabbb", "(a+b)")`|`1 4 aaab`|
|||`string.find("cccbbb", "(a+b)")`|`nil`|
|`-`|Matches 0 or more occurrences, matches the least|`string.find("zzxyyy", "(xy-)")`|`3 3 x`|
|||`string.find("zzzyyy", "(x-y)")`|`4 4 y`|
|`*`|Matches 0 or more occurrences, matches the most|`string.find("mmmnnn", "(m*n)")`|`1 4 mmmb`|
|||`string.find("lllnnn", "(m*n)")`|`4 4 n`|
|`?`|Matches 0 or 1 occurrence|`string.find("aaabbb", "(a?b)")`|`3 4 ab`|
|||`string.find("cccbbb", "(a?b)")`|`4 4 b`|

### Common Usage of [`string.match`](https://cloudwu.github.io/lua53doc/manual.html#pdf-string.match)

|Description|Example|Result|
|----|----|----|
|Match Chinese characters|`string.match("男女abc123", "([^%w%p]+)")`|`男女`|
|Match English letters|`string.match("男女abc123", "(%a+)")`|`abc`|
|Match digits|`string.match("男女abc123", "(%d+)")`|`123`|
|Match English letters and digits|`string.match("男女abc123", "(%w+)")`|`abc123`|

## Usage of the [`math`](https://cloudwu.github.io/lua53doc/manual.html#6.7) Library

|Function Name|Description|Example|Result|
|------|----|----|----|
|[`math.pi`](https://cloudwu.github.io/lua53doc/manual.html#pdf-math.pi)|Pi|`math.pi`|`3.1415926535898`|
|[`math.abs`](https://cloudwu.github.io/lua53doc/manual.html#pdf-math.abs)|Absolute value|`math.abs(-2012)`|`2012`|
|[`math.ceil`](https://cloudwu.github.io/lua53doc/manual.html#pdf-math.ceil)|Ceiling|`math.ceil(9.1)`|`10`|
|[`math.floor`](https://cloudwu.github.io/lua53doc/manual.html#pdf-math.floor)|Floor|`math.floor(9.9)`|`9`|
|[`math.max`](https://cloudwu.github.io/lua53doc/manual.html#pdf-math.max)|Maximum value|`math.max(2, 4, 6, 8)`|`8`|
|[`math.min`](https://cloudwu.github.io/lua53doc/manual.html#pdf-math.min)|Minimum value|`math.min(2, 4, 6, 8)`|`2`|
|[`math.sqrt`](https://cloudwu.github.io/lua53doc/manual.html#pdf-math.sqrt)|Square root|`math.sqrt(65536)`|`256.0`|
|[`math.modf`](https://cloudwu.github.io/lua53doc/manual.html#pdf-math.modf)|Integer and fractional parts|`math.modf(20.12)`|`20 0.12`|
|[`math.randomseed`](https://cloudwu.github.io/lua53doc/manual.html#pdf-math.randomseed)|Set random seed|`math.randomseed(os.time())`||
|[`math.random`](https://cloudwu.github.io/lua53doc/manual.html#pdf-math.random)|Random number|`math.random(5, 90)`||
|[`math.rad`](https://cloudwu.github.io/lua53doc/manual.html#pdf-math.rad)|Degrees to radians|`math.rad(180)`|`3.1415926535898`|
|[`math.deg`](https://cloudwu.github.io/lua53doc/manual.html#pdf-math.deg)|Radians to degrees|`math.deg(math.pi)`|`180.0`|
|[`math.exp`](https://cloudwu.github.io/lua53doc/manual.html#pdf-math.exp)|Exponential function|`math.exp(4)`|`54.598150033144`|
|[`math.log`](https://cloudwu.github.io/lua53doc/manual.html#pdf-math.log)|Natural logarithm|`math.log(54.598150033144)`|`4.0`|
|[`math.sin`](https://cloudwu.github.io/lua53doc/manual.html#pdf-math.sin)|Sine|`math.sin(math.rad(30))`|`0.5`|
|[`math.cos`](https://cloudwu.github.io/lua53doc/manual.html#pdf-math.cos)|Cosine|`math.cos(math.rad(60))`|`0.5`|
|[`math.tan`](https://cloudwu.github.io/lua53doc/manual.html#pdf-math.tan)|Tangent|`math.tan(math.rad(45))`|`1.0`|
|[`math.asin`](https://cloudwu.github.io/lua53doc/manual.html#pdf-math.asin)|Arcsine|`math.deg(math.asin(0.5))`|`30.0`|
|[`math.acos`](https://cloudwu.github.io/lua53doc/manual.html#pdf-math.acos)|Arccosine|`math.deg(math.acos(0.5))`|`60.0`|
|[`math.atan`](https://cloudwu.github.io/lua53doc/manual.html#pdf-math.atan)|Arctangent|`math.deg(math.atan(1))`|`45.0`|
