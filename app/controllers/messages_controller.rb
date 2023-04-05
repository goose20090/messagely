class MessagesController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
    before_action :authorize

    def index
        messages = Message.all
        # .filter{|message| message[:initialiser] === true}
        render json: messages
    end

    def create
        message = Message.new(message_params)
        message.user_id = current_user.id
        message.read = false
        message.save!
        render json: message, message: :created
    end


    def update
        message = find_message
        message.update!(message_params)
        if(params[:deleted])
            message[:content] = nil
            message[:read] = true
        end
        render json: message
    end


    private

    def find_message
        current_user.messages.find(params[:id])
    end

    def authorize
        return render json: {errors: ["Not authorized"]}, status: :unauthorized unless session.include? :user_id
    end

    def message_params
        params.permit(:content, :deleted, :conversation_id)
    end

    def render_unprocessable_entity_response(invalid)
        render json: {errors: invalid.record.errors.full_messages}, status: :unprocessable_entity
    end
end
