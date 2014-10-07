// ==UserScript==
// @name        OUJS widelist
// @namespace   trespassersW
// @description extends list of scripts shown by OUJS to 100% width
// @include https://openuserjs.org/*
// @license MIT
// @version 2014.1007.7
//  .1007.7  user rank
//  .1007.6  run on DOMContentLoaded - less flickering?
//  .1006.5  narrow right panel in script title page
//  .1006.3 put in order table header; classic 'click on link' behavior recovered
// @created 2014-10-05
// @updated 2014-10-06
// @run-at document-start
// @grant GM_none
// @icon  data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAbCAMAAABVyG9ZAAADAFBMVEXb5eDa5N/T3Neqwsd7orBRh5g7eI56oa+twsGJrLUycIYAWHcKT3AOUXKIq7S1ycg/fJITVHUQUnM+e5G3zMuuw8IpZoEAVnUMXHwiYHsnZH9llKO7zs3K2dfN29jH2NWzyMuNrLJBfJEqZoC+0M/Z497i6N3l7OHY494+dIsSU3QoZX/E1dOevsFBfZOuxsYmY34SZIC5zMwFTW46d43Y4t2Ao6sCWXgzbYnP4Nl3oa2kvMDV39rW4dw8eY8VVXaswcB/oqq0ycnX4dyQr7TO29lCfpS2zMkeXXje5drM29ghX3rH19XF1tRSiJmvxcm9zsyMrLKivL8AV3ZUiZoYZX9xnao2e5HB0tEXWXfP3Nlul6U2bofJ2NbZ5N+4zM0mYn4ZWnhJh5pwnKmfub23zcrF19TB1NKwxMOFp64mb4mmwsAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABUAAAAEvkAAAAAmAC4fJEAFlIS+iAAIQB4fJEAFRORAD0AAHwNAAB8kP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAigAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf+AA0AXoAACkS93AAAAAUABUAEvuQ6QBCmHz/fJH///+RQo/QnHxFAAEAAAAS+WQAgAAUwBAAEvuQ6QAAQHz/fJH///8AAAD/DQCYfJAAEvqBCe8At3yMAAABnJME//+TjAEYAZzLkQCrAAAAAWJLR0T/pQfyxQAAAAlwSFlzAAALEwAACxMBAJqcGAAAAZxJREFUeNptUutf00AQ3AskaZu59AXYK6CI5qrR1GjDO1JExWJ5Cr5A8f3k///ONk2gv5b95UPuJjuZnR2itMTIy+WFMTZuWpZp54xhIF9wILngFFxjoFEUS2VcVqU6ccU+OSUBeaOmVK33iaznMqw4xWdnemb25q252/NOD0v7jBIf7twlTzca2qN79yVkNREj8j7w4KHQQVOpZqDFoxDw84m4AvD4iSCrxRLRimhhcQlYXmHKHJOvkrYq4VocB2El0k/XgfYGtz2TKG96QSt87gnhLYStwHvBOm2GTKD2Um/xTe/PXoCmftUBzG0iS0K9bigZJ3pFLLuNHQVERNsRoHavhWiPCfd1E2sZYUkf1PqENss4ZBn1KxlvUhljR8Ax6ajyNkjF07u++GTk97zAKBtZfHDSkYXr4+MJ9YzqdktsFJ1K+G7f3qrEp8+U2nt28uVrZi+JibrEt+8/fv76/efvv3WHja8Xs1XmGAPKHaU6Q6vkvqo/GIDiYDgMd7ktE6D93x3KFK2c22YUmfZGTCNBZDuTZySi19QFdzg4TBOA1ygAAAAASUVORK5CYII=
// ==/UserScript==
window.addEventListener('DOMContentLoaded',
function(evnt) {"use strict";

if(!document.querySelector(".tr-link")) { 
// shrink right panel
 stickStyle("\
div.container-fluid  div.row  div.container-fluid.col-sm-8\
{width:75%}\
div.container-fluid  div.row  div.container-fluid.col-sm-4\
{width:25%}\
"); 
 return; // no tables - do nothing more
}

stickStyle("\
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
/* announcements of pop groups*/\
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
.col-sm-4 .col-sm-404\
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
 { display: inline !important; }\
.tr-link span.inline-block ~ p:before\
{ content: '\\0a0 -\\0a0' }\
.tr-link td.rating .progress\
 { margin-bottom: 0 !important;}\
.tr-link td.rating\
 {line-height: 1 !important;}\
.tr-link {\
 background-image: linear-gradient(to top,\
 rgba(255,255,255, .75), rgba(237,237,255, .75) );\
}\
/* hide username in author's scripts list */\
.col-xs-12 .tr-link a.tr-link-a ~ span.inline-block\
 { display: none !important;}\
 /* updown arrows */\
.oujsort-desc:after,\
.oujsort-asc:hover:after\
 {content: '\\2191';}\
.oujsort-asc:after,\
.oujsort-desc:hover:after\
 {content: '\\2193';}\
.oujsort-asc:after, .oujsort-desc:after\
 {visibility: hidden;}\
.oujsort-asc:hover:after, .oujsort-desc:hover:after\
 {visibility: visible;}\
.oujsort-sel:after {visibility: visible !important;}\
/*fixiez ?!11*/\
th a{display: inline!important;}\
");
//
function stickStyle(css){
 var s=document.createElement("style"); s.type="text/css";
 s.appendChild(document.createTextNode(css));
 return (document.head||document.documentElement).appendChild(s);
}
//
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
//
var odir=[ 'asc', 'desc' ];
var defaultOrder = {
 topic: 0, name: 0, category: 0, users: 0, 
 views: 1, created: 1, updated: 1, role: 0,
 size: 1, rating: 1, installs: 1, comments: 1 
};

// put in order table header
var a, ah,lh, o,i,il;
lh = hp(location.href);
 a=document.querySelectorAll('th >a[href*="orderBy"]');
 for( il=a.length, i=0; i<il; i++ ) {
  ah=hp(a[i].href);
  if(ah && ah.orderBy) {
   o= defaultOrder[ah.orderBy]; o=odir[o]; 
   if(o) { 
    if( lh && lh.orderBy && (ah.orderBy==lh.orderBy) ) // selected?
      o= ah.orderDir, 
      a[i].classList.add("oujsort-sel"); // mark currently sorted col
    a[i].classList.add("oujsort-"+o);
    if( o!=ah.orderDir )    // set commonsensical sorting order
     a[i].href=a[i].href.replace('&orderDir='+ah.orderDir,'&orderDir='+o);
   } 
  }
 }

// rearrange right panel to get CSS transition working
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
},false);
