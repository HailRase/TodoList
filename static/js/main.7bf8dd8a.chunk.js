(this["webpackJsonpit-incubator-todolist-ts"]=this["webpackJsonpit-incubator-todolist-ts"]||[]).push([[0],{64:function(e,t,a){e.exports=a(77)},69:function(e,t,a){},70:function(e,t,a){},77:function(e,t,a){"use strict";a.r(t);var n=a(0),i=a.n(n),r=a(8),o=a.n(r);a(69),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a(70);var c=a(30),l=a(123),s=a(111),d=a(112),u=function(e){var t=Object(n.useState)(""),a=Object(c.a)(t,2),r=a[0],o=a[1],u=Object(n.useState)(!1),m=Object(c.a)(u,2),f=m[0],E=m[1],O=function(){var t=r.trim();t?(e.addItem(t),o("")):E(!0),o("")};return i.a.createElement("div",null,i.a.createElement(l.a,{size:"small",variant:"outlined",value:r,onChange:function(e){E(!1),o(e.currentTarget.value)},onKeyPress:function(e){"Enter"===e.key&&O()},label:"Title",error:f,helperText:f&&"Title is required!!!"}),i.a.createElement(s.a,{onClick:O,color:"primary",size:"small"},i.a.createElement(d.a,{fontSize:"large"})))},m=a(118),f=a(78),E=a(119),O=a(120),b=a(116),I=a(79),T=a(122),p=a(121),L=a(11),j=a(41),v=a(124),y=[],S=function(e,t){return{type:"CHANGE-TODOLIST-FILTER",id:e,filter:t}},h=a(16),D=a(113),A=function(e){var t=Object(n.useState)(!1),a=Object(c.a)(t,2),r=a[0],o=a[1],d=Object(n.useState)(e.title),u=Object(c.a)(d,2),m=u[0],f=u[1];return r?i.a.createElement(l.a,{style:{width:"150px"},value:m,autoFocus:!0,onBlur:function(){o(!1),e.setNewTitle(m)},onChange:function(e){f(e.currentTarget.value)}}):i.a.createElement("span",null,e.title,i.a.createElement(s.a,{onClick:function(){return o(!0)},size:"small"},i.a.createElement(D.a,{fontSize:"small"})))},k=a(114),g=a(125),C=a(110),w=a(117),N=a(115),x=a(21),G={};function K(e){var t=Object(h.c)((function(t){return t.todoLists.filter((function(t){return t.id===e.todoListId}))[0]})),a=Object(h.c)((function(t){return t.tasks[e.todoListId]})),n=Object(h.b)(),r=a;"active"===t.filter&&(r=a.filter((function(e){return!e.isDone}))),"completed"===t.filter&&(r=a.filter((function(e){return e.isDone})));var o=r.map((function(t){return i.a.createElement(k.a,{disableGutters:!0,className:t.isDone?"is-done":"",key:t.id,divider:!0,style:{padding:"0px",display:"flex",justifyContent:"space-between"}},i.a.createElement(g.a,{onChange:function(a){return n((i=t.id,r=e.todoListId,o=a.currentTarget.checked,{type:"CHANGE-TASK-STATUS",taskId:i,todoListId:r,isDone:o}));var i,r,o},color:"primary",checked:t.isDone}),i.a.createElement(A,{title:t.title,setNewTitle:function(a){return n(function(e,t,a){return{type:"CHANGE-TASK-TITLE",taskId:e,todoListId:t,title:a}}(t.id,e.todoListId,a))}}),i.a.createElement(s.a,{onClick:function(){var a,i;n((a=t.id,i=e.todoListId,{type:"REMOVE-TASK",taskId:a,todoListId:i}))},size:"small"},i.a.createElement(N.a,{fontSize:"small"})))}));return i.a.createElement("div",{className:"todolist"},i.a.createElement(b.a,{variant:"h6",style:{fontWeight:"bold"}},i.a.createElement(A,{title:t.title,setNewTitle:function(t){n(function(e,t){return{type:"CHANGE-TODOLIST-TITLE",id:e,title:t}}(e.todoListId,t))}}),i.a.createElement(s.a,{onClick:function(){return n({type:"REMOVE-TODOLIST",id:e.todoListId})}},i.a.createElement(N.a,null))),i.a.createElement(u,{addItem:function(t){n(function(e,t){return{type:"ADD-TASK",title:e,todoListId:t}}(t,e.todoListId))}}),i.a.createElement(C.a,null,o),i.a.createElement("div",{className:"btn"},i.a.createElement(w.a,{variant:"contained",size:"small",disableElevation:!0,style:{display:"flex",justifyContent:"space-between"}},i.a.createElement(I.a,{color:"all"===t.filter?"secondary":"primary",onClick:function(){return n(S(e.todoListId,"all"))}},"All"),i.a.createElement(I.a,{color:"active"===t.filter?"secondary":"primary",onClick:function(){return n(S(e.todoListId,"active"))}},"Active"),i.a.createElement(I.a,{color:"completed"===t.filter?"secondary":"primary",onClick:function(){return n(S(e.todoListId,"completed"))}},"Completed"))))}var z=function(){var e=Object(h.c)((function(e){return e.todoLists})),t=Object(h.b)(),a=e.map((function(e){return i.a.createElement(m.a,{item:!0,key:e.id},i.a.createElement(f.a,{elevation:8,style:{padding:"10px"}},i.a.createElement(K,{todoListId:e.id})))}));return i.a.createElement("div",{className:"App"},i.a.createElement(E.a,{position:"sticky"},i.a.createElement(O.a,{style:{justifyContent:"space-between"}},i.a.createElement(s.a,{edge:"start",color:"inherit","aria-label":"menu"},i.a.createElement(p.a,null)),i.a.createElement(b.a,{variant:"h6"},"TodoLists"),i.a.createElement(I.a,{color:"inherit",variant:"outlined"},"Login"))),i.a.createElement(T.a,{fixed:!0},i.a.createElement(m.a,{container:!0,style:{padding:"29px 0"}},i.a.createElement(u,{addItem:function(e){t(function(e){return{type:"ADD-TODOLIST",title:e,todoListId:Object(v.a)()}}(e))}})),i.a.createElement(m.a,{container:!0,spacing:4},a)))},H=a(46),R=Object(H.a)({tasks:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:G,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"REMOVE-TASK":return Object(L.a)(Object(L.a)({},e),{},Object(x.a)({},t.todoListId,e[t.todoListId].filter((function(e){return e.id!==t.taskId}))));case"ADD-TASK":return Object(L.a)(Object(L.a)({},e),{},Object(x.a)({},t.todoListId,[{id:Object(v.a)(),title:t.title,isDone:!1}].concat(Object(j.a)(e[t.todoListId]))));case"CHANGE-TASK-STATUS":return Object(L.a)(Object(L.a)({},e),{},Object(x.a)({},t.todoListId,e[t.todoListId].map((function(e){return e.id===t.taskId?Object(L.a)(Object(L.a)({},e),{},{isDone:t.isDone}):e}))));case"CHANGE-TASK-TITLE":return Object(L.a)(Object(L.a)({},e),{},Object(x.a)({},t.todoListId,e[t.todoListId].map((function(e){return e.id===t.taskId?Object(L.a)(Object(L.a)({},e),{},{title:t.title}):e}))));case"ADD-TODOLIST":return Object(L.a)(Object(L.a)({},e),{},Object(x.a)({},t.todoListId,[]));case"REMOVE-TODOLIST":var a=Object(L.a)({},e);return delete a[t.id],a;default:return e}},todoLists:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:y,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"REMOVE-TODOLIST":return e.filter((function(e){return e.id!==t.id}));case"ADD-TODOLIST":var a=t.todoListId,n={id:a,title:t.title,filter:"all"};return[n].concat(Object(j.a)(e));case"CHANGE-TODOLIST-TITLE":return e.map((function(e){return e.id===t.id?Object(L.a)(Object(L.a)({},e),{},{title:t.title}):e}));case"CHANGE-TODOLIST-FILTER":return e.map((function(e){return e.id===t.id?Object(L.a)(Object(L.a)({},e),{},{filter:t.filter}):e}));default:return e}}}),M=Object(H.b)(R);o.a.render(i.a.createElement(h.a,{store:M},i.a.createElement(z,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[64,1,2]]]);
//# sourceMappingURL=main.7bf8dd8a.chunk.js.map