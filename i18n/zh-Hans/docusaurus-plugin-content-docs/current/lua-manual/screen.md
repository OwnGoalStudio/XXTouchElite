---
sidebar_position: 4
---

# 屏幕模块

## 屏幕模块 - screen

* 标有 🌟 的函数调用会产生一个新的 [*图片对象*](img.md#图片对象)。
* 标有 📲 的函数调用在非 **屏幕保持状态** 时，会隐式获取当前屏幕内容，详见 [保持屏幕](#-保持屏幕-screenkeep)。

### 初始化旋转坐标系 \(**screen\.init**\)

#### 声明

```lua
原坐标系 = screen.init(坐标系)
```

#### 参数及返回值

* 坐标系 *枚举型*
  * `0` 表示竖屏 HOME 在下
  * `1` 表示横屏 HOME 在右
  * `2` 表示横屏 HOME 在左
  * `3` 表示竖屏 HOME 在上
* 原坐标系
  * *枚举型*，返回这个函数调用之前使用的坐标系

#### 说明

初始化 **屏幕模块** 和 **模拟触摸模块** 共享的坐标系。

:::info
使用以下别名调用也可以实现相同效果。

``` lua
screen.init_home_on_bottom()    -- HOME 在下
screen.init_home_on_right()     -- HOME 在右
screen.init_home_on_left()      -- HOME 在左
screen.init_home_on_top()       -- HOME 在上
```

:::

#### 示例

```lua title="screen.init"
screen.init(0)    -- HOME 在下
screen.init(1)    -- HOME 在右
screen.init(2)    -- HOME 在左
screen.init(3)    -- HOME 在上
```

### 获取旋转坐标系 \(**screen\.orientation**\)

#### 声明

```lua
坐标系 = screen.orientation()
```

#### 参数及返回值

* 坐标系 *枚举型*
  * `0` 表示竖屏 HOME 在下
  * `1` 表示横屏 HOME 在右
  * `2` 表示横屏 HOME 在左
  * `3` 表示竖屏 HOME 在上

#### 说明

获取当前 **屏幕模块** 和 **模拟触摸模块** 共享的坐标系。

:::note

* `screen.ORIENTATION_HOME_ON_BOTTOM` 表示竖屏 HOME 在下
* `screen.ORIENTATION_HOME_ON_RIGHT` 表示横屏 HOME 在右
* `screen.ORIENTATION_HOME_ON_LEFT` 表示横屏 HOME 在左
* `screen.ORIENTATION_HOME_ON_TOP` 表示竖屏 HOME 在上

:::

### 坐标旋转转换 \(**screen\.rotate\_xy**\)

#### 声明

```lua
旋转后的横坐标, 旋转后的纵坐标 = screen.rotate_xy(横坐标, 纵坐标, 旋转方向)
```

#### 参数及返回值

* 横坐标, 纵坐标
  * *整数型*，需要旋转的坐标
* 旋转方向 *整数型*
  * `0` 表示不旋转
  * `1` 表示往左 90 度旋转
  * `2` 表示往右 90 度旋转
  * `3` 表示 180 度旋转
* 旋转后的横坐标, 旋转后的纵坐标
  * *整数型*，返回使用 **旋转方向** 作为选项旋转后的坐标

#### 说明

坐标旋转转换，通常用于将竖屏坐标转换成横屏坐标。

#### 示例

```lua title="screen.rotate_xy"
rx, ry = screen.rotate_xy(100, 200, 1)
```

### 获取屏幕尺寸 \(**screen\.size**\)

#### 声明

```lua
屏宽, 屏高 = screen.size()
```

#### 参数及返回值

* 屏宽 *整数型*
* 屏高 *整数型*

#### 说明

经过 iOS 系统缩放、重采样后的屏幕尺寸，单位为 **像素（pixel）**。

:::info
返回值不受当前春板或者应用的的横竖屏状态影响，但是受 **放大模式** 影响。
:::

#### 示例

```lua title="screen.size"
-- 根据分辨率判断设备类型
local width, height = screen.size()
if width == 750 and height == 1334 then
  -- 标准模式的 iPhone 6S, 7, 8
elseif width == 640 and height == 1136 then
  -- 放大模式的 iPhone 6S, 7, 8
end
```

### 📲 保持屏幕 \(**screen\.keep**\)

#### 声明

```lua
获取屏幕内容计数 = screen.keep()
```

#### 参数及返回值

* 获取屏幕内容计数
  * *整数型*，返回当前[脚本进程](../basic-concepts/process-control-flow.md)获取屏幕内容的次数

#### 说明

在当前脚本进程中获取一份当前屏幕内容的副本，并进入 **屏幕保持状态**，**获取屏幕内容计数** 发生自增。

* 在 **屏幕保持状态** 下，多次调用取色、找色、截图或找图等 📲 函数，将持续基于保持的副本进行运算，而不会重复获取新的屏幕内容。
* 在 **屏幕保持状态** 下，**获取屏幕内容计数** 不会增加。
* 调用 [`screen.unkeep`](#退出屏幕保持状态-screenunkeep) 函数以退出 **屏幕保持状态**。

:::note
只会刷新标有 📲 的函数的数据来源，而 **不会** 导致真实屏幕画面卡住不动。
:::

#### 示例

```lua title="screen.keep"
screen.keep()    -- 保持屏幕
for k = 1, 640, 10 do
  for j = 1, 960, 10 do
    color = string.format("%X", screen.get_color(k, j))  -- 格式化为十六进制文本
    sys.log("("..k..", "..j..") Color: "..color..".")    -- 输出到系统日志
  end
end
screen.unkeep()  -- 退出屏幕保持状态
```

:::note

* 针对同一位置两行连续单独的 [`screen.get_color`](#-获取屏幕上某点颜色-screenget_color) 调用可能取到不同的值。
* `screen.keep` 的情况下 [`screen.get_color`](#-获取屏幕上某点颜色-screenget_color) 单独调用耗时会超过一次 `screen.keep` 的耗时。
* 调用 `screen.keep` 之后，再连续调用 50 次 [`screen.get_color`](#-获取屏幕上某点颜色-screenget_color) 耗时可以等同于调用一次 `screen.keep`

:::

### 退出屏幕保持状态 \(**screen\.unkeep**\)

#### 声明

```lua
获取屏幕内容计数 = screen.unkeep()
```

#### 参数及返回值

* 获取屏幕内容计数
  * *整数型*，返回当前[脚本进程](../basic-concepts/process-control-flow.md)获取屏幕内容的次数

#### 说明

取消 [`screen.keep`](#-保持屏幕-screenkeep) 函数的效果，退出 **屏幕保持状态**。  
退出 **屏幕保持状态** 后，每次调用取色、找色、截图或找图等 📲 函数，都会重新获取屏幕内容，**获取屏幕内容计数** 递增。

#### 示例

* [参考 `screen.keep` 示例](#-保持屏幕-screenkeep)

### 📲 获取屏幕上某点颜色 \(**screen\.get\_color**\)

#### 声明

```lua
颜色值 = screen.get_color(横坐标, 纵坐标)
```

#### 参数及返回值

* 横坐标, 纵坐标
  * *整数型*，代表目标点的坐标
* 颜色值
  * *整数型*，返回目标点颜色的 RGB 值

#### 示例

```lua title="screen.get_color"
local c = screen.get_color(512, 133)
if c == 0xffffff then
  sys.alert("坐标 (512,133) 是纯白色")
end
```

### 📲 获取屏幕上某点颜色 RGB \(**screen\.get\_color\_rgb**\)

#### 声明

```lua
红, 绿, 蓝 = screen.get_color_rgb(横坐标, 纵坐标)
```

#### 参数及返回值

* 横坐标, 纵坐标
  * *整数型*，代表目标点的坐标
* 红, 绿, 蓝
  * *整数型*，返回目标点颜色的 R、G、B 值，取值范围 0 ~ 255

#### 示例

```lua title="screen.get_color_rgb"
local r, g, b = screen.get_color_rgb(512, 133)
if r == 0xff and g == 0xff and b == 0xff then
  sys.alert("坐标 (512,133) 是纯白色")
end
```

### 📲 屏幕多点颜色匹配 \(**screen\.is\_colors**\)

#### 声明

```lua
是否完全匹配 = screen.is_colors({
    {横坐标*, 纵坐标*, 颜色*},
    {横坐标*, 纵坐标*, 颜色*},
    ...
}[, 颜色相似度])
```

#### 参数及返回值

* 横坐标\*, 纵坐标\*
  * *整数型*，代表其中某点坐标
* 颜色\*
  * *整数型*，代表其中某点需要匹配的颜色值
* 颜色相似度
  * *整数型*，*可选*，代表需要的颜色的相似度，取值范围 1 ~ 100，默认 `100`
* 是否完全匹配
  * *布尔型*，所有点的颜色都匹配则返回 `true`，否则返回 `false`

#### 说明

匹配屏幕上若干点的颜色。

#### 示例

```lua title="screen.is_colors"
if screen.is_colors({
  { 509, 488, 0xec1c23 },  -- 如果坐标 (509, 488) 的颜色与 0xec1c23 相似度在 90% 以上
  { 514, 470, 0x00adee },  -- 同时坐标 (514, 470) 的颜色与 0x00adee 相似度在 90% 以上
  { 508, 478, 0xffc823 },  -- 同时坐标 (508, 478) 的颜色与 0xffc823 相似度在 90% 以上
  { 511, 454, 0xa78217 },  -- 同时坐标 (511, 454) 的颜色与 0xa78217 相似度在 90% 以上
  { 521, 433, 0xd0d2d2 },  -- 同时坐标 (521, 433) 的颜色与 0xd0d2d2 相似度在 90% 以上
}, 90) then                -- 则匹配
  sys.alert("匹配！")
else
  sys.alert("不匹配！")
end
```

### 📲 多点相似度模式找色 \(**screen\.find\_color**\)

#### 声明

```lua
横坐标, 纵坐标 = screen.find_color({
    [find_all = 是否搜索多个结果],
    [max_results = 最大结果数],
    [max_miss = 允许最多未命中数],
    {起始点横坐标, 起始点纵坐标, 起始点颜色[, 起始点相似度]},
    {偏移点横坐标*, 偏移点纵坐标*, 偏移点颜色*[, 偏移点相似度*]},
    {偏移点横坐标*, 偏移点纵坐标*, 偏移点颜色*[, 偏移点相似度*]},
    ...
}[, 全局相似度, 左, 上, 右, 下])
```

#### 参数及返回值

* 是否搜索多个结果
  * *布尔型*，*可选*，这个标签设置为 `true` 会返回范围内所有匹配位置的一个表，格式为 `{{x1, y1}, {x2, y2}, ...}`，默认 `false`
* 最大结果数
  * *整数型*，*可选*，当 `find_all`（**是否搜索多个结果**）标签设置为 `true` 的时候，这个表示最多返回结果数，最多可以设为 `1000`，默认 `100`
* 允许最多未命中数
  * *整数型*，*可选*，可以允许最多的不匹配的点的数量，默认为 `0`，也就是全命中才算找到
* 起始点横坐标, 起始点纵坐标
  * *整数型*，代表起始坐标，它并不是限制找色的范围为固定这一点，而仅仅是给偏移位置一个相对坐标，不理解就填 `0, 0`
* 起始点颜色
  * *整数型*，代表需要搜索的那一点的颜色
* 起始点相似度
  * *整数型*，*可选*，需要搜索的那一点颜色的相似度，取值范围 1 ~ 100，默认 `100`
* 偏移点横坐标\*, 偏移点纵坐标\*
  * *整数型*，代表一个偏移位置坐标
* 偏移点颜色\*
  * *整数型*，代表偏移位置需要匹配的颜色
* 偏移点相似度\*
  * *整数型*，*可选*，偏移位置的颜色的相似度，取值范围 -100 ~ 100，默认 `100`，负相似度意味着匹配小于该绝对值的相似度
* 全局相似度
  * *整数型*，*可选*，如果没有给单个点设置相似度，那么每一点都会用这个相似度，取值范围 1 ~ 100，默认 `100`
* 左, 上, 右, 下
  * *整数型*，*可选*，搜索区域的左上角和右下角坐标，默认 **全屏**
* 横坐标, 纵坐标
  * *整数型*，返回匹配色的第一个色的坐标，搜索失败返回 `-1, -1`

#### 说明

使用相似度模式查找（模式匹配），获取区域中第一个完全匹配的多点颜色结构（模式）的位置。

:::note 不会吧，不会吧
不会有人[手写这个匹配表](../tutorial-extras/grab-screen-colors.mdx)吧？
:::

#### 示例

```lua title="screen.find_color"
x, y = screen.find_color({
  {  0,   0, 0xec1c23 },
  { 12,  -3, 0xffffff, 85 },
  {  5, -18, 0x00adee },
  { -1, -10, 0xffc823 },
  {  2, -34, 0xa78217 },
  { 12, -55, 0xd0d2d2 },
}, 90, 0, 0, 100, 100)
--
--[[
  在左上为 0, 0 右下为 100, 100 的区域找到第一点与 0xec1c23 相似度大于 90 
  且它的相对坐标 (12, -3) 的位置的颜色与 0xffffff 相似度大于 85
  且它的相对坐标 (5, -18) 的位置的颜色与 0x00adee 相似度大于 90 
  且 …（后面的同理）都能匹配的那个点
--]]
--
-- 等效代码如下：
--
x, y = screen.find_color({
  { 509, 488, 0xec1c23 },
  { 521, 485, 0xffffff, 85 },
  { 514, 470, 0x00adee },
  { 508, 478, 0xffc823 },
  { 511, 454, 0xa78217 },
  { 521, 433, 0xd0d2d2 },
}, 90, 0, 0, 100, 100)
--
--[[
  在左上为 0, 0 右下为 100, 100 的区域找到第一点与 0xec1c23 相似度大于 90 
  且它的相对坐标 (521-509, 485-488) 的位置的颜色与 0xffffff 相似度大于 85 
  且它的相对坐标 (514-509, 470-488) 的位置的颜色与 0x00adee 相似度大于 90 
  且 …（后面的同理）都能匹配的那个点
--]]
--
-- 不换行无缩进就是这个效果：
x, y = screen.find_color({ {0,0,0xec1c23},{12,-3,0xffffff,85},{5,-18,0x00adee},{-1,-10,0xffc823},{2,-34,0xa78217},{12,-55,0xd0d2d2} }, 90, 0, 0, 100, 100)
--
x, y = screen.find_color({  -- 反匹配演示，在 5C 主屏幕运行可获得结果
  { 516,  288, 0xffffff },
  { 519,  286, 0xffffff },
  { 521,  289, 0xffffff },
  { 516,  296, 0xffffff },
  { 522,  297, 0xffffff },
  { 520,  295, 0xffffff, -10 },  -- 这一点颜色与 0xffffff 相似度小于 10 才匹配，下同
  { 515,  291, 0xffffff, -10 },
  { 518,  284, 0xffffff, -10 },
  { 523,  298, 0xffffff, -10 },
  { 514,  298, 0xffffff, -10 },
  { 514,  296, 0xffffff, -10 },
}, 90)  -- 不写区域参数表示全屏找
--
results = screen.find_color({  -- 范围匹配全输出演示
  {  527,  278, 0xde1d26 },
  {  524,  285, 0x007aff },
  {  555,  292, 0xe4ddc9 },
  {  536,  314, 0xffde02 },
  {  502,  291, 0xffde02 },
  {  502,  283, 0xe4ddc9 },
  find_all = true,  -- 带这个标签将返回范围所有匹配的位置的一个表，格式为 { {x1, y1}, {x2, y2}, ... }
}, 90)  -- 不写区域参数表示全屏找
```

### 📲 多点色偏模式找色 \(**screen\.find\_color**\)

#### 声明

```lua
横坐标, 纵坐标 = screen.find_color({
    [find_all = 是否搜索多个结果],
    [max_results = 最大结果数],
    [max_miss = 允许最多未命中数],
    {起始点横坐标, 起始点纵坐标, {起始点颜色[, 起始点色偏]}},
    {偏移点横坐标*, 偏移点纵坐标*, {偏移点颜色*, 偏移点色偏*}},
    {偏移点横坐标*, 偏移点纵坐标*, {偏移点颜色*, 偏移点色偏*}},
    ...
}[, 左, 上, 右, 下])
```

#### 参数及返回值

* 是否搜索多个结果
  * *布尔型*，*可选*，这个标签设置为 `true` 会返回范围内所有匹配位置的一个表，格式为 `{{x1, y1}, {x2, y2}, ...}`，默认 `false`
* 最大结果数
  * *整数型*，*可选*，当 `find_all`（**是否搜索多个结果**）标签设置为 `true` 的时候，这个表示最多返回结果数，最多可以设为 `1000`，默认 `100`
* 允许最多未命中数
  * *整数型*，*可选*，可以允许最多的不匹配的点的数量，默认为 `0`，也就是全命中才算找到
* 起始点横坐标, 起始点纵坐标
  * *整数型*，代表起始坐标，它并不是限制找色的范围为固定这一点，而仅仅是给偏移位置一个相对坐标，不理解就填 `0, 0`
* 起始点颜色
  * *整数型*，代表需要搜索的那一点的颜色
* 起始点色偏
  * *整数型*，需要搜索的颜色的最大色偏，大于 `0xff000000` 则为反匹配模式
* 偏移点横坐标\*, 偏移点纵坐标\*
  * *整数型*，代表一个偏移位置坐标
* 偏移点颜色\*
  * *整数型*，代表偏移位置需要匹配的颜色
* 偏移点色偏\*
  * *整数型*，偏移位置的颜色的色偏，大于 `0xff000000` 则为反匹配模式
* 左, 上, 右, 下
  * *整数型*，*可选*，搜索区域的左上角和右下角坐标，默认 **全屏**
* 横坐标, 纵坐标
  * *整数型*，返回匹配色的第一个色的坐标，搜索失败返回 `-1, -1`

#### 说明

使用色偏模式查找（模式匹配），获取区域中第一个完全匹配的多点颜色结构（模式）的位置。

:::note
**色偏（或偏色）** 用于表示颜色偏差范围，一个颜色附带色偏是指该颜色的红、绿、蓝偏移范围内的所有颜色。  
当 `0x456789` 色偏为 `0x123456` 的时候表示 `0x456789` 的红正负范围 `0x12`、绿正负范围 `0x34`、蓝正负范围 `0x56`，也就是其红色范围为 `0x45 ± 0x12`、绿色范围为 `0x67 ± 0x34`、蓝色的范围为 `0x89 ± 0x56`。  
如下表所述，`{0x456789, 0x123456}` 表示从 `0x333333` 到 `0x579BDF` 之间所有的颜色。

| 负偏移 | 正偏移 |
|-------|-------|
| 0x45 \- 0x12 = 0x33 | 0x45 \+ 0x12 = 0x57 |
| 0x67 \- 0x34 = 0x33 | 0x67 \+ 0x12 = 0x9B |
| 0x89 \- 0x56 = 0x33 | 0x89 \+ 0x12 = 0xDF |

:::

#### 示例

```lua title="screen.find_color"
x, y = screen.find_color({
  {  0,   0, {0xec1c23, 0x000000} },
  { 12,  -3, {0xffffff, 0x101010} },
  {  5, -18, {0x00adee, 0x123456} },
  { -1, -10, {0xffc823, 0x101001} },
  {  2, -34, {0xa78217, 0x101001} },
  { 12, -55, {0xd0d2d2, 0x101001} },
}, 0, 0, 100, 100)
--
--[[
  在左上为 0, 0 右下为 100, 100 的区域找到第一点与 0xec1c23 完全相似（色偏为 0）
  且它的相对坐标 (12, -3) 的位置的颜色与 0xffffff 的色偏小于 0x101010
  且它的相对坐标 (5, -18) 的位置的颜色与 0x00adee 色偏小于 0x123456
  且 …（后面的同理）都能匹配的那个点
--]]
--
-- 等效代码如下：
--
x, y = screen.find_color({
  { 509, 488, {0xec1c23, 0x000000} },
  { 521, 485, {0xffffff, 0x101010} },
  { 514, 470, {0x00adee, 0x123456} },
  { 508, 478, {0xffc823, 0x101001} },
  { 511, 454, {0xa78217, 0x101001} },
  { 521, 433, {0xd0d2d2, 0x101001} },
}, 0, 0, 100, 100)
--
--[[
  在左上为 0, 0 右下为 100, 100 的区域找到第一点与 0xec1c23 完全相似（色偏为 0）
  且它的相对坐标 (521-509, 485-488) 的位置的颜色与 0xffffff 的色偏小于 0x101010
  且它的相对坐标 (514-509, 470-488) 的位置的颜色与 0x00adee 色偏小于 0x123456
  且 …（后面的同理）都能匹配的那个点
--]]
--
-- 不换行无缩进就是这个效果：
x, y = screen.find_color({ {0,0,{0xec1c23,0x000000}},{12,-3,{0xffffff,0x101010}},{5,-18,{0x00adee,0x123456}},{-1,-10,{0xffc823,0x101001}},{2,-34,{0xa78217,0x101001}},{12,-55,{0xd0d2d2,0x101001}} }, 0, 0, 100, 100)
--
x, y = screen.find_color({  -- 反匹配演示，在 5C 主屏幕运行可获得结果
  { 516,  288, {0xffffff, 0x101010} },
  { 519,  286, {0xffffff, 0x101010} },
  { 521,  289, {0xffffff, 0x101010} },
  { 516,  296, {0xffffff, 0x101010} },
  { 522,  297, {0xffffff, 0x101010} },
  { 520,  295, {0xffffff, 0xff101010} },  -- 这一点颜色与 0xffffff 色差大于 0x101010 才匹配，下同
  { 515,  291, {0xffffff, 0xff101010} },
  { 518,  284, {0xffffff, 0xff101010} },
  { 523,  298, {0xffffff, 0xff101010} },
  { 514,  298, {0xffffff, 0xff101010} },
  { 514,  296, {0xffffff, 0xff101010} },
})  -- 不写区域参数表示全屏找
--
results = screen.find_color({  -- 范围匹配全输出演示
  {  527,  278, {0xde1d26, 0x101010} },
  {  524,  285, {0x007aff, 0x101010} },
  {  555,  292, {0xe4ddc9, 0x101010} },
  {  536,  314, {0xffde02, 0x101010} },
  {  502,  291, {0xffde02, 0x101010} },
  {  502,  283, {0xe4ddc9, 0x101010} },
  find_all = true,  -- 带这个标签将返回范围所有匹配的位置的一个表，格式为 { {x1, y1}, {x2, y2}, ... }
})  -- 不写区域参数表示全屏找
```

### 📲🌟 获取屏幕内容 \(**screen\.image**\)

#### 声明

```lua
屏幕内容 = screen.image([ 左, 上, 右, 下 ])
```

#### 参数及返回值

* 左, 上, 右, 下
  * *整数型*，*可选*，代表欲截取的屏幕区域，默认 **全屏**
* 屏幕内容 [*图片对象*](img.md#图片对象)

#### 说明

获取屏幕上部分区域的内容或全部内容。

:::caution 性能
产生一个新的 *图片对象*。  
不再使用该对象时请务必调用 [`image:destroy`](img.md#销毁一个图片对象-imagedestroy) 方法，及时释放其占用的内存。
:::

#### 示例

```lua title="screen.image"
screen.image():save_to_album()  -- 全屏截图并保存到相册
--
screen.image():save_to_png_file("/var/mobile/1.png")  -- 全屏截图并保存到文件 /var/mobile/1.png
--
screen.image(100, 100, 200, 200):save_to_album()  -- 截取左上坐标为 100, 100 右下坐标为 200, 200 的屏幕区域内容，并保存到相册
--
pasteboard.write(screen.image(100, 100, 200, 200):png_data(), "public.png")  -- 截取左上坐标为 100, 100 右下坐标为 200, 200 的屏幕区域内容，并写入到剪贴板
```

### 📲 屏幕找图 \(**screen\.find\_image**\)

#### 声明

```lua
横坐标, 纵坐标, 结果相似度 = screen.find_image(子图像[, 相似度, 左, 上, 右, 下])
```

#### 参数及返回值

* 子图像
  * [*图片对象*](img.md#图片对象)
  * *文本型*
    * 需要找的图片文件路径，如果不是合法路径则会以 *字符串型* 数据方式解析
  * *字符串型*
    * 需要找的图片数据，可以是 `png` 或 `jpeg` 等格式
* 相似度
  * *整数型*，*可选*，需要找的子图的相似度，取值范围 1 ~ 100，默认为 `95`
* 左, 上, 右, 下
  * *整数型*，*可选*，搜索区域的左上角和右下角坐标，默认 **全屏**
* 横坐标, 纵坐标
  * *整数型*，返回找到的子图左上角坐标，搜索失败返回 `-1, -1`
* 结果相似度
  * *整数型*，返回找到的子图与传入 **子图像** 的相似度，取值范围 1 ~ 100，搜索失败返回 `0`

#### 说明

在屏幕上寻找一个 **子图像** 的位置。  
对 **子图像** 进行多比例缩放调整，缩放比例从 100% 至 20% 递减，以提高搜索的成功率。

:::caution 局限性
如果需要做多分辨率兼容，建议在分辨率最小的设备上截图取样。大分辨率上截取的子图会无法在小分辨率设备上找到。
:::

#### 示例 1

```lua title="screen.find_image"
x, y = screen.find_image(  -- 原图位置 左上: 354, 274 | 右下: 358, 284
"\x89\x50\x4e\x47\x0d\x0a\x1a\x0a\x00\x00\x00\x0d\x49\x48\x44\x52\x00\x00\x00\x04\x00\x00\x00\x0a\x08\x02\x00\x00\x00\x1c\x99\x68\x59\x00\x00\x00\x61\x49\x44\x41\x54\x78\xda\x63\x78\xfd\xf4\xda\xff\xff\xff\xff\xfd\xfb\xf7\xed\xcb\x5b\x86\xf7\xaf\x1f\xfc\x87\x01\x86\x2f\x1f\x5f\x02\xa9\xef\xa7\xce\x7c\xdd\xb1\x9b\xe1\xe7\xf7\xcf\x40\xce\xeb\xb2\xea\x7b\xb2\x6a\x0c\x7f\xff\xfe\x01\x72\x9e\x78\x06\x82\x38\x20\xdd\xbf\x7e\xdd\x57\xd4\x82\x72\x7e\xdd\xba\x0d\x64\x41\x39\x08\xd3\x80\x38\x6b\xe3\x7f\x86\x2a\x30\x02\x72\x8c\xa6\x40\x39\x00\xd5\x7b\x5f\x2e\xfd\xba\xd5\x32\x00\x00\x00\x00\x49\x45\x4e\x44\xae\x42\x60\x82", 95, 0, 0, 639, 1135)
```

:::note
在 Lua 源码中，字符串中 `\x` 开头，后面跟两位 16 进制数表示以该数字编码的单个字节。例如：`\x58` 表示 `X` 这个字符。
:::

#### 示例 2

```lua title="screen.find_image"
img = image.load_file("/var/mobile/1.png")
x, y = screen.find_image(img)      -- 在全屏范围内找图
x, y = screen.find_image(img, 85)  -- 在全屏范围内找图，相似度 85%
```

#### 示例 3

```lua title="screen.find_image"
x, y = screen.find_image("/var/mobile/1.png", 95, 0, 0, 639, 1135)  -- 在指定区域找图
```

#### 示例 4

```lua title="screen.find_image"
local img = image.load_file("/Applications/MobileSafari.app/AppIcon60x60@2x.png")
if img then
  x, y = screen.find_image(img, 80)  -- 在全屏范围内找图，相似度 80%
  if x ~= -1 then
    touch.tap(x, y)
  else
    sys.alert("没有在屏幕上找到 Safari 图标")
  end
else
  sys.alert("无法读取 Safari 图标")
end
```

### 📲 屏幕光学字符识别 \(**screen\.ocr\_text**)

#### 声明 1

```lua
结果文本列表, 结果详情表 = screen.ocr_text {
  left = 左, top = 上, right = 右, bottom = 下,
  languages = 语言列表,
  words = 备选词列表,
  confidence = 最低置信度,
  level = 识别等级,
  timeout = 超时时间
}
```

#### 声明 2

```lua
结果文本列表, 结果详情表 = screen.ocr_text([ 识别等级, 超时时间 ])
```

#### 声明 3

```lua
结果文本列表, 结果详情表 = screen.ocr_text(左, 上, 右, 下[, 识别等级, 超时时间])
```

#### 参数及返回值

* 左, 上, 右, 下
  * *整数型*，*可选*，识别区域的左上角和右下角坐标。默认 **全屏**
* 语言列表
  * *枚举型顺序表*，*可选*，识别语言列表，默认为 `{ "en-US" }`
    * 英文 `en-US`
    * 简体中文 `zh-Hans`
* 备选词列表
  * *文本型顺序表*，*可选*，用于提高识别准确率。默认 `{ }`
* 最低置信度
  * *整数型*，*可选*，识别结果的最低置信度，置信度低于此值的可能结果会被排除。取值范围 0.0 ~ 1.0，默认为 `0.0`
* 识别等级 *枚举型*，*可选*
  * `0` 表示精确识别，识别结果较为准确，但速度较慢，默认值
  * `1` 表示快速识别，识别结果较为模糊，但速度较快
* 超时时间
  * *整数型*，*可选*，超时时间，单位为毫秒。默认为 `3000`
* 结果文本列表
  * *文本型顺序表*，从上至下的识别结果文本列表，未能在指定区域内识别到文本时返回空表
* 结果详情表
  * *顺序表*，每个元素是一个 *关联表*，与 **结果文本列表** 中文本一一对应，包含以下字段：
    * `center` *顺序表*，识别结果中心坐标 `{ x, y }`
    * `bounding_box` *顺序表*，识别结果边界框 `{ x1, y1, x2, y2 }`
    * `confidence` *浮点型*，识别结果置信度，取值范围 0.0 ~ 1.0
    * `recognized_text` *文本型*，识别结果文本

```lua title="结果详情表结构"
{
  [1] = {
    confidence = 0.5,
    center = { [1] = 107, [2] = 289 },
    bounding_box = {
      [1] = 32,
      [2] = 276,
      [3] = 181,
      [4] = 303,
    },
    recognized_text = "Bluetooth",
  },
  [2] = {
    confidence = 1.0,
    center = { [1] = 337, [2] = 603 },
    bounding_box = {
      [1] = 31,
      [2] = 588,
      [3] = 644,
      [4] = 618,
    },
    recognized_text = "To pair an Apple Watch with your iPhone, go to the",
  },
  ...
}
```

#### 说明

采用 Apple 提供的 [Vision](https://developer.apple.com/documentation/vision) 框架，在屏幕或图像上进行文字识别，支持英文和简体中文。

:::note
快速识别等级下，识别速度约为精确识别的 10 倍，但识别结果较为模糊，经常会出现识别错误的情况。
:::

#### [屏幕文字提取教程](../tutorial-extras/vision-ocr.mdx)

#### 示例 `screen.ocr_search`

```lua title="screen.ocr_search"
screen.ocr_search = function (needle, level)
  if level == nil then
    level = 0
  end
  local center = nil
  local _, details = screen.ocr_text(level)
  for _, v in ipairs(details) do
    if v["recognized_text"] == needle then
      center = v["center"]
      break
    end
  end
  if center == nil then
    return -1, -1  -- not found
  end
  return center[1], center[2]
end
```

#### 示例 `screen.ocr_match`

```lua title="screen.ocr_match"
screen.ocr_match = function (pattern, level)
  if level == nil then
    level = 0
  end
  local center = nil
  local _, details = screen.ocr_text(level)
  for _, v in ipairs(details) do
    if string.match(v["recognized_text"], pattern) then
      center = v["center"]
      break
    end
  end
  if center == nil then
    return -1, -1  -- not found
  end
  return center[1], center[2]
end
```

### 📲 Tesseract 屏幕光学字符识别 \(**screen.tess\_ocr**\)

#### 声明 1

```lua
require("image.tesseract")  -- 需要提前加载
--
识别结果, 结果详情 = screen.tess_ocr([{
  [lang = 字库名称,]
  [white_list = 白名单,]
  [black_list = 黑名单,]
  [left   = 左,]
  [top    = 上,]
  [right  = 右,]
  [bottom = 下,]
}])
```

#### 声明 2

```lua
require("image.tesseract")  -- 需要提前加载
--
识别结果, 结果详情 = screen.tess_ocr([ 字库名称 ])
```

#### 参数及返回值

* 字库名称
  * *文本型*，*可选*，默认 `"eng"`
* 白名单
  * *文本型*，*可选*，只允许展示的字符白名单
* 黑名单
  * *文本型*，*可选*，只过滤的字符黑名单
* 左, 上, 右, 下
  * *整数型*，*可选*，识别区域的左上角和右下角坐标，默认 **全屏**
* 识别结果 *文本型*
* 结果详情
  * *关联表*，**识别结果** 的每个可见字符的位置描述

```lua title="结果详情表结构"
{
  [1] = {
    confidence = 96.23314666748,
    h = 20,
    x = 64,
    y = 35,
    w = 14,
    text = "7",
  },
  [2] = {
    confidence = 74.24723815918,
    h = 15,
    x = 81,
    y = 38,
    w = 5,
    text = "1",
  },
  ...
}
```

#### 说明

* **白名单** 和 **黑名单** 不可同时存在，优先使用 **白名单**。
* Tesseract OCR 字库可从 [tesseract-ocr/tessdata](https://github.com/tesseract-ocr/tessdata) 获取，也可以自行训练。
* 准备好字库文件，导入到字库文件到设备的 `/var/mobile/Media/1ferver/tessdata` 目录即可使用。

#### 示例

```lua title="screen.tess_ocr"
require("image.tesseract")         -- 需要提前加载
--
text = screen.tess_ocr()           -- 默认为 "eng"，英文识别
--
text = screen.tess_ocr('chi_sim')  -- 简体中文识别
--
text = screen.tess_ocr {
  lang = "eng",                  -- 英文字库
  white_list = "0123456789",     -- 白名单
}
--
text = screen.tess_ocr {
  lang = "eng",                  -- 英文字库
  black_list = "abcdefghijk",    -- 黑名单
}
--
text = screen.tess_ocr {
  lang = "chi_sim",              -- 简体中文字库
  white_list = "0123456789.元",  -- 白名单
}
```

### 📲 屏幕二维码识别 \(**screen\.qr\_decode**)

#### 声明

```lua
识别结果文本, 结果详情表 = screen.qr_decode([ 超时时间 ])
```

#### 参数及返回值

* 超时时间
  * *整数型*，*可选*，超时时间，单位毫秒。默认 `3000`
* 识别结果文本
  * *文本型*，未能在超时时间内识别到二维码时返回 `nil`
* 结果详情表 *关联表*
  * `center` *顺序表*，识别结果中心在屏幕或图像上的坐标 `{ x, y }`
  * `bounding_box` *顺序表*，识别结果在屏幕或图像上的边界框 `{ x1, y1, x2, y2 }`
  * `confidence` *浮点型*，识别结果置信度，取值范围 0.0 ~ 1.0
  * `payload` *文本型*，**识别结果文本**

#### 说明

采用 Apple 提供的 [Vision](https://developer.apple.com/documentation/vision) 框架，在屏幕或图像上进行二维码识别。  
检测屏幕或图像上出现的第一个完整二维码，并进行解码。**识别结果文本** 为解码二维码得到的 `UTF-8` 文本内容。

#### 示例：解码一个本地二维码图片文件

```lua title="image:qr_decode"
local img = image.load_file("/var/mobile/qr.png")
if img then
  local str = img:qr_decode()
  img:destroy()
  if str then
    sys.alert("识别成功\n识别结果是："..str)
  else
    sys.alert("识别失败")
  end
else
  sys.alert("图片文件加载失败，文件或许不存在")
end
```

#### 示例：解码当前屏幕上显示的二维码

```lua title="screen.qr_decode"
local str = screen.qr_decode()
if str then
  sys.alert("识别成功\n识别结果是："..str)
else
  sys.alert("识别失败")
end
```

### 📲 屏幕矩形检测 \(**screen\.detect\_rectangles**)

#### 声明 1

```lua
矩形位置表, 结果详情表 = screen.detect_rectangles {
  left = 左, top = 上, right = 右, bottom = 下,
  minRatio = 最小宽高比,
  maxRatio = 最大宽高比,
  minSize = 最小尺寸比,
  quadTolerance = 最大倾角,
  confidence = 最低置信度,
  maxCount = 最大结果数,
  timeout = 超时时间
}
```

#### 声明 2

```lua
矩形位置表, 结果详情表 = screen.detect_rectangles([ 最大结果数, 超时时间 ])
```

#### 声明 3

```lua
矩形位置表, 结果详情表 = screen.detect_rectangles(左, 上, 右, 下[, 最大结果数, 超时时间])
```

#### 参数及返回值

* 左、上、右、下
  * *整数型*，*可选*，检测区域的左上角和右下角坐标。默认 **全屏**
* 最小宽高比、最大宽高比
  * *数值型*，*可选*，识别到的矩形的短边与长边的比值，宽高比不在此范围内的矩形将被排除。取值范围 0.0 ~ 1.0，默认为 `0.1`、`1.0`
* 最小尺寸比
  * *数值型*，*可选*，识别到的矩形的面积与屏幕或图像面积的比值，尺寸较小的矩形将被排除。取值范围 0.0 ~ 1.0，默认为 `0.2`
* 最大倾角
  * *数值型*，*可选*，识别到的矩形的最大倾斜角度，倾斜角大于此值的可能矩形会被排除。取值范围 0.0 ~ 45.0，默认为 `30.0`
* 最低置信度
  * *数值型*，*可选*，识别到矩形的最低置信度，置信度低于此值的可能矩形会被排除。取值范围 0.0 ~ 1.0，默认为 `0.0`
* 最大结果数
  * *整数型*，*可选*，最多返回的矩形数量。默认为 `1`
* 超时时间
  * *整数型*，*可选*，超时时间，单位为毫秒。默认为 `3000`
* 矩形位置表
  * *表型*，返回的矩形位置表，每个元素是一个 *数值型顺序表*，包含八个 *数值型* 元素，分别对应识别到的矩形的四个顶点坐标，顺序为左上、右上、左下、右下
* 结果详情表
  * *顺序表*，每个元素是一个 *关联表*，与 **矩形位置表** 中的元素一一对应，包含以下字段：
    * `center` *顺序表*，识别结果中心在屏幕或图像上的坐标 `{ x, y }`
    * `bounding_box` *顺序表*，识别结果在屏幕或图像上的边界框 `{ x1, y1, x2, y2 }`
    * `confidence` *浮点型*，识别结果置信度，取值范围 0.0 ~ 1.0
    * `payload` *数值型顺序表*，包含八个 *数值型* 元素，分别对应识别到的矩形的四个顶点坐标，顺序为左上、右上、左下、右下

```lua title="结果详情表结构"
{
  [1] = {
    confidence = 1.0,
    center = { [1] = 372, [2] = 643 },
    bounding_box = {
      [1] = 36,
      [2] = 414,
      [3] = 708,
      [4] = 872,
    },
    payload = {
      [1] = 35.81475187093,
      [2] = 572.14322209358,
      [3] = 548.85265231133,
      [4] = 413.79873716831,
      [5] = 139.88665491343,
      [6] = 872.24944245815,
      [7] = 707.94005692005,
      [8] = 675.78785139322,
    },
  },
  ...
}
```

#### 说明

采用 Apple 提供的 [Vision](https://developer.apple.com/documentation/vision) 框架，检测屏幕或图像上的八自由度矩形（四边形）。

#### 示例：截取屏幕上的卡片并保存到相册

```lua title="screen.detect_rectangles"
rects, details = screen.detect_rectangles()
if #rects > 0 then
  local box = details[1].bounding_box
  screen.image(box[1], box[2], box[3], box[4]):save_to_album()
end
```
