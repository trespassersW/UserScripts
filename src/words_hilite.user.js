// ==UserScript==*
// @name        words hilite
// @namespace   trespassersW
// @description highligts some words 
// @include https://greasyfork.org/en/forum/discussion/*
// @run-at document-end
// @grant unsaveWindow
// ==/UserScript==
function stickStyle(css){
 var s=document.createElement("style"); s.type="text/css";
 s.appendChild(document.createTextNode(css));
 return (document.head||document.documentElement).appendChild(s);
}
stickStyle('\
.hwB {color:blue !important;}\
.hwG {color:green !important;}\
.hwR {color:red !important;}\
');
function wh(H,r,c){
   return H.replace(r,'<span class='+c+'>'+'$&</span>');
}
var  H= document.body.innerHTML;
 H=  wh(H,/Mickey|Minnie|Daisy/g, 'hwB');
 H=  wh(H,/WallE|Wall E/g, 'hwG');
 H=  wh(H,/Shrek|Fiona/g, 'hwR');
 
 document.body.innerHTML=H;
