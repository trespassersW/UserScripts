// ==UserScript==
// @name        OUJS widelist
// @namespace   trespassersW
// @description extends list of scripts shown by OUJS to 100% width
// @include https://openuserjs.org/*
// @license: MIT
// @version 2.015.1005
// @created 2014-10-05
// @updated 2014-10-05
// @run-at document-start
// @grant GM_none
// ==/UserScript==
(function(){ "use strict";
var css="\
.col-sm-8 {\
 width: 100% !important;\
}\
.col-sm-4 {\
 position: absolute !important;\
 right: 0 !important;\
}\
.col-sm-4 div.panel {\
 margin-bottom: 4px !important;\
}\
\
.col-sm-4:before {\
 border: thin solid grey !important;\
 background: white;\
 content: '\\21a7';\
 position: absolute;\
 left: -12px; top: 2px;\
 font-size: 20px;\
 color: gray;\
}\
.col-sm-4:hover:before {\
 border: thin solid red !important;\
 color: red !important;\
}\
.col-sm-4 .col-sm-40 \
{\
 position:absolute !important;\
 visibility: hidden !important;\
 padding: 0 !important; margin: 0 !important;\
 display: block !important;\
 transition-property: visibility;\
 transition-delay: 750ms\
}\
.col-sm-4:hover .col-sm-40\
{\
 visibility: visible !important;\
 display: block !important;\
 transition-property: visibility;\
 transition-delay: 300ms\
}\
/* name+description in single line */\
.tr-link span.inline-block ~ p\
{\
 display: inline !important;\
}\
.tr-link span.inline-block ~ p:before {\
 content: '\\0a0 -\\0a0'\
}\
.tr-link td.rating .progress {\
 margin-bottom: 0 !important;\
}\
.tr-link td.rating  {\
 line-height: 1 !important;\
}\
/* hide username in author's scripts list */\
.col-xs-12 .tr-link a.tr-link-a ~ span.inline-block{\
 display: none !important;\
}\
.oujsort-desc:after {content: '\\2193'}\
.oujsort-asc:after {content: '\\2191'}\
";
//
function stickStyle(css){ "use strict";
 var s=document.createElement("style"); s.type="text/css";
 s.appendChild(document.createTextNode(css));
 return (document.head||document.documentElement).appendChild(s);
}

stickStyle(css);

function toObj(s) {
 var r = {}, c = s.split('&'), t;
 for(var i = 0; i < c.length; i++) {
  t = c[i].split('=');
  r[decodeURIComponent(t[0])] = decodeURIComponent(t[1]);
 }
 return r;
}
function hp(h) {
 var r,x=h.indexOf("?");
 if(x>-1) r=toObj(h.substr(x+1));
 return r;
}
var defaultOrder = {
 topic: 'asc', name: 'asc', category: 'asc', users: 'asc', 
 views: 'desc', created: 'desc', updated: 'desc',
 size: 'desc', rating: 'desc', installs: 'desc', comments: 'desc' 
}

window.addEventListener("load",function(e) {
var a, ah, lh = hp(location.href), o,i,il;
if(lh&&lh.orderBy) {
 a=document.querySelectorAll("th.text-center >a");
 for( il=a.length, i=0; i<il; i++ ) {
  ah=hp(a[i].href);
  if(ah) if(ah.orderBy==lh.orderBy) { // mark sorted column
    a[i].classList.add("oujsort-"+lh.orderDir);
   }else{ // set commonsensical sorting order
    o= defaultOrder[ah.orderBy];
    if(o && o!=ah.orderDir )
     a[i].href=a[i].href.replace('&orderDir='+ah.orderDir,'&orderDir='+o);
   }
 }
}

// rearrange right panel to get transition working
a = document.querySelectorAll("div.col-sm-4 > div.panel");
 if(a.length>1) {
  o = document.createElement('div');
  o.className="col-sm-40";
  var aa=[];
  for( i=a.length-1; i>0; i-- ) 
    aa.push(a[i].parentNode.removeChild(a[i]));
  for( i=aa.length; i>0; i-- ) 
    o.appendChild( aa.pop() );
  a[0].parentNode.appendChild(o);
 }
},false);

})();