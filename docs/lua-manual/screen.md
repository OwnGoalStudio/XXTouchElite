---
sidebar_position: 4
---


# Screen Module

## Screen Module - screen

* Functions marked with 🌟 will generate a new [*image object*](img.md#image-object).
* Functions marked with 📲 will implicitly capture the current screen content when not in **Screen Keep State**, see [Screen Keep](#-screen-keep-screenkeep) for details.

### Initialize Rotated Coordinate System \(**screen\.init**\)

#### Declaration

```lua
original_coordinate_system = screen.init(coordinate_system)
```

#### Parameters and Return Values

* coordinate_system *enum*
  * `0` indicates portrait mode with HOME at the bottom
  * `1` indicates landscape mode with HOME on the right
  * `2` indicates landscape mode with HOME on the left
  * `3` indicates portrait mode with HOME at the top
* original_coordinate_system
  * *enum*, returns the coordinate system used before this function call

#### Description

Initializes the coordinate system shared by the **Screen Module** and the **Simulated Touch Module**.

:::info
The following aliases can also achieve the same effect:

``` lua
screen.init_home_on_bottom()    -- HOME at the bottom
screen.init_home_on_right()     -- HOME on the right
screen.init_home_on_left()      -- HOME on the left
screen.init_home_on_top()       -- HOME at the top
```

:::

#### Example

```lua title="screen.init"
screen.init(0)    -- HOME at the bottom
screen.init(1)    -- HOME on the right
screen.init(2)    -- HOME on the left
screen.init(3)    -- HOME at the top
```

### Get Rotated Coordinate System \(**screen\.orientation**\)

#### Declaration

```lua
coordinate_system = screen.orientation()
```

#### Parameters and Return Values

* coordinate_system *enum*
  * `0` indicates portrait mode with HOME at the bottom
  * `1` indicates landscape mode with HOME on the right
  * `2` indicates landscape mode with HOME on the left
  * `3` indicates portrait mode with HOME at the top

#### Description

Gets the current coordinate system shared by the **Screen Module** and the **Simulated Touch Module**.

:::note

* `screen.ORIENTATION_HOME_ON_BOTTOM` indicates portrait mode with HOME at the bottom
* `screen.ORIENTATION_HOME_ON_RIGHT` indicates landscape mode with HOME on the right
* `screen.ORIENTATION_HOME_ON_LEFT` indicates landscape mode with HOME on the left
* `screen.ORIENTATION_HOME_ON_TOP` indicates portrait mode with HOME at the top

:::

### Coordinate Rotation Conversion \(**screen\.rotate\_xy**\)

#### Declaration

```lua
rotated_x, rotated_y = screen.rotate_xy(x, y, rotation)
```

#### Parameters and Return Values

* x, y
  * *integer*, coordinates to be rotated
* rotation *integer*
  * `0` indicates no rotation
  * `1` indicates 90 degrees counterclockwise rotation
  * `2` indicates 90 degrees clockwise rotation
  * `3` indicates 180 degrees rotation
* rotated_x, rotated_y
  * *integer*, returns the coordinates after rotation based on the **rotation** option

#### Description

Coordinate rotation conversion, usually used to convert portrait coordinates to landscape coordinates.

#### Example

```lua title="screen.rotate_xy"
rx, ry = screen.rotate_xy(100, 200, 1)
```

### Get Screen Size \(**screen\.size**\)

#### Declaration

```lua
screen_width, screen_height = screen.size()
```

#### Parameters and Return Values

* screen_width *integer*
* screen_height *integer*

#### Description

The screen size after iOS system scaling and resampling, in **pixels**.

:::info
The return value is not affected by the current orientation of the springboard or application, but is affected by the **zoom mode**.
:::

#### Example

```lua title="screen.size"
-- Determine device type based on resolution
local width, height = screen.size()
if width == 750 and height == 1334 then
  -- Standard mode iPhone 6S, 7, 8
elseif width == 640 and height == 1136 then
  -- Zoom mode iPhone 6S, 7, 8
end
```

### 📲 Screen Keep \(**screen\.keep**\)

#### Declaration

```lua
screen_capture_count = screen.keep()
```

#### Parameters and Return Values

* screen_capture_count
  * *integer*, returns the number of times the current [script process](../appendix/process-scheduling.md) has captured the screen content

#### Description

Captures a copy of the current screen content in the current script process and enters **Screen Keep State**, incrementing the **screen capture count**.

* In **Screen Keep State**, multiple calls to color picking, color finding, screenshot, or image finding functions marked with 📲 will continue to operate based on the kept copy without repeatedly capturing new screen content.
* In **Screen Keep State**, the **screen capture count** will not increase.
* Call the [`screen.unkeep`](#exit-screen-keep-state-screenunkeep) function to exit **Screen Keep State**.

:::note
Only refreshes the data source for functions marked with 📲, and **does not** cause the actual screen display to freeze.
:::

#### Example

```lua title="screen.keep"
screen.keep()    -- Keep screen
for k = 1, 640, 10 do
  for j = 1, 960, 10 do
    color = string.format("%X", screen.get_color(k, j))  -- Format as hexadecimal text
    sys.log("("..k..", "..j..") Color: "..color..".")    -- Output to system log
  end
end
screen.unkeep()  -- Exit screen keep state
```

:::note

* Consecutive separate calls to [`screen.get_color`](#-get-color-of-a-point-on-the-screen-screenget_color) for the same position may return different values.
* In the case of `screen.keep`, a single call to [`screen.get_color`](#-get-color-of-a-point-on-the-screen-screenget_color) will take longer than a single call to `screen.keep`.
* After calling `screen.keep`, calling [`screen.get_color`](#-get-color-of-a-point-on-the-screen-screenget_color) 50 times consecutively will take the same time as calling `screen.keep` once.

:::

### Exit Screen Keep State \(**screen\.unkeep**\)

#### Declaration

```lua
screen_capture_count = screen.unkeep()
```

#### Parameters and Return Values

* screen_capture_count
  * *integer*, returns the number of times the current [script process](../appendix/process-scheduling.md) has captured the screen content

#### Description

Cancels the effect of the [`screen.keep`](#-screen-keep-screenkeep) function and exits **Screen Keep State**.
After exiting **Screen Keep State**, each call to color picking, color finding, screenshot, or image finding functions marked with 📲 will capture new screen content, incrementing the **screen capture count**.

#### Example

* [Refer to the `screen.keep` example](#-screen-keep-screenkeep)

### 📲 Get Color of a Point on the Screen \(**screen\.get\_color**\)

#### Declaration

```lua
color_value = screen.get_color(x, y)
```

#### Parameters and Return Values

* x, y
  * *integer*, coordinates of the target point
* color_value
  * *integer*, returns the RGB value of the color at the target point

#### Example

```lua title="screen.get_color"
local c = screen.get_color(512, 133)
if c == 0xffffff then
  sys.alert("The color at (512,133) is pure white")
end
```

### 📲 Get RGB Color of a Point on the Screen \(**screen\.get\_color\_rgb**\)

#### Declaration

```lua
red, green, blue = screen.get_color_rgb(x, y)
```

#### Parameters and Return Values

* x, y
  * *integer*, coordinates of the target point
* red, green, blue
  * *integer*, returns the R, G, B values of the color at the target point, range 0 ~ 255

#### Example

```lua title="screen.get_color_rgb"
local r, g, b = screen.get_color_rgb(512, 133)
if r == 0xff and g == 0xff and b == 0xff then
  sys.alert("The color at (512,133) is pure white")
end
```

### 📲 Screen Multi-point Color Matching \(**screen\.is\_colors**\)

#### Declaration

```lua
is_exact_match = screen.is_colors({
    {x*, y*, color*},
    {x*, y*, color*},
    ...
}[, color_similarity])
```

#### Parameters and Return Values

* x\*, y\*
  * *integer*, coordinates of a point
* color\*
  * *integer*, color value to match at a point
* color_similarity
  * *integer*, *optional*, similarity of the color, range 1 ~ 100, default `100`
* is_exact_match
  * *boolean*, returns `true` if all points match, otherwise returns `false`

#### Description

Matches the colors of several points on the screen.

#### Example

```lua title="screen.is_colors"
if screen.is_colors({
  { 509, 488, 0xec1c23 },  -- If the color at (509, 488) is similar to 0xec1c23 by 90% or more
  { 514, 470, 0x00adee },  -- And the color at (514, 470) is similar to 0x00adee by 90% or more
  { 508, 478, 0xffc823 },  -- And the color at (508, 478) is similar to 0xffc823 by 90% or more
  { 511, 454, 0xa78217 },  -- And the color at (511, 454) is similar to 0xa78217 by 90% or more
  { 521, 433, 0xd0d2d2 },  -- And the color at (521, 433) is similar to 0xd0d2d2 by 90% or more
}, 90) then                -- Then it matches
  sys.alert("Match!")
else
  sys.alert("No match!")
end
```

### 📲 Multi-point Similarity Mode Color Finding \(**screen\.find\_color**\)

#### Declaration

```lua
x, y = screen.find_color({
    [find_all = search_multiple_results],
    [max_results = max_results],
    [max_miss = max_miss],
    {start_x, start_y, start_color[, start_similarity]},
    {offset_x*, offset_y*, offset_color*[, offset_similarity*]},
    {offset_x*, offset_y*, offset_color*[, offset_similarity*]},
    ...
}[, global_similarity, left, top, right, bottom])
```

#### Parameters and Return Values

* search_multiple_results
  * *boolean*, *optional*, if set to `true`, returns a table of all matching positions within the range, format `{{x1, y1}, {x2, y2}, ...}`, default `false`
* max_results
  * *integer*, *optional*, when the `find_all` (search_multiple_results) tag is set to `true`, this indicates the maximum number of results to return, up to `1000`, default `100`
* max_miss
  * *integer*, *optional*, allows the maximum number of unmatched points, default `0`, meaning all points must match to be found
* start_x, start_y
  * *integer*, starting coordinates, not limiting the search range to this point, but giving a relative coordinate for the offset position, if not understood, fill in `0, 0`
* start_color
  * *integer*, color to search for at the starting point
* start_similarity
  * *integer*, *optional*, similarity of the color at the starting point, range 1 ~ 100, default `100`
* offset_x\*, offset_y\*
  * *integer*, coordinates of an offset position
* offset_color\*
  * *integer*, color to match at the offset position
* offset_similarity\*
  * *integer*, *optional*, similarity of the color at the offset position, range -100 ~ 100, default `100`, negative similarity means matching less than the absolute value of the similarity
* global_similarity
  * *integer*, *optional*, if no individual point similarity is set, then each point will use this similarity, range 1 ~ 100, default `100`
* left, top, right, bottom
  * *integer*, *optional*, coordinates of the top-left and bottom-right corners of the search area, default **full screen**
* x, y
  * *integer*, returns the coordinates of the first matching color, search failure returns `-1, -1`

#### Description

Uses similarity mode to find (pattern matching) the position of the first fully matching multi-point color structure (pattern) in the area.

:::note No way
No way someone [writes this matching table by hand](../tutorial-extras/grab-screen-colors.mdx), right?
:::

#### Example

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
  In the area with the top-left corner at 0, 0 and the bottom-right corner at 100, 100, find the first point with a color similar to 0xec1c23 by more than 90%
  And its relative coordinate (12, -3) has a color similar to 0xffffff by more than 85%
  And its relative coordinate (5, -18) has a color similar to 0x00adee by more than 90%
  And ... (same for the rest) all match
--]]
--
-- Equivalent code:
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
  In the area with the top-left corner at 0, 0 and the bottom-right corner at 100, 100, find the first point with a color similar to 0xec1c23 by more than 90%
  And its relative coordinate (521-509, 485-488) has a color similar to 0xffffff by more than 85%
  And its relative coordinate (514-509, 470-488) has a color similar to 0x00adee by more than 90%
  And ... (same for the rest) all match
--]]
--
-- Without line breaks and indentation, it looks like this:
x, y = screen.find_color({ {0,0,0xec1c23},{12,-3,0xffffff,85},{5,-18,0x00adee},{-1,-10,0xffc823},{2,-34,0xa78217},{12,-55,0xd0d2d2} }, 90, 0, 0, 100, 100)
--
x, y = screen.find_color({  -- Reverse matching example, can get results on 5C main screen
  { 516,  288, 0xffffff },
  { 519,  286, 0xffffff },
  { 521,  289, 0xffffff },
  { 516,  296, 0xffffff },
  { 522,  297, 0xffffff },
  { 520,  295, 0xffffff, -10 },  -- This point matches if the color is less than 10% similar to 0xffffff, same below
  { 515,  291, 0xffffff, -10 },
  { 518,  284, 0xffffff, -10 },
  { 523,  298, 0xffffff, -10 },
  { 514,  298, 0xffffff, -10 },
  { 514,  296, 0xffffff, -10 },
}, 90)  -- No area parameters means full screen search
--
results = screen.find_color({  -- Range matching full output example
  {  527,  278, 0xde1d26 },
  {  524,  285, 0x007aff },
  {  555,  292, 0xe4ddc9 },
  {  536,  314, 0xffde02 },
  {  502,  291, 0xffde02 },
  {  502,  283, 0xe4ddc9 },
  find_all = true,  -- With this tag, it will return a table of all matching positions within the range, format { {x1, y1}, {x2, y2}, ... }
}, 90)  -- No area parameters means full screen search
```

### 📲 Multi-point Color Deviation Mode Color Finding \(**screen\.find\_color**\)

#### Declaration

```lua
x, y = screen.find_color({
    [find_all = search_multiple_results],
    [max_results = max_results],
    [max_miss = max_miss],
    {start_x, start_y, {start_color[, start_deviation]}},
    {offset_x*, offset_y*, {offset_color*[, offset_deviation*]}},
    {offset_x*, offset_y*, {offset_color*[, offset_deviation*]}},
    ...
}[, left, top, right, bottom])
```

#### Parameters and Return Values

* search_multiple_results
  * *boolean*, *optional*, if set to `true`, returns a table of all matching positions within the range, format `{{x1, y1}, {x2, y2}, ...}`, default `false`
* max_results
  * *integer*, *optional*, when the `find_all` (search_multiple_results) tag is set to `true`, this indicates the maximum number of results to return, up to `1000`, default `100`
* max_miss
  * *integer*, *optional*, allows the maximum number of unmatched points, default `0`, meaning all points must match to be found
* start_x, start_y
  * *integer*, starting coordinates, not limiting the search range to this point, but giving a relative coordinate for the offset position, if not understood, fill in `0, 0`
* start_color
  * *integer*, color to search for at the starting point
* start_deviation
  * *integer*, maximum color deviation for the color to search for, greater than `0xff000000` indicates reverse matching mode
* offset_x\*, offset_y\*
  * *integer*, coordinates of an offset position
* offset_color\*
  * *integer*, color to match at the offset position
* offset_deviation\*
  * *integer*, color deviation for the offset position, greater than `0xff000000` indicates reverse matching mode
* left, top, right, bottom
  * *integer*, *optional*, coordinates of the top-left and bottom-right corners of the search area, default **full screen**
* x, y
  * *integer*, returns the coordinates of the first matching color, search failure returns `-1, -1`

#### Description

Uses color deviation mode to find (pattern matching) the position of the first fully matching multi-point color structure (pattern) in the area.

:::note
**Color Deviation** is used to indicate the range of color deviation. A color with a color deviation means all colors within the red, green, and blue deviation range of that color.
When `0x456789` has a color deviation of `0x123456`, it means the red range is `0x45 ± 0x12`, the green range is `0x67 ± 0x34`, and the blue range is `0x89 ± 0x56`.
As shown in the table below, `{0x456789, 0x123456}` represents all colors from `0x333333` to `0x579BDF`.

| Negative Deviation | Positive Deviation |
|--------------------|--------------------|
| 0x45 \- 0x12 = 0x33 | 0x45 \+ 0x12 = 0x57 |
| 0x67 \- 0x34 = 0x33 | 0x67 \+ 0x34 = 0x9B |
| 0x89 \- 0x56 = 0x33 | 0x89 \+ 0x56 = 0xDF |

:::

#### Example

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
  In the area with the top-left corner at 0, 0 and the bottom-right corner at 100, 100, find the first point with a color exactly similar to 0xec1c23 (color deviation is 0)
  And its relative coordinate (12, -3) has a color deviation less than 0x101010 from 0xffffff
  And its relative coordinate (5, -18) has a color deviation less than 0x123456 from 0x00adee
  And ... (same for the rest) all match
--]]
--
-- Equivalent code:
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
  In the area with the top-left corner at 0, 0 and the bottom-right corner at 100, 100, find the first point with a color exactly similar to 0xec1c23 (color deviation is 0)
  And its relative coordinate (521-509, 485-488) has a color deviation less than 0x101010 from 0xffffff
  And its relative coordinate (514-509, 470-488) has a color deviation less than 0x123456 from 0x00adee
  And ... (same for the rest) all match
--]]
--
-- Without line breaks and indentation, it looks like this:
x, y = screen.find_color({ {0,0,{0xec1c23,0x000000}},{12,-3,{0xffffff,0x101010}},{5,-18,{0x00adee,0x123456}},{-1,-10,{0xffc823,0x101001}},{2,-34,{0xa78217,0x101001}},{12,-55,{0xd0d2d2,0x101001}} }, 0, 0, 100, 100)
--
x, y = screen.find_color({  -- Reverse matching example, can get results on 5C main screen
  { 516,  288, {0xffffff, 0x101010} },
  { 519,  286, {0xffffff, 0x101010} },
  { 521,  289, {0xffffff, 0x101010} },
  { 516,  296, {0xffffff, 0x101010} },
  { 522,  297, {0xffffff, 0x101010} },
  { 520,  295, {0xffffff, 0xff101010} },  -- This point matches if the color deviation is greater than 0x101010 from 0xffffff, same below
  { 515,  291, {0xffffff, 0xff101010} },
  { 518,  284, {0xffffff, 0xff101010} },
  { 523,  298, {0xffffff, 0xff101010} },
  { 514,  298, {0xffffff, 0xff101010} },
  { 514,  296, {0xffffff, 0xff101010} },
})  -- No area parameters means full screen search
--
results = screen.find_color({  -- Range matching full output example
  {  527,  278, {0xde1d26, 0x101010} },
  {  524,  285, {0x007aff, 0x101010} },
  {  555,  292, {0xe4ddc9, 0x101010} },
  {  536,  314, {0xffde02, 0x101010} },
  {  502,  291, {0xffde02, 0x101010} },
  {  502,  283, {0xe4ddc9, 0x101010} },
  find_all = true,  -- With this tag, it will return a table of all matching positions within the range, format { {x1, y1}, {x2, y2}, ... }
})  -- No area parameters means full screen search
```

### 📲🌟 Capture Screen Content \(**screen\.image**\)

#### Declaration

```lua
screen_content = screen.image([ left, top, right, bottom ])
```

#### Parameters and Return Values

* left, top, right, bottom
  * *integer*, *optional*, represents the screen area to capture, default **full screen**
* screen_content [*image object*](img.md#image-object)

#### Description

Captures the content of a part of the screen or the entire screen.

:::caution Performance
Generates a new *image object*.
Be sure to call the [`image:destroy`](img.md#destroy-an-image-object-imagedestroy) method when the object is no longer needed to release its memory.
:::

#### Example

```lua title="screen.image"
screen.image():save_to_album()  -- Capture full screen and save to album
--
screen.image():save_to_png_file("/var/mobile/1.png")  -- Capture full screen and save to file /var/mobile/1.png
--
screen.image(100, 100, 200, 200):save_to_album()  -- Capture the screen area with top-left coordinates at 100, 100 and bottom-right coordinates at 200, 200, and save to album
--
pasteboard.write(screen.image(100, 100, 200, 200):png_data(), "public.png")  -- Capture the screen area with top-left coordinates at 100, 100 and bottom-right coordinates at 200, 200, and write to clipboard
```

### 📲 Screen Image Finding \(**screen\.find\_image**\)

#### Declaration

```lua
x, y, similarity = screen.find_image(sub_image[, similarity, left, top, right, bottom])
```

#### Parameters and Return Values

* sub_image
  * [*image object*](img.md#image-object)
  * *path-like string*
    * Path to the image file to find, if not a valid path, it will be parsed as *string* data
  * *string*
    * Image data to find, can be in `png` or `jpeg` format
* similarity
  * *integer*, *optional*, similarity of the sub-image to find, range 1 ~ 100, default `95`
* left, top, right, bottom
  * *integer*, *optional*, coordinates of the top-left and bottom-right corners of the search area, default **full screen**
* x, y
  * *integer*, returns the coordinates of the top-left corner of the found sub-image, search failure returns `-1, -1`
* similarity
  * *integer*, returns the similarity of the found sub-image to the provided **sub_image**, range 1 ~ 100, search failure returns `0`

#### Description

Finds the position of a **sub-image** on the screen.
Adjusts the sub-image with multiple scaling ratios, from 100% to 20%, to improve the success rate of the search.

:::caution Limitation
If multi-resolution compatibility is needed, it is recommended to capture samples on the device with the smallest resolution. Sub-images captured on high-resolution devices may not be found on low-resolution devices.
:::

#### Example 1

```lua title="screen.find_image"
x, y = screen.find_image(  -- Original image position top-left: 354, 274 | bottom-right: 358, 284
"\x89\x50\x4e\x47\x0d\x0a\x1a\x0a\x00\x00\x00\x0d\x49\x48\x44\x52\x00\x00\x00\x04\x00\x00\x00\x0a\x08\x02\x00\x00\x00\x1c\x99\x68\x59\x00\x00\x00\x61\x49\x44\x41\x54\x78\xda\x63\x78\xfd\xf4\xda\xff\xff\xff\xff\xfd\xfb\xf7\xed\xcb\x5b\x86\xf7\xaf\x1f\xfc\x87\x01\x86\x2f\x1f\x5f\x02\xa9\xef\xa7\xce\x7c\xdd\xb1\x9b\xe1\xe7\xf7\xcf\x40\xce\xeb\xb2\xea\x7b\xb2\x6a\x0c\x7f\xff\xfe\x01\x72\x9e\x78\x06\x82\x38\x20\xdd\xbf\x7e\xdd\x57\xd4\x82\x72\x7e\xdd\xba\x0d\x64\x41\x39\x08\xd3\x80\x38\x6b\xe3\x7f\x86\x2a\x30\x02\x72\x8c\xa6\x40\x39\x00\xd5\x7b\x5f\x2e\xfd\xba\xd5\x32\x00\x00\x00\x00\x49\x45\x4e\x44\xae\x42\x60\x82", 95, 0, 0, 639, 1135)
```

:::note
In Lua source code, strings starting with `\x` followed by two hexadecimal digits represent a single byte encoded with that number. For example: `\x58` represents the character `X`.
:::

#### Example 2

```lua title="screen.find_image"
img = image.load_file("/var/mobile/1.png")
x, y = screen.find_image(img)      -- Find image in full screen range
x, y = screen.find_image(img, 85)  -- Find image in full screen range, similarity 85%
```

#### Example 3

```lua title="screen.find_image"
x, y = screen.find_image("/var/mobile/1.png", 95, 0, 0, 639, 1135)  -- Find image in specified area
```

#### Example 4

```lua title="screen.find_image"
local img = image.load_file("/Applications/MobileSafari.app/AppIcon60x60@2x.png")
if img then
  x, y = screen.find_image(img, 80)  -- Find image in full screen range, similarity 80%
  if x ~= -1 then
    touch.tap(x, y)
  else
    sys.alert("Safari icon not found on the screen")
  end
else
  sys.alert("Unable to read Safari icon")
end
```

### 📲 Screen Optical Character Recognition \(**screen\.ocr\_text**\)

#### Declaration 1

```lua
text_list, details = screen.ocr_text {
  left = left, top = top, right = right, bottom = bottom,
  languages = language_list,
  words = candidate_words,
  confidence = min_confidence,
  level = recognition_level,
  timeout = timeout
}
```

#### Declaration 2

```lua
text_list, details = screen.ocr_text([ recognition_level, timeout ])
```

#### Declaration 3

```lua
text_list, details = screen.ocr_text(left, top, right, bottom[, recognition_level, timeout])
```

#### Parameters and Return Values

* left, top, right, bottom
  * *integer*, *optional*, coordinates of the top-left and bottom-right corners of the recognition area. Default **full screen**
* language_list
  * *Enum List*, *optional*, list of recognition languages, default `{ "en-US" }`
    * English `en-US`
    * Simplified Chinese `zh-Hans`
* candidate_words
  * *Text List*, *optional*, used to improve recognition accuracy. Default `{ }`
* min_confidence
  * *integer*, *optional*, minimum confidence of the recognition result, results with confidence lower than this value will be excluded. Range 0.0 ~ 1.0, default `0.0`
* recognition_level *enum*, *optional*
  * `0` indicates accurate recognition, more accurate results but slower, default value
  * `1` indicates fast recognition, less accurate results but faster
* timeout
  * *integer*, *optional*, timeout, in milliseconds. Default `3000`
* text_list
  * *Text List*, list of recognized text from top to bottom, returns an empty list if no text is recognized in the specified area
* details
  * *List*, each element is an *associative table*, corresponding to the text in **text_list**, containing the following fields:
    * `center` *List*, coordinates of the center of the recognition result `{ x, y }`
    * `bounding_box` *List*, bounding box of the recognition result `{ x1, y1, x2, y2 }`
    * `confidence` *float*, confidence of the recognition result, range 0.0 ~ 1.0
    * `recognized_text` *text*, recognized text

```lua title="Details Table Structure"
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

#### Description

Uses Apple’s [Vision](https://developer.apple.com/documentation/vision) framework to perform text recognition on the screen or image, supporting English and Simplified Chinese.

:::note
In fast recognition mode, the recognition speed is about 10 times faster than accurate recognition, but the results are less accurate and often contain errors.
:::

#### [Screen Text Extraction Tutorial](../tutorial-extras/vision-ocr.mdx)

#### Example `screen.ocr_search`

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

#### Example `screen.ocr_match`

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

### 📲 Tesseract Screen Optical Character Recognition \(**screen.tess\_ocr**\)

#### Declaration 1

```lua
require("image.tesseract")  -- Needs to be loaded in advance
--
text, details = screen.tess_ocr([{
  [lang = language,]
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
text, details = screen.tess_ocr([ language ])
```

#### Parameters and Return Values

* language
  * *text*, *optional*, default `"eng"`
* white_list
  * *text*, *optional*, whitelist of allowed characters
* black_list
  * *text*, *optional*, blacklist of filtered characters
* left, top, right, bottom
  * *integer*, *optional*, coordinates of the top-left and bottom-right corners of the recognition area, default **full screen**
* text *text*
* details
  * *associative table*, position description of each visible character in **text**

```lua title="Details Table Structure"
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

#### Description

* **White List** and **Black List** cannot exist simultaneously, the **White List** takes precedence.
* Tesseract OCR language files can be obtained from [tesseract-ocr/tessdata](https://github.com/tesseract-ocr/tessdata) or trained by yourself.
* Prepare the language files and import them into the `/var/mobile/Media/1ferver/tessdata` directory on the device to use.

#### Example

```lua title="screen.tess_ocr"
require("image.tesseract")         -- Needs to be loaded in advance
--
text = screen.tess_ocr()           -- Default is "eng", English recognition
--
text = screen.tess_ocr('chi_sim')  -- Simplified Chinese recognition
--
text = screen.tess_ocr {
  lang = "eng",                  -- English language file
  white_list = "0123456789",     -- Whitelist
}
--
text = screen.tess_ocr {
  lang = "eng",                  -- English language file
  black_list = "abcdefghijk",    -- Blacklist
}
--
text = screen.tess_ocr {
  lang = "chi_sim",              -- Simplified Chinese language file
  white_list = "0123456789.元",  -- Whitelist
}
```

### 📲 Screen QR Code Recognition \(**screen\.qr\_decode**\)

#### Declaration

```lua
text, details = screen.qr_decode([ timeout ])
```

#### Parameters and Return Values

* timeout
  * *integer*, *optional*, timeout, in milliseconds. Default `3000`
* text
  * *text*, returns `nil` if no QR code is recognized within the timeout
* details *associative table*
  * `center` *List*, coordinates of the center of the recognition result on the screen or image `{ x, y }`
  * `bounding_box` *List*, bounding box of the recognition result on the screen or image `{ x1, y1, x2, y2 }`
  * `confidence` *float*, confidence of the recognition result, range 0.0 ~ 1.0
  * `payload` *text*, **text**

#### Description

Uses Apple’s [Vision](https://developer.apple.com/documentation/vision) framework to perform QR code recognition on the screen or image.
Detects the first complete QR code on the screen or image and decodes it. **text** is the `UTF-8` text content obtained from decoding the QR code.

#### Example: Decode a local QR code image file

```lua title="image:qr_decode"
local img = image.load_file("/var/mobile/qr.png")
if img then
  local str = img:qr_decode()
  img:destroy()
  if str then
    sys.alert("Recognition successful\nResult: "..str)
  else
    sys.alert("Recognition failed")
  end
else
  sys.alert("Failed to load image file, the file may not exist")
end
```

#### Example: Decode the QR code displayed on the current screen

```lua title="screen.qr_decode"
local str = screen.qr_decode()
if str then
  sys.alert("Recognition successful\nResult: "..str)
else
  sys.alert("Recognition failed")
end
```

### 📲 Screen Rectangle Detection \(**screen\.detect\_rectangles**\)

#### Declaration 1

```lua
rectangles, details = screen.detect_rectangles {
  left = left, top = top, right = right, bottom = bottom,
  minRatio = min_ratio,
  maxRatio = max_ratio,
  minSize = min_size,
  quadTolerance = max_tilt,
  confidence = min_confidence,
  maxCount = max_count,
  timeout = timeout
}
```

#### Declaration 2

```lua
rectangles, details = screen.detect_rectangles([ max_count, timeout ])
```

#### Declaration 3

```lua
rectangles, details = screen.detect_rectangles(left, top, right, bottom[, max_count, timeout])
```

#### Parameters and Return Values

* left, top, right, bottom
  * *integer*, *optional*, coordinates of the top-left and bottom-right corners of the detection area. Default **full screen**
* min_ratio, max_ratio
  * *float*, *optional*, aspect ratio of the detected rectangles, rectangles with aspect ratios outside this range will be excluded. Range 0.0 ~ 1.0, default `0.1`, `1.0`
* min_size
  * *float*, *optional*, area ratio of the detected rectangles to the screen or image area, smaller rectangles will be excluded. Range 0.0 ~ 1.0, default `0.2`
* max_tilt
  * *float*, *optional*, maximum tilt angle of the detected rectangles, rectangles with tilt angles greater than this value will be excluded. Range 0.0 ~ 45.0, default `30.0`
* min_confidence
  * *float*, *optional*, minimum confidence of the detected rectangles, rectangles with confidence lower than this value will be excluded. Range 0.0 ~ 1.0, default `0.0`
* max_count
  * *integer*, *optional*, maximum number of rectangles to return. Default `1`
* timeout
  * *integer*, *optional*, timeout, in milliseconds. Default `3000`
* rectangles
  * *table*, returns a table of rectangle positions, each element is a *List* containing eight *float* elements, corresponding to the four vertices of the detected rectangle, in the order of top-left, top-right, bottom-left, bottom-right
* details
  * *List*, each element is an *associative table*, corresponding to the elements in **rectangles**, containing the following fields:
    * `center` *List*, coordinates of the center of the recognition result on the screen or image `{ x, y }`
    * `bounding_box` *List*, bounding box of the recognition result on the screen or image `{ x1, y1, x2, y2 }`
    * `confidence` *float*, confidence of the recognition result, range 0.0 ~ 1.0
    * `payload` *List*, containing eight *float* elements, corresponding to the four vertices of the detected rectangle, in the order of top-left, top-right, bottom-left, bottom-right

```lua title="Details Table Structure"
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

#### Description

Uses Apple’s [Vision](https://developer.apple.com/documentation/vision) framework to detect quadrilaterals (rectangles with eight degrees of freedom) on the screen or image.

#### Example: Capture a card on the screen and save to album

```lua title="screen.detect_rectangles"
rects, details = screen.detect_rectangles()
if #rects > 0 then
  local box = details[1].bounding_box
  screen.image(box[1], box[2], box[3], box[4]):save_to_album()
end
```
