$(document).ready(function(){
//alert('JQuery fired');
function active_Indicator(){
	$('#topLinks ul li').removeClass('active');
	$(this).addClass('active');
}

var spec_modal_Height = 800;//Modal generic default
var spec_modal_Width = 542;//Modal generic default
	$('#share_btn').click(function (){
	//alert('features');
		$('#modalContent').load('modalPages/share_emailForm.html');
		$('#modalWapper').modal('show');
		adjustModalwidth(700, 400);
	});

	
	$('#features_lnk').click(function (){
	//alert('features');
		active_Indicator(this);
		$('#modalContent').load('modalPages/features.html');
		$('#modalWrapper').modal('show');
		adjustModalwidth(900, 542);
	});

	$('#getStarted_home_btn').click(function (){
	//alert('pricing');pricing_lnk
		active_Indicator(this);
		$('#modalContent').load('modalPages/pricing.html');
		$('#modalWrapper').modal('show');
		adjustModalwidth(900, 490);
	});

	$('#howItWorks_lnk').click(function (){
	//alert('How it works');
		$('#modalContent').load('modalPages/howitworks.html');
		$('#modalWrapper').modal('show');
		adjustModalwidth(900, 490);
	});
	
	$('#testimonials_lnk').click(function (){
	//alert('How it works');
		$('#modalContent').load('modalPages/testimonials.html');
		$('#modalWrapper').modal('show');
		adjustModalwidth(700, 400);
	});
	
	$('#login_btn').click(function (){
	//alert('How it works');
		$('#modalContent').load('modalPages/login_Form.html');
		$('#modalWrapper').modal('show');
		adjustModalwidth(700, 400);
	});
	
	/*signUp_lnk*/
	
	function adjustModalwidth( spec_modal_Height, spec_modal_Width){
		
		$('#modalWrapper').modal({
				backdrop: true,
				keyboard: true
			}).css({
			   'width': function (spec_modal_Width) {
				    //return ($(document).width() * .9) + 'px';
				    return (spec_modal_Height + 'px');
			   },
			   'height': function (spec_modal_Height) {
				    //return ($(document).width() * .9) + 'px';
				    return (spec_modal_Width + 'px');
			   },
			   'margin-left': function () {
				   return -($(this).width() / 2);
			   }
		});
		}
});