---
sidebar_position: 3
---

# Application Module

## Application Module - app

:::tip

- This module supports independent invocation via [OpenAPI](https://elite.82flex.com/api-283425316).

:::

### Identifier

The identifier, i.e., the application package name (Bundle ID), can be viewed in **X.X.T.E. Application** → **More** → **Application List**.

### Get the App’s Bundle Path \(**app\.bundle\_path**\)

#### Declaration

```lua
bundle_path = app.bundle_path(identifier)
```

#### Parameters and Return Values

- identifier *string*
- bundle_path
  - *string*, returns `nil` if the App does not exist

#### Example

```lua title="app.bundle_path"
path = app.bundle_path("com.cardify.tinder")  -- Get the bundle path of "Tinder"
nLog(path)
```

#### Example Output

```lua
"/private/var/containers/Bundle/Application/8B9C7B8C-8B9C-7B8C-B9C7-B8C7B8C7B8C7/Tinder.app"
```

### Get the App’s Bundle Version \(**app\.bundle\_version**\)

#### Declaration

```lua
bundle_version = app.bundle_version(identifier)
```

#### Parameters and Return Values

- identifier *string*
- bundle_version
  - *string*, returns `nil` if the App does not exist

#### Example

```lua title="app.bundle_version"
version = app.bundle_version("com.cardify.tinder")  -- Get the bundle version of "Tinder"
nLog(version)
```

#### Example Output

```lua
"12.0.0"
```

### Get the App’s Bundle Info Table \(**app\.bundle\_info**\)

#### Declaration

```lua
bundle_info = app.bundle_info(identifier)
```

#### Parameters and Return Values

- identifier *string*
- bundle_info
  - *table*, structured as follows. Returns `nil` if the App does not exist.

```lua title="app.bundle_info"
{
  bid = "com.cardify.tinder",
  version = "13.20.0",
  group_containers = {
    group.com.cardify.tinder = "/private/var/mobile/Containers/Shared/AppGroup/967D5BA2-30EC-494C-8834-E9D322F67AF3",
  },
  name = "Tinder",
  data_container = "/private/var/mobile/Containers/Data/Application/18219BE0-86DC-4409-8C40-CAA80A8EFB42",
  bundle_path = "/private/var/containers/Bundle/Application/03B7AABA-C4D7-4A06-8FCF-4E29DDB008B8/Tinder.app",
  plugin_containers = {},
  bundle_container = "/private/var/containers/Bundle/Application/03B7AABA-C4D7-4A06-8FCF-4E29DDB008B8",
  type = "User",
  apple_id = "buyer@icloud.com",
  identifier = "com.cardify.tinder",
}
```

### Get the App’s Data Container Path \(**app\.data\_path**\)

#### Declaration

```lua
data_path = app.data_path(identifier)
```

#### Parameters and Return Values

- identifier *string*
- data_path
  - *string*, returns `nil` if the App does not exist

#### Example

```lua title="app.data_path"
path = app.data_path("com.cardify.tinder")  -- Get the data container path of "Tinder"
nLog(path)
```

#### Example Output

```lua
"/private/var/mobile/Containers/Data/Application/8B9C7B8C-8B9C-7B8C-B9C7-B8C7B8C7B8C7"
```

### Get the App’s Group Info \(**app\.group\_info**\)

#### Declaration

```lua
group_info = app.group_info(identifier)
```

#### Parameters and Return Values

- identifier *string*
- group_info
  - *table*, returns `nil` if the App does not exist

#### Description

App groups, also known as [App Group](https://developer.apple.com/documentation/xcode/configuring-app-groups), are a way provided by Apple for developers to share data between multiple apps under the same developer team.

#### Example

```lua title="app.group_info"
local function sh_escape(path)
  path = string.gsub(path, "([ \\()<>'\"`#&*;?~$])", "\\%1")
  return path
end
--
local info = app.group_info("com.cardify.tinder")  -- Get the group info of "Tinder"
--
-- Loop through and delete all content in group directories
for _,v in pairs(info) do
  os.execute('rm -rf '..sh_escape(v)..'/Library/*')
  os.execute('rm -rf '..sh_escape(v)..'/Documents/*')
  os.execute('rm -rf '..sh_escape(v)..'/tmp/*')
end
```

#### Example Output

```lua
{
  group.com.cardify.tinder = "/private/var/mobile/Containers/Shared/AppGroup/967D5BA2-30EC-494C-8834-E9D322F67AF3"
}
```

### Get the App’s Plugin Info \(**app\.plugin\_info**\)

#### Declaration

```lua
plugin_info = app.plugin_info(identifier)
```

#### Parameters and Return Values

- identifier *string*
- plugin_info
  - *table*, returns `nil` if the App does not exist

#### Description

App plugins, also known as [App Extension](https://developer.apple.com/app-extensions/), are a way provided by Apple for developers to add features to their apps, such as sharing, custom keyboards, etc.

### Pop Up an App Notification \(**app\.pop\_banner**\)

#### Declaration

```lua
app.pop_banner(identifier, notification_title, notification_content)
```

#### Parameters and Return Values

- identifier *string*
- notification_title *string*
- notification_content *string*

#### Description

This function requires the App to have notification permissions enabled, otherwise it has no effect.

#### Example

```lua title="app.pop_banner"
app.pop_banner('com.apple.AppStore', 'App Store', 'Hello, world!')
```

### Run the App \(**app\.run**\)

#### Declaration

```lua
run_status = app.run(identifier[, run_in_background])
```

#### Parameters and Return Values

- identifier *string*
- run_in_background
  - *boolean*, *optional*, defaults to `false`
- run_status *integer*
  - Returns `0` if the launch is successful
  - Returns *other values* if the launch fails

#### Description

If the device is in a locked state, this function call will automatically unlock the device and launch the App.

#### Example

```lua title="app.run"
-- Open the built-in Weather App, then exit
local r = app.run("com.apple.weather")  -- Launch the App
sys.msleep(10 * 1000)  -- Wait for 10 seconds
if r == 0 then
  app.close("com.apple.weather")  -- Exit the App
else
  sys.alert("Launch failed", 3)
end
```

### Close the App \(**app\.close**\)

#### Declaration

```lua
close_status = app.close(identifier or pid)
```

#### Parameters and Return Values

- identifier *string*
- pid *integer*
- close_status *integer*
  - Returns `0` if the close is successful
  - Returns *other values* if the close fails

#### Description

Close the App, the parameter can be either **identifier** or **pid**.

:::caution
This close is a force kill that cannot be refused. The target App will not receive any notification when it is closed. Use with caution.
:::

#### Example

- [Refer to `app.run` example](#run-the-app-apprun)
- [Refer to `app.bundles` example](#get-the-app-identifier-list-appbundles)

### Simulate Using Swipe Up to Exit the App \(**app\.quit**\)

#### Declaration

```lua
app.quit(identifier)
```

#### Parameters and Return Values

- identifier *string*

:::info
Passing `"*"` as the **identifier** means exiting all running Apps.
:::

#### Description

Unlike [`app.close`](#close-the-app-appclose), the App will receive a notification before exiting.  
The App has up to 3 seconds to save its state before it is completely closed, and it will clear the label in the multitasking switcher.

:::caution Limitation
Do not use this in a locked state.
:::

#### Example

```lua title="app.quit"
-- Exit all running Apps
app.quit("*")
--
-- Exit "Tinder" if it is running
app.quit("com.cardify.tinder")
```

### Check if the App is Running \(**app\.is\_running**\)

#### Declaration

```lua
is_running = app.is_running(identifier)
```

#### Parameters and Return Values

- identifier *string*
- is_running *boolean*

#### Description

This function is used to check if an App is running, regardless of whether it is in the foreground or background.

:::note
To determine if an App is running in the foreground, you can use [`app.front_bid`](#get-the-identifier-of-the-foreground-app-appfront_bid) to get the identifier of the foreground App and compare it, as follows

```lua
if "com.cardify.tinder" == app.front_bid() then
  sys.alert('Tinder is running in the foreground')
end
```

:::

#### Example

```lua title="app.is_running"
if app.is_running("com.cardify.tinder") then
  sys.alert('Tinder is running')
end
```

### Get the App’s Localized Name \(**app\.localized\_name**\)

#### Declaration

```lua
localized_name = app.localized_name(identifier)
```

#### Parameters and Return Values

- identifier *string*
- localized_name
  - *string*, returns `nil` if the App does not exist

#### Example

```lua title="app.localized_name"
local name = app.localized_name("com.cardify.tinder")
sys.alert(name)  -- Display "Tinder"
```

### Get the App’s Icon Data \(**app\.png\_data\_for\_bid**\)

#### Declaration

```lua
png_data = app.png_data_for_bid(identifier)
```

#### Parameters and Return Values

- identifier *string*
- png_data
  - *string*, the png data (binary data) of the App icon, returns `nil` if the App does not exist

#### Example

```lua title="app.png_data_for_bid"
-- Save the icon of "Tinder" to the album
image.load_data(app.png_data_for_bid("com.cardify.tinder")):save_to_album()
```

### Get the Process ID of the Running App \(**app\.pid\_for\_bid**\)

#### Declaration

```lua
pid = app.pid_for_bid(identifier)
```

#### Parameters and Return Values

- identifier *string*
- pid
  - *integer*, returns the process ID if the App is running, otherwise returns `0`

#### Example

```lua title="app.pid_for_bid"
local tinder_pid = app.pid_for_bid("com.cardify.tinder")
if tinder_pid ~= 0 then
    sys.alert("Tinder is currently running, process ID is: "..tinder_pid)
else
    sys.alert("Tinder is not currently running")
end
```

### Get the App’s Current Memory Usage \(**app\.used\_memory**\)

#### Declaration

```lua
used_memory = app.used_memory(identifier or pid)
```

#### Parameters and Return Values

- identifier *string*
- pid *integer*
- used_memory
  - *number*, returns the memory used by the App in MB if it is running, otherwise returns `nil`

#### Example

```lua title="app.used_memory"
local tinder_mem = app.used_memory("com.cardify.tinder")
sys.alert("The current memory usage of the Tinder process is: "..tinder_mem.."MB")
```

### Get the Identifier of the Foreground App \(**app\.front\_bid**\)

#### Declaration

```lua
identifier = app.front_bid()
```

#### Parameters and Return Values

- identifier
  - *string*, the identifier of the foreground App
    - If no App is in the foreground but the SpringBoard is loaded, returns `"com.apple.springboard"`
    - If no App is in the foreground and the SpringBoard is not yet started, returns `"com.apple.backboardd"`

#### Example

```lua title="app.front_bid"
local bid = app.front_bid()
sys.alert("The identifier of the foreground App is: "..bid)
```

### Get the Process ID of the Foreground App \(**app\.front\_pid**\)

#### Declaration

```lua
pid = app.front_pid()
```

#### Parameters and Return Values

- pid
  - *integer*, returns `0` if no App is in the foreground

#### Description

Returns `0` if no App is in the foreground, not the process ID of the SpringBoard.

:::note
To get the process ID of the SpringBoard, you can refer to the following code snippet:

```lua
local desktop_pid = app.pid_for_bid('com.apple.springboard')
sys.alert("The process ID of the SpringBoard is: "..desktop_pid)
```

:::

#### Example

```lua title="app.front_pid"
local pid = app.front_pid()
sys.alert("The process ID of the foreground App is: "..pid)
```

### Open a URL in the Foreground \(**app\.open\_url**\)

#### Declaration

```lua
app.open_url(URL)
```

#### Parameters and Return Values

- URL *string*

#### Description

Open a URL in the foreground, can open [URL Scheme](https://developer.apple.com/library/ios/featuredarticles/iPhoneURLScheme_Reference/Introduction/Introduction.html).

:::tip
Refer to the appendix: [Common URL Schemes in "Settings"](./appendix/supported-url-schemes.md#settings-url-schemes)
:::

#### Example

```lua title="app.open_url"
app.open_url("http://www.google.com")  -- Open "Google" with "Safari"
--
app.open_url("prefs:root=General")  -- Jump to General Settings
```

### Get the App Identifier List \(**app\.bundles**\)

#### Declaration

```lua
identifier_list = app.bundles()
```

#### Parameters and Return Values

- identifier_list
  - *table*, returns a list of all installed App identifiers, including system Apps

#### Example

```lua title="app.bundles"
-- Iterate and print the display names of all Apps
for _, bid in ipairs(app.bundles()) do
  nLog(app.localized_name(bid))
end
```

### Get the Process List \(**app\.all\_procs**\)

#### Declaration

```lua
process_list = app.all_procs()
```

#### Parameters and Return Values

- process_list
  - *table*, structured as follows:

```lua
{ {pid = process_id1, name = process_name1 }, {pid = process_id2, name = process_name2 }, ... }
```

#### Description

Cannot get the full name of the process.

### Install IPA \(**app\.install**\)

#### Declaration

```lua
success, error_message = app.install(file_path)
```

#### Parameters and Return Values

- file_path *string*
- success *boolean*
- error_message *string*

#### Description

Synchronously **blocking** install an `.ipa` package, the installation package must have a valid Apple signature.

:::tip
For methods to download any App, version `.ipa` package from Apple, refer to [`ipatool-py`](https://github.com/NyaMisty/ipatool-py).
:::

#### Example

```lua title="app.install"
local ok, msg = app.install("/var/mobile/Media/Downloads/Tinder.ipa")
if ok then
  -- Installation successful
else
  sys.alert(msg)  -- Installation failed
end
```

### Uninstall an App \(**app\.uninstall**\)

#### Declaration

```lua
success, error_message = app.uninstall(identifier)
```

#### Parameters and Return Values

- identifier *string*
- success *boolean*
- error_message *string*

#### Description

Synchronously **blocking** uninstall an App.

#### Example

```lua title="app.uninstall"
local ok, msg = app.uninstall("com.cardify.tinder")
if ok then
  -- Uninstallation successful
else
  sys.alert(msg)  -- Uninstallation failed
end
```
