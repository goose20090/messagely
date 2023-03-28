class ApplicationController < ActionController::API
  include ActionController::Cookies

  private
  def current_user
    if session[:user_id].present?
      User.find_by(id: session[:user_id])
    end
  end
end
