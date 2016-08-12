
##page own fonts Switcher##

:u7a7a: &nbsp; <a href=https://addons.mozilla.org/firefox/addon/custom-buttons/>*Custom Button*</a>

**Installation**: copy-paste the following code into Firefox URL bar

<pre><code>custombutton://%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22UTF-8%22%3F%3E%0D%0A%3Ccustombutton%20xmlns%3Acb%3D%22http%3A//xsms.nm.ru/custombuttons/%22%3E%0A%20%20%3Cname%3Epage%20own%20fonts%20Switcher%3C/name%3E%0A%20%20%3Cimage%3E%3C%21%5BCDATA%5Bdata%3Aimage/png%3Bbase64%2CiVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAWklEQVR42mNQUFBgwIVL26b/B2F8ahgoNgCmiFzMQDUvkGozTgMIuYCgAcgKsLGJcgE+ZxPtApLDAFcMEIoJojTjMwRv3OPzO94wwBVlWMMAnxMJiVM3KZOLAbc2SFpozMGIAAAAAElFTkSuQmCC%5D%5D%3E%3C/image%3E%0A%20%20%3Cmode%3E2%3C/mode%3E%0A%20%20%3Cinitcode%3E%3C%21%5BCDATA%5B/**%0A%20Switcher%20for%20Tools-%3EOptions-%3EContent-%3EFonts%26Colors%5BAdvanced%5D-%3E%20%5B%5D%20Allow%20pages%20to%20choose%20their%20own%20fonts%0A%20based%20on%20Preference%20Switcher%20%28Basic%29%20by%20Odyseus%0A**/%0Avar%20prefName%20%3D%20%22browser.display.use_document_fonts%22%3B%20//%20Integer%0Avar%20showNotification%20%3D%20false%3B%0Avar%20prefValues%20%3D%20%5B0%2C1%5D%3B%0Avar%20prefImages%20%3D%20%5B%0A%22data%3Aimage/png%3Bbase64%2CiVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAWklEQVR42mNQUFBgwIVL26b/B2F8ahgoNgCmiFzMQDUvkGozTgMIuYCgAcgKsLGJcgE+ZxPtApLDAFcMEIoJojTjMwRv3OPzO94wwBVlWMMAnxMJiVM3KZOLAbc2SFpozMGIAAAAAElFTkSuQmCC%22%2C%0A%22data%3Aimage/png%3Bbase64%2CiVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAUElEQVR42mNgwAPY6hn+gzADuYAoA2CKyMUMVPMCxTZjkyBWDKsL0BWT5AJ8zibaBRSFPlFOJidGSE59RPkdm624ogyra/A5kZA4dZMyuQAAZtugqYF9qE0AAAAASUVORK5CYII%3D%22%0A%5D%3B%0Avar%20pSw%3D%27useDocFont%3A%20%27%3B%0A%0Avar%20llii%2C%20_log%3Dfunction%28%29%7B%20/*%20*/%0A%20if%28%21llii%29%20llii%3D1%3B%0A%20for%20%28var%20s%3Dllii++%20+%27%3A%27%2C%20li%3Darguments.length%2C%20i%20%3D%200%3B%20i%3Cli%3B%20i++%29%20%0A%20%20%20s+%3D%27%20%27%20+%20arguments%5Bi%5D%3B%0A%20Components.classes%5B%22@mozilla.org/consoleservice%3B1%22%5D%0A%20%20%20.getService%28Components.interfaces.nsIConsoleService%29%0A%20%20%20.logStringMessage%28s%29%3B%0A/*%20*/%0A%7D%0A%0Athis.onclick%20%3D%20function%28aE%29%20%7B%0A%09if%20%28aE.button%20%21%3D%3D%202%29%0A%09%09aE.preventDefault%28%29%3B%0A%09if%20%28aE.button%20%3D%3D%3D%200%20%26%26%20%21aE.shiftKey%20%26%26%20%21accel%28aE%29%20%26%26%20%21aE.altKey%29%20%7B%0A%09%09self.setPref%28false%2C%20false%29%3B%0A%09%7D%20else%20if%20%28aE.button%20%3D%3D%3D%200%20%26%26%20%21aE.shiftKey%20%26%26%20accel%28aE%29%20%26%26%20%21aE.altKey%20%7C%7C%0A%09%09aE.button%20%3D%3D%3D%201%20%26%26%20%21aE.shiftKey%20%26%26%20%21accel%28aE%29%20%26%26%20%21aE.altKey%29%20%7B%0A%09%09self.setPref%28true%2C%20false%29%3B%0A%09%7D%20else%20if%20%28aE.button%20%3D%3D%3D%200%20%26%26%20aE.shiftKey%20%26%26%20%21accel%28aE%29%20%26%26%20%21aE.altKey%29%20%7B%0A%09%09self.setPref%28false%2C%20true%29%3B%0A%09%7D%0A%09aE.stopPropagation%28%29%3B%0A%7D%3B%0A%0Athis.setPref%20%3D%20function%28aPrompt%2C%20aInverse%29%20%7B%0A%09var%20value%2C%0A%09%09changed%20%3D%20false%3B%0A%09let%20i%20%3D%200%2C%0A%09%09iLen%20%3D%20prefValues.length%3B%0A%20%20switch%20%28self._prefType%29%20%7B%0A%09%09case%2064%3A%0A%09%09%09if%20%28iLen%20%3E%200%20%26%26%20%21aPrompt%29%20%7B%0A%09%09%09%09for%20%28%3B%20i%20%3C%20iLen%3B%20i++%29%20%7B%0A%09%09%09%09%09if%20%28prefValues%5Bi%5D%20%3D%3D%3D%20Services.prefs.getIntPref%28prefName%2C%20true%29%29%0A%09%09%09%09%09%09value%20%3D%20aInverse%20%3F%20prefValues%5Bi%20-%201%5D%20%3A%20prefValues%5Bi%20+%201%5D%3B%0A%09%09%09%09%7D%0A%09%09%09%09if%20%28%21value%29%0A%09%09%09%09%09value%20%3D%20aInverse%20%3F%20prefValues%5BiLen%20-%201%5D%20%3A%20prefValues%5B0%5D%3B%0A%09%09%09%09Services.prefs.setIntPref%28prefName%2C%20value%29%3B%0A%09%09%09%7D%20else%20%7B%0A%09%09%09%09value%20%3D%20promptme%28prefName%2C%20Services.prefs.getIntPref%28prefName%2C%20true%29%29%3B%0A%09%09%09%09if%20%28value%29%20%7B%0A%09%09%09%09%09changed%20%3D%20true%3B%0A%09%09%09%09%09Services.prefs.setIntPref%28prefName%2C%20value%29%3B%0A%09%09%09%09%7D%0A%09%09%09%7D%0A%09%09%09break%3B%0A%09%09default%3A%0A%09%09%09_log%28pSw%2CprefName%2C%22not%20present.%22%29%3B%0A%09%09%09return%3B%0A%09%7D%0A%09setSelfImage%28%29%3B%0A%09setSelfTooltip%28%29%3B%0A%09if%20%28showNotification%20%26%26%20changed%29%20%7B%0A%09%09_log%28pSw%2CprefName%2C%0A%09%09%09%22pref%20name%3A%20%22%20+%20String%28getPref%28prefName%29%29%0A%20%20%20%20%29%3B%0A%09%7D%0A%09Services.prefs.savePrefFile%28null%29%3B%0A%7D%3B%0A%0Afunction%20setSelfTooltip%28%29%20%7B%0A%09let%20pVal%20%3D%20getPref%28prefName%29%3B%0A%09self.tooltipText%20%3D%20//%20self.name+%22%5Cn%22+%22%20ID%3A%20%22%20+%20self.id.slice%2820%29%20+%20%27%5Cn%27%20+%0A%20%20%20%20%27page%20fonts%3A%20O%27%20+%20%28pVal%3F%27N%27%3A%27FF%27%29%3B%0A%7D%0A%0Afunction%20setSelfImage%28%29%20%7B%0A%20let%20val%3DgetPref%28prefName%29%2C%20img%3B%0A%20prefValues.some%28%20%28p%2Cx%29%20%3D%3E%20val%3D%3Dp%20%26%26%20%28img%3DprefImages%5Bx%5D%2C1%29%20%29%3B%0A%20img%20%26%26%20%28self.image%20%3D%20img%29%3B%0A%7D%0A%0Afunction%20getPref%28aKey%29%20%7B%0A%09switch%20%28self._prefType%29%20%7B%0A%09%09case%20128%3A%0A%09%09%09return%20Services.prefs.getBoolPref%28aKey%29%3B%0A%09%09case%2064%3A%0A%09%09%09return%20Services.prefs.getIntPref%28aKey%29%3B%0A%09%09case%2032%3A%0A%09%09%09return%20Services.prefs.getComplexValue%28aKey%2C%20Ci.nsISupportsString%29.data%3B%0A%09%09default%3A%0A%09%09%09return%20null%3B%0A%09%7D%0A%7D%0A%0Afunction%20promptme%28aMsg%2C%20aVal%29%20%7B%0A%09let%20retVal%20%3D%20%7B%0A%09%09value%3A%20aVal%0A%09%7D%3B%0A%09if%20%28Services.prompt.prompt%28null%2C%20self.name%2C%20aMsg%2C%20retVal%2C%20null%2C%20%7B%7D%29%29%0A%09%09return%20retVal.value%3B%0A%09return%20false%3B%0A%7D%0A%0Afunction%20accel%28aE%29%20%7B%0A%09if%20%28aE%29%0A%09%09return%20self._isOSX%20%3F%20aE.metaKey%20%3A%20aE.ctrlKey%3B%0A%09return%20self._isOSX%20%3F%20%22OSX%22%20%3A%20%22msdos%22%3B%0A%7D%0A%0Athis._prefName%20%3D%20prefName%3B%0Athis._prefValues%20%3D%20prefValues%3B%0Athis._prefType%20%3D%20Services.prefs.getPrefType%28prefName%29%3B%0Athis._nsISS%20%3D%20Cc%5B%22@mozilla.org/supports-string%3B1%22%5D.createInstance%28Ci.nsISupportsString%29%3B%0Athis._isOSX%20%3D%20Services.appinfo.OS.toLowerCase%28%29.startsWith%28%22darwin%22%29%3B%0A%0AsetSelfImage%28%29%3B%0AsetSelfTooltip%28%29%3B%0A/***%20Code%20***%20/%0Aif%20%28%21event.target%20%26%26%20%21this.disabled%29%0A%09this.setPref%28false%2C%20false%29%3B%0A/************/%5D%5D%3E%3C/initcode%3E%0A%20%20%3Ccode%3E%3C%21%5BCDATA%5Bif%20%28%21event.target%20%26%26%20%21this.disabled%29%0A%09this.setPref%28false%2C%20false%29%3B%5D%5D%3E%3C/code%3E%0A%20%20%3Caccelkey%3E%3C%21%5BCDATA%5BCtrl+%2C%5D%5D%3E%3C/accelkey%3E%0A%20%20%3Chelp%3E%3C%21%5BCDATA%5B%5D%5D%3E%3C/help%3E%0A%20%20%3Cattributes/%3E%0A%3C/custombutton%3E</code></pre>


