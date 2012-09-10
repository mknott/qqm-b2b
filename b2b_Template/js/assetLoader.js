$(document).ready(function(){
//alert('JQuery fired');


	$('#share_btn').click(function (){
	//alert('features');
		$('#modalContent').load('modalPages/share_emailForm.html');
		$('#myModal').modal('show');
		//adjustModalwidth();
	});

	
	$('#features_lnk').click(function (){
	//alert('features');
		$('#modalContent').load('modalPages/features.html');
		$('#myModal').modal('show');
		//adjustModalwidth();
	});

	$('#getStarted_home_btn').click(function (){
	//alert('pricing');pricing_lnk
		$('#modalContent').load('modalPages/pricing.html');
		$('#myModal').modal('show');
		adjustModalwidth();
	});

	$('#howItWorks_lnk').click(function (){
	//alert('How it works');
		$('#modalContent').load('modalPages/howitworks.html');
		$('#myModal').modal('show');
		adjustModalwidth()
	});
	
	$('#testimonials_lnk').click(function (){
	//alert('How it works');
		$('#modalContent').load('modalPages/testimonials.html');
		$('#myModal').modal('show');
		adjustModalwidth()
	});
	
	$('#login_btn').click(function (){
	//alert('How it works');
		$('#modalContent').load('modalPages/login_Form.html');
		$('#myModal').modal('show');
		adjustModalwidth()
	});
	
	/*signUp_lnk*/
	
	function adjustModalwidth(){
		$('#myModal').modal({
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