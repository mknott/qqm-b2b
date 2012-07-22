//- - - - - - - - - - - - - - - - - - - - - - - - - - load and resize functions

function DoOnloadEvents() {
	for (var i = 0; i < aOnloadHandlers.length; i++) eval(aOnloadHandlers[i]);
	bPageLoaded = true;
}
function DoResizeEvents() {
	for (var i = 0; i < aResizeHandlers.length; i++) eval(aResizeHandlers[i]);
}
function AddOnloadHandler(sJS) {
	aOnloadHandlers[aOnloadHandlers.length] = sJS;
}
function AddResizeHandler(sJS) {
	aResizeHandlers[aResizeHandlers.length] = sJS;
}
var aOnloadHandlers = [];
var aResizeHandlers = [];

window.addEvent = function(ev,func){
	if(this.addEventListener){ //DOM
		var ffEv = ev.substring(2,ev.length);
		this.addEventListener(ffEv,func,false);
	}else if(this.attachEvent){//IE
		this.attachEvent(ev,func);
	}else{
		if(!window[ev+'arr']){
			window[ev+'arr'] = new Array();
			if(window[ev]){ window[ev+'arr'][window[ev+'arr'].length] = window[ev]}; 
		}
		window[ev+'arr'][window[ev+'arr'].length] = func; 
		window[ev] = function(){for(var x=0; x<window[ev+'arr'].length; x++){ window[ev+'arr'][x]()}};
	}
}

window.removeEvent = function(ev,func){
	if(this.removeEventListener){ //DOM
		var ffEv = ev.substring(2,ev.length);
		this.removeEventListener(ffEv,func,false);
	}else if(this.detachEvent){ //IE
		this.detachEvent(ev,func);
	}else{
		if(window[ev+'arr']){
			for(var x=window[ev+'arr'].length-1; x>=0; x--){
				if(window[ev+'arr'][x] == func){
					window[ev+'arr'].splice(x,1);
				}
			}
		}
	}
}

window.addEvent('onload',DoOnloadEvents);
window.addEvent('onresize',DoResizeEvents);

// calculate the current window height //
getPageHeight = function() {
  return window.innerHeight != null? window.innerHeight : document.documentElement && document.documentElement.clientHeight ? document.documentElement.clientHeight : document.body != null? document.body.clientHeight : null;
}

// calculate the current window vertical offset //TopPosition
getPageYOffset = function() {
  return typeof window.pageYOffset != 'undefined' ? window.pageYOffset : document.documentElement && document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop ? document.body.scrollTop : 0;
}

// calculate the current window width //
getPageWidth = function() {
  return window.innerWidth != null ? window.innerWidth : document.documentElement && document.documentElement.clientWidth ? document.documentElement.clientWidth : document.body != null ? document.body.clientWidth : null;
}

// calculate the position starting at the left of the window //leftPosition
getPageXOffset = function() {
  return typeof window.pageXOffset != 'undefined' ? window.pageXOffset : document.documentElement && document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft ? document.body.scrollLeft : 0;
}

//get the position of an element on the page
function getElementPosition(element) {
    var r = {x: element.offsetLeft, y: element.offsetTop};
    if (element.offsetParent) {
        var tmp = getElementPosition(element.offsetParent);
        r.x += tmp.x;
        r.y += tmp.y;
    }
    return r;
};

function chkBrows(sInp) {
	var sUA = navigator.userAgent.toLowerCase();
	var bFound = sUA.indexOf(sInp) + 1;
	return bFound;
}

function toolTip(linkEl,ttEl,bShow,iXAdd,iYAdd) {
	var ttEl = document.getElementById(ttEl);
	if(!linkEl.onmouseout){
		linkEl.onmouseout = function(){toolTip(linkEl,ttEl.id,false);}
	}
	bShow = bShow?bShow:false;
	iXAdd = iXAdd?iXAdd:0;   
	iYAdd = iYAdd?iYAdd:0;
  
	/*
	if (/tooltip/.test(ttEl) && document.getElementById(ttEl).parentNode.parentNode.parentNode.style.display=='none') {
		ttEl = ttEl.substring(7,ttEl.length);
		ttEl = parseInt(ttEl)+2000;
	}*/
	
	var yPos = 0;
	var xPos = 0;
	
	var pageBottom = getPageYOffset() + getPageHeight();
	var xPos = getElementPosition(linkEl).x + iXAdd;
	var yPos = getElementPosition(linkEl).y + iYAdd;
	
	ttEl.style.left = xPos + 'px';
	ttEl.style.top = yPos + 'px'; 
	
	if (bShow == false) {
		if (document.getElementById('IframeTip0')){
			document.getElementById('IframeTip0').style.display = 'none';
		}
		if (document.getElementById('IframeTip1')) {
			document.getElementById('IframeTip1').style.display = 'none';
		}
	}else{
		if (chkBrows('msie') && chkBrows('windows')) { 
			if (chkBrows('opera')) {
				// Nothing
			} else {
				for(iFlt=0;iFlt<2;iFlt++){
					if (document.getElementById('IframeTip'+iFlt)) { 
						IfrRef=document.getElementById('IframeTip'+iFlt);
						IfrRef.style.width = '147px';
    					IfrRef.style.top = oDiv.style.top;
    					IfrRef.style.left = oDiv.style.left
    					IfrRef.style.zIndex = '98';
    					IfrRef.style.display = "block";	
					}
				}	
			}
		}
	}

	ttEl.style.display = bShow ? "block" : "none";
	var iPopH = ttEl.offsetHeight ? ttEl.offsetHeight : 0;
	if (document.getElementById('IframeTip0')) { 
		document.getElementById('IframeTip0').style.height=iPopH;
	}
	if (document.getElementById('IframeTip1')) { 
		document.getElementById('IframeTip1').style.height=iPopH;
	}
	
	if (yPos + iPopH > pageBottom) {
		yPos += (pageBottom - yPos - iPopH);
		ttEl.style.top = yPos + 'px';
	}
}