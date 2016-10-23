// ==UserScript==
// @name           Yandex-two-columns
// @namespace      trespassersW
// @description    две колонки результатов Яндекса - и ничего лишнего
// @include        http://yandex.ru/yandsearch*
// @include  /^https?:\/\/(www\.)?yandex\..+\/(yand)?search.+/
// @run-at document-start
// @license MIT
// @copyright  trespassersW
// -homepageURL http://userscripts-mirror.org/scripts/show/120602
// -updateURL https://userscripts-mirror.org/scripts/source/120602.meta.js
// @version 2.016.1023
//   2016-10-23 * убивание горизонтального скролбара
//   2016-03-16 * заплата для yandex.COM
// @grant GM_setValue
// @grant GM_getValue
// @grant GM_addStyle
// @grant GM_registerMenuCommand
// @icon data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAQCAYAAAB3AH1ZAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAADPElEQVRIx42VzWsbVxTFf5KsKTKp6RcooUHCYNCqC0MW9WYgkEWg2Sj2IlQbk4AFaejCgSz8HzhQvBBtClJApJuAYywJBCLZGjzOLkSUFBREJzHGiVzPdCKPXsfzXhbyKLKYNLpw4fDOmXPvu2/mTYTw+Bb4mk/Hf0NYG0N/AOx+SpSs1+vLaoxwXdcEfnBd1xxHX6/Xl4Hk/xVP6LquCyH2pZRqnAR+HFcrhNjXdV0HEkHByEgD6Var9cv09PT8qVVPEHn0G5Hn2/DvPzD5OfLuJgCxWGzR9/0yQPROFo4cmPoK9d0cauEmxD87ZdVutzdmZmZuA38DRIe4c4VC4XI6nZ6XUjKcrBfh6Rb+1VvISzmwuh84iA+w1UVeyuFfvQVPt2C9yKhXOp2eLxQKl4Fzw41pyWTyomVZr4QQajTlgq682kMlhFBeY1OpKxcGHHAzwOrKBeU1Nvu62kMlF3QV5mdZ1qtkMnkR0IIJpKrV6nVN0877vs9oRl60kfFJfN9HdgVqzx5wgBZgtWcju6Kvi08SedEmzE/TtPPVavU6kBo0kMlkrnmeR1j6U2eh8biPuy68cQYcoA3wGwe/6/Zx4zH+1Fk+5pnJZK4BqYmTBiZs2yYajYZ+GuLn23xz4wb+8z+J9Hooq4tt24PjC/AZq0vk9yLx8h/Ed3bo3L9P74PuVJy8PxNBxdeGYay7rktYHs7OsreyAoZBT0p6MOCAiQD3gJ6UYBjsraxwODvLxzwNw1gHXgcNvMzn8xuWZe2GHkGnQ3xtjf2lJQ6yWY6UCj2CI6U4yGbZX1oivraG3+mEjt+yrN18Pr8BvAwaELZtPyuVSveOj48ZzdjqKk4igZ3LIaTEgQEHxAPsAEJK7FwOJ5EgtrpKmF+pVLpn2/YzQAwfeqtYLDaazeaTU7vf2sKr1bCXl/EAcXxMF4YnEA9w94T3oK+v1frPD/k1m80nxWKxAbTCbsIvUqnUQrlcvptIJL4c4+fC3Nzcr9vb2z+No3Vd93BxcfGOaZqPAGv0JgSwTNPcqVQqD8K+39F0HOct8M5xnLfj6CuVygPTNHeC4mETCOJ7IDPGpt4BPhADzoyh/wswhhfeA9PtjejwVJkmAAAAAElFTkSuQmCC
// ==/UserScript==

