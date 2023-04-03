class MessagesController < ApplicationController
rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
    def index
        messages = Message.all
        render json: messages
    end

    def create
        message = Message.new(message_params)
        message.read = false
        message.save!
        render json: message, message: :created
    end


    def update
        message = find_message
        message.update!(message_params)
        if(params[:deleted])
            message[:content] = nil
        end
        render json: message
    end
    private

    def find_message
        Message.find(params[:id])
    end

    def message_params
        params.permit(:content, :user_id, :conversation_id, :deleted)
    end

    def render_unprocessable_entity_response(invalid)
        render json: {errors: invalid.record.errors.full_messages}, status: :unprocessable_entity
    end
end
