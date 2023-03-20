class MessagesController < ApplicationController

    def index
        messages = Message.all
        render json: messages
    end

    def create
        message = Message.create!(message_params)
        render json: message, message: :created
    end

    private

    def message_params
        params.permit(:content, :user_id, :conversation_id)
    end
end
