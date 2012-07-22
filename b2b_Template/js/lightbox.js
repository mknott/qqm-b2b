lightBox = {
	//this object will display a lightBox on the page by calling one of 4 methods: 
			//show, showByID, showByAjax, OR showDiffBox.
	//the methods expect the following values in one way or another:
		//text - the HTML displayed in the body of the lightBox, 
		//title - the text displayed at the top of the lightBox
		//width - the overall width of the lightBox 
		//addCorners(optional for some methods) - adds the rounded corners around the inner content
	//see the comments above each method for specific argument details
		
	duration: 3, //the timeout duration
	speed: 34, //percent of opacity to show at a time 50 = 2 steps, 34 = 3 steps
	maskOpac: 60, //the opacity of the mask
	ZIndex: 500000,
	imgPath: 'images',
	
	ajaxObj: '',
	isIE: false,
	shim: false,
	loadImage: function(path){
		var retObj = new Image();
		retObj.src = path;
		return retObj;
	},
	open: function(){},
	close: function(){},
	closeText: 'Close',
	
	init: function(){
		//preload the images after the rest of the page has loaded
		this.nwBackground = this.loadImage(this.imgPath + '/lightbox_nw.png');
		this.nbg1Background = this.loadImage(this.imgPath + '/lightbox_n2.png');
		this.nbg2Background = this.loadImage(this.imgPath + '/gradient.gif');
		this.neBackground = this.loadImage(this.imgPath + '/lightbox_ne.png');
		
		this.wBackground = this.loadImage(this.imgPath + '/lightbox_w.png');
		this.eBackground = this.loadImage(this.imgPath + '/lightbox_e.png');
		
		this.swBackground = this.loadImage(this.imgPath + '/lightbox_sw.png');
		this.sBackground = this.loadImage(this.imgPath + '/lightbox_s.png');
		this.seBackground = this.loadImage(this.imgPath + '/lightbox_se.png');
	},
	
	
	//Arguments:
		//htmlId: number - id of an element in the DOM from which it will pull the innnerHTML
		//titleId: number - id of an element in the DOM from which it will pull the innnerHTML
		//width: number - the overall width of the lightBox 
		//addCorners(optional): bit - adds the rounded corners around the inner content
	showById: function(htmlId,titleId,width,addCorners){
		this.htmlElem = document.getElementById(htmlId);
		this.HTML = this.htmlElem.innerHTML;
		var newHTML = this.HTML;
		if(addCorners) newHTML = this.addSPCorners(newHTML,'sp_',width);
		var title = document.getElementById(titleId).innerHTML;
		this.show(newHTML,title,width);
		this.htmlElem.innerHTML = "";
	},
	
	
	//Arguments:
		//path:string - the path of the page to ajax in
		//title:string - the title to display
		//width:number - width of lightbox
		//addCorners(optional):bit - adds the rounded corners around the inner content
	showByAjax: function(path,title,width,addCorners){
		if(window.XMLHttpRequest){
		  	this.ajaxObj = new XMLHttpRequest();
		}else if(window.ActiveXObject){
		  	this.ajaxObj = new ActiveXObject("Microsoft.XMLHTTP");
		  	this.isIE = true;
		}

		if(typeof this.ajaxObj == 'object'){
			this.ajaxObj.onreadystatechange = function(){
				if(lightBox.ajaxObj.readyState == 4){
					var HTML = lightBox.ajaxObj.responseText;
					if(addCorners) HTML = lightBox.addSPCorners(HTML,'sp_',width);
					lightBox.show(HTML,title,width);
				}
			}
			this.ajaxObj.open("POST",path,true);
			if(this.isIE){
				this.ajaxObj.send();
			}else{
				this.ajaxObj.send(null);
			}
		}		
	},

	
	//this method is specific to the "standard - saver" difference pop-up - it has two rounded corner divs
	//Arguments:
		//saverId:number - id of an element in the DOM from which it will pull the innnerHTML for the saver content
		//standardId:number - id of an element in the DOM from which it will pull the innnerHTML for the standard div
		//titleId:number - id of an element in the DOM from which it will pull the innnerHTML
		//width:number - the overall width of the lightBox 
	showDiffBox: function(saverId,standardId,titleId,width){
		var saver = document.getElementById(saverId).innerHTML;
		saver = this.addSPCorners(saver,'ss_',width);
		var HTML = '<div id="ssdiffDiv">' + saver;
		
		var standard = document.getElementById(standardId).innerHTML;
		var standardHTML = standard.split('||split||');
		if(standardHTML.length){
			for(var x=0; x<standardHTML.length; x++){
				HTML += '<div class="pt10"></div>' + this.addSPCorners(standardHTML[x],'ss_',width);
			}
		}else{
			HTML += '<div class="pt10"></div>' + this.addSPCorners(standard,'ss_',width);
		}
		
		HTML += '</div>';
		var title = document.getElementById(titleId).innerHTML;
		this.show(HTML,title,width);
	},
		
	//Arguments:
		//text:string - the text to display in the body
		//title:string - the title to display
		//width:number - width of lightbox
		//addCorners(optional):bit - adds the rounded corners around the inner content
	show: function(text, title, width){		
		if(!this.lb){
			
			this.lb = document.createElement('div');
			this.lb.id = 'lightbox';
			this.lb.style.zIndex = this.ZIndex+2; //the shim is z +1
			document.body.insertBefore(this.lb, document.body.firstChild);
			
			this.mask = document.createElement('div');
			this.mask.id = 'lb_mask';
			this.mask.style.zIndex = this.ZIndex;
			this.mask.onclick = this.hide
			document.body.insertBefore(this.mask, document.body.firstChild);
			
			if(document.all){
				this.isIE = true;
				if(parseFloat(navigator.appVersion.split("MSIE")[1]) < 7) {
					document.body.firstChild.insertAdjacentHTML("BeforeBegin", '<IFRAME style="position: absolute;" src="https://www.united.com/ual/asset/d.gif" frameBorder="0" scrolling="no" id="lb_shim" />');
					this.shim = document.getElementById('lb_shim');
					this.shim.style.filter = "alpha(opacity=0)";
					this.shim.style.zIndex = this.ZIndex+1;
				}
			}
								
			this.topDiv = document.createElement('div');
			this.topDiv.style.clear = 'both';
			this.nw = document.createElement('div');
			this.nw.id = 'lb_nw';
			this.topDiv.appendChild(this.nw);
			this.n = document.createElement('div');
			this.n.id = 'lb_n';
			this.topDiv.appendChild(this.n);
			this.nbg1 = document.createElement('div');
			this.nbg1.style.height = '8px';
			this.nbg1.style.fontSize = '0px';
			this.n.appendChild(this.nbg1);
			this.nbg2 = document.createElement('div');
			this.nbg2.style.background = 'url(' + this.imgPath + '/gradient.gif) repeat-x';
			this.nbg2.style.height = '17px';
			this.nbg2.style.fontSize = '0px';
			this.n.appendChild(this.nbg2);
			this.ne = document.createElement('div');
			this.ne.id = 'lb_ne';
			this.topDiv.appendChild(this.ne);
			this.lb.appendChild(this.topDiv);
					
			
			this.midDiv = document.createElement('div');
			this.midDiv.id = 'midDiv';
			this.midDiv.style.clear = 'both';

			this.w = document.createElement('div');
			this.w.id = 'lb_w';
			this.midDiv.appendChild(this.w);
			
			this.c = document.createElement('div');
			this.c.id = 'lb_c';
			this.c.style.position = 'relative';
			this.c.style.background = '#ffffff url(' + this.imgPath + '/gradient.gif) repeat-x';
			this.midDiv.appendChild(this.c);
			
			this.ct = document.createElement('div');
			this.ct.id = 'lb_close';
			this.ct.style.position = 'absolute';
			this.ct.style.right = '5px';
			this.ct.style.top = "-10px";
			this.ct.innerHTML = "<a href=\"javascript:lightBox.hide();\">" + this.closeText + "</a>";
			this.c.appendChild(this.ct);
			
			this.e = document.createElement('div');
			this.e.id = 'lb_e';
			this.midDiv.appendChild(this.e);
			
			this.lb.appendChild(this.midDiv);
						
			this.botDiv = document.createElement('div');
			this.botDiv.style.clear = 'both';
			this.sw = document.createElement('div');
			this.sw.id = 'lb_sw';
			
			this.botDiv.appendChild(this.sw);
			this.s = document.createElement('div');
			this.s.id = 'lb_s';
			
			this.botDiv.appendChild(this.s);
			this.se = document.createElement('div');
			this.se.id = 'lb_se';
			
			this.botDiv.appendChild(this.se);
			this.lb.appendChild(this.botDiv);
			
			if(!this.isIE || this.shim){
				this.nw.style.background = 'url(' + this.imgPath + '/lightbox_nw.png)';
				this.nbg1.style.background = 'url(' + this.imgPath + '/lightbox_n2.png)';
				this.ne.style.background = 'url(' + this.imgPath + '/lightbox_ne.png)';
				
				this.w.style.background = 'url(' + this.imgPath + '/lightbox_w.png)';
				this.e.style.background = 'url(' + this.imgPath + '/lightbox_e.png)';
				
				this.sw.style.background = 'url(' + this.imgPath + '/lightbox_sw.png)';
				this.s.style.background = 'url(' + this.imgPath + '/lightbox_s.png)';
				this.se.style.background = 'url(' + this.imgPath + '/lightbox_se.png)';
			}
			
			if(this.isIE){
				this.nw.style.filter = 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src="' + this.imgPath + '/lightbox_nw.png", sizingMethod="crop")';
				this.nbg1.style.filter = 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src="' + this.imgPath + '/lightbox_n2.png", sizingMethod="scale")';
				this.ne.style.filter = 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src="' + this.imgPath + '/lightbox_ne.png", sizingMethod="crop")';
			
				this.w.style.filter = 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src="' + this.imgPath + '/lightbox_w.png", sizingMethod="crop")';
				this.e.style.filter = 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src="' + this.imgPath + '/lightbox_e.png", sizingMethod="crop")';
			
				this.sw.style.filter = 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src="' + this.imgPath + '/lightbox_sw.png", sizingMethod="crop")';
				this.s.style.filter = 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src="' + this.imgPath + '/lightbox_s.png", sizingMethod="scale")';
				this.se.style.filter = 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src="' + this.imgPath + '/lightbox_se.png", sizingMethod="scale")';
			}
			
			
			this.clear = document.createElement('div');
			this.clear.style.clear = 'both';
			this.lb.appendChild(this.clear);
			
			this.title = document.createElement('h1');
			this.title.id = 'lb_title';
			this.c.appendChild(this.title);
			
			this.content = document.createElement('div');
			this.content.id = 'lb_content';
			this.c.appendChild(this.content);
			
			this.ne.style.cursor = 'pointer';
			this.ne.onclick = this.hide;
		}
		else {
			this.lb = document.getElementById('lightbox');
			this.content = document.getElementById('lb_content');
		
		}//end if wrapper
		
		if(this.shim){
			//disable all select boxes on the page
			var selects = document.getElementsByTagName('select');
			for(var x = selects.length; x > 0; x--){
				selects[x-1].disabled = 'disabled';
			}
			this.shim.style.visibility = "visible";
		}
		
		this.title.innerHTML = title;
	    this.content.innerHTML = text;
	    
	    //set the width if one is passed
	    var lbWidth = width
		if(width){
	    	this.lb.style.width = width + 'px';
	    }else{
			lbWidth = this.lb.offsetWidth;
		}
				
	    var centerDivWidth = lbWidth - this.ne.offsetWidth - this.nw.offsetWidth;
	    
	    //adj the widths of the h center divs
	    this.n.style.width = centerDivWidth + 'px';
	    this.c.style.width = centerDivWidth + 'px';
	    this.s.style.width = centerDivWidth + 'px';
	      
	    //adj the heights of the vert center divs
		this.resizeHeight();
		
		//check for any changes in the content that might cause the window height to change
		//the only event that I can find for this element is the onclick event - it works for now
		//may be able to set the overflow to auto and listen to the onoverflow event then set overflow to show, resize, set overflow to auto again 
		//IE doesn't use onoverflow try onreadystatechange instead
		this.content.onclick = function(){lightBox.rePositionLightBox();};
		this.content.onkeyup = function(){lightBox.rePositionLightBox();};
		
	    //set the position
	    this.positionLightBox();
		
	    //set lb to visible and the opac to 0 so it can fade in;
	    this.mask.alpha = 0;
	    this.mask.style.opacity = 0;
	    this.mask.style.filter = 'alpha(opacity=0)';
	    this.mask.style.visibility = "visible";
	    this.lb.alpha = 0;
	    this.lb.style.opacity = 0;
	    this.lb.style.filter = 'alpha(opacity=0)';
	    this.lb.style.visibility = "visible";
		
	    //hide the windows scroll bars
	    //document.getElementsByTagName("body")[0].style.overflow = "hidden";
		//document.getElementsByTagName("html")[0].style.overflow = "hidden";
	    
		//fade in the lightbox
	    this.timer = window.setInterval("lightBox.fadelightbox(1)", this.duration);
	},
	
	//adj the heights of the v center divs
	resizeHeight: function(){
	    this.e.style.height = this.c.offsetHeight + 'px';
	    this.w.style.height = this.c.offsetHeight + 'px';		
	},
	
	// hide the lightbox//
	hide: function() {
	  window.clearInterval(lightBox.timer);
	  lightBox.timer = null;
	  lightBox.timer = window.setInterval("lightBox.fadelightbox(0)", lightBox.duration);
	  window.removeEvent('onscroll',lightBox.rePositionLightBox);
	  window.removeEvent('onresize',lightBox.rePositionLightBox);
	  //lightBox.lb.style.height = '0px';
	  lightBox.mask.style.height = '0px';
	},
	
	// fade-in the lightbox//
	fadelightbox:	function (flag) {
	  if(flag == null) {
	    flag = 1;
	  }
	  var opac;
	  if(flag == 1) {
		  opac = this.lb.alpha + this.speed;
	  } else {
		  opac = this.lb.alpha - this.speed;
	  }
	 
	  this.lb.alpha = opac;
	  this.lb.style.opacity = (opac / 100);
	  this.lb.style.filter = 'alpha(opacity=' + opac + ')';
	  
	  var maskAlpha = 100/this.maskOpac;
	  this.mask.alpha = opac/maskAlpha;
	  this.mask.style.opacity = opac/100/maskAlpha;
	  this.mask.style.filter = 'alpha(opacity=' + opac/maskAlpha + ')';
	  if(opac >= 99){
		window.clearInterval(this.timer);
	    this.timer = null;
	    this.open();
	    
	  }else if(opac <= 1){
		
		  if(this.shim){
			//enable all select boxes
			var selects = document.getElementsByTagName('select');
			for(var x = selects.length; x > 0; x--){
				selects[x-1].removeAttribute('disabled');
			}
			this.shim.style.visibility = "hidden";
			
		}

		this.lb.style.visibility = "hidden";
		this.mask.style.visibility = "hidden";
		window.clearInterval(this.timer);
	    this.timer = null;
	    
	    if(this.htmlElem){this.htmlElem.innerHTML = this.HTML;}
	    this.content.innerHTML = "";
	    //show the scroll bars again
		//document.getElementsByTagName("body")[0].style.overflow = "";
		//document.getElementsByTagName("html")[0].style.overflow = "";
	    this.close();
	  }
	},
	
	//set the event listeners and position for the first time
	positionLightBox: function(){
		this.rePositionLightBox();
		window.addEvent('onscroll',lightBox.rePositionLightBox);
		window.addEvent('onresize',lightBox.rePositionLightBox);
	},

	//positions the lightBox
	rePositionLightBox: function(){
	  lightBox.resizeHeight();
	  var lightboxheight = lightBox.lb.offsetHeight;
	  var pageheight = getPageHeight();
	  var topPos = getPageYOffset();
	  var totalHeight = (pageheight + topPos);
	  var topposition = topPos + (pageheight / 2) - (lightboxheight / 2);
	  
	  var lightboxWidth = lightBox.lb.offsetWidth;
	  var pagewidth = getPageWidth();
	  var leftPos = getPageXOffset();
	  var leftPosition = leftPos + (pagewidth / 2) - (lightboxWidth / 2);

	  var maskHeight = document.getElementsByTagName("body")[0].offsetHeight;
	  if(maskHeight < totalHeight) maskHeight=totalHeight;
	  lightBox.mask.style.height = maskHeight + 'px';
	  
	  //lightBox.mask.style.height = totalHeight + 'px';
	  //lightBox.mask.style.paddingLeft = leftPos + 'px';
	  lightBox.lb.style.top = topposition + 'px';
	  lightBox.lb.style.left = leftPosition + 'px';
	  
	  if(lightBox.shim){
		  lightBox.shim.style.top = topposition + 'px';
		  lightBox.shim.style.left = leftPosition + 'px';
		  lightBox.shim.style.width =  lightboxWidth + 'px';
		  lightBox.shim.style.height =  lightboxheight + 'px';
      } 
	},
		
	addSPCorners: function(content, idPref, width){
		if(!idPref) idPref = 'sp_';
		if(!width) width = 660;
		var tempDiv = document.createElement('div'); 
		
		var wrapper = document.createElement('div'); 
		wrapper.id = idPref + 'wrapper'
	    
		var topDiv = document.createElement('div');
		topDiv.id = idPref + 'top';
		
			var nw = document.createElement('div');
		    nw.id = idPref + 'nw';
		    nw.style.background = 'url(' + this.imgPath + '/' + idPref + 'nw.gif)';
		    topDiv.appendChild(nw);
			
		    var n = document.createElement('div');
		    n.id = idPref + 'n';
		    n.style.background = 'url(' + this.imgPath + '/' + idPref + 'n.gif)';
		    topDiv.appendChild(n);
		    
		    var ne = document.createElement('div');
		    ne.id = idPref + 'ne';
		    ne.style.background = 'url(' + this.imgPath + '/' + idPref + 'ne.gif)';
		    topDiv.appendChild(ne);
		    
	    wrapper.appendChild(topDiv);
	        
	    var midDiv = document.createElement('div');
	    midDiv.style.clear = 'both';
	    
		    var c = document.createElement('div');
		    c.id = idPref + 'c';
		    midDiv.appendChild(c); 
		    
		wrapper.appendChild(midDiv);
	    
	    var botDiv = document.createElement('div');
	    botDiv.style.clear = 'both';
	    botDiv.id = idPref + 'bottom';
	
		    var sw = document.createElement('div');
		    sw.id = idPref + 'sw';
		    sw.style.background = 'url(' + this.imgPath + '/' + idPref + 'sw.gif)';
		    botDiv.appendChild(sw);
		    
		    var s = document.createElement('div');
		    s.id = idPref + 's';
		    s.style.background = 'url(' + this.imgPath + '/' + idPref + 's.gif)';
		    botDiv.appendChild(s);
		    
		    var se = document.createElement('div');
		    se.id = idPref + 'se';
		    se.style.background = 'url(' + this.imgPath + '/' + idPref + 'se.gif)';
		    botDiv.appendChild(se);
	    
	    wrapper.appendChild(botDiv);
	    var clrDiv = document.createElement('div');
	    clrDiv.style.clear = 'both';
	    clrDiv.style.height = '0px';
		wrapper.appendChild(clrDiv);
		
	    tempDiv.appendChild(wrapper);
	
	    c.innerHTML = content;
	    
	    n.style.width = width - 63 + "px";
	    midDiv.style.width = width - 55 + "px";
	    s.style.width = width - 63 + "px";
	    
		return tempDiv.innerHTML;
	}
}

window.addEvent('onload',function(){lightBox.init()});