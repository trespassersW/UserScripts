/*Initialization Code*/

var B=self.ownerGlobal;
if(B.CB_plainclock){ 
 //
}
else{
B.CB_plainclock={
 nClok:null,
 ShowSeconds:0,
 label:"",
 it: null
};
}
B.CB_plainclock.it=this;

this.setAttribute("style", 
"-moz-appearance: none;"+
"font-size: 1.1em; font-weight: bold;"+
"color: #444; background-color: #CFF;"+
"padding:0 !important; margin:0 !important;"+
"border none;"+
"-moz-box-orient:horizontal !important;"+
"");
this.style.width="3.75em";
function dd(s)
{ if((s=s.toString()).length==1) return '0'+s; return s; }

this.onmouseover = function(event) {
  var n=new Date();
   this.tooltipText = n.toLocaleFormat ("%A, ")+
   n.getFullYear()+'.'+dd(n.getMonth()+1)+'.'+dd(n.getDate());
} 

this.onmouseup=function(e){
 if(e.button!==0) return;
 e.preventDefault(),e.stopPropagation();
 var B=self.ownerGlobal;
 if(B.CB_plainclock.ShowSeconds ^= 1)
  this.style.width="5.5em";
 else 
  this.style.width="3.75em";
 B.CB_plainclock.it=this;
 setClok();
}

function count(ss) {
  var n=new Date();
  return dd(n.getHours())+':'+dd(n.getMinutes())+
   (ss? ":"+dd(n.getSeconds()): "");
}

function upDate(){
 var B=self.ownerGlobal;
 var n=count(B.CB_plainclock.ShowSeconds);
 if(B.CB_plainclock.label != n) 
  B.CB_plainclock.label =  B.CB_plainclock.it.label = n;
}
function setClok() {
  var B=self.ownerGlobal; 
  if(B.CB_plainclock.nClok) B.clearInterval(B.CB_plainclock.nClok);
  B.CB_plainclock.nClok=B.setInterval(upDate, 500);
  upDate();
}
/* * */
var ios = Components.classes["@mozilla.org/network/io-service;1"].
  getService(Components.interfaces.nsIIOService);
var sss = Components.classes["@mozilla.org/content/style-sheet-service;1"].
  getService(Components.interfaces.nsIStyleSheetService);
var css = ""+
"#"+ this.id + " .toolbarbutton-icon{display: none !important;}"+
"#"+ this.id + " .toolbarbutton-text{display: -moz-box !important;}";
var uss = ios.newURI("data:text/css," + encodeURIComponent(css), null, null);
// comment out the next line to disable style
if (!sss.sheetRegistered(uss, sss.USER_SHEET)) sss.loadAndRegisterSheet(uss, sss.USER_SHEET);
this.onDestroy = function(reason) {
    if (sss.sheetRegistered(uss, sss.USER_SHEET)) sss.unregisterSheet(uss, sss.USER_SHEET);
    var B=self.ownerGlobal;
    if(B.CB_plainclock && B.CB_plainclock.nClok){
     B.clearInterval(B.CB_plainclock.nClok),B.CB_plainclock.nClok=null;
    }
}

setClok();

/*  trespassersW 2016.09.10 * /
this.setAttribute('author','squeaky,Barbiegirl,morat');
this.setAttribute('version','20110408.2.5');
this.setAttribute('homepage', 'http://custombuttons.mozdev.org/drupal/content/button-clock');
/* * */

