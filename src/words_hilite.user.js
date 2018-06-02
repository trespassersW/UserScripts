// ==UserScript==
// @name        words hilite
// @namespace   trespassersW
// @description highligts some words 
// @include https://greasyfork.org/en/forum/discussion/*
// @license MIT
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
var cC=0;
function wh(H,r,c){
   return H.replace(r,
   function(m){
    cC++;  return '<span class='+c+'>'+m+'</span>';
   });
}
var  H= document.body.innerHTML;
 H=  wh(H,/Mickey|Minnie|Daisy/g, 'hwB');
 H=  wh(H,/WallE|Wall E/g, 'hwG');
 H=  wh(H,/Shrek|Fiona/g, 'hwR');
 if(cC) document.body.innerHTML=H;
