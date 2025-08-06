---
sidebar_position: 6
---

# 模拟按键模块

## 模拟按键模块 - key

标有 🚥 的函数在 [**线程模块**](./thread.md) 中会发生 **让出**。在这些函数调用返回之前，其他的 **线程** 可能会得到运行机会。

### 🚥 模拟按一下物理按键 \(**key\.press**\)

#### 声明

```lua
key.press(按键码)
```

#### 参数及返回值

- 按键码
  - *文本型*，物理按键的[按键码](./appendix/supported-keycodes.md)

#### 说明

模拟按下物理按键然后松开它。

### 模拟按下物理按键 \(**key\.down**\)

#### 声明

```lua
key.down(按键码)
```

#### 参数及返回值

- 按键码
  - *文本型*，物理按键的[按键码](./appendix/supported-keycodes.md)

#### 说明

模拟按下物理按键。

:::caution
这个函数应当有对应的 [`key.up`](#松开按下的物理按键-keyup) 调用，否则在脚本终止之后，会发生按键一直不释放的问题。
:::

### 松开按下的物理按键 \(**key\.up**\)

#### 声明

```lua
key.up(按键码)
```

#### 参数及返回值

- 按键码
  - *文本型*，物理按键的[按键码](./appendix/supported-keycodes.md)

#### 说明

模拟松开按下物理按键。

### 🚥 模拟键入文本 \(**key\.send\_text**\)

#### 声明

```lua
key.send_text(文本[, 每键延迟])
```

#### 参数及返回值

- 文本
  - *文本型*，待输入的文字，只能是英文数字和半角字符还有 `"\b"` `"\r"` `"\t"`
- 每键延迟
  - *整数型*，*可选*，输入每次按键延迟，默认没有延迟以设备性能极限输入

#### 说明

将传入的 **文本** 拆分为单个字符，然后模拟按下对应的物理按键，最后松开。

#### 示例

```lua
key.send_text("AbC12#")  -- 尽可能快的键入文本
--
key.send_text("AbC12#", 300)  -- 每键入一次延迟 0.3 秒
```

## 示例代码

### 模拟按 HOME 键

```lua title="key.press"
key.press("HOMEBUTTON")
```

### 模拟长按 HOME 键

```lua title="key.press"
key.down("HOMEBUTTON") -- 按下 HOME 键
sys.msleep(1000) -- 等待 1 秒
key.up("HOMEBUTTON") -- 松开 HOME 键
```

### 模拟双击 HOME 键

```lua title="key.press"
key.press("HOMEBUTTON")
key.press("HOMEBUTTON")
```

### 模拟按锁屏键（电源键）

```lua title="key.press"
key.press("LOCK")
```

### 模拟按回车键

```lua title="key.press"
key.press("RETURN")
```

### 其他模拟

```lua title="key.press"
-- 下面这个例子是模拟组合键 [command + v] 粘贴剪贴板的文本（不是 windows 上的 control + v）
key.down("LEFTCOMMAND") -- 按下 command 键
sys.msleep(20) -- 等待 20 毫秒
key.press("V") -- 按一下 v 键
sys.msleep(20) -- 等待 20 毫秒
key.up("LEFTCOMMAND") -- 松开 command 键
--
key.press("VOLUMEUP") -- 按一下音量 + 键
key.press("VOLUMEDOWN") -- 按一下音量 - 键
--
key.down("VOLUMEUP") -- 按下音量 + 键
sys.msleep(1000) -- 等待 1 秒
key.up("VOLUMEUP") -- 松开音量 + 键
--
key.down("LOCK") -- 按下锁屏键（电源键）
sys.msleep(3000) -- 等待 3 秒
key.up("LOCK") -- 松开锁屏键（电源键）
--
key.press("SHOW_HIDE_KEYBOARD") -- 按一下[隐藏/显示键盘键]隐藏虚拟键盘
--
key.press("SHOW_HIDE_KEYBOARD") -- 再按一下[隐藏/显示键盘键]显示虚拟键盘
--
-- 下面这个例子是模拟组合键 [锁屏键 + HOME键] 实现截屏到相册
key.down("LOCK") -- 按下锁屏键（电源键）
sys.msleep(100) -- 等待 100 毫秒
key.press("HOMEBUTTON") -- 按一下 HOME 键
sys.msleep(100) -- 等待 100 毫秒
key.up("LOCK") -- 松开锁屏键（电源键）
--
-- 切换输入法的组合键
key.down("LEFTCONTROL")
sys.msleep(50)
key.press("SPACE")
sys.msleep(50)
key.up("LEFTCONTROL")
```
