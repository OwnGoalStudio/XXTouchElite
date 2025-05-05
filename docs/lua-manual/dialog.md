---
sidebar_position: 22
---

# Dialog Module

## Dialog Module - dialog

Functions marked with 🚥 may **yield** in the [**Thread Module**](thread.md). Before these function calls return, other **threads** may get a chance to run.

The **icons** used in this section are *text-based* and are defined in Apple’s [SF Symbols](https://developer.apple.com/sf-symbols/).

### Create a Dialog (**dialog**)

#### Declaration

```lua
dialog = dialog([ config_section ])
```

#### Parameters and Return Values

- config_section
  - *string*, *optional*, if not provided, a random name is used
- dialog *dialog object*

#### Description

Specify or randomly generate a **config section**, and return a dialog object.  
The dialog is displayed, and after the user presses **Submit**, the configuration options are saved. When displayed again, the previously saved configuration is selected by default.

:::note
The configuration options table will be saved as a file in `/var/mobile/Media/1ferver/uicfg/<config_section>.plist`.
:::

#### Example

```lua title="dialog"
dialog("MyWorld")
  :set_title("Hello World")
  :add_group("Introduction")
  :add_label("This example shows how to use the dialog module.")
  :show()
```

### Get or Set Dialog Config Section (**dialog.defaults/dialog.set_config**)

#### Declaration

```lua
config_section = dialog.defaults           -- Get dialog config section
dialog = dialog:set_config(config_section) -- Set dialog config section
```

#### Parameters and Return Values

- dialog *dialog object*
- config_section *string*

### Configure Dialog Auto-Dismiss Time (**dialog:set_timeout**)

#### Declaration

```lua
dialog = dialog:set_timeout(timeout_seconds[, submit])
```

#### Parameters and Return Values

- dialog *dialog object*
- timeout_seconds
  - *number*, auto-dismiss time for the dialog object, in seconds
- submit
  - *boolean*, *optional*, whether auto-dismiss counts as submission, default is `false`

#### Example

```lua title="dialog:set_timeout"
dialog():set_timeout(3):show()  -- 3 seconds timeout without submission
--
dialog():set_timeout(3, true):show()  -- 3 seconds timeout with submission
```

### Configure Dialog Title (**dialog:set_title**)

#### Declaration

```lua
dialog = dialog:set_title(title_text)
```

#### Parameters and Return Values

- dialog *dialog object*
- title_text *string*

#### Example

```lua title="dialog:set_title"
dialog():set_title('Title'):show()
```

### Add a Group to the Dialog (**dialog:add_group**)

#### Declaration

```lua
dialog = dialog:add_group(group_name)
```

```lua
dialog = dialog:add_group {
  label = group_name,
  footerText = footer_text,
}
```

#### Parameters and Return Values

- dialog *dialog object*
- group_name *string*
- footer_text
  - *string*, *optional*, annotation text displayed at the bottom of the group

#### Description

This component displays a group area in the interface, containing all components up to the next group component. It is typically used for functional division and often for supplementary descriptions of a specific component.

#### Example

```lua title="dialog:add_group"
dialog()
  :add_group("Group 1")
  :add_label("This is a label in Group 1.")
  :add_group {
    label = "Group 2",
    footerText = "This is a footer text.",
  }
  :add_label("This is a label in Group 2.")
  :show()
```

### Add a Label to the Dialog (**dialog:add_label**)

#### Declaration

```lua
dialog = dialog:add_label(label_text[, alignment])
```

```lua
dialog = dialog:add_label {
  label = label_text,
  alignment = alignment,
  selectable = selectable,
}
```

#### Parameters and Return Values

- dialog *dialog object*
- label_text *string*
- alignment *enum*, *optional*
  - `Left` Left-aligned, default value
  - `Center` Center-aligned
  - `Right` Right-aligned
  - `Natural` Natural alignment
  - `Justified` Justified alignment
- selectable
  - *boolean*, *optional*, whether the label text is selectable, default is `false`

#### Description

This component displays a static text in the interface.

#### Example

```lua title="dialog:add_label"
dialog()
  :add_group("Group 1")
  :add_label("This is a centered label.", "Center")
  :add_group("Group 2")
  :add_label {
    label = "This is another label aligned to the left.",
    alignment = "Left",
    selectable = true,
  }
  :show()
```

### Add an Input Box to the Dialog (**dialog:add_input**)

#### Declaration

```lua
dialog = dialog:add_input(title[, placeholder])
```

```lua
dialog = dialog:add_input {
  label = title,
  key = key,
  default = default_value,
  readonly = readonly,
  alignment = alignment,
  keyboard = keyboard_type,
  placeholder = placeholder,
  isSecure = is_secure,
  clearButtonMode = clear_button_mode,
  maxLength = max_length,
  validationRegex = validation_regex,
  prompt = prompt_text,
  message = message_text,
  okTitle = ok_button_title,
  cancelTitle = cancel_button_title,
}
```

#### Parameters and Return Values

- dialog *dialog object*
- title *string*
- key *string*, *optional*, default is **title**
- placeholder *string*, *optional*, default is an empty string `""`
- default_value *string*, *optional*, default is `nil`
- readonly *boolean*, *optional*, default is `false`
- alignment *enum*, *optional*
  - `Left` Left-aligned, default value
  - `Center` Center-aligned
  - `Right` Right-aligned
  - `Natural` Natural alignment
  - `Justified` Justified alignment
- keyboard_type *enum*, *optional*
  - `Default` Default keyboard, default value
  - `ASCIICapable` ASCII keyboard
  - `NumbersAndPunctuation` Numbers and punctuation keyboard
  - `URL` URL keyboard
  - `NumberPad` Number pad
  - `PhonePad` Phone pad
  - `NamePhonePad` Name and phone pad
  - `EmailAddress` Email address keyboard
  - `DecimalPad` Decimal pad
- is_secure *boolean*, *optional*, default is `false`
- clear_button_mode *enum*, *optional*
  - `Never` Never show, default value
  - `WhileEditing` Show while editing
  - `UnlessEditing` Show unless editing
  - `Always` Always show
- max_length *integer*, *optional*, default **no limit**
- validation_regex *string*, *optional*, default **no validation**

This component supports displaying the input box in a popup form. In this mode, the applicable parameters are:

- prompt_text *string*, *optional*, default is an empty string `""`
- message_text *string*, *optional*, default is an empty string `""`
- ok_button_title *string*, *optional*, default is `"OK"`
- cancel_button_title *string*, *optional*, default is `"Cancel"`

#### Description

This component displays an input box in the interface for string input.  
If **prompt_text** or **message_text** is not empty, tapping the input box area will display a popup, requiring input in the popup.

:::info
When modifying or adding string entries, if the string does not pass **validation_regex**, the current entry cannot be saved.
:::

#### Example

```lua title="dialog:add_input"
dialog("MyWorld")
  :add_group("Input Group")
  :add_input("Input #1", "Input text here")
  :add_input {
    label = "Input #2",
    placeholder = "Input your phone number here",
    default = "1234567890",
    keyboard = "PhonePad",
    clearButtonMode = "WhileEditing",
  }
  :add_input {
    label = "Input #3",
    placeholder = "Input password less than 16 characters",
    default = "Default text",
    isSecure = true,
    maxLength = 16,
  }
  :add_input {
    label = "Tap here to prompt",
    placeholder = "Input a number here",
    prompt = "Prompt",
    message = "Message",
    validationRegex = "^\\d+$",
  }
  :show()
```

### Add a Switch to the Dialog (**dialog:add_switch**)

#### Declaration

```lua
dialog = dialog:add_switch(switch_title[, default_value])
```

```lua
dialog = dialog:add_switch {
  label = title,
  key = key,
  default = default_value,
  icon = icon,
  readonly = readonly,
  negate = negate,
  trueValue = true_value,
  falseValue = false_value,
}
```

#### Parameters and Return Values

- dialog *dialog object*
- title *string*
- key *string*, *optional*, default is **title**
- default_value *boolean*, *optional*, default is `nil`
- icon *string*, *optional*, default **no icon**
- readonly *boolean*, *optional*, default is `false`
- negate *boolean*, *optional*, default is `false`
- true_value *any*, *optional*, default is `true`
- false_value *any*, *optional*, default is `false`

#### Description

This component displays a switch in the interface.

#### Example

```lua title="dialog:add_switch"
dialog("MyWorld")
  :add_group("Switch Group")
  :add_switch("Switch #1")
  :add_switch {
    label = "Switch #2",
    default = true,
    icon = "link",
  }
  :add_switch {
    label = "Switch #3",
    readonly = true,
    icon = "folder.fill",
    negate = true,
  }
  :show()
```

### Add a Slider to the Dialog (**dialog:add_range**)

#### Declaration

```lua
dialog = dialog:add_range(slider_title, {min_value, max_value[, step]}[, default_value])
```

```lua
dialog = dialog:add_range {
  label = title,
  key = key,
  default = default_value,
  min = min_value,
  max = max_value,
  step = step,
  showValue = show_value,
  readonly = readonly,
}
```

#### Parameters and Return Values

- dialog *dialog object*
- title *string*
- key *string*, *optional*, default is **title**
- min_value *number*
- max_value *number*
- step *number*, *optional*, default is `0`, i.e., approaching infinitely small
- default_value *number*, *optional*, default is `0`
- show_value *boolean*, *optional*, default is `false`
- readonly *boolean*, *optional*, default is `false`

#### Description

This component displays a slider in the interface for selecting and adjusting floating-point values.

#### Example

```lua title="dialog:add_range"
dialog("MyWorld")
  :add_range("Range #1", {0, 100}, 40)
  :add_range {
    label = "Range #2",
    default = 50,
    min = 0,
    max = 100,
    step = 0.1,
    showValue = true,
  }
  :add_range {
    label = "Range #3",
    default = 60,
    min = 0,
    max = 100,
    step = 1,
    showValue = true,
    readonly = true,
  }
  :show()
```

### Add a Single Picker to the Dialog (**dialog:add_picker**)

#### Declaration

```lua
dialog = dialog:add_picker(title, options_list[, default_value])
```

```lua
dialog = dialog:add_picker {
  label = title,
  key = key,
  default = default_value,
  icon = icon,
  readonly = readonly,
  options = options_list,
  footerText = footer_text,
  popoverMode = popover_mode,
}
```

#### Parameters and Return Values

- dialog *dialog object*
- title *string*
- key *string*, *optional*, default is **title**
- options_list *list of strings*
- default_value *string*, *optional*, default is `options_list[1]`
- icon *string*, *optional*, default **no icon**
- readonly *boolean*, *optional*, default is `false`
- footer_text *string*, *optional*, default is an empty string `""`
- popover_mode *boolean*, *optional*, default is `true`

#### Example

```lua title="dialog:add_picker"
dialog("MyWorld")
  :add_group("Picker Group")
  :add_picker("Single Picker #1", {"Option #1", "Option #2", "Option #3"}, "Option #2")
  :add_picker {
    label = "Single Picker #2",
    default = "Option #2",
    icon = "link",
    options = {"Option #1", "Option #2", "Option #3"},
    footerText = "This is a footer text.",
    popoverMode = false,
  }
  :show()
```

### Add a Multiple Picker to the Dialog (**dialog:add_multiple_picker**)

#### Declaration

```lua
dialog = dialog:add_multiple_picker(title, options_list[, default_values_list])
```

```lua
dialog = dialog:add_multiple_picker {
  label = title,
  key = key,
  default = default_values_list,
  icon = icon,
  readonly = readonly,
  options = options_list,
  footerText = footer_text,
  maxCount = max_count,
  popoverMode = popover_mode,
}
```

#### Parameters and Return Values

- dialog *dialog object*
- title *string*
- key *string*, *optional*, default is **title**
- options_list *list of strings*
- default_values_list *list of strings*, *optional*, default is an empty array `{}`, i.e., no options selected
- icon *string*, *optional*, default **no icon**
- readonly *boolean*, *optional*, default is `false`
- footer_text *string*, *optional*, default is an empty string `""`
- max_count *integer*, *optional*, default **no limit**
- popover_mode *boolean*, *optional*, default is `true`

#### Example

```lua title="dialog:add_multiple_picker"
dialog("MyWorld")
  :add_group("Multiple Picker Group")
  :add_multiple_picker("Multiple Picker #1", {"Option #1", "Option #2", "Option #3"}, {"Option #2", "Option #3"})
  :add_multiple_picker {
    label = "Multiple Picker #2",
    default = {"Option #2", "Option #3"},
    icon = "link",
    options = {"Option #1", "Option #2", "Option #3", "Option #4", "Option #5"},
    footerText = "This is a footer text.",
    maxCount = 2,
    popoverMode = false,
  }
  :show()
```

### Add an Ordered Picker to the Dialog (**dialog:add_ordered_picker**)

#### Declaration

```lua
dialog = dialog:add_ordered_picker(title, options_list[, default_values_list])
```

```lua
dialog = dialog:add_ordered_picker {
  label = title,
  key = key,
  default = default_values_list,
  icon = icon,
  readonly = readonly,
  options = options_list,
  footerText = footer_text,
  minCount = min_count,
  maxCount = max_count,
  popoverMode = popover_mode,
}
```

#### Parameters and Return Values

- dialog *dialog object*
- title *string*
- key *string*, *optional*, default is **title**
- options_list *list of strings*
- default_values_list *list of strings*, *optional*, default is an empty array `{}`, i.e., no options selected
- icon *string*, *optional*, default **no icon**
- readonly *boolean*, *optional*, default is `false`
- footer_text *string*, *optional*, default is an empty string `""`
- min_count *integer*, *optional*, default is `0`
- max_count *integer*, *optional*, default **no limit**
- popover_mode *boolean*, *optional*, default is `true`

#### Example

```lua title="dialog:add_ordered_picker"
dialog("MyWorld")
  :add_group("Ordered Picker Group")
  :add_ordered_picker("Ordered Picker #1", {"Option #1", "Option #2", "Option #3"}, {"Option #2", "Option #3"})
  :add_ordered_picker {
    label = "Ordered Picker #2",
    default = {"Option #2", "Option #3"},
    icon = "link",
    options = {"Option #1", "Option #2", "Option #3", "Option #4", "Option #5"},
    footerText = "This is a footer text.",
    minCount = 1,
    maxCount = 3,
    popoverMode = false,
  }
  :show()
```

### Add a Radio Group to the Dialog (**dialog:add_radio**)

#### Declaration

```lua
dialog = dialog:add_radio(title, options_list[, default_value])
```

```lua
dialog = dialog:add_radio {
  label = title,
  key = key,
  default = default_value,
  readonly = readonly,
  options = options_list,
  numPerLine = num_per_line,
}
```

#### Parameters and Return Values

- dialog *dialog object*
- title *string*
- key *string*, *optional*, default is **title**
- options_list *list of strings*
- default_value *string*, *optional*, default is `options_list[1]`
- readonly *boolean*, *optional*, default is `false`
- num_per_line *integer*, *optional*, default is `2`

#### Description

This component displays several radio buttons in the interface.  
Clicking a radio button selects the current radio button and deselects other radio buttons in the same group.

#### Example

```lua title="dialog:add_radio"
dialog("MyWorld")
  :add_radio("Radio #1", {"Option #1", "Option #2", "Option #3"}, "Option #2")
  :add_radio {
    label = "Radio #2",
    default = "Option #2",
    options = {"Option #1", "Option #2", "Option #3", "Option #4", "Option #5"},
    numPerLine = 1,
  }
  :show()
```

### Add a Checkbox Group to the Dialog (**dialog:add_checkbox**)

#### Declaration

```lua
dialog = dialog:add_checkbox(title, options_list[, default_values_list])
```

```lua
dialog = dialog:add_checkbox {
  label = title,
  key = key,
  default = default_values_list,
  readonly = readonly,
  options = options_list,
  numPerLine = num_per_line,
  minCount = min_count,
  maxCount = max_count,
}
```

#### Parameters and Return Values

- dialog *dialog object*
- title *string*
- key *string*, *optional*, default is **title**
- options_list *list of strings*
- default_values_list *list of strings*, *optional*, default is an empty array `{}`, i.e., no options selected
- readonly *boolean*, *optional*, default is `false`
- num_per_line *integer*, *optional*, default is `2`
- min_count *integer*, *optional*, default is `0`
- max_count *integer*, *optional*, default **no limit**

#### Description

This component displays several checkboxes in the interface.  
Clicking a checkbox toggles its selected or unselected state.

#### Example

```lua title="dialog:add_checkbox"
dialog("MyWorld")
  :add_checkbox("Checkbox #1", {"Option #1", "Option #2", "Option #3"}, {"Option #2", "Option #3"})
  :add_checkbox {
    label = "Checkbox #2",
    default = {"Option #2", "Option #3"},
    options = {"Option #1", "Option #2", "Option #3", "Option #4", "Option #5"},
    numPerLine = 1,
    minCount = 1,
    maxCount = 3,
  }
  :show()
```

### Add a Stepper to the Dialog (**dialog:add_stepper**)

#### Declaration

```lua
dialog = dialog:add_stepper(title, {min_value, max_value, step}[, default_value])
```

```lua
dialog = dialog:add_stepper {
  label = title,
  key = key,
  default = default_value,
  readonly = readonly,
  min = min_value,
  max = max_value,
  step = step,
  isInteger = is_integer,
  autoRepeat = auto_repeat,
}
```

#### Parameters and Return Values

- dialog *dialog object*
- title *string*
- key *string*, *optional*, default is **title**
- min_value *number*
- max_value *number*
- step *number*
- default_value *number*, *optional*, default is **min_value**
- readonly *boolean*, *optional*, default is `false`
- is_integer *boolean*, *optional*, default is `false`
- auto_repeat *boolean*, *optional*, default is `true`

#### Description

This component displays a stepper in the interface for selecting and fine-tuning values.

#### Example

```lua title="dialog:add_stepper"
dialog("MyWorld")
  :add_group("Stepper Group")
  :add_stepper("Stepper #1", {0, 10, 0.25}, 7.5)
  :add_stepper {
    label = "Stepper #2",
    default = 50,
    min = 0,
    max = 100,
    step = 1,
    isInteger = true,
    autoRepeat = false,
  }
  :show()
```

### Add a DateTime Picker to the Dialog (**dialog:add_datetime**)

#### Declaration

```lua
dialog = dialog:add_datetime(title[, picker_mode, format_text])
```

```lua
dialog = dialog:add_datetime {
  label = title,
  key = key,
  default = default_value,
  readonly = readonly,
  min = min_timestamp,
  max = max_timestamp,
  minuteInterval = minute_interval,
  mode = picker_mode,
  format = format_text,
}
```

#### Parameters and Return Values

- dialog *dialog object*
- title *string*
- key *string*, *optional*, default is **title**
- picker_mode *enum*, *optional*
  - `datetime` DateTime picker, default value
  - `date` Date picker
  - `time` Time picker
  - `interval` Time interval picker
- format_text
  - *string*, *optional*, default is ISO8601 format, i.e., `yyyy-MM-dd HH:mm:ss`
- default_value *string*, *optional*, default is the current time
- readonly *boolean*, *optional*, default is `false`
- min_timestamp *integer*, *optional*, default is `0`
- max_timestamp *integer*, *optional*, default **distant future**
- minute_interval *integer*, *optional*, default is `1`

#### Description

This component displays a date-time picker in the interface for selecting dates, times, and adjusting time intervals.

#### Example

```lua title="dialog:add_datetime"
dialog("MyWorld")
  :add_datetime("Datetime #1")
  :add_datetime {
    label = "Datetime #2",
    default = "2020-01-01 00:00:00",
    min = 1577808000,
    max = 1609459200,
    mode = "datetime",
    format = "yyyy-MM-dd HH:mm:ss",
  }
  :add_datetime {
    label = "Datetime #3",
    default = "2020-01-01",
    min = 1577808000,
    max = 1609459200,
    mode = "date",
    format = "yyyy-MM-dd",
  }
  :add_datetime {
    label = "Datetime #4",
    default = "00:00:00",
    mode = "time",
    format = "HH:mm:ss",
  }
  :add_datetime {
    label = "Datetime #5",
    minuteInterval = 15,
    mode = "interval",
  }
  :show()
```

### Add a Text Area to the Dialog (**dialog:add_textarea**)

#### Declaration

```lua
dialog = dialog:add_textarea(title)
```

```lua
dialog = dialog:add_textarea {
  label = title,
  key = key,
  default = default_value,
  icon = icon,
  readonly = readonly,
  maxLength = max_length,
  keyboard = keyboard_type,
}
```

#### Parameters and Return Values

- dialog *dialog object*
- title *string*
- key *string*, *optional*, default is **title**
- default_value *string*, *optional*, default is an empty string `""`
- icon *string*, *optional*, default **no icon**
- readonly *boolean*, *optional*, default is `false`
- max_length *integer*, *optional*, default **no limit**
- keyboard_type *enum*, *optional*
  - `Default` Default keyboard, default value
  - `ASCIICapable` ASCII keyboard
  - `NumbersAndPunctuation` Numbers and punctuation keyboard
  - `URL` URL keyboard
  - `NumberPad` Number pad
  - `PhonePad` Phone pad
  - `NamePhonePad` Name and phone pad
  - `EmailAddress` Email address keyboard
  - `DecimalPad` Decimal pad

#### Description

This component displays a submenu item in the interface, linking to a multi-line text input interface.

#### Example

```lua title="dialog:add_textarea"
dialog("MyWorld")
  :add_group("Textarea Group")
  :add_textarea("Textarea #1")
  :add_textarea {
    label = "Textarea #2",
    default = "82flex@gmail.com",
    icon = "rectangle.and.pencil.and.ellipsis",
    readonly = false,
    maxLength = 100,
    keyboard = "EmailAddress",
  }
  :show()
```

### Add a Key-Value Display to the Dialog (**dialog:add_value**)

#### Declaration

```lua
dialog = dialog:add_value(title[, value])
```

```lua
dialog = dialog:add_value {
  label = title,
  key = key,
  value = value,
  icon = icon,
}
```

#### Parameters and Return Values

- dialog *dialog object*
- title *string*
- key *string*, *optional*, default is **title**
- value *string*, *optional*, default is an empty string `""`
- icon *string*, *optional*, default **no icon**

#### Description

- This component cannot trigger any events and is only used to display information.
- This component is similar to the parameter display in **Settings** → **General** → **About**.
- Setting the **key** of this component to the **key** of other dialog components allows this component to synchronize and display the values of other components.

#### Example

```lua title="dialog:add_value"
dialog("MyWorld")
  :add_group("Title-Value Group")
  :add_value("Title #1", "Value #1")
  :add_value {
    label = "Title #2",
    value = "Value #2",
    icon = "circle",
  }
  :add_group("Title-Value Sync Group")
  :add_switch {
    label = "Switch #3",
    key = "switch_3",
  }
  :add_value {
    label = "Value #3",
    key = "switch_3",  -- Synchronize and display the value of Switch #3
  }
  :show()
```

### Add an Image to the Dialog (**dialog:add_image**)

#### Declaration

```lua
dialog = dialog:add_image(image)
```

```lua
dialog = dialog:add_image {
  path = image_path,
  height = height,
}
```

#### Parameters and Return Values

- dialog *dialog object*
- image [*image object*](img.md#image-object)
- image_path
  - *string*, supports formats like `png`, `jpeg`, or `heic`
- height *integer*, *optional*, default is **image height**

#### Description

This component displays a static image in the interface.

:::note
Setting the **height** of the image allows the image to adaptively display in the dialog.
:::

#### Example

```lua title="dialog:add_image"
dialog("MyWorld")
  :add_group("Image Group #1")
  :add_image(screen.image(100, 100, 300, 300))
  :add_group("Image Group #2")
  :add_image {
    path = "/Applications/Cydia.app/Icon-72@2x.png",  -- Image path
    height = 72,
  }
  :show()
```

### Add a Button to the Dialog (**dialog:add_button**)

#### Declaration 1

```lua
dialog = dialog:add_button(title[, callback_function])  -- Trigger callback function
```

```lua
dialog = dialog:add_button {
  label = title,
  callback = callback_function,
  icon = icon,
  readonly = readonly,
  alignment = alignment,
}
```

#### Declaration 2

```lua
dialog = dialog:add_button(title[, url])  -- Open URL in default browser
```

```lua
dialog = dialog:add_button {
  label = title,
  url = url,
  icon = icon,
  readonly = readonly,
  alignment = alignment,
}
```

#### Parameters and Return Values

- dialog *dialog object*
- title *string*
- callback_function
  - *function*, *optional*, default is **no callback function**. The callback function’s parameter is this button object
- url *string*, *optional*
- icon *string*, *optional*, default **no icon**
- readonly *boolean*, *optional*, default is `false`
- alignment *enum*, *optional*
  - `Left` Left-aligned, default value
  - `Center` Center-aligned
  - `Right` Right-aligned
  - `Natural` Natural alignment
  - `Justified` Justified alignment

#### Description

This component displays a button in the interface. Clicking the button triggers the **callback function** or opens the **url** in the default browser.

:::caution Limitation
Using **callback functions** through [Declaration 1](#declaration-1) requires support from the [Thread Module](thread.md). If the thread module is not enabled, only **url** can be used through [Declaration 2](#declaration-2).
:::

#### Example

```lua title="dialog:add_button"
require("thread")(function ()  -- Enable thread module
  dialog("MyWorld")
    :add_group("Button Group #1")
    :add_button("Button #1", "https://www.baidu.com")  -- Open URL
    :add_button {
      label = "Button #2",
      url = "https://www.baidu.com",
      icon = "link",
      readonly = true,
    }
    :add_group("Button Group #2")
    :add_button("Button #1", function(btn)             -- Trigger callback function
      sys.toast(btn.label .. " clicked")
    end)
    :add_button {
      label = "Button #2",
      callback = function(btn)
        sys.toast(btn.label .. " clicked")
      end,
      icon = "link",
      alignment = "Right",
    }
    :show()
end)
```

### Link to a Sub-Dialog (**dialog:add_link**)

#### Declaration

```lua
dialog = dialog:add_link(sub_dialog)
```

#### Parameters and Return Values

- dialog *dialog object*
- sub_dialog *dialog object*

#### Description

This component displays a submenu item in the interface, linking to a **sub-dialog**.

#### Example

```lua title="dialog:add_link"
dialog("MyWorld")
  :add_group("Link Group")
  :add_link(
    dialog("MyWorld - Child Dialog")
      :add_group("Label")
      :add_label("This is a child dialog."))
  :show()
```

### 🚥 Show the Dialog and Return User’s Selection (**dialog:show**)

#### Declaration

```lua
submitted, options_table = dialog:show()
```

#### Parameters and Return Values

- dialog *dialog object*
- submitted
  - *boolean*, whether the submit button was pressed
- options_table
  - *table*, returns a key-value table mapped by **title**

#### Simple Example

```lua title="dialog:show"
local c, s = dialog():add_switch('A Switch', false):show()
sys.alert(tostring(s["A Switch"]))
```

#### Complex Example

```lua title="dialog:show"
local dlg = dialog()  -- Create a dialog object
--
-- The following is the configuration for this dialog object
dlg:set_config('test')    -- Config save ID
dlg:set_timeout(30)
dlg:add_group('Basic Information')
dlg:add_label('Simple effect demonstration')
dlg:add_range('Health', {0, 1000, 1}, 300)
dlg:add_input('Account', 'ccc')
dlg:add_input {
  label = 'Password',
  default = 'aaaa',
  isSecure = true,
}
dlg:add_picker('Gender', {'Male', 'Female', 'Unknown'}, 'Male')
dlg:add_switch('Are you a pervert?', false)
dlg:add_checkbox('Favorite Games', {'Overwatch', 'World of Warcraft', 'Hearthstone'}, {'Overwatch', 'World of Warcraft'})
dlg:add_radio('Favorite Game', {'Overwatch', 'World of Warcraft', 'Hearthstone'}, 'World of Warcraft')
--
local confirm, selects = dlg:show()  -- Show the dialog object in the foreground and get its return value
--
if confirm then
  nLog("You pressed submit")
else
  nLog("You did not press submit")
end
--
nLog("Account", selects["Account"])
nLog("Password", selects["Password"])
nLog("Gender", selects["Gender"])
nLog("Health", selects["Health"])
--
if selects['Are you a pervert?'] then
  nLog("You admitted to being a pervert")
else
  nLog("You did not admit to being a pervert")
end
--
nLog("Your favorite games list")
for _, gamename in ipairs(selects['Favorite Games']) do
  nLog(gamename)
end
--
nLog("Your favorite game: " .. selects["Favorite Game"])
--
sys.alert(print.out())
```

### Get Dialog Config Without Displaying the Dialog (**dialog:load**)

#### Declaration

```lua
submitted, options_table = dialog:load()
```

#### Parameters and Return Values

- dialog *dialog object*
- submitted
  - *boolean*, whether the submit button was pressed, always returns `false` here
- options_table
  - *table*, returns a key-value table mapped by **title**

#### Description

Get the dialog config without displaying the dialog. If the dialog currently has no saved config, the default values are loaded.

#### Example

```lua title="dialog:load"
local dlg = dialog()
--
dlg:set_config('test')  -- Config save ID
dlg:set_timeout(30)
dlg:add_group('Basic Information')
dlg:add_label('Simple effect demonstration')
dlg:add_range('Health', {0, 1000, 1}, 300)
dlg:add_input('Account', 'ccc')
dlg:add_input {
  label = 'Password',
  default = 'aaaa',
  isSecure = true,
}
dlg:add_picker('Gender', {'Male', 'Female', 'Unknown'}, 'Male')
dlg:add_switch('Are you a pervert?', false)
dlg:add_checkbox('Favorite Games', {'Overwatch', 'World of Warcraft', 'Hearthstone'}, {'Overwatch', 'World of Warcraft'})
dlg:add_radio('Favorite Game', {'Overwatch', 'World of Warcraft', 'Hearthstone'}, 'World of Warcraft')
--
local _, selects
--
if utils.is_launch_via_app() then -- Check if currently launched from app
  _, selects = dlg:show()           -- If script is launched from app, display config window
else
  _, selects = dlg:load()           -- If script is launched via volume key or other methods, do not display
end
--
nLog("Account", selects["Account"])
nLog("Password", selects["Password"])
nLog("Gender", selects["Gender"])
nLog("Health", selects["Health"])
--
if selects['Are you a pervert?'] then
  nLog("You admitted to being a pervert")
else
  nLog("You did not admit to being a pervert")
end
--
nLog("Your favorite games list")
for _, gamename in ipairs(selects['Favorite Games']) do
  nLog(gamename)
end
--
nLog("Your favorite game: " .. selects["Favorite Game"])
--
sys.alert(print.out())
```

### Show a Config Interface (**dialog.show**)

#### Declaration

```lua
dialog.show(config_interface)
```

#### Parameters and Return Values

- config_interface *dialog object*

#### Description

This function is different from [`dialog:show`](#show-a-config-interface-dialogshow) in that it does not block and has no return value.

:::caution
Before calling this function, you must first call [`dialog.setup`](#validate-a-config-interface-dialogsetup) to validate the **config_interface**.
:::

#### Example

```lua title="dialog.show"
local dlg = dialog("MyWorld")
  :add_group("New Group")
  :add_switch("Switch #1")
dialog.setup(dlg)  -- Validate config interface
dialog.show(dlg)   -- Show config interface
```

### Dismiss the Currently Displayed Config Interface (**dialog.dismiss**)

#### Declaration

```lua
dialog.dismiss()
```

#### Description

Does not block and has no return value. If no config interface is currently displayed, nothing happens.

### Validate a Config Interface (**dialog.setup**)

#### Declaration

```lua
dialog.setup(config_interface[, save_config])
```

#### Parameters and Return Values

- config_interface *dialog object*
- save_config
  - *boolean*, *optional*, whether to validate and correct the stored config table based on the controls in the **config_interface**. Default is `false`

#### Example

```lua title="dialog.setup"
local dlg = dialog("MyWorld")
  :add_group("New Group")
  :add_switch("Switch #2")
dialog.setup(dlg)  -- Validate config interface
dialog.show(dlg)   -- Show config interface
```

### Reload the Currently Displayed Config Interface (**dialog.reload**)

#### Declaration

```lua
dialog.reload([ reload_config_table ])
```

#### Parameters and Return Values

- reload_config_table
  - *table*, *optional*, if not provided, reloads all

```lua title="Reload Config Table Structure"
{
  defaults = config_section,
  { key = key, value = value },
  { key = key, value = value },
  ...
}
```

#### Description

If no config interface is currently displayed, nothing happens.

:::caution Performance
Be mindful of the frequency of calling this function. Calling it too frequently can cause the springboard to freeze.
:::

#### Example: Reload All Config

```lua title="dialog.reload"
local sw = false
local dlg = dialog("MyWorld")
  :add_group("New Group")
  :add_switch("Switch #2", sw)
dialog.setup(dlg)
dialog.show(dlg)
--
while dialog.exists() do
  sys.msleep(1000)
  sw = not sw
  dialog.set("MyWorld", "Switch #2", sw)
  dialog.reload()
end
```

#### Example: Reload Partial Config

```lua title="dialog.reload"
local sw = false
local dlg = dialog("MyWorld")
  :add_group("New Group")
  :add_switch("Switch #2", sw)
dialog.setup(dlg)
dialog.show(dlg)
--
while dialog.exists() do
  sys.msleep(1000)
  sw = not sw
  dialog.reload {
    defaults = "MyWorld",
    { key = "Switch #2", value = sw },
  }
end
```

### Get the Value of a Control in the Config Interface (**dialog.get**)

#### Declaration

```lua
value = dialog.get(config_section, key)
```

#### Parameters and Return Values

- config_section **string**
- key *string*
- value
  - *any*, different controls return different types of **value**. If not present, returns `nil`

#### Description

Does not ensure that the **value** type matches the control type.  
If you need to ensure the value type is valid, you can first use [`dialog.setup`](#validate-a-config-interface-dialogsetup) to correct it before reading.

#### Example

```lua title="dialog.get"
local dlg = dialog("MyWorld")
  :add_group("New Group")
  :add_switch("Switch #2")
dialog.setup(dlg, true)  -- Validate and save config
local sw = dialog.get("MyWorld", "Switch #2")
sys.alert(stringify(sw))
```

### Set the Value of a Control in the Config Interface (**dialog.set**)

#### Declaration

```lua
dialog.set(config_section, key, value)
```

#### Parameters and Return Values

- config_section *string*
- key *string*
- value
  - *any*, different controls can set different types of **value**

#### Description

Does not ensure that the **value** type matches the control type.  
If you need to ensure the value type is valid, you can use [`dialog.setup`](#validate-a-config-interface-dialogsetup) to correct it after setting.

:::info
If the config interface is currently displayed, it **will not** immediately update the displayed value.  
If you need to immediately update the displayed value in the config interface, you can use [`dialog.reload`](#reload-the-currently-displayed-config-interface-dialogreload).
:::

#### Example

```lua title="dialog.set"
local dlg = dialog("MyWorld")
  :add_group("Concat Group")
  :add_multiple_picker("Picker #1", { "A", "BB", "CCC", "DDDD", "EEEEE" }, { "A", "BB" })
dialog.setup(dlg, true)  -- Validate and save config
dlg:show()
--
local selected = dialog.get("MyWorld", "Picker #1")
table.insert(selected, "EEEEE")
dialog.set("MyWorld", "Picker #1", selected)
dialog.setup(dlg, true)  -- Validate and save config
--
sys.alert(stringify(dialog.get("MyWorld", "Picker #1")))
```

### Read All Configs of a Config Section (**dialog.read**)

#### Declaration

```lua
config_table = dialog.read(config_section)
```

#### Parameters and Return Values

- config_section *string*
- config_table
  - *table*, key-value pairs of all configs in this **config_section**, if the config section does not exist, returns an empty table `{}`

#### Description

Optimizes reading multiple configs. Does not ensure that the values in the config table match the control types.  
If you need to ensure the value types are valid, you can first use [`dialog.setup`](#validate-a-config-interface-dialogsetup) to correct them before reading.

#### Example

```lua title="dialog.read"
dialog.read("MyWorld")
```

### Overwrite and Write Config Table to a Config Section (**dialog.write**)

#### Declaration

```lua
success = dialog.write(config_section, config_table)
```

#### Parameters and Return Values

- config_section *string*
- config_table *table*

#### Description

Optimizes writing multiple configs. Does not ensure that the values in the config table match the control types.  
If you need to ensure the value types are valid, you can use [`dialog.setup`](#validate-a-config-interface-dialogsetup) to correct them after setting.

:::info
If the config interface is currently displayed, it **will not** immediately update the displayed value.  
If you need to immediately update the displayed value in the config interface, you can use [`dialog.reload`](#reload-the-currently-displayed-config-interface-dialogreload).
:::

#### Example

```lua title="dialog.write"
dialog.write("MyWorld", {
  ["Switch #4"] = false,
  ["Switch #3"] = false,
  ["Switch #2"] = true,
  ["Switch #1"] = true,
  ["Picker #1"] = {
    [1] = "A",
    [2] = "CCC",
  },
})
```

### Clear All Configs of a Config Section (**dialog.clear**)

#### Declaration

```lua
success = dialog.clear(config_section)
```

#### Parameters and Return Values

- config_section *string*

#### Description

After clearing, use [`dialog.setup`](#validate-a-config-interface-dialogsetup) to regenerate the default config of the config interface.

:::info
If the config interface is currently displayed, it **will not** immediately update the displayed value.  
If you need to immediately update the displayed value in the config interface, you can use [`dialog.reload`](#reload-the-currently-displayed-config-interface-dialogreload).
:::

#### Example

```lua title="dialog.clear"
dialog.clear("MyWorld")
```
