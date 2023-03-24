class MessagesController < ApplicationController

    def index
        messages = Message.all
        render json: messages
    end

    def create
        message = Message.create!(message_params)
        render json: message, message: :created
    end

    def update
        byebug
        message = find_message
        message.update!(message_params)
        render json: message
    end
    private

    def find_message
        Message.find(params[:id])
    end

    def message_params
        params.permit(:content, :user_id, :conversation_id, :deleted)
    end
end
