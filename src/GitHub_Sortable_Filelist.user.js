// ==UserScript==
// @name        GitHub Sortable Filelist
// @namespace   trespassersW
// @description appends sorting function to github directories
// @include https://github.com/*
// @version 14.11.16.9
//  .9 right-aligned date/time column; fixed .ext sorting
//  .8 sorting by file extention
//  .7 date/time display mode switching
//  .4 now works on all github pages
// @created 2014-11-10
// @updated 2014-11-14
// @author  trespassersW
// @license MIT
// @icon https://github.com/trespassersW/UserScripts/raw/master/res/github64.png
// (C) Icon: Aaron Nichols CC Attribution 3.0 Unported
// @run-at document-end
// @grant GM_none
// ==/UserScript==

if(document.body || document.querySelector('#js-repo-pjax-container')){ // .file-wrap

var llii=0; function _l(m){/* * /
 console.log(++llii +': '+m)
/* */
}
var fakejs = // avoid compiler warning
(function(){ "use strict"; 

var ii=0,tt;
var d0=[0,0,1];
var C=[{c:1, d: 0, s: 0},{c:2, d: 0, s: 0},{c:3, d: 1, s: 0}];
var ASC;
var oa=[],ca=[],clock,ext,dtStyle;
var D=document, TB;
var catcher,locStor;
var prefs={dtStyle:0, ext: 0};

function stickStyle(css){
 var s=document.createElement("style"); s.type="text/css";
 s.appendChild(document.createTextNode(css));
 return (document.head||document.documentElement).appendChild(s);
}
function insBefore(n,e){
  return e.parentNode.insertBefore(n,e);
}
function insAfter(n,e){
  if(e.nextElementSibling)
   return e.parentNode.insertBefore(n,e.nextElementSibling);
  return e.parentNode.appendChild(n);
}
function outerNode(target, node) {
 if (target.nodeName==node) return target;
  if (target.parentNode) 
  while (target = target.parentNode) try{
   if (target.nodeName==node)
    return target;
  }catch(e){};
 return null;
}
function savePrefs(){
 if(locStor) locStor.setItem('GHSFL',JSON.stringify(prefs));
}

function css(){
stickStyle('\
.fsort-butt,\n\
.tables.file td.content, .tables.file td.message, .tables.file td.age\n\
 {position: relative; }\n\
.fsort-butt:before{\n\
 position: absolute; display: inline-block;\n\
 cursor: pointer;\n\
 z-index:99999;\n\
 content: "";\n\
 width: 16px;  height: 16px;\n\
}\n\
.fsort-butt.fsort-asc:before,.fsort-butt.fsort-desc:before{\n\
 opacity:.2;\n\
 left:1.5em; top: -1em;\n\
 width: 0;  height: 0;\n\
}\n\
td.age.fsort-butt.fsort-asc:before,td.age..fsort-butt.fsort-desc:before{\n\
 right:3em;\n\
}\n\
.fsort-asc:before,.fsort-desc:before{\n\
 border-style: solid;\n\
 border-color: #654;\n\
}\n\
.fsort-asc:before,\n\
.fsort-desc.fsort-sel:hover:before\n\
{\n\
 border-left: 6px solid transparent;\n\
 border-right: 6px solid transparent;\n\
 border-bottom-width: 14px;\n\
 border-top-width: 0;\n\
}\n\
.fsort-desc:before,\n\
.fsort-asc.fsort-sel:hover:before{\n\
 border-left: 6px solid transparent;\n\
 border-right: 6px solid transparent;\n\
 border-bottom-width: 0;\n\
 border-top-width: 14px;\n\
 }\n\
\n\
.fsort-sel:before,\n\
.fsort-sel:before{\n\
 border-bottom-color: #4183C4 !important;\n\
 border-top-color: #4183C4 !important;\n\
}\n\
\n\
.fsort-butt.fsort-sel:before{ opacity: .6 }\n\
.fsort-butt:hover:before{ opacity: 1 !important;}\n\
\n\
#fsort-clock:before{\n\
 left:4.5em; top:-1.2em;\n\
 border-radius: 16px;\n\
 opacity:1;\n\
 content: url(data:image/png;base64,\
iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAlZJREFUeNqkU0tLG1EUvjORFJPMw6mhTUgxy75EUxiJj6CGLKQV0o2IQd3pxp2bbPs/3MVCIHSRgC3uXBhCSErjtLRkK7TcNCYhk4eGPHvO6AwjXXrgu/fOOff77plzz2VGoxF5iI3hEA6HCcuyxGKxEIZhOMBLcHsAwt0+FfAbDvsFaA4GAzIcDkkqlboVMNlzB8+vzgUCq3N+v+xyOl3opFdXNJfN5nPn52dNVT0DV/FeBjpZcjrfR/b3Dzwul0e02ciPiwsyPTtLptxur7C25n0xMzMfPzoSypQmdREWB0iLt3NcKLK3dzAhSR5+fFxT/JbPG+row9g2HABZhpBjCMA/vZYDgRVOFD02q5WwDKOROp2OIYA+jDlgz8Ly8gpyDIF+v++d9vlkXDdubshlpaKhWCwaawTGsHg+WZaRY9QAPiYEUXyinzY1OanNzWbTWGv7gPynViO4FzlmARavcWgivw2FSDAYJDubm4TjOA0Oh4O8WVwk80tLGscsoLZUtWwThGf6afFEgmxvbZGP8biRAbac2u2S60ajjByjBr1e7/JrJqOMQSNhmmiCJGlknHVAAckjuI1cOq0gx3wLyudkMt1ttejgTkAXMRsWkO106KdEIo0cQwAC9b+l0umHaPRYrVaphWX/63n0XasqjR4eHlNKT5FzrxPBoXxXFEtkY6Ozs7u78G59/dVTt/sxdkSJ0uqXk5OfsVgsU6lUUjzPKzqPwdfo8/lIF4pTr9dJu92WID0/tjZAv8MKti48tqzdbq+JUAsrNFWhULgVeIj9E2AAamUckFr2UCoAAAAASUVORK5CYII=\n\
);}\n\
#fsort-clock:before{ background-color: #CCC  }\n\
#fsort-clock.fsort-on:before{ background-color: #4183C4  }\n\
\n\
td.age .fsort-butt.fsort-asc:before,td.age .fsort-butt.fsort-desc:before{\
left:3em !important;\
}\
#fsort-ext:before{\n\
 left:4em; top:-14px;\n\
 border-radius: 6px;\n\
 width:28px;height:16px;\n\
 opacity:.3;\n\
 content:\ url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAANCAYAAAC3mX7tAAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAAsTAAALEwEAmpwYAAABWUlEQVQ4y+2SP0sDQRDFT7BQTGtnITYSK8Emha1NCrXwC4gWYiUKiiB4jYKdWAmC4AewtxEExSqVjZ1/OEgwrEQwkLvbmd/aTCBI0IBYCD7YYmaYfW/mTRT9VWRZNq6qm79OBBwBrueGPM8ngWvgHbgXkQX7aC+EEFR1x+IDi7dUdQOQYACuviSp1+tDQA2oquoycAlInucT1Wp1EHgA3r3300AG3FUqlX4RKQOvQFNVV0Rk9ksiEZkzRbtJkgx476faqq1etnoK4L0vdazuqefVqepq6ALgKIqiKI7jPuDRcpVPHn1P5JwrxHHc1zHRofe+1H5pmo6akCWrv4QQgojMdxA9AI3vzPfAsXOuACRAXVW3VXUNOM2yrNhsNofNh1qapmPAG5A45wpGdGMiToD9bvdftKZ9I54ALoCGXd5tq9UaAc7Mr0Wbbr09vfk3Azybf+fRP36KDxJ2sN2uMATcAAAAAElFTkSuQmCC);\n\
}\n\
#fsort-ext:before{ background-color: #CCC}\n\
.fsort-sel ~ #fsort-ext:before  {opacity:.6;}\n\
.fsort-on:before{ background-color: #4183C4 !important;}\n\
.fsort-on:hover:before{ opacity:1}\n\
\n\
table.files td.age .css-truncate.css-truncate-target{\n\
 width: 99% !important; \n\
 max-width: none !important;\n\
}\n\
/*table.files td.age span.css-truncate time{\n\
 position: relative !important;\n\
}*/\n\
.fsort-time {\n\
 visibility: hidden;\n\
 display: none;\n\
}\n\
\n\
/* patches */\n\
table.files td.age {text-align: right !important; padding-right: 10px !important;\n\
width:10em!important;\n\
min-width:10em!important;\n\
max-width:none!important;\n\
overflow:visible!important;\n\
}\n\
table.files td.message {overflow: visible !important;}\n\
');


dtStyle=stickStyle('\
td.age  span.css-truncate time{\
 visibility: hidden !important;\
 display: none !important;\
}\
td.age  span.css-truncate .fsort-time {\
 visibility: visible !important;\
 display: inline !important;\
}\
')
}

function setC(n){
 for(var i=0,il=C.length; i<il; i++ ){
  if(i!=n) C[i].s= 0, C[i].d=d0[i];
  else C[i].s=1;
  oa[i].className='fsort-butt fsort-'+(C[i].d?'desc':'asc')+(C[i].s?' fsort-sel':'') ;
  oa[i].title=C[i].d? '\u21ca' : '\u21c8';
 }
}

function setDateTime(){
 try{ //014-10-02T16:09:05Z
 var DT=D.querySelectorAll('td.age span.css-truncate time'),dtm;
 for(var dt, dl=DT.length, i=0; i<dl; i++){
  dt = DT[i].getAttribute('datetime').match(/([0-9\-]+).([0-9\:]+)./);
  dtm=D.createElement('span');
  dtm.className='fsort-time';
  if(/minut|hour|just/.test(DT[i].textContent))
   dtm.textContent=dt[2];
  else
   dtm.textContent=dt[1];
  insAfter(dtm,DT[i]);
 }
 }catch(e){(_l(e+'\n*GHSFL* wrong datetime'))}
}

function isDir(x){
 return (TB.rows[x].cells[0].querySelector("span.octicon-file-directory")) != null;
}

var sDir,sCells,sExts;
 var fa=[
  function(a){
   return TB.rows[a].cells[1].querySelector('span.css-truncate-target a').textContent;
  },
  function(a){
   return TB.rows[a].cells[2].querySelector('span.css-truncate').textContent;
  },
  function(a){
   return TB.rows[a].cells[3].querySelector('span.css-truncate>time').getAttribute('datetime');
  }
 ]

var b9='\x20\x20\x20'; b9+=b9+b9;
function pad9(s){
 if(s.length<9) return (s+b9).substr(0,9);
 return s;
}
function sort_p(n){// prepare data for sorting
 sDir=[],sCells=[];
 for(var tl=TB.rows.length, a=0; a<tl; a++) sDir.push(isDir(a));
 if( n === 0 && prefs.ext ){
  for( a=0; a<tl; a++){ // f.x -> x.f
   var x=fa[n](a),
   m= x.match(/(.*)(\..*)$/);
   if(!m || !m[2]) m=['',x,''];
   x=pad9(m[2])+' '+m[1];
   sCells.push(x);
  }
 }else for( a=0; a<tl; a++) sCells.push(fa[n](a));
}

function sort_fn(a,b){ 
 var x=sDir[a], y=sDir[b];
 if(x!=y) return ((x<y)<<1)-1;
 x= sCells[a], y= sCells[b];
 return x==y? 0: (((x>y)^ASC)<<1)-1;
}

var CNn={content: 0, message: 1, age: 2}

function oClr(){
 var o= catcher.querySelectorAll('.fsort-butt')
 for(var ol=o.length,i=0;i<ol;i++)
  o[i].parentNode.removeChild(o[i]);
}
//
function extclassName(){
  ext.className='fsort-butt'+ (prefs.ext? ' fsort-on': '' );
}
function clockclassName(){
  clock.className='fsort-butt'+ (prefs.dtStyle? '': ' fsort-on');
}
//
function doSort(t){
 TB=outerNode(t,'TBODY');
 if(!TB){  _l( "*GHSFL* TBODY not found"); return; }
 var n=CNn[t.parentNode.className];
 if(typeof n=="undefined"){  _l( "*GHSFL* undefined col"); return; }
 
 if(t.id=='fsort-clock'){
   dtStyle.disabled = (prefs.dtStyle ^= 1);
   savePrefs();
   clockclassName();
   return;
 }
 var xt = (t.id=='fsort-ext');
 if( xt ){
  if(C[n].s) prefs.ext ^= 1; 
  else prefs.ext= 1;
  savePrefs();
  extclassName();
  C[n].d^=C[n].s; // don't toggle dir on ext.click
 }
 var tb=[],ix=[], i, tl;
 _l('n:'+n);
 tl=TB.rows.length;
 ASC=C[n].d^=C[n].s;
 for( i=0; i<tl; i++)
  ix.push(i);
 oClr();
 sort_p(n);
 ix.sort(sort_fn);
 for( i=0; i<tl; i++)
  tb.push(TB.rows[ix[i]].innerHTML);
 for( i=0; i<tl; i++)
  TB.rows[i].innerHTML=tb[i];
 setC(n);
 gitDir1(0);
}

function onClik(e){doSort(e.target)}

function gitDir1(x){
 if(x && document.querySelector('.fsort-butt')) {
  _l('gitDir'+x+' - already'); return;
 }
 _l('gitDir'+x)
 var c,o;
 ca=[];
 c= D.querySelector('.file-wrap table.files td.content >span');
 if(!c){ _l( '*GHSFL* no content') ; return; }
 ca.push(c);
 c=D.querySelector('.file-wrap table.files td.message >span');
 if(!c){ _l( '*GHSFL* no messages'); return; }
 ca.push(c);
 c=D.querySelector('.file-wrap table.files td.age >span');
 if(!c){_l( '*GHSFL* no ages'); return; }
 ca.push(c);
 if(x){  oClr(); oa=[];
  o=D.createElement('span'); 
  o.textContent=''; 
  oa.push(o);
  o=o.cloneNode(true); 
  oa.push(o);
  o=o.cloneNode(true); 
  oa.push(o);
  clock=D.createElement('span');
  clock.id='fsort-clock'; clockclassName();
  ext=D.createElement('span');
  ext.id='fsort-ext'; extclassName();
  setDateTime(); 
  setC(-1);
 }
  insBefore(oa[0],ca[0]);
  insBefore(ext,ca[0]);
  insBefore(oa[1],ca[1]);
  insBefore(oa[2],ca[2]);
  insBefore(clock,ca[2]);
}

function gitDir(){
 gitDir1(1);
}


catcher= D.querySelector('#js-repo-pjax-container');
if(!catcher){  _l( "*GHSFL* err0r"); return; }

catcher.addEventListener('mousedown',function(e){
if(e.target.nodeName && e.target.nodeName=='SPAN' &&
   e.target.className.indexOf('fsort-butt')>-1)
 { onClik(e); }
}
,false);
_l('startup()');

try {
  locStor = window.localStorage;
  tt=locStor.getItem("GHSFL");
} catch(e){ locStor =null}

if(locStor && tt) try{
 prefs =JSON.parse(tt); 
}catch(e){ console.log(e+"\n*GHSFL* bad prefs") }

css();
dtStyle.disabled=(prefs.dtStyle===1);

gitDir();

var target = catcher; //document.body; //D.querSelector('.file-wrap');
var  MO = window.MutationObserver;
if(!MO) MO= window.WebKitMutationObserver;
if(!MO) return;
var  observer = new MO(function(mutations) {
  mutations.forEach(function(m) {
    if( m.type== "attributes" &&  
        m.target.nodeName == 'DIV' &&  
        m.target.className == "file-wrap" )
      gitDir();
      return;
  });
});

//if(m.target.nodeName!='TIME')_l('mo'+' '+m.type +'.'+m.target.nodeName+m.target.className));

observer.observe(D.body, { attributes: true, subtree: true } );
/* attributes: true , childList: true, subtree: true,  
  characterData: true,  attributeOldValue:true,  characterDataOldValue:true
*/

})()};
/*
 to do: persistent settings; sorting by file extensions; toggling date/time display mode 
 ... do we really need it?
*/
