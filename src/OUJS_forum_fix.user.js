// ==UserScript==
// @name        OUJS forum fix
// @namespace   trespassersW
// @include https://openuserjs.org/forum*
// @description fix for OpenUserJs.org/forum topics table
// @version 2.014.0719.3
//  1st column truncated
// @created 2014-07-18
// @updated 2014-07-20
// @licence public domain
// @run-at document-start
// @grant GM_registerMenuCommand
// ==/UserScript==
(function(){ 
var S;
function toggleV(x){
 var t = !S.disabled;
 S.disabled = t;
 window.status='OUJS/forum fix ' + (t? 'OFF': 'ON');
}
function stickStyle(css){
 var s=document.createElement("style"); s.type="text/css";
 s.appendChild(document.createTextNode(css));
 return (document.head||document.documentElement).appendChild(s);
}
S=stickStyle('\
.td-fit{width:auto!important;}\
.table .tr-link td {\
 max-width: 28em !important;\
 max-width: 28vw !important;\
 }\
.tr-link td:first-of-type,\
.tr-link td:nth-of-type(2) >span\
{\
 overflow: hidden !important;\
 max-width: 100%;\
 white-space: nowrap !important;\
 text-overflow: ellipsis;\
 text-overflow: "\\2025";\
 padding-right: 0 !important;\
}\
.tr-link td:nth-of-type(2){padding-right: 0 !important;}\
');

GM_registerMenuCommand("forum OUJS fix toggle", toggleV);
S.disabled=true; toggleV();

})();