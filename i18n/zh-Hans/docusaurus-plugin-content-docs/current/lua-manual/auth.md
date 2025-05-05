---
sidebar_position: 32
---

# OTP 认证助手

## OTP 认证助手 - auth

:::info 引入
此模块不会自动引入，需要显式引入。

```lua
auth = require("xxtouch.auth")
```

:::

### 生成基于时间的一次性密码 \(**auth\.totp\_next**\)

#### 声明

```lua
一次性密码 = auth.totp_next(UNIX时间戳, 二维码URL[, 密钥])
```

#### 参数及返回值

- UNIX时间戳
  - *整数型*，可以通过 [`os.time`](https://cloudwu.github.io/lua53doc/manual.html#pdf-os.time) 或 [`sys.net_time`](./sys.md#获取网络时间-sysnet_time) 函数获取
- 二维码URL
  - *文本型*，以 `otpauth://totp/` 开头的 URL
- 密钥
  - *文本型*，*可选*，如果不指定则从 **二维码URL** 中解析
- 一次性密码 *文本型*

#### 说明

[RFC 6238](https://www.rfc-editor.org/rfc/rfc6238) 中定义的基于时间的一次性密码算法，用于生成基于时间的一次性密码。通常用于 Google Authenticator 等 App 的双因素认证场合。

:::tip
使用 [`screen.qr_decode`](./screen.md#-屏幕二维码识别-screenqr_decode) 或 [`image:qr_decode`](./img.md#图片二维码识别-image_decode) 函数可以识别屏幕或图片上的二维码，从而获取 **二维码URL**。
:::

#### 示例

```lua title="auth.totp_next"
--
-- 使用本地时间
local otp_code = auth.totp_next(os.time(), "otpauth://totp/L%C3%A9on?algorithm=SHA256&digits=8&period=45&secret=AAAQEAYEAUDAOCAJBIFQYDIOB4")
nLog(otp_code)
--
-- 使用网络时间
local net_otp_code = auth.totp_next(sys.net_time(), "otpauth://totp/L%C3%A9on?algorithm=SHA256&digits=8&period=45&secret=AAAQEAYEAUDAOCAJBIFQYDIOB4")
nLog(net_otp_code)
```

### 生成基于 HMAC 的一次性密码 \(**auth\.hotp\_next/auth\.hotp\_counter**\)

#### 声明

```lua
一次性密码 = auth.hotp_next(二维码URL[, 密钥])
一次性密码 = auth.hotp_counter(计数器, 二维码URL[, 密钥])
```

#### 参数及返回值

- 计数器 *整数型*
- 二维码URL
  - *文本型*，以 `otpauth://hotp/` 开头的 URL
- 密钥
  - *文本型*，*可选*，如果不指定则从 **二维码URL** 中解析
- 一次性密码 *文本型*

#### 说明

[RFC 4226](https://www.rfc-editor.org/rfc/rfc4226) 中定义的基于 HMAC 的一次性密码算法。不如 [`auth.totp_next`](#生成基于时间的一次性密码-authtotp_next) 那么常用。

:::info
`auth.hotp_next` 内部维护了一个初始值为 0 的计数器，每次调用会自增 1，然后调用 `auth.hotp_counter` 函数。
:::
