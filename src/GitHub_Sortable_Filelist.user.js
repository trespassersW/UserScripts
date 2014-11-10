// ==UserScript==
// @name        GitHub Sortable Filelist
// @namespace   trespassersW
// @description appends sorting function to github directories
// @include https://github.com/*
// @version 14.11.10.0
// @created 2014-11-10
// @updated 2014-11-10
// @author  trespassersW
// @licence MIT
// @run-at document-end
// @grant GM_none
// ==/UserScript==

if(document.querySelector('.file-wrap')){

(function(){

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
/*.file-wrap table.files td.icon,\
.file-wrap table.files td.content,\
.file-wrap table.files td.message,\
.file-wrap table.files td.age\
*/
function css(){
stickStyle('\
.fsort-butt, .tables.file  {position: relative; }\
.fsort-butt:before{\
 position: absolute; left:1.5em; top: -1em; \
 cursor: pointer;\
 content: "";\
 z-index:99999;\
 width: 0;  height: 0;\
 opacity:.2;\
 }\
.fsort-asc:before,\
.fsort-desc.fsort-sel:hover:before\
{\
 border-left: 6px solid transparent;\
 border-right: 6px solid transparent;\
 border-bottom: 14px solid #444;\
 border-top: 0;\
}\
.fsort-desc:before,\
.fsort-asc.fsort-sel:hover:before{\
 border-left: 6px solid transparent;\
 border-right: 6px solid transparent;\
 border-bottom: 0;\
 border-top: 14px solid #444;\
 }\
.fsort-butt.fsort-desc.fsort-sel:hover:before,\
.fsort-butt.fsort-asc.fsort-sel:before{\
 border-bottom: 14px solid #4183C4;\
 border-top: 0;\
 }\
.fsort-butt.fsort-desc.fsort-sel:before,\
.fsort-butt.fsort-asc.fsort-sel:hover:before{\
 border-bottom: 0;\
 border-top: 14px solid #4183C4;\
 }\
\
.fsort-butt.fsort-sel:before{ opacity: .6 }\
.fsort-butt:hover:before{ opacity: 1 !important;}\
/* patches */\
table.files td.age {text-align: left !important;}\
table.files td.message {overflow-x: visible}\
');//#80A6CD
}
var ii=0;
var d0=[0,0,1];
var C=[{c:1, d: 0, s: 0},{c:2, d: 0, s: 0},{c:3, d: 1, s: 0}];
var ASC;
var oa=[],ca=[];
var D=document, TB;

function setC(n){
 for(var i=0,il=C.length; i<il; i++ ){
  if(i!=n) C[i].s= 0, C[i].d=d0[i];
  else C[i].s=1;
  oa[i].className='fsort-butt fsort-'+(C[i].d?'desc':'asc')+(C[i].s?' fsort-sel':'') ;
 }
}

function isDir(x){
 return (TB.rows[x].cells[0].querySelector("span.octicon-file-directory")) != null;
}

var sort_fn =[
function(a,b){
 var x=isDir(a), y=isDir(b);
 if(x!=y) return (x<y)*2-1;
 x=TB.rows[a].cells[1].querySelector('span.css-truncate-target a').textContent;
 y=TB.rows[b].cells[1].querySelector('span.css-truncate-target a').textContent;
 return x==y? 0: ((x>y)^ASC)*2-1;
 return 0;
}
,
function(a,b){
 var x=isDir(a), y=isDir(b);
 if(x!=y) return (x<y)*2-1;
 x=TB.rows[a].cells[2].querySelector('span.css-truncate').textContent;
 y=TB.rows[b].cells[2].querySelector('span.css-truncate').textContent;
 return x==y? 0: ((x>y)^ASC)*2-1;
}
,
function(a,b){
 var x=isDir(a), y=isDir(b);
 if(x!=y) return (x<y)*2-1;
 x=TB.rows[a].cells[3].querySelector('span.css-truncate>time').getAttribute('datetime');
 y=TB.rows[b].cells[3].querySelector('span.css-truncate>time').getAttribute('datetime');
 return x==y? 0: ((x>y)^ASC)*2-1;
}
]
//
function doSort(t){
 TB=outerNode(t,'TBODY');
 var tb=[],ix=[], i, tl;
 if(!TB) throw' *GHSFL* TBODY not found';
 var n=t.fsort_N;
 tl=TB.rows.length;
 ASC=C[n];
 ASC=C[n].d^=C[n].s;
 for( i=0; i<tl; i++)
  ix.push(i);
 if(oa[0])
  oa[0].parentNode.removeChild(oa[0]),
  oa[1].parentNode.removeChild(oa[1]),
  oa[2].parentNode.removeChild(oa[2]);
 ix.sort(sort_fn[n]);
 for( i=0; i<tl; i++)
  tb.push(TB.rows[ix[i]].innerHTML);
 for( i=0; i<tl; i++)
  TB.rows[i].innerHTML=tb[i];
 setC(n);
 gitDir1(0);
}

function onClik(e){doSort(e.target)}

function gitDir1(x){
 if(x && document.querySelector('.fsort-butt')) {return;}
 var c,o;
 ca=[];
 c= D.querySelector('.file-wrap table.files td.content >span');
 if(!c) throw '*GHSFL* no content';
 ca.push(c);
 c=D.querySelector('.file-wrap table.files td.message >span');
 if(!c) throw '*GHSFL* no messages';
 ca.push(c);
 c=D.querySelector('.file-wrap table.files td.age >span');
 if(!c) throw '*GHSFL* no ages';
 ca.push(c);
 if(x){ oa=[];
  o=D.createElement('span'); 
  o.textContent=''; o.fsort_N=0;
  o.addEventListener('mousedown',onClik,false);
  oa.push(o);
  o=o.cloneNode(true); o.fsort_N=1;
  o.addEventListener('mousedown',onClik,false)
  oa.push(o);
  o=o.cloneNode(true); o.fsort_N=2;
  o.addEventListener('mousedown',onClik,false)
  oa.push(o);
  setC(-1);
 }
  insBefore(oa[0],ca[0]);
  insBefore(oa[1],ca[1]);
  insBefore(oa[2],ca[2]);
}

function gitDir(x){gitDir1(1)}

css();
gitDir();

var target = document.body; //D.querSelector('.file-wrap');
var  MO = window.MutationObserver;
if(!MO) MO= window.WebKitMutationObserver;
if(!MO) return;
var  observer = new MO(function(mutations) {
  mutations.forEach(function(m) {
    if( m.type= "attributes" &&  
        m.target.nodeName == 'DIV' &&  
        m.target.className == "file-wrap" )
      gitDir(m.target);
  });
});
observer.observe(D.body, { attributes: true, subtree: true } );
/* attributes: true , childList: true, subtree: true,  
  characterData: true,  attributeOldValue:true,  characterDataOldValue:true
*/

})()};

/*
 to do: persistent settings; sorting by file extensions; toggling date/time display mode 
 ... do we really need it?
*/
