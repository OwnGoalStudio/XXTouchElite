---
sidebar_position: 21
---

# 小工具模块

## 小工具模块 - utils

### 给通讯录添加一个或多个联系人 \(**utils\.add\_contacts**\)

#### 声明

```lua
操作成败 = utils.add_contacts({
  {
    firstName = "姓1",
    lastName = "名1",
    phoneNumbers = {
      "联系人1号码1",
      "联系人1号码2",
    },
    emails = {
      "联系人1邮箱1",
      "联系人1邮箱2",
    },
  },
  {
    firstName = "姓2",
    lastName = "名2",
    phoneNumbers = {
      "联系人2号码1",
      "联系人2号码2",
    },
    emails = {
      "联系人2邮箱1",
      "联系人2邮箱2",
    },
  },
  ...
})
```

#### 参数及返回值

- `firstName`
  - *文本型*，联系人姓
- `lastName`
  - *文本型*，联系人名
- `phoneNumbers`
  - *文本型顺序表*，这个人的号码列表
- `emails`
  - *文本型顺序表*，这个人的邮箱号列表
- 操作成败 *布尔型*

#### 示例

```lua title="utils.add_contacts"
utils.add_contacts({
  {
    firstName = "小",
    lastName = "明",
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
    firstName = "小",
    lastName = "红",
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

### 删除通讯录所有联系人 \(**utils\.remove\_all\_contacts**\)

#### 声明

```lua
操作成败 = utils.remove_all_contacts()
```

#### 参数及返回值

- 操作成败 *布尔型*

### 获得当前脚本的启动参数 \(**utils\.launch\_args**\)

#### 声明

```lua
启动参数关联表 = utils.launch_args()
```

#### 参数及返回值

- 启动参数关联表
  - *关联表*，返回一个用于描述当次启动的参数表

```lua title="启动参数关联表结构"
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
  - *文本型*，启动脚本的路径
- `type`
  - *文本型*，启动方式
    - 未知方式 `unknown`
    - OpenAPI `openapi`
    - X.X.T. 应用程序 `application`
    - 计划任务 [`os.restart`](./appendix/process-scheduling.md#重启脚本-osrestart) `scheduler`
    - 终端 `terminal`
    - 音量键 `volume`
    - 开机启动 `startup`
    - 旧版 IDE `touchsprite`
    - Visual Studio Code 插件 `touchelf`
    - 守护模式 `daemon`
    - Activator `activator`
- `event`
  - *关联表*，启动脚本的 [Activator](http://cydia.saurik.com/package/libactivator/) 事件，如果不是通过 Activator 启动的，这个字段为 `nil`

#### 示例 1

```lua title="utils.launch_args"
sys.alert(table.deep_print(utils.launch_args()))
```

#### 示例 2

```lua title="utils.launch_args"
-- 获取当前脚本文件路径（注：不是任何情况下脚本都有一个文件路径）
sys.alert("当前的脚本路径是："..tostring(utils.launch_args().path))
```

### 判断当前脚本是否从 App 内启动 \(**utils\.is\_launch\_via\_app**\)

#### 声明

```lua
是否从App内启动 = utils.is_launch_via_app()
```

#### 参数及返回值

- 是否从App内启动 *布尔型*
