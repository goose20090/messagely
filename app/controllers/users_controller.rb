class UsersController < ApplicationController
rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
before_action :authorize, only: [:show]

    def index
        users = User.all
        render json: users
    end

    def show
        user = User.find_by(id: session[:user_id])
        render json: user, include: [['conversations', 'conversations.messages', 'conversations.messages.user']]
    end

    def create
        user = User.create!(user_params)
        if params[:remember_me]
            session[:user_id] = user.id
        end
        render json: user, status: :created
    end

    private
    
    def user_params
        params.permit(:username, :password, :password_confirmation)
    end

    def authorize
        return render json: {errors: ["Not authorized"]}, status: :unauthorized unless session.include? :user_id
    end

    def render_not_found_response
        render json: {errors: "User not in session"}, status: :not_found
    end

    def render_unprocessable_entity_response invalid
        render json: {errors: invalid.record.errors.full_messages}, status: :unprocessable_entity
    end
end
