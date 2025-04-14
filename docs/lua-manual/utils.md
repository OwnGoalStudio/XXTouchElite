---
sidebar_position: 21
---

# Utility Module

## Utility Module - utils

### Add one or more contacts to the address book \(**utils\.add\_contacts**\)

#### Declaration

```lua
success = utils.add_contacts({
  {
    firstName = "FirstName1",
    lastName = "LastName1",
    phoneNumbers = {
      "Contact1Phone1",
      "Contact1Phone2",
    },
    emails = {
      "Contact1Email1",
      "Contact1Email2",
    },
  },
  {
    firstName = "FirstName2",
    lastName = "LastName2",
    phoneNumbers = {
      "Contact2Phone1",
      "Contact2Phone2",
    },
    emails = {
      "Contact2Email1",
      "Contact2Email2",
    },
  },
  ...
})
```

#### Parameters and Return Values

- `firstName`
  - *string*, the first name of the contact
- `lastName`
  - *string*, the last name of the contact
- `phoneNumbers`
  - *list of strings*, the list of phone numbers for this contact
- `emails`
  - *list of strings*, the list of email addresses for this contact
- success *boolean*

#### Example

```lua title="utils.add_contacts"
utils.add_contacts({
  {
    firstName = "Xiao",
    lastName = "Ming",
    phoneNumbers = {
      "13800001111",
      "13800002222",
    },
    emails = {
        "xiaoming@qq.com",
        "xiaoming@163.com",
    },
  },
  {
    firstName = "Xiao",
    lastName = "Hong",
    phoneNumbers = {
      "13800003333",
      "13800004444",
    },
    emails = {
        "xiaohong@qq.com",
        "xiaohong@163.com",
    },
  },
  ...
})
```

### Remove all contacts from the address book \(**utils\.remove\_all\_contacts**\)

#### Declaration

```lua
success = utils.remove_all_contacts()
```

#### Parameters and Return Values

- success *boolean*

### Get the launch arguments of the current script \(**utils\.launch\_args**\)

#### Declaration

```lua
launchArgs = utils.launch_args()
```

#### Parameters and Return Values

- launchArgs
  - *table*, returns a table describing the arguments for the current launch

```lua title="Structure of launchArgs"
{
  path = "/usr/local/xxtouch/bin/croissant",
  type = "activator",
  event = {
    mode = "springboard",
    name = "libactivator.icon.flick.down",
    listener = "ch.xxtou.activator.launch",
    userInfo = {
      displayIdentifier = "com.unveilapp.unveil",
    }
  }
}
```

- `path`
  - *string*, the path of the launch script
- `type`
  - *enum*, the launch type
    - Unknown `unknown`
    - OpenAPI `openapi`
    - X.X.T. Application `application`
    - Scheduled Task [`os.restart`](./appendix/process-scheduling.md#restart-script-osrestart) `scheduler`
    - Terminal `terminal`
    - Volume Key `volume`
    - Startup `startup`
    - Legacy IDE `touchsprite`
    - Visual Studio Code Plugin `touchelf`
    - Daemon Mode `daemon`
    - Activator `activator`
- `event`
  - *table*, the [Activator](http://cydia.saurik.com/package/libactivator/) event for launching the script. If not launched via Activator, this field is `nil`.

#### Example 1

```lua title="utils.launch_args"
sys.alert(table.deep_print(utils.launch_args()))
```

#### Example 2

```lua title="utils.launch_args"
-- Get the current script file path (Note: Not all scripts have a file path)
sys.alert("The current script path is: "..tostring(utils.launch_args().path))
```

### Check if the current script is launched from within the app \(**utils\.is\_launch\_via\_app**\)

#### Declaration

```lua
is_launched_via_app = utils.is_launch_via_app()
```

#### Parameters and Return Values

- is_launched_via_app *boolean*
