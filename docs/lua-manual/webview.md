---
sidebar_position: 23
---

# Web View Module

## Web View Module - webview

### Display a Web View \(**webview\.show**\)

#### Declaration

```lua
webview.show {  -- All parameters are optional
  id = view_id,
  html = html_content,
  x = origin_x_coordinate,
  y = origin_y_coordinate,
  width = width,
  height = height,
  corner_radius = corner_radius,
  alpha = opacity,
  animation_duration = animation_duration,
  rotate = rotation_angle,
  level = window_level,
  opaque = opaque_range,
  ignores_hit = ignore_touch_events,
  can_drag = draggable,
}
```

#### Field Description

- view_id
  - *integer*, *optional*, different **View IDs** can be used to display multiple Web Views simultaneously. The range is 1 ~ 1000, default is `1`.
- html_content
  - *string*, *optional*, defaults to **the content set during the last call to `webview.show`**.
- origin_x_coordinate
  - *integer*, *optional*, distance from the left side of the screen. Default is `0`.
- origin_y_coordinate
  - *integer*, *optional*, distance from the top of the screen. Default is `0`.
- width
  - *integer*, *optional*, defaults to **screen width**.
- height
  - *integer*, *optional*, defaults to **screen height**.
- opacity
  - *float*, *optional*, range is 0.0 ~ 1.0. Default is `1.0`.
- corner_radius
  - *float*, *optional*, default is `0.0`.
- animation_duration
  - *float*, *optional*, animation duration from the last state to the current state. Default is `0.0`.
- rotation_angle *float*, *optional*
  - Portrait: `0.0`, default value.
  - Landscape with Home on the right: `90.0`.
  - Upside-down portrait: `180.0`.
  - Landscape with Home on the left: `270.0`.
- window_level
  - *float*, *optional*, default is `1100.0`.
- opaque_range
  - *boolean*, *optional*, default is `true`, meaning the background is opaque.
- ignore_touch_events
  - *boolean*, *optional*, default is `false`, meaning touch events are not ignored. This property cannot be changed after the Web View is created.
- draggable
  - *boolean*, *optional*, default is `false`, meaning it cannot be dragged.

#### Description

Displays a Web View on the screen with the specified parameters. If the Web View is already displayed, its parameters will be updated.

#### [Example for this section](#Example-Code)

### Hide a Web View \(**webview\.hide**\)

#### Declaration

```lua
webview.hide([ view_id ])
```

#### Parameters and Return Values

- View ID
  - *integer*, *optional*, default is `1`.

#### Description

Temporarily hides a Web View.

#### [Example for this section](#Example-Code)

### Execute JavaScript on a Web View \(**webview\.eval**\)

#### Declaration

```lua
result_text = webview.eval(js_text[, view_id])
```

#### Parameters and Return Values

- JS Text
  - *string*, JavaScript code to execute.
- View ID
  - *integer*, *optional*, default is `1`.
- Result Text
  - *string*, returns the result of the executed code.

#### Description

Executes a JavaScript snippet on a Web View and retrieves the result as text.

#### Example

```lua title="webview.eval"
r = webview.eval("a = 3; b = 2; a * b;")
```

### Get the Frame and Level Information of a Web View \(**webview\.frame**\)

#### Declaration

```lua
frame_info = webview.frame([ view_id ])
```

#### Parameters and Return Values

- view_id
  - *integer*, *optional*, default is `1`.
- frame_info *associative table*

#### Example

```lua title="webview.frame"
local frame = webview.frame()
sys.alert(
  "Position: " .. "(" .. frame.x .. "," .. frame.y .. ")\n" ..
  "Size: " .. "(w: " .. frame.width .. ", h: " .. frame.height .. ")\n" ..
  "Level: " .. "(" .. frame.level .. ")"
)
```

### Destroy a Web View \(**webview\.destroy**\)

#### Declaration

```lua
webview.destroy([ view_id ])
```

#### Parameters and Return Values

- view_id
  - *integer*, *optional*, default is `1`.

:::info
When the script ends, all displayed Web Views will be automatically destroyed.
:::

#### [Example for this section](#Example-Code)

## Example Code

