---
sidebar_position: 2
---

# Device Module

## Device Module - device

### Reset Auto Lock Timer \(**device\.reset\_idle**\)

#### Declaration

```lua
device.reset_idle()
```

#### Description

Resets the auto lock timer (keeps the screen awake).

:::caution Performance
It is not recommended to use this function too frequently. Excessive usage (more than `10` times per second) may cause service or system crashes.
:::

#### Example

```lua title="device.reset_idle"
thread.dispatch(function()
  while 1 do
    device.reset_idle()
    sys.msleep(29 * 1000)
  end
end)  -- Dispatch a task to reset the IDLE timer every 29 seconds
```

### Lock and Unlock Screen \(**device\.lock,unlock\_screen/device\.is\_screen\_locked**\)

#### Declaration

```lua
device.lock_screen()                -- Lock the screen
device.unlock_screen([ Lock Password ])    -- Unlock the screen
is_locked = device.is_screen_locked()  -- Get screen lock status
```

#### Parameters and Return Values

- Lock Password
  - *string*, *optional*, leave empty if no lock password is set
- is_locked *boolean*

#### Example

```lua title="device.is_screen_locked"
if device.is_screen_locked() then
  -- Screen is locked
else
  -- Screen is unlocked
end
```

### Get Foreground App Orientation \(**device\.front\_orien**\)

#### Declaration

```lua
orientation = device.front_orien()
```

#### Parameters and Return Values

- orientation *integer*
  - Returns `0` if home is at the bottom
  - Returns `1` if home is on the right
  - Returns `2` if home is on the left
  - Returns `3` if home is at the top
  - Returns `4` if an error occurred

#### Example

```lua title="device.front_orien"
sys.toast('This message will display in the orientation of the foreground app', device.front_orien())
```

### Lock and Unlock Device Screen Rotation \(**device\.lock,unlock\_orien/device\.is\_orien\_locked**\)

#### Declaration

```lua
device.lock_orien()                -- Lock screen rotation
device.unlock_orien()              -- Unlock screen rotation
is_locked = device.is_orien_locked()  -- Get screen rotation lock status
```

#### Parameters and Return Values

- is_locked *boolean*

#### Example

```lua title="device.is_orien_locked"
if device.is_orien_locked() then
  -- Screen rotation is locked
else
  -- Screen rotation is not locked
end
```

### Vibrate Device \(**device\.vibrator**\)

#### Declaration

```lua
device.vibrator()
```

#### Description

Vibrate the device (devices without a vibration motor cannot vibrate).

### Play Sound in Background \(**device\.play\_sound**\)

#### Declaration

```lua
device.play_sound(Sound File Path[, Play Asynchronously])
```

#### Parameters and Return Values

- Sound File Path
  - *string*, absolute path of the sound file, supports `mp3`, `wav`, `aac`, etc.
- Play Asynchronously
  - *boolean*, *optional*, defaults to `false` (synchronous playback) if not specified

#### Description

Play a sound in the background.

:::note
When this function is called asynchronously, it does not affect script execution. The sound will stop when the script ends. If the script needs to play the full sound, ensure a delay before exiting.
:::

#### Example

```lua title="device.play_sound"
device.play_sound("/var/mobile/ten_years.mp3", true)  -- Play asynchronously
sys.msleep(205 * 1000)  -- Wait for 205 seconds (3 minutes 25 seconds)
```

### Get Device Type \(**device\.type**\)

#### Declaration

```lua
device_type = device.type()
```

#### Parameters and Return Values

- device_type
  - *string*, a string like `"iPhone3,1"`

#### Example

```lua title="device.type"
if device.type() == "iPhone3,1" then
  -- It's an iPhone 4
end
```

### Get and Set Device Name \(**device\.name/device\.set\_name**\)

#### Declaration

```lua
device_name = device.name()   -- Get device name
device.set_name(device_name)  -- Set device name
```

#### Parameters and Return Values

- device_name *string*

#### Description

The device name is the name set by the user in **Settings** → **General** → **About**.

#### Example

```lua title="device.name"
device.set_name("iPhavonz")  -- Set device name to "iPhavonz"
sys.alert("The device name is: "..device.name())
```

### Get Device UDID \(**device\.udid**\)

#### Declaration

```lua
udid = device.udid()
```

#### Parameters and Return Values

- udid *string*

#### Description

