module SessionHandler
    extend ActiveSupport::Concern
  
    private
  
    def set_session(user, remember_me)
      session[:remember_me] = remember_me
      session[:user_id] = user.id
    end
  
    def clear_session
      session.delete(:user_id)
    end
  end