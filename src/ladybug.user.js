// ==UserScript==
// @name        ladybug
// @namespace   trespassersW
// @description CSS3 transition experiment
// /include http://openuserjs.org
// /include https://*.mozilla.org/*
// @include *
// @version     3
// @grant GM_log
// @grant GM_addStyle
// icon source: http://icones.pro/en/animal-insect-ladybug-png-image.html © GPL
// ==/UserScript==
"use strict";
var gMyxSetXY; // gMyxSetXY( window.innerWidth+25, window.innerHeight+25 );
(function(){
var _clik =0,
    _log = 0 || _clik,
    _whither = 0;
var _l = 
  _log == 1 ? 
  console.log.bind(console) :
 function (){};



var mp={x:-25,y:-25,a:0,xx:0,yy:0,tH:null, hH: null, scale: 1}; 
var gmfly; 
var _sk=0; //45
var wK= navigator.userAgent.indexOf("WebKit")>=0 ?
 "-webkit-" : "" ;
var TM=wK+"transform", TN=wK+"transition";

_l(navigator.userAgent+'\n'+TN+'  '+TM)
function _i(x,d){
 if(!d) return Math.round(x);
 d = Math.pow(10,d) ;
 return Math.round(x*d)/d;
}

function onTout(){
 winClick();
 mp.tH=null;
}

function onHover(e){
 var n=gmfly;
 if( !n ) return;
 target( 0, mp.a, 'all 2s linear .25s')
}

function onMove(e){
 mp.xx =  e.clientX, 
 mp.yy =  e.clientY;
 if(!mp.tH)
  mp.tH = window.setTimeout(onTout,750);
}

function winClick(e){
 var n,x,y,a, t="X";
 if( !(n=gmfly) ) return;
 if(!mp.hH)
  mp.hH=onHover,
  gmfly.addEventListener("mouseover", onHover, false);
 x =  (e ? e.clientX : mp.xx)-16; 
 y =  (e ? e.clientY : mp.yy)-16;

 var cx =  parseInt(n.style.left);
 var cy =  parseInt(n.style.top);
	mp.x=cx, mp.y=cy;

	x = x - mp.x , y=  mp.y - y;
 if( x*x+y*y < 5 ) return;
 a= Math.atan2(x,y)*180 / Math.PI; // 90 -atan2(y x
 a=_i(a,1);
 mp.x = mp.x + x, mp.y = mp.y - y; 
 n.style.left = mp.x+'px',
 n.style.top  = mp.y+'px';
 // a couple of pitfalls..
 t=""
 if( (a*mp.a) < 0 && (Math.abs(a-mp.a)>180))  t=a, a+= a<0 ? 360 : -360; 
 if(_log) _l("x="+ x +"; y="+ y +"; t="+ t +"; oa="+mp.a +'; na='+ a);
 mp.a = a;
 _whither(mp.x+16, mp.y+16, mp.a);
 t= _i(3 + Math.random()*4, 2);
 target( mp.scale, mp.a, 
 'all '+t+'s  cubic-bezier( 0.2,0.4,  0.7,1.0 ) 0.0s');
}

function target( scale, angle, transit ){
 var n=gmfly;
 n.style[TM]='scale('+scale+')  rotate('+(angle+_sk)+'deg)';
 n.style[TN]=transit;
}

function onWheel(e){ 
 var n=gmfly;
 var dY= wK ? - 1/40 * e.wheelDelta : e.deltaY;
 mp.scale -= ((dY>0)*2-1)*0.25;
 if(mp.scale<0.5) mp.scale=0.5;
 if(mp.scale>5) mp.scale=5;
 if(mp.hH) 
  n.removeEventListener("mouseover", mp.hH, false), mp.hH=null;
	target( mp.scale, mp.a, 'all 0.5s linear 0s');
// e.preventDefault(), e.stopPropagation();
 return 0;
}

function bugClick(e){
 var n=gmfly;
 target( 0, mp.a, 'all 0.25s linear 0s')
 var t= 5000+Math.random()*55000;
 if(mp.tH) window.clearTimeout(mp.tH);
 mp.tH=window.setTimeout(onTout,t); 
}

function buildEl(type, attrArray, eL, html) {
	var node = document.createElement(type);
	for (var attr in attrArray) 
		if (attrArray.hasOwnProperty(attr))
			node.setAttribute(attr, attrArray[attr]);
	if(eL)
		node.addEventListener(eL[0], eL[1], eL[2]?true:false);
	if(html) 
		node.innerHTML = html;
	return node;
}

function throwStyle(css){
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof PRO_addStyle != "undefined") {
	PRO_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	var node = document.createElement("style");
	node.type = "text/css";
	node.appendChild(document.createTextNode(css));
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		heads[0].appendChild(node); 
	} else {
		// no head yet, stick it whereever
		document.documentElement.appendChild(node);
	}
}
}

throwStyle('\
#gMyx {\
position: fixed; left: -25px; top: -25px;\
z-index: 1147483647 !important;\
cursor:\
url(data:image/png;base64,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\
) 1 1 ,auto;\
}\
#gMyx:not(:hover):before{\
position: absolute;\
left: 15px; top: -2px;\
height: 0; width: 0; content: "";\
border-style: solid;\
border-color: transparent transparent #A21 transparent;\
border-width: 0  1px 6px 1px;\
}\
');


var img64=
"data:image/png;base64,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";
//img64='Myxa.png';

gmfly = buildEl(
 'div',
 { id:"gMyx", style: 'left:' +mp.x+ 'px; top:' +mp.y+ 'px;' },
//  null,
 ['click', bugClick], 
  "<img src="+img64+">"
	);

gmfly.addEventListener((wK?"mouse":'') + "wheel", onWheel, false);

document.body.appendChild(gmfly);
if(_clik)
document.addEventListener("mousedown", winClick, false);
else
document.addEventListener("mousemove", onMove, false);
gMyxSetXY = function(x,y){
 gmfly.style.left= mp.x=x; gmfly.style.top=mp.y=y;
}
/* */
if( !_whither ) {
 _whither= function() {};
} else {
var coursour = document.body.appendChild(buildEl(
'div',
{id: 'coursour', left: '-100px', top:'-100px' },
null,''//"↑"//
));
_whither = function(x,y,a) {
  coursour.style.left = (x-5)+'px';
  coursour.style.top  = (y-5)+'px';
  if(a) coursour.style[TM]  = 'rotate('+a+'deg)';
}
throwStyle('\
#coursour{\
position: fixed;\
border: 0.5px solid #077;\
border-radius: 3px;\
width: 3px; height: 3px;\
background-color: #F80;\
left:-6px; top:-6px; \
z-index: 2147483647; \
}\
#coursour:before{\
position: absolute; content:"";\
left:-24px; top: -24px;\
border-style: solid;\
border-color: transparent transparent #A21 transparent;\
border-width: 0  3px 24px 3px;\
}\
'
);
}


/* */
})();
