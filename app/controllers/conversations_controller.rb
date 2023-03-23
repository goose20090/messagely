class ConversationsController < ApplicationController

    def index
        conversations = Conversation.all
        render json: conversations, include: ['messages', 'messages.user', 'users']
    end

    def create

        conversation = Conversation.create
        params[:new_conv_user_ids].each do |user_obj|
            user = User.find(user_obj[:id])
            conversation.users << user
        end
        render json: conversation
    end
end
