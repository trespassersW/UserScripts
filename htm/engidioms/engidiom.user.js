// ==UserScript==
// @name        engidiom
// @namespace   trespassersW
// @description idiom collection
// /include http://engmaster.ru/idiom/page-1#zx
// @include http://engmaster.ru/idiom/page-*#xz
// @exclude http*://www.google.com/reader/*
// @version 1
// @created 2014-02-29
// @updated 2014-06-31
// @grant GM_setValue
// @grant GM_getValue
// @run-at document-end
// ==/UserScript==
'use strict';
var lh=location.href;
//
var n,ln,lm=lh.match(/(.*\/page\-)(\d+)(#xz)/);
var ls,blk,iblk,txt='';
if( lm && lm[3] ){
n= +lm[2];
ln=lm[1]+ ++n;
console.log(ln);
blk = document.querySelectorAll(".hrblock")
 //console.log(blk);
for(var j,jl,i=0,il=blk.length; i<il && i<9999 ; i++ ){
  var k=i;//il-i-1;
  iblk=blk[k].querySelectorAll("span.comm");
  for( j=0,jl=iblk.length; j<jl; j++ ){ 
   iblk[j].textContent=" - ";
  }
  var t = blk[k].textContent;
  t = t.replace(/[\n\r]/g," ").
  replace(/\s\s+/g," ").replace(/^\s/,"").replace(/\s$/,"").
  replace(/"/g,'\\"');
  txt += t+"^\\\n";
}

ls ='';
ls = localStorage.getItem('engiom');
//console.log('ls:\<"'+ls+'>');
if(n>2) ls = localStorage.getItem('engiom');
 else ls='', console.log('new '+n);
ls += txt;
localStorage.setItem('engiom',ls);
document.body.innerHTML='<pre><code>"\\\n'+ls+'"</pre></code>';
window.scroll(0,document.body.scrollHeight);
setTimeout(
function(){
  if(n<50){
   unsafeWindow.location.href=ln+"#xz";
  }
  else{
   localStorage.deleteItem('engiom');
  }
},1000);
}
