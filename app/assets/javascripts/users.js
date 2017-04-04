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
    submitBtn.val("Processing").prop("disabled", true);
    
    //collect the credit card fields.
    var ccNum = $("#card_number").val(),
        cvcNum = $("#card_code").val(),
        expMonth = $("#card_month").val(),
        expYear = $("#card_year").valueOf();
        
      // Use Stripe js library to check for card errors
      var error = false;
      
      //Validate  card number
      if(!Stripe.card.validateCardNumber(ccNum)) {
        error = true;
        alert("The credit card number apperars to be invalid");
      }
      
      //Validate  CVC
      if(!Stripe.card.validateCVC(cvcNum)) {
        error = true;
        alert("The CVC number apperars to be invalid");
      }
      
      //Validate  expiration date
      if(!Stripe.card.validateExpiry(expMonth, expYear)) {
        error = true;
        alert("The expiration date apperars to be invalid");
      }
      
      if(error) {
          // if card errors don't send to Stripe
          submitBtn.prop('disabled', false).val("Sign Up");
        } else {
        //send credit card info to stripe
        Stripe.createToken({
          number: ccNum,
          cvc: cvcNum,
          exp_month: expMonth,
          expYear: expYear
        }, stripeResponseHandler);
      }
      return false;
  }); // closing tags for click event
  
  //stripe will return a Card token
  function stripeResponseHandler(status, response) {
    // get tolen from the response as per Stripe documentation
    var token = response.id;
    
    //Inject Card token as a hidden field into form
    theForm.append( $('<input type="hidden" name="user[stripe_card_token]">').val(token) );
    
    //submit for to Rails app.
      theForm.get(0).submit();
  }
});


