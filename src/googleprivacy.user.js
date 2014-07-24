// ==UserScript==
// @name           googlePrivacy
// @namespace      download
// @description    Gets rid of almost every google tracking device I could find.
// @include        http://www.google.*
// @include        https://www.google.*
// @include        http://images.google.*
// @include        https://images.google.*
// @include        http://news.google.*
// @include        https://news.google.*
// @include        https://encrypted.google.*
// /include        file://*
// /grant GM_log
// @run-at document-start
// ==/UserScript==

(function () { "use strict";
function _log(s){
 console.log(s);
}
function toObj(s) {
	var r = {}, c = s.split('&'), t;
	for(var i = 0; i < c.length; i++) {
		t = c[i].split('=');
		r[decodeURIComponent(t[0])] = decodeURIComponent(t[1]);
	}
	return r;
}
var ixa=888;
function anchorMatch(a) {
	for(ixa =0; a && ixa<3; a = a.parentNode) if(a.localName == 'a') return a;
	return null;
}
function onDown(e) {
	var a = anchorMatch(e.target);
	if(a && a.localName == "a") {
		var m = a.getAttribute("onmousedown");
		var h = a.getAttribute("href");
		
		if(m && m.indexOf("return") == 0) {
  _log('patch.'+ixa+' '+h);
			a.removeAttribute("onmousedown");
		} else if(h) {
			if(h.indexOf("http://") == 0) h = h.substr(h.indexOf("/", 7));
      else if(h.indexOf("https://") == 0)   h = h.substr(h.indexOf("/", 8));
			if(h.indexOf("/url?") == 0) {
  _log('spoil '+h);
				h = toObj(h.substr(5));
				a.setAttribute('href', decodeURIComponent(h.url || h.q));
				a.setAttribute('rel', 'noreferrer');
			}
		}
	}
}
if(document.title.indexOf("Google News") != -1 || location.pathname.indexOf("/news") == 0) {
	var a=document.querySelectorAll(".title a, .sources a, .source-link a, .additional-article a, .thumbnail a");
	addEventListener("mousedown", function(e) {
		var c = anchorMatch(e.target);
		for(var i = 0; i < a.length; i++) {
			if(c == a[i]) return e.stopPropagation();
		}
	}, true);
}else {
	addEventListener("mousedown", onDown, true);
}
_log('gp');
})();