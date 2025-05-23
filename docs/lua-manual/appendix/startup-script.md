---
sidebar_position: 7
---

# Startup Script

Unlike the “currently selected script”, the selected “startup script” will automatically start after the device boots up.

## Select and Disable the Startup Script

### Select via the App

The startup script can be selected through **X.X.T.E. Application** → **More** → **Startup Script**.

### Select via OpenAPI

Use the following OpenAPI interfaces to retrieve or modify the startup settings:

* [Enable Startup Script](https://elite.82flex.com/api-283425310)
* [Disable Startup Script](https://elite.82flex.com/api-283425311)
* [Select Startup Script](https://elite.82flex.com/api-283425313)
* [Retrieve Startup Settings](https://elite.82flex.com/api-283425312)

## Timing of Startup Execution

The startup script will only run after the home screen is fully ready, which typically involves a slight delay after booting. Common scenarios where the startup script does not execute include:

* Unable to access the home screen, such as when a lock screen password is set.
* Booting into safe mode.
