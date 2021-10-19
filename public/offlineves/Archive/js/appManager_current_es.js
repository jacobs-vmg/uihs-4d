// var patt = /name|email/gmi;
var patt = '1';
console.log("bop3")
//set google sheet id here:
var googlesheetid = "1gPClF5F8fGuzJBfnw6c5ohp55fb1Vl0jq2yzu6UnSgg";

//set google sheet names here:
// var _sheetVisitors = "Visitors";
// var _sheetComments = "Comments";
var _sheetVisitors = "Visitors Es";
var _sheetComments = "Comments Es";

//set email sender here:
var emailSender = 'Community.Relations@HydroOne.com';

//set email subject here:
var emailSubject = "Chatham to Lakeshore Open House Comment";

//list radio button and checkbox ids/names here:
var radioButtons = ["inlineRadioOptions", "_employedCheck", "_businessCheck", "_monetaryCheck", "_mailing-list-mail", "mailing-list-options"];

//adds a class to style invalid inputs red
$('body').append('<style>.input_check::placeholder{color:red}</style>');

//handler for comment submissions (change comment modal html here)
function comment(_data){
    console.log('comment handler')
    _modalHtml = `
    <div style="display: none; max-width: 600px;" id="thank-you-popup" class="message">
	<div class="card text-center">
	<div class="card-header"><img src="img/Logo-US59Lp.jpg" class="img-fluid" style="height: 80px;"
	alt="Bay Crossing Logo" /></div>
		<div class="card-body">
			<h3>Gracias por su comentario!</h3>			
			
			<div class="mt-3"> 
				<!--<a href="#" class="btn btn-outline-primary fancybox-closebt">Close</a>-->
				<button type="button" data-fancybox-close="" title="Close" class="btn btn-outline-primary fancybox-closebt">Cerrar</button>
			</div>
		</div>
	</div>
</div>
    `;
    $.fancybox.close()
    $.fancybox.open(_modalHtml);
    _data.sheet = _sheetComments;
    apiCall(_data, '/api/sheets')
    // apiCall(_data, '/api/email')
    // console.log('10/28')
}

//handler for sign in submissions (change signin modal html here)
function signin (_data){
    console.log('signin handler')
    _modalHtml = `
    <div style="display: none; max-width: 600px;" id="thank-you-popup" class="message">
	<div class="card text-center">
	<div class="card-header"><img src="img/Logo-US59Lp.jpg" class="img-fluid" style="height: 80px;"
	alt="Bay Crossing Logo" /></div>
		<div class="card-body">
			<h3>Gracias por registrarse!</h3>			
			
			<div class="mt-3"> 
				<!--<a href="#" class="btn btn-outline-primary fancybox-closebt">Close</a>-->
				<button type="button" data-fancybox-close="" title="Close" class="btn btn-outline-primary fancybox-closebt">Cerrar</button>
			</div>
		</div>
	</div>
</div>
    `;
    $.fancybox.close()
    $.fancybox.open(_modalHtml);
    _data.sheet = _sheetVisitors;
    apiCall(_data, '/api/sheets')
}



$("#_mailing-list-email, #_mailing-list-mail, #_mailing-list-none").click(function(event){
    console.log(event.target);
    console.log('mail option')

    switch($(this).attr('id')) {
        case '_mailing-list-email':
          // code block
          patt = "1";
          $('#firstName').removeClass('input_check').attr("placeholder","First Name*")
          $('#lastName').removeClass('input_check').attr("placeholder","Last Name*")
          $('#_address').removeClass('input_check').attr("placeholder","Address")
          $('#_city').removeClass('input_check').attr("placeholder","City")
          $('#_state').removeClass('input_check').attr("placeholder","State")
          $('#_zipcode').removeClass('input_check').attr("placeholder","Zip Code")
          $('#_email').removeClass('input_check').attr("placeholder","Email*")
          break;
        case '_mailing-list-mail':
          // code block
          patt = '2';
          $('#firstName').removeClass('input_check').attr("placeholder","First Name*")
          $('#lastName').removeClass('input_check').attr("placeholder","Last Name*")
          $('#_address').removeClass('input_check').attr("placeholder","Address*")
          $('#_city').removeClass('input_check').attr("placeholder","City*")
          $('#_state').removeClass('input_check').attr("placeholder","State*")
          $('#_zipcode').removeClass('input_check').attr("placeholder","Zip Code*")
          $('#_email').removeClass('input_check').attr("placeholder","Email")
          break;
        case '_mailing-list-none':
          // code block
          patt = '3';
          $('#firstName').removeClass('input_check').attr("placeholder","First Name*")
          $('#lastName').removeClass('input_check').attr("placeholder","Last Name*")
          $('#_address').removeClass('input_check').attr("placeholder","Address")
          $('#_city').removeClass('input_check').attr("placeholder","City")
          $('#_state').removeClass('input_check').attr("placeholder","State")
          $('#_zipcode').removeClass('input_check').attr("placeholder","Zip Code")
          $('#_email').removeClass('input_check').attr("placeholder","Email")
          break;
        default:
          // code block
      }
})

