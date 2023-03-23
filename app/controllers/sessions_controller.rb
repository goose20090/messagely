class SessionsController < ApplicationController

    def create
        user = User.find_by(username: params[:username])
        if user&.authenticate(params[:password])
            if params[:remember_me]
                session[:user_id] = user.id
            end
        render json: user, include: ['conversations', 'conversations.users', 'conversations.messages', 'conversations.messages.user'], status: :created
        else
            render json: { error: "Invalid username or password" }, status: :unauthorized
        end
    end

    def destroy
        session.delete :user_id
        head :no_content
    end
end
