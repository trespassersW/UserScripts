// ==UserScript==
// @name           translate.google tooltip
// @namespace      trespassersW
// @author      trespassersW
// @copyright   trespassersW
// @license     MIT
// @description    Translates selected text into a `tooltip' via Google translate 
// @include        http://*
// @include        https://*
// @include        file://*
//  about:config -> greasemonkey.fileIsGreaseable <- true
// @homepageURL https://openuserjs.org/scripts/trespassersW/translate.google_tooltip
// @version 3.7.73
//* This is a descendant of lazyttrick's  http://userscripts.org/scripts/show/36898.
// 3.7.7 2015-04-24 ** exterior
// 3.7.2 2015-04-20 * TTS: alt-select text inside tooltip and [ctrl/shift]-click language icon below
//   * [shift] tts window in IFRAME (: only works on google.* and file://* :(
//   * [ctrl] tts window in new tab
// 3.6.2.2 2015-04-19 * gray gradient background 
// 3.6.1 2015-04-17   + selectable background color
// 3.5.1 2015-04-15
//  + TTS: alt-select text inside tooltip and shift-click language icon below
//  * From<->To buttons fix; * err handler
// 3.4.1 2015-04-09 * GT changes: GET prohibited - use POST
// 3.0.0 
//  - national flags icons -- from www.senojflags.com
// 2.3
//  - new editable 'source text' field
// 2.2.2 
//  - backward translation - select text inside tooltip and click the icon under your selection.
// 2.2.1
//  - Ctrl-Alt-click removes item from the history of translations
//  - Ability to change translation in the history -
//    select desired translation in the tooltip window using ctrl or alt -
//    which one is checked in your settings - then click on the icon below the selection.
// 2.2 
//  - history of translations 
// 2.1.2
//  - Selected text is fetched in the moment when you hover over the icon.
//    So, you can select a few letters, then adjust your selection using shift + arrows. 
// 2.0.0d
// - native GT languages list
// 2.0.0c 
// Alt key option added
// If something goes wrong:
// Tools->SQLite manager-> Database-> Connect_database->
//  %YourBrowserProfile%\gm_scripts\translate.google_tooltip.db ->
//  scriptvals->  alt/ctrl <- false
// 2.0.0b 
// - exit by ESC
// - 1k letters limit -- don't strain your Google
//
//*/
// /grant GM_addStyle
// @grant GM_getValue
// #grant GM_log
// @grant GM_openInTab
// @grant GM_setValue
// @grant GM_xmlhttpRequest
// @icon  data:image/jpg;base64, R0lGODlhIAARALP/AAAAAP///xMYfAqf////Zv/qDuCeH8VmB8DAwAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAgALAAAAAAgABEAQASdEMlJgb00awkMKQZYjB8RBsE4AtLQvtt0sXHcEcT1pbxK0hsXRmYIGUUgA3DiQjQtssInRAjglMsa4ibtlqSGgECQymmaAwDYUhSFfKoQDQ3LdA6Hoh6qbW4sJHpFWTUAOEA3Vj1WZjF+HQU9X18oPxl0Wx4kXoFiZF1zMEJgbW8qJnAHoU4takocpW5IIISYGh1HRlh9hRZ4eIRaEQA7
//
// ==/UserScript==

