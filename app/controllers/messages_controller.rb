class MessagesController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response

    def index
        messages = Message.all
        render json: messages
    end

    def create
        message = Message.new(message_params)
        message.user_id = current_user.id
        message.read = false
        message.initialiser = false
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
    
    def message_params
        params.permit(:content, :deleted, :conversation_id)
    end

    def render_unprocessable_entity_response(invalid)
        render json: {errors: invalid.record.errors.full_messages}, status: :unprocessable_entity
    end
end
