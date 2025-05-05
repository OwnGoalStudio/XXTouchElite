---
sidebar_position: 32
---

# OTP Authentication Assistant

## OTP Authentication Assistant - auth

:::info Import
This module is not automatically imported and needs to be explicitly required.

```lua
auth = require("xxtouch.auth")
```

:::

### Generate Time-Based One-Time Password \(**auth\.totp\_next**\)

#### Declaration

```lua
otp = auth.totp_next(UNIX_timestamp, QR_code_URL[, secret_key])
```

#### Parameters and Return Values

- UNIX_timestamp
  - *integer*, can be obtained using the [`os.time`](https://cloudwu.github.io/lua53doc/manual.html#pdf-os.time) or [`sys.net_time`](./sys.md#get-network-time-sysnet_time) functions.
- QR_code_URL
  - *string*, a URL starting with `otpauth://totp/`.
- secret_key
  - *string*, *optional*, if not specified, it will be parsed from the **QR_code_URL**.
- otp *string*

#### Description

The time-based one-time password algorithm defined in [RFC 6238](https://www.rfc-editor.org/rfc/rfc6238) is used to generate time-based one-time passwords. It is commonly used in two-factor authentication scenarios such as Google Authenticator.

:::tip
Use the [`screen.qr_decode`](./screen.md#-screen-qr-code-recognition-screenqr_decode) or [`image:qr_decode`](./img.md#qr-code-recognition-in-an-image-imageqr_decode) functions to recognize QR codes on the screen or in images to obtain the **QR_code_URL**.
:::

#### Example

```lua title="auth.totp_next"
--
-- Using local time
local otp_code = auth.totp_next(os.time(), "otpauth://totp/L%C3%A9on?algorithm=SHA256&digits=8&period=45&secret=AAAQEAYEAUDAOCAJBIFQYDIOB4")
--
-- Using network time
local net_otp_code = auth.totp_next(sys.net_time(), "otpauth://totp/L%C3%A9on?algorithm=SHA256&digits=8&period=45&secret=AAAQEAYEAUDAOCAJBIFQYDIOB4")
nLog(net_otp_code)
```

### Generate HMAC-Based One-Time Password \(**auth\.hotp\_next/auth\.hotp\_counter**\)

#### Declaration

```lua
otp = auth.hotp_next(QR_code_URL[, secret_key])
otp = auth.hotp_counter(counter, QR_code_URL[, secret_key])
```

#### Parameters and Return Values

- counter *integer*
- QR_code_URL
  - *string*, a URL starting with `otpauth://hotp/`.
- secret_key
  - *string*, *optional*, if not specified, it will be parsed from the **QR_code_URL**.
- otp *string*

#### Description

The HMAC-based one-time password algorithm defined in [RFC 4226](https://www.rfc-editor.org/rfc/rfc4226) is less commonly used than [`auth.totp_next`](#generate-time-based-one-time-password-authtotp_next).

:::info
`auth.hotp_next` internally maintains a counter initialized to 0. Each call increments the counter by 1 and then calls the `auth.hotp_counter` function.
:::
