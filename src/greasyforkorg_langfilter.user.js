// ==UserScript==
// @name        greasyfork.org langfilter
// @namespace   trespassersW
// @include http*://greasyfork.org/scripts*
// @include http*://greasyfork.org/forum*
// @description filters out scripts and posts containing non-latin letters in title
// @version 2.014.0706.4
// @created 2014-07-05
// @updated 2014-07-06
//  2014-07-06.4 cosmetics
//  2014-07-06.3 kosher unicode range
// @run-at document-end
// @grant GM_none
// ==/UserScript==
(function(){ 
// either 'string' or /RegEx/ in title
var filterz = [ 
/[^\u0000-\u2FFF\uFB00-\uFFFF]/
/* */ 
,/\bKOC\b|\bCamelot\b/i
/* */
];

var C=0,S,E;
var inForum=location.href.indexOf(".org/forum")>-1;
var locStor=null;

function toggleV(x){
 var t = ('N'===x)? false: ('Y'===x)? true: !S.disabled;
 S.disabled = t;
 E.innerHTML= (t?'hide':'show')+' ['+C+']';
 locStor && locStor.setItem("langfilter",t?'Y':'N');
}

function stickStyle(css){
 var s=document.createElement("style"); s.type="text/css";
 s.appendChild(document.createTextNode(css));
 return (document.head||document.documentElement).appendChild(s);
}

function isListed(tc, bl){
 if(tc) try{
 for(var j=0,lj=bl.length; j<lj; j++) {
  if( typeof bl[j] === "string" ) {
    if( (tc.indexOf(bl[j])>-1) ) return true; 
  }else if( typeof bl[j].test === "function" ) { // regex ?
    if( bl[j].test(tc) ){
     return true; 
    }
  }else throw "bad filterz";
 };
 } catch(e){ console.log(e+'\n j:'+j+'; tc:'+tc+'; bl:'+bl); undefined_function(); }; 
 return false;
}

var listSel, titlSel;
if(inForum)
    listSel='#Content .DataList > li.Item',
    titlSel=".Title";
else 
    listSel='#browse-script-list > li[data-script-type]',
    titlSel="h2>span.description";

var a; 
a = document.querySelectorAll(listSel);

if(a)
for (var i=0, li=a.length, t; i<li; i++) {
  t=a[i].querySelector(titlSel);
  if(t && isListed(t.textContent, filterz)){
     a[i].classList.add('greazy-forq-hiden'); C++;
     continue;
  }
}
if(!C){ 
return; // all clear
}
 E=document.createElement('div');
 E.id="greazy-forq-info";
 E.style.cssText = '\
position:fixed;\
left:2px;top:2px;\
background:rgba(255,255,255,.55);\
color:#670000;border:thin dotted 0xA40;\
text-shadow: #311 2px 2px 4px, #F73 -2px -2px 4px;\
cursor:pointer;\
';
 E.addEventListener('click',toggleV,false);
 document.body.appendChild(E);
 stickStyle('\
.greazy-forq-hiden{border: dotted #A40 !important;\
border-width: 1px 0px 1px 2px !important;\
background-color:#FFFCF4}\
');
 S=stickStyle('\
li.greazy-forq-hiden *{display:none!important;}\
li.greazy-forq-hiden {padding:0!important;margin:0!important;\
}\
');

var sh;
try {
  locStor = window.localStorage;
  sh=locStor.getItem("langfilter");
} catch(e){ locStor=null; }
 toggleV(sh||'N');

})();