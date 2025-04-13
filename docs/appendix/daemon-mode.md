---
sidebar_position: 6
---

# Daemon Mode

Daemon mode ensures that scripts can restart automatically when the device returns to a normal state after being interrupted by external factors (e.g., service crashes, power outages). Exceptions include the following situations:

* The device is out of power and not recharged.
* The device cannot boot.
* The device loses its jailbroken state after rebooting.
* The device is in safe mode.
* The device has a lock screen password and is rebooted.
* The user manually terminates the script.
* The script process terminates due to runtime errors.

## Enable and Disable Daemon Mode

### Enable via App

Open **X.X.T.E. Application** → **More** → **User Defaults** → **Daemon Config** → **Daemon Mode** to enable or disable daemon mode.

### Enable via OpenAPI

Use the OpenAPI interface [**Set User Preferences**](https://elite.82flex.com/api-283425315) with the `script_on_daemon` field to enable or disable daemon mode.

## Notes

Daemon mode starts before the boot-up script. Therefore, after a device restarts due to a failure, you can add the following code at the beginning of the script to ensure that the screen is unlocked when the script starts:

```lua
while (device.is_screen_locked()) do
  device.unlock_screen()
  sys.msleep(1000)
end
sys.toast("Screen unlocked, script starting")
-- You can start the script below
-- …
```
