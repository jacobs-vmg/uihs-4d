var googlesheetid = "1j0_IAQ6HkiLmfWQsJIClD2w7eOPP0whHMM4ztgswD2M";

$('body').append('<style>.input_check::placeholder{color:red}</style>')

$('#signInForm_intro, #signInForm').submit(function(event){
    event.preventDefault();

    if ($(this).attr("id") == "signInForm_intro"){
        //change html
        _modalHtml = `
        <div style="display: none; max-width: 600px;" id="thank-you-popup" class="message">
	<div class="card text-center">
		<div class="card-header"><img src="img/TxDOT_Logo_White.png" width="88" height="70" alt="TxDOT Logo"/></div>
		<div class="card-body">
			<h3>Thank you for signing in!</h3>			
			
			<div class="mt-3"> 
				<!--<a href="#" class="btn btn-outline-primary fancybox-closebt">Close</a>-->
				<button type="button" data-fancybox-close="" title="Close" class="btn btn-outline-primary fancybox-closebt">Close</button>
			</div>
		</div>
	</div>
</div>
        `
    } else {
        // change html
        _modalHtml = `
        <div style="display: none; max-width: 600px;" id="thank-you-popup" class="message">
	<div class="card text-center">
		<div class="card-header"><img src="img/TxDOT_Logo_White.png" width="88" height="70" alt="TxDOT Logo"/></div>
		<div class="card-body">
			<h3>Thank you for signing in!</h3>			
			
			<div class="mt-3"> 
				<!--<a href="#" class="btn btn-outline-primary fancybox-closebt">Close</a>-->
				<button type="button" data-fancybox-close="" title="Close" class="btn btn-outline-primary fancybox-closebt">Close</button>
			</div>
		</div>
	</div>
</div>
        `
    }
	$.fancybox.close();
    $.fancybox.open(_modalHtml);


    validFlag = true;

    firstName = $('#firstName').val();
    lastName =  $('#lastName').val();
    firstName_intro = $('#firstName_intro').val();
    lastName_intro =  $('#lastName_intro').val();


    var _date = new Date();
    var dateString = _date.toString();
    var user = {
        type: "",
        googlesheetid:googlesheetid,
        dateString:dateString
    };

    if ($(this).attr("id") == "signInForm_intro"){
        console.log('intro')
        if (firstName_intro == ""){
            $('#firstName_intro').attr("placeholder", "Please enter first name");
            $('#firstName_intro').addClass('input_check');
            validFlag = false;
        } if (lastName_intro == ""){
            $('#lastName_intro').attr("placeholder", "Please enter last name");
            $('#lastName_intro').addClass('input_check');
            validFlag = false;
        }
        if (validFlag){
            user.firstName = $("#firstName_intro").val()
            user.lastName = $("#lastName_intro").val()
            user._address = $("#_address_intro").val()
            user._city = $("#_city_intro").val()
            user._state = $("#_state_intro").val()
            user._zipcode = $("#_zipcode_intro").val()
            user.email = $("#_email_intro").val()
            user.type = "intro";
        }
    }else {
        if (firstName == ""){
            $('#firstName').attr("placeholder", "Please enter first name");
            $('#firstName').addClass('input_check');
            validFlag = false;
        } if (lastName == ""){
            $('#lastName').attr("placeholder", "Please enter last name");
            $('#lastName').addClass('input_check');
            validFlag = false;
        }
        if (validFlag){
            user.firstName = $("#firstName").val()
            user.lastName = $("#lastName").val()
            user._address = $("#_address").val()
            user._city = $("#_city").val()
            user._state = $("#_state").val()
            user._zipcode = $("#_zipcode").val()
            user.email = $("#_email").val()
            user.type = "signin"
        }
        
    } 
    if (validFlag){
        callGoogleSheets(user);
    }
    // console.log(user);

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
    console.log(user)

    $.post('https://txdotvirtualhearing.herokuapp.com/us40', user, function(data, status){
        // console.log(data);
    });
    // $.post('/us40', user, function(data, status){
    //     console.log(data);
    // });

}