//sets form values from index page + calls handler
$('#signInForm, #commentForm').submit(function(event){
    event.preventDefault();
    _id = $(this).attr("id")
    console.log(_id)

    _data = {
        _type: null,
        arr:[],
        validFlag: true,
        sheet: _sheetVisitors,
        googlesheetid: googlesheetid,
        emailSubject: emailSubject,
        emailSender: emailSender,
        pattern: patt
    }; 
    if (_id == "commentForm"){
       _data._type = "comment"
    } else {
        _data._type = "signIn"
    }
    console.log(_data._type);


    $(this).find('input, select, textarea').each(function(index){
        // console.log($(this).attr("_type"))
        el = $(this)
        _type = $(this).attr("type")
        _id = $(this).attr("id")
        // var patt = patt;
        // console.log(patt)
        // patt = patttest(patt);
        // switch(patt) {
        //     case "1":
        //       // code block
        //       patt = /name|email|Name|First|Last/gmi;
        //       break;
        //     case "2":
        //       // code block
        //       patt = /name|address|city|state|Zip/gmi;
        //       break;
        //     case "3":
        //       // code block
        //       patt = /name|Last/gmi;
        //       break;
        //     default:
        //       patt = /name|email|Name|First|Last/gmi;
        //       console.log('default switch option')
        //       // code block
        //   }
    // if (_data.pattern == '1'){
    //     var pattern = /name|email|Name|First|Last/gmi;
    // } else if ( _data.pattern == '2'){
    //     var pattern = /name|address|city|state|Zip/gmi;
    // } else if (_data.pattern == '3') {
        var pattern = /name/gmi;
    // } else {
    //     var pattern = /name/gmi;
    //     console.log('default switch option2')
    // }

        _validClass = false/*pattern.test(_id);*/

        // console.log($(this).attr('id') + " " + patt + " " + _validClass)
        
        if (_validClass){
            if (el.val() == ""){

                var _placeholder = el.attr('placeholder').toLowerCase()
                // el.attr("placeholder", "");
                var placepatt = /Please enter/gmi;
                if ( placepatt.test(el.attr("placeholder") ) ){
                    // el.attr("placeholder",
            
                } else {
                    el.attr("placeholder", "Please enter " + _placeholder /*el.attr('placeholder').toLowerCase()*/ );
                }
                
                el.addClass('input_check');
                _data.validFlag = false;
            } 
        }
        if(_type == "text" || _type == "email"){
            // console.log(_type + ': ' + el.val() + " " + _id)
            _data.arr.push([_id, el.val()]);
        } else if (_type == "radio"){
            for (var i=0; i<radioButtons.length; i++){
                _checked = el.filter('[name="'+radioButtons[i]+'"]:checked');
                if (typeof _checked.val() !== 'undefined'){
                    // console.log(_checked.val());
                    _data.arr.push([_id, _checked.val()]);
                }
            }
        } else if (_id == "dropdown_select"){
            // console.log(_type + ': ' + el.val() + " " + _id)
            _data.arr.push([_id, el.val()]);
        } else if (el.is('textarea')){
            // console.log(_type + ': ' + el.val() + " " + _id)
            _data.arr.push([_id, el.val()]);
        } else if (_type == "checkbox"){
            if(el.is(":checked")){
                // console.log("checked: " + _id)
                _data.arr.push([_id, _id+": yes"]);
            } else {
                _data.arr.push([_id, _id+": no"]);
            }
        }
    });
    console.log(_data)
    // _data = JSON.stringify(_data)
    if (_data.validFlag){
        if (_data._type == "comment"){
            // comment(JSON.stringify(_data));
            comment(_data)
        } else signin(_data);
    }
});


//send to api
function apiCall(user, endpoint){
    console.log(user)
    user = {data: JSON.stringify(user)};
    $.post('https://txdotvirtualhearing.herokuapp.com/i35Vph'+endpoint, user, function(data, status){
        console.log(data);
    });
    // user = [user]
    // user = {data: JSON.stringify(user)};
    // $.post('/i35Vph'+endpoint, user, function(data, status){
    //     console.log(data);
    // });

}

//utility function to add unique id
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

