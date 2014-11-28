// ==UserScript==
// @name        OUJS widelist
// @namespace   trespassersW
// @description extends list of scripts shown by OUJS to 100% width
// @include     /^https?:\/\/openuserjs\.org(\/.*)?$/
// @license MIT
// @downloadURL https://openuserjs.org/install/trespassersW/OUJS_widelist.user.js
// @updateURL   https://openuserjs.org/install/trespassersW/OUJS_widelist.user.js
// @version 2014.1128
//  .1128   hidden Announcements on Discuss page
//  .1106.10  sort by author; http://; a fix; 
//  .1007.8  right panel in script title page -- width: 25%
//  .1007.6  run on DOMContentLoaded - less flickering?
//  .1006.3  put in order table header - classic 'click on link' behavior
// @created 2014-10-05
// @updated 2014-11-06
// @run-at document-start
// @grant GM_none
// @icon  data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAADAFBMVEX///8AAABVhZgUWHcHT3DB0s+sxMaatrwzb4iMrrVumaYmZYBEfJCxx8jL2tZ7oqxlk6EMUXIdYX0ybobR3dm6zs2fu8BNgpU7dYyQsbeFqbIRVnUsaoMbXXpynKhbi5u70M1Ado7O3NjY495ShZdIfpIWW3lqlqObuL2nwMQiYn4qZ4Gvxsi0yso1cId4n6pij55ymqZEeo8JT3DE1dI+eY+Ts7mivcA1cIi+0dBWiJoAdQBzAGoAXwBjAGkAbwBwAC4AbgAAAGcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD8AAAAEvYAAAAAmAAIfJEBc8wS98gAIQB4fJEAFRORAD0AAHwNAAB8kP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAigAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADLAAAAADES9RgAAAC8ABUAEviQ6QBCmHz/fJH///+RQo/QnHxFAAEAAAAS9wwAgAC8wBAAEviQ6QAAQHz/fJH///8AAAD/DQBAfJAAEviBCe8At3ygAAABoXMK//9zoAFwS0q0AAAAAXRSTlMAQObYZgAAAAFiS0dEAIgFHUgAAAAJcEhZcwAALiMAAC4jAXilP3YAAAFWSURBVHjaVVJte4IgFOVZG8106E0ZTEmXvWgarQXD6v//sEHa2/kC3MO593IuCA1INK5NJwl6RonDMxf+e1CN9WOc5vEIejTL+q7qVmtQkIl9C3YVP1dRx+1xdow+FrjwM7v97RkauGv5NkEJImM2A9Wkl7r5SAE3OsEmxLj8iKYAR2wJHAOILy1Dnr0KHkpZjFQ2sfIwU7OcvFUiLibFMa4o5lYi0YkBxBh54mA00YaJlNiraw85Pkr00k9LV9ATK3riKstRLWDdLeR8Li8tnthug1IFhSPAQ5IHPaHP7ZhEjnCploSyuHPxBQ043jQuVV+chO2eOkHevMjqUnxoFx+awnR11cRmaLd/oCnrlWh3wsbp8MDekj9DtmnBlvmnvFmC6OpiItYW1NxNvNl+9lAaPNp+HRRkPjwP6jpapSw7ZTV5/gyM256C6PkzOJBvKaVOrsd/ZTMxqn69OqgAAAAASUVORK5CYII=
// ==/UserScript==
window.addEventListener('DOMContentLoaded',
function(evnt) {"use strict";

// shrink right panel
if(!document.querySelector(".tr-link")){  
stickStyle("\
div.container-fluid  div.row  div.container-fluid.col-sm-8\
{width:75%}\
div.container-fluid  div.row  div.container-fluid.col-sm-4\
{width:25%}\
.col-sm-4 .nav > li > a {padding: 10px 1px !important;'}\
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
h2.page-heading ~ nav.navbar /*14.11.21*/\
{max-width: 65% !important;}\
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
#oujsort-sep{margin-left: 1.5em; margin-right: 1.5em; border-left: thin dotted gray; }\
/* * /div.col-sm-12 div.list-group {\
 border: thin dotted red!important;/* */\
/* 14-11-28 */\
.col-lg-3{\
  background-color: rgba(88, 132, 160,1)  !important;\
  display: block !important;\
  position: fixed !important; float: none !important;\
  top: 8em !important;\
  left: 0 !important;\
  width: 12px !important;\
  height: auto !important;\
  bottom: 1.3em !important;\
  overflow: hidden !important;\
  z-index: 9999 !important;\
  text-indent: -9999px !important;\
  border: 2px solid rgb(230,230,230) !important;\
  border-width: 1px 2px 1px 0 !important;\
  border-radius: 0 8px 8px 0 !important;\
  padding: 0 0 0 4px !important;\
  -webkit-transition-delay: .75s !important;\
  transition-delay: .75s !important;\
 }\
.col-lg-3:hover {\
   background-color: rgba(255, 255, 255, .9)  !important;\
   width: 25% !important;\
   text-indent: 0 !important;\
   overflow-y: auto !important;\
   -webkit-transition-delay: .05s !important;\
   transition-delay: .3s !important;\
 }\
.col-lg-9 {width:100%!important;}\/* */\
}\
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
function insAfter(n,e){
  if(e.nextElementSibling)
   return e.parentNode.insertBefore(n,e.nextElementSibling);
  return e.parentNode.appendChild(n);
}

//
var odir=[ 'asc', 'desc' ];
var defaultOrder = {
 topic: 0, name: 0, category: 0, users: 0, author: 0,
 views: 1, created: 1, updated: 1, role: 0,
 size: 1, rating: 1, installs: 1, comments: 1 
};

var a, ah,lh, o,i,il;

lh = hp(location.href);

// append 'Author'
 a= ! /users\/.+?\/scripts/.test(location.href)  &&
   document.querySelector('span.inline-block a[href^="/users"]') &&
   document.querySelector('th a[href*="orderBy=name"]');
 if(a){ 
  o=document.createElement('span');
  o.id="oujsort-sep";
  i= insAfter(o,a);
  o= a.cloneNode(false);
  o.textContent="Author";
  o.href=o.href.replace("orderBy=name","orderBy=author");
  o.id="oujsort-author";
  insAfter(o,i);
 }
// put in order table header
 a=document.querySelectorAll('th >a[href*="orderBy"]');
 for( il=a.length, i=0; i<il; i++ ) {
  ah=hp(a[i].href);
  if(ah && ah.orderBy) {
   o= odir[defaultOrder[ah.orderBy]];
   if(o) { 
    if( lh && lh.orderBy && (ah.orderBy==lh.orderBy) ){ // selected?
      o= ah.orderDir= odir[ (lh.orderDir==odir[0])+0 ]; // toggle dir
      a[i].classList.add("oujsort-sel"); // mark currently sorted col
    }
    a[i].classList.add("oujsort-"+o);
    if( o!=ah.orderDir )    // set commonsensical sorting order
     a[i].href=a[i].href.replace(/&orderDir=(asc|desc)/,'&orderDir='+o);
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
  insAfter(o,a[0]);
 }
},false);
