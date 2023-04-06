class ApplicationController < ActionController::API
  include ActionController::Cookies
  before_action :authorize

  private
  
  def current_user
    if session[:user_id].present?
      User.find_by(id: session[:user_id])
    end
  end

  def authorize
    return render json: {errors: ["Not authorized"]}, status: :unauthorized unless session.include? :user_id
  end
end
