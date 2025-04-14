"use strict";(self.webpackChunkxxtouch_lite=self.webpackChunkxxtouch_lite||[]).push([[6053],{7861:(e,n,l)=>{l.r(n),l.d(n,{assets:()=>d,contentTitle:()=>s,default:()=>u,frontMatter:()=>r,metadata:()=>t,toc:()=>c});const t=JSON.parse('{"id":"lua-manual/extable","title":"Extended Table Module","description":"Extended Table Module - table","source":"@site/docs/lua-manual/extable.md","sourceDirName":"lua-manual","slug":"/lua-manual/extable","permalink":"/docs/lua-manual/extable","draft":false,"unlisted":false,"editUrl":"https://github.com/OwnGoalStudio/XXTouchElite/tree/main/docs/lua-manual/extable.md","tags":[],"version":"current","sidebarPosition":10,"frontMatter":{"sidebar_position":10},"sidebar":"luaManualSidebar","previous":{"title":"Clipboard Module","permalink":"/docs/lua-manual/pasteboard"},"next":{"title":"Extended String Module","permalink":"/docs/lua-manual/exstring"}}');var a=l(4848),i=l(8453);const r={sidebar_position:10},s="Extended Table Module",d={},c=[{value:"Extended Table Module - table",id:"extended-table-module---table",level:2},{value:"Deep Copy a Table (<strong>table.deep_copy</strong>)",id:"deep-copy-a-table-tabledeep_copy",level:3},{value:"Declaration",id:"declaration",level:4},{value:"Parameters and Return Values",id:"parameters-and-return-values",level:4},{value:"Description",id:"description",level:4},{value:"Example",id:"example",level:4},{value:"Deep Print a Table (<strong>table.deep_print/stringify</strong>)",id:"deep-print-a-table-tabledeep_printstringify",level:3},{value:"Declaration",id:"declaration-1",level:4},{value:"Parameters and Return Values",id:"parameters-and-return-values-1",level:4},{value:"Description",id:"description-1",level:4},{value:"Example",id:"example-1",level:4},{value:"Load a Table from a String (<strong>table.load_string</strong>)",id:"load-a-table-from-a-string-tableload_string",level:3},{value:"Declaration",id:"declaration-2",level:4},{value:"Parameters and Return Values",id:"parameters-and-return-values-2",level:4},{value:"Description",id:"description-2",level:4},{value:"Example",id:"example-2",level:4}];function o(e){const n={a:"a",admonition:"admonition",code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",h4:"h4",header:"header",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,i.R)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(n.header,{children:(0,a.jsx)(n.h1,{id:"extended-table-module",children:"Extended Table Module"})}),"\n",(0,a.jsx)(n.h2,{id:"extended-table-module---table",children:"Extended Table Module - table"}),"\n",(0,a.jsxs)(n.h3,{id:"deep-copy-a-table-tabledeep_copy",children:["Deep Copy a Table (",(0,a.jsx)(n.strong,{children:"table.deep_copy"}),")"]}),"\n",(0,a.jsx)(n.h4,{id:"declaration",children:"Declaration"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-lua",children:"copied_table = table.deep_copy(input_table)\n"})}),"\n",(0,a.jsx)(n.h4,{id:"parameters-and-return-values",children:"Parameters and Return Values"}),"\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsxs)(n.li,{children:["input_table","\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsxs)(n.li,{children:[(0,a.jsx)(n.em,{children:"table"}),", the table to be copied"]}),"\n"]}),"\n"]}),"\n",(0,a.jsxs)(n.li,{children:["copied_table","\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsxs)(n.li,{children:[(0,a.jsx)(n.em,{children:"table"}),", the copy of the input table"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,a.jsx)(n.h4,{id:"description",children:"Description"}),"\n",(0,a.jsxs)(n.p,{children:["Recursively copies the ",(0,a.jsx)(n.strong,{children:"input_table"})," to create its duplicate. All values in the table, except for ",(0,a.jsx)(n.code,{children:"function"})," and ",(0,a.jsx)(n.code,{children:"userdata"}),", will be copied.\nIf the input table contains circular references, the reference relationships will also be copied."]}),"\n",(0,a.jsx)(n.h4,{id:"example",children:"Example"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-lua",metastring:'title="table.deep_copy"',children:"_g = table.deep_copy(_G)\n"})}),"\n",(0,a.jsxs)(n.h3,{id:"deep-print-a-table-tabledeep_printstringify",children:["Deep Print a Table (",(0,a.jsx)(n.strong,{children:"table.deep_print/stringify"}),")"]}),"\n",(0,a.jsx)(n.h4,{id:"declaration-1",children:"Declaration"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-lua",children:"table_text = table.deep_print(associated_table)  -- Outputs to standard output\ntable_text = stringify(associated_table)         -- Does not output to standard output, only returns a string\n"})}),"\n",(0,a.jsx)(n.h4,{id:"parameters-and-return-values-1",children:"Parameters and Return Values"}),"\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsxs)(n.li,{children:["associated_table","\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsxs)(n.li,{children:[(0,a.jsx)(n.em,{children:"table"}),", the table to be printed as a string"]}),"\n"]}),"\n"]}),"\n",(0,a.jsxs)(n.li,{children:["table_text","\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsxs)(n.li,{children:[(0,a.jsx)(n.em,{children:"string"}),", the textual representation of the table\u2019s tree structure"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,a.jsx)(n.h4,{id:"description-1",children:"Description"}),"\n",(0,a.jsx)(n.p,{children:"Prints the tree structure of a table."}),"\n",(0,a.jsx)(n.admonition,{type:"note",children:(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsxs)(n.li,{children:["The printed structure ",(0,a.jsx)(n.strong,{children:"does not guarantee format compatibility"})," and may vary between versions."]}),"\n",(0,a.jsxs)(n.li,{children:["The ",(0,a.jsx)(n.code,{children:"table.deep_print"})," function outputs content to the ",(0,a.jsx)(n.a,{href:"/docs/appendix/logging-facilities#print",children:(0,a.jsx)(n.code,{children:"print"})})," buffer, while ",(0,a.jsx)(n.code,{children:"stringify"})," does not."]}),"\n",(0,a.jsxs)(n.li,{children:["Non-table reference types (userdata, functions) cannot be deserialized using ",(0,a.jsx)(n.a,{href:"#load-a-table-from-a-string-tableload_string",children:(0,a.jsx)(n.code,{children:"table.load_string"})}),", and only human readability is guaranteed."]}),"\n"]})}),"\n",(0,a.jsx)(n.h4,{id:"example-1",children:"Example"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-lua",metastring:'title="table.deep_print"',children:"local s = table.deep_print(_G)\nsys.alert(s)\n"})}),"\n",(0,a.jsxs)(n.h3,{id:"load-a-table-from-a-string-tableload_string",children:["Load a Table from a String (",(0,a.jsx)(n.strong,{children:"table.load_string"}),")"]}),"\n",(0,a.jsx)(n.h4,{id:"declaration-2",children:"Declaration"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-lua",children:"associated_table = table.load_string(table_text)\n"})}),"\n",(0,a.jsx)(n.h4,{id:"parameters-and-return-values-2",children:"Parameters and Return Values"}),"\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsxs)(n.li,{children:["table_text","\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsxs)(n.li,{children:[(0,a.jsx)(n.em,{children:"string"}),", the textual representation of the table\u2019s tree structure, which can only contain static data and no dynamic code"]}),"\n"]}),"\n"]}),"\n",(0,a.jsxs)(n.li,{children:["associated_table","\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsxs)(n.li,{children:[(0,a.jsx)(n.em,{children:"table"}),", returns the table structure if successful, or ",(0,a.jsx)(n.code,{children:"nil"})," if failed"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,a.jsx)(n.h4,{id:"description-2",children:"Description"}),"\n",(0,a.jsx)(n.p,{children:"Converts a textual tree structure description into a table object."}),"\n",(0,a.jsx)(n.admonition,{type:"note",children:(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsxs)(n.li,{children:["\n",(0,a.jsxs)(n.p,{children:["When there are no circular references or non-table reference types, ",(0,a.jsx)(n.code,{children:"table.load_string"})," is the inverse function of ",(0,a.jsx)(n.a,{href:"#deep-print-a-table-tabledeep_printstringify",children:(0,a.jsx)(n.code,{children:"stringify"})}),"."]}),"\n"]}),"\n",(0,a.jsxs)(n.li,{children:["\n",(0,a.jsxs)(n.p,{children:["This function differs from ",(0,a.jsx)(n.a,{href:"http://cloudwu.github.io/lua53doc/manual.html#pdf-load",children:(0,a.jsx)(n.code,{children:"load"})})," in that it does not execute code in the text and only uses static data."]}),"\n"]}),"\n",(0,a.jsxs)(n.li,{children:["\n",(0,a.jsxs)(n.p,{children:["For example, the following example contains runtime code, resulting in ",(0,a.jsx)(n.code,{children:"b"})," being ",(0,a.jsx)(n.code,{children:"nil"}),"."]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-lua",children:"b = table.load_string[[ {\n  a = os.execute('reboot'), -- This code will not execute and will return nil\n} ]]\n"})}),"\n"]}),"\n"]})}),"\n",(0,a.jsx)(n.h4,{id:"example-2",children:"Example"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-lua",metastring:'title="table.load_string"',children:"local t = table.load_string[[ {\n  a = 1,\n  b = 2,\n  c = 3,\n} ]]\nsys.alert(t.b)\n"})})]})}function u(e={}){const{wrapper:n}={...(0,i.R)(),...e.components};return n?(0,a.jsx)(n,{...e,children:(0,a.jsx)(o,{...e})}):o(e)}},8453:(e,n,l)=>{l.d(n,{R:()=>r,x:()=>s});var t=l(6540);const a={},i=t.createContext(a);function r(e){const n=t.useContext(i);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function s(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:r(e.components),t.createElement(i.Provider,{value:n},e.children)}}}]);