(function(){

var YCC = 2; /* column-count: число колонок -- ставь сколько влезет! */

var column_count="\
div.content__left {\
-moz-column-count: YCC !important;\
-webkit-column-count: YCC !important;\
-column-count: YCC !important;\
}\
";

var css= //userstyles.org/styles/57878/yandex-two-columns
'div.content__left{-moz-column-gap:6px!important;-moz-column-rule:thin dotted gray!important;-webkit-column-gap:6px!important;-webkit-column-rule:thin dotted gray!important;column-gap:6px!important;column-rule:thin dotted gray!important;width:auto!important;min-width:350px!important}.main__left:before{position:absolute!important;visibility:visible!important;top:0!important;left:0!important;right:auto!important;bottom:auto!important;z-index:247!important;background-color:rgba(255,240,220,.7)!important;opacity:.9!important;content:"•••"!important;width:80px!important;height:1.2em!important;text-align:center!important;border:thin solid grey!important;border-radius:16px 0 16px 0!important}.main__left{position:absolute!important;top:390px!important;left:0!important;right:auto!important;bottom:auto!important;z-index:247!important;background-color:rgba(255,240,220,.9)!important;opacity:1!important;visibility:hidden!important;border:1px solid grey!important;border-radius:16px 0 16px 0!important;margin:0!important;padding:0!important;transition:visibility 0 linear .75s!important}.main__left:hover{visibility:visible!important;transition:visibility 0 linear .3s!important}.main__left:hover:before{visibility:hidden!important;transition:visibility 0 linear .25s!important}.main__left:hover .navigation__more{visibility:visible!important}.main__left .navigation__more{visibility:hidden!important}.serp-item__wrap{padding:8px 0 0 12px !important}.main__center-inner{margin-left:10px!important}.header__wrapper{position:absolute!important}.content__right:before{position:absolute!important;visibility:visible!important;top:0!important;right:0!important;left:auto!important;bottom:auto!important;width:64px!important;height:1em!important;border:1px solid #444!important;border-radius:16px 0 16px 0!important;background:rgba(236,236,254,.9)!important;opacity:.9!important;z-index:249!important;content:""!important}.content__right{position:absolute!important;visibility:hidden!important;opacity:1!important;top:390px!important;right:0!important;left:auto!important;bottom:auto!important;min-height:1.2em!important;border:1px solid #444!important;border-radius:16px 0 16px 0!important;background:rgba(236,236,254,.9)!important;z-index:249!important;margin:0!important;padding:12px!important;width:auto!important;min-width:40px!important;transition:visibility 0 linear .75s!important}.content__right:hover{visibility:visible!important;margin-right:0!important;transition:visibility 0 linear .3s!important}.content__right:hover:before{visibility:hidden!important;transition:visibility 0 linear .4s!important;-webkit-transition:visibility 0 linear .2s!important}.content__left h2 span.favicon{left:auto!important;right:1px!important;top:12px!important;padding-right:2px!important;margin-right:0!important}.content__left .pager:before{position:fixed!important;background:rgba(255,219,76,.5)!important;opacity:.8!important;color:red!important;z-index:248!important;right:0!important;left:auto!important;visibility:visible!important;padding:0!important;margin:0 4px 4px 0 !important;border:thin solid grey!important;border-radius:0 12px 0 12px!important;top:auto!important;bottom:0!important;width:32px!important;height:32px!important;content:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAg0lEQVRYw+1WQQ7AMAhCs/9/2f1g6QRnm8m9ARG1wODvsMyjAOIFwSOHV5KvwDvJAeAS9NAYkc5Ub8kMURlQklMCWkK4lQDVRFAOBBCsEKuuWroJVcmnWqAW4Z07QD6GGWGuGsGsK2ed44pMeJf1knPc3oLP/gNVn5ElAVXWb7MJB4MbjH4eMZju9DwAAAAASUVORK5CYII=)!important}.content__left .pager{position:fixed!important;z-index:248!important;padding:0 4px 0 0 !important;margin:0!important;width:auto!important;min-width:300px!important;bottom:0!important;right:1px!important;top:auto!important;left:auto!important;background:rgba(236,236,254,.9)!important;border:1px solid #777!important;border-width:1px 0 0 1px !important;border-radius:0 16px 0 16px!important;visibility:hidden!important;transition:visibility 0 linear .6s!important;-webkit-transition:visibility 0 linear .6s!important}.content__left .pager > *{text-align:right!important}.content__left .pager:hover{visibility:visible!important;transition:visibility 0 linear .25s!important;-webkit-transition:visibility 0 linear .25s!important}.content__left .pager:hover:before{visibility:hidden!important;opacity:0!important;transition:visibility 0 linear .25s!important;-webkit-transition:visibility 0 linear .25s!important}.map__overlay-pane,.ymaps-copyright-legend-container,.map__controls{opacity:.3!important;transition:visibility 0 linear .5s!important;-webkit-transition:visibility 0 linear .5s!important}.map__overlay-pane:hover,.ymaps-copyright-legend-container:hover,.map__controls:hover{opacity:1!important;transition:opacity 0 linear .2s!important;-webkit-transition:opacity 0 linear .2s!important;transition-delay:.2s!important}.main__center-inner > .intents{display:none!important}.main.layout .main__center,.serp-list{padding:0!important}.main.layout .main__center{margin-top:4px!important}.footer__col{padding-bottom:0!important}div.main{background-color:#FEFDFC}.serp-item__extra-wrap .serp-item__data{overflow:visible!important}.serp-item_glue_fresh .serp-item__extra_type_right{margin:0!important;padding:0 4px!important;text-align:right!important;width:auto!important}.b-serp-item__date{color:#789!important}.serp-item__title{margin-top:-8px!important;padding-top:4px!important;padding-bottom:4px!important}.b-page_baseline_serp3 .z-news__links{margin-top:-8px!important}body .serp-item__greenurl{margin-top:-1px!important}.serp-item__passages{color:#888;margin-top:0!important}.serp-list ~ .intents{display:none!important}.serp-list .serp-item{background-image:linear-gradient(to top,rgba(255,255,255,.5),rgba(224,224,255,.5));border-radius:8px 16px 0 0;padding:4px 2px!important}.intents__container{margin-top:4px!important;margin-bottom:4px!important}.z-images{padding-left:0!important;padding-right:0!important}.z-entity__right-list{margin-left:0!important}.z-images.i-bem div.serp-url{margin-left:.1em!important;max-width:49vw!important;overflow-x:hidden!important}.z-related-list{margin-left:-4px!important}.footer{line-height:14px!important;margin-top:4px!important;padding:2px!important}.content__left .region-change,.content__left .competitors{display:inline-block!important;padding-left:2em!important}.content__right .z-entity-search:before{display:block!important;visibility:visible!important;position:absolute!important;top:1px!important;right:0!important;z-index:214748!important;content:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAAOCAYAAAB6pd+uAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAABIUlEQVRIx+2WsUrDYBSFz0nFREgwoUueoFuRLllqCy6CCqKLoItrfQefwMlXcHNWRNGhTkbaoQVBAt0sgmRRG5A/4YfrUqQ4uAiBhJ71DodzOffjAiUXc/Qy2u3tCwCLcRzvRNHjVx6mC3mlC4J1n+QWAFSr1RUAYS5bza0q5KxXJbfalP0G5wHnFP1D9XrL8TzvREQesizrWpY1BgCtdYvksmEYm0mSHA8G3fdCUtR13T2SHZId0zTPfghTqRwB2CdJ27ZHAE4LWVGl1JWIvEwpejhD1AOSFJEPrfVNYW+w3797S9N0VUSef89EZKy1bobhdVT4T6bRWPMcx7kk2ZyGe1JKbfR6t6+ledVqtWDJ9/1zAM5kMtkdDu8/Mdf/9Q3ZjVsP7qiLvwAAAABJRU5ErkJggg==)!important}.content__right:hover .z-entity-search:before{visibility:hidden!important;transition:visibility 0 linear .3s!important;-webkit-transition:visibility 0 linear .3s!important}.z-related-list{margin-top:0!important}.main{min-height:calc(100% - 0.1em)!important}.ymaps-map,.map__dynamic-map{width:100%!important}.z-news__title a.b-link{max-width:42vw!important}.serp-item__extra_type_right{margin-left:1px!important}.serp-item__extra_type_right .serp-item__mime{display:inline-block!important;position:relative!important}.serp-item__extra_type_right .serp-item__mime-size{display:block!important;position:absolute!important;line-height:12px!important;bottom:-.3em!important;right:1px!important;background:rgba(227,227,227,.4)!important;border-radius:10px;font-size:x-small!important}h2.serp-item__title >a{max-width:505px!important;max-width:47vw!important;overflow:hidden!important}.b-page_initial-scroll_yes{overflow-y:auto!important}.content__left .intents{padding:5px 0 0 8px !important}body .header_fixed_yes{min-height:64px!important}.main__center{margin-left:3px!important;padding-left:0!important}.main_distro-footer_yes{padding-top:410px!important}.serp-item{margin-bottom:0!important}.intents{margin-bottom:2px!important}.content__left .related{margin-bottom:2px!important}.footer .footer__line{display:inline-block!important;padding-left:2em!important}.footer .distro{display:none!important}.footer__inner{padding:0!important}.footer__line{line-height:1em!important}.main{padding-bottom:0!important}.main__center{min-height:calc(84vh - 1em)!important}.serp-meta{white-space:normal!important}.pager .pager__item{text-align:center!important}.serp-item{max-width:49vw!important}.related .related__column{-moz-column-count:2;-webkit-column-count:2;column-count:2;-moz-column-width:23vw!important;-webkit-column-width:23vw!important;column-width:23vw!important;margin-left:4px!important}.audio-track,.audio-playlist{margin-right:0!important}.serp-header__wrapper{position:absolute!important}.organic__outside-wrapper-right{display:inline-block!important;width:auto!important;margin:0 0 0 4px !important}.organic__outside-wrapper-left{margin-right:0!important}.z-video_design_new,.z-images__thumbs-list{width:auto!important}.z-video_carousel-size_small{max-width:none!important}.template-fact,.z-maps .map,.z-maps .map [style^="width"],.navigation{width:auto!important}.serp.serp__spin.i-bem.serp_js_inited.serp_loading_yes.serp__spin_progress_yes{z-index:-1!important}';

/* 160316 */
if(new RegExp("^https?://(www\.)?yandex\.com/(yand)?search.+").test(location.href)){
css+='\
div.main .main__left, div.main .content__right {top: 168px !important;}\
';
}
/* */
var PYD = 'yandex_column_count';

function _l(m){
 console.log(m);
}

function stickStyle(I,C){  // (id,css)
 var D=document,W=window,A="appendChild",N;
 N=D.createElement("style");N.type="text/css";
 N[A](D.createTextNode(C));
 if(W[I]) W[I].parentNode.removeChild(W[I]);
 W[I]=(D.head||D.documentElement)[A](N);
}

function col_cnt(c, d){
 if(!d && c==YCC) return;
 YCC=c;
 GM_setValue(PYD, c);
 stickStyle(PYD, css + column_count.replace(/YCC/g,c));
 _l(c+' колонки');
//window.location.reload(true);
};

GM_registerMenuCommand("Яндекс: 2 колонки", function(){col_cnt(2)});
GM_registerMenuCommand("Яндекс: 3 колонки", function(){col_cnt(3)});
GM_registerMenuCommand("Яндекс: 4 колонки", function(){col_cnt(4)});

YCC=GM_getValue(PYD,YCC);

col_cnt(YCC,true)

})();
