$(document).ready(function(){
//alert('JQuery fired');


	$('#share_btn').click(function (){
	//alert('features');
		$('#modalContent').load('modalPages/share_emailForm.html');
		$('#modalWapper').modal('show');
		adjustModalwidth();
	});

	
	$('#features_lnk').click(function (){
	//alert('features');
		$('#modalContent').load('modalPages/features.html');
		$('#modalWrapper').modal('show');
		adjustModalwidth();
	});

	$('#getStarted_home_btn').click(function (){
	//alert('pricing');pricing_lnk
		$('#modalContent').load('modalPages/pricing.html');
		$('#modalWrapper').modal('show');
		adjustModalwidth();
	});

	$('#howItWorks_lnk').click(function (){
	//alert('How it works');
		$('#modalContent').load('modalPages/howitworks.html');
		$('#modalWrapper').modal('show');
		adjustModalwidth()
	});
	
	$('#testimonials_lnk').click(function (){
	//alert('How it works');
		$('#modalContent').load('modalPages/testimonials.html');
		$('#modalWrapper').modal('show');
		adjustModalwidth()
	});
	
	$('#login_btn').click(function (){
	//alert('How it works');
		$('#modalContent').load('modalPages/login_Form.html');
		$('#modalWrapper').modal('show');
		adjustModalwidth()
	});
	
	/*signUp_lnk*/
	
	function adjustModalwidth(){
		$('#modalWrapper').modal({
				backdrop: true,
				keyboard: true
			}).css({
			   'width': function () {
				    //return ($(document).width() * .9) + 'px';
				    return ('840px');
			   },
			   'margin-left': function () {
				   return -($(this).width() / 2);
			   }
		});
		}
});