**Initialization code**:
```javascript
/**
 Switcher for Tools->Options->Content->Fonts&Colors[Advanced]-> [] Allow pages to choose their own fonts
 based on Preference Switcher (Basic) by Odyseus
**/
var prefName = "browser.display.use_document_fonts"; // Integer
var showNotification = false;
var prefValues = [0,1];
var prefImages = [
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAWklEQVR42mNQUFBgwIVL26b/B2F8ahgoNgCmiFzMQDUvkGozTgMIuYCgAcgKsLGJcgE+ZxPtApLDAFcMEIoJojTjMwRv3OPzO94wwBVlWMMAnxMJiVM3KZOLAbc2SFpozMGIAAAAAElFTkSuQmCC",
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAUElEQVR42mNgwAPY6hn+gzADuYAoA2CKyMUMVPMCxTZjkyBWDKsL0BWT5AJ8zibaBRSFPlFOJidGSE59RPkdm624ogyra/A5kZA4dZMyuQAAZtugqYF9qE0AAAAASUVORK5CYII="
];
var pSw='useDocFont: ';

var llii, _log=function(){ /* */
 if(!llii) llii=1;
 for (var s=llii++ +':', li=arguments.length, i = 0; i<li; i++) 
   s+=' ' + arguments[i];
 Components.classes["@mozilla.org/consoleservice;1"]
   .getService(Components.interfaces.nsIConsoleService)
   .logStringMessage(s);
/* */
}

this.onclick = function(aE) {
	if (aE.button !== 2)
		aE.preventDefault();
	if (aE.button === 0 && !aE.shiftKey && !accel(aE) && !aE.altKey) {
		self.setPref(false, false);
	} else if (aE.button === 0 && !aE.shiftKey && accel(aE) && !aE.altKey ||
		aE.button === 1 && !aE.shiftKey && !accel(aE) && !aE.altKey) {
		self.setPref(true, false);
	} else if (aE.button === 0 && aE.shiftKey && !accel(aE) && !aE.altKey) {
		self.setPref(false, true);
	}
	aE.stopPropagation();
};

this.setPref = function(aPrompt, aInverse) {
	var value,
		changed = false;
	let i = 0,
		iLen = prefValues.length;
  switch (self._prefType) {
		case 64:
			if (iLen > 0 && !aPrompt) {
				for (; i < iLen; i++) {
					if (prefValues[i] === Services.prefs.getIntPref(prefName, true))
						value = aInverse ? prefValues[i - 1] : prefValues[i + 1];
				}
				if (!value)
					value = aInverse ? prefValues[iLen - 1] : prefValues[0];
				Services.prefs.setIntPref(prefName, value);
			} else {
				value = promptme(prefName, Services.prefs.getIntPref(prefName, true));
				if (value) {
					changed = true;
					Services.prefs.setIntPref(prefName, value);
				}
			}
			break;
		default:
			_log(pSw,prefName,"not present.");
			return;
	}
	setSelfImage();
	setSelfTooltip();
	if (showNotification && changed) {
		_log(pSw,prefName,
			"pref name: " + String(getPref(prefName))
    );
	}
	Services.prefs.savePrefFile(null);
};

function setSelfTooltip() {
	let pVal = getPref(prefName);
	self.tooltipText = // self.name+"\n"+" ID: " + self.id.slice(20) + '\n' +
    'page fonts: O' + (pVal?'N':'FF');
}

function setSelfImage() {
 let val=getPref(prefName), img;
 prefValues.some( (p,x) => val==p && (img=prefImages[x],1) );
 img && (self.image = img);
}

function getPref(aKey) {
	switch (self._prefType) {
		case 128:
			return Services.prefs.getBoolPref(aKey);
		case 64:
			return Services.prefs.getIntPref(aKey);
		case 32:
			return Services.prefs.getComplexValue(aKey, Ci.nsISupportsString).data;
		default:
			return null;
	}
}

function promptme(aMsg, aVal) {
	let retVal = {
		value: aVal
	};
	if (Services.prompt.prompt(null, self.name, aMsg, retVal, null, {}))
		return retVal.value;
	return false;
}

function accel(aE) {
	if (aE)
		return self._isOSX ? aE.metaKey : aE.ctrlKey;
	return self._isOSX ? "OSX" : "msdos";
}

this._prefName = prefName;
this._prefValues = prefValues;
this._prefType = Services.prefs.getPrefType(prefName);
this._nsISS = Cc["@mozilla.org/supports-string;1"].createInstance(Ci.nsISupportsString);
this._isOSX = Services.appinfo.OS.toLowerCase().startsWith("darwin");

setSelfImage();
setSelfTooltip();
/*** Code *** /
if (!event.target && !this.disabled)
	this.setPref(false, false);
/************/
```

**Code**
```
if (!event.target && !this.disabled)
	this.setPref(false, false);
```

---