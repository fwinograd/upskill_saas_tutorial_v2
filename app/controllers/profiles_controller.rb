class ProfilesController < ApplicationController
  
  # GET to /users/:user_id/profile/new
  def new
    # Render blank profile details form
    @profile = Profile.new
  end 
  
  # POST to /users/:user_id/profile
  def create
    # Ensure that we have the user who is filling out form
    @user = User.find( params[:user_id] )
    # Create profile linked to this specific user
    @profile = @user.build_profile( profile_params )
    if @profile.save
      flash[:success] = "Profile updated!"
      redirect_to user_path( params[:user_id] )
    else
      render action: :new
    end
  end
  def edit
    @user = User.find( params[:user_id] )
    @profile = @user.profile
  end
  
  def update
    # PUT /users/:user_id/profile
    @user = User.find( params[:user_id] )
    #retrieve that users profile
    @profile = @user.profile
    # mass assign user profile attributes and save
    if @profile.update_attributes(profile_params)
      flash[:success] = "Profile updated"
      # redirect to user profile
      redirect_to user_path( params[id: :user_id] )
    else
      render action: :edit
    end
      
    
  end
  
private
  def profile_params
    params.require(:profile).permit(:first_name, :last_name, :avatar, :job_title, :phone_number, :contact_email, :description)
  end
end