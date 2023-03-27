class SessionsController < ApplicationController
    include SessionHandler
  
    def create
      user = User.find_by(username: params[:username])
      if user&.authenticate(params[:password])
        set_session(user, params[:remember_me])
        render json: user, include: ['conversations', 'conversations.users', 'conversations.messages', 'conversations.messages.user'], status: :created
      else
        render json: { error: "Invalid username or password" }, status: :unauthorized
      end
    end
  
    def destroy
      clear_session
      head :no_content
    end
  end