```lua title="webview.demo"
local html = [==[
<!DOCTYPE html>
<html>
  <head>
    <script src="/js/jquery.min.js"></script>
    <script src="/js/jquery.json.min.js"></script>
    <script type="text/javascript">
      $(document).ready(function() {
        $("#toast_content").val("Toast Content");
        $("#close_page").click(function() {
          $.post("/proc_queue_push", '{"key": "Message from Web View","value": "Close Page"}', function() {});
        });
        $("#show_toast").click(function() {
          $.post("/proc_put", $.toJSON({
            key: "Toast Content",
            value: $("#toast_content").val()
          }), function() {});
          $.post("/proc_queue_push", '{"key": "Message from Web View","value": "Show Toast"}', function() {});
        });
        $("#slide_down").click(function() {
          $.post("/proc_queue_push", '{"key": "Message from Web View","value": "Slide Down"}', function() {});
          $(this).hide();
        });
        $("#full_vertical").click(function() {
          $.post("/proc_queue_push", '{"key": "Message from Web View","value": "Full Vertical"}', function() {});
        });
        $("#full_landscape").click(function() {
          $.post("/proc_queue_push", '{"key": "Message from Web View","value": "Full Landscape"}', function() {});
        });
      });
    </script>
  </head>
  <body>
    <p>Dynamic Web View Demo</p>
    <p>
      <button id="close_page" type="button">Click to Close Page</button>
    </p>
    <p>
      <button id="show_toast" type="button">Show a Toast</button>
      <input type="text" id="toast_content" />
    </p>
    <p>
      <button id="full_vertical" type="button">Full Vertical</button>
      <button id="full_landscape" type="button">Full Landscape</button>
    </p>
    <p>
      <button id="slide_down" type="button">Slide View Down</button>
    </p>
    <select>
      <option value="o1">Option 1</option>
      <option value="o2">Option 2</option>
      <option value="o3">Option 3</option>
      <option value="o4">Option 4</option>
    </select>
  </body>
</html>
]==]
--
local w, h = screen.size()
--
local factor = 1  -- Default height for 2x devices
if w == 1242 or w == 1080 then
  factor = 1.5    -- iPhone 6S Plus resolution is 3x
elseif w == 320 or w == 768 then
  factor = 0.5    -- Pre-iPhone 3Gs resolution is 1x
end
--
webview.show {    -- Reset Web View position to top-left corner
  x = 0,
  y = 0,
  width = w - 40 * factor,
  height = (500) * factor,
  alpha = 0,
  animation_duration = 0,
}
--
webview.show {    -- Slide out from top-left corner in 0.3 seconds
  html = html,
  x = 20 * factor,
  y = 50 * factor,
  width = (w - 40 * factor),
  height = (500) * factor,
  corner_radius = 10,
  alpha = 0.7,
  animation_duration = 0.3,
}
--
proc.queue_clear("Message from Web View", "")  -- Clear dictionary values to listen for
local eid = thread.register_event(            -- Register event to listen for dictionary state changes
  "Message from Web View",
  function(val)
    if val == "Close Page" then
      webview.show {
        x = 20 * factor,
        y = 500 * factor * 2,
        width = (w - 40 * factor),
        height = (500 - 70) * factor,
        corner_radius = 10,
        alpha = 0,
        animation_duration = 0.8,
      }
      sys.msleep(800)
      webview.destroy()
      sys.toast("Page thread ended")
      return true                              -- Return true to stop current listener
    elseif val == "Slide Down" then
      webview.show {
        x = 20 * factor,
        y = (50 + 300) * factor,               -- Y coordinate + 300
        width = (w - 40  * factor),
        height = (500 - 70) * factor,          -- Adjust height as slide down button is hidden
        corner_radius = 10,
        alpha = 0.7,
        animation_duration = 0.5,              -- Duration 0.5 seconds
      }
    elseif val == "Full Vertical" then
      webview.show {}                          -- Set Web View to full screen
    elseif val == "Full Landscape" then
      webview.show { rotate = 90 }             -- Set Web View to full landscape
    elseif val == "Show Toast" then
      sys.toast(proc.get("Toast Content"))
    end
  end
)
--
sys.msleep(3000)
sys.toast("Main thread ended")
```
