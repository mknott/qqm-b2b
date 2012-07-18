$(document).ready(function() {
	var $body = $('body');
	//Cache this for performance

	var setBodyScale = function() {
		var scaleSource = $body.width(), scaleFactor = 0.25, maxScale = 600, minScale = 30;
		//Tweak these values to taste

		var fontSize = scaleSource * scaleFactor;
		//Multiply the width of the body by the scaling factor:

		if (fontSize > maxScale)
			fontSize = maxScale;
		if (fontSize < minScale)
			fontSize = minScale;
		//Enforce the minimum and maximums

		$('body').css('font-size', fontSize + '%');
	}

	$(window).resize(function() {
		setBodyScale();
	});

	//Fire it when the page first loads:
	setBodyScale();
}); 


window.MS = new function(){
	this.homepage = function(){
		console.log('homepage pageload');
		/*==========================================================
		iScroll / imagecarousel
		==========================================================*/
		var myScroll, iScrollCurrPage = 0,
			carouselRoot = $('#wrapper'),
			scrollItems = carouselRoot.find('.scrollItems'),
			initmyScroll = function () {
				return myScroll = new iScroll('scroller', {
					snap: true,
					momentum: false,
					hScrollbar: false,
					vScroll: false,
					vScrollbar: false,
					onScrollEnd: function () {
						iScrollCurrPage = (typeof this.pageX !== undefined) ? (isNaN(this.pageX) ? 0 : this.pageX) : 0;
						// Adds active class to indicator for carousel
						carouselRoot.find('.indicator > li.active').removeClass('active');
						carouselRoot.find('.indicator > li:nth-of-type(' + (iScrollCurrPage + 1) + ')').addClass('active');
						// Adds current class to scrollItems li for carousel
						scrollItems.find('li.current').removeClass('current');
						scrollItems.find('li:nth-of-type(' + (iScrollCurrPage + 1) + ')').addClass('current');
					}
				});
			};
			
		// Jquery for iScroll in the carousel
		if ($('#myScroll.imagecarousel').find('.scrollItems > li').length) {
			// Instanciate iScroll here
			initmyScroll();
			// Shows scroller and carousel nav after page loads
			$('#scroller .scrollItems, .carouselNav').removeClass('hidden');
			carouselResize('scroller'); // Triggers when document first loads
			myScroll.refresh();
			if ((/Android/i.test(navigator.userAgent) && /Linux/i.test(navigator.userAgent)) || typeof window.blackberry !== 'undefined') {
				var repeatCheck = setInterval(function () {
					if ($('#myScroll').parents('.triggerTarget').css('display') === 'block') {
						myScroll.refresh();
						clearInterval(repeatCheck);
					}
				}, 750);
			}
			// On Orientation Change, Do Something
			$(window).bind('resize', function () {
				carouselResize('scroller');
				setTimeout(function () {
					myScroll.refresh();
				}, 0);
				// iScroll doesn't update the value in time, need to force the update
				myScroll.maxScrollX = -(((myScroll.maxPageX) * $(window).width()));
				myScroll.scrollToElement('.scrollItems > li.current', '0s');
			});
		}
		// init 'next' button
		carouselRoot.find('.next').fadeIn();
		carouselRoot.find('.prev').fadeIn();
		// init indicators
		buildIndicators(carouselRoot.find('.scrollItems > li'), carouselRoot.find('.indicator'), myScroll);
		
		window.myScroll = myScroll;


		// Function that dynamically assembled the dot indicators for iCarousel
		function buildIndicators(matchArray, indicator, inst) {
			var width = 0;
			for (var i = 0, j = matchArray.length, k = 1; i < j; i++, k++) {
				var dot = $('<li' + (!i ? ' class="active"' : '') + '>' + k + '</li>');
				if (inst) {
					dot.bind('click', (function (i) {
						return function () {
							inst.scrollToPage(i, 0);
							return false;
						};
					})(i));
				}
				indicator.append(dot);
				width += dot.width();
			}
			indicator.width(width * 2);
		}

		// Function to dynamically resize images in iScroll to width of viewport
		function carouselResize(carouselId) {
			var viewportWidth = $(window).width(),
				carouselRoot = $('#' + carouselId);
			carouselRoot.find('.scrollItems > li').css('width', viewportWidth);
			// Dynamically sizes #scroller
			carouselRoot.css('width', viewportWidth * carouselRoot.find(".scrollItems > li").length);
		}
		carouselResize('scroller');
		
		$('#scroller .bubble').on('tap',function(e){
			e.stopPropogation();
		})
	};

	this.ldp = function(){
		console.log('Location Detail Page loaded');
	};
	
	this.service = function(){
		console.log('Room Service Template Loaded');
	};
	
	this.chat = function(){
		console.log('Chat Template Loaded');
	};
};


$(document).on('pageinit',MBP.hideUrlBarOnLoad);
$(document).on('pageinit','[data-template="homepage"]',MS.homepage);
$(document).on('pageinit','[data-template="ldp"]',MS.ldp); // Location Detail Page
$(document).on('pageinit','[data-template="service"]',MS.service); // Room Service
$(document).on('pageinit','[data-template="chat"]',MS.chat); // Room Service