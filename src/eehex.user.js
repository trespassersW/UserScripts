// ==UserScript==
// @name        eehex
// @namespace   greasyforum
// @description replace [e]XXXX[/e] with &#xXXXX;
// @include https://greasyfork.org/*/forum/discussion/*
// @include file:///E:/RES/testo.htm
// @run-at document-end
// ==/UserScript==
var re=/\[e]([0-9a-fA-F].+?)\[\/e]/g;
function eehex(s){
  return s.replace(re,
         function(m, p1){ return '&#x'+p1+';'; }
        );
}
var  eeserver = new MutationObserver(function(muts) {
   var m, t, tc;
  for( var  i=0; i<muts.length ; i++){
   if( !(m=muts[i]) && !(t=m.target)) continue;
   var nn=m.addedNodes, n, nl=nn.length;
   for( var j=0;  j<nl  ; j++){
     if( (n=nn[j]) && (tc=n.innerHTML)  ){
      if ( re.test(tc) ) n.innerHTML=eehex(tc);
    }
  }}
});
if(document.body && ~document.body.innerHTML.indexOf('[/e]'))
 document.body.innerHTML=eehex(document.body.innerHTML);
eeserver.observe(document, { attributes: true, subtree:true, childList: true  } );