[UDID Reference](https://www.theiphonewiki.com/wiki/UDID)

#### Example

```lua title="device.udid"
sys.alert("The device UDID is: "..device.udid())
```

### Get Device Serial Number \(**device\.serial\_number**\)

#### Declaration

```lua
serial_number = device.serial_number()
```

#### Parameters and Return Values

- serial_number *string*

#### Example

```lua title="device.serial_number"
sys.alert("The device serial number is: "..device.serial_number())
```

### Get Device Wi-Fi MAC Address \(**device\.wifi\_mac**\)

#### Declaration

```lua
wifi_mac = device.wifi_mac()
```

#### Parameters and Return Values

- wifi_mac *string*

#### Example

```lua title="device.wifi_mac"
sys.alert("The device Wi-Fi MAC address is: "..device.wifi_mac())
```

### Get Device Bluetooth MAC Address \(**device\.bluetooth\_mac**\)

#### Declaration

```lua
bluetooth_mac = device.bluetooth_mac()
```

#### Parameters and Return Values

- bluetooth_mac *string*

### Get All Interface IPs of the Device \(**device\.ifaddrs**\)

#### Declaration

```lua
interface_info_array = device.ifaddrs()
```

#### Parameters and Return Values

- interface_info_array
  - *list*, structure as follows

```lua
{ {"Interface1", "IP1"}, {"Interface2", "IP2"}, ... }
```

#### Description

Get all interface IPs of the device.

#### Example

```lua title="device.ifaddrs"
-- Get the Wi-Fi IP of the device
local ip = "Wi-Fi is off"
for i,v in ipairs(device.ifaddrs()) do
  if (v[1]=="en0") then
    ip = v[2]
  end
end
sys.alert(ip)
```

### Get Current Device Battery Level \(**device\.battery\_level**\)

#### Declaration

```lua
battery_level = device.battery_level()
```

#### Parameters and Return Values

- battery_level
  - *float*, remaining battery level, range 0.0 ~ 1.0

#### Example

```lua title="device.battery_level"
sys.alert("Current device battery level: "..(device.battery_level() * 100).."%")
```

### Get Current Device Charging State \(**device\.battery\_state**\)

#### Declaration

```lua
charging_state = device.battery_state()
```

#### Parameters and Return Values

- charging_state *string*
  - Returns `"Full"` if connected to power and fully charged
  - Returns `"Charging"` if connected to power and charging
  - Returns `"Unplugged"` if not connected to power
  - Returns `"Unknown"` if the state is unknown

#### Example

```lua title="device.battery_state"
state_table = {
  Full = "Connected and fully charged",
  Charging = "Connected and charging",
  Unplugged = "Not connected to power",
  Unknown = "Unknown state",
}
--
sys.alert("Current device charging state: "..state_table[device.battery_state()])
```

### Turn On/Off Device Wi-Fi \(**device\.turn\_on,off\_wifi**\)

#### Declaration

```lua
device.turn_on_wifi()          -- Turn on Wi-Fi
device.turn_off_wifi()         -- Turn off Wi-Fi
is_on = device.is_wifi_on()    -- Get Wi-Fi status
```

#### Parameters and Return Values

- is_on *boolean*

### Turn On/Off Device Cellular Data \(**device\.turn\_on,off\_data**\)

#### Declaration

```lua
device.turn_on_data()         -- Turn on cellular data
device.turn_off_data()        -- Turn off cellular data
is_on = device.is_data_on()   -- Get cellular data status
```

#### Parameters and Return Values

- is_on *boolean*

### Turn On/Off Device Bluetooth \(**device\.turn\_on,off\_bluetooth**\)

#### Declaration

```lua
device.turn_on_bluetooth()         -- Turn on Bluetooth
device.turn_off_bluetooth()        -- Turn off Bluetooth
is_on = device.is_bluetooth_on()   -- Get Bluetooth status
```

#### Parameters and Return Values

- is_on *boolean*

### Turn On/Off Device Airplane Mode \(**device\.turn\_on,off\_airplane**\)

#### Declaration

```lua
device.turn_on_airplane()         -- Turn on airplane mode
device.turn_off_airplane()        -- Turn off airplane mode
is_on = device.is_airplane_on()   -- Get airplane mode status
```

#### Parameters and Return Values

- is_on *boolean*

### Connect/Disconnect Current Selected VPN \(**device\.turn\_on,off\_vpn**\)

#### Declaration

```lua
device.turn_on_vpn()         -- Connect to the currently selected VPN
device.turn_off_vpn()        -- Disconnect the currently connected VPN
is_on = device.is_vpn_on()   -- Get VPN status
```

#### Parameters and Return Values

- is_on *boolean*

#### Description

- Attempts to connect to the selected VPN. If none is selected, nothing happens.
- Attempts to disconnect the currently connected VPN. If no VPN is connected or attempting to connect, nothing happens.
- When the VPN is connecting (not yet connected), **is_on** is `true`.

:::tip
It is recommended to use the [`vpnconf`](./vpnconf.md) module.
:::

#### Example

```lua title="device.is_vpn_on"
while true do
  local is_on, stat = device.is_vpn_on()
  if is_on then
    sys.toast(stat)
  else
    device.turn_on_vpn()
  end
end
```

### Turn On/Off Device Flashlight \(**device\.flash\_on,off**\)

#### Declaration

```lua
success = device.flash_on()     -- Turn on flashlight
success = device.flash_off()    -- Turn off flashlight
is_on = device.is_flash_on()    -- Get flashlight status
```

#### Parameters and Return Values

- success
  - *boolean*, whether the device can turn on the camera and has flashlight hardware
- is_on *boolean*

#### Description

Turns on the device flashlight. The flashlight will automatically turn off when the script ends.

#### Example

```lua title="device.flash_off"
if device.flash_off() then
  -- Device has a flashlight
else
  -- Device does not have a flashlight
end
```

### Get and Set Backlight Brightness \(**device\.brightness/device\.set\_brightness**\)

#### Declaration

```lua
brightness = device.brightness()   -- Get backlight brightness
device.set_brightness(brightness)  -- Set backlight brightness
```

#### Parameters and Return Values

- brightness
  - *float*, range 0.0 ~ 1.0

#### Description

Setting the backlight brightness will disable the device’s auto-brightness adjustment feature.

#### Example

```lua title="device.set_brightness"
sys.toast(device.brightness())
for i = 1, 10 do
  device.set_brightness(i/10)
  sys.msleep(200)
end
for i = 10, 5, -1 do
  device.set_brightness(i/10)
  sys.msleep(200)
end
```

### Get and Set Auto Lock Time in Minutes \(**device\.autolock\_time/device\.set\_autolock\_time**\)

#### Declaration

```lua
minutes = device.autolock_time()   -- Get auto lock time in minutes
device.set_autolock_time(minutes)  -- Set auto lock time in minutes
```

#### Parameters and Return Values

- minutes
  - *integer*, set `<= 0` for never locking the screen

#### Description

Can only be set to the minute levels available on the device.

#### Example

```lua title="device.set_autolock_time"
device.set_autolock_time(0)  -- Never lock the screen
```

### Set Device Volume \(**device\.set\_volume**\)

#### Declaration

```lua
device.set_volume(volume)
```

#### Parameters and Return Values

- volume
  - *float*, range 0.0 ~ 1.0

#### Example

```lua title="device.set_volume"
device.set_volume(0)  -- Mute the device
```

### Get and Set Device Mute State \(**device\.is\_mute\_on/device\.mute\_on,off**\)

#### Declaration

```lua
is_mute = device.is_mute_on()  -- Get device mute state
device.mute_on()               -- Enable device mute
device.mute_off()              -- Disable device mute
```

#### Parameters and Return Values

- is_mute *boolean*

### Scan Wireless Access Points \(**device\.scan\_wifi**\)

#### Declaration

```lua
access_points = device.scan_wifi()
```

#### Parameters and Return Values

- access_points
  - *list*, structure as follows

```lua
{ {"SSID1", "BSSID1"}, {"SSID2", "BSSID2"}, ... }
```

### Join a Wireless Access Point \(**device\.join\_wifi**\)

#### Declaration

```lua
success = device.join_wifi(SSID, Password[, Security Type, Timeout])
```

#### Parameters and Return Values

- SSID *string*
- Password *string*
- Security Type *enum*, *optional*
  - `0` for open networks
  - `1` for password-protected networks (default if password is not empty)
- Timeout
  - *integer*, *optional*, connection timeout in milliseconds, defaults to `5000` (5 seconds)

#### Description

Blocks the script synchronously until the connection succeeds or fails.

#### Example

```lua title="device.join_wifi"
joined = device.join_wifi('Tenda_9B3F', '12345678')
if joined then
  sys.toast('Successfully joined wireless access point Tenda_9B3F')
else
  sys.toast('Failed to join wireless access point Tenda_9B3F')
end
```

### Leave or Forget Wireless Access Point \(**device\.leave,forget\_wifi**\)

#### Declaration

```lua
device.leave_wifi([ Forget ])  -- Leave wireless access point
device.forget_wifi(SSID)       -- Forget wireless access point
```

#### Parameters and Return Values

- Forget
  - *boolean*, *optional*, whether to forget the currently connected wireless access point, defaults to `false` (do not forget)
- SSID *string*

#### Description

Cannot directly forget the currently connected wireless access point using `device.forget_wifi`. It will reconnect and remember it.

#### Example

```lua title="device.leave_wifi"
device.leave_wifi(true)  -- Leave and forget the currently connected wireless access point
```
