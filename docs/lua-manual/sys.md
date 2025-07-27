---
sidebar_position: 1
---

# System Module

## System Module - sys

Functions marked with 🚥 will **yield** in the [**Thread Module**](./thread.md). Before these function calls return, other **threads** may get a chance to run.

### Display Toast Message \(**sys\.toast**\)

#### Declaration

```lua
sys.toast(content[, orientation])
```

#### Parameters and Return Values

- content
  - *string*, the text to be displayed
- orientation
  - *integer*, *optional*, screen orientation, defaults to the orientation set by the last call to [`screen.init`](./screen.md#initialize-rotated-coordinate-system-screeninit)
    - `0` indicates portrait mode with home button at the bottom
    - `1` indicates landscape mode with home button on the right
    - `2` indicates landscape mode with home button on the left
    - `3` indicates portrait mode with home button at the top
    - `-1` hides the toast message immediately

#### Description

Displays a toast message at the bottom of the screen in the current coordinate system.

:::info
Asynchronous operation. The toast message is displayed for approximately 2.8 seconds in total, which may affect color picking but does not intercept clicks.
:::

#### Example 1

```lua title="sys.toast"
-- Display a toast message
sys.toast("Decisively hello world")
```

#### Example 2

```lua title="sys.toast"
-- Display the current date and time in real-time
while true do
  sys.toast("Default: long press the volume key to stop the script\n\n"..os.date("%Y-%m-%d %H:%M:%S"), device.front_orien())
  sys.msleep(1000)
end
```

### Display System Alert \(**sys\.alert**\)

#### Declaration

```lua
choice = sys.alert(content[, auto_dismiss_seconds, title, button0_title, button1_title, button2_title])
```

#### Parameters and Return Values

- content *string*
- auto_dismiss_seconds
  - *number*, *optional*, in seconds, set `0` to not auto-dismiss, default is `0`
- title
  - *string*, *optional*, default title is `"Script Alert"`
- button0_title
  - *string*, *optional*, default button title, default is `"OK"`
- button1_title
  - *string*, *optional*, additional button 1 title, default is not displayed
- button2_title
  - *string*, *optional*, additional button 2 title, default is not displayed
- choice
  - *integer*
    - Returns `0` if *button0_title* is selected
    - Returns `1` if *button1_title* is selected
    - Returns `2` if *button2_title* is selected
    - Returns `3` if auto-dismissed due to timeout
    - Returns `71` if SpringBoard crashed

#### Description

Displays a system alert dialog with up to 3 buttons, blocking all threads until a response is received.

The orientation of the alert defaults to the orientation set by the last call to [`screen.init`](./screen.md#initialize-rotated-coordinate-system-screeninit).

#### Example

```lua title="sys.alert"
local choice = sys.alert('What are you going to do now?', 10, 'Your Choice', 'Cancel', 'Eat', 'Sleep')
if choice == 0 then
  sys.alert('You chose ‘Cancel’')
elseif choice == 1 then
  sys.alert('You chose ‘Eat’')
elseif choice == 2 then
  sys.alert('You chose ‘Sleep’')
elseif choice == 3 then
  sys.alert('You did not choose, timed out')
else
  sys.alert('SpringBoard crashed')
end
```

### Display Input Prompt \(**sys\.input\_box**\)

#### Description

Displays a system input dialog with up to 3 buttons and 2 text boxes, blocking all threads until a response is received.  
The default title is `"Script Alert"`.

The orientation of the dialog defaults to the orientation set by the last call to [`screen.init`](./screen.md#initialize-rotated-coordinate-system-screeninit).

#### Example

```lua title="sys.input_box"
input_content = sys.input_box("Description")
--
input_content = sys.input_box("Title", "This is the description")
--
input_content = sys.input_box("Title", "This is the description", 0)
--
input_content = sys.input_box("Title", "Description", "TextBox Placeholder", 0)
--
input_content = sys.input_box("Title", "Description", "TextBox Placeholder", "TextBox Content", 0)
--
input_content = sys.input_box("Title", "Description", "TextBox Placeholder", "TextBox Content", "Default Button Title", 0)
--
input_content, choice = sys.input_box("Title", "Description", "TextBox Placeholder", "TextBox Content", "Default Button Title", "Button1 Title", 0)
--
input_content, choice = sys.input_box("Title", "Description", "TextBox Placeholder", "TextBox Content", "Default Button Title", "Button1 Title", "Button2 Title", 0)
--
input_content1, input_content2 = sys.input_box("Title", "Description", {"TextBox1 Placeholder", "TextBox2 Placeholder"}, 0)
--
input_content1, input_content2 = sys.input_box("Title", "Description", {"TextBox1 Placeholder", "TextBox2 Placeholder"}, {"TextBox1 Content", "TextBox2 Content"}, 0)
--
input_content1, input_content2, choice = sys.input_box("Title", "Description", {"TextBox1 Placeholder", "TextBox2 Placeholder"}, {"TextBox1 Content", "TextBox2 Content"}, "Default Button Title", "Button1 Title", "Button2 Title", 0)
```

### Input Text \(**sys\.input\_text**\)

#### Declaration

```lua
sys.input_text(content[, press_enter_after_input])
```

#### Parameters and Return Values

- content
  - *string*, the text to be input, **does not support** `"\b"` (backspace)
- press_enter_after_input
  - *boolean*, *optional*, whether to press the Enter key (send, search, etc.) after input, default is `false`

#### Description

Inputs text in the foreground program’s text input area.

:::note
This function works by first writing the text to the clipboard and then pasting it using the paste shortcut (**Command \+ V**).
:::

:::caution
Calling this function will overwrite the clipboard. Please back up any important data in the clipboard before calling this function.
:::

#### Example

```lua title="sys.input_text"
sys.input_text("I love you")  -- Inputs “I love you” in the current text box
--
sys.input_text("I love you", true)  -- Inputs “I love you” in the chat interface and then presses Enter to send it
```

### 🚥 Second-Level Delay \(**sys\.sleep**\)

#### Declaration

```lua
sys.sleep(seconds)
```

#### Parameters and Return Values

- seconds
  - *number*, the time to delay, in seconds

#### Description

Blocks the current thread for a specified amount of time.

#### Example

```lua title="sys.sleep"
sys.sleep(10)  -- Waits for 10 seconds
```

### 🚥 Millisecond-Level Delay \(**sys\.msleep**\)

#### Declaration

```lua
sys.msleep(milliseconds)
```

#### Parameters and Return Values

- milliseconds
  - *number*, the time to delay, in milliseconds

#### Description

Blocks the current thread for a specified amount of time.

#### Example

```lua title="sys.msleep"
sys.msleep(1000)  -- Waits for 1000 milliseconds, i.e., 1 second
```

### Get Current Millisecond-Level Timestamp \(**sys\.mtime**\)

#### Declaration

```lua
timestamp = sys.mtime()
```

#### Parameters and Return Values

- timestamp
  - *integer*, millisecond-level UNIX timestamp

#### Example

```lua title="sys.mtime"
local ms = sys.mtime()
screen.keep()
sys.alert('Time taken for one screen.keep: '..sys.mtime()-ms..' milliseconds')
```

### Get Network Time \(**sys\.net\_time**\)

#### Declaration

```lua
timestamp, is_synced = sys.net_time()
```

#### Parameters and Return Values

- timestamp
  - *integer*, returns the **current network time** in seconds as a UNIX timestamp if successful, otherwise returns the **current local time**
- is_synced
  - *boolean*, returns `false` if not yet successfully synced

:::note
This function call is **non-blocking**. After the first call, it will poll in the background and continuously keep in sync with the network time server.
:::

#### Example

```lua title="sys.net_time"
local nt, sync = sys.net_time()  -- Get network time
if not sync then
  sys.alert('Network time not yet synced')
else
  sys.alert(os.date('Current network time\n%Y-%m-%d %H:%M:%S', nt))
end
```

### Generate a Random Number \(**sys\.rnd**\)

#### Declaration

```lua
random_number = sys.rnd()
```

#### Parameters and Return Values

- random_number
  - *integer*, returns a random number in the range 0 ~ 4294967295

#### Description

Generates a true random number.

:::info
The generated random number is a **true random number**, not a pseudo-random number.  
Each time the script starts, the random number seed is automatically initialized with a true random number. Therefore, you usually **do not need** to explicitly call `sys.rnd`, and the random numbers generated by [`math.random`](https://cloudwu.github.io/lua53doc/manual.html#pdf-math.random) are also safe.
:::

#### Example

```lua title="sys.rnd"
math.randomseed(sys.rnd())  -- Initialize the random seed with a true random number
local r = math.random(1, 100)  -- Generate a random number in the range 1 ~ 100
```

### Get Device’s Current Available Memory \(**sys\.available\_memory**\)

#### Declaration

```lua
available_memory = sys.available_memory()
```

#### Parameters and Return Values

- available_memory
  - *number*, returns the current available memory of the device, in MB

#### Example

```lua title="sys.available_memory"
sys.alert('Current available memory: '..sys.available_memory()..'MB')
```

### Get Device’s Current Total Memory \(**sys\.total\_memory**\)

#### Declaration

```lua
total_memory = sys.total_memory()
```

#### Parameters and Return Values

- total_memory
  - *number*, returns the current total memory of the device, in MB

#### Example

```lua title="sys.total_memory"
sys.alert('Current total memory of the device: '..sys.total_memory()..'MB')
```

### List Device Mount Points \(**sys\.disks**\)

#### Declaration

```lua
mount_points = sys.disks()
```

#### Parameters and Return Values

- mount_points
  - *table*, returns a table where the keys are mount point paths and the values are the names of the mounted devices

#### Example

```lua title="sys.disks"
local disks = sys.disks()  -- Get device mount point information
for k, v in pairs(disks) do
  nLog(k..' -> '..v)
end
```

#### Example Output

```lua
{
  "/" = "/dev/disk0s1s1",
  "/private/var" = "/dev/disk0s1s2",
  "/Developer" = "/dev/disk2",
  "/private/preboot" = "/dev/disk0s1s6",
  "/private/var/hardware" = "/dev/disk0s1s7",
  "/System/Library/Pearl/ReferenceFrames" = "/private/var/hardware/Pearl/System/Library/Pearl/ReferenceFrames",
  "/private/var/wireless/baseband_data" = "/dev/disk0s1s3",
  "/System/Library/Caches/com.apple.factorydata" = "/private/var/hardware/FactoryData/System/Library/Caches/com.apple.factorydata",
  "/dev" = "devfs",
  "/private/xarts" = "/dev/disk0s1s5",
  "/private/var/MobileSoftwareUpdate" = "/dev/disk0s1s4",
}
```

### Get Device’s Current Free Disk Space \(**sys\.free\_disk\_space**\)

#### Declaration

```lua
free_space = sys.free_disk_space(mount_point)
```

#### Parameters and Return Values

- mount_point
  - *string*, valid values are `"/var"` or `"/"` by default, representing user space and system space respectively. Other values may be available if there is external storage such as a memory card
- free_space
  - *number*, returns the current free disk space of the device, in MB

#### Example

```lua title="sys.free_disk_space"
sys.alert(
 'Current system space remaining\n'..sys.free_disk_space('/')..'MB\n\n'..
 'Current user space remaining\n'..sys.free_disk_space('/var')..'MB'
)
```

### Get Device’s Current Total Disk Space \(**sys\.total\_disk\_space**\)

#### Declaration

```lua
total_space = sys.total_disk_space(mount_point)
```

#### Parameters and Return Values

- mount_point
  - *string*, valid values are `"/var"` or `"/"` by default, representing user space and system space respectively. Other values may be available if there is external storage such as a memory card
- total_space
  - *number*, returns the current total disk space of the device, in MB

#### Example

```lua title="sys.total_disk_space"
sys.alert(
  'Current total system space\n'..sys.total_disk_space('/')..'MB\n\n'..
  'Current total user space\n'..sys.total_disk_space('/var')..'MB'
)
```

### Output Standard System Log \(**sys\.log**\)

#### Declaration

```lua
sys.log([ param1, param2, ... ])
```

#### Parameters and Return Values

- param1, param2, \.\.\.
  - *any*, *optional*, *variadic*, will be converted to text and output, separated by `"\t"`

#### Description

Outputs standard system log to standard output `stdout` and stores it in the log file.

:::note
Logs are **automatically rolled** and stored on the device at `/var/mobile/Media/1ferver/log/sys.log`, with each roll being 10 MB and up to 10 rolls.
:::

:::info
Logs can be viewed in real-time using a computer browser by opening the remote interface `http://<device IP address>:46952/log.html`.
:::

#### Example

```lua title="sys.log"
sys.log("Of course, it’s Hello World")
```

### Ask the System a Question \(**sys\.mgcopyanswer**\)

#### Declaration

```lua
system_response = sys.mgcopyanswer(question_name)
```

#### Parameters and Return Values

- question_name
  - *string*, refer to [MobileGestalt.h](https://github.com/Cykey/ios-reversed-headers/blob/master/MobileGestalt/MobileGestalt.h)
- system_response
  - *any*, returns `nil` if the question is not supported

#### Description

Gets some system information using [MGCopyAnswer](http://iphonedevwiki.net/index.php/LibMobileGestalt.dylib).

:::note Keywords
Get system information Read system information Get device information Read device information Device identifier
:::

#### Example

```lua title="sys.mgcopyanswer"
sys.alert("The serial number of the device is: "..sys.mgcopyanswer("SerialNumber"))
```

### Get System Version \(**sys\.version**\)

#### Declaration

```lua
system_version = sys.version()
```

#### Parameters and Return Values

- system_version *string*

#### Example

```lua title="sys.version"
sys.alert('Current system version: '..sys.version())
```

### Get XXTouch Elite Version \(**sys\.xtversion**\)

#### Declaration

```lua
version = sys.xtversion()
```

#### Parameters and Return Values

- version
  - *string*, XXTouch Elite version number

#### Example

```lua title="sys.xtversion"
sys.alert('Current XXTouch Elite version: '..sys.xtversion())
```

### Respring \(**sys\.respring**\)

#### Declaration

```lua
sys.respring()
```

#### Description

Resprings SpringBoard and backboardd, equivalent to the command line `killall -9 SpringBoard backboardd`.

:::caution
Many functions that depend on SpringBoard will fail until the respring is complete.  
After calling this function, it is recommended to use [`app.front_bid`](./app.md#get-the-identifier-of-the-foreground-app-appfront_bid) to poll and check the status of SpringBoard. Once SpringBoard has restarted, proceed with other operations.
:::

#### Example

```lua title="sys.respring"
sys.respring()
sys.sleep(1)
while app.front_bid() ~= "com.apple.springboard" do
  sys.sleep(1)
end
sys.alert("SpringBoard respring complete")
```

### Reboot \(**sys\.reboot**\)

#### Declaration

```lua
sys.reboot()
```

#### Description

Reboots the device, equivalent to the command line `reboot`.

:::caution
Rebooting the device will force close all running applications and immediately end the script.  
**Requires re-jailbreaking**.
:::

### Shutdown \(**sys\.halt**\)

#### Declaration

```lua
sys.halt()
```

#### Description

Shuts down the device, equivalent to the command line `halt`.

:::caution
Shutting down the device will force close all running applications and immediately end the script.  
**Requires re-jailbreaking**.
:::

### User-Space Reboot (Soft Reboot) \(**sys\.ldrestart**\)

#### Declaration

```lua
sys.ldrestart()
```

#### Description

Performs a user-space reboot, retaining the jailbroken state. Equivalent to the command line `ldrestart`.

:::caution
A user-space reboot will force close all running applications and immediately end the script.  
**Does not require re-jailbreaking**, but may fail and result in a hard reboot.
:::

### Get and Set Language \(**sys\.language/sys\.set\_language**\)

#### Declaration

```lua
language_code = sys.language()   -- Get language
sys.set_language(language_code)  -- Set language
```

#### Parameters and Return Values

- language_code
  - *string*, returns the current system language code, such as `zh-Hans`, `en-US`, etc.

#### Description

Supports [ISO 639-1](https://www.iso.org/iso-639-language-codes.html) standard language codes.

:::caution
Setting the language will automatically [respring](#respring-sysrespring).
:::

### Get and Set Locale \(**sys\.locale/sys\.set\_locale**\)

#### Declaration

```lua
locale_code = sys.locale()   -- Get locale
sys.set_locale(locale_code)  -- Set locale
```

#### Parameters and Return Values

- locale_code
  - *string*, returns the current system locale code, such as `zh_CN`, `en_US`, etc.

#### Description

```js
language + "_" + country + "_" + (variant + "_#" | "#") + script + "-" + extensions
```

:::caution
Setting the locale will automatically [respring](#respring-sysrespring).
:::

### Get and Set Timezone \(**sys\.timezone/sys\.set\_timezone**\)

#### Declaration

```lua
timezone_code = sys.timezone()   -- Get timezone
sys.set_timezone(timezone_code)  -- Set timezone
```

#### Parameters and Return Values

- timezone_code
  - *string*, returns the current system timezone code, such as `Asia/Shanghai`, `America/New_York`, etc.

#### Description

Supports [IANA Time Zone Database](https://www.iana.org/time-zones) timezone codes.

### Get and Set Appearance \(**sys\.appearance/sys\.set\_appearance**\)

#### Declaration

```lua
appearance_style = sys.appearance()   -- Get appearance style
sys.set_appearance(appearance_style)  -- Set appearance style
```

#### Parameters and Return Values

- appearance_style *enum*
  - `1` for light mode
  - `2` for dark mode

### Get and Set Text Size \(**sys\.textsize/sys\.set\_textsize**\)

#### Declaration

```lua
text_size = sys.textsize()   -- Get text size
sys.set_textsize(text_size)  -- Set text size
```

#### Parameters and Return Values

- text_size
  - *enum*, range 0 ~ 11, default is `3`

### Get and Set Bold Text \(**sys\.is\_boldtext\_on/sys\.boldtext\_on,off**\)

#### Declaration

```lua
is_bold_text_on = sys.is_boldtext_on()  -- Get bold text status
sys.boldtext_on()               -- Enable bold text
sys.boldtext_off()              -- Disable bold text
```

#### Parameters and Return Values

- is_bold_text_on *boolean*

### Get and Set Zoom Mode \(**sys\.is\_zoom\_on/sys\.zoom\_on,off**\)

#### Declaration

```lua
is_zoom_on = sys.is_zoom_on()  -- Get zoom mode status
sys.zoom_on()               -- Enable zoom mode
sys.zoom_off()              -- Disable zoom mode
```

#### Parameters and Return Values

- is_zoom_on *boolean*

#### Description

Enabling zoom mode will change the screen size obtained by [`screen.size`](./screen.md#get-screen-size-screensize), and the screen and simulated touch coordinate systems will also change accordingly.

:::caution

- Enabling zoom mode will automatically [respring](#respring-sysrespring).
- Calling this function may cause subsequent script execution to fail. If the subsequent script requires the **Screen Module** or **Simulated Touch Module**, be sure to restart the script process using [`os.restart`](./appendix/process-scheduling.md#restart-script-osrestart).

:::

### Set Wallpaper \(**sys\.set\_wallpaper**\)

#### Declaration

```lua
sys.set_wallpaper(light_image_path[, dark_image_path, effect_location, is_perspective])
```

#### Parameters and Return Values

- light_image_path
  - *string*, the path to the wallpaper image for light mode
- dark_image_path
  - *string*, *optional*, the path to the wallpaper image for dark mode
- effect_location
  - *integer*, *optional*, the location where the wallpaper takes effect, range 1 ~ 3, `1` for lock screen, `2` for home screen, `3` for both lock screen and home screen, default is `3`
- is_perspective
  - *boolean*, *optional*, whether to use a parallax effect, default is `false`

#### Description

Supports `jpg`, `jpeg`, `png`, and `heic` formats.

### Get and Set Icon Layout \(**sys\.icon\_state/sys\.set\_icon\_state**\)

#### Declaration

```lua
icon_layout = sys.icon_state()   -- Get icon layout
sys.set_icon_state(icon_layout)  -- Set icon layout
```

#### Parameters and Return Values

- icon_layout *table*

#### Description

You can arrange the icon layout on a development device, then use `sys.icon_state` to get the **icon layout table**, and use `sys.set_icon_state` to set it on other devices.

:::note
You do not need to worry about the specific format of the **icon layout table**. Just pass the return value of `sys.icon_state` to `sys.set_icon_state`.  
The **icon layout table** can be safely serialized using the [`plist`](./plist.md) module.
:::

### Get and Set Assistive Touch \(**sys\.is\_assistive\_touch\_on/sys\.assistive\_touch\_on,off**\)

#### Declaration

```lua
is_assistive_touch_on = sys.is_assistive_touch_on()  -- Get Assistive Touch status
sys.assistive_touch_on()               -- Enable Assistive Touch
sys.assistive_touch_off()              -- Disable Assistive Touch
```

#### Parameters and Return Values

- is_assistive_touch_on *boolean*

### Get and Set Reduce Motion \(**sys\.is\_reduce\_motion\_on/sys\.reduce\_motion\_on,off**\)

#### Declaration

```lua
is_reduce_motion_on = sys.is_reduce_motion_on()  -- Get reduce motion status
sys.reduce_motion_on()               -- Enable reduce motion
sys.reduce_motion_off()              -- Disable reduce motion
```

#### Parameters and Return Values

- is_reduce_motion_on *boolean*

### Get and Set Location Services \(**sys\.is\_location\_services\_on/sys\.location\_services\_on,off**\)

#### Declaration

```lua
is_location_services_on = sys.is_location_services_on()  -- Get location services status
sys.location_services_on()               -- Enable location services
sys.location_services_off()              -- Disable location services
```

#### Parameters and Return Values

- is_location_services_on *boolean*

### Get and Set Allow App Tracking \(**sys\.is\_tracking\_on/sys\.tracking\_on,off**\)

#### Declaration

```lua
is_tracking_on = sys.is_tracking_on()  -- Get allow app tracking status
sys.tracking_on()               -- Allow app tracking
sys.tracking_off()              -- Disallow app tracking
```

#### Parameters and Return Values

- is_tracking_on *boolean*

### Get and Set Background App Refresh \(**sys\.background\_app\_refresh\_state/sys\.set\_background\_app\_refresh\_state**\)

#### Declaration

```lua
state = sys.background_app_refresh_state()  -- Get background app refresh state
sys.set_background_app_refresh_state(state) -- Set background app refresh state
```

#### Parameters and Return Values

- state *enum*
  - `0`: Off
  - `1`: Wi-Fi only
  - `2`: Wi-Fi and cellular

### Reset \(**sys\.reset**\)

#### Declaration

```lua
sys.reset(reset_type_name)
```

#### Parameters and Return Values

- reset_type_name
  - *enum*, the option name in **Settings** → **General** → **Reset** in English
    - `"Reset All Settings"`: Reset all settings (device will reboot automatically)
    - `"Erase All Content and Settings"`: Erase all content and settings (device will reboot automatically)
    - `"Reset Network Settings"`: Reset network settings (device will reboot automatically)
    - `"Reset Keyboard Dictionary"`: Reset keyboard dictionary
    - `"Reset Home Screen Layout"`: Reset home screen layout
    - `"Reset Location & Privacy"`: Reset location and privacy

#### Description

Equivalent to manually resetting in settings, but without a confirmation dialog, it resets directly.
