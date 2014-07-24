// ==UserScript==
// @name        userstyles forum spamfilter
// @namespace   trespassersW
// @description hides/hilites several posts at forum.userstyles.org
// @include http*://forum.userstyles.org/*
// @license Public Domain
// @created 2014-06-25
// @updated 2014-07-14
// @version 2.014.0714.4
//  + persistence; *patch; * initstate=Show 
//  * authors blacklist
// @run-at document-end
// @grant GM_none
// ==/UserScript==
// inspired by hideheader

(function(){ 
// either 'string' or /RegEx/ in post title
var titlez = [ 
/\b(?!201\d)[\d+-]{10,}?/ // phone numbers
/*  */
,/[^\u0000-\u2FFF\uFB00-\uFFFF]/ // CJK ideographs
,/[\u0400-\u04FF]{3,}?/ // cyrillic
/* */
];
// 'string' or /RegEx/ in author's userprofile href
var authorz = [
  /jasonbar/i
, /notthema/i
,'/hidehead'
,/\/(N|M)+[^\db-nzp-y]?[cKkC]{1,2}O([.+mX{6,9}?n])[^\We-zca]o$/i
,'/freecybe'
,'/december'
,'/trespass'
/*'/vilespammer'*/
/* */
];

var C=0,CS=0,CA=0,S,E;
var locStor, filtnam="spamfilter"; 
function toggleSpam(x){
 var t = ('N'===x)? false: ('Y'===x)? true: !S.disabled;;
 S.disabled = t;
 E.innerHTML= (t?'hide':'show')+' ['+C+']';
 locStor && locStor.setItem(filtnam,t?'Y':'N');
}

function stickStyle(css){
 var s=document.createElement("style"); s.type="text/css";
 s.appendChild(document.createTextNode(css));
 return (document.head||document.documentElement).appendChild(s);
}

function islisted(tc, bl){
 if(tc) try{
 for(var j=0,lj=bl.length; j<lj; j++) {
  if( typeof bl[j] === "string" ) {
    if( (tc.indexOf(bl[j])>-1) ) return j+1; 
  }else if( typeof bl[j].test === "function" ) { // regex ?
    if( bl[j].test(tc) ) return j+1; 
  }else throw "bad titlez";
 };
 } catch(e){ console.log(e+'\n j:'+j+'; tc:'+tc+'; bl:'+bl) }; 
 return 0;
}
//html body#vanilla_discussion_index.Vanilla div#Frame div#Body div.Row div#Content.Column div.MessageList div#Discussion_42915.Item
var a; //(c) hideheader
a = document.querySelectorAll('#Content .DataList > li.Item');
if(a) for (var ix,i=0, li=a.length, t; i<li; i++) {
  t=a[i].querySelector(".Title");
  if(t && (ix=islisted(t.textContent, titlez))){
     a[i].classList.add('forum-uso-spam'+ix); C++,CS++;
     continue;
  }
  if(authorz.length){
  t=a[i].querySelector(".LastCommentBy >a") ||
    a[i].querySelector(".Author >a");
  if(t && (ix=islisted(t.href, authorz))) {
     a[i].classList.add('forum-uso-author'+ix); C++,CA++;
     continue;
  }}
}

if(!C) return; // all clear

 E=document.createElement('div');
 E.id="forum-uso-spam-info";
 E.addEventListener('click',toggleSpam,false);
 document.body.appendChild(E);
 stickStyle('\
#forum-uso-spam-info{\
position:fixed;\
left:2px;top:2px;\
background:rgba(255,255,255,.255);\
border:none;\
color:red;\
text-shadow: #411 2px 2px 4px, #F11 -2px -2px 4px;\
cursor:pointer;}\
.forum-uso-spam-info.fus-off{\
color:green;\
text-shadow: #141 2px 2px 4px, #1F1 -2px -2px 4px;\
}\
li.Item[class*="forum-uso-spam"]{\
border: dotted red!important;\
border-width: 1px 0px 1px 2px !important;\
background-color:#FFFFF0}\
li.Item[class*="forum-uso-author"]{\
border: dotted maroon !important;\
border-width: 1px 0px 1px 2px !important;\
}\
li.Item.forum-uso-spam1 {background-color:#FFF0FF}\
li.Item.forum-uso-spam2 {background-color:#FFFCF4}\
li.Item.forum-uso-spam3 {background-color:#FFF6F6;\
background-image: repeating-linear-gradient(180deg , #FFF, #BFBFFF 3em, #BFBFFF 6em)}\
li.Item.forum-uso-author1 {\
background-image:repeating-linear-gradient(90deg, #FFBFBF, #FFF 15em, #FFBFBF 30em)}\
li.Item.forum-uso-author2 {\
background-image:linear-gradient( 45deg, #DDF, #DFD)}\
li.Item.forum-uso-author3 {\
background-image:linear-gradient( 90deg, #DFD, #FDD)}\
li.Item.forum-uso-author4 {\
background-image:linear-gradient( 45deg, #FDD, #DFF)}\
li.Item.forum-uso-author5 {\
background-image:linear-gradient( 90deg, #DFF, #FDD)}\
li.Item.forum-uso-author6 {\
background-image:linear-gradient( 45deg, #FDD, #FDF)}\
li.Item.forum-uso-author7 {\
background-image:linear-gradient( 90deg, #FDF, #FFD)}\
');
 S=stickStyle('\
li.Item[class*="forum-uso-"] * {display:none!important;}\
li.Item[class*="forum-uso-"] {padding:0!important;margin:0!important;}\
');
var sh;
try {
  locStor = window.localStorage;
  sh=locStor.getItem(filtnam);
} catch(e){ locStor=null; }
 toggleSpam(sh||'Y');
console.log('us.o forum: '+ C);
})();