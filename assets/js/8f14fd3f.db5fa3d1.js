"use strict";(self.webpackChunkxxtouch_lite=self.webpackChunkxxtouch_lite||[]).push([[4291],{7189:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>d,contentTitle:()=>t,default:()=>h,frontMatter:()=>r,metadata:()=>l,toc:()=>o});const l=JSON.parse('{"id":"lua-manual/key","title":"Simulated Key Module","description":"Simulated Key Module - key","source":"@site/docs/lua-manual/key.md","sourceDirName":"lua-manual","slug":"/lua-manual/key","permalink":"/docs/lua-manual/key","draft":false,"unlisted":false,"editUrl":"https://github.com/OwnGoalStudio/XXTouchElite/tree/main/docs/lua-manual/key.md","tags":[],"version":"current","sidebarPosition":6,"frontMatter":{"sidebar_position":6},"sidebar":"luaManualSidebar","previous":{"title":"Image Module","permalink":"/docs/lua-manual/img"},"next":{"title":"Simulated Touch Module","permalink":"/docs/lua-manual/touch"}}');var i=s(4848),a=s(8453);const r={sidebar_position:6},t="Simulated Key Module",d={},o=[{value:"Simulated Key Module - key",id:"simulated-key-module---key",level:2},{value:"Simulate Pressing a Physical Key (<strong>key.press</strong>)",id:"simulate-pressing-a-physical-key-keypress",level:3},{value:"Declaration",id:"declaration",level:4},{value:"Parameters and Return Values",id:"parameters-and-return-values",level:4},{value:"Description",id:"description",level:4},{value:"Simulate Holding Down a Physical Key (<strong>key.down</strong>)",id:"simulate-holding-down-a-physical-key-keydown",level:3},{value:"Declaration",id:"declaration-1",level:4},{value:"Parameters and Return Values",id:"parameters-and-return-values-1",level:4},{value:"Description",id:"description-1",level:4},{value:"Release a Pressed Physical Key (<strong>key.up</strong>)",id:"release-a-pressed-physical-key-keyup",level:3},{value:"Declaration",id:"declaration-2",level:4},{value:"Parameters and Return Values",id:"parameters-and-return-values-2",level:4},{value:"Description",id:"description-2",level:4},{value:"Simulate Typing Text (<strong>key.send_text</strong>)",id:"simulate-typing-text-keysend_text",level:3},{value:"Declaration",id:"declaration-3",level:4},{value:"Parameters and Return Values",id:"parameters-and-return-values-3",level:4},{value:"Description",id:"description-3",level:4},{value:"Example",id:"example",level:4},{value:"Example Code",id:"example-code",level:2},{value:"Simulate Pressing the HOME Key",id:"simulate-pressing-the-home-key",level:3},{value:"Simulate Holding Down the HOME Key",id:"simulate-holding-down-the-home-key",level:3},{value:"Simulate Double-Clicking the HOME Key",id:"simulate-double-clicking-the-home-key",level:3},{value:"Simulate Pressing the Lock Key (Power Key)",id:"simulate-pressing-the-lock-key-power-key",level:3},{value:"Simulate Pressing the Enter Key",id:"simulate-pressing-the-enter-key",level:3},{value:"Other Simulations",id:"other-simulations",level:3}];function c(e){const n={a:"a",admonition:"admonition",code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",h4:"h4",header:"header",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,a.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.header,{children:(0,i.jsx)(n.h1,{id:"simulated-key-module",children:"Simulated Key Module"})}),"\n",(0,i.jsx)(n.h2,{id:"simulated-key-module---key",children:"Simulated Key Module - key"}),"\n",(0,i.jsxs)(n.h3,{id:"simulate-pressing-a-physical-key-keypress",children:["Simulate Pressing a Physical Key (",(0,i.jsx)(n.strong,{children:"key.press"}),")"]}),"\n",(0,i.jsx)(n.h4,{id:"declaration",children:"Declaration"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-lua",children:"key.press(key_code)\n"})}),"\n",(0,i.jsx)(n.h4,{id:"parameters-and-return-values",children:"Parameters and Return Values"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["key_code","\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.em,{children:"string"}),", the ",(0,i.jsx)(n.a,{href:"/docs/appendix/supported-keycodes",children:"key code"})," of the physical key"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.h4,{id:"description",children:"Description"}),"\n",(0,i.jsx)(n.p,{children:"Simulates pressing and then releasing a physical key."}),"\n",(0,i.jsxs)(n.h3,{id:"simulate-holding-down-a-physical-key-keydown",children:["Simulate Holding Down a Physical Key (",(0,i.jsx)(n.strong,{children:"key.down"}),")"]}),"\n",(0,i.jsx)(n.h4,{id:"declaration-1",children:"Declaration"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-lua",children:"key.down(key_code)\n"})}),"\n",(0,i.jsx)(n.h4,{id:"parameters-and-return-values-1",children:"Parameters and Return Values"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["key_code","\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.em,{children:"string"}),", the ",(0,i.jsx)(n.a,{href:"/docs/appendix/supported-keycodes",children:"key code"})," of the physical key"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.h4,{id:"description-1",children:"Description"}),"\n",(0,i.jsx)(n.p,{children:"Simulates holding down a physical key."}),"\n",(0,i.jsx)(n.admonition,{type:"caution",children:(0,i.jsxs)(n.p,{children:["This function should have a corresponding ",(0,i.jsx)(n.a,{href:"#release-a-pressed-physical-key-keyup",children:(0,i.jsx)(n.code,{children:"key.up"})})," call; otherwise, if the script terminates, the key may remain pressed indefinitely."]})}),"\n",(0,i.jsxs)(n.h3,{id:"release-a-pressed-physical-key-keyup",children:["Release a Pressed Physical Key (",(0,i.jsx)(n.strong,{children:"key.up"}),")"]}),"\n",(0,i.jsx)(n.h4,{id:"declaration-2",children:"Declaration"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-lua",children:"key.up(key_code)\n"})}),"\n",(0,i.jsx)(n.h4,{id:"parameters-and-return-values-2",children:"Parameters and Return Values"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["key_code","\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.em,{children:"string"}),", the ",(0,i.jsx)(n.a,{href:"/docs/appendix/supported-keycodes",children:"key code"})," of the physical key"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.h4,{id:"description-2",children:"Description"}),"\n",(0,i.jsx)(n.p,{children:"Simulates releasing a pressed physical key."}),"\n",(0,i.jsxs)(n.h3,{id:"simulate-typing-text-keysend_text",children:["Simulate Typing Text (",(0,i.jsx)(n.strong,{children:"key.send_text"}),")"]}),"\n",(0,i.jsx)(n.h4,{id:"declaration-3",children:"Declaration"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-lua",children:"key.send_text(text[, delay_per_key])\n"})}),"\n",(0,i.jsx)(n.h4,{id:"parameters-and-return-values-3",children:"Parameters and Return Values"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["text","\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.em,{children:"string"}),", the text to be input, can only include English letters, numbers, half-width characters, and ",(0,i.jsx)(n.code,{children:'"\\b"'})," ",(0,i.jsx)(n.code,{children:'"\\r"'})," ",(0,i.jsx)(n.code,{children:'"\\t"'})]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["delay_per_key","\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.em,{children:"integer"}),", ",(0,i.jsx)(n.em,{children:"optional"}),", the delay for each key press, defaults to no delay for maximum input speed based on device performance"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.h4,{id:"description-3",children:"Description"}),"\n",(0,i.jsxs)(n.p,{children:["Splits the ",(0,i.jsx)(n.strong,{children:"text"})," into individual characters, simulates pressing the corresponding physical keys, and then releases them."]}),"\n",(0,i.jsx)(n.h4,{id:"example",children:"Example"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-lua",children:'key.send_text("AbC12#")  -- Type text as quickly as possible\n--\nkey.send_text("AbC12#", 300)  -- Delay 0.3 seconds per key press\n'})}),"\n",(0,i.jsx)(n.h2,{id:"example-code",children:"Example Code"}),"\n",(0,i.jsx)(n.h3,{id:"simulate-pressing-the-home-key",children:"Simulate Pressing the HOME Key"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-lua",metastring:'title="key.press"',children:'key.press("HOMEBUTTON")\n'})}),"\n",(0,i.jsx)(n.h3,{id:"simulate-holding-down-the-home-key",children:"Simulate Holding Down the HOME Key"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-lua",metastring:'title="key.press"',children:'key.down("HOMEBUTTON") -- Hold down the HOME key\nsys.msleep(1000) -- Wait for 1 second\nkey.up("HOMEBUTTON") -- Release the HOME key\n'})}),"\n",(0,i.jsx)(n.h3,{id:"simulate-double-clicking-the-home-key",children:"Simulate Double-Clicking the HOME Key"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-lua",metastring:'title="key.press"',children:'key.press("HOMEBUTTON")\nkey.press("HOMEBUTTON")\n'})}),"\n",(0,i.jsx)(n.h3,{id:"simulate-pressing-the-lock-key-power-key",children:"Simulate Pressing the Lock Key (Power Key)"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-lua",metastring:'title="key.press"',children:'key.press("LOCK")\n'})}),"\n",(0,i.jsx)(n.h3,{id:"simulate-pressing-the-enter-key",children:"Simulate Pressing the Enter Key"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-lua",metastring:'title="key.press"',children:'key.press("RETURN")\n'})}),"\n",(0,i.jsx)(n.h3,{id:"other-simulations",children:"Other Simulations"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-lua",metastring:'title="key.press"',children:'-- The following example simulates the combination key [command + v] to paste clipboard text (not control + v on Windows)\nkey.down("LEFTCOMMAND") -- Hold down the command key\nsys.msleep(20) -- Wait for 20 milliseconds\nkey.press("V") -- Press the v key\nsys.msleep(20) -- Wait for 20 milliseconds\nkey.up("LEFTCOMMAND") -- Release the command key\n--\nkey.press("VOLUMEUP") -- Press the volume up key\nkey.press("VOLUMEDOWN") -- Press the volume down key\n--\nkey.down("VOLUMEUP") -- Hold down the volume up key\nsys.msleep(1000) -- Wait for 1 second\nkey.up("VOLUMEUP") -- Release the volume up key\n--\nkey.down("LOCK") -- Hold down the lock key (power key)\nsys.msleep(3000) -- Wait for 3 seconds\nkey.up("LOCK") -- Release the lock key (power key)\n--\nkey.press("SHOW_HIDE_KEYBOARD") -- Press the [Show/Hide Keyboard Key] to hide the virtual keyboard\n--\nkey.press("SHOW_HIDE_KEYBOARD") -- Press the [Show/Hide Keyboard Key] again to show the virtual keyboard\n--\n-- The following example simulates the combination key [Lock Key + HOME Key] to take a screenshot and save it to the album\nkey.down("LOCK") -- Hold down the lock key (power key)\nsys.msleep(100) -- Wait for 100 milliseconds\nkey.press("HOMEBUTTON") -- Press the HOME key\nsys.msleep(100) -- Wait for 100 milliseconds\nkey.up("LOCK") -- Release the lock key (power key)\n--\n-- Combination key to switch input methods\nkey.down("LEFTCONTROL")\nsys.msleep(50)\nkey.press("SPACE")\nsys.msleep(50)\nkey.up("LEFTCONTROL")\n'})})]})}function h(e={}){const{wrapper:n}={...(0,a.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(c,{...e})}):c(e)}},8453:(e,n,s)=>{s.d(n,{R:()=>r,x:()=>t});var l=s(6540);const i={},a=l.createContext(i);function r(e){const n=l.useContext(a);return l.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function t(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:r(e.components),l.createElement(a.Provider,{value:n},e.children)}}}]);