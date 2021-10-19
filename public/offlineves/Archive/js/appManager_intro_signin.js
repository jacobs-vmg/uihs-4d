var googlesheetid = "1XhKxq4XhMB5KTNtHbpVZnAEu_cGV7Uw2mFUy-_qMiwE";
 
$('body').append('<style>.input_check::placeholder{color:red}</style>')
 
//change
 
$('#signInForm_intro').submit(function(event){
    event.preventDefault();
 
    firstName = $('#firstName_intro').val();
    lastName =  $('#lastName_intro').val();
    validFlag = true;
    console.log(firstName)
 
    if (firstName == ""){
        $('#firstName_intro').attr("placeholder", "Please enter first name");
        $('#firstName_intro').addClass('input_check');
        validFlag = false;
    } if (lastName == ""){
        $('#lastName_intro').attr("placeholder", "Please enter last name");
        $('#lastName_intro').addClass('input_check');
        validFlag = false;
    }
    
    var _date = new Date();
    var dateString = _date.toString();
 
    if (validFlag){
        var _formId = $(this).attr('id');
        if (_formId === 'signInForm_intro'){
            userObject = {
                _id: makeid(8),
                firstName: $('#firstName_intro').val(),
                lastName: $('#lastName_intro').val(),
                _address: $('#_address_intro').val(),
                _city: $('#_city_intro').val(),
                _state: $('#_state_intro').val(),
                _zipcode: $('#_zipcode_intro').val(),
                _email: $('#_email_intro').val(),
                _timeStamp: dateString,
                _spreadsheetId: "1XhKxq4XhMB5KTNtHbpVZnAEu_cGV7Uw2mFUy-_qMiwE"
            };
 
            $('#firstName_intro').val("");
            $('#lastName_intro').val("");
            $('#_address_intro').val("");
            $('#_city_intro').val("");
            $('#_state_intro').val("");
            $('#_zipcode_intro').val("");
            $('#_email_intro').val("");
            console.log(userObject);
            callGoogleSheets(userObject);            
        }  
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
    <div style="display: none; max-width: 600px;" id="thank-you-popup" class="message">
	<div class="card text-center">
		<div class="card-header"><img src="img/I25I80ProjectLog.png" class="img-fluid" alt="WyDOT Logo"/></div>
		<div class="card-body">
			<h3>Thank you for signing in!</h3>			
			
			<div class="mt-3"> 
				<!--<a href="#" class="btn btn-outline-primary fancybox-closebt">Close</a>-->
				<button type="button" data-fancybox-close="" title="Close" class="btn btn-outline-primary fancybox-closebt">Continue</button>
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