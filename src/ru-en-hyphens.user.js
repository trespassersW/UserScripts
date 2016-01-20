// ==UserScript==
// @name      ru-en-hyphens
// @namespace trespassersW
// @description пере-нос слов / hyphen-ation
// @license   MIT
// @author    trespassersW
// /source https://github.com/trespassersW/UserScripts/raw/master/src/ru-en-hyphens.user.js
// @version 2016.01.20
// @include        http://*
// @include        https://*
// @include        file://*
/* about:config -> greasemonkey.fileIsGreaseable <- true */
// @grant GM_registerMenuCommand
// @grant GM_setValue
// @grant GM_getValue
// @run-at document-start
// ==/UserScript==
/*================
Смотрим на заголовок страницы и пытаемся понять,
на каком языке написан документ. Если в заголовке нет
сведений о языке, то ищем букву йе в тексте страницы.
В зависимости от результата устанавливаем тэг 
<html lang="ru"> или <html lang="en">,
необходимый для включения модуля расстановки переносов.
==================*/

//"use strict";

var defaultLanguage=''; //'ru' 'en'
var ye='е'; //'\u0435';

function stickStyle(css){
 var s=document.createElement("style"); s.type="text/css";
 s.appendChild(document.createTextNode(css));
 return (document.head||document.documentElement).appendChild(s);
}
var Id='ruEnHyhpens';
window[Id]=stickStyle(
'div,p,li,td, dd {\n'+
'-moz-hyphens: auto; -webkit-hyphens: auto; hyphens: auto;\n'+
'}\n'+
'h1,h2,h3,h4,th,\n'+
'[class*="button"],[class*="menu"],[id*="button"],[id*="menu"]\n'+
',[class*="button"] *,[class*="menu"] *,[id*="button"] *,[id*="menu"] *\n'+
',[class^="b-head__layout-column"] *\n'+ //yandex
'{\n'+
'-moz-hyphens: none !important;\n'+
'-webkit-hyphens: none !important;\n'+
'hyphens: none !important\n'+
'}'
);
window[Id].disabled = !!GM_getValue(Id,false);
GM_registerMenuCommand('hyphens '+
(window[Id].disabled?'on/OFF':'off/ON'),
function(){
  GM_setValue(Id,window[Id].disabled=!window[Id].disabled);
  var st='ru-en-hyphens '+(window[Id].disabled?'OFF':'ON');
  console.log(st);
  try{window.status=st}catch(e){}
} );
/**/
// 

window.addEventListener('DOMContentLoaded',
function(){
var d=document.body;
if(!d) return;

function metaCharset(){
 var d=document.head;
 if(!d) {_log('headless'); return'x3'};
 var meta=d.getElementsByTagName('meta');
 var re=/charset\s*=\s*([a-zA-Z0-9\-]+)/i;
 for (var i=0; i< meta.length; i++){
  var cont=meta[i].content;
  if(!cont || !meta[i].httpEquiv ) continue;
  var r=cont.match(re);
  if(r && r[1]) return r[1].toLowerCase();
//   _log( 'X3: '+cont );
 }
  return 'X3';
}

function xml_lang(){
 var xl=document.head.parentNode.attributes.getNamedItem('xml:lang');
 // does.anyone.know.if_there_is_a.direct_path_to(this.place)
 return xl ? xl.value: '';
}

function analBody(){
 var e= document.body.textContent.indexOf(ye);
 return e>0? 'ru': 'en';
}

function _log(s) 
{/**/
  var h=location.href+'';
  if( h.match(/\#\.[0-9A-F]{2}/) )
   h =h.replace(/\.([0-9A-F]{2})/g,'%$1');
  h=_utf8_decode(unescape(h));
  console.info('hyphens'+(window[Id].disabled?'OFF ':'ON ')+h+'\n'+s);
}
function _utf8_decode (ut) {
    var s = [], i = 0, c, len = ut.length;
    while ( i < len ) {
      if ((c = ut.charCodeAt(i++)) < 128) 
          s.push(String.fromCharCode(c));
      else if((c > 191) & (c < 224)) 
          s.push(String.fromCharCode(((c & 31) << 6) | 
          (ut.charCodeAt(i++) & 63)));
      else 
          s.push( String.fromCharCode(((c & 15) << 12) | 
          ((ut.charCodeAt(i) & 63) << 6) | 
          (ut.charCodeAt(i+1) & 63))), i+=2;
    } return s.join("");
/**/}

//https://developer.mozilla.org/en/Character_Sets_Supported_by_Gecko
var charsetZoo={
'ibm-855':'ru',
'iso-8859-5':'ru',
'iso-ir-111':'ru',
'koi8-r':'ru',
'maccyrillic':'ru',
'windows-1251':'ru',
'cp-866':'ru',
'koi8-u':'ru',
'ibm-850':'en',
'iso-8859-1':'en',
'iso-8859-15':'en',
'macroman':'en',
'windows-1252':'en'
};

/**/
 d=d.parentNode; 
 var lg;
 var lng=metaCharset();
 lg=charsetZoo[lng]; // highest priority
 if( lg ){
    d.lang=lg;
    _log('meta charset='+ lng +' -> ' + lg);
    return;
 }
 lg=d.lang;
 if( lg ){
//    d.lang=lg;
    _log('html lang='+lg);
    return;
 }
 lg=xml_lang();
 if( lg ){
    d.lang=lg;
    _log('html xml:lang='+lg);
    return;
 }
 lg=defaultLanguage;
 if( lg ) {
    d.lang=lg;
    _log('default='+lg);
    return;
 }
 lg=analBody();
 d.lang=lg;
 _log('analyse='+lg);
 return;

});
