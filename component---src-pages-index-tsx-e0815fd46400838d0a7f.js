(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{QeBL:function(t,e,n){"use strict";n.r(e);var r=n("q1tI"),o=n.n(r),i=n("wTIg"),u=n("qKvR"),a=function(t){Object(r.useEffect)(t,[])},c=function(t){a((function(){t()}))},f=function(t,e){var n=Object(r.useRef)((function(){}));Object(r.useEffect)((function(){n.current=t})),Object(r.useEffect)((function(){if(null!==e){var t=setInterval((function(){return n.current()}),e||0);return function(){return clearInterval(t)}}}),[e])};function l(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(t)))return;var n=[],r=!0,o=!1,i=void 0;try{for(var u,a=t[Symbol.iterator]();!(r=(u=a.next()).done)&&(n.push(u.value),!e||n.length!==e);r=!0);}catch(c){o=!0,i=c}finally{try{r||null==a.return||a.return()}finally{if(o)throw i}}return n}(t,e)||function(t,e){if(!t)return;if("string"==typeof t)return s(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(t);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return s(t,e)}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function s(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}var b=function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:50,o=Object(r.useState)(0),i=l(o,2),u=i[0],a=i[1],c=Object(r.useState)(e),s=l(c,2),b=s[0],y=s[1],m=u>=t.length;return Object(r.useEffect)((function(){y(e)}),[e]),f((function(){!b&&!m&&a(u+1)}),n),{text:t.split("").slice(0,u).join(""),finished:m,start:function(){return y(!1)}}};function y(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(t)))return;var n=[],r=!0,o=!1,i=void 0;try{for(var u,a=t[Symbol.iterator]();!(r=(u=a.next()).done)&&(n.push(u.value),!e||n.length!==e);r=!0);}catch(c){o=!0,i=c}finally{try{r||null==a.return||a.return()}finally{if(o)throw i}}return n}(t,e)||function(t,e){if(!t)return;if("string"==typeof t)return m(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(t);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return m(t,e)}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function m(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}var v=n("WeT4"),d=n("lGJ9");function j(){var t=function(t,e){e||(e=t.slice(0));return Object.freeze(Object.defineProperties(t,{raw:{value:Object.freeze(e)}}))}(["\n0% {\n  transform: translateX(0);\n}\n\n30% {\n  transform: translateX(0);\n}\n\n100% {\n transform: translateX(-100vw);\n}\n"]);return j=function(){return t},t}function h(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(t)))return;var n=[],r=!0,o=!1,i=void 0;try{for(var u,a=t[Symbol.iterator]();!(r=(u=a.next()).done)&&(n.push(u.value),!e||n.length!==e);r=!0);}catch(c){o=!0,i=c}finally{try{r||null==a.return||a.return()}finally{if(o)throw i}}return n}(t,e)||function(t,e){if(!t)return;if("string"==typeof t)return p(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(t);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return p(t,e)}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function p(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}var g=function(){var t=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:50,n=t.map((function(t){return b(t,!0,e)})),o=Object(r.useState)(0),i=y(o,2),u=i[0],a=i[1];c((function(){var t;null===(t=n[0])||void 0===t||t.start()}));var f=n.filter((function(t){return t.finished})).length;return Object(r.useEffect)((function(){if(0!==f){var t=u+1;a(t);var e=setTimeout((function(){var e;return null===(e=n[t])||void 0===e?void 0:e.start()}),1e3);return function(){clearTimeout(e)}}}),[f]),{sentence:n.map((function(t){return t.text})).filter((function(t){return t})),finished:n.every((function(t){return t.finished}))}}(["Hi people :)","Welcome to a certain lazy programmer's site X)"]),e=t.sentence,n=t.finished,o="undefined"==typeof localStorage||Boolean(localStorage.getItem("INDEX_VIEWED")),i=h(Object(r.useState)(o?1:0),2),a=i[0],f=i[1];return Object(r.useEffect)((function(){if(0===a&&n){var t=setTimeout((function(){f(a+1)}),1500),e=setTimeout((function(){localStorage.setItem("INDEX_VIEWED","true")}),1500);return function(){clearTimeout(t),clearTimeout(e)}}return function(){}}),[n,a]),Object(u.b)(v.a,null,Object(u.b)(O,{center:0===a},0===a?Object(u.b)(S,{finished:n},e.map((function(t,e){return Object(u.b)(I,{key:e},t)}))):Object(u.b)(d.c,{animate:!o})))},O=Object(i.a)("div",{target:"e1jrxj8j0"})((function(t){return{height:"100vh",overflow:"hidden",display:"flex",alignItems:"center",flexDirection:"column",justifyContent:t.center?"center":"start",fontSize:"calc(10px + 2vmin)"}})),S=Object(i.a)("div",{target:"e1jrxj8j1"})((function(t){return{textAlign:"center",animation:t.finished?"".concat(w," 2s forwards"):"unset"}})),w=Object(u.c)(j()),I=Object(i.a)("p",{target:"e1jrxj8j2"})({name:"1uxks7v",styles:"margin:0.2em;font-size:1.5em;"}),A=n("sOyx");e.default=function(){return Object(u.b)(o.a.Fragment,null,Object(u.b)(A.a,null),Object(u.b)(g,null))}}}]);
//# sourceMappingURL=component---src-pages-index-tsx-e0815fd46400838d0a7f.js.map