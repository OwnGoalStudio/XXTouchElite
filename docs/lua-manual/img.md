---
sidebar_position: 5
---

# Image Module

## Image Module - image

Functions marked with 🌟 will create a new [*image object*](#image-object) without modifying the original image object.

:::caution Performance
When an image object is no longer in use, make sure to call the [`image:destroy`](#destroy-an-image-object-imagedestroy) method to release its memory promptly.
:::

### Image Object

An *image object* is a type of [Lua *userdata*](https://cloudwu.github.io/lua53doc/manual.html#2.1) that contains information such as the width, height, number of channels, and data of the image.

### Check if a Value is an Image Object \(**image\.is**\)

#### Declaration

```lua
is_image_object = image.is(value_to_check)
```

#### Parameters and Return Values

- value_to_check *any*
- is_image_object *boolean*

### 🌟 Create a Blank Image Object with Specified Dimensions \(**image\.new**\)

#### Declaration

```lua
image = image.new(width, height)
```

#### Parameters and Return Values

- width, height
  - *integer*, the width and height of the new image object
- image *image object*

#### Description

Creates a blank image object where all points on the image are black `0x000000` by default.

### 🌟 Create a Text Image Object \(**image\.new\_text\_image**\)

#### Declaration

```lua
image = image.new_text_image(text[, {
  font = font,
  size = font_size,
  color = font_color,
  alpha = font_alpha,
  back_color = background_color,
  back_alpha = background_alpha,
}])
```

#### Parameters and Return Values

- text
  - *string*, the text content to be drawn
- font
  - *string*, *optional*, the font of the text to be drawn, default `"Arial"`
- font_size
  - *number*, *optional*, the font size of the text to be drawn, default `20.0`
- font_color
  - *integer*, *optional*, the font color of the text to be drawn, default white `0xffffff`
- font_alpha
  - *integer*, *optional*, the font opacity, range 0 ~ 255, default `255`
- background_color
  - *integer*, *optional*, the background color of the image, default black `0x000000`
- background_alpha
  - *integer*, *optional*, the background opacity, range 0 ~ 255, default `255`
- image *image object*

#### Description

Creates an image object of specified dimensions and draws the text on it.

### 🌟 Create an Image Object from a File \(**image\.load\_file**\)

#### Declaration

```lua
image = image.load_file(file_path)
```

#### Parameters and Return Values

- file_path *string*
- image
  - *image object*, returns `nil` if the file does not exist

#### Example

- [Save a file to the album](#example-save-a-file-to-the-album)

### 🌟 Create an Image Object from Data \(**image\.load\_data**\)

#### Declaration

```lua
image = image.load_data(image_data)
```

#### Parameters and Return Values

- image_data
  - *string*, image data in formats such as `png` or `jpeg`
- image
  - *image object*, returns `nil` if the data is not in image format

#### Example

- [Download a small image from the internet and save it directly to the album](#example-download-a-small-image-from-the-internet-and-save-it-directly-to-the-album)

### 🌟 Encode Text into a QR Code Image \(**image\.qr\_encode**\)

#### Declaration

```lua
image = image.qr_encode(text_content[, {
  size = size,
  fill_color = fill_color,
  background_color = background_color,
}])
```

#### Parameters and Return Values

- text_content
  - *string*, the text content to be encoded into a QR code
- size
  - *integer*, *optional*, the side length of the QR code, default `320`
- fill_color
  - *integer*, *optional*, default black opaque `0xff000000`
- background_color
  - *integer*, *optional*, default white opaque `0xffffffff`
- image *image object*

#### Description

Encodes the text into a QR code image of specified size with a transparent background.

#### Example

```lua title="image.qr_encode"
-- Generate a blue QR code of size 320 and save it to the album
local img = image.qr_encode("https://github.com/", {
  size = 320,
  fill_color = 0xff409bff,
  background_color = 0xff308bef,
})
img:save_to_album()
```

### Image Merging \(**image\.oper\_merge**\)

#### Declaration

```lua
operation_success = image.oper_merge(image_file_name_array, output_path[, merge_direction, quality])
```

#### Parameters and Return Values

- image_file_name_array
  - *table of strings*, list of image file names to be merged, supports absolute paths
- output_path
  - *string*, the file name of the new image, supports absolute paths
- merge_direction *integer*, *optional*
  - `0` horizontal merge, default value
  - `1` vertical merge
- quality
  - *number*, *optional*, when the output image format is `jpg`, controls the image quality. Range 0.0 ~ 1.0, default `1.0`
- operation_success *integer*
  - `0` success
  - *other values* failure

#### Description

The default save path for the merged result is `/var/mobile/Media/1ferver/res`. For custom directories, please provide a relative path.

#### Example

```lua
image.oper_merge({"1.png","2.png","3.png"}, "4.jpg", 0, 0.5)
```

### Import an Image File to the Album \(**image\.image\_to\_album**\)

#### Declaration

```lua
image.image_to_album(image_file_path)
```

#### Parameters and Return Values

- image_file_path
  - *string*, supported formats include `png`, `jpeg`, `heic`, etc.

### Import a Video File to the Album \(**image\.video\_to\_album**\)

#### Declaration

```lua
image.video_to_album(video_file_path)
```

#### Parameters and Return Values

- video_file_path
  - *string*, supported formats include `mp4`, `m4v`, `mov`, etc.

### Get the Dimensions of an Image Object \(**image:size**\)

#### Declaration

```lua
width, height = image:size()
```

#### Parameters and Return Values

- image *image object*
- width, height
  - *integer*, the width and height of the current image object

#### Description

Gets the dimensions of the image object, which may change after rotation.

#### Example

```lua title="image:size"
local img = image.load_file("/var/mobile/1.png")
local w, h
w, h = img:size()
sys.alert("Image width: "..w.."\nImage height: "..h)
img:turn_left()
w, h = img:size()
sys.alert("After counterclockwise rotation, image width: "..w.."\nImage height: "..h)
```

### 🌟 Create a Copy of an Image Object \(**image:copy**\)

#### Declaration

```lua
image2 = image1:copy()
```

#### Parameters and Return Values

- image1
  - *image object*, the original image object
- image2
  - *image object*, the new image object

#### Example

```lua title="image.copy"
scrn = screen.image()
img2 = scrn:copy()
```

### 🌟 Crop a Region to Create a New Image Object \(**image:crop**\)

#### Declaration

```lua
image2 = image1:crop([left, top, right, bottom])
```

#### Parameters and Return Values

- image1
  - *image object*, the original image object
- left, top, right, bottom
  - *integer*, *optional*, the coordinates of the region in the original image, default **same size as the original image**
- image2
  - *image object*, the new image object

#### Example

```lua title="image:crop"
scrn = screen.image()
img2 = scrn:crop(100, 100, 200, 200)
```

### Destroy an Image Object \(**image:destroy**\)

#### Declaration

```lua
image:destroy()
```

#### Parameters and Return Values

- image *image object*

#### Description

Immediately releases the memory occupied by the image object. The destroyed image object cannot be used again.

:::caution Performance
In scenarios where new image objects are frequently created, make sure to call this method to destroy unused image objects to prevent high memory usage, which can lead to crashes or freezes.
Lua’s built-in garbage collection mechanism will also periodically collect and destroy unused image objects.
:::

#### Example

```lua title="image:destroy"
sys.alert("Click OK to start monitoring screen status after 1 second")
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
sys.alert("The screen has moved")
```

### Save an Image Object to the Album \(**image:save\_to\_album**\)

#### Declaration

```lua
image:save_to_album()
```

#### Parameters and Return Values

- image *image object*

#### Example: Save Full-Screen Content to the Album

```lua title="image:save_to_album"
screen.image():save_to_album()
```

#### Example: Save a File to the Album

```lua title="image:save_to_album"
img = image.load_file("/var/mobile/1.png")
if image.is(img) then
  img:save_to_album()
end
```

#### Example: Download a Small Image from the Internet and Save it Directly to the Album

```lua title="image:save_to_album"
local c, h, r = http.get("https://dgss0.bdstatic.com/5bVWsj_p_tVS5dKfpU_Y_D3/res/r/image/2017-09-27/297f5edb1e984613083a2d3cc0c5bb36.png", 10)
if c == 200 then
  local img = image.load_data(r)
  img:save_to_album()
  sys.alert("The image has been saved to the album")
else
  sys.alert("Download failed")
end
```

### Output an Image Object to a PNG File or Data \(**image:save\_to\_png\_file/image:png_data**\)

#### Declaration

```lua
image:save_to_png_file(file_path)
PNG_data = image:png_data()
```

#### Parameters and Return Values

- file_path *string*
- image *image object*
- PNG_data
  - *string*, the PNG format data of the image

#### Example: Save Full-Screen Image to a File

```lua title="image:save_to_png_file"
screen.image():save_to_png_file("/var/mobile/1.png")
```

### Output an Image Object to a JPEG File or Data \(**image:save\_to\_jpeg\_file/image:jpeg_data**\)

#### Declaration

```lua
image:save_to_jpeg_file(file_path[, quality])
JPEG_data = image:jpeg_data([ quality ])
```

#### Parameters and Return Values

- file_path *string*
- quality
  - *number*, *optional*, range 0.0 ~ 1.0, default `1.0`
- image *image object*
- JPEG_data
  - *string*, the JPEG format data of the image

#### Example: Save Full-Screen Image to a File

```lua title="image:save_to_jpeg_file"
screen.image():save_to_jpeg_file("/var/mobile/1.jpg")
```

```lua title="image:save_to_jpeg_file"
-- Save full-screen image to a file and set the image to low quality (keywords: lossy compression, image compression, image quality)
screen.image():save_to_jpeg_file("/var/mobile/1.jpg", 0.4)
```

### Rotate an Image Object \(**image:turn\_left,right,upondown**\)

#### Declaration

```lua
image = image:turn_left()      -- Rotate 90 degrees counterclockwise ⤴️
image = image:turn_right()     -- Rotate 90 degrees clockwise ⤵️
image = image:turn_upondown()  -- Flip vertically 🔄
```

#### Parameters and Return Values

- image *image object*

#### Description

Rotates the image object.

:::note
This process does not create a data copy.
:::

### Resize an Image Object \(**image:resize**\)

#### Declaration

```lua
image = image:resize(width, height)
```

#### Parameters and Return Values

- image *image object*
- width, height
  - *integer*, the width and height after resizing

:::note
This function is implemented based on Apple’s [Accelerate](https://developer.apple.com/documentation/accelerate) framework, so it runs efficiently on iOS. The call process will create a data copy.
:::

### OpenCV Resize an Image Object \(**image:cv\_resize**\)

#### Declaration

```lua
image = image:cv_resize(width, height)
```

#### Parameters and Return Values

- image *image object*
- width, height
  - *integer*, the width and height after resizing

:::note
This function is implemented based on [OpenCV](https://opencv.org/) [`cv::resize`](https://docs.opencv.org/3.4/da/d54/group__imgproc__transform.html#ga47a974309e9102f5f08231edc7e7529d) function. The call process will create a data copy.
:::

### Flip an Image Object \(**image:flip**\)

#### Declaration

```lua
image = image:flip(direction)
```

#### Parameters and Return Values

- image *image object*
- direction *enum*
  - `0` for vertical flip
  - `1` for horizontal flip
  - `-1` for both vertical and horizontal flip, equivalent to rotating 180 degrees

:::note
This function is implemented based on Apple’s [Accelerate](https://developer.apple.com/documentation/accelerate) framework, so it runs efficiently on iOS. The call process will create a data copy.
:::

### OpenCV Flip an Image Object \(**image:cv\_flip**\)

#### Declaration

```lua
image = image:cv_flip(direction)
```

#### Parameters and Return Values

- image *image object*
- direction *enum*
  - `0` for vertical flip
  - `1` for horizontal flip
  - `-1` for both vertical and horizontal flip, equivalent to rotating 180 degrees

:::note
This function is implemented based on [OpenCV](https://opencv.org/) [`cv::flip`](https://docs.opencv.org/3.4/d2/de8/group__core__array.html#gaca7be533e3dac7feb70fc60635adf441) and [`cv::rotate`](https://docs.opencv.org/3.4/d2/de8/group__core__array.html#ga4ad01c0978b0ce64baa246811deeac24) functions. The call process will create a data copy.
:::

### Get the Color of a Point in an Image Object \(**image:get\_color**\)

#### Declaration

```lua
color, alpha = image:get_color(x, y)
```

#### Parameters and Return Values

- image *image object*
- x, y
  - *integer*, the coordinates of the point in the current image object
- color
  - *integer*, the color value of the point in the current image object. Note that if the alpha is not `255`, the actual red, green, and blue values of the color need to be divided by the opacity (alpha / 255)
- alpha
  - *integer*, the opacity of the point in the current image object, range 0 ~ 255

#### Description

Gets the color of a point in the image object, which differs from screen color picking in that the pixels in the image have an additional transparency attribute.

#### Example

```lua title="image:get_color"
local img = image.load_file("/var/mobile/1.png")
local clr = img:get_color(100, 100)
sys.alert(string.format("The color at coordinate (100, 100) in the image is: 0x%06x", clr))
```

### Set the Color of a Point in an Image Object \(**image:set\_color**\)

#### Declaration

```lua
image = image:set_color(x, y, color)
```

#### Parameters and Return Values

- image *image object*
- x, y
  - *integer*, the coordinates of the point in the current image object
- color
  - *integer*, the color value to be set

#### Description

Sets the color of a point in the image object.

### Replace Color \(**image:replace\_color**\)

#### Declaration

```lua
image = image:replace_color(original_color, replacement_color[, similarity])
```

#### Parameters and Return Values

- image *image object*
- original_color
  - *integer*, the original color
- replacement_color
  - *integer*, the color to replace with
- similarity
  - *integer*, *optional*, colors with a similarity to **original_color** less than this value will be replaced by **replacement_color**. Range 0 ~ 100, default `100`

#### Description

Replaces a certain color (or similar colors) in the image object with another color, usually used for background color removal or replacement.

### Draw an Image on Another Image \(**image:draw\_image**\)

#### Declaration

```lua
large_image = large_image:draw_image(small_image[, {
  left = x_coordinate_of_top_left,
  top = y_coordinate_of_top_left,
  alpha = opacity,
  background = {
    {color*, color_deviation*},
    {color*, color_deviation*},
    ...
  },
}])
```

#### Parameters and Return Values

- large_image
  - *image object*, the current image object
- small_image
  - *image object*, the image to be drawn on the **large_image**
- x_coordinate_of_top_left
  - *integer*, *optional*, the x coordinate of the top left corner where the **small_image** will be drawn on the **large_image**, default `0`
- y_coordinate_of_top_left
  - *integer*, *optional*, the y coordinate of the top left corner where the **small_image** will be drawn on the **large_image**, default `0`
- opacity
  - *integer*, *optional*, the opacity of the **small_image**, range 0 ~ 255, default `255`
- color\*, color_deviation\*
  - *table*, *optional*, colors in the **small_image** with a color deviation within the range of color_deviation\* will not be drawn on the **large_image**, default **do not ignore any color**

#### Description

Draws another image on the image.

#### Example

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

### OpenCV Threshold Binarization \(**image:cv\_binarization**\)

#### Declaration

```lua
image = image:cv_binarization([ threshold ])
```

#### Parameters and Return Values

- image *image object*
- threshold
  - *number*, *optional*, range 0 ~ 255, default threshold is automatically selected by [Otsu’s method](https://en.wikipedia.org/wiki/Otsu%27s_method)

#### Description

- Binarizes the image object, converting it to black and white.
- The higher the threshold, the darker the image, and vice versa.

:::note
This method is a wrapper for [OpenCV](https://opencv.org/) [cv::threshold](https://docs.opencv.org/3.4/d7/d4d/tutorial_py_thresholding.html) method.
:::

### OpenCV Adaptive Binarization \(**image:cv\_adaptive\_binarization**\)

#### Declaration

```lua
image = image:cv_adaptive_binarization(neighborhood_size[, constant_C, gaussian_weighted ])
```

#### Parameters and Return Values

- image *image object*
- neighborhood_size
  - *integer*, range greater than or equal to 3 and must be odd
- constant_C
  - *number*, *optional*, default value is `0`
- gaussian_weighted
  - *boolean*, *optional*, default value is `false`

#### Description

- Binarizes the image object, converting it to black and white.
- The binarization threshold is obtained by subtracting **constant_C** from the average or Gaussian weighted average of the pixels in the neighborhood.
- Commonly used to handle images with **noise**.

:::note
This function is a wrapper for [OpenCV](https://opencv.org/) [cv::adaptiveThreshold](https://docs.opencv.org/3.4/d7/d4d/tutorial_py_thresholding.html) method.
:::

### Color Deviation Binarization \(**image:binaryzation**\)

#### Declaration 1

```lua
image = image:binaryzation({
  {color*, color_deviation*},
  {color*, color_deviation*},
  ...
})
```

#### Declaration 2

```lua
image = image:binaryzation("cx*-cox*,cx*-cox*...")
```

#### Parameters and Return Values

- image *image object*
- color\*, color_deviation\*
  - *integer*, color value whitelist, color\* is the color value itself, color_deviation\* is the maximum color deviation of color\*
- cx\*\-cox\*
  - *string*, color value whitelist, cx\* is the hexadecimal text description of the color value itself, cox\* is the hexadecimal text description of the maximum color deviation of cx\*

#### Example 1

```lua title="image:binaryzation"
local pic = screen.image(462, 242, 569, 272)
pic = pic:binaryzation({
  {0x9D5D39, 0x0F1F26},
  {0xD3D3D2, 0x2C2C2D},
})
```

#### Example 2

```lua title="image:binaryzation.cx-cox"
local pic = screen.image(462, 242, 569, 272)
pic = pic:binaryzation("9D5D39-0F1F26,D3D3D2-2C2C2D")
```

### GPU Accelerated Binarization \(**image:binarization**\)

#### Declaration

```lua
image = image:binarization([ dither_algorithm_type ])
```

#### Parameters and Return Values

- image *image object*
- dither_algorithm_type
  - *enum*, *optional*, default is `0`
    - [`kvImageConvert_DitherNone`](https://developer.apple.com/documentation/accelerate/1533233-dithering_methods/kvimageconvert_dithernone) = `0`
    - [`kvImageConvert_DitherOrdered`](https://developer.apple.com/documentation/accelerate/1533233-dithering_methods/kvimageconvert_ditherordered) = `1`
    - [`kvImageConvert_DitherOrderedReproducible`](https://developer.apple.com/documentation/accelerate/1533233-dithering_methods/kvimageconvert_ditherorderedreproducible) = `2`
    - [`kvImageConvert_DitherFloydSteinberg`](https://developer.apple.com/documentation/accelerate/1533233-dithering_methods/kvimageconvert_ditherfloydsteinberg) = `3`
    - [`kvImageConvert_DitherAtkinson`](https://developer.apple.com/documentation/accelerate/1533233-dithering_methods/kvimageconvert_ditheratkinson) = `4`

:::note
This method is a wrapper for Apple’s [Vision](https://developer.apple.com/documentation/vision) framework [`vImageConvert_Planar8toPlanar1`](https://developer.apple.com/documentation/accelerate/1533024-vimageconvert_planar8toplanar1) method.
:::

### Multi-Point Color Matching in an Image \(**image:is\_colors**\)

#### Declaration

```lua
is_exact_match = image:is_colors(...)
```

#### Parameters and Return Values

- image *image object*

#### [Refer to `screen.is_colors` description](screen.md#-screen-multi-point-color-matching-screenis_colors)

### Find Color in an Image \(**image:find\_color**\)

#### Declaration

```lua
x, y = image:find_color(...)
```

#### Parameters and Return Values

- image *image object*

#### [Refer to `screen.find_color` description](screen.md#-multi-point-similarity-mode-color-finding-screenfind_color)

### OpenCV Find Image in an Image \(**image:cv_find\_image**\)

#### Declaration

```lua
x, y, similarity = large_image:find_image(small_image)
```

#### Parameters and Return Values

- large_image
  - *image object*, the current image object
- small_image
  - *image object*, the image to be found
- x, y
  - *integer*, the coordinates of the top left corner of the most matching position of the **small_image** in the **large_image**, returns `-1, -1` if the search fails
- similarity
  - *number*, *optional*, returns the similarity of the most matching position of the **small_image** in the **large_image**, range 0 ~ 100, returns `0` if the search fails

#### Description

This function is similar to the [`screen.find_image`](screen.md#-screen-image-finding-screenfind_image) function, but this function finds an image within another image, while the former finds an image on the screen. Other differences are as follows:

- The **small_image** parameter only supports passing in *image object*, not *string* or *string*.
- Does not support passing in **similarity** and search area.
- Does not perform multi-scale adjustments on the **small_image**.

### Optical Character Recognition (OCR) in an Image \(**image:ocr_text**\)

#### Common Declaration

```lua
result_text_list, result_details = image:ocr_text([ recognition_level, timeout ])
```

#### Parameters and Return Values

- image *image object*

#### [Refer to `screen.ocr_text` description](screen.md#-screen-optical-character-recognition-screenocr_text)

### Tesseract Optical Character Recognition (OCR) in an Image \(**image:tess\_ocr**\)

#### Declaration 1

```lua
require("image.tesseract")  -- Needs to be loaded in advance
--
recognition_result, result_details = image:tess_ocr([{
  [lang = language_library_name,]
  [white_list = white_list,]
  [black_list = black_list,]
  [left   = left,]
  [top    = top,]
  [right  = right,]
  [bottom = bottom,]
}])
```

#### Declaration 2

```lua
require("image.tesseract")  -- Needs to be loaded in advance
--
recognition_result, result_details = image:tess_ocr([ language_library_name ])
```

#### Parameters and Return Values

- image *image object*

#### [Refer to `screen.tess_ocr` description](screen.md#-tesseract-screen-optical-character-recognition-screentess_ocr)

### QR Code Recognition in an Image \(**image:qr\_decode**\)

#### Common Declaration

```lua
recognition_result_text, result_details_table = image:qr_decode([ timeout ])
```

#### Parameters and Return Values

- image *image object*

#### [Refer to `screen.qr_decode` description](screen.md#-screen-qr-code-recognition-screenqr_decode)

### Rectangle Detection in an Image \(**image:detect\_rectangles**\)

#### Common Declaration

```lua
rectangle_positions_table, result_details_table = image:detect_rectangles([ max_results, timeout ])
```

#### Parameters and Return Values

- image *image object*

#### [Refer to `screen.detect_rectangles` description](screen.md#-screen-rectangle-detection-screendetect_rectangles)
