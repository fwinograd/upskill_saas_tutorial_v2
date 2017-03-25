class ContactsController < ApplicationController
  # GET Request to /contact-us
  # Show ne new contact form
  def new
    @contact = Contact.new
  end
  
  # POST request
  def create
    # Mass assignment
    @contact = Contact.new(contact_params)
    # Save to contact object to the database
    if @contact.save
      # Store form fields via paramaters into variables
      name = params[:contact][:name]
      email = params[:contact][:email]
      body = params[:contact][:comments]
      #Plug variables into ContactMailer
      #email method send mail
      ContactMailer.contact_email(name, email, body).deliver
      # setup message in Flash hash
      flash[:success] = "Message Sent."
      redirect_to new_contact_path
    else
      # if contact object doesn't save, store message and redirect
      flash[:danger] = @contact.errors.full_messages.join(", ")
      redirect_to new_contact_path
    end
  end
  
  private
  # to collect data in Rails, we need to use stron parameters
    def contact_params
      params.require(:contact).permit(:name, :email, :comments)
    end
end
    