---
sidebar_position: 22
---

# 对话框模块

## 对话框模块 - dialog

标有 🚥 的函数在 [**线程模块**](./thread.md) 中会发生 **让出**。在这些函数调用返回之前，其他的 **线程** 可能会得到运行机会。

本节中所用 **图标** 为 *文本型*，是 Apple 提供的 [SF Symbols](https://developer.apple.com/sf-symbols/) 中定义的图标名称。

### 建立一个对话框 \(**dialog**\)

#### 声明

```lua
对话框 = dialog([ 配置分区 ])
```

#### 参数及返回值

- 配置分区
  - *文本型*，*可选*，若不传入则使用随机名称
- 对话框 *对话框对象*

#### 说明

指定或随机一个 **配置分区**，返回一个对话框对象。  
对话框显示出来，并且用户按下 **提交** 后会保存配置选项，再次显示出来的时候默认选上保存好的配置。

:::note
配置选项表将以文件形式保存在 `/var/mobile/Media/1ferver/uicfg/<配置分区>.plist` 中。
:::

#### 示例

```lua title="dialog"
dialog("MyWorld")
  :set_title("Hello World")
  :add_group("Introduction")
  :add_label("This example shows how to use the dialog module.")
  :show()
```

### 获取、设置对话框配置分区 \(**dialog\.defaults/dialog\.set\_config**\)

#### 声明

```lua
配置分区 = 对话框.defaults           -- 获取对话框配置分区
对话框 = 对话框:set_config(配置分区)  -- 设置对话框配置分区
```

#### 参数及返回值

- 对话框 *对话框对象*
- 配置分区 *文本型*

### 配置对话框自动消失时间 \(**dialog\:set\_timeout**\)

#### 声明

```lua
对话框 = 对话框:set_timeout(超时秒[, 是否提交])
```

#### 参数及返回值

- 对话框 *对话框对象*
- 超时秒
  - *实数型*，对话框对象自动消失时间，单位秒
- 是否提交
  - *布尔型*，*可选*，对话框自动消失是否算提交，默认为 `false`

#### 示例

```lua title="dialog:set_timeout"
dialog():set_timeout(3):show()  -- 3 秒超时取消提交
--
dialog():set_timeout(3, true):show()  -- 3 秒超时并提交
```

### 配置对话框的标题 \(**dialog\:set\_title**\)

#### 声明

```lua
对话框 = 对话框:set_title(标题文本)
```

#### 参数及返回值

- 对话框 *对话框对象*
- 标题文本 *文本型*

#### 示例

```lua title="dialog:set_title"
dialog():set_title('标题'):show()
```

### 给对话框加上一个分组 \(**dialog\:add\_group**\)

#### 声明

```lua
对话框 = 对话框:add_group(分组名称)
```

```lua
对话框 = 对话框:add_group {
  label = 分组名称,
  footerText = 尾部文本,
}
```

#### 参数及返回值

- 对话框 *对话框对象*
- 分组名称 *文本型*
- 尾部文本
  - *文本型*，*可选*，显示在分组尾部的注释文本

#### 说明

此组件在界面上显示一个分组区域，包含到下一个分组组件之间的所有组件。通常用于功能划分，也经常用于对某一组件的补充描述。

#### 示例

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

### 给对话框加上一个标签 \(**dialog\:add\_label**\)

#### 声明

```lua
对话框 = 对话框:add_label(标签文本[, 对齐方式])
```

```lua
对话框 = 对话框:add_label {
  label = 标签文本,
  alignment = 对齐方式,
  selectable = 是否可选中,
}
```

#### 参数及返回值

- 对话框 *对话框对象*
- 标签文本 *文本型*
- 对齐方式 *枚举型*，*可选*
  - `Left` 左对齐，默认值
  - `Center` 居中对齐
  - `Right` 右对齐
  - `Natural` 自然对齐
  - `Justified` 两端对齐
- 是否可选中
  - *布尔型*，*可选*，标签文本是否可选中，默认为 `false`

#### 说明

此组件在界面上显示一段静态文本。

#### 示例

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

### 给对话框加上一个文本框 \(**dialog\:add\_input**\)

#### 声明

```lua
对话框 = 对话框:add_input(标题[, 占位符])
```

```lua
对话框 = 对话框:add_input {
  label = 标题,
  key = 键,
  default = 默认值,
  readonly = 是否只读,
  alignment = 对齐方式,
  keyboard = 键盘类型,
  placeholder = 占位符,
  isSecure = 是否为密码框,
  clearButtonMode = 清除按钮模式,
  maxLength = 最大长度,
  validationRegex = 验证正则表达式,
  prompt = 弹出式提示文本,
  message = 弹出式提示信息,
  okTitle = 弹出式提示确认按钮标题,
  cancelTitle = 弹出式提示取消按钮标题,
}
```

#### 参数及返回值

- 对话框 *对话框对象*
- 标题 *文本型*
- 键 *文本型*，*可选*，默认为 **标题**
- 占位符 *文本型*，*可选*，默认为空文本 `""`
- 默认值 *文本型*，*可选*，默认为 `nil`
- 是否只读 *布尔型*，*可选*，默认为 `false`
- 对齐方式 *枚举型*，*可选*
  - `Left` 左对齐，默认值
  - `Center` 居中对齐
  - `Right` 右对齐
  - `Natural` 自然对齐
  - `Justified` 两端对齐
- 键盘类型 *枚举型*，*可选*
  - `Default` 默认键盘，默认值
  - `ASCIICapable` ASCII 键盘
  - `NumbersAndPunctuation` 数字和标点键盘
  - `URL` URL 键盘
  - `NumberPad` 数字键盘
  - `PhonePad` 电话键盘
  - `NamePhonePad` 姓名和电话键盘
  - `EmailAddress` 邮箱地址键盘
  - `DecimalPad` 小数键盘
- 是否为密码框 *布尔型*，*可选*，默认为 `false`
- 清除按钮模式 *枚举型*，*可选*
  - `Never` 从不显示，默认值
  - `WhileEditing` 编辑时显示
  - `UnlessEditing` 非编辑时显示
  - `Always` 始终显示
- 最大长度 *整数型*，*可选*，默认 **不限制**
- 验证正则表达式 *文本型*，*可选*，默认 **不验证**

此组件支持将文本框经由弹框的形式显示。在这个模式下，适用于文本框的参数有：

- 弹出式提示文本 *文本型*，*可选*，默认为空文本 `""`
- 弹出式提示信息 *文本型*，*可选*，默认为空文本 `""`
- 弹出式提示确认按钮标题 *文本型*，*可选*，默认为 `"好"`
- 弹出式提示取消按钮标题 *文本型*，*可选*，默认为 `"取消"`

#### 说明

此组件在界面上显示一个文本框，用于字符串输入。  
**弹出式提示文本** 或 **弹出式提示信息** 不为空时，轻按文本框区域，会弹出提示框，并要求在弹出的提示框中输入值。

:::info
修改或添加字符串条目时，若字符串无法通过 **验证正则表达式**，则无法保存当前条目。
:::

#### 示例

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

### 给对话框加上一个开关 \(**dialog\:add\_switch**\)

#### 声明

```lua
对话框 = 对话框:add_switch(开关标题[, 默认值])
```

```lua
对话框 = 对话框:add_switch {
  label = 标题,
  key = 键,
  default = 默认值,
  icon = 图标,
  readonly = 是否只读,
  negate = 是否反转开关状态,
  trueValue = 开关为真时的值,
  falseValue = 开关为假时的值,
}
```

#### 参数及返回值

- 对话框 *对话框对象*
- 标题 *文本型*
- 键 *文本型*，*可选*，默认为 **标题**
- 默认值 *布尔型*，*可选*，默认为 `nil`
- 图标 *文本型*，*可选*，默认 **无图标**
- 是否只读 *布尔型*，*可选*，默认为 `false`
- 是否反转开关状态 *布尔型*，*可选*，默认为 `false`
- 开关为真时的值 *任意类型*，*可选*，默认为 `true`
- 开关为假时的值 *任意类型*，*可选*，默认为 `false`

#### 说明

此组件在界面上显示一个开关。

#### 示例

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

### 给对话框加上一个滑块 \(**dialog\:add\_range**\)

#### 声明

```lua
对话框 = 对话框:add_range(滑块标题, {最小值, 最大值[, 步长]}[, 默认值])
```

```lua
对话框 = 对话框:add_range {
  label = 标题,
  key = 键,
  default = 默认值,
  min = 最小值,
  max = 最大值,
  step = 步长,
  showValue = 是否显示当前值,
  readonly = 是否只读,
}
```

#### 参数及返回值

- 对话框 *对话框对象*
- 标题 *文本型*
- 键 *文本型*，*可选*，默认为 **标题**
- 最小值 *数值型*
- 最大值 *数值型*
- 步长 *数值型*，*可选*，默认为 `0`，即趋近于无限小
- 默认值 *数值型*，*可选*，默认为 `0`
- 是否显示当前值 *布尔型*，*可选*，默认为 `false`
- 是否只读 *布尔型*，*可选*，默认为 `false`

#### 说明

此组件在界面上显示一个滑块，用于浮点数值的选择和调整。

#### 示例

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

### 给对话框加上一个单项选择器 \(**dialog\:add\_picker**\)

#### 声明

```lua
对话框 = 对话框:add_picker(标题, 选项列表[, 默认值])
```

```lua
对话框 = 对话框:add_picker {
  label = 标题,
  key = 键,
  default = 默认值,
  icon = 图标,
  readonly = 是否只读,
  options = 选项列表,
  footerText = 底部文本,
  popoverMode = 是否悬浮显示,
}
```

#### 参数及返回值

- 对话框 *对话框对象*
- 标题 *文本型*
- 键 *文本型*，*可选*，默认为 **标题**
- 选项列表 *文本型顺序表*
- 默认值 *文本型*，*可选*，默认为 `选项列表[1]`
- 图标 *文本型*，*可选*，默认 **无图标**
- 是否只读 *布尔型*，*可选*，默认为 `false`
- 底部文本 *文本型*，*可选*，默认为空文本 `""`
- 是否悬浮显示 *布尔型*，*可选*，默认为 `true`

#### 示例

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

### 给对话框加上一个多项选择器 \(**dialog\:add\_multiple\_picker**\)

#### 声明

```lua
对话框 = 对话框:add_multiple_picker(标题, 选项列表[, 默认值列表])
```

```lua
对话框 = 对话框:add_multiple_picker {
  label = 标题,
  key = 键,
  default = 默认值列表,
  icon = 图标,
  readonly = 是否只读,
  options = 选项列表,
  footerText = 底部文本,
  maxCount = 最大选择数,
  popoverMode = 是否悬浮显示,
}
```

#### 参数及返回值

- 对话框 *对话框对象*
- 标题 *文本型*
- 键 *文本型*，*可选*，默认为 **标题**
- 选项列表 *文本型顺序表*
- 默认值列表 *文本型顺序表*，*可选*，默认为空表 `{}`，即不选中任何选项
- 图标 *文本型*，*可选*，默认 **无图标**
- 是否只读 *布尔型*，*可选*，默认为 `false`
- 底部文本 *文本型*，*可选*，默认为空文本 `""`
- 最大选择数 *整数型*，*可选*，默认 **不限制**
- 是否悬浮显示 *布尔型*，*可选*，默认为 `true`

#### 示例

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

### 给对话框加上一个有序选择器 \(**dialog\:add\_ordered\_picker**\)

#### 声明

```lua
对话框 = 对话框:add_ordered_picker(标题, 选项列表[, 默认值列表])
```

```lua
对话框 = 对话框:add_ordered_picker {
  label = 标题,
  key = 键,
  default = 默认值列表,
  icon = 图标,
  readonly = 是否只读,
  options = 选项列表,
  footerText = 底部文本,
  minCount = 最小选择数,
  maxCount = 最大选择数,
  popoverMode = 是否悬浮显示,
}
```

#### 参数及返回值

- 对话框 *对话框对象*
- 标题 *文本型*
- 键 *文本型*，*可选*，默认为 **标题**
- 选项列表 *文本型顺序表*
- 默认值列表 *文本型顺序表*，*可选*，默认为空表 `{}`，即不选中任何选项
- 图标 *文本型*，*可选*，默认 **无图标**
- 是否只读 *布尔型*，*可选*，默认为 `false`
- 底部文本 *文本型*，*可选*，默认为空文本 `""`
- 最小选择数 *整数型*，*可选*，默认为 `0`
- 最大选择数 *整数型*，*可选*，默认 **不限制**
- 是否悬浮显示 *布尔型*，*可选*，默认为 `true`

#### 示例

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

### 给对话框加上一个单选组 \(**dialog\:add\_radio**\)

#### 声明

```lua
对话框 = 对话框:add_radio(标题, 选项列表[, 默认值])
```

```lua
对话框 = 对话框:add_radio {
  label = 标题,
  key = 键,
  default = 默认值,
  readonly = 是否只读,
  options = 选项列表,
  numPerLine = 每行个数,
}
```

#### 参数及返回值

- 对话框 *对话框对象*
- 标题 *文本型*
- 键 *文本型*，*可选*，默认为 **标题**
- 选项列表 *文本型顺序表*
- 默认值 *文本型*，*可选*，默认为 `选项列表[1]`
- 是否只读 *布尔型*，*可选*，默认为 `false`
- 每行个数 *整数型*，*可选*，默认为 `2`

#### 说明

此组件在界面上显示若干单选框。  
点选单选框会选中当前选择的单选框，取消同组其他单选框的选中状态。

#### 示例

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

### 给对话框加上一个多选组 \(**dialog\:add\_checkbox**\)

#### 声明

```lua
对话框 = 对话框:add_checkbox(标题, 选项列表[, 默认值列表])
```

```lua
对话框 = 对话框:add_checkbox {
  label = 标题,
  key = 键,
  default = 默认值列表,
  readonly = 是否只读,
  options = 选项列表,
  numPerLine = 每行个数,
  minCount = 最小选择数,
  maxCount = 最大选择数,
}
```

#### 参数及返回值

- 对话框 *对话框对象*
- 标题 *文本型*
- 键 *文本型*，*可选*，默认为 **标题**
- 选项列表 *文本型顺序表*
- 默认值列表 *文本型顺序表*，*可选*，默认为空表 `{}`，即不选中任何选项
- 是否只读 *布尔型*，*可选*，默认为 `false`
- 每行个数 *整数型*，*可选*，默认为 `2`
- 最小选择数 *整数型*，*可选*，默认为 `0`
- 最大选择数 *整数型*，*可选*，默认 **不限制**

#### 说明

此组件在界面上显示若干复选框。  
点选复选框会切换其选中或未选状态。

#### 示例

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

### 给对话框加上一个数值调节器 \(**dialog\:add\_stepper**\)

#### 声明

```lua
对话框 = 对话框:add_stepper(标题, {最小值, 最大值, 步长}[, 默认值])
```

```lua
对话框 = 对话框:add_stepper {
  label = 标题,
  key = 键,
  default = 默认值,
  readonly = 是否只读,
  min = 最小值,
  max = 最大值,
  step = 步长,
  isInteger = 是否整数,
  autoRepeat = 长按是否自动重复,
}
```

#### 参数及返回值

- 对话框 *对话框对象*
- 标题 *文本型*
- 键 *文本型*，*可选*，默认为 **标题**
- 最小值 *数值型*
- 最大值 *数值型*
- 步长 *数值型*
- 默认值 *数值型*，*可选*，默认为 **最小值**
- 是否只读 *布尔型*，*可选*，默认为 `false`
- 是否整数 *布尔型*，*可选*，默认为 `false`
- 长按是否自动重复 *布尔型*，*可选*，默认为 `true`

#### 说明

此组件在界面上显示一个调节器，用于数值的选择和微调。

#### 示例

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

### 给对话框加上一个日期时间选择器 \(**dialog\:add\_datetime**\)

#### 声明

```lua
对话框 = 对话框:add_datetime(标题[, 选择器模式, 格式化文本])
```

```lua
对话框 = 对话框:add_datetime {
  label = 标题,
  key = 键,
  default = 默认值,
  readonly = 是否只读,
  min = 最小时间戳,
  max = 最大时间戳,
  minuteInterval = 分钟间隔,
  mode = 选择器模式,
  format = 格式化文本,
}
```

#### 参数及返回值

- 对话框 *对话框对象*
- 标题 *文本型*
- 键 *文本型*，*可选*，默认为 **标题**
- 选择器模式 *枚举型*，*可选*
  - `datetime` 日期时间选择器，默认值
  - `date` 日期选择器
  - `time` 时间选择器
  - `interval` 时间间隔选择器
- 格式化文本
  - *文本型*，*可选*，默认为 ISO8601 格式，即 `yyyy-MM-dd HH:mm:ss`
- 默认值 *文本型*，*可选*，默认为当前时间
- 是否只读 *布尔型*，*可选*，默认为 `false`
- 最小时间戳 *整数型*，*可选*，默认为 `0`
- 最大时间戳 *整数型*，*可选*，默认 **遥远的未来**
- 分钟间隔 *整数型*，*可选*，默认为 `1`

#### 说明

此组件在界面上显示一个时间日期选择器，用于日期、时间的选择及时间间隔的调整。

#### 示例

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

### 给对话框加上一个多行文本域 \(**dialog\:add\_textarea**\)

#### 声明

```lua
对话框 = 对话框:add_textarea(标题)
```

```lua
对话框 = 对话框:add_textarea {
  label = 标题,
  key = 键,
  default = 默认值,
  icon = 图标,
  readonly = 是否只读,
  maxLength = 最大长度,
  keyboard = 键盘类型,
}
```

#### 参数及返回值

- 对话框 *对话框对象*
- 标题 *文本型*
- 键 *文本型*，*可选*，默认为 **标题**
- 默认值 *文本型*，*可选*，默认为空文本 `""`
- 图标 *文本型*，*可选*，默认 **无图标**
- 是否只读 *布尔型*，*可选*，默认为 `false`
- 最大长度 *整数型*，*可选*，默认 **不限制**
- 键盘类型 *枚举型*，*可选*
  - `Default` 默认键盘，默认值
  - `ASCIICapable` ASCII 键盘
  - `NumbersAndPunctuation` 数字和标点键盘
  - `URL` URL 键盘
  - `NumberPad` 数字键盘
  - `PhonePad` 电话键盘
  - `NamePhonePad` 姓名和电话键盘
  - `EmailAddress` 邮箱地址键盘
  - `DecimalPad` 小数键盘

#### 说明

此组件在界面上显示一个子菜单项，用于链接到一个多行文本输入界面。

#### 示例

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

### 给对话框加上一个键值对显示 \(**dialog\:add\_value**\)

#### 声明

```lua
对话框 = 对话框:add_value(标题[, 值])
```

```lua
对话框 = 对话框:add_value {
  label = 标题,
  key = 键,
  value = 值,
  icon = 图标,
}
```

#### 参数及返回值

- 对话框 *对话框对象*
- 标题 *文本型*
- 键 *文本型*，*可选*，默认为 **标题**
- 值 *文本型*，*可选*，默认为空文本 `""`
- 图标 *文本型*，*可选*，默认 **无图标**

#### 说明

- 此组件不能触发任何事件，仅用于显示信息。
- 此组件类似于 **设置** -> **通用** -> **关于本机** 中的参数显示。
- 设置此组件的 **键** 为其他对话框组件的 **键**，可以使此组件同步显示其他组件的值。

#### 示例

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
    key = "switch_3",  -- 同步显示 Switch #3 的值
  }
  :show()
