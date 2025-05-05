---
sidebar_position: 19
---

# 清理模块

## 清理模块 - clear

:::caution 弃用
本模块中的函数调用耗时可能较长，阻塞所有协程且不支持中断。推荐使用其他第三方工具的清理功能来代替。
:::

### 清理某个或某组钥匙串信息 \(**clear\.keychain**\)

#### 声明

```lua
操作成败 = clear.keychain(反向域名)
```

#### 参数及返回值

- 反向域名
  - *文本型*，通常可传入 App 开发商的反向域名（[Reverse Domain](https://en.wikipedia.org/wiki/Reverse_domain_name_notation)），例如 `"com.cardify"`，切勿乱传参数
- 操作成败 *布尔型*

#### 说明

清理某个 App 或 App 分组的钥匙串信息，若不懂请直接用 [`clear.all_keychain`](#清理所有-app-的钥匙串信息-clearall_keychain)。

#### 示例

```lua title="clear.keychain"
clear.keychain("com.cardify")  -- 清理掉与 com.cardify 相关的钥匙串信息
```

### 清理所有 App 的钥匙串信息 \(**clear\.all\_keychain**\)

#### 声明

```lua
操作成败 = clear.all_keychain()
```

#### 参数及返回值

- 操作成败 *布尔型*

:::caution
调用后所有第三方 App 的钥匙串信息都会被清除。
:::

### 撤销某个 App 的隐私权限 \(**clear\.privileges**\)

#### 声明

```lua
操作成败 = clear.privileges(标识符)
```

#### 参数及返回值

- 标识符
  - *文本型*，[App 标识符](./app.md#标识符)
- 操作成败 *布尔型*

#### 说明

撤销 **设置** \-\> **隐私与安全性** 中某个 App 的各类隐私权限。App 重新启动后，将无法再访问相关数据，可能会弹出提示框询问用户是否允许访问。

### 撤销所有 App 的隐私权限 \(**clear\.all\_privileges**\)

#### 声明

```lua
操作成败 = clear.all_privileges()
```

#### 参数及返回值

- 操作成败 *布尔型*

:::caution
调用后所有 App（包括系统 App）的各类隐私权限都会被撤销。
:::

### 清理剪贴板 \(**clear\.pasteboard**\)

#### 声明

```lua
clear.pasteboard()
```

#### 说明

部分追踪信息可能会存在剪贴板中。

:::caution 限制
可能需要重启 App 才能继续使用剪贴板服务。
:::

### 清理浏览器 Cookies \(**clear\.cookies**\)

#### 声明

```lua
clear.cookies()
```

#### 说明

部分追踪信息可能会存在浏览器 Cookies 中，仅对 Safari 生效。

### 清理系统缓存 \(**clear\.caches**\)

#### 声明

```lua
操作成败 = clear.caches()
```

#### 参数及返回值

- 操作成败 *布尔型*

:::note
此函数调用将强行重启服务 `configd` 和 `cfprefsd`。
:::

#### 示例

```lua title="clear.caches"
clear.caches()
--
clear.caches { uicache = true }  -- 同时重建图标缓存
```

### 清除相册中所有本地照片 \(**clear\.all\_photos**\)

#### 声明

```lua
clear.all_photos()
```

#### 说明

清除相册中所有本地照片，不会影响 iCloud 照片流，清理期间所有线程都阻塞。

:::caution 性能
耗时可能会非常长。
:::

### 清理某个 App 的存档数据 \(**clear\.app\_data**\)

#### 声明

```lua
操作成败 = clear.app_data(标识符)
```

#### 参数及返回值

- 标识符
  - *文本型*，[App 标识符](./app.md#标识符)
- 操作成败 *布尔型*

#### 说明

清理 App 存档，清理期间所有线程都阻塞。

:::caution 性能
耗时可能会非常长。
:::

#### 示例

```lua title="clear.app_data"
clear.app_data("com.cardify.tinder")
```

### 清理 IDFA/V \(**clear\.idfav**\)

#### 声明

```lua
操作成败, 旧IDFAV表 = clear.idfav(新IDFA[, 新IDFAV表])
```

#### 参数及返回值

- 新IDFA
  - *文本型*，[RFC 4122](https://www.ietf.org/rfc/rfc4122.txt) 形式的 IDFA 文本
- 新IDFAV表
  - *关联表*，*可选*，传入新的 IDFA/V 信息，若不传入则使用 **新IDFA**
- 操作成败 *布尔型*
- 旧IDFAV表
  - *关联表*，返回 **原先** 的 IDFA/V 信息。操作失败则返回 `nil`

#### 说明

重置系统 IDFA 和 IDFV 等标识信息，即 **IDFA/V表**。

:::info
传入的 **新IDFA** 为 `"READ"` 时只进行读取，不进行清理和修改。
:::

:::note
你不必关心 **IDFA/V表** 的具体格式。只需要将原先调用的返回值 **旧IDFAV表** 传入此次调用的参数 **新IDFAV表** 即可恢复系统的 IDFA 和 IDFV 等标识信息到原先的状态。  
**IDFA/V表** 可以被 [`plist`](./plist.md) 模块安全序列化。
:::

#### 示例 1

```lua title="clear.idfav.read"
ok, tab = clear.idfav("READ")
--
sys.alert(ok and tab.LSAdvertiserIdentifier or "读取失败")
```

#### 示例 2

```lua title="clear.idfav.reset"
-- 读取原先的 IDFA/V 表并备份
ok, tab1 = clear.idfav("READ")
if ok then
  plist.write("lsd.plist", tab1)
  sys.alert(ok and "备份成功" or "备份失败")
end
--
-- 清理 IDFA/V 表
ok, tab2 = clear.idfav("00000000-0000-0000-0000-000000000000")
assert(tab1.LSAdvertiserIdentifier == tab2.LSAdvertiserIdentifier)
--
-- 读取备份的 IDFA/V 表并恢复
oldtab = plist.read("lsd.plist")
if oldtab then
  ok, tab3 = clear.idfav(oldtab.LSAdvertiserIdentifier, oldtab)
  sys.alert(ok and "恢复成功" or "恢复失败")
end
```

### 清理地理位置缓存 \(**clear\.location\_caches**\)

#### 声明

```lua
操作成败 = clear.location_caches()
```

#### 参数及返回值

- 操作成败 *布尔型*

:::note
此函数调用将强行重启服务 `locationd`。
:::

### 清理推送通知缓存 \(**clear\.push\_notifications**\)

#### 声明

```lua
操作成败 = clear.push_notifications(标识符)
```

#### 参数及返回值

- 标识符
  - *文本型*，[App 标识符](./app.md#标识符)
- 操作成败 *布尔型*

:::info
**标识符** 传入 `"*"` 表示退出所有运行中的 App。
:::

:::note
此函数调用将强行重启服务 `apsd`。
:::

### 清除 Safari 历史记录和网站数据 \(**clear\.safari**\)

#### 声明

```lua
操作成败 = clear.safari()
```

#### 参数及返回值

- 操作成败 *布尔型*

:::info

- 此函数调用不会清除 **Safari** 中的书签。
- 此函数调用效果等同于在 **设置** \-\> **Safari** 中选择 **清除历史记录和网站数据**。

:::
