class UsersController < ApplicationController
    include SessionHandler
  
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response

    skip_before_action :authorize, only: [:create]
    before_action :handle_remember_me, only: [:show]
  
    def index
      users = User.all
      render json: users
    end
  
    def show
      user = User.find_by(id: session[:user_id])
      render json: user, include: ['conversations.messages', 'conversations.users', 'conversations.messages.user']
    end
  
    def create
      user = User.create!(user_params)
      set_session(user, params[:remember_me])
      render json: user, status: :created
    end

    private

    # auth and security
  
    def user_params
      params.permit(:username, :password, :password_confirmation, :remember_me)
    end
  
    def handle_remember_me
      if !session[:remember_me]
        clear_session
        return render json: {errors: ["Not authorized"]}, status: :unauthorized
      end
    end

    # error handling
  
    def render_not_found_response
      render json: {errors: "User not in session"}, status: :not_found
    end
  
    def render_unprocessable_entity_response(invalid)
      render json: {errors: invalid.record.errors.full_messages}, status: :unprocessable_entity
    end
  end
