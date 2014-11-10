// ==UserScript==
// @name        GitHub Sortable Filelist
// @namespace   trespassersW
// @description appends sorting function to github directories
// @include https://github.com/*
// @version 14.11.08
// @created 2014-11-08
// @updated 2014-11-08
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
 position: absolute; left:-0em; top: -1em; \
 cursor: pointer;\
 content: "";\
 z-index:99999;\
 width: 0;  height: 0;\
 opacity:.2;\
 }\
.fsort-butt.fsort-asc:before,\
.fsort-butt.fsort-desc.fsort-sel:hover:before\
{\
 border-left: 6px solid transparent;\
 border-right: 6px solid transparent;\
 border-bottom: 14px solid black;\
 border-top: 0;\
}\
.fsort-butt.fsort-desc:before,\
.fsort-butt.fsort-asc.fsort-sel:hover:before{\
 border-left: 6px solid transparent;\
 border-right: 6px solid transparent;\
 border-bottom: 0;\
 border-top: 14px solid black;\
 }\
.fsort-butt.fsort-sel:before{ opacity: .6 }\
.fsort-butt:hover:before{ opacity: 1 !important;}\
/* patches */\
table.files td.age {text-align: left !important;}\
table.files td.message {overflow-x: visible}\
');
}
var ii=0;
var d0=[0,0,1];
var C=[{c:1, d: 0, s: 0},{c:2, d: 0, s: 0},{c:3, d: 1, s: 0}];
var oa=[],ca=[];
var D=document;

function setC(n){
 for(var i=0,il=C.length; i<il; i++ ){
  if(i!=n) C[i].s= 0, C[i].d=d0[i];
  else C[i].s=1;
  oa[i].className='fsort-butt fsort-'+(C[i].d?'desc':'asc')+(C[i].s?' fsort-sel':'') ;
 }
}
function doSort(t){
 var tp=outerNode(t,'TBODY');
 if(!tp){
 console.log(++ii +' *GHSFL* TBODY not found' )
 return;}
 var n=t.fsort_N;
 C[n].d^=1; 
 setC(n);
 console.log(++ii +' 3ae6ucb ' +  t.fsort_N)
}

function onClik(e){doSort(e.target)}


function gitDir(){
 if(document.querySelector('.fsort-butt')) {console.log('y}|{E');return;}
 var c,o;
 oa=[],ca=[];
 c= D.querySelector('.file-wrap table.files td.content >span');
 if(!c) {console.log( '*GHSFL* no content'); return}
 ca.push(c);
 c=D.querySelector('.file-wrap table.files td.message >span');
 if(!c) {console.log( '*GHSFL* no messages'); return}
 ca.push(c);
 c=D.querySelector('.file-wrap table.files td.age >span');
 if(!c) {console.log( '*GHSFL* no ages'); return}
 ca.push(c);
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
 insBefore(oa[0],ca[0]);
 insBefore(oa[1],ca[1]);
 insBefore(oa[2],ca[2]);
}

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