class ConversationsController < ApplicationController
rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
rescue_from Conversation::ConversationError, with: :render_unprocessable_entity_response


    def index
        conversations = Conversation.all
        byebug
        render json: conversations, include: ['messages', 'messages.user', 'users']
    end

    def create
        conversation = Conversation.new(title: params[:title])
        params[:new_conv_user_ids].each do |user_obj|
            user = User.find(user_obj[:id])
            conversation.users << user
        end
        conversation.save!
        render json: conversation, conversation: :created
    end

    def update
        conversation = find_conversation
        conversation.update!(conversation_params)
        render json: conversation
    end

    def destroy
        conversation_user = current_user.conversation_users.find_by(conversation_id: params[:id])
      
        current_user.messages.where(conversation_id: params[:id]).update_all(deleted: true)

        conversation_user.update(deleted: true)

        if conversation_user.conversation.conversation_users.all?(&:deleted)
            conversation_user.conversation.conversation_users.destroy_all
            conversation_user.conversation.destroy
        end
      
        head :no_content
    end

    private

    def find_conversation
        Conversation.find(params[:id])
    end

    def current_user
        User.find(session[:user_id])
    end

    def conversation_params
        params.permit(:title, :id)
    end
    def render_unprocessable_entity_response invalid
        render json: {errors: invalid.record.errors.full_messages}, status: :unprocessable_entity
    end
end
