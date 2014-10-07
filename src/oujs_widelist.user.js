// ==UserScript==
// @name        OUJS widelist
// @namespace   trespassersW
// @description extends list of scripts shown by OUJS to 100% width
// @include https://openuserjs.org/*
// @license MIT
// @version 2014.1006.0
//  .1006.0 table header fixes
// @created 2014-10-05
// @updated 2014-10-06
// @run-at document-end
// @grant GM_none
// ==/UserScript==
(function(){ "use strict";
if(!document.querySelector(".tr-link")) return;
var css="\
.col-sm-8 {\
 width: 100% !important;\
}\
.col-sm-4 {\
 position: absolute !important;\
 right: 0 !important;\
 z-index: 9!important;\
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
 left: -6px; top: 2px;\
 font-size: 20px;\
 color: gray;\
}\
.col-sm-4:hover:before {\
 border: thin solid red !important;\
 color: red !important;\
}\
.col-sm-4 .col-sm-404 \
{\
 position:absolute !important;\
 visibility: hidden !important;\
 padding: 0 !important; margin: 0 !important;\
 display: block !important;\
 transition-property: visibility;\
 transition-delay: 750ms\
}\
.col-sm-4:hover .col-sm-404\
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
.tr-link {\
 background-image: linear-gradient(to top,\
 rgba(255,255,255, .75), rgba(237,237,255, .75) );\
}\
/* hide username in author's scripts list */\
.col-xs-12 .tr-link a.tr-link-a ~ span.inline-block{\
 display: none !important;\
}\
.oujsort-desc:after {content: '\\2193';  visibility:hidden;}\
.oujsort-asc:after  {content: '\\2191';  visibility:hidden;}\
.oujsort-desc:hover:after, .oujsort-asc:hover:after{ visibility: visible;}\
.oujsort-sel:after {visibility: visible; }\
";
//
function stickStyle(css){
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

var odir=[ 'asc', 'desc' ];
var defaultOrder = {
 topic: 0, name: 0, category: 0, users: 0, 
 views: 1, created: 1, updated: 1, 
 size: 1, rating: 1, installs: 1, comments: 1 
};

//window.addEventListener("load",function(e) {

var a, ah, lh = hp(location.href), o,i,il,t;
//if(lh) {
 a=document.querySelectorAll('th >a[href*="orderBy"]');
 for( il=a.length, i=0; i<il; i++ ) {
  ah=hp(a[i].href);
  if(ah && ah.orderBy) {
   o= defaultOrder[ah.orderBy]; o=odir[o]; 
   if(o){ t=0;
    if( lh && lh.orderBy && (t= (ah.orderBy==lh.orderBy)) ) // selected?
     o= ah.orderDir; 
   // mark sorted column
    a[i].classList.add("oujsort-"+o);
    if(t) a[i].classList.add("oujsort-sel");
    if( o!=ah.orderDir )    // set commonsensical sorting order
     a[i].href=a[i].href.replace('&orderDir='+ah.orderDir,'&orderDir='+o);
   } 
  }
 }
//}

//},false);

// rearrange right panel to get transition working
a = document.querySelectorAll("div.col-sm-4 > div.panel");
 if(a.length>1) {
  o = document.createElement('div');
  o.className="col-sm-404";
  var aa=[];
  for( i=a.length-1; i>0; i-- ) 
    aa.push(a[i].parentNode.removeChild(a[i]));
  for( i=aa.length; i>0; i-- ) 
    o.appendChild( aa.pop() );
  a[0].parentNode.appendChild(o);
 }
//},false);

})();