custombutton://%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22UTF-8%22%3F%3E%0D%0A%3Ccustombutton%20xmlns%3Acb%3D%22http%3A//xsms.nm.ru/custombuttons/%22%3E%0A%20%20%3Cname%3Eplain%20clock%3C/name%3E%0A%20%20%3Cimage%3E%3C%21%5BCDATA%5Bdata%3Aimage/png%3Bbase64%2CiVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAC4jAAAuIwF4pT92AAAB3klEQVR42rWXgZWCMBBE90qwBVugBVughbRgC7ZAC7RAC9eCtXAM5+i6ZDcJIu/NA/Ik85ldAsqPiERathkq/W6visYppVXfAikaXy6XVdfr9SsgWWOY0djq6ETeAM7n89x13SqbgNVRiWwAtAiiEyEYxz9NJASwINb4drttxlpBqgAIYXsAADoFrVqQLECXlot/kwsC6TvWSbSChABUSyLafJqmeRzHDwCmMghhmAj2MIWGYVgVQcQA4/9YDQgbFXdN40MApJcXyPgOAlNew3LQ9H6/z9h4DrAcRLEHnsYaZJJNGhaAZSGEl4ILYBsREz4TIIgDoHsCSUQp5AEe0YYgvbgAPAYEAPB0eCkUl+IQJACAKQx1WaAqgNNyjEn0wuOBeD3AdwdAmECuDFkAkdOcYJxgnt4gLEgOgKba3CuDAyCrcd/387AYcb9ZktWYTUAb87XeBCCPMkAA+B1e5zoNLwHstbGG0xBhE2oQnQRBPAAa63cDQWwfbD7JcstsLhGCeCWwxmECmBDCj1tBogRyIO5TsBekJgGWImzCPSAnkaoE2Ji5j5Pwc6kWxEtAP5JMDPNVA7SAWAB715yj+q9ZK4gF0H2SM94FEIEQoNb4I4ASSI3xIQAWpMWY+gOh5spuI3lXTAAAAABJRU5ErkJggg%3D%3D%5D%5D%3E%3C/image%3E%0A%20%20%3Cmode%3E0%3C/mode%3E%0A%20%20%3Cinitcode%3E%3C%21%5BCDATA%5B/*Initialization%20Code*/%0A%0Avar%20B%3Dself.ownerGlobal%3B%0Aif%28B.CB_plainclock%29%7B%20%0A%20//%0A%7D%0Aelse%7B%0AB.CB_plainclock%3D%7B%0A%20nClok%3Anull%2C%0A%20ShowSeconds%3A0%2C%0A%20label%3A%22%22%2C%0A%20it%3A%20null%0A%7D%3B%0A%7D%0AB.CB_plainclock.it%3Dthis%3B%0A%0Athis.setAttribute%28%22style%22%2C%20%0A%22-moz-appearance%3A%20none%3B%22+%0A%22font-size%3A%201.1em%3B%20font-weight%3A%20bold%3B%22+%0A%22color%3A%20%23444%3B%20background-color%3A%20%23CFF%3B%22+%0A%22padding%3A0%20%21important%3B%20margin%3A0%20%21important%3B%22+%0A%22border%20none%3B%22+%0A%22-moz-box-orient%3Ahorizontal%20%21important%3B%22+%0A%22%22%29%3B%0Athis.style.width%3D%223.75em%22%3B%0Afunction%20dd%28s%29%0A%7B%20if%28%28s%3Ds.toString%28%29%29.length%3D%3D1%29%20return%20%270%27+s%3B%20return%20s%3B%20%7D%0A%0Athis.onmouseover%20%3D%20function%28event%29%20%7B%0A%20%20var%20n%3Dnew%20Date%28%29%3B%0A%20%20%20this.tooltipText%20%3D%20n.toLocaleFormat%20%28%22%25A%2C%20%22%29+%0A%20%20%20n.getFullYear%28%29+%27.%27+dd%28n.getMonth%28%29+1%29+%27.%27+dd%28n.getDate%28%29%29%3B%0A%7D%20%0A%0Athis.onmouseup%3Dfunction%28e%29%7B%0A%20if%28e.button%21%3D%3D0%29%20return%3B%0A%20e.preventDefault%28%29%2Ce.stopPropagation%28%29%3B%0A%20var%20B%3Dself.ownerGlobal%3B%0A%20if%28B.CB_plainclock.ShowSeconds%20%5E%3D%201%29%0A%20%20this.style.width%3D%225.5em%22%3B%0A%20else%20%0A%20%20this.style.width%3D%223.75em%22%3B%0A%20B.CB_plainclock.it%3Dthis%3B%0A%20setClok%28%29%3B%0A%7D%0A%0Afunction%20count%28ss%29%20%7B%0A%20%20var%20n%3Dnew%20Date%28%29%3B%0A%20%20return%20dd%28n.getHours%28%29%29+%27%3A%27+dd%28n.getMinutes%28%29%29+%0A%20%20%20%28ss%3F%20%22%3A%22+dd%28n.getSeconds%28%29%29%3A%20%22%22%29%3B%0A%7D%0A%0Afunction%20upDate%28%29%7B%0A%20var%20B%3Dself.ownerGlobal%3B%0A%20var%20n%3Dcount%28B.CB_plainclock.ShowSeconds%29%3B%0A%20if%28B.CB_plainclock.label%20%21%3D%20n%29%20%0A%20%20B.CB_plainclock.label%20%3D%20%20B.CB_plainclock.it.label%20%3D%20n%3B%0A%7D%0Afunction%20setClok%28%29%20%7B%0A%20%20var%20B%3Dself.ownerGlobal%3B%20%0A%20%20if%28B.CB_plainclock.nClok%29%20B.clearInterval%28B.CB_plainclock.nClok%29%3B%0A%20%20B.CB_plainclock.nClok%3DB.setInterval%28upDate%2C%20500%29%3B%0A%20%20upDate%28%29%3B%0A%7D%0A/*%20*%20*/%0Avar%20ios%20%3D%20Components.classes%5B%22@mozilla.org/network/io-service%3B1%22%5D.%0A%20%20getService%28Components.interfaces.nsIIOService%29%3B%0Avar%20sss%20%3D%20Components.classes%5B%22@mozilla.org/content/style-sheet-service%3B1%22%5D.%0A%20%20getService%28Components.interfaces.nsIStyleSheetService%29%3B%0Avar%20css%20%3D%20%22%22+%0A%22%23%22+%20this.id%20+%20%22%20.toolbarbutton-icon%7Bdisplay%3A%20none%20%21important%3B%7D%22+%0A%22%23%22+%20this.id%20+%20%22%20.toolbarbutton-text%7Bdisplay%3A%20-moz-box%20%21important%3B%7D%22%3B%0Avar%20uss%20%3D%20ios.newURI%28%22data%3Atext/css%2C%22%20+%20encodeURIComponent%28css%29%2C%20null%2C%20null%29%3B%0A//%20comment%20out%20the%20next%20line%20to%20disable%20style%0Aif%20%28%21sss.sheetRegistered%28uss%2C%20sss.USER_SHEET%29%29%20sss.loadAndRegisterSheet%28uss%2C%20sss.USER_SHEET%29%3B%0Athis.onDestroy%20%3D%20function%28reason%29%20%7B%0A%20%20%20%20if%20%28sss.sheetRegistered%28uss%2C%20sss.USER_SHEET%29%29%20sss.unregisterSheet%28uss%2C%20sss.USER_SHEET%29%3B%0A%20%20%20%20var%20B%3Dself.ownerGlobal%3B%0A%20%20%20%20if%28B.CB_plainclock%20%26%26%20B.CB_plainclock.nClok%29%7B%0A%20%20%20%20%20B.clearInterval%28B.CB_plainclock.nClok%29%2CB.CB_plainclock.nClok%3Dnull%3B%0A%20%20%20%20%7D%0A%7D%0A%0AsetClok%28%29%3B%0A%0A/*%20%20trespassersW%202016.09.10%20*%20/%0Athis.setAttribute%28%27author%27%2C%27squeaky%2CBarbiegirl%2Cmorat%27%29%3B%0Athis.setAttribute%28%27version%27%2C%2720110408.2.5%27%29%3B%0Athis.setAttribute%28%27homepage%27%2C%20%27http%3A//custombuttons.mozdev.org/drupal/content/button-clock%27%29%3B%0A/*%20*%20*/%0A%5D%5D%3E%3C/initcode%3E%0A%20%20%3Ccode%3E%3C%21%5BCDATA%5B/*CODE*/%5D%5D%3E%3C/code%3E%0A%20%20%3Caccelkey%3E%3C%21%5BCDATA%5B%5D%5D%3E%3C/accelkey%3E%0A%20%20%3Chelp%3E%3C%21%5BCDATA%5B%5D%5D%3E%3C/help%3E%0A%20%20%3Cattributes/%3E%0A%3C/custombutton%3E