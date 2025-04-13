---
sidebar_position: 7
---

# Simulated Touch Module

## Simulated Touch Module - touch

Functions marked with 🚥 may **yield** in the [**Thread Module**](thread.md). Before these function calls return, other **threads** may get a chance to run.

### Enable Visualization of Touch Events \(**touch\.show\_pose**\)

#### Declaration

```lua
touch.show_pose(is_visible)
```

#### Parameters and Return Values

- is_visible *boolean*

#### Description

Displays the positions of touch events on the screen for debugging purposes.

:::caution Performance
It is recommended to call this function only during development and debugging, as it may affect the stability of production scripts.
:::

#### Example

```lua title="touch.show_pose"
touch.show_pose(true)
touch.tap(100, 100)
```

### Simulate a Single Tap on the Screen \(**touch\.tap**\)

#### Declaration

```lua
touch.tap(x, y[, delay_ms, post_action_wait_ms ])
```

#### Parameters and Return Values

- x, y
  - *integer*, the coordinates of the point to tap in the current [rotated coordinate system](screen.md#initialize-rotated-coordinate-system-screeninit)
- delay_ms
  - *integer*, *optional*, the interval between touching and releasing the screen, in milliseconds, default is `30`
- post_action_wait_ms
  - *integer*, *optional*, the waiting time after the tap is completed, in milliseconds, default is `0`

:::note
This method automatically allocates and occupies a **finger ID** before the call is completed. The number of **finger IDs** is limited (approximately 30). Calling [`touch.on`](#simulate-finger-touch-on-the-screen-touchon) or `touch.tap` beyond the limit will throw a `finger pool overflow` error. Be careful not to **simultaneously occupy** too many **finger IDs**, or release them promptly using the `touch:off` method.
:::

#### Example

```lua title="touch.tap"
touch.tap(100, 100)  -- Tap the screen at position 100, 100
--
touch.tap(100, 100, 300)  -- Tap the screen at position 100, 100, hold for 0.3 seconds, then release
--
touch.tap(100, 100, 300, 1000)  -- Tap the screen at position 100, 100, hold for 0.3 seconds, then release, and wait for 1 second
```

### Simulate Finger Touch on the Screen \(**touch\.on**\)

#### Declaration

```lua
touch_event = touch.on(x, y)
```

#### Parameters and Return Values

- x, y
  - *integer*, the coordinates of the point to touch in the current [rotated coordinate system](screen.md#initialize-rotated-coordinate-system-screeninit)
- touch_event *touch event object*

#### Description

Simulates a finger touching the screen at a specified position and returns a *touch event object* to manipulate the touch process.

:::note
This method automatically allocates and occupies a **finger ID** before the call is completed. The number of **finger IDs** is limited (approximately 30). Calling `touch.on` or [`touch.tap`](#simulate-a-single-tap-on-the-screen-touchtap) beyond the limit will throw a `finger pool overflow` error. Be careful not to **simultaneously occupy** too many **finger IDs**, or release them promptly using the `touch:off` method.
:::

:::info
This function can also be called in the following way (where **finger ID** must be any number in the range 1 ~ 29, and you need to manage **finger IDs** manually).

```lua
touch_event = touch.on(finger_id, x, y)
```

:::

#### Example

```lua title="touch.on"
-- Simulate a finger touching the screen at position 100, 100, then moving smoothly to position 200, 200, and then releasing
touch.on(100, 100):move(200, 200):off()
--
touch.on(1, 100, 100)  -- Simulate a finger with ID 1 touching the screen at position 100, 100
touch.off(1)           -- Release the finger with ID 1
```

### Simulate Finger Release from the Screen \(**touch:off**\)

#### Declaration

```lua
touch_event:off([ x, y ])
```

#### Parameters and Return Values

- x, y
  - *integer*, *optional*, the coordinates of the point where the finger leaves the screen in the current [rotated coordinate system](screen.md#initialize-rotated-coordinate-system-screeninit), default is the coordinates recorded by the current *touch event object*
- touch_event
  - *touch event object*, obtained by calling the [`touch.on`](#simulate-finger-touch-on-the-screen-touchon) function to manipulate the current touch event

#### Description

Simulates a finger leaving the screen from the current or specified position. This method releases the current touch event object.

:::note
This method releases the **finger ID** occupied by the *touch event object* returned by [`touch.on`](#simulate-finger-touch-on-the-screen-touchon).
:::

:::info
This method can also be called in the following way (where **finger ID** must be any number in the range 1 ~ 29).

```lua
touch.off(finger_id)
touch.off(finger_id, x, y)
```

:::

#### Example

```lua
touch.on(100, 100):off()  -- Simulate a finger touching the screen at position 100, 100, then releasing at the same position
--
touch.on(100, 100):off(105, 95)  -- Simulate a finger touching the screen at position 100, 100, then releasing at position 105, 95
--
-- Another usage
touch.on(1, 100, 100)  -- Simulate a finger with ID 1 touching the screen at position 100, 100
for i=1,100 do         -- Gradually move the finger with ID 1 to position 100, 200
  touch.move(1, 100, 100 + i)
end
touch.off(1)           -- Release the finger with ID 1
```

### Simulate Finger Movement on the Screen \(**touch:move**\)

#### Declaration

```lua
touch_event = touch_event:move(x, y[, pressure, angle, option_flags])
```

#### Parameters and Return Values

- x, y
  - *integer*, the coordinates of the point to move to in the current [rotated coordinate system](screen.md#initialize-rotated-coordinate-system-screeninit)
- pressure
  - *integer*, *optional*, the pressure applied by the finger on the screen. Range is 0 ~ 1e4, default is `0`
- angle
  - *integer*, *optional*, the angle of pressure applied by the finger on the screen. Range is -100 ~ 100, default is `0`
- option_flags
  - *integer*, *optional*, usually used during recording to specify screen gesture information
- touch_event
  - *touch event object*, obtained by calling the [`touch.on`](#simulate-finger-touch-on-the-screen-touchon) function to manipulate the current touch event

#### Description

Simulates a finger moving from the current position to another position.

:::info
This method can also be called in the following way (where **finger ID** must be any number in the range 1 ~ 29). The `touch.move` method differs from the `touch:move` method in that it moves to the target position immediately and does not allow setting steps.

```lua
touch.move(finger_id, x, y)  -- Move immediately to the target position
--
touch.move(finger_id, x, y[, pressure, angle, option_flags])  -- Move immediately to the target position, with pressure and angle settings
```

:::

:::caution Deprecated
The parameters **pressure** and **angle** are not recommended for use.
Since Apple removed the 3D Touch hardware from devices starting with iPhone XR and iPhone 11, these parameters have become ineffective.
:::

#### Example

```lua title="touch:move"
-- Simulate a finger touching the screen at position 100, 100, then moving smoothly to position 200, 200, and then releasing
touch.on(100, 100):move(200, 200):off()
--
-- Another usage
touch.on(1, 100, 100)  -- Simulate a finger with ID 1 touching the screen at position 100, 100
for i=1,100 do         -- Gradually move the finger with ID 1 to position 100, 200
  touch.move(1, 100, 100 + i)
end
touch.off(1)           -- Release the finger with ID 1
```

### Set Step Delay for Touch Event Object Movement \(**touch:step\_delay**\)

#### Declaration

```lua
touch_event = touch_event:step_delay(step_delay)
```

#### Parameters and Return Values

- step_delay
  - *float*, *optional*, the delay time for each step, in milliseconds, default is `0.1`
- touch_event
  - *touch event object*, obtained by calling the [`touch.on`](#simulate-finger-touch-on-the-screen-touchon) function to manipulate the current touch event

#### Description

Sets the delay for each step when the current touch event object uses the [`touch:move`](#simulate-finger-movement-on-the-screen-touchmove) method to slide.

#### Example

```lua title="touch:step_delay"
-- Simulate a finger touching the screen at position 100, 100, sliding to position 200, 200 with a step length of 3 and a step delay of 0.2 milliseconds, then releasing
touch.on(100, 100):step_len(3):step_delay(0.2):move(200, 200):off()
```

### Set Step Length for Touch Event Object Movement \(**touch:step\_len**\)

#### Declaration

```lua
touch_event = touch_event:step_len(step_length)
```

#### Parameters and Return Values

- step_length
  - *integer*, *optional*, default is `2`
- touch_event
  - *touch event object*, obtained by calling the [`touch.on`](#simulate-finger-touch-on-the-screen-touchon) function to manipulate the current touch event

#### Description

Sets the step length for the current touch event object when using the [`touch:move`](#simulate-finger-movement-on-the-screen-touchmove) method to slide.

#### Example

```lua title="touch:step_len"
-- Simulate a finger touching the screen at position 100, 100, sliding to position 200, 200 with a step length of 3 and a step delay of 0.2 milliseconds, then releasing
touch.on(100, 100):step_len(3):step_delay(0.2):move(200, 200):off()
```

### 🚥 Millisecond-Level Delay \(**touch:msleep**\)

#### Declaration

```lua
touch_event = touch_event:msleep(milliseconds)
```

#### Parameters and Return Values

- milliseconds
  - *float*, *optional*, delay time in milliseconds, default is `0.1`
- touch_event
  - *touch event object*, obtained by calling the [`touch.on`](#simulate-finger-touch-on-the-screen-touchon) function to manipulate the current touch event

#### Description

This method does not affect the **touch event**; it simply blocks the current thread. This method has an alias `touch:delay`.

#### Example

```lua title="touch:msleep"
-- Simulate a finger touching the screen at position 100, 100, waiting for 300 milliseconds, then releasing
touch.on(100, 100):msleep(300):off()
```

### Simulate Finger Pressure on the Screen \(**touch:press**\)

#### Declaration

```lua
touch_event = touch_event:press([ pressure, angle ])
```

#### Parameters and Return Values

- pressure
  - *integer*, *optional*, the pressure applied by the finger on the screen. Range is 0 ~ 1e4, default is `1e3`
- angle
  - *integer*, *optional*, the angle of pressure applied by the finger on the screen. Range is -100 ~ 100, default is `0`
- touch_event
  - *touch event object*, obtained by calling the [`touch.on`](#simulate-finger-touch-on-the-screen-touchon) function to manipulate the current touch event

#### Description

Simulates a finger applying pressure at the current position. This method can only be used on devices that support 3D Touch.

#### Example

```lua title="touch:press"
touch.on(100, 100):press():off()  -- Simulate a finger touching the screen at position 100, 100, pressing down, then releasing
--
touch.on(100, 100):press(2000):off()  -- Same as above but with increased pressure
--
touch.on(100, 100):press(2000, 50):off()  -- Same as above but with increased pressure and slower pressing speed
```

## Example Code

```lua
-- Example 1:
touch.on(306, 300):step_len(2):step_delay(0):move(350, 800):msleep(1000):off()
--
-- Example 2:
touch.on(306, 300)  -- Simulate a finger touching the screen at position 306, 300
  :step_len(2)      -- Set step length to 2
  :step_delay(0)    -- Set step delay to 0
  :move(350, 800)   -- Move to position 350, 800 with the above parameters
  :msleep(1000)     -- Wait for 1000 milliseconds (1 second)
:off()              -- Release the finger
--
-- Example 3:
local te = touch.on(306,300)
te:step_len(2)
te:step_delay(0)
te:move(350, 800)
te:msleep(1000)
te:off()
--
-- Example 4:
touch.on(306, 300)
  :move(350, 800)
  :msleep(1000)
:off()
--
-- Equivalent to:
touch.on(306, 300):move(350, 800):msleep(1000):off()
--
-- Example 5:
touch.on(306, 300):msleep(30):off()  -- Simulate a single tap on the screen
--
```

### Tips for Fast and Precise Sliding

```lua
-- Fast and precise sliding may require some techniques. See the example and comments below:
touch.on(125, 2000) -- Press down at the starting coordinate
  :step_len(10)     -- Set a long step length for faster sliding
  :move(125, 555)   -- Quickly move close to the target position
  :step_len(1)      -- Set a short step length to buffer and prevent inertia
  :move(125, 505)   -- Slowly move to the target position
  :delay(100)       -- Wait for a while before releasing
:off()              -- Release the finger
```
