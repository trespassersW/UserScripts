/* Bookmaklet that changes 'position:fixed' to 'position:absolute' for all elements on a page */
javascript:(function(){
  var _l;
  if(1) _l=console.log.bind(console); else _l= function(){};
function bmlet(I, C) {
  var D = document,
  W = window,
  A = "appendChild",
  N,  h,  s = 0,
  m='bml_'+I,  w= (typeof(W[m]) === "undefined");
  if (!w) {
    W[m].disabled = s = !W[m].disabled;
    _l('fx '+(s? 'disa': 'ena')+'bled');
  } else {
    _l('create '+m);
    N = D.createElement("style");
    N.type = "text/css";
    N[A](D.createTextNode(C));
    W[m] = (D.head || D.documentElement)[A](N);
    var q=document.querySelectorAll('div,p,input,form,nav,header,footer,aside');
    for(var i=0,ci=0,li=q.length;i<li;i++){
      if(getComputedStyle(q[i],null)['position']=='fixed')
        q[i].setAttribute(atr,"true"),ci++;
    }
    _l(ci+' fixes in '+li+ 'items');
  }
  W.status = I + (s ? "\x20"+"OFF" : "\x20"+"ON");
  return w
}
var id='FixToAbs', atr='data-wasfixed';
function f() {return bmlet(id, '['+atr+']{position:absolute!important}' )}
f(); 
})();

javascript:(function(){var _l;if(1)_l=console.log.bind(console);else _l=function(){};function bmlet(I,C){var D=document,W=window,A="appendChild",N,h,s=0,m='bml_'+I,w=(typeof(W[m])==="undefined");if(!w){W[m].disabled=s=!W[m].disabled;_l('fx '+(s?'disa':'ena')+'bled');}else{_l('create '+m);N=D.createElement("style");N.type="text/css";N[A](D.createTextNode(C));W[m]=(D.head||D.documentElement)[A](N);var q=document.querySelectorAll('div,p,input,form,nav,header,footer,aside');for(var i=0,ci=0,li=q.length;i<li;i++){if(getComputedStyle(q[i],null)['position']=='fixed')q[i].setAttribute(atr,"true"),ci++;}_l(ci+' fixes in '+li+'items');}W.status=I+(s?"\x20"+"OFF":"\x20"+"ON");return w}var id='FixToAbs',atr='data-wasfixed';function f(){return bmlet(id,'['+atr+']{position:absolute!important}')}f();})();