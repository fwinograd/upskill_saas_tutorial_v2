/* global $,Stripe */
//Document_ready
$(document).on('turbolinks:load', function() {
  var theForm = $('#pro_form');
  var submitBtn = $('#form-submit-btn'); 
//Set Stripe public key
Stripe.setPublishedKey( $('meta[name="stripe-key"]').attr("content") );
//When user clicks form_submit 
submitBtn.click(function(event){
  //prevent default submission behavior
  event.preventDefault();
  
  //collect the credit card fields.
  var ccNum = $("#card_number").val(),
      cvcNum = $("#card_code").val(),
      expMonth = $("#card_month").val(),
      expYear = $("#card_year").valueOf();
      
    //send credit card info to stripe
    Stripe.createToken({
      number: ccNum,
      cvc: cvcNum,
      exp_month: expMonth,
      expYear: expYear
    }, stripeResponseHandler);
});



//stripe will return a Card token
//Inject Card token as a hidden field into form
//submit for to Rails app.

});


