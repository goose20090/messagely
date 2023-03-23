class ConversationsController < ApplicationController
rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
rescue_from Conversation::ConversationError, with: :render_unprocessable_entity_response


    def index
        conversations = Conversation.all
        render json: conversations, include: ['messages', 'messages.user', 'users']
    end

    def create
        conversation = Conversation.new(title: params[:title])
        params[:new_conv_user_ids].each do |user_obj|
            user = User.find(user_obj[:id])
            conversation.users << user
        end
        conversation.save!
        render json: conversation
    end
    private
    def render_unprocessable_entity_response invalid
        render json: {errors: invalid.record.errors.full_messages}, status: :unprocessable_entity
    end
end
