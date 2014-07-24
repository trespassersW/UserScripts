// ==UserScript==
// @name           Yandex-two-columns
// @namespace      >>
// @description    две колонки результатов Яндекса - и ничего лишнего
// @include        http://yandex.ru/yandsearch*
// @include  /^https?:\/\/(www\.)?yandex\..+\/(yand)?search.+/
// @run-at document-start
// @author         trespassersW
// -homepageURL http://userscripts.org/scripts/show/120602
// -updateURL https://userscripts.org/scripts/source/120602.meta.js
// @author trespassersW
// @version 2.014.0724
// @date 2014-07-24
// @grant GM_setValue
// @grant GM_getValue
// @grant GM_addStyle
// @grant GM_registerMenuCommand
// 2014-06-15 новый дизайн йандекса
// 2014-01-17 поправлена легенда на картах
// 2013-06-18 верхняя часть страницы убрана в левый угол
// 2013-06-04 ссылка на кэш при выключенном JS 
// 2013-06-01 видео ВК ОК.
// 2013-05-07 works again
// 2013-03-26 фото википедия видео
// 2013-03-24 7 м назад
// 2013-03-16 вконтакты
// 2012-12-07 fixes
// 1.1.1 реклама в правом верхнем углу
// 1.1.0 новые потроха яндекса
// 1.0.1 - .by .kz .com.tr .ua
// 1.0c -починил картинки
// @icon data:image/gif;base64,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
// ==/UserScript==
(function(){
var YCC = 2;
/* column-count: число колонок -- ставь сколько влезет! */
var column_count="\
div.content__left {\
-moz-column-count: YCC !important;\
-webkit-column-count: YCC !important;\
-column-count: YCC !important;\
}\
"; //
var css= //userstyles.org/styles/57878/yandex-two-columns
'div.content__left{-moz-column-gap:6px !important;-moz-column-rule:thin dotted gray !important;-webkit-column-gap:6px !important;-webkit-column-rule:thin dotted gray !important;column-gap:6px !important;column-rule:thin dotted gray !important;width:auto !important;min-width:350px !important}.main__left:before{position:absolute !important;visibility:visible !important;top:0 !important;left:0 !important;right:auto !important;bottom:auto !important;z-index:247 !important;background-color:rgba(255,240,220,.7) !important;opacity:.9 !important;content:"•••" !important;width:80px !important;height:1.2em !important;text-align:center !important;border:thin solid grey !important;border-radius:16px 0 16px 0 !important}.main__left{position:absolute !important;top:0 !important;left:0 !important;right:auto !important;bottom:auto !important;z-index:246 !important;background-color:rgba(255,240,220,.9) !important;opacity:1 !important;visibility:hidden !important;border:1px solid grey !important;border-radius:16px 0 16px 0 !important;margin:0 !important;padding:0 !important;top:60px !important;transition:all 0 linear .75s !important;-webkit-transition:all 0 linear .75s !important}.main__left:hover{visibility:visible !important;transition:all 0 linear .3s !important;-webkit-transition:all 0 linear .3s !important}.main__left:hover:before{visibility:hidden !important;transition:all 0 linear .25s !important;-webkit-transition:all 0 linear .25s !important}.serp-item__wrap{padding:8px 0 0 12px !important}.main__center-inner{margin-left:10px !important}.header__wrapper{position:absolute !important}.content__right:before{position:absolute !important;visibility:visible !important;top:0 !important;right:0 !important;left:auto !important;bottom:auto !important;width:64px !important;height:1em !important;border:1px solid #444 !important;border-radius:16px 0 16px 0 !important;background:rgba(236,236,254,.9) !important;opacity:.9 !important;z-index:247 !important;content:"•" !important;text-align:center !important}.content__right{position:absolute !important;visibility:hidden !important;opacity:1 !important;top:60px !important;right:0 !important;left:auto !important;min-height:1.2em !important;border:1px solid #444 !important;border-radius:16px 0 16px 0 !important;background:rgba(236,236,254,.9) !important;z-index:247 !important;margin:0 !important;padding:0 !important;transition:all 0 linear .75s !important;-webkit-transition:all 0 linear .75s !important}.content__right:hover{visibility:visible !important;transition:all 0 linear .3s !important;-webkit-transition:all 0 linear .3s !important}.content__right:hover:before{visibility:hidden !important;transition:all 0 linear .3s !important;-webkit-transition:all 0 linear .3s !important}.content__left h2 span.favicon{left:auto !important;right:1px !important;top:12px !important;padding-right:2px !important;margin-right:0 !important}.main__center-inner .main__footer:before{position:fixed !important;background:rgba(255,219,76,.5) !important;opacity:.8 !important;color:red !important;z-index:247 !important;right:0 !important;left:auto !important;visibility:visible !important;padding:0 !important;margin:0 4px 4px 0 !important;border:thin solid grey !important;border-radius:0 12px 0 12px !important;top:auto !important;bottom:0 !important;width:32px !important;height:32px !important;content:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAg0lEQVRYw+1WQQ7AMAhCs/9/2f1g6QRnm8m9ARG1wODvsMyjAOIFwSOHV5KvwDvJAeAS9NAYkc5Ub8kMURlQklMCWkK4lQDVRFAOBBCsEKuuWroJVcmnWqAW4Z07QD6GGWGuGsGsK2ed44pMeJf1knPc3oLP/gNVn5ElAVXWb7MJB4MbjH4eMZju9DwAAAAASUVORK5CYII=) !important}.main__center-inner .main__footer{position:fixed !important;z-index:248 !important;padding:0 4px 0 0 !important;margin:0 !important;width:auto !important;min-width:300px !important;bottom:0 !important;right:1px !important;top:auto !important;left:auto !important;background:rgba(236,236,254,.9) !important;border:1px solid #777 !important;border-width:1px 0 0 1px !important;border-radius:0 16px 0 16px !important;visibility:hidden !important;transition:all 0 linear .6s !important;-webkit-transition:all 0 linear .6s !important}.main__center-inner .main__footer>*{text-align:right !important}.main__center-inner .main__footer:hover{visibility:visible !important;transition:all 0 linear .25s !important;-webkit-transition:all 0 linear .25s !important}.main__center-inner .main__footer:hover:before{visibility:hidden !important;opacity:0 !important;transition:all 0 linear .25s !important;-webkit-transition:all 0 linear .25s !important}.map__overlay-pane,.ymaps-copyright-legend-container,.map__controls{opacity:.3 !important;transition:all 0 linear .5s !important;-webkit-transition:all 0 linear .5s !important}.map__overlay-pane:hover,.ymaps-copyright-legend-container:hover,.map__controls:hover{opacity:1 !important;transition:all 0 linear .2s !important;-webkit-transition:all 0 linear .2s !important;transition-delay:.2s !important}.main__center-inner>.intents{display:none !important}.main.layout .main__center,.serp-list{padding:0 !important}.main.layout .main__center{margin-top:4px !important}.footer__col{padding-bottom:0 !important}div.main{background-color:#fefdfc}.serp-item__extra-wrap .serp-item__data{overflow:visible !important}.serp-item_glue_fresh .serp-item__extra_type_right{margin:0 !important;padding:0 4px !important;text-align:right !important;width:auto !important}.b-serp-item__date{color:#789 !important}.serp-item__title{margin-top:-8px !important;padding-top:4px !important;padding-bottom:4px !important}.b-page_baseline_serp3 .z-news__links{margin-top:-8px}body .serp-item__greenurl{margin-top:-1px !important}.serp-item__passages{color:#888;margin-top:0}.serp-list ~ .intents{display:none !important}div.serp-block div.serp-item>div{background-image:linear-gradient(to top,rgba(255,255,255,.5),rgba(224,224,255,.5));border-radius:8px 16px 0 0}.intents__container{margin-top:4px !important;margin-bottom:4px !important}';

function col_cnt(c){
if(c==YCC) return;
YCC=c;
console.log(c+' колонки');
GM_setValue("yandex_column_count",c);
GM_addStyle(column_count.replace(/YCC/g,c));
//window.location.reload(true);
};

//if(!document.body) return;
GM_registerMenuCommand("Яндекс: 2 колонки", function(){col_cnt(2)});
GM_registerMenuCommand("Яндекс: 3 колонки", function(){col_cnt(3)});
GM_registerMenuCommand("Яндекс: 4 колонки", function(){col_cnt(4)});

YCC=GM_getValue("yandex_column_count",YCC);
GM_addStyle(css+column_count.replace(/YCC/g,YCC));
console.log(YCC+' колонки');
})();