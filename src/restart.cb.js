﻿/*Initialization Code*/
// from : ClassicThemeRestorer@ArisT2Noia4dev
function restart() {
var cancelQuit   = Cc["@mozilla.org/supports-PRBool;1"].createInstance(Ci.nsISupportsPRBool);
var observerSvc  = Cc["@mozilla.org/observer-service;1"].getService(Ci.nsIObserverService);
observerSvc.notifyObservers(cancelQuit, "quit-application-requested", "restart");
if(cancelQuit.data) return false;
Services.startup.quit(Services.startup.eRestart | Services.startup.eAttemptQuit);
return true;
}
this.onclick=function(e) {
if(e.button!==0) return;
e.preventDefault(),e.stopPropagation();
if( !restart() ) alert('something prevents restart')
}


Installation: Copy the following line into Firefox location bar.
custombutton://%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22UTF-8%22%3F%3E%0D%0A%3Ccustombutton%20xmlns%3Acb%3D%22http%3A//xsms.nm.ru/custombuttons/%22%3E%0A%20%20%3Cname%3Erestart%20browser%3C/name%3E%0A%20%20%3Cimage%3E%3C%21%5BCDATA%5Bdata%3Aimage/png%3Bbase64%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%3D%3D%5D%5D%3E%3C/image%3E%0A%20%20%3Cmode%3E0%3C/mode%3E%0A%20%20%3Cinitcode%3E%3C%21%5BCDATA%5B//%20from%20%3A%20ClassicThemeRestorer@ArisT2Noia4dev%0Afunction%20restart%28%29%20%7B%0Avar%20cancelQuit%20%20%20%3D%20Cc%5B%22@mozilla.org/supports-PRBool%3B1%22%5D.createInstance%28Ci.nsISupportsPRBool%29%3B%0Avar%20observerSvc%20%20%3D%20Cc%5B%22@mozilla.org/observer-service%3B1%22%5D.getService%28Ci.nsIObserverService%29%3B%0AobserverSvc.notifyObservers%28cancelQuit%2C%20%22quit-application-requested%22%2C%20%22restart%22%29%3B%0Aif%28cancelQuit.data%29%20return%20false%3B%0AServices.startup.quit%28Services.startup.eRestart%20%7C%20Services.startup.eAttemptQuit%29%3B%0Areturn%20true%3B%0A%7D%0Athis.onclick%3Dfunction%28e%29%20%7B%0Aif%28e.button%21%3D%3D0%29%20return%3B%0Ae.preventDefault%28%29%2Ce.stopPropagation%28%29%3B%0Aif%28%20%21restart%28%29%20%29%20alert%28%27something%20prevents%20restart%27%29%0A%7D%5D%5D%3E%3C/initcode%3E%0A%20%20%3Ccode%3E%3C%21%5BCDATA%5B/*CODE*/%5D%5D%3E%3C/code%3E%0A%20%20%3Caccelkey%3E%3C%21%5BCDATA%5B%5D%5D%3E%3C/accelkey%3E%0A%20%20%3Chelp%3E%3C%21%5BCDATA%5B%5D%5D%3E%3C/help%3E%0A%20%20%3Cattributes/%3E%0A%3C/custombutton%3E