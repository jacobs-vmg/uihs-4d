var googlesheetid = "1XhKxq4XhMB5KTNtHbpVZnAEu_cGV7Uw2mFUy-_qMiwE";

//change

$('#sign-in-form').submit(function(event){
    event.preventDefault();
    // Cookies.remove('user');
    var _date = new Date();
    var dateString = _date.toString();

    var _formId = $(this).attr('id');
    if (_formId === 'sign-in-form'){
        userObject = {
            _id: makeid(8),
            firstName: $('#firstName').val(),
            lastName: $('#lastName').val(),
            _address: $('#_address').val(),
            _city: $('#_city').val(),
            _state: $('#_state').val(),
            _zipcode: $('#_zipcode').val(),
            _email: $('#_email').val(),
            _timeStamp: dateString,
            _spreadsheetId: "1XhKxq4XhMB5KTNtHbpVZnAEu_cGV7Uw2mFUy-_qMiwE"
        };
        console.log(userObject);
        callGoogleSheets(userObject);            
    }    
});

function makeid(l)
{
var text = "";
var char_list = "0123456789";
for(var i=0; i < l; i++ )
{  
text += char_list.charAt(Math.floor(Math.random() * char_list.length));
}
return text;
}

function callGoogleSheets(user){
    _modalHtml = user._signIn ? `
    <div style="display: none; max-width: 600px;" id="thank-you-popup" class="message">
	<div class="card text-center">
		<div class="card-header"><img src="img/I25I80ProjectLog.png" class="img-fluid" alt="WyDOT Logo"/></div>
		<div class="card-body">
			<h3>Thank you for signing in!</h3>			
			
			<div class="mt-3"> 
				<!--<a href="#" class="btn btn-outline-primary fancybox-closebt">Close</a>-->
				<button type="button" data-fancybox-close="" title="Close" class="btn btn-outline-primary fancybox-closebt">Close</button>
			</div>
		</div>
	</div>
</div>
    ` : `
    <div style="display: none; max-width: 600px;" id="thank-you-popup2" class="message">
	<div class="card text-center">
		<div class="card-header"><img src="img/I25I80ProjectLog.png" class="img-fluid" alt="WyDOT Logo"/></div>
		<div class="card-body">
			<h3>Thank you for your feedback!</h3>			
			<p>Your comments are valuable to us.</p>
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
    // console.log(user);

    // CHANGE SPREADSHEET ID HERE:
    // _spreadsheetId = ""
    /////////
    

    // user._spreadsheetId = _spreadsheetId;

    $.post('https://txdotvirtualhearing.herokuapp.com/i25', user, function(data, status){
        console.log(data);
    });
    // $.post('/i25', user, function(data, status){
    //     console.log(data);
    // });
    // $.post('/googleSheets/vmg', user, function(data, status){
    //     console.log(data);
    // })
}