if(document.body){ 

main = function (){ "use strict";

var   GTsuffix=".com"; // ".fr" ".de" ".ru" ".com"

var   GTurl= "https://translate.google"+GTsuffix+"/?"; 
var dictURL= "https://translate.google"+GTsuffix+"/translate_a/t?client=t";
var  ttsURL= "https://translate.google.com/translate_tts?client=t";
var version= 3600;

var HREF_NO = 'javascript:void(0)';

var llii=0, _log = function(){ /* * /
 for (var s=++llii +':', li=arguments.length, i = 0; i<li; i++) 
  s+=' ' + arguments[i];
 console.log(s)
/* */
}
_log("tgtt..");
var URL='*'; var tURL;
var GT_tl='auto';
var body;

//{[ hacks
var UA = navigator.userAgent;
0 && (UA="Mozilla/5.0 (Windows NT 5.1; rv:37.0) Gecko/20100101 Firefox/37.0");
var ano="";
0 && (ano= "http://anonymouse.org/cgi-bin/anon-www.cgi/");
//}]
var senoj="http://www.senojflags.com/",
senojflags = [ano+senoj+"?gtrantoltip#" ],
seno=ano+senoj,
senoimg=seno+'images/national-flag-icons/';
//
//function GM_log(t){console.log(t);}

var res_dict='gt-res-dict'; //'gt_res_dict';
var  languagesGoogle, isInited=false;
var rtl_langs="ar fa iw ur";
var inTextArea= null;
var maxHT=20, maxWC=3;
var sourceBH = 3, sourceDP =10;
var ht=null;  // history table, 

var imgForw,imgBack,imgSwap,imgUse,imgSave,imgFlags,imgForwSrc,imgBackSrc;
var txtSel; // text selected
var currentURL, Qtxt='***';
var gt_sl_gms, gt_tl_gms, gt_sl, gt_tl;

var sT;
var noMup=0;
var _G = "-moz-linear-gradient",_T='transparent';
var G_ ='rgba(0,0,0,.1)';
var BG={
t:  ["yellow" ,"grey"   ,"blue"   ,"green"  ,"pink"   , "striped"],
C:  ['#FFFFE1','#D1D1D1','#D3ECEC','#C4FFC4','#FFE6E6',
    _G+'(-45deg, #DDD, #AAA )'],
//T:  ['#DDDDAA','#A0A097','#8CCCCE','#6BEF69','#FFC6C8',
//    '-moz-linear-gradient(to right, #CCC, #888)'],
T:  [_G+"(to right,#FFFFE1,#DDDDAA)", _G+"(to right,#D1D1D1,#A0A097)",
     _G+"(to right,#D3ECED,#8CCCCE)", _G+"(to right,#C4FFC4,#6BEF69)",
     _G+"(to right,#FFE6E6,#FFC6C8)", _G+"(to right,#CCC, #888)"],
//'#F9E78F','#C1C1B7','#BCD1D1','#AAEEAA','#E8D0D0','rgba(0,0,0,.1)'     
H:  [_T,_T,_T,_T,_T,_G+'(to bottom right,rgba(127,127,127,0),rgba(127,127,127,.15))'
    ],
E:  ['#F4F4E8','#EEEEEE','#E8E8F4','#E8F4E8','#F4E8E8','#DDDDDD'],
f:  [function(){css(0)}, function(){css(1)}, function(){css(2)},
     function(){css(3)}, function(){css(4)}, function(){css(5)}]
}

function mousedownCleaning(evt){
	var divDic = getId('divDic');
	var divLookup = getId('divLookup');
  var dU = getId('divUse');
  var t=evt.target;
  noMup=0; // patch :/
	if(divDic)	{
		if(!clickedInsideID(evt.target,'divDic')){
      evt.preventDefault(),evt.stopPropagation(); 
      if(dU && clickedInsideID(t,'divUse')){
        if(clickedInsideID(t,'divGetback')) forwLookup(evt); else
        if(clickedInsideID(t,'divGetforw')) backLookup(evt); else
        if(clickedInsideID(t,'imgUse')) useClick(evt); else 
        _log('x3 click');
        return;
      } 
      else 
       cleanUp('MC');
	  }	else killId(dU);
  }
	killId(divLookup);
		
}

var documentcontentEditable=false;
var documentdesignMode  = '';
var divExtract;
function cleanUp(s){
 _log(s);
 var d=getId('divSourcetext');
 if(d) sT= d.value;
 killId('divDic');
 killId('divExtract'); 
 killId('divLookup'); 
 killId('divUse'); 
 killId('divBack'); 
 killId('divSelflag'); 
 killId('divTtsIfr');

 //divExtract='';
 if(documentcontentEditable)
    documentcontent.Editable=documentcontentEditable,
    documentcontentEditable = false;
 if(documentdesignMode == 'on')
    document.designMode='on',
    documentdesignMode=null;
}

function useClick(e){
  killId('divUse');
  if(e.shiftKey)  ht[0][1] += ' '+txtSel;
  else  ht[0][1] = txtSel;
  GM_setValue('hist',JSON.stringify(ht));
  if(getId('divHist')){
   killId('divHist');
   history();
  }
}
var last_tl, last_sl;
function backLookup(e){
    if(e.shiftKey || e.ctrlKey) { 
    noMup=1;
    ttsRequest(txtSel,gt_tl, e.ctrlKey!=0);
    return;
    }
    killId('divUse');
    gtRequest(txtSel,gt_sl,gt_tl);
   	currentURL = GTurl +  "langpair=" + gt_sl + "|" + gt_tl + "&text=" + escAp(txtSel);
}
//GET https://translate.google.com/?langpair=en|ru&text=Varnish
//POST https://translate.google.com/translate_a/t?client=t&hl=ru&sl=en&tl=ru&text=Varnish
function forwLookup(e){
    if(e.shiftKey || e.ctrlKey)  { 
    noMup=1;
    ttsRequest(txtSel,gt_sl, e.ctrlKey!=0);
    return;
    }
    killId('divUse');
    var t=gt_tl; gt_tl=gt_sl; gt_sl=t;
    gtRequest(txtSel,gt_sl,gt_tl);
   	currentURL = GTurl +  "langpair=" + gt_sl + "|" + gt_tl + "&text=" + escAp(txtSel);
}
 var Gctrl, Galt;
 var sayTip="\n[shift / ctrl] listen (";
function showLookupIcon(evt){
  Gctrl=GM_getValue('ctrl',false), Galt=GM_getValue('alt',true);
	if((!evt.ctrlKey && Gctrl)
	 ||(!evt.altKey && Galt)
//  to avoid collision
	 ||(evt.ctrlKey && !Gctrl)
	 ||(evt.altKey && !Galt)
   ) return;
  evt.preventDefault(),evt.stopPropagation(); 

	var divDic = getId('divDic');
	var divLookup = getId('divLookup');
	txtSel = getSelection(evt.target)+'';
  if(txtSel.length>1024){  
   return;  
  }
	//exit if no text is selected
	if(!txtSel || txtSel===""){
    _log('S:notext ')
		if(divDic)		{
			if(!clickedInsideID(evt.target,'divDic'))
				cleanUp('no sel');
		}
		if(divLookup){
			killId(divLookup);
    }
    return;
	}
	//possible cleanup
	if(divDic){
		if(!clickedInsideID(evt.target,'divDic'))
			{cleanUp('!divdic');		return; }
  // inside divDic:
    var dU=getId('divUse');
    if(dU){
      if(!clickedInsideId('divUse')){
        killId(dU);
      } return;        
	  }
    try{
    var p= belowCursor(evt,10,10,'r');
    var divUse= buildEl('div', {id:'divUse',
    style:'z-index:11000; border: none'+
    ';top:'  + p.t  +';left:' + p.l  +';right:' + p.r +';bottom: auto;'
    },  null, null );

    var iTo = getFlagSrc(gt_tl,'to');
    var divForw=buildEl('span', {id:'divGetforw', // 'class': 'gootranslink', href: HREF_NO,
    //border: 0, src: iTo,
    title: gt_sl_gms + '\u2192 '+gt_tl_gms +sayTip+gt_tl+')'},
    null, imgH+iTo+imgT);
//   	['mousedown', forwLookup], imgH+iTo+imgT); 
    divUse.appendChild(divForw);
    
    var iFrom = getFlagSrc(gt_sl,'from');
    var divBack=buildEl('span', {id:'divGetback', //'class': 'gootranslink',  href: HREF_NO,
    //border: 0, src: iFrom,
    title: gt_tl_gms + '\u2192 '+gt_sl_gms +sayTip+gt_sl+')'},
    null, imgH+iFrom+imgT);
//   	['mousedown', backLookup], imgH+iFrom+imgT);
    gt_sl !='auto' && divUse.appendChild(divBack); 

    addEl(divUse,'img',{id: 'imgUse', border: 0, 
    title: 'use in history\n[shift] add to history', src: imgUse}, 
    null,null);

//    tp=(evt.clientY+window.pageYOffset+30)+'px';
//    lf=(evt.clientX+window.pageXOffset+30)+'px';
    body.appendChild(divUse);
    }catch(e){console.log('use hist\n'+e)}
    return;
  }
  // inside page
  if(!isInited) {css(-1); isInited=true; }
	//remove div if exists
	if(divLookup)
		killId(divLookup);
	//div container
  p = belowCursor(evt,10,10);
	divLookup = buildEl('div', {id:'divLookup', style: 'z-index:10000'+
   ';border: none;' +
   ';top:'  + p.t  +';left:' + p.l  +';right:' + p.r  +';bottom: auto'
  }, null, null);

  iTo = getFlagSrc(GM_getValue('to'),'to');
  var iForw=buildEl('img', {'border':0, id:"imgLookForw", style: 'padding-left: 5px',
  src: iTo},  ['mouseover', lookup],null);
  var sl=GM_getValue('from','auto');
  iFrom = getFlagSrc(sl,'from');
  var iBack=buildEl('img', {'border':0, id:"imgLookBack",  style: 'padding-left: 5px',
  src: iFrom},
  ['mouseover', lookup], null); 
   
  if(p.r == 'auto' ){ // left half
	 divLookup.appendChild(iForw);
	 sl != 'auto' && divLookup.appendChild(iBack);
  }else{ // right half
	 sl != 'auto' && divLookup.appendChild(iBack);
	 divLookup.appendChild(iForw);
  }
	body.appendChild(divLookup);
}
function escCleanup(e){
	if(!e.shiftKey && !e.ctrlKey && !e.altKey && e.keyCode==27 )
   cleanUp('esc');
}

function lookup(evt){
 	var divResult = null;
	var divDic = getId('divDic');
	var divLookup = getId('divLookup');
	var top = divLookup.style.top;
	var left = divLookup.style.left;
	var rite = divLookup.style.right;
  var txtS = txtSel; // 2012-08-20
	txtSel = getSelection(inTextArea? inTextArea: evt.target)+'';
  if(!txtSel) txtSel = txtS;
  if(txtSel.length>1024){  
   return;  
  }
	//exit if no text is selected
	if(!txtSel || txtSel==""){
    _log('L:notext')
		if(divDic)		{
			if(!clickedInsideID(evt.target,'divDic'))
				killId(divDic);
		}
		killId('divLookup');
		killId('divDic');
	
		return;
	}	
	//cleanup divs
	killId('divDic');
	killId('divLookup');
	//div container document.body.clientHeight/Width 
	divDic = buildEl('div', 
  {id:'divDic', style: 'top:'+top+';left:'+left+';right:'+rite
  });
	divDic.addEventListener('mousedown', dragHandler, false);
  document.addEventListener('keydown', escCleanup, false); 
	body.appendChild(divDic);
  // patch gmail

  if(document.contentEditable)
    documentcontentEditable = document.contentEditable,
    document.contentEditable = false;
  if(document.designMode == 'on')
    documentdesignMode='on',
    document.designMode='off';

	//div result
	divResult = buildEl('div', 
  {id:'divResult'}, null, 'Loading...');
	divDic.appendChild(divResult);		
/**/ 
  // history
  var divBottom = buildEl('div',{id:'divBottom', align: 'bottom'},null,null);
	addEl(divBottom,'a', 
  {'class':"gootransbutt gootranslink gtlPassive", id:'historyLink', title: 'Translation history',  
   align: 'left', href:HREF_NO}, 
  ['click', history], 'History');
  
	addEl(divBottom,'a', 
  {'class':"gootransbutt gootranslink gtlPassive", id:'sourceLink', title: 'Source', href:HREF_NO}, 
  ['click', source],'Source');
  
	//options link
	addEl(divBottom,'a', 
  {'class':"gootransbutt gootranslink gtlPassive", id:'optionsLink', title: 'Settings', href:HREF_NO},
  ['click', options], 'Options');
  divDic.appendChild(divBottom);
/**/
	//lookup
		gt_sl = GM_getValue('from', 'auto');
		GT_tl = (gt_tl = GM_getValue('to',GT_tl));
    if( evt.target.id== 'imgLookBack' ){
     var t=gt_tl; gt_tl=gt_sl; gt_sl=t;
    }
//"http://www.google.com/translate_t?text=" + txtSel + "&langpair=" + lang;
    gtRequest(txtSel,gt_sl,gt_tl);
}

var IFR;
function eStop(e){e.preventDefault(),e.stopPropagation()}
function openInFrame(url){
  killId('divTtsIfr');
  var dD=getId('divDic');
  var IFR=buildEl('div',{id:'divTtsIfr',style: 'position: relative;padding: 0 !important;margin:3px 0 0 0!important;'},null,null);
  var IFH=addEl(IFR,'div',{id:'divTtsIfh'},null,null);
  addEl(IFH, 'span',{'class':"gootransbutt gootranslink",style: 'color:red!important;'},
  ['click', function(e){killId('divTtsIfr')}],'&#x2716;');
  addEl(IFH, 'a',{'class':"gootransbutt gootranslink", id: 'divTtsLnk',
  href: url, target:"_blank", title: 'play in tab'},
  ['click',
     function(e)
       {eStop(e);GM_openInTab(e.target.href)}
  ],
  '');
  addEl(IFH, 'span', {style: 'margin-left:.5em;' },[],deURI(url));
//  addEl(IFR, 'br');
  addEl(IFR, 'iframe',{
  width: "100%", height: "48", frameborder: "0",scrolling:"auto", marginheight:"0", marginwidth:"0",
  style:'padding-top:3px;overflow-x:hidden;',
  src: url
  },
  null,null);

  insAfter(IFR,getId('divBottom'));
/*
*/
}

function ttsRequest(txt,t,e){
  var etxt = escAp(txt);
  etxt=ttsURL + "&tl="	+ t + "&ie=utf-8&q=" + etxt.split(' ').slice(0,19).join(' ');
  _log('tts> '+etxt);
  if(e)
    GM_openInTab(etxt);
  else
    openInFrame(etxt);
  //GM_openInTab(etxt);
  // sorry, firefox' decodeAudioData() does NOT support mp3
}

function gtRequest(txt,s,t){
  var etxt = escAp(txt);
  currentURL = GTurl + "langpair="	+ s + "|" + t + "&text="+etxt ;
  etxt=GTurl + "langpair="	+ s + "|" + t + "&text=" + etxt.split(' ').slice(0,9).join(' ');
  if( !((s==last_sl && t==last_tl) || (s==last_tl && t==last_sl)) || (divExtract=='')){
    var c=':';
    //_log(s+c+last_sl+ '  '+t+c+last_tl + '  '+ divExtract );
    divExtract = '';
    Request(etxt);
  }else{
 	  extractResult(null);
  }
  last_sl = s; last_tl = t;
}
function Request(url,cb){
  URL=url; _log('R: '+URL);
  var meth=cb? 'POST': 'GET';
  GM_xmlhttpRequest({
			method: meth,
			url: url,
      headers: {	    
        "User-Agent": UA 
       ,"Accept":  "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"
       ,"Accept-Encoding":  "gzip, deflate"
       //,"Host": "www.google.com"
      },
			onload: function(resp) {
				try{
          if(cb)
           cb(resp.responseText)
          else
					 extractResult(resp.responseText);
				}catch(e){
         if(getId('divResult'))
          getId('divResult').innerHTML = 
        '<a id="gttpErrRef" href="#">error processing response text:</a><br>'+e;
          getId('gttpErrRef').href=URL.subsr(0,99);
        }
			}
		});	
}

function quickLookup(){
  gt_sl=getId('optSelLangFrom').value;
  gt_tl=getId('optSelLangTo').value;
  GT_tl=gt_tl;
  saveIt();
  gtRequest(txtSel,gt_sl,gt_tl);
}
function histLookup(e){
  try{
  var txt=e.target.textContent, ix=-1;
                //.innerHTML?? 
  e.preventDefault();
  var ha = getTag('a',getId('divHist'));
//  ix=ha.indexOf(e.target);
/**/
  for(var i=0,l=ha.length; i<l; i++)
   if(e.target == ha[i]){ ix=i; break; }
/**/
  if(ix<0) return;
  if(e.ctrlKey && e.altKey){ //remove itemm
    if(ix==0) return;
    killId('divHist');
    ht.splice(ix,1);
    GM_setValue('hist',JSON.stringify(ht));
    history();
    return;
  }
  var lang = ht[ix][2].match(/([a-zA-Z-]+)\|([a-zA-Z-]+)/);
  gt_sl=lang[1]; gt_tl=lang[2];
  txtSel = txt; 
	getId('divResult').innerHTML = 'Loading...'
  gtRequest(txtSel,gt_sl,gt_tl);
  } catch(e){console.log('broken history\n'+e)}
}

function fastSwap(){
    if(gt_sl != 'auto'){
    var t= gt_sl; gt_sl=gt_tl; gt_tl=t;
    gtRequest(txtSel,gt_sl,gt_tl);
    }
}

function badResponce(html,e){
 var dr=getId('divResult')
 dr.innerHTML = '';
 var br=addEl(dr,'a',{'class':'gootranslink'},null,'Bad Google response');
 br.href=URL.substr(0,100);
 var m=html.match(/\<title\>(.*?)\<\/title\>/);
 if(m && m[1])
  addEl(dr,'p',{},null,m[1]);
 //id="captcha"
 m=html.match(/(<img\s.*?\>)/);
 if(m && m[1])
  addEl(dr,'p',{},null,m[1]);
 _log(html);
 return;
}
var ex_sl , ex_tl;
function extractResult(html){
 if(html){
	var html2 = html.match(/\<body[^\>]*\>([\s\S]+)\<\/body\>/);//[1];//select body content
  if(!html2){ // too many lettters!!!11
    badResponce(html);   return;
  }
	  html2 = html2[1].replace(/\<script[^\<]+\<\/script\>/ig, '');//remove script tags...
	//html2 = html.replace(/\<iframe[^\<]+\<\/iframe\>/ig, '');
	//cleanup
	  killId('divExtract');
	//  killId(res_dict);
	//append translated page as hidden frame
	  var iframe = addEl(document.body,'iframe', 
     {style:'visibility:hidden;'});	
	  var dX = addEl(iframe.contentWindow.document.body,'div', 
     {id:'divExtract'}, null, html2);
	  divExtract = document.importNode(dX, true);
	  iframe.parentNode.removeChild(iframe);
    ex_sl= gt_sl, ex_tl=gt_tl;
  }
  try{ 	//gather info
// 2013-10-20
	var _sl = detectedLang(gt_sl);
	var _tl = detectedLang(gt_tl);
//  var _sl = getXId("gt-sl-gms").textContent; 
//  var _tl = getXId("gt-tl-gms").textContent; 
//  _sl = _sl.replace(/^.*?\:\s*/,''); 
//  _tl = _tl.replace(/^.*?\:\s*/,'');
/* ?!11 150415 */ _log('**',_sl+'>'+_tl)
    if( 1 || ex_sl !== gt_sl ) 
      gt_sl_gms = _sl, gt_tl_gms =_tl; 
    else 
      gt_sl_gms = _tl, gt_tl_gms = _sl; /* ?!11 */
  
  getId('divBottom').removeChild(getId('optionsLink'));
  var oL= buildEl('div', {id:'optionsLink', title: 'Settings', 'class':'gootransbutt'},
  null, null);
  addEl(oL,'a',{id:'optionsFrom','class':'gootranslink'},  
  ['click', options],  gt_sl_gms +' '); 
  addEl(oL,'a',{id:'optionsFast','class':'gootranslink', 
  title: 'swap languages'}, ['click', fastSwap], imgSwap);
  addEl(oL,'a',{id:'optionsTo','class':'gootranslink ' + (getId('divOpt') ? 'gtlActive':'gtlPassive')},  
  ['click', options],  gt_tl_gms );
  getId('divBottom').appendChild(oL);
  }catch(e){ console.log('gather\n'+e); }
  
//	var translation = getXId("result_box").textContent;
// first run: resolve tl = auto
  if(GT_tl == 'auto')try{
    GT_tl=getXId("gt-tl").value;
  	if(GT_tl) GM_setValue('to', GT_tl);
    else GT_tl='en';
    gt_tl=GT_tl;
  }catch(e){console.log('auto?\n'+e)}


	//parse info 
  var dR=getId('divResult');
	dR.innerHTML = '<a class="gootranslink" href="#'+
  '" target="_blank">' + 'translating..' /*translation*/ + '</a>'; // +'<br>&nbsp;';
  dR.childNodes[0].setAttribute('href',currentURL); //<a href
  dR.childNodes[0].setAttribute('title',deURI(currentURL,"&text="));
  dR.style.textAlign = rtl_langs.indexOf(GT_tl) < 0? 'left':'right';
  dR.style.direction = rtl_langs.indexOf(GT_tl) < 0? 'ltr' :  'rtl';
  dR.lang=GT_tl;
  dict();

}

function getSelection(t){
	var txt = '';
	//get selected text
	if (window.getSelection){
		txt = window.getSelection();
	}
	else if (document.getSelection)	{
		txt = document.getSelection();
	}
	else if (document.selection)	{
		txt = document.selection.createRange().text;
	}
  inTextArea= t.type=='textarea' ? t : null
  if(inTextArea){
   txt=t.value.substr(t.selectionStart,t.selectionEnd-t.selectionStart);
  }
	return trim(txt);
}
function swapLang(){
    var to=getId('optSelLangTo').value,from=getId('optSelLangFrom').value;
//    if(from!='auto'){
		 getId('optSelLangTo').value = from;
		 getId('optSelLangFrom').value = to;
     quickLookup();
//    }
}

function saveIt(){
 var bs =getId('gtp-save');
 bs && (bs.className ='gootranslink goounsaved');
}

function options(evt){
	var dO = getId('divOpt');
	if(!dO){//show options
	 dO = buildEl('div', {id:'divOpt' });
   var oL=getId('optionsLink');
   oL.title='Hide settings';
   //
   var dA=getId('divHist');
   if(dA){
  	 insAfter(dO,dA);
   }else if(( dA=getId('divSourceshow')) ){
 		 insAfter(dO,dA);
   }else{
     insAfter(dO,getId('divResult'));
   }
		//from
    addEl(dO,'a',{'class':'gootransbutt gootranslink',
    target:'_blank', href:seno, title: 'choose country flag icon'},
    ['click',function(e){
     e.preventDefault(); GM_openInTab(senojflags[0]); cleanUp(); return false;}], 
    imgH+imgFlags['AN']+imgT);
		addEl(dO,'span', null, null,' From: ');
    var gt_slist = getXId("gt-sl");
    gt_slist= gt_slist ? gt_slist.innerHTML+'' : languagesGoogle; 
/* console.log(gt_slist) /* !!! */

    var oF =dO.appendChild(buildEl('select', {id:'optSelLangFrom'}, null, gt_slist));
		oF.value =  GM_getValue('from', "auto");
		oF.addEventListener('change', quickLookup, false);
    // swap
		addEl(dO,'span', null, null,'&nbsp');
		addEl(dO,'a', {id:'opSelectLangSwap',href:HREF_NO, 'class':"gootranslink",
    title:'Swap languages',}, ['click', swapLang], imgSwap);
		//to
		addEl(dO,'span', null, null,' To:');
    var gt_tlist = getXId("gt-tl");
    gt_tlist= gt_tlist ? gt_tlist.innerHTML+'' : languagesGoogle;
    var oT =dO.appendChild(buildEl('select', {id:'optSelLangTo'}, null, gt_tlist));
		oT.value = GM_getValue('to', "auto");
		oT.addEventListener('change', quickLookup, false);
		//use ctrl 
		addEl(dO,'br');
		addEl(dO,'span', null, null,'Use with: ');
		var d=addEl(dO,'input', {id:'checkCtrl', type:'checkbox'},
    ['change', saveIt],  null  );
		addEl(dO,'span', null, null,' Ctrl &nbsp;&nbsp; ');
		d.checked = GM_getValue('ctrl',false);
    // use alt
		d=addEl(dO,'input', {id:'checkAlt', type:'checkbox', 
    title:'using Alt is highly recommended'},
    ['change', saveIt],  null);
		addEl(dO,'span', null, 
    null,' Alt &nbsp;&nbsp;&nbsp; History:&nbsp;');
		d.checked = GM_getValue('alt',true);
//		history depth
		d=addEl(dO,'input', {id:'histSize', type:'textbox',  maxlength: 2,
    style: "width:2em; ", title: "set to 0 to clear history"});
		addEl(dO,'span', null, null,' items &nbsp; of ');
		d.value = maxHT;
// max # words in phrase 
		d=addEl(dO,'input', {id:'histWc', type:'textbox',  maxlength: 1,
    style: "width:1em; ", title: "max # of words in phrase"});
		addEl(dO,'span', null, null,' words');
		d.value = maxWC;
// source box params
		addEl(dO,'br');
		addEl(dO,'span', null, null,'Source box: &nbsp;');
		d=addEl(dO,'input', {id:'sourceBH', type:'textbox',  maxlength: 1,
    style: "width:1em; ", title: "box height"});
    d.value = sourceBH;

		addEl(dO,'span', null, null,' height &nbsp; ');

		d=addEl(dO,'input', {id:'sourceDP', type:'textbox',  maxlength: 2,
    style: "width:2em; ", title: "# of lines to keep"});
		addEl(dO,'span', null, null,' depth &nbsp; ');
    d.value = sourceDP;

		addEl(dO,'span', null, null," No flags:");
		d=addEl(dO,'input', {id:'checkNoflags', type:'checkbox',
    title: "don't show country flag icons"});
    d.checked = GM_getValue('noFlags');
// colours
    for(var b,li=BG.C.length,ii=0;ii<li;ii++){
		 b=addEl(dO,'span',{'class':'gtBGColor', title:BG.t[ii],
     style: 'background:'+ BG.C[ii]+'!important;' +
     (ii==0?'margin-left:6px' :'')
     }, null,'&nbsp;');
     b.addEventListener('click',BG.f[ii]); 
    }
		//save
		addEl(dO,'span',null,null,' &nbsp; ');
    var oS=
		addEl(dO,'a', {href:HREF_NO, id:'gtp-save', 'class':'gootranslink gootransbutt',
    title: "save changes"}, 
    ['click', saveOptions], '<b>save</b>');
    if(!GM_getValue('from'))
      saveIt();
    getId('optionsTo').className='gootransbutt gootranslink gtlActive';
		//cancel
	}
	else{//hide options
		killId(dO);
    getId('optionsLink').title = 'Settings';
    var oTL = getId('optionsTo');
    oTL.className='gootransbutt gootranslink gtlPassive';
	}
}
function showTrans(){
try{ 
 var hOs = GM_getValue('showTrans',false) !== true;
 var shhi = hOs?'gtp-trans gtp-block':'gtp-trans gtp-hide';
 var tds= document.getElementsByClassName('gtp-trans');
 for(var i=0, il=tds.length; i<il; i++){
  tds[i].className=shhi;
 }
 getId('gtp_transOnOff').innerHTML = hOs?"&laquo;&laquo;":"&raquo;&raquo;";
 GM_setValue('showTrans',hOs)
} catch(e){console.log('showTrans\n'+e)}
}

function detectedLang(da){
 if(!da) return '';
 var gt_slist = getXId("gt-sl");
 //console.log(gt_slist.innerHTML)
 gt_slist= gt_slist ? gt_slist.innerHTML+'' : languagesGoogle;
 var re= new RegExp('ion value="'+da+'">(.*?)<\/opt');
 var ma= gt_slist.match(re);
 if(ma && ma[1]) return ma[1]; return da;
}

function extractDict(txt){
_log('!dict')

try{
 if(!txt) return;
 if(txt.substr(0,1) !== '[')
   throw 'Bad Google responce';
 txt=txt.replace(/,(?=,)/g,',""');
 txt=txt.replace(/\[(?=,)/g,'["asshole"');
 var dA=JSON.parse(txt);
 var dL='';
//translation
 if( dA && dA[0] && dA[0][0] ){ 
  var dR=getId('divResult');
  var tr = dA[0][0][0];
  dR.childNodes[0].textContent=tr;
  dR.style.textAlign = rtl_langs.indexOf(GT_tl) < 0? 'left':'right';
  dR.style.direction = rtl_langs.indexOf(GT_tl) < 0? 'ltr' :  'rtl';
  dR.lang=GT_tl;
  addHistory(txtSel,tr); 
 } else {
  getId('divResult').innerHTML='Google returns nothing!'; return;
 }
// detected lang
  if(gt_sl=='auto' && dA[2]){
   var oF = getId("optionsFrom");
   oF.textContent= oF.textContent+' - '+detectedLang(dA[2]) +' ';
  }
  if(dA && dA[1] && dA[1][0] ){
     var da=dA[1];
     dL=buildEl('div',{id: 'gtp_dict'});
     var dT=addEl(dL,'table');
     var dB=addEl(dT,'tbody');
     var showT = 'gtp-trans gtp-hide',showI = "&raquo;&raquo;"
     if(GM_getValue('showTrans',false) === true)
      showT = 'gtp-trans gtp-block', showI = "&laquo;&laquo;"
     for(var i=0,il=da.length; i<il; i++){
       var tr=addEl(dB,'tr');
       addEl(tr,'td',{'class': 'gtp-pos'}, null, da[i][0]);
       for(var j=0,jl=da[i][2].length; j<jl; j++){
        tr=addEl(dB,'tr');
        addEl(tr,'td',{'class': 'gtp-word'}, null, da[i][2][j][0]);
//        console.log(JSON.stringify(da[i][2][j]))
        da[i][2][j][1]&&
        addEl(tr,'td',{'class': showT}, null, da[i][2][j][1].join(', '));
       }
     }
     var gtdir = (getId('divResult').style.direction=='rtl') ? 'left' : 'right';
     addEl(dL,'a',{'class': 'gootransbutt gootranslink', id: 'gtp_transOnOff',
       style: 'position: absolute; top: -.5em; '+gtdir+': 1px;'
       },['click', showTrans],showI);
      killId('gtp_dict');
     if(dL) getId('divResult').appendChild(dL);
  }
  killId('divSourceshow');
  killId('divHist');

  if(GM_getValue('sourceShow',true))
     source();
  if(GM_getValue('histShow',false))
     history();
  if(!GM_getValue('histWc') && !getId('divOpt')) // no settings?
     options(); // show options
     
} catch(e){
   _log('errexDict: '+e+'\n'+txt.substr(0,100));
   badResponce(txt,e);
}
}

function onTimerDict(){
 var q = dictURL + 
 "&hl="+ GM_getValue('to','auto') + 
 "&sl=" + gt_sl + "&tl=" + gt_tl + //+'&multires=1&ssel=0&tsel=0&sc=1';
 "&text="+ escAp(txtSel);
 //console.log('dict:'+ dictURL);
 _log('?dict')
 Request(q, extractDict);
}

function dict(){
  var dR=getId('divResult');
    killId('gtp_dict');
//    var dD=buildEl('div',{id:"gtp_dict"},null,dict)
//    dR.appendChild(dD);
    window.setZeroTimeout(onTimerDict);
}

function saveSource(){
  try{
  sT = getId('divSourcetext').value;
  GM_setValue('sourceText',JSON.stringify(sT));
  }catch(e){console.log('saveSource\n'+e)}
}

function source(){
 var divSource = getId('divSourceshow');
 try{
 if(divSource){
   killId(divSource);
   var sL = getId('sourceLink');
   sL.innerHTML = 'Source';
   sL.className = 'gootransbutt gootranslink gtlPassive'
   sL.title = 'Show source';
   killId('imgSourcesave');
   GM_setValue('sourceShow',false);
   return;
 }
 GM_setValue('sourceShow',true);
 divSource= buildEl('form', {id:'divSourceshow'}, null, null);

 if(sT){
  var sTa= sT.split('\n'); 
  var tS= txtSel + ' \u2192 ' + trim(getId('divResult').childNodes[0].textContent);
  if(tS != sTa[0]){
   while(sTa.length >= sourceDP) sTa.pop(); 
   sT=  tS + '\n' + sTa.join('\n');
  }
 }else sT=txtSel;
 if(!getId('imgSourcesave'))
 insAfter(
  buildEl('img',{id: 'imgSourcesave', title: 'save source', src: imgSave,
  style: 'margin-bottom: -3px;'},  
  ['click', saveSource], null)
  ,getId('sourceLink'),getId('sourceLink'));
 addEl(divSource,'textarea', 
 { id:'divSourcetext', rows: sourceDP, 
  style: "font-family: Tahoma,sans-serif !important; height:"
         +(sourceBH+1)+"em;"
 }, null, sT),
 getId('divBottom');
 var sL=getId('sourceLink');
 sL.innerHTML = 'Source';
 sL.className= 'gootransbutt gootranslink gtlActive';
 sL.title = 'Hide source';
 
 }catch(e){console.log('Sourceshow\n'+e)};
 insAfter(divSource,getId('divResult'));
}
// ht: [from, to, langpair, hitCount]

function history(){
 var divHist = getId('divHist');
 try{
 if(divHist){
   killId(divHist);
   var hL = getId('historyLink');
   hL.innerHTML = 'History'; hL.className= 'gootransbutt gootranslink gtlActive';
   hL.title = 'Translation history';
   GM_setValue('histShow',false);
   return;
 }
  if(!maxHT) return;
  GM_setValue('histShow',true);
	divHist = buildEl('div', {id:'divHist'},['click', histLookup], null );
//	
  for(var i=0, l=ht.length; i<l; i++){
    var bkg = ht[i][0].indexOf(' ')>0 ? ' goohistlink' : '';
    addEl(divHist,'a', {href:HREF_NO, 'class': 'gootranslink'+bkg, 'titel': ht[i][1]+
    ((ht[i][3]>1) ? '\u00A0'+ '['+ht[i][3]+']' : '')},
    null, ht[i][0]);
    if(i < l-1)
    divHist.appendChild(document.createTextNode(' '));
  }
	//addEl(divHist,'span',null,null,'<br>&nbsp;');
  if(getId('divSourceshow'))
   insAfter(divHist,getId('divSourceshow'));
  else
   insAfter(divHist,getId('divResult'));
  var hL=getId('historyLink')
//  hl.textContent = 'X';
  hL.title= 'Hide history';
  hL.innerHTML = 'History'; hL.className = 'gootransbutt gootranslink gtlActive';
  }catch(e){console.log('hist problem\n'+e)}
}

function saveOptions(evt){
  try{
	var from = getId('optSelLangFrom').value;
	var to = getId('optSelLangTo').value;
	var ctrl = getId('checkCtrl').checked;
	var alt = getId('checkAlt').checked;
  var mh = parseInt(getId('histSize').value);
  var wc = parseInt(getId('histWc').value);
  var nf = getId('checkNoflags').checked;
  if(0<= mh && mh <=99 && mh<maxHT){
    while(ht && ht.length>mh)  ht.pop();
    GM_setValue('hist',ht? JSON.stringify(ht):'');
    if(getId('divHist')){
     killId('divHist');
     history();
    }
  }
  maxHT=mh;
  var bh = parseInt(getId('sourceBH').value);
  if( 0< bh && bh <10) sourceBH = bh;
  var dp = parseInt(getId('sourceDP').value);
  if( 0< dp && dp <100) sourceDP = dp;
  if(1<= wc && wc <=9) maxWC=wc;
  GM_setValue('histSize',maxHT)
  GM_setValue('histWc',maxWC);
	GM_setValue('from', from);
	GM_setValue('to', to);
	GM_setValue('ctrl', ctrl);
	GM_setValue('alt', alt);
	GM_setValue('sourceBH', sourceBH);
	GM_setValue('sourceDP', sourceDP);
  GM_setValue('noFlags',nf)
	getId('divDic').removeChild(getId('divOpt'));
	getId('optionsLink').title='Settings';
  return;
  }catch(e){console.log('saveOpnions\n'+e);}
}

function addHistory(src,trt){
 if (!maxHT) return;
 try{
 var hts=GM_getValue("hist");
 if( !hts ){
   ht=[["google translator","Der Ubersetzer","en|de",0]];
   hts=JSON.stringify(ht);
 }
 ht=JSON.parse(hts);
 var st=trim(src+''); var tt = trim(trt+'');
 var wc = (st.split(' ')).length;
 if(wc>maxWC) return;
 var lang=currentURL.match(/langpair=([a-zA-Z-\|]+)/)[1];
  var ix=-1;  // find word in hist
 for(var i=0, l=ht.length; i<l; i++)
    if(st==ht[i][0]){ ix=i; break; }
 //if(ix==0) return; // nothing to do
 var hits=0;
 if(ix>=0){
  hits=ht[ix][3];
  if( (gt_sl+'|'+gt_tl) == ht[ix][2] && tt != ht[ix][1]) {
   tt = ht[ix][1]; // don't touch my translasion
  }
  ht.splice(ix,1);
 }
// if(hits<4) 
 hits++; // delete it by your own hands
 if (ht.length>maxHT){
  var minHit=99999; // which item shoud i remove?
  for(i=ht.length-1;i>0;i--)
   if(minHit>ht[i][3]) minHit=ht[i][3]
  ix=ht.length-1;
  for(var i=ix; i>0; i--)
   if(minHit==ht[i][3]){  ix=i; break; }
  ht.splice(ix,1);
 }
 ht.unshift([st,tt,lang,hits]);
 GM_setValue('hist',JSON.stringify(ht));
 } catch(e){console.log('addHist\n'+e);}
}
var senFlag = '';
function selFlag(e){
 if(!isInited) {css(-1); isInited=true; }
 killId('divSelflag');
 document.addEventListener('keydown', escCleanup, false); 
 var p = belowCursor(e,10,10);
 var dsf = buildEl('div',{id:'divSelflag', style:
  ';top:'+p.t+';left:'+p.l+';right:'+p.r  +';bottom: auto'});
 var sel=addEl(dsf,'select',{id: 'optSelFlag'},
 null,languagesGoogle);
 sel.value = GM_getValue('to')? GM_getValue('to'): 'en';
 addEl(dsf,'span',null,null,'<br><br>');
 addEl(dsf,'a', {href:HREF_NO, 
 'class':'gootransbutt gootranslink', title: "use icon"},
 ['click',  function(){saveFlag(true)}], '<b>&nbsp; OK &nbsp;</b>');
 addEl(dsf,'a', {href:HREF_NO, 
 'class':'gootransbutt gootranslink'},  
 ['click', function(){saveFlag(false)}], 
 '<b>&nbsp; cancel &nbsp; </b>');
 //http://www.senojflags.com/images/national-flag-icons/Bermuda-Flag.png
  senFlag = e.target.src+'';
  var sm = senFlag.match(/.+\/(.+)\-Flag\.png/);
  if(sm && sm[1]) senFlag= sm[1];
  _log(senFlag);
	if(senFlag) body.appendChild(dsf);
}
function saveFlag(tf){
 if(tf && senFlag){
   var s= 'l-'+getId('optSelFlag').value;
   GM_setValue(s,senFlag);
   _log(s+': '+senFlag );
 }else _log('cant save flags' );
 killId('divSelflag'); return;
}
var fCSS;
function flagClick(e){
 e.preventDefault();
 if(e.target.nodeName == 'IMG'){
  _log('hit on: ' + e.target.alt);
  selFlag(e);
 }else (killId('divSelflag'));
}
function belowCursor(evt,ho,vo,lr){
  var p={t:'', l:'auto', r:'auto'};
  p.t=(evt.clientY+window.pageYOffset+vo)+'px';
  var l=(evt.clientX+window.pageXOffset+ho)+'px';
  if(lr && lr=='r')
  { p.l=l; return  p; }
  var w = window.innerWidth;
  var r=(w-(evt.clientX+window.pageXOffset)+ho);
// Q: How to detect visibility & thickess of vertical scrollbar?
  r-=8; // 
  if(r<0) r= w/4;
  r+='px';
  if(lr && lr=='l')
  { p.r=r; return  p; }
  if(evt.clientX < w/2)
   p.l=l;
  else
   p.r=r;
  return p;
}
var flagLang;
function getFlagSrc(lng, where){
  if(!where) where = 'to';
  if(GM_getValue('noFlags')) return imgFlags[where];
  var fl='l-'+lng;
  var flag = GM_getValue(fl,'');
  if(!flag){
    flag=imgFlags[lng];
    if(!flag) return flag = imgFlags[where];
  }
  if(flag.indexOf('http')==0
   //flag.indexOf('file') ==0
   ||flag.indexOf('data:') ==0)
   return flag;
  flagLang=fl;
//  flag= 'http://www.senojflags.com/images/national-flag-icons/'+flag+'-Flag.png';
  flag=  senoimg+flag+'-Flag.png';
  flagRequest(flag);
  return flag;
}
function flagRequest(f){
 _log('load '+f);
 GM_xmlhttpRequest({
	method: 'GET',
	url: f,
  binary: true,
  overrideMimeType: "text/plain; charset=x-user-defined",
  headers: {	    
    "User-Agent": UA
   ,"Accept":  "image/png,image/*;q=0.8,*/*;q=0.5"
   ,"Accept-Encoding":  "gzip, deflate"
  },
	onload: function(resp) {
		try{
       flagStore(resp.responseText,f);
		}catch(e){console.log('FlagRqst\n'+e);}
	}
 });	
}
function flagStore(r,url){
 if(r.indexOf("<head")>=0)
  {
   console.log("Banned!\n"+url);
   GM_setValue(flagLang,url);
  }
 else
  GM_setValue(flagLang,"data:image/png;base64," + b2b64(r));
}

function trim(s){
 return (s+'').replace(/\s+/g,' ').replace(/^\s/,'').replace(/\s$/,'');
}

function killId(nod){
 if(!nod) return;
 var n = nod;
 if(typeof n == 'string'){
  n= getId(nod); 
 }
 if(!n) return;
 if(n.parentNode) n.parentNode.removeChild(n);
 else  _log('cant kill: '+nod)
}

function addEl(to,type, attrArray, eL, html){
 return to.appendChild(buildEl(type, attrArray, eL, html));
}

function buildEl(type, attrArray, eL, html)
{
	var node = document.createElement(type);
	for (var attr in attrArray) if (attrArray.hasOwnProperty(attr)){
		node.setAttribute(attr, attrArray[attr]);
	}
	if(eL){
  //console.log('buildEl\n'+type+'\n'+JSON.stringify(attrArray)+'\n'+eL[0])
		node.addEventListener(eL[0], eL[1], eL[2]?true:false);
	} 
	if(html) 
		node.innerHTML = html;
	return node;
}

function getId(id, parent){
	if(!parent)
		return document.getElementById(id);
	return parent.getElementById(id);	
}

function getXId(id){
   var r=Xel('.//*[@id="'+id+'"]',divExtract);
   if(r) return r;
   throw "Xel bug " + id;
}

function Xel(XPath, contextNode){
    var a = document.evaluate(XPath, (contextNode || document), 
    null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    return (a.snapshotLength ? a.snapshotItem(0) : null);
}

/** /
function Xels(XPath, contextNode){
    var ret=[], i=0;
    var a = document.evaluate(XPath, (contextNode || document), 
    null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    while(a.snapshotItem(i))
      ret.push(a.snapshotItem(i++));
    return ret;
}/**/
//

function getTag(name, parent){
	if(!parent)
		return window.document.getElementsByTagName(name);
	return parent.getElementsByTagName(name);
}
/*
 * Drag and drop support adapted fom http://www.hunlock.com/blogs/Javascript_Drag_and_Drop
 */
var savedTarget=null;                           // The target layer (effectively vidPane)
var orgCursor=null;                             // The original mouse style so we can restore it
var dragOK=false;                               // True if we're allowed to move the element under mouse
var dragXoffset=0;                              // How much we've moved the element on the horozontal
var dragYoffset=0;                              // How much we've moved the element on the verticle
var didDrag=false;								//set to true when we do a drag
function moveHandler(e){
	if (e == null) return;// { e = window.event } 
	if ( e.button<=1 && dragOK ){
		savedTarget.style.left = e.clientX - dragXoffset + 'px';
		savedTarget.style.top = e.clientY - dragYoffset + 'px';
		return false;
	}
}
function dragCleanup(e) {
	document.removeEventListener('mousemove',moveHandler,false);
	document.removeEventListener('mouseup',dragCleanup,false);
	savedTarget.style.cursor=orgCursor;
	dragOK=false; //its been dragged now
	didDrag=true;
}
function dragHandler(e){
	var htype='-moz-grabbing';
	if (e == null) return;//
	var target = e.target;// != null ? e.target : e.srcElement;
	orgCursor=target.style.cursor;
	if(target.nodeName!='DIV' )	
 	 return;
  if( e.ctrlKey || e.altKey || e.shiftKey)
    return; // enable selection inside
	else if(clickedInsideID(target, res_dict))
		return;
	if (target = clickedInsideID(target, 'divDic')) {
		savedTarget=target;       
		target.style.cursor=htype;
		dragOK=true;
		dragXoffset = e.clientX-target.offsetLeft;
		dragYoffset = e.clientY-target.offsetTop;
		//set the left before removing the right
		target.style.left = e.clientX - dragXoffset + 'px';
		target.style.right = null;
		document.addEventListener('mousemove',moveHandler,false);
		document.addEventListener('mouseup',dragCleanup,false);
		return false;
	}
}
function clickedInsideID(target, id) {
	if (target.getAttribute('id')==id)
		return target;
	if (target.parentNode) {
		while (target = target.parentNode) {
			try{
				if (target.getAttribute('id')==id)
					return target;
			}catch(e){}
		}
	}
	return null;
}
//end drag code
function b2b64(inp) { // binary data --> base64
  var output = [], c1, c2, c3, e1, e2, e3, e4, i = 0;
  var k="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  var len = inp.length;
  while( i < len ){
    c1 = inp.charCodeAt(i++); c2 = inp.charCodeAt(i++); c3 = inp.charCodeAt(i++);
    e1 = (c1&255) >> 2; 
    e2 = ((c1 & 3) << 4) | ((c2&255) >> 4);
    e3 = ((c2 & 15) << 2) | ((c3&255) >> 6);  
    e4 = c3 & 63;
    if( isNaN(c3)) e4 = 64; else
    if( isNaN(c2)) e3 = 64;
    output.push( k.charAt(e1) + k.charAt(e2) + k.charAt(e3) + k.charAt(e4));
  }  return output.join("");
}


function ttrans( s, ttab ){
  for( var c, cc, t='', il=s.length, i=0; i<il; i++ )
    t += (c=ttab[cc=s.charAt(i)]) ? c : cc;
  return t;
}
var tabUrlEsc = {
 '#':'%23', '%':'%25', '&':'%26', '.':'%2e', '/':'%2f', '?':'%3f'
 };
function escAp(s){
 return ttrans( s, tabUrlEsc );
}

function stickStyle(css){
 var s=document.createElement("style"); s.type="text/css";
 s.appendChild(document.createTextNode(css));
 return (document.head||document.documentElement).appendChild(s);
}

function css(n){
  var k,i=0;
  _log('cssN:',n);
  if(-1 === n){ try{ 
    k= +(GM_getValue('backG',0)); 
    if(0<=k && k< BG.C.length) i=k;
  } catch(e){};}
  else GM_setValue('backG', +(i=+n) );
  try{
    if(window.gttpCSS) window.gttpCSS.parentNode.removeChild(window.gttpCSS);
  }catch(e){console.log('cssX:\n'+e)};
  _log('cssS:'+i,BG.C[i]);
  window.gttpCSS=
stickStyle((
'#divResult {overflow: auto !important; padding:3px !important; margin: 0 0 3px 0 !important; max-height: 480px !important;}'+
'#divResult table *{ line-height: .85em !important}'+
'#divDic, #divDic *, #divSelflag, #divSelflag * {\
font-family: Tahoma, sans-serif!important;\
font-size: small!important;\
font-style: normal!important;\
font-weight: normal!important;}'+
'#divDic,#divSelflag {position: absolute; background: BG_COLOR !important; color:#000000 !important; opacity: 1'+
';padding:5px !important; margin:0; z-index:10000; border-radius:3px; border: solid thin gray'+
';text-align: left !important;}'+
'#divDic{/*min-width: 340px !important; min-height:50px;*/ max-width:50%; padding: 3px; margin: 0;}'+
'#divSelflag{ max-width: 180px; }'+
'.gootranslink, a.gootranslink '+
'{color: #047 !important; text-decoration: none !important; font: small normal sans-serif !important;'+
'cursor:pointer !important; }'  +  
'a.gootranslink:visited {color:  #047 !important; text-decoration: none !important;}'+ 
'a.gootranslink:hover {color:  #047 !important; text-decoration: underline !important;}'  +
'a.gootranslink:active {color:  #047 !important; text-decoration: underline !important;}' +
'#gtp_dict tbody> tr {font-size:14px !important; line-height:.9em!important;color:black;'+
'background:BH_COLOR;'+
'}'+
'a.goohistlink {background:'+G_ +';}'+
'#gtp_dict {margin: 0; position: relative;}'+
'#gtp_dict ol {padding: 0 .5em 0 0; margin-left: 0.2em;}'+
'#gtp_dict li {list-style: square inside; display: list-item;}'+
'div#gtp_dict tr>td {padding-left: .25em; vertical-align:top; border:0px; color:black; }'+
'#optSelLangFrom,#optSelLangTo {max-width: 150px; text-align: left !important; height: 1.5em;\
}'+
'#optSelLangFrom,#optSelLangTo,#divDic input[type="textbox"]{background: BE_COLOR !important;\
padding-bottom: 3px !important; margin-bottom: 4px!important;}'+
'#divExtract{word-spacing: normal !important;}'+
'#divBottom {position: relative; width: 100%; font-size: smaller; text-decoration:none; }'+    
'#historyLink {display: inline; position: relative; font-size:smaller; text-decoration:none;}'+
'#sourceLink {display: inline; position: relative; margin-left: 2em;  font-size:smaller; text-decoration:none;}'+
'#imgSourcesave {display: inline; position: relative; margin-left:2px;}'+
'#optionsLink {display: inline; position: relative; padding-left: 1em; margin-left: 1em; font-size:smaller !important; text-decoration:none !important;}'+    
'#divOpt {position: relative; padding: 5px;'+
'border-top: thin solid grey;}'+ 
'#divLookup, #divOpt, #divBottom,#divSourcetext,#divHist,#divuse {direction: ltr !important;}'+
'#divHist {background:BG_COLOR; position:relative; padding:5px; text-align:left !important;'+
'border-top: thin solid grey;}'+ 
'div#divResult #gtp_dict {background:BG_COLOR; color:#000000; padding:1px!important; border-radius:3px;'+
'margin-bottom: .1em!important; overflow-y:auto !important; overflow-x:hidden; font-size:small;}'+
'#divOpt {background:BG_COLOR; position:relative; padding:5px; text-align:left !important;}'+
'#divLookup, #divUse {background-color:transparent; color:#000000; position:absolute; padding: 3px;}'+
'div#divDic>#divSourceshow {\
border: none; padding: 0 0 4px 0; margin: 0;}'+
'#divSourceshow>#divSourcetext{ width:97%; height: 3em; line-height: 1.2em; overflow: auto !important;\
padding: 0 0 0 4px; margin: 0; border: 0; border-top: 1px solid #AAA}' + 
'.gtlPassive:before{ content:"\u2193";}'+
'.gtlActive:before{ content:"\u2191" !important;}'+
'#imgUse, #divGetback, #divGetforw {margin-left: 5px !important; cursor: pointer;}'+
'#divSourcetext {background: BE_COLOR; color: black !important;}'+
'.gootransbutt {background: BT_COLOR;'+
'border-radius: 3px; margin-top: 5px; }'+
'.goounsaved {background-color: #EF9024;'+
'border-radius: 3px; margin-top: 5px; }'+
'td.gtp-pos { color: #000000 !important; font-weight: bold !important;  text-align: left; }'+
'td.gtp-pos:before{ content:"\u2666 ";}'+
'td.gtp-word {color: #000000 !important; padding-left: 5px; padding-right: 10px;'+
'vertical-align: top; white-space: normal;}'+
'td.gtp-trans {/*overflow-x: hidden;*/ vertical-align: top; white-space: normal;'+
' width: 100%; color: #404040 !important}'+
'td.gtp-pos, td.gtp-word, td.gtp-trans {padding-bottom: 0px !important; padding-bottom: 1px !important;}'+
'.gtp-hide {display: none}'+
'.gtp-block {display: block}'+
'').
 replace(/BG_COLOR/g,BG.C[i]).
 replace(/BH_COLOR/g,BG.H[i]).
 replace(/BT_COLOR/g,BG.T[i]).
 replace(/BE_COLOR/g,BG.E[i])
);
 _log('BH['+i+']='+BG.H[i]);
if(-1 !== n) return;
stickStyle('\
#divUse img, #divDic img, #divLookup img {width: auto; height: auto; }'+ // rt.com :/
'#divTtsLnk:after{ content:url('+imgPlay+') }'+
'#divTtsLnk {padding: 0 3px; margin: 0 4px 0 0;}'+
'#divTtsIfh {width: 100%;overflow-x:hidden;\
background-color: rgba(127,127,127,.25); padding: 3px 0;\
}'+
'#divResult, #divResult div, #divResult table, #divResult tr, #divResult tr td,\
#divResult a, #divBottom, \
#divOpt select, #divOpt input\
{ padding:0 0 0 0; margin: 0 0 0 0; background: none repeat scroll 0 0 transparent;\
  border:medium none; line-height: 0.95; }'+
'#divOpt {line-height: 2.3 !important;}\
div#divBottom{padding-top: 3px;}\
.gootransbutt#optionsLink{margin-top:0; padding-top: 3px; padding-bottom: 1px;}\
.gtBGColor{border:thin solid blue !important; cursor: pointer;\
padding-right:6px; margin-right: 2px;}\
.gootranslink[titel]{position: relative;}\
.gootranslink[titel]:after {\
color: #050;\
content: attr(titel);\
position: absolute;\
visibility: hidden;\
opacity: 0.25;\
	left: 16px;\
top: 32px;\
min-width: 0px;\
width: auto;\
white-space: normal !important;\
-moz-hyphens: none !important;\
text-decoration: none !important;\
border: 1px #aaa solid;\
border-radius: 6px;\
background-color: #dfd;\
padding: 1px 4px;\
font-size: 14px;\
-webkit-transition: all .2s linear .2s;\
transition: all .2s linear .2s;\
z-index: 2147483647;\
}\
.gootranslink[titel]:hover:after {\
visibility: visible;\
opacity: 1;\
-webkit-transition: all .5s linear .7s;\
transition: all .5s linear .7s;\
}\
');
}
function insAfter(n,e){
  if(e.nextElementSibling){
   e.parentNode.insertBefore(n,e.nextElementSibling);
  }else{
   e.parentNode.appendChild(n);
  } 
}
function insBefore(n,e){
   e.parentNode.insertBefore(n,e);
}
var imgH='<img border=0  src="' , imgD='data:image/png;base64,',imgT='">';
var imgPlay=imgD+
'iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAACXBIWXMAAC4jAAAuIwF4pT92AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAI1JREFUeNpj+H9h4v//D7YRh4FqGf6vsvuPF4PAnnQ4n+H/At3/WDEIgOjTvQg2EDP8ny7/HwWDAIy+sxnBvr0RzGb43y/0H45hAMR+fAQrm+F/B/t/DAASe3gQK5vhfwsDpgaQ2IP9WNkQDTBMsgaYJhgNcgqMfWUZDg3oGveUINh4NSBrnGdGggY0DAAAy70TuBaoTgAAAABJRU5ErkJggg=='
;

//http://www.senojflags.com/images/national-flag-icons/Portugal-Flag.png
imgForwSrc= imgD+
'R0lGODlhEAAQAIQfAAFYsQJkw15iWgRz3AeN0Xl8c2mBiQma5B6W1h+b3yqh4BKp+kWk0pudlDC2/0y79X+4z1fC/7q6r3DK/4rN7a3Kz8fKwc/Uyr3c5N7dzuTi1Ofl1enm2O3r3/b06////yH+EUNyZWF0ZWQgd2l0aCBHSU1QACH5BAEKAB8ALAAAAAAQABAAAAWf4OeNXmdyX6qKpNSc25p6TVEIgl1osljntxxPNrIILhrDZBl5OBaLj6mTa1CWk+YTOpXgsBEM5gFdmDLBiJrC2VCgB85lYJFcmg+MPAPnDP4aGg4ODxsVFBkPBwd/jRuDFBoQDxkVix+NHwBQSBmeFwoEHwEDAQEAAJQVDAwQFxCipqeoABkMiwcWFqKjpqgEBLjAwDIAHwoJyQkIzB8hADs=';
imgForw = imgH+imgForwSrc+imgT;

imgBackSrc= imgD+
'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAAXNSR0IArs4c6QAAAGBQTFRFEgAAAVixAmTDXmJaBHPcB43ReXxzaYGJCZrkHpbWH5vfKqHgEqn6RaTSm52UMLb/TLv1f7jPV8L/urqvcMr/is3trcrPx8rBz9TKvdzk3t3O5OLU5+XV6ebY7evf9vTrdcYePwAAAAF0Uk5TAEDm2GYAAAABYktHRACIBR1IAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAoklEQVQY003PWxKDIAwF0CCPYouCKIIB7f532UTttPfvnkkyE4Ar+3Ecb8pdoRGM859UY4yUxow/4CpPcM6HuCzLoxaZacV9IY1G0mWGsG0sUs4M1rnU9hRjpCt4AZZ9CyGWOauyg7UB09qC97UqpRhWDFNN3jfFAf0qiFiLcwK4g57KNAw0JUTXqY4gZ2vtgEKwMFBItL47QN/3T8oLxPnVB4gUDOnY6pKLAAAAAElFTkSuQmCC';
imgBack = imgH+imgBackSrc+imgT;

imgSwap = "<img border=0 style="+'"margin-bottom: -3px;"'+
"src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAQCAYAAAD52jQlAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAGFJREFUOMu1kkESwCAIAxM+7vTlevJipYKkOWeWQAB2ar2jIFMD31ABEACYBj5kLKkooX9TGTSwUqZQusbToOnd+CxbQiQxXeMccPEVrNzOA//YvkKp9SNnWQo2ZcK6PgocHMgoj3uaTsAAAAAASUVORK5CYII='>";

imgUse = imgD+ 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACQklEQVR42mNkoBAwgoiwykntQCoeTW7hqva8SmINeGZv7yCJLHHw4IHnQAOkCBoQXjdnJpBOI9MHsxhDa2b9z4v2xir7/z8QgyCU/gdi/GMA00CKYc7qnQyMwdUz/icGuSFp+s/w+cs3hqPHzzK8fPUGzBcVE2EwMzVk4OTkhGgG4X//GTbtPsTAGFgx5X9iiCfYFpDE+/cfGTZv28Ogr6vJ8A7ItjQ3ZLhy/Q7DxUvXGVxcHRj4+PgY/kIN2LH3IAOjX8mE//Gh3gz/oU7bu+8wg4S4CIOBnjbDlFmLGRLiIxnYWJgYzl+4wvD0+WsGSxtLhr///kPVHmBg9Cns+R8d7At32rJlaxnCw/0Y/vxjYli2dBVDaEQI2DZmoA0r12xg8A30hxgAxIcPAg3wzOv4HxrgDRb4C/TGmtXrGbx9PBmYWFgZVq9YA4wnRoa/f/4xeAf4MOzYsp3B3dcH7oVTR4FecMtq+e/r7QExAIhPnzzFwMsnwKCkqsIgwM0OVgwKnzPnrjB8/PCeQdPAEO7aCyeOMDC6pDf8d3V1AQv8BcXN758Mu3YfZJBXUmQQl5YCGszA8OzJE4ZH9+4z2DnYMPxkZAGrBYXZtbPHGBgdk2v+2zo6AQX+g21jY2FmALqZ4cyZCwxv3rwFKmZgEBYWYjAw1GP4zcDE8O3nb4gBQPFb508wMNonVv7XNzYFGwBzGgsTEwMvFwfI+8DkAzQPGDgfvn1n+PHrLzhdwMDDG5cYGK0iC/8zUABAmcmAEgMA4i8z829X6pgAAAAASUVORK5CYII=';

imgSave= imgD+
'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACgklEQVR42mNkAIL4tTeX/P36xnpBtCXDolN3GYS42Bn8dGUYGBkZGWBg/+0XDFOOPfzDxSOw8enZg5X729N/g8TBKuJWX/v++d0TjnVprgx2vZsY1MT4GebE2jMgg93XnzBMPnKXgYdPhOE/A8OiFRE68XADolZc+v7u+V2O7QUBDMbNyxg0JAQZlqZ6ohiw/fIDhr6DNxgEhSTB/P///9euiTFsARsQtuTs96ePb3PsLgpmOPfoJQM3GyuDgZwYigErHxQw3P/wnoGVhR2kmeH05aivt/bsFQEbELjg5PfHT+5y/Pj5i4GZiYkBG0iIqGZgYvwH5x89O4Xh1t6zCmADPGce+s7LycrBAPIdDmBuHAkM1L8IA870AQ04DzHAdere70CKgwEPcLFNAboAYcCR050Md/ZDDXCcuJMIA7IYGJmQvHCqieHugQsQA2z7tnzXEBfgEOXBbQa7VBSQRDLgdA0Dw4fDEAMsuzZ835nrxfH/zx+GP38QzvwP1DD3VjDDp7+PcZl7AWyAadua7weK/Tm+ff3G8Ov3HxQV7//eYVh8O5Xh3/+/KOL//jEzvHvBaw02wLBp+fcj5cEcL16+Y/j67QeGNZe/rmE4+XYxitj9Rw4Ml7Z9h3hBp27x95NV4RwvXmE34C/Q9lUPKhne/rkL5qsKGzIcOefLcGbXFogBmtXzvx9JUeHgYsWeiEDg1dcnDB3Xe4Bpn5GhUquUIXPzL4azB/YpMLb0T+E6+o1nryLrI2Nmhn8gEyBZEJkEhScwjX3geQMS+s//RfjfvV9Sz0x4/xszLlmyRAmUFIBYGogFgZgbmiZYgJgZFmZADMq+P4H4CxB/AOKnQHwQALc2/z+3odafAAAAAElFTkSuQmCC';

imgFlags= {
 'AN': imgD+
'iVBORw0KGgoAAAANSUhEUgAAABgAAAAQCAYAAAAMJL+VAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAABANJREFUOMutlEtsVHUUh797//c10955F2hKM7QUEUgNoRAqSUGJESO6ACSyIKgJwSXGGFJ2mhijG2JE3WgiiSaCAQlVeagIhAYID4GIgKU4lGdbhs5MZ+bemft0UXGBukF/y7M4X07OOR/8T9n84eebNm3ZuvPBuvJgYcvOg8r573a0zF62uqP/zM/JUdvX8T1f1fRqV+vkQu74gXsqoaUaRlSbt2zaxby1UJs2e929WR1tSzqSdH/15RMnThw7fL+ftP7tj41hueG5eDK12GzJLp3a0vxoImaKCyNlLuWrnBvKU8oXWZoKKVoOZ4suoSyBAIQGWpSIEaFnWoLH2zOkhs9d2Lh8aed9gBh7ZuOVk+acDeVU68JEzJwUNxQ5Kgc4rk/ZsqnYNWJBnZ+eb+bZVp3V0xvoTAvSIkTyXUZqPh4SrqSQ1AQzOmdNsq/8Ovr7wOXTALJ3sX8/jkXZsig7PlU3oFGRWTA5QlRT8YRKBQULQdEDTYKeKRF6uzJ8s7yZBSkBnsvtksXVgs1vt0qse++Dd2a2t6UARFs2Gx/p6FkVeh7pRp2kJpBkyJoqm+el6Zli0Ds3jl338fwAz/MJQvDCEMsL6Z6kkxtzGbICbARJTZBpyhiPTElmDu/t6xNJr3LN6V652XJdYoZOKqKS0AS2H7B9sMqqbBQ5CHA9nyCcAIRB8OcGwdRkNnQm2X/D5nrFQ1NVTEWma1H3vKuH9v0g8oWC0/TYoqfHjUSrUASZBp2ELohrMhU/ZElLFE1iAuD7BEGA7/oTABlCwPF9xj2J4yMOViBIGAIzFiXmFg0B0JROTy1ku54kDCYAhoqpyUQViU8vV2iOSnTEBL7nI4UBvj8xRQhIEmgyHLxR5XzJpx4CqkG6fu/uZ6+99LICYFZG9ymq9pZVsynaDhUnQs0LSRgyqajgzXPjtGs+cxs87oxZxHGYGQlpMWUCwJBlTt2pQKACUaxisbC994W1lmUNCIDh3MDtzOIVr1cCWddVhUxUJxZRiGkybgDjTsipuzbbLxU5ervKj9fKhI7DyvZGnCBkz1CFHTkL3TRpvXn6THHrq2uK+ZF+IPzrk7XBk31M71lbsuqUa3UsR8cxQkxFolETxKMGRmMES5ZBM9hVrPP93hKBW8coj461DJ057p7e/8X1awPfBlD5myoy1uiRm0JdW7FrlGp1qnWXWqBiGhpNTREKnkz5yvnB6i/HLgS3ruYoDef0ejnnDudy+bHSTQfKQPCvLiod2bXbnP/iJ2XbpWg5WEInlPAv9W070r/n692DJ48esF33hqmKetn1w4cyYnPvtrO8ezSc8f6h4vxVr2yNRiJz/kmID53ZK9a/MfWpNR9FFJGduPL/nj8ActPaP8mCkKMAAAAASUVORK5CYII='
,'en': imgD+
'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAJJSURBVHjapJNdSJNRGMd/Z3u3OTXXhx8xjRLDFWIk0jAk6WYYfaAZSUWGZkFdRNRFYAYFXhkI2gpKqISC1IsIUiKIchUEUQiuj4uiMT8m0wbNr+n2vu/p4l2K3Yn/m3Pg8Pye8/wf/kJKyWokACuQnjxXojgwowCOwPW2iS37y3k0bOfJwwHmYzFePK5n7Oxl0FRyH9zicGM3CZOFBhccypMox2tJdWZnK0Bay/AGmr+McmJvKUXbaul79hmTzYJ9x3bQdEw2C2V7XOzLUdmVZ2PWvZvm1lcAaQpg/vY9xL2NRdRMvqHUlYmzoRw9oREPjICqoic0qtIiFGVmECp20+kd4IPPD2AWQMFMcOSnxWZDavqyIcfOXARVJ7fLu9w4s4nEwgLpmzdtVQB+HW0kNcOBFo3Cv6VICWYTSEmw6hSYBOjGo7LOwdz0lHEHiMVimCciaNEpRLIWqSMUxWCpKgiBEAIJqI4M5tLtS4Cs++3kZGUlK5cUcFciEwkKBl//t3xBeHIS3KWYAEo87biruxiKWkh568N/447RWZdI3fAlMG8l5Z2PT00deOq6KfHcBjAA+YVO+p6eo8zXy/P+r9R9tCcbCQQCgIMHOuh3llFx2kNn/jjFhWuXAN6rFay/66XtZZjG9zrh0KjxVasCNgsAs9N/OHnkJq0/HLjOH+NadmjRg7jW00tnWOPKQGRxzEH/EOM7XUhNI+of4nckCEDThRaCl2qor66E/p64ABxALrBmhVmYBsYEYE4GybxCgAbExWrj/HcACIPUyGtYcDcAAAAASUVORK5CYII='
,'ru': imgD+
'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAADkSURBVHjapJM5TgNBEEVfzeZlQIOE5ARxClLOxC04CzFX4ArERAhZsoTEyDDurqa7SGxsIYJZKqnov9p+iZkxJQSogLN9HhIKfBZAY2abUdVFVhlQT5igzoB8AiDPAGKMg5UHTQFwc/fI6rKh/VLsz4b/u9FFXbF5b4+AnXe8rIW2C72qN8uSwtwJoHMwm5NSP0+EbyP4E8DD0z3XZUnqdr0A2XLBawjcHgBOPZYXINILYMlw6o8deFVsvoCq7AewhFf9BWg047n9GOMDFaABroDzgeIt8CZ7J1YjHBkBlanv/DMAwHdYum9dlZQAAAAASUVORK5CYII='
,'zh-CN': imgD+
'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAFbSURBVHjapJO/SgNBEIe/vduLCSaKFhb6DCnFzs4XsMgjWlj4AD6BFhYKFqKgTSzSaBLN7f+xuJM7RSHRHywLy8w3Oz9mlIjwHymgA/TrexU54E0Dm+Pj0QSACGRADt39gLnQTZkftHd2uqOBdYmR3uGQYjfhnzPSXJHeYTCK2Lu8AquGJYC9vgFY10AupUdvTekdTYgnGvdYVQ5P0nTa+kW+vYV4D5BrgGAt9nZOmCzwDxlxkqG60D0ImCsN/msbKs+J1gKgAXww+Kcp5nKBKgQ0rA09i/Oi8iR880HAGdMATFnSuX8kzWZ8vvqHJvi7idnGBibPGkBZlvSzDJFURfj6FC1ISyl4SpcagDUWVRRISi2ngPTL8PiArUysW3AW0RqUWmqCRATjWiZaa6HbQxXFcjOYUpVTA1wU4eb15S+r4BSwCewBgxWT58BY1XZ16nsVRcCp/67zxwDGd5ld8bkQAQAAAABJRU5ErkJggg=='
,'ar': imgD+'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAIvSURBVHjapJPNSxRxHMY/M/Ob3bXddV3DBTUh8yJdCiHwIIV0DXqB7nWLDv0NBt06Rt3q0E0PGaFBmGSGUCZKQR6ENV8wddfVfZ35zW/mN9NByd4u4nP5Hr7wgYfneYwoijiODCAGpA7uUaSAugAyN0aHCn9//TAg0BoAYZrYlv0P4cX1oZwAkjrUnMv1ABBFEX6oaU+1cibbARGsVbZZrxWxTRPDMAH4UsgDJAVg+WFATTmUZBWtNVd7L3Ktux9ZaxBvShDriTO2/InhxSlMA042NeOHAYAlADzfpyIbFBplLp/u42bnBRzHYWVjHa01bdlWrnT0sV4t8mppBmFYeL4PgAkgPUnJq9LQHpdyvbizn9koFgl8n3gsxlZ5D39+gcFsDwrNjqwiPXkIcKVHvrxJwa3SIgOcmRkCIUil0+yUSkTxOLsfpmltKHaVQ778A1d6vwMcwlBTk3W2kzaJ5VWyc/Ns1euYmWbK468xZ+cpZBJU3CphqHGls58QgJQSO2njKo+RlY8M3L3Dzq3bdHSdoimdRn9bpO3xEx5tLrDn1MidaMGX8hCgpIeIkqTsBCMLb+gebOfe2Cjm+ASh72M+uM9T1ng28ZKUnSCKQtSBhf0UlCJBREzY2Jbg4fvnTHadpX/gPKZpMLc0zOzqV2xLYBkmIRGeUr8AKtIh5fzmHy2b/v6Oyam3YIDAIi5s5H/qbAAZoBNIH3ELNWDDAKyDIVlHBGhAGced888BANVaBfgg0AbGAAAAAElFTkSuQmCC'
,"af":"Namibia" //
,"sq":"Albania"
//,"ar":"United-Arab-Emirates"
,"hy":"Armenia"
,"az":"Azerbaijan"
,"eu":"Spain"
,"be":"Belarus"
,"bn":"Bangladesh"
,"bs":"Bosnian"
,"bg":"Bulgaria"
,"ca":"Spain"
,"ceb":"Philippines"
,"ny":"Mozambique"
/* ,"zh-CN":"Chinese"*/
,"hr":"Croatia"
,"cs":"Czech-Republic"
,"da":"Denmark"
,"nl":"Netherlands"
/*, "en":"English"*/
,"eo":"United-Nations"
,"et":"Estonia"
,"tl":"Philippines"
,"fi":"Finland"
,"fr":"France"
,"gl":"Ukraine"
,"ka":"Georgia"
,"de":"Germany"
,"el":"Greece"
,"gu":"India"
,"ht":"Haiti"
,"ha":"Nigeria"
,"iw":"Israel"
,"hi":"India"
,"hmn":"Laos"
,"hu":"Hungary"
,"is":"Iceland"
,"ig":"Nigeria"
,"id":"Indonezia"
,"ga":"Ireland"
,"it":"Italy"
,"ja":"Japan"
,"jw":"Japan"
,"kn":"India"
,"kk":"Kazakhstan"
,"km":"Cambodia"
,"ko":"North-Korea"
,"lo":"Laos"
,"la":"Vatican-City"
,"lv":"Latvia"
,"lt":"Lithuania"
,"mk":"Macedonia"
,"mg":"Madagascar"
,"ms":"Malaysia"
,"ml":"India"
,"mt":"Malta"
,"mi":"New-Zealand"
,"mr":"India"
,"mn":"Mongolia"
,"my":"Burma" //absent
,"ne":"Nepal"
,"no":"Norway"
,"fa":"Iran"
,"pl":"Poland"
,"pt":"Brazil"
,"pa":"Pakistan"
,"ro":"Romania" 
/*, "ru":"Russia"*/
,"sr":"Serbia"
,"st":"Lesotho"
,"si":"Sri-Lanka"
,"sk":"Slovakia"
,"sl":"Slovenia"
,"so":"Somalia"
,"es":"Spain"
,"su":"Sudan"
,"sw":"Mozambique"
,"sv":"Sweden"
,"tg":"Tajikistan"
,"ta":"India"
,"te":"India"
,"th":"Thailand"
,"tr":"Turkey"
,"uk":"Ukraine"
,"ur":"Pakistan"
,"uz":"Uzbekistan"
,"vi":"Viet-Nam"
,"cy":"Wales"
,"yi":"Israel"
,"yo":"Nigeria"
,"zu":"South-Africa"
};
imgFlags['zh-TW'] = imgFlags['zh-CN'];
imgFlags['to'] = imgForwSrc; imgFlags['from'] = imgBackSrc;

languagesGoogle = '<option value="auto">Detect language</option>\
</option><option value="af">Afrikaans</option><option value="sq">Albanian</option><option value="ar">Arabic</option><option value="hy">Armenian</option><option value="az">Azerbaijani</option><option value="eu">Basque</option><option value="be">Belarusian</option><option value="bn">Bengali</option><option value="bs">Bosnian</option><option value="bg">Bulgarian</option><option value="ca">Catalan</option><option value="ceb">Cebuano</option><option value="ny">Chichewa</option><option value="zh-CN">Chinese</option><option value="hr">Croatian</option><option value="cs">Czech</option><option value="da">Danish</option><option value="nl">Dutch</option><option value="en">English</option><option value="eo">Esperanto</option><option value="et">Estonian</option><option value="tl">Filipino</option><option value="fi">Finnish</option><option value="fr">French</option><option value="gl">Galician</option><option value="ka">Georgian</option><option value="de">German</option><option value="el">Greek</option><option value="gu">Gujarati</option><option value="ht">Haitian Creole</option><option value="ha">Hausa</option><option value="iw">Hebrew</option><option value="hi">Hindi</option><option value="hmn">Hmong</option><option value="hu">Hungarian</option><option value="is">Icelandic</option><option value="ig">Igbo</option><option value="id">Indonesian</option><option value="ga">Irish</option><option value="it">Italian</option><option value="ja">Japanese</option><option value="jw">Javanese</option><option value="kn">Kannada</option><option value="kk">Kazakh</option><option value="km">Khmer</option><option value="ko">Korean</option><option value="lo">Lao</option><option value="la">Latin</option><option value="lv">Latvian</option><option value="lt">Lithuanian</option><option value="mk">Macedonian</option><option value="mg">Malagasy</option><option value="ms">Malay</option><option value="ml">Malayalam</option><option value="mt">Maltese</option><option value="mi">Maori</option><option value="mr">Marathi</option><option value="mn">Mongolian</option><option value="my">Myanmar (Burmese)</option><option value="ne">Nepali</option><option value="no">Norwegian</option><option value="fa">Persian</option><option value="pl">Polish</option><option value="pt">Portuguese</option><option value="pa">Punjabi</option><option value="ro">Romanian</option><option value="ru">Russian</option><option value="sr">Serbian</option><option value="st">Sesotho</option><option value="si">Sinhala</option><option value="sk">Slovak</option><option value="sl">Slovenian</option><option value="so">Somali</option><option value="es">Spanish</option><option value="su">Sundanese</option><option value="sw">Swahili</option><option value="sv">Swedish</option><option value="tg">Tajik</option><option value="ta">Tamil</option><option value="te">Telugu</option><option value="th">Thai</option><option value="tr">Turkish</option><option value="uk">Ukrainian</option><option value="ur">Urdu</option><option value="uz">Uzbek</option><option value="vi">Vietnamese</option><option value="cy">Welsh</option><option value="yi">Yiddish</option><option value="yo">Yoruba</option><option value="zu">Zulu</option>\
';

/* */
try{
//body = window;
//while(body.parent && body.parent != body) body=body.parent;
//body = body.document.body;
body=//document.documentElement.appendChild(document.createElement('section'));
 window.document.body;

maxHT=GM_getValue('histSize'); 
if(!maxHT) maxHT=20;
maxWC=GM_getValue('histWc');
if(!maxWC) maxWC=3;
sourceBH = GM_getValue('sourceBH',3);
sourceDP = GM_getValue('sourceDP',10);
if(!sourceDP) sourceDP = 10;

var av = GM_getValue('version');
if( av!= version ){
  GM_setValue('version',version);
}
sT=GM_getValue('sourceText');
if (sT){ 
 try{
  sT=JSON.parse(sT);
 }catch(e){console.log('broken source\n'+e)} ;
} else sT='';

// gmail spoils my timeout -- workaround
// borrowed from dbaron.org/log/20100309-faster-timeouts :
// Only add setZeroTimeout to the window object, and hide everything
// else in a closure.
  (function() {
      var timeouts = [];
      var messageName = "zero-timeout-130613";
      // Like setTimeout, but only takes a function argument.  There's
      // no time argument (always zero) and no arguments (you have to
      // use a closure).
      function setZeroTimeout(fn) {
          timeouts.push(fn);
          window.postMessage(messageName, "*");
      }
      function handleMessage(event) {
          if (event.source == window && event.data == messageName) {
              event.stopPropagation();
              if (timeouts.length > 0) {
                  var fn = timeouts.shift();
                  fn();
      }   }    }
      window.addEventListener("message", handleMessage, true);
      // Add the one thing we want added to the window object.
      window.setZeroTimeout = setZeroTimeout;
  })();

document.addEventListener('mouseup', showLookupIcon, false);
document.addEventListener('mousedown', mousedownCleaning, false);
// http://www.senojflags.com/#flags16
if(  location.href.indexOf(senojflags[0])>-1
   //|location.href == senojflags[1]
){try{
  if(!fCSS)  fCSS=
  'div#flags16 img {cursor: pointer !important}'+
  'div#flags48,div#flags32 {display:none; visibility: hidden}'
  stickStyle(fCSS);
  _log('inside\n' + location.href);
  insBefore(buildEl('p',{style:'font: bold italic 90% sans-serif; color:red;',
  align:'left'},null,'&nbsp;&nbsp;<u>Click on a country flag icon then choose the language</u>'),
  getId('flags16').childNodes[0]);
  getId('flags16').addEventListener('click',flagClick,false)
 }catch(e){console.log('senojflags\n'+e)}
}
}catch(e){console.log('nobody\n'+e); }

function deURI(u,m){
  if(!m) m= "&q=";
  var x = u.indexOf(m);
  if(x>=0) u=u.substr(x + m.length);
  return decodeURIComponent(u).split(' ').slice(0,9).join(' ');
}
 var uq=location.href.match(/^https:\/\/translate\.google\.[a-z]{2,3}\/translate_tts\?client\=t\&.+?(\&q\=.+)/);
 if(uq && uq[1]) 
  window.document.title=deURI(uq[1]);

}
main();
}
//