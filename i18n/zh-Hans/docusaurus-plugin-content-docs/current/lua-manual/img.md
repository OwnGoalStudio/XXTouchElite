---
sidebar_position: 5
---

# 图像模块

## 图像模块 - image

标有 🌟 的函数调用会产生一个新的 [*图片对象*](#图片对象)，而不会修改原始图片对象。

:::caution 性能
不再使用图片对象时请务必调用 [`image:destroy`](#销毁一个图片对象-image) 方法，及时释放其占用的内存。
:::

### 图片对象

*图片对象* 是一种 [Lua *用户数据*](https://cloudwu.github.io/lua53doc/manual.html#2.1)，包含了图片的宽度、高度、通道数、数据等信息。

### 判断一个值是否为图片对象 \(**image\.is**\)

#### 声明

```lua
是否为图片对象 = image.is(需要判断的值)
```

#### 参数及返回值

- 需要判断的值 *任意类型*
- 是否为图片对象 *布尔型*

### 🌟 创建指定尺寸空白图片对象 \(**image\.new**\)

#### 声明

```lua
图像 = image.new(宽, 高)
```

#### 参数及返回值

- 宽, 高
  - *整数型*，新建的图片对象的宽, 高
- 图像 *图片对象*

#### 说明

创建空白图片对象，默认这图像上所有的点的颜色皆为黑色 `0x000000`。

### 🌟 新建一个文本图片对象 \(**image\.new\_text\_image**\)

#### 声明

```lua
图像 = image.new_text_image(文本[, {
  font = 字体,
  size = 字体大小,
  color = 字体颜色,
  alpha = 字体不透明度,
  back_color = 背景色,
  back_alpha = 背景不透明度,
}])
```

#### 参数及返回值

- 文本
  - *文本型*，需要绘制的文本内容
- 字体
  - *文本型*，*可选*，需要绘制的文本的字体，默认 `"Arial"`
- 字体大小
  - *实数型*，*可选*，需要绘制的文本的字体大小，默认 `20.0`
- 字体颜色
  - *整数型*，*可选*，需要绘制的文本的字体颜色，默认白色 `0xffffff`
- 字体不透明度
  - *整数型*，*可选*，需要绘制的文本的字体不透明度，范围 0 ~ 255，默认 `255`
- 背景色
  - *整数型*，*可选*，图片背景色，默认黑色 `0x000000`
- 背景不透明度
  - *整数型*，*可选*，图片背景不透明度，范围 0 ~ 255，默认 `255`
- 图像 *图片对象*

#### 说明

新建一个指定尺寸的图片对象，并将文本绘制其上。

### 🌟 从文件创建图片对象 \(**image\.load\_file**\)

#### 声明

```lua
图像 = image.load_file(文件路径)
```

#### 参数及返回值

- 文件路径 *文本型*
- 图像
  - *图片对象*，如果文件不存在则返回 `nil`

#### 示例

- [将文件转存到相册](#示例将文件转存到相册)

### 🌟 从数据创建图片对象 \(**image\.load\_data**\)

#### 声明

```lua
图像 = image.load_data(图像数据)
```

#### 参数及返回值

- 图像数据
  - *字符串型*，`png` 或 `jpeg` 等格式的图片数据
- 图像
  - *图片对象*，如果数据不是图像格式则返回 `nil`

#### 示例

- [从网上下载个小图片直接转存到相册](#示例从网上下载个小图片直接转存到相册)

### 🌟 将文本编码成二维码图片 \(**image\.qr\_encode**\)

#### 声明

```lua
图像 = image.qr_encode(文本内容[, {
  size = 尺寸,
  fill_color = 填充颜色,
  background_color = 背景颜色,
}])
```

#### 参数及返回值

- 文本内容
  - *文本型*，需要编码成二维码的文本内容
- 尺寸
  - *整数型*，*可选*，需要编码成二维码的边长，默认 `320`
- 填充颜色
  - *整数型*，*可选*，默认黑色不透明 `0xff000000`
- 背景颜色
  - *整数型*，*可选*，默认白色不透明 `0xffffffff`
- 图像 *图片对象*

#### 说明

将文本编码成一个指定尺寸背景色透明的二维码图片。

#### 示例

```lua title="image.qr_encode"
-- 生成一个尺寸为 320 蓝色的二维码存到相册
local img = image.qr_encode("https://github.com/", {
  size = 320,
  fill_color = 0xff409bff,
  background_color = 0xff308bef,
})
img:save_to_album()
```

### 图像拼接 \(**image\.oper\_merge**\)

#### 声明

```lua
操作成败 = image.oper_merge(图片文件名数组, 输出路径[, 拼接方向, 生成质量])
```

#### 参数及返回值

- 图片文件名数组
  - *文本型顺序表*，需拼接图片的文件名列表，支持使用绝对路径
- 输出路径
  - *文本型*，生成新图片的文件名，支持使用绝对路径
- 拼接方向 *整数型*，*可选*
  - `0` 横向拼接，默认值
  - `1` 竖向拼接
- 生成质量
  - *实数型*，*可选*，当生成图片格式为 `jpg` 时，可控制图片质量。范围 0.0 ~ 1.0，默认为 `1.0`
- 操作成败 *整数型*
  - `0` 成功
  - *其他值* 失败

#### 说明

合并结果的默认保存路径为 `/var/mobile/Media/1ferver/res`，自建目录请填写相对路径。

#### 示例

```lua
image.oper_merge({"1.png","2.png","3.png"}, "4.jpg", 0, 0.5)
```

### 导入一个图片文件到相册 \(**image\.image\_to\_album**\)

#### 声明

```lua
image.image_to_album(图片文件路径)
```

#### 参数及返回值

- 图片文件路径
  - *文本型*，支持的格式有 `png`、`jpeg`、`heic` 等

### 导入一个视频文件到相册 \(**image\.video\_to\_album**\)

#### 声明

```lua
image.video_to_album(视频文件路径)
```

#### 参数及返回值

- 视频文件路径
  - *文本型*，支持的格式有 `mp4`、`m4v`、`mov` 等

### 获取图片对象的尺寸 \(**image\:size**\)

#### 声明

```lua
宽, 高 = 图像:size()
```

#### 参数及返回值

- 图像 *图片对象*
- 宽, 高
  - *整数型*，当前操作的图片对象的宽与高

#### 说明

获取图片对象的尺寸，旋转会发生改变。

#### 示例

```lua title="image:size"
local img = image.load_file("/var/mobile/1.png")
local w, h
w, h = img:size()
sys.alert("图像的宽："..w.."\n图像的高："..h)
img:turn_left()
w, h = img:size()
sys.alert("逆时针旋转后，图像的宽："..w.."\n图像的高："..h)
```

### 🌟 从图片对象创建拷贝图片对象 \(**image\:copy**\)

#### 声明

```lua
图像2 = 图像1:copy()
```

#### 参数及返回值

- 图像1
  - *图片对象*，原始图片对象
- 图像2
  - *图片对象*，新建的图片对象

#### 示例

```lua title="image.copy"
scrn = screen.image()
img2 = scrn:copy()
```

### 🌟 截取部分区域新建图片对象 \(**image\:crop**\)

#### 声明

```lua
图像2 = 图像1:crop([左, 上, 右, 下])
```

#### 参数及返回值

- 图像1
  - *图片对象*，原始图片对象
- 左, 上, 右, 下
  - *整数型*，*可选*，原始图像中的区域左上右下坐标，默认 **尺寸与原图一致**
- 图像2
  - *图片对象*，新建的图片对象

#### 示例

```lua title="image:crop"
scrn = screen.image()
img2 = scrn:crop(100, 100, 200, 200)
```

### 销毁一个图片对象 \(**image\:destroy**\)

#### 声明

```lua
图像:destroy()
```

#### 参数及返回值

- 图像 *图片对象*

#### 说明

立即释放图片对象的内存占用，被销毁的图片对象不能再使用。

:::caution 性能
在频繁创建新图片对象的情形下，请**务必**调用此方法销毁掉不再使用的图片对象，防止内存占用过高而导致卡死崩溃等问题。  
Lua 自带的垃圾回收机制也会每隔一段时间收集不再使用的图像对象，并将它们销毁。
:::

#### 示例

```lua title="image:destroy"
sys.alert("点击确定1秒后开始监控屏幕状态")
--
sys.msleep(1000)
--
local img = screen.image()
while 1 do
  local scn = screen.image()
  local x, y, s = scn:find_image(img)
  scn:destroy()
  if s < 95 then
    break
  end
  sys.msleep(10)
end
--
sys.alert("屏幕动了")
```

### 保存图片对象到相册 \(**image\:save\_to\_album**\)

#### 声明

```lua
图像:save_to_album()
```

#### 参数及返回值

- 图像 *图片对象*

#### 示例：截全屏内容保存到相册

```lua title="image:save_to_album"
screen.image():save_to_album()
```

#### 示例：将文件转存到相册

```lua title="image:save_to_album"
img = image.load_file("/var/mobile/1.png")
if image.is(img) then
  img:save_to_album()
end
```

#### 示例：从网上下载个小图片直接转存到相册

```lua title="image:save_to_album"
local c, h, r = http.get("https://dgss0.bdstatic.com/5bVWsj_p_tVS5dKfpU_Y_D3/res/r/image/2017-09-27/297f5edb1e984613083a2d3cc0c5bb36.png", 10)
if c == 200 then
  local img = image.load_data(r)
  img:save_to_album()
  sys.alert("图片已存到相册")
else
  sys.alert("下载失败")
end
```

### 输出图片对象到 PNG 文件或数据 \(**image\:save\_to\_png\_file/image\:png_data**\)

#### 声明

```lua
图像:save_to_png_file(文件路径)
PNG数据 = 图像:png_data()
```

#### 参数及返回值

- 文件路径 *文本型*
- 图像 *图片对象*
- PNG数据
  - *字符串型*，图像的 PNG 格式数据

#### 示例：截全屏图像保存到文件

```lua title="image:save_to_png_file"
screen.image():save_to_png_file("/var/mobile/1.png")
```

### 输出图片对象到 JPEG 文件或数据 \(**image\:save\_to\_jpeg\_file/image\:jpeg_data**\)

#### 声明

```lua
图像:save_to_jpeg_file(文件路径[, 图像质量])
JPEG数据 = 图像:jpeg_data([ 图像质量 ])
```

#### 参数及返回值

- 文件路径 *文本型*
- 图像质量
  - *实数型*，*可选*，取值范围 0.0 ~ 1.0，默认 `1.0`
- 图像 *图片对象*
- JPEG数据
  - *字符串型*，图像的 JPEG 格式数据

#### 示例：截全屏图像保存到文件

```lua title="image:save_to_jpeg_file"
screen.image():save_to_jpeg_file("/var/mobile/1.jpg")
```

```lua title="image:save_to_jpeg_file"
-- 截全屏图像保存到文件并设置图片为低质量（关键字：有损压缩 图像压缩 图片压缩 图片质量）
screen.image():save_to_jpeg_file("/var/mobile/1.jpg", 0.4)
```

### 旋转图片对象 \(**image\:turn\_left,right,upondown**\)

#### 声明

```lua
图像 = 图像:turn_left()      -- 逆时针旋转 90 度 ⤴️
图像 = 图像:turn_right()     -- 顺时针旋转 90 度 ⤵️
图像 = 图像:turn_upondown()  -- 上下翻转 🔄
```

#### 参数及返回值

- 图像 *图片对象*

#### 说明

旋转图片对象。

:::note
此过程不产生数据拷贝。
:::

### 缩放图片对象 \(**image\:resize**\)

#### 声明

```lua
图像 = 图像:resize(宽, 高)
```

#### 参数及返回值

- 图像 *图片对象*
- 宽, 高
  - *整数型*，缩放后的宽、高

:::note
此函数基于 Apple 的 [Accelerate](https://developer.apple.com/documentation/accelerate) 框架实现，因此在 iOS 上运行效率较高。调用过程会产生数据拷贝。
:::

### OpenCV 缩放图片对象 \(**image\:cv\_resize**\)

#### 声明

```lua
图像 = 图像:cv_resize(宽, 高)
```

#### 参数及返回值

- 图像 *图片对象*
- 宽, 高
  - *整数型*，缩放后的宽、高

:::note
此函数基于 [OpenCV](https://opencv.org/) 的 [`cv::resize`](https://docs.opencv.org/3.4/da/d54/group__imgproc__transform.html#ga47a974309e9102f5f08231edc7e7529d) 函数实现，调用过程会产生数据拷贝。
:::

### 翻转图片对象 \(**image\:flip**\)

#### 声明

```lua
图像 = 图像:flip(方向)
```

#### 参数及返回值

- 图像 *图片对象*
- 方向 *枚举型*
  - `0` 为垂直翻转
  - `1` 为水平翻转
  - `-1` 为垂直和水平翻转，等价于旋转 180 度

:::note
此函数基于 Apple 的 [Accelerate](https://developer.apple.com/documentation/accelerate) 框架实现，因此在 iOS 上运行效率较高。调用过程会产生数据拷贝。
:::

### OpenCV 翻转图片对象 \(**image\:cv\_flip**\)

#### 声明

```lua
图像 = 图像:cv_flip(方向)
```

#### 参数及返回值

- 图像 *图片对象*
- 方向 *枚举型*
  - `0` 为垂直翻转
  - `1` 为水平翻转
  - `-1` 为垂直和水平翻转，等价于旋转 180 度

:::note
此函数基于 [OpenCV](https://opencv.org/) 的 [`cv::flip`](https://docs.opencv.org/3.4/d2/de8/group__core__array.html#gaca7be533e3dac7feb70fc60635adf441) 和 [`cv::rotate`](https://docs.opencv.org/3.4/d2/de8/group__core__array.html#ga4ad01c0978b0ce64baa246811deeac24) 实现，调用过程会产生数据拷贝。
:::

### 获取图片对象某点颜色 \(**image\:get\_color**\)

#### 声明

```lua
颜色, 不透明度 = 图像:get_color(横坐标, 纵坐标)
```

#### 参数及返回值

- 图像 *图片对象*
- 横坐标, 纵坐标
  - *整数型*，需要获取颜色的点于当前图片对象上的坐标
- 颜色
  - *整数型*，返回当前图片对象上的这个坐标的颜色值，值得一提的是，假如颜色不透明度不是 `255`，则该点颜色红绿蓝实际会需要考虑除以不透明率（不透明度 / 255）
- 不透明度
  - *整数型*，返回当前图片对象上的这个坐标的不透明度，取值范围 0 ~ 255

#### 说明

获取图片对象某点颜色，不同于屏幕取色之处在于，图像中的像素还多了透明度属性。

#### 示例

```lua title="image:get_color"
local img = image.load_file("/var/mobile/1.png")
local clr = img:get_color(100, 100)
sys.alert(string.format("图像上坐标 (100, 100) 的颜色为：0x%06x", clr))
```

### 设置图片对象某点颜色 \(**image\:set\_color**\)

#### 声明

```lua
图像 = 图像:set_color(横坐标, 纵坐标, 颜色)
```

#### 参数及返回值

- 图像 *图片对象*
- 横坐标, 纵坐标
  - *整数型*，需要设置颜色的点于当前图片对象上的坐标
- 颜色
  - *整数型*，需要设置的颜色值

#### 说明

设置图片对象某点颜色。

### 颜色替换 \(**image\:replace\_color**\)

#### 声明

```lua
图像 = 图像:replace_color(原色, 替换色[, 原色相似度])
```

#### 参数及返回值

- 图像 *图片对象*
- 原色
  - *整数型*，原来的颜色
- 替换色
  - *整数型*，需要变成的颜色
- 原色相似度
  - *整数型*，*可选*，与 **原色** 相似度小于该值的颜色都将被 **替换色** 所替代。取值范围 0 ~ 100，默认 `100`

#### 说明

将图片对象上某种颜色（或及近似色）替换为另外的颜色，通常用于背景色移除或替换。

### 图中贴图 \(**image\:draw\_image**\)

#### 声明

```lua
大图像 = 大图像:draw_image(小图像[, {
  left = 左上的 x 坐标,
  top = 左上的 y 坐标,
  alpha = 不透明度,
  background = {
    {颜色*, 色偏*},
    {颜色*, 色偏*},
    ...
  },
}])
```

#### 参数及返回值

- 大图像
  - *图片对象*，当前操作的图片对象
- 小图像
  - *图片对象*，需要绘制到 **大图像** 上的图像
- 左上的 x 坐标
  - *整数型*，*可选*，需要将 **小图像** 绘制到 **大图像** 的左上角的 x 坐标，默认 `0`
- 左上的 y 坐标
  - *整数型*，*可选*，需要将 **小图像** 绘制到 **大图像** 的左上角的 y 坐标，默认 `0`
- 不透明度
  - *整数型*，*可选*，**小图像** 的不透明度，范围 0 ~ 255，默认 `255`
- 颜色\*, 色偏\*
  - *顺序表*，*可选*，**小图像** 上的与 颜色\* 色差在 色偏\* 范围内的颜色将不会绘制到 **大图像** 上，默认 **不忽略任何颜色**

#### 说明

在图像上绘制另外一个图像。

#### 示例

```lua title="image:draw_image"
local img = screen.image()
local txt = image.new_text_image("Hello, world!", {
  color = 0xff0000,
  size = 20,
})
img:draw_image(txt, {
  left = 100,
  top = 100,
  alpha = 128,
  background = {
    {0x000000, 0x101010},
    {0xffffff, 0x101010},
  },
})
```

### OpenCV 阈值法二值化 \(**image\:cv\_binarization**\)

#### 声明

```lua
图像 = 图像:cv_binarization([ 二值化阈值 ])
```

#### 参数及返回值

- 图像 *图片对象*
- 二值化阈值
  - *实数型*，*可选*，取值范围 0 ~ 255，缺省阈值由 [Otsu's method](https://en.wikipedia.org/wiki/Otsu%27s_method) 自动选取

#### 说明

- 将图片对象二值化，即将图片对象转换为黑白两色。
- 二值化阈值越大，图片越黑，反之越白。

:::note
此方法是 [OpenCV](https://opencv.org/) 的 [cv::threshold](https://docs.opencv.org/3.4/d7/d4d/tutorial_py_thresholding.html) 方法的封装。
:::

### OpenCV 自适应二值化 \(**image\:cv\_adaptive\_binarization**\)

#### 声明

```lua
图像 = 图像:cv_adaptive_binarization(邻域大小[, 常数C, 是否高斯加权 ])
```

#### 参数及返回值

- 图像 *图片对象*
- 邻域大小
  - *整数型*，取值范围大于等于 3 且为奇数
- 常数C
  - *实数型*，*可选*，缺省值为 `0`
- 是否高斯加权
  - *布尔型*，*可选*，缺省值为 `false`

#### 说明

- 将图片对象二值化，即将图片对象转换为黑白两色。
- 二值化阈值由邻域内像素的平均值或高斯加权平均值减去 **常数C** 得到。
- 常用于处理图像中 **有噪声** 的情况。

:::note
此函数调用是 [OpenCV](https://opencv.org/) 的 [cv::adaptiveThreshold](https://docs.opencv.org/3.4/d7/d4d/tutorial_py_thresholding.html) 方法的封装。
:::

### 色偏法二值化 \(**image\:binaryzation**\)

#### 声明 1

```lua
图像 = 图像:binaryzation({
  {颜色*, 色偏*},
  {颜色*, 色偏*},
  ...
})
```

#### 声明 2

```lua
图像 = 图像:binaryzation("cx*-cox*,cx*-cox*...")
```

#### 参数及返回值

- 图像 *图片对象*
- 颜色\*, 色偏\*
  - *整数型*，颜色值白名单，颜色\* 是颜色值本身，色偏\* 是 颜色\* 的最大色差值
- cx\*\-cox\*
  - *文本型*，颜色值白名单，cx\* 是颜色值本身的 16 进制文本描述，cox\* 是 cx\* 的最大色差值 16 进制文本描述

#### 示例 1

```lua title="image:binaryzation"
local pic = screen.image(462, 242, 569, 272)
pic = pic:binaryzation({
  {0x9D5D39, 0x0F1F26},
  {0xD3D3D2, 0x2C2C2D},
})
```

#### 示例 2

```lua title="image:binaryzation.cx-cox"
local pic = screen.image(462, 242, 569, 272)
pic = pic:binaryzation("9D5D39-0F1F26,D3D3D2-2C2C2D")
```

### GPU 加速二值化 \(**image\:binarization**\)

#### 声明

```lua
图像 = 图像:binarization([ 抖动算法类型 ])
```

#### 参数及返回值

- 图像 *图片对象*
- 抖动算法类型
  - *枚举型*，*可选*，默认为 `0`
    - [`kvImageConvert_DitherNone`](https://developer.apple.com/documentation/accelerate/1533233-dithering_methods/kvimageconvert_dithernone) = `0`
    - [`kvImageConvert_DitherOrdered`](https://developer.apple.com/documentation/accelerate/1533233-dithering_methods/kvimageconvert_ditherordered) = `1`
    - [`kvImageConvert_DitherOrderedReproducible`](https://developer.apple.com/documentation/accelerate/1533233-dithering_methods/kvimageconvert_ditherorderedreproducible) = `2`
    - [`kvImageConvert_DitherFloydSteinberg`](https://developer.apple.com/documentation/accelerate/1533233-dithering_methods/kvimageconvert_ditherfloydsteinberg) = `3`
    - [`kvImageConvert_DitherAtkinson`](https://developer.apple.com/documentation/accelerate/1533233-dithering_methods/kvimageconvert_ditheratkinson) = `4`

:::note
此方法是 Apple 提供的 [Vision](https://developer.apple.com/documentation/vision) 框架的 [`vImageConvert_Planar8toPlanar1`](https://developer.apple.com/documentation/accelerate/1533024-vimageconvert_planar8toplanar1) 方法的封装。
:::

### 图片多点颜色匹配 \(**image\:is\_colors**\)

#### 声明

```lua
是否完全匹配 = 图像:is_colors(...)
```

#### 参数及返回值

- 图像 *图片对象*

#### [参考 `screen.is_colors` 说明](./screen.md#-屏幕多点颜色匹配-screenis_colors)

### 图中找色 \(**image\:find\_color**\)

#### 声明

```lua
横坐标, 纵坐标 = 图像:find_color(...)
```

#### 参数及返回值

- 图像 *图片对象*

#### [参考 `screen.find_color` 说明](./screen.md#-多点相似度模式找色-screenfind_color)

### OpenCV 图中找图 \(**image\:cv_find\_image**\)

#### 声明

```lua
横坐标, 纵坐标, 结果相似度 = 大图像:find_image(小图像)
```

#### 参数及返回值

- 大图像
  - *图片对象*，当前操作的图片对象
- 小图像
  - *图片对象*，需要找的小图
- 横坐标, 纵坐标
  - *整数型*，找到的小图在 **大图像** 上的最匹配位置的左上角坐标，搜索失败返回 `-1, -1`
- 结果相似度
  - *实数型*，*可选*，返回找到的小图在 **大图像** 上的最匹配位置的相似度，取值范围 0 ~ 100，搜索失败返回 `0`

#### 说明

此函数与 [`screen.find_image`](./screen.md#-屏幕找图-screenfind_image) 函数类似，但是此函数是在图片中找图，而前者是在屏幕中找图。其他区别如下：

- **小图像** 参数仅支持传入 *图片对象*，不支持传入 *文本型* 或 *字符串型*。
- 不支持传入 **相似度** 及搜索区域。
- 不会对 **小图像** 进行多比例缩放调整。

### 图片光学字符识别 \(**image\:ocr_text**\)

#### 常用声明

```lua
结果文本列表, 结果详情 = 图像:ocr_text([ 识别等级, 超时时间 ])
```

#### 参数及返回值

- 图像 *图片对象*

#### [参考 `screen.ocr_text` 说明](./screen.md#-屏幕光学字符识别-screenocr_text)

### Tesseract 图片光学字符识别 \(**image\:tess\_ocr**\)

#### 声明 1

```lua
require("image.tesseract")  -- 需要提前加载
--
识别结果, 结果详情 = 图像:tess_ocr([{
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
识别结果, 结果详情 = 图像:tess_ocr([ 字库名称 ])
```

#### 参数及返回值

- 图像 *图片对象*

#### [参考 `screen.tess_ocr` 说明](./screen.md#-tesseract-屏幕光学字符识别-screentess_ocr)

### 图片二维码识别 \(**image\:qr\_decode**\)

#### 常用声明

```lua
识别结果文本, 结果详情表 = 图像:qr_decode([ 超时时间 ])
```

#### 参数及返回值

- 图像 *图片对象*

#### [参考 `screen.qr_decode` 说明](./screen.md#-屏幕二维码识别-screenqr_decode)

### 图片矩形检测 \(**image\:detect\_rectangles**\)

#### 常用声明

```lua
矩形位置表, 结果详情表 = 图像:detect_rectangles([ 最大结果数, 超时时间 ])
```

#### 参数及返回值

- 图像 *图片对象*

#### [参考 `screen.detect_rectangles` 说明](./screen.md#-屏幕矩形检测-screendetect_rectangles)
