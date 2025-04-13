---
sidebar_position: 20
---

# Thread Module

## Thread Module - thread

The thread module uses Lua’s built-in coroutine [`coroutine`](https://cloudwu.github.io/lua53doc/manual.html#2.6) for implementation, which is not the same as traditional multithreading.
In XXTouch Elite, the thread module is **disabled by default**. To enable this module, wrap the code block as follows:

```lua
require("thread")(function ()
  -- Code block
end)
```

:::note Functions or modules that support **yielding**

- [`sys.sleep`](sys.md#-second-level-delay-syssleep) and [`sys.msleep`](sys.md#-millisecond-level-delay-sysmsleep)
- [`touch:msleep`](touch.md#-millisecond-level-delay-touchmsleep)
- [HTTP Module](http.md)
- [FTP Module](ftp.md)

:::

### Dispatch a Task \(**thread\.dispatch**\)

#### Declaration

```lua
task_id = thread.dispatch(task_function[, error_callback])
```

#### Parameters and Return Values

- task_function
  - *function*, will be added to the task queue
- error_callback
  - *function*, *optional*, if an exception occurs while executing the **task_function**, this function will be called instead of throwing the error. By default, errors are thrown on exceptions
- task_id
  - *integer*, record this value for subsequent termination or waiting for the **task**

#### Description

Dispatch a **task** to the RunLoop queue. The task will start when other tasks are idle.

### Get the Current Task ID \(**thread\.current\_id**\)

#### Declaration

```lua
task_id = thread.current_id()
```

#### Parameters and Return Values

- task_id
  - *integer*, record this value for subsequent termination or waiting for the **task**

### Remove a Task from the Queue \(**thread\.kill**\)

#### Declaration

```lua
thread.kill(task_id)
```

#### Parameters and Return Values

- task_id
  - *integer*, the **task_id** returned when the task was previously dispatched

#### Description

Remove a task from the RunLoop queue, regardless of whether it has started or completed.

### Block and Wait for a Task to Complete \(**thread\.wait**\)

#### Declaration

```lua
thread.wait(task_id, timeout_seconds)
```

#### Parameters and Return Values

- timeout_seconds
  - *Real number type*, the timeout period to wait, after which it will return. Unit: seconds
- task_id
  - *integer*, the **task_id** returned when the task was previously dispatched

#### Description

Block the current thread to wait for at least one task to complete.

### Register an Event Listener \(**thread\.register\_event**\)

#### Declaration

```lua
event_listener_id = thread.register_event(event_name, event_callback[, error_callback])
```

#### Parameters and Return Values

- event_name
  - *text*, see [Available Event Names](#available-event-names)
- event_callback
  - *function*, the callback function that will be triggered when the event occurs
- error_callback
  - *function*, *optional*, if an exception occurs while executing the **event_callback**, this function will be called instead of throwing the error. By default, errors are thrown on exceptions
- event_listener_id
  - *integer*, record this value for subsequent unregistration of the event listener

### Unregister an Event Listener \(**thread\.unregister\_event**\)

#### Declaration

```lua
event_listener_id = thread.unregister_event(event_name, event_listener_id)
```

#### Parameters and Return Values

- event_name
  - *text*, see [Available Event Names](#available-event-names)
- event_listener_id
  - *integer*, the **event_listener_id** returned when the event listener was previously registered

## Example Code

```lua title="thread.runloop"
require("thread")(function ()
  tmid = thread.dispatch(function ()  -- Dispatch an asynchronous task
    sys.msleep(2700)
    sys.toast("This is the 2.7th second")
  end)
  --
  tid = thread.dispatch(function ()   -- Dispatch an asynchronous task
    sys.msleep(300)
    for i=1,10 do
      sys.toast("Thread " .. thread.current_id() .. ": "..i)
      sys.msleep(1000)
    end
    sys.toast("Should not reach here")
  end)
  --
  -- iPhone 5C pinch to zoom out photo example
  --
  thread.dispatch(function ()         -- Dispatch a swipe task
    touch.on(59,165)
      :move(297,522)
      :msleep(500)
      :off()
  end)
  --
  thread.dispatch(function ()         -- Dispatch another swipe task
    touch.on(580,1049)
      :move(371,1049)
      :msleep(500)
      :off()
  end)
  --
  proc.queue_clear("message_from_afar")
  eid = thread.register_event(        -- Register a dictionary state value event listener
    "message_from_afar",
    function (val)
      sys.toast("Received message："..val)
    end
  )
  --
  sys.msleep(300)
  thread.wait(tmid)
  --
  for i=1,10 do
    sys.toast("Thread " .. thread.current_id() .. ": "..i)
    sys.msleep(400)
  end
  --
  thread.kill(tid)  -- Kill thread 2
  thread.unregister_event("message_from_afar", eid)  -- Unregister a dictionary state value event
  --
  sys.toast("Done")
end)
```

## Available Event Names

This section lists the event names that can be used with [`thread.register_event`](#register-an-event-listener-threadregister_event) and [`thread.unregister_event`](#unregister-an-event-listener-threadunregister_event).

### Incoming and Outgoing Calls \(**xxtouch\.callback\.call**\)

#### Declaration

```lua
thread.register_event("xxtouch.callback.call", function (val)
  if val == "in" then
    -- Incoming call
  elseif val == "out" then
    -- Outgoing call
  elseif val == "disconnected" then
    -- Call disconnected
  end
end)
```

#### Example

```lua title="xxtouch.callback.call"
require("thread")(function ()
  --
  -- Clear the message queue
  proc.queue_clear("xxtouch.callback.call")
  --
  sys.toast("The script will start listening for incoming call events, and will stop listening after twenty seconds")
  --
  -- Start setting up the event listener
  local eid = thread.register_event("xxtouch.callback.call", function(val)
    if val == "in" then
      sys.toast("Incoming call")
    elseif val == "out" then
      sys.toast("Making an outgoing call")
    elseif val == "disconnected" then
      sys.toast("Call disconnected")
    end
  end)
  --
  sys.sleep(20)  -- Wait for 20 seconds
  --
  -- Unregister the event listener, if not unregistered, the script will not end here
  thread.unregister_event("xxtouch.callback.call", eid)
end)
```

### Activator Events \(**xxtouch\.callback\.activator**\)

#### Declaration

```lua
thread.register_event("xxtouch.callback.activator", function (val)
  local ret = json.decode(val)
  sys.toast("mode: " .. ret.mode .. "\n"  -- Event type
        ..  "name: " .. ret.name .. "\n"  -- Event name
        ..  "time: " .. ret.time)         -- Event time
end)
```

#### Description

  1. Install [Activator](http://cydia.saurik.com/package/libactivator/)
  2. Log out and enter Activator from the home screen
  3. Assign the "Script Event Callback" trigger to one or more events
  4. Register the `xxtouch.callback.activator` event listener in the script
  5. Manually trigger the above events
  6. Handle the event callback messages in the script

#### Example

```lua title="xxtouch.callback.activator"
require("thread")(function ()
  --
  -- Clear the message queue
  proc.queue_clear("xxtouch.callback.activator")
  --
  -- Start setting up the event listener
  local eid = thread.register_event("xxtouch.callback.activator", function(val)
    local ret = json.decode(val)
    if ret.event == "libactivator.statusbar.tap.double" then
        sys.toast("Double-tap status bar callback")
    end
  end)
  --
  sys.sleep(20)  -- Wait for 20 seconds
  --
  -- Unregister the event listener, if not unregistered, the script will not end here
  thread.unregister_event("xxtouch.callback.activator", eid)
end)
```

### HID Events \(**xxtouch\.callback\.hid**\)

#### Declaration

```lua
thread.register_event("xxtouch.callback.hid", function (val)
  local event = json.decode(val)
  if event.event_type == "touch" then
    if event.event_name == "touch.on" then
      sys.toast("Touch contact position: (" .. event.x .. ", " .. event.y .. ")\n" .. event.time)
    elseif event.event_name == "touch.move" then
      sys.toast("Touch moved to position: (" .. event.x .. ", " .. event.y .. ")\n" .. event.time)
    elseif event.event_name == "touch.off" then
      sys.toast("Touch left position: (" .. event.x .. ", " .. event.y .. ") screen\n" .. event.time)
    end
  else
    if event.event_name == "key.down" then
      sys.toast("Key pressed: " .. event.key_name .. "\n" .. event.time)
    elseif event.event_name == "key.up" then
      sys.toast("Key released: " .. event.key_name .. "\n" .. event.time)
    end
  end
end)
```

:::info
The coordinates in this event use the **portrait mode with HOME at the bottom** as the initial coordinate system.
You can use [`screen.rotate_xy`](screen.mdx#coordinate-rotation-conversion-screenrotate_xy) for conversion.
:::

#### Example

```lua title="xxtouch.callback.hid"
require("thread")(function ()
  --
  -- Clear the message queue
  proc.queue_clear("xxtouch.callback.hid")
  --
  -- Set up the event listener
  local eid = thread.register_event("xxtouch.callback.hid", function (val)
    local event = json.decode(val)
    if event.event_type == "touch" then
      if event.event_name == "touch.on" then
        sys.toast("Touch contact position: (" .. event.x .. ", " .. event.y .. ")\n" .. event.time)
      elseif event.event_name == "touch.move" then
        sys.toast("Touch moved to position: (" .. event.x .. ", " .. event.y .. ")\n" .. event.time)
      elseif event.event_name == "touch.off" then
        sys.toast("Touch left position: (" .. event.x .. ", " .. event.y .. ") screen\n"..event.time)
      end
    else
      if event.event_name == "key.down" then
        sys.toast("Key pressed: " .. event.key_name .. "\n" .. event.time)
      elseif event.event_name == "key.up" then
        sys.toast("Key released: " .. event.key_name .. "\n" .. event.time)
      end
    end
  end)
  --
  touch.on(100, 100):off()
  sys.msleep(1000)
  key.press('HOMEBUTTON')
  --
  sys.sleep(20)  -- Wait for 20 seconds
  --
  -- Unregister the event listener, if not unregistered, the script will not end here
  thread.unregister_event("xxtouch.callback.hid", eid)
end)
```
