var googlesheetid = "17dNRgU4-_SmD1hjJD28VKThrkvN3NRya1VZYy-wdLx4";

var emailSender = 'PittsboroHanksChapel@duke-energy.com'


$('body').append('<style>.input_check::placeholder{color:red}</style>')

$('#commentForm').submit(function(event){
    event.preventDefault();

    if (true/*$(this).attr("id") == "signInForm_intro"*/){
        //change html
        _modalHtml = `
        <div style="display: none; max-width: 600px;" id="thank-you-popup" class="message">
        <div class="card text-center">
            <div class="card-header"><img src="img/logoduke.svg" class="img-fluid" alt="Duke Energy Logo" style="max-width: 200px;"/></div>
            <div class="card-body">
                <h3>Thank you for your feedback.</h3>			
                <p>Your message has been successfully sent. Your input is critical part of this process.</p>
                <div class="mt-3"> 
                    <!--<a href="#" class="btn btn-outline-primary fancybox-closebt">Close</a>-->
                    <button type="button" data-fancybox-close="" title="Close" class="btn btn-outline-primary fancybox-closebt">Close</button>
                </div>
            </div>
        </div>
    </div>
        `;
    } else {
        // change html
        _modalHtml = `
        <div class="message">
            <h2>Thank you for your feedback!</h2>
            <p>Your comments are valuable to us.</p>
        </div>
        `
    }
	
	$.fancybox.close();
    $.fancybox.open(_modalHtml);


    validFlag = true;

    firstName = $('#firstName_comment').val();
    lastName =  $('#lastName_comment').val();
    // user._address = $("#_address_comment").val();
    // user.email = $("#_email_comment").val();
    // user.phone = $("#_phone_comment").val();
    // user.phone = $("#_comment").val();



    var _date = new Date();
    var dateString = _date.toString();
    var user = {
        type: "",
        googlesheetid:googlesheetid,
        dateString:dateString,
        emailSender: emailSender
    };

    if (false/*$(this).attr("id") == "signInForm_intro"*/){
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
            $('#firstName_comment').attr("placeholder", "Please enter first name");
            $('#firstName_comment').addClass('input_check');
            validFlag = false;
        } if (lastName == ""){
            $('#lastName_comment').attr("placeholder", "Please enter last name");
            $('#lastName_comment').addClass('input_check');
            validFlag = false;
        }
        if (validFlag){
            user.firstName = $("#firstName_comment").val()
            user.lastName = $("#lastName_comment").val()
            user._address = $("#_address_comment").val()
            // user._city = $("#_city").val()
            // user._state = $("#_state").val()
            // user._zipcode = $("#_zipcode").val()
            user.email = $("#_email_comment").val();
            user.comment = $("#_comment").val();
            user.phone = $("#_phone_comment").val();
            user.type = "signin"
        }
        
    } 
    if (validFlag){
        callGoogleSheets(user);
        // console.log(user)

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

     $.post('https://txdotvirtualhearing.herokuapp.com/pittsboroHanks', user, function(data, status){
        // console.log(data);
    });
    // $.post('/pittsboroHanks', user, function(data, status){
    //     console.log(data);
    // });

}