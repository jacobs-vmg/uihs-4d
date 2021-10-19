
$('#signInForm').submit(function(event){
    event.preventDefault();
	_modalHtml = `
    <div style="display: none; max-width: 600px;" id="thank-you-popup" class="message">
	<div class="card text-center">
	<div class="card-header"><img src="img/TxDOT_Logo_White.png" width="88" height="70" alt="TxDOT Logo" /></div>
		<div class="card-body">
			<h3>Thank you for signing in</h3>			
			
			<div class="mt-3"> 
				<!--<a href="#" class="btn btn-outline-primary fancybox-closebt">Close</a>-->
				<button type="button" data-fancybox-close="" title="Close" class="btn btn-outline-primary fancybox-closebt">Close</button>
			</div>
		</div>
	</div>
</div>
    `
	$.fancybox.close();
		
    $.fancybox.open(_modalHtml);
});

$('#commentForm').submit(function(event){
    event.preventDefault();
	_modalHtml = `
    <div style="display: none; max-width: 600px;" id="thank-you-popup" class="message">
	<div class="card text-center">
	<div class="card-header"><img src="img/TxDOT_Logo_White.png" width="88" height="70" alt="TxDOT Logo" /></div>
		<div class="card-body">
			<h3>Thank you for your feedback</h3>			
			
			<div class="mt-3"> 
				<!--<a href="#" class="btn btn-outline-primary fancybox-closebt">Close</a>-->
				<button type="button" data-fancybox-close="" title="Close" class="btn btn-outline-primary fancybox-closebt">Close</button>
			</div>
		</div>
	</div>
</div>
    `
	$.fancybox.close();
		
    $.fancybox.open(_modalHtml);
});
