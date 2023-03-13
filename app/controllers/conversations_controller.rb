class ConversationsController < ApplicationController

    def index
        conversations = Conversation.all
        render json: conversations
    end
end
