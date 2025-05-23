---
authors: lessica
tags: [lsqlite3, sqlite, lua]
---

# LuaSQLite3 例程

LuaSQLite3 是一个 Lua 的 SQLite3 数据库绑定库，提供了访问 SQLite 数据库的接口。

<!-- truncate -->

## 读取短信数据库

```lua title="lsqlite3-example.lua" showLineNumbers
local sqlite3 = require('sqlite3')
--
local db = sqlite3.open('/private/var/mobile/Library/SMS/sms.db')
--
local handle_map = {}
local messages = {}
--
db:exec('select handle_id, text, date from message', function (ud, ncols, values, names)
    messages[#messages + 1] = {
        handle_id = values[1],
        text = values[2],
        date = os.date("%Y-%m-%d %H:%M:%S", os.time({year = 2001, month = 1, day = 1}) + tonumber(values[3]))
    }
    return sqlite3.OK
end)
--
db:exec('select ROWID, id from handle', function (ud, ncols, values, names)
    handle_map[values[1]] = values[2]
    return sqlite3.OK
end)
--
for _,v in ipairs(messages) do
    v.id = handle_map[v.handle_id]
    v.handle_id = nil
end
--
local results = {}
for _,v in ipairs(messages) do
    results[#results + 1] = string.format("[%s](%s):%s", v.date, v.id, v.text)
end
--
sys.toast(table.concat(results, '\n'))
```
