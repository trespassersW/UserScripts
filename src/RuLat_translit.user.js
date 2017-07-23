// ==UserScript==
// @name        RuLat_translit
// @namespace   oujsForum
// @description russian -> polish transliteration
//   !!! affects all sites in .ru domain :::
// @include /^https?.+\.ru(\/.*)?$/
// @exclude http*://www.google.ru/reader/*
// @author trespassersW
// @license  MIT
// @version 2017.07.23
// @run-at document-end
// @grant none
// ==/UserScript==
(function(D){
const rabc={
 'а':"а", 'б':"b", 'в':"w", 'г':"g", 'д':"d", 'е':"je"
,'ё':"yo", 'ж':"ż", 'з':"z", 'и':"i", 'й':"j", 'к':"k"
,'л':"l", 'м':"m", 'н':"n", 'о':"о", 'п':"p", 'р':"r"
,'с':"s", 'т':"t", 'у':"u", 'ф':"f", 'х':"ch", 'ц':"c"
,'ч':"cz", 'ш':"sz", 'щ':"szcz", 'ъ':"`", 'ы':"y", 'ь':"'"
,'э':"e", 'ю':"ju", 'я':"yа", 'А':"А", 'Б':"B", 'В':"W"
,'Г':"G", 'Д':"D", 'Е':"Je", 'Ё':"Yo", 'Ж':"Ż", 'З':"Z"
,'И':"I", 'Й':"J", 'К':"K", 'Л':"L", 'М':"M", 'Н':"N"
,'О':"О", 'П':"P", 'Р':"R", 'С':"S", 'Т':"T", 'У':"U"
,'Ф':"F", 'Х':"Ch", 'Ц':"C", 'Ч':"Cz", 'Ш':"Sz", 'Щ':"Szcz"
,'Ъ':"`", 'Ы':"Y", 'Ь':"'", 'Э':"E", 'Ю':"Yu", 'Я':"Ya"
};
function rulat(s){
for (var c,r, a=s.split(''), lat='', k=a.length, i=0; i<k; i++)
 r=a[i],c=rabc[r],lat+= c? c : r;
return lat;
}
D.innerHTML=rulat(D.innerHTML);
})(document.body);
