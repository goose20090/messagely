class UsersController < ApplicationController
rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity

    def index
        users = User.all
        render json: users
    end

    def show
        user = User.find_by(id: session[:user_id])
        render json: user
    end

    def create
        user = User.create!(user_params)
        session[:user_id] = user.id
        render json: user, status: :created
    end

    private
    
    def user_params
        params.permit(:username, :password, :password_confirmation)
    end

    def render_unprocessable_entity_response invalid
        render json: {errors: invalid.record.errors.full_messages}, status: :unprocessable_entity
    end
end
