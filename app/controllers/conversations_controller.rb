class ConversationsController < ApplicationController

    def index
        conversations = Conversation.all
        render json: conversations, include: ['messages', 'messages.user', 'users']
    end
end
