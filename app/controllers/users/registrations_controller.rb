class Users::RegistrationsController < Devise::Registrations_controller
  def create
    super do |resource|
        if params[:plan]
          resource.plan_id = params[:plan]
          if resource.plan_id == 2
            tesource.save_with_subscription
          else
            resource.save_with_subscription
          end
        end
      end
  end
end