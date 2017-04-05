class Users::RegistrationsController < Devise::RegistrationsController
  # extend default Devise Gem beahior so that
  # users sign up with the pro account (plan 2) 
  # save with a special Stripe subscription function.
  # otherwise Devise signs up user as usual.
  def create
    super do |resource|
      if params[:plan]
        resource.plan_id = params[:plan]
        if resource.plan_id == 2
          resource.save_with_subscription
        else
          resource.save
        end
      end
    end
  end
end