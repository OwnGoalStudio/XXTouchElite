---
sidebar_position: 6
---

# Simulated Key Module

## Simulated Key Module - key

### Simulate Pressing a Physical Key \(**key\.press**\)

#### Declaration

```lua
key.press(key_code)
```

#### Parameters and Return Values

- key_code
  - *string*, the [key code](../appendix/supported-keycodes.md) of the physical key

#### Description

Simulates pressing and then releasing a physical key.

### Simulate Holding Down a Physical Key \(**key\.down**\)

#### Declaration

```lua
key.down(key_code)
```

#### Parameters and Return Values

- key_code
  - *string*, the [key code](../appendix/supported-keycodes.md) of the physical key

#### Description

Simulates holding down a physical key.

:::caution
This function should have a corresponding [`key.up`](#release-a-pressed-physical-key-keyup) call; otherwise, if the script terminates, the key may remain pressed indefinitely.
:::

### Release a Pressed Physical Key \(**key\.up**\)

#### Declaration

```lua
key.up(key_code)
```

#### Parameters and Return Values

- key_code
  - *string*, the [key code](../appendix/supported-keycodes.md) of the physical key

#### Description

Simulates releasing a pressed physical key.

### Simulate Typing Text \(**key\.send\_text**\)

#### Declaration

```lua
key.send_text(text[, delay_per_key])
```

#### Parameters and Return Values

- text
  - *string*, the text to be input, can only include English letters, numbers, half-width characters, and `"\b"` `"\r"` `"\t"`
- delay_per_key
  - *integer*, *optional*, the delay for each key press, defaults to no delay for maximum input speed based on device performance

#### Description

Splits the **text** into individual characters, simulates pressing the corresponding physical keys, and then releases them.

#### Example

```lua
key.send_text("AbC12#")  -- Type text as quickly as possible
--
key.send_text("AbC12#", 300)  -- Delay 0.3 seconds per key press
```

## Example Code

### Simulate Pressing the HOME Key

```lua title="key.press"
key.press("HOMEBUTTON")
```

### Simulate Holding Down the HOME Key

```lua title="key.press"
key.down("HOMEBUTTON") -- Hold down the HOME key
sys.msleep(1000) -- Wait for 1 second
key.up("HOMEBUTTON") -- Release the HOME key
```

### Simulate Double-Clicking the HOME Key

```lua title="key.press"
key.press("HOMEBUTTON")
key.press("HOMEBUTTON")
```

### Simulate Pressing the Lock Key (Power Key)

```lua title="key.press"
key.press("LOCK")
```

### Simulate Pressing the Enter Key

```lua title="key.press"
key.press("RETURN")
```

### Other Simulations

```lua title="key.press"
-- The following example simulates the combination key [command + v] to paste clipboard text (not control + v on Windows)
key.down("LEFTCOMMAND") -- Hold down the command key
sys.msleep(20) -- Wait for 20 milliseconds
key.press("V") -- Press the v key
sys.msleep(20) -- Wait for 20 milliseconds
key.up("LEFTCOMMAND") -- Release the command key
--
key.press("VOLUMEUP") -- Press the volume up key
key.press("VOLUMEDOWN") -- Press the volume down key
--
key.down("VOLUMEUP") -- Hold down the volume up key
sys.msleep(1000) -- Wait for 1 second
key.up("VOLUMEUP") -- Release the volume up key
--
key.down("LOCK") -- Hold down the lock key (power key)
sys.msleep(3000) -- Wait for 3 seconds
key.up("LOCK") -- Release the lock key (power key)
--
key.press("SHOW_HIDE_KEYBOARD") -- Press the [Show/Hide Keyboard Key] to hide the virtual keyboard
--
key.press("SHOW_HIDE_KEYBOARD") -- Press the [Show/Hide Keyboard Key] again to show the virtual keyboard
--
-- The following example simulates the combination key [Lock Key + HOME Key] to take a screenshot and save it to the album
key.down("LOCK") -- Hold down the lock key (power key)
sys.msleep(100) -- Wait for 100 milliseconds
key.press("HOMEBUTTON") -- Press the HOME key
sys.msleep(100) -- Wait for 100 milliseconds
key.up("LOCK") -- Release the lock key (power key)
--
-- Combination key to switch input methods
key.down("LEFTCONTROL")
sys.msleep(50)
key.press("SPACE")
sys.msleep(50)
key.up("LEFTCONTROL")
```