```

### 给对话框加上一张图片 \(**dialog\:add\_image**\)

#### 声明

```lua
对话框 = 对话框:add_image(图片)
```

```lua
对话框 = 对话框:add_image {
  path = 图片路径,
  height = 高度,
}
```

#### 参数及返回值

- 对话框 *对话框对象*
- 图片 [*图片对象*](./img.md#图片对象)
- 图片路径
  - *文本型*，支持 `png`、`jpeg` 或 `heic` 等格式
- 高度 *整数型*，*可选*，默认为 **图片高度**

#### 说明

此组件在界面上显示一张静态图片。

:::note
设置图片的 **高度**，可以使图片在对话框中自适应显示。
:::

#### 示例

```lua title="dialog:add_image"
dialog("MyWorld")
  :add_group("Image Group #1")
  :add_image(screen.image(100, 100, 300, 300))
  :add_group("Image Group #2")
  :add_image {
    path = "/Applications/Cydia.app/Icon-72@2x.png",  -- 图片路径
    height = 72,
  }
  :show()
```

### 给对话框加上一个按钮 \(**dialog\:add\_button**\)

#### 声明 1

```lua
对话框 = 对话框:add_button(标题[, 回调函数])  -- 触发回调函数
```

```lua
对话框 = 对话框:add_button {
  label = 标题,
  callback = 回调函数,
  icon = 图标,
  readonly = 是否只读,
  alignment = 对齐方式,
}
```

#### 声明 2

```lua
对话框 = 对话框:add_button(标题[, 网址URL])  -- 在默认浏览器中打开网址
```

```lua
对话框 = 对话框:add_button {
  label = 标题,
  url = 网址URL,
  icon = 图标,
  readonly = 是否只读,
  alignment = 对齐方式,
}
```

#### 参数及返回值

- 对话框 *对话框对象*
- 标题 *文本型*
- 回调函数
  - *函数型*，*可选*，默认为 **无回调函数**。传入回调函数的参数为此按钮对象
- 网址URL *文本型*，*可选*
- 图标 *文本型*，*可选*，默认 **无图标**
- 是否只读 *布尔型*，*可选*，默认为 `false`
- 对齐方式 *枚举型*，*可选*
  - `Left` 左对齐，默认值
  - `Center` 居中对齐
  - `Right` 右对齐
  - `Natural` 自然对齐
  - `Justified` 两端对齐

#### 说明

此组件在界面上显示一个按钮，点击按钮后会触发 **回调函数**，或在默认浏览器中打开 **网址URL**。

:::caution 限制
通过 [声明 1](#声明-1-1) 使用 **回调函数** 需要 [线程模块](./thread.md) 的支持。如果没有启用线程模块，则只能通过 [声明 2](#声明-2-1) 使用 **网址URL**。
:::

#### 示例

```lua title="dialog:add_button"
require("thread")(function ()  -- 启用线程模块
  dialog("MyWorld")
    :add_group("Button Group #1")
    :add_button("Button #1", "https://www.baidu.com")  -- 打开网址URL
    :add_button {
      label = "Button #2",
      url = "https://www.baidu.com",
      icon = "link",
      readonly = true,
    }
    :add_group("Button Group #2")
    :add_button("Button #1", function(btn)             -- 触发回调函数
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

### 链接到子对话框 \(**dialog\:add\_link**\)

#### 声明

```lua
对话框 = 对话框:add_link(子对话框)
```

#### 参数及返回值

- 对话框 *对话框对象*
- 子对话框 *对话框对象*

#### 说明

此组件在界面上显示一个子菜单项，用于链接到一个 **子对话框**。

#### 示例

```lua title="dialog:add_link"
dialog("MyWorld")
  :add_group("Link Group")
  :add_link(
    dialog("MyWorld - Child Dialog")
      :add_group("Label")
      :add_label("This is a child dialog."))
  :show()
```

### 🚥 将对话框弹出来并返回用户的选择 \(**dialog\:show**\)

#### 声明

```lua
是否提交, 选项关联表 = 对话框:show()
```

#### 参数及返回值

- 对话框 *对话框对象*
- 是否提交
  - *布尔型*，是否按下了提交按钮
- 选项关联表
  - *关联表*，返回一个以 **标题** 映射的键值表

#### 说明

此对话框的界面显示方向默认为最后一次调用 [`screen.init`](./screen.md#initialize-rotated-coordinate-system-screeninit) 时设置的方向。

#### 简单示例

```lua title="dialog:show"
local c, s = dialog():add_switch('一个开关', false):show()
sys.alert(tostring(s["一个开关"]))
```

#### 复杂示例

```lua title="dialog:show"
local dlg = dialog()  -- 创建一个 dialog 对象
--
-- 以下为此 dialog 对象配置
dlg:set_config('test')    -- 配置保存ID
dlg:set_timeout(30)
dlg:add_group('基本信息')
dlg:add_label('简易的效果展示')
dlg:add_range('血量', {0, 1000, 1}, 300)
dlg:add_input('账号', 'ccc')
dlg:add_input {
  label = '密码',
  default = 'aaaa',
  isSecure = true,
}
dlg:add_picker('性别', {'男', '女', '未知'}, '男')
dlg:add_switch('你是变态？', false)
dlg:add_checkbox('喜欢的游戏', {'守望先锋', '魔兽世界', '炉石传说'}, {'守望先锋', '魔兽世界'})
dlg:add_radio('最喜欢的游戏', {'守望先锋', '魔兽世界', '炉石传说'}, '魔兽世界')
--
local confirm, selects = dlg:show()  -- 显示 dialog 对象到前台并获得其返回值
--
if confirm then
  nLog("你按下了提交")
else
  nLog("你没有按下提交")
end
--
nLog("账号", selects["账号"])
nLog("密码", selects["密码"])
nLog("性别", selects["性别"])
nLog("血量", selects["血量"])
--
if selects['你是变态？'] then
  nLog("你承认了自己是变态")
else
  nLog("你不承认自己是变态")
end
--
nLog("你喜欢游戏列表")
for _, gamename in ipairs(selects['喜欢的游戏']) do
  nLog(gamename)
end
--
nLog("你最喜欢游戏："..selects["最喜欢的游戏"])
--
sys.alert(print.out())
```

### 在不弹出对话框的情况下获得对话框配置 \(**dialog\:load**\)

#### 声明

```lua
是否提交, 选项关联表 = 对话框:load()
```

#### 参数及返回值

- 对话框 *对话框对象*
- 是否提交
  - *布尔型*，是否按下了提交按钮，这里总是返回 `false`
- 选项关联表
  - *关联表*，返回一个以 **标题** 映射的键值表

#### 说明

在不弹出对话框的情况下获得对话框配置，如果对话框当前没有保存配置，则加载默认值。

#### 示例

```lua title="dialog:load"
local dlg = dialog()
--
dlg:set_config('test')  -- 配置保存ID
dlg:set_timeout(30)
dlg:add_group('基本信息')
dlg:add_label('简易的效果展示')
dlg:add_range('血量', {0, 1000, 1}, 300)
dlg:add_input('账号', 'ccc')
dlg:add_input {
  label = '密码',
  default = 'aaaa',
  isSecure = true,
}
dlg:add_picker('性别', {'男', '女', '未知'}, '男')
dlg:add_switch('你是变态？', false)
dlg:add_checkbox('喜欢的游戏', {'守望先锋', '魔兽世界', '炉石传说'}, {'守望先锋', '魔兽世界'})
dlg:add_radio('最喜欢的游戏', {'守望先锋', '魔兽世界', '炉石传说'}, '魔兽世界')
--
local _, selects
--
if utils.is_launch_via_app() then -- 判断当前是否从 app 启动
  _, selects = dlg:show()           -- 从 app 启动的脚本则弹出配置窗
else
  _, selects = dlg:load()           -- 音量键或其它方式启动的脚本则不再弹出
end
--
nLog("账号", selects["账号"])
nLog("密码", selects["密码"])
nLog("性别", selects["性别"])
nLog("血量", selects["血量"])
--
if selects['你是变态？'] then
  nLog("你承认了自己是变态")
else
  nLog("你不承认自己是变态")
end
--
nLog("你喜欢游戏列表")
for _, gamename in ipairs(selects['喜欢的游戏']) do
  nLog(gamename)
end
--
nLog("你最喜欢游戏："..selects["最喜欢的游戏"])
--
sys.alert(print.out())
```

### 展示一个配置界面 (**dialog\.show**)

#### 声明

```lua
dialog.show(配置界面)
```

#### 参数及返回值

- 配置界面 *对话框对象*

#### 说明

此函数与 [`dialog:show`](#-将对话框弹出来并返回用户的选择-dialog) 不同，调用不会阻塞，没有返回值。

:::caution
调用此函数前，必须先调用 [`dialog.setup`](#校验一个配置界面-dialogsetup) 函数校验传入的 **配置界面**。
:::

#### 示例

```lua title="dialog.show"
local dlg = dialog("MyWorld")
  :add_group("New Group")
  :add_switch("Switch #1")
dialog.setup(dlg)  -- 校验配置界面
dialog.show(dlg)   -- 展示配置界面
```

### 收起正在展示的配置界面 (**dialog\.dismiss**)

#### 声明

```lua
dialog.dismiss()
```

#### 说明

不会阻塞，没有返回值。如果没有配置界面正在展示则什么都不会发生。

### 校验一个配置界面 (**dialog\.setup**)

#### 声明

```lua
dialog.setup(配置界面[, 是否保存配置])
```

#### 参数及返回值

- 配置界面 *对话框对象*
- 是否保存配置
  - *布尔型*，*可选*，是否根据 **配置界面** 中的控件校验并修正已存储的配置表。默认为 `false`

#### 示例

```lua title="dialog.setup"
local dlg = dialog("MyWorld")
  :add_group("New Group")
  :add_switch("Switch #2")
dialog.setup(dlg)  -- 校验配置界面
dialog.show(dlg)   -- 展示配置界面
```

### 重载正在展示的配置界面 (**dialog\.reload**)

#### 声明

```lua
dialog.reload([ 重载配置表 ])
```

#### 参数及返回值

- 重载配置表
  - *关联表*，*可选*，如果不传入此参数，则全部重载

```lua title="重载配置表结构"
{
  defaults = 配置分区,
  { key = 键, value = 值 },
  { key = 键, value = 值 },
  ...
}
```

#### 说明

如果当前没有正在展示配置界面，则什么都不会发生。

:::caution 性能
注意控制好这个函数的调用频率，频率太高会导致春板卡死。
:::

#### 示例：重载全部配置

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

#### 示例：重载部分配置

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

### 获取配置界面的配置值 (**dialog\.get**)

#### 声明

```lua
值 = dialog.get(配置分区, 键)
```

#### 参数及返回值

- 配置分区 **文本型**
- 键 *文本型*
- 值
  - *任意类型*，不同的控件会返回不同类型的 **值**。不存在则返回 `nil`

#### 说明

不负责确保 **值** 类型与控件类型一致。  
如果需要保证获取的值类型合法，可先使用 [`dialog.setup`](#校验一个配置界面-dialogsetup) 进行修正后读取。

#### 示例

```lua title="dialog.get"
local dlg = dialog("MyWorld")
  :add_group("New Group")
  :add_switch("Switch #2")
dialog.setup(dlg, true)  -- 校验并保存配置
local sw = dialog.get("MyWorld", "Switch #2")
sys.alert(stringify(sw))
```

### 设置配置界面上的某个控件的值 (**dialog\.set**)

#### 声明

```lua
dialog.set(配置分区, 键, 值)
```

#### 参数及返回值

- 配置分区 *文本型*
- 键 *文本型*
- 值
  - *任意类型*，不同的控件可以设置不同类型的 **值**

#### 说明

不负责确保 **值** 类型与控件类型一致。  
如果需要保证设置的值类型合法，可在设置后使用 [`dialog.setup`](#校验一个配置界面-dialogsetup) 进行修正。

:::info
如果当前正显示着配置界面，则 **不会** 立刻更新显示值。  
如果需要立刻更新配置界面上的显示的值，可使用 [`dialog.reload`](#重载正在展示的配置界面-dialogreload)。
:::

#### 示例

```lua title="dialog.set"
local dlg = dialog("MyWorld")
  :add_group("Concat Group")
  :add_multiple_picker("Picker #1", { "A", "BB", "CCC", "DDDD", "EEEEE" }, { "A", "BB" })
dialog.setup(dlg, true)  -- 校验并保存配置
dlg:show()
--
local selected = dialog.get("MyWorld", "Picker #1")
table.insert(selected, "EEEEE")
dialog.set("MyWorld", "Picker #1", selected)
dialog.setup(dlg, true)  -- 校验并保存配置
--
sys.alert(stringify(dialog.get("MyWorld", "Picker #1")))
```

### 读取某个配置分区所有配置 (**dialog\.read**)

#### 声明

```lua
配置表 = dialog.read(配置分区)
```

#### 参数及返回值

- 配置分区 *文本型*
- 配置表
  - *关联表*，这个 **配置分区** 所有配置的键值对，如果没有该配置分区，则返回空表 `{}`

#### 说明

优化读取多个配置，不负责确保配置表中的 **值** 类型与控件类型一致。  
如果需要保证获取的值类型合法，可先使用 [`dialog.setup`](#校验一个配置界面-dialogsetup) 进行修正后读取。

#### 示例

```lua title="dialog.read"
dialog.read("MyWorld")
```

### 覆盖写入配置表到某个配置分区 (**dialog\.write**)

#### 声明

```lua
操作成败 = dialog.write(配置分区, 配置表)
```

#### 参数及返回值

- 配置分区 *文本型*
- 配置表 *关联表*

#### 说明

优化写入多个配置，不负责确保配置表中的 **值** 类型与控件类型一致。  
如果需要保证设置的值类型合法，可在设置后使用 [`dialog.setup`](#校验一个配置界面-dialogsetup) 进行修正。

:::info
如果当前正显示着配置界面，则 **不会** 立刻更新显示值。  
如果需要立刻更新配置界面上的显示的值，可使用 [`dialog.reload`](#重载正在展示的配置界面-dialogreload)。
:::

#### 示例

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

### 清除某个配置分区所有的配置 (**dialog\.clear**)

#### 声明

```lua
操作成败 = dialog.clear(配置分区)
```

#### 参数及返回值

- 配置分区 *文本型*

#### 说明

清除后使用 [`dialog.setup`](#校验一个配置界面-dialogsetup) 以再次生成配置界面的默认配置。

:::info
如果当前正显示着配置界面，则 **不会** 立刻更新显示值。  
如果需要立刻更新配置界面上的显示的值，可使用 [`dialog.reload`](#重载正在展示的配置界面-dialogreload)。
:::

#### 示例

```lua title="dialog.clear"
dialog.clear("MyWorld")
```
