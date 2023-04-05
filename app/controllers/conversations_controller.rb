class ConversationsController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
    before_action :authorize

    def index
        conversations = Conversation.all
        render json: conversations, include: ['messages', 'messages.user', 'users']
    end

    def create
        byebug
        conversation = Conversation.new(title: params[:title])
        params[:new_conv_user_ids].each do |id_hash|
            initialiser_message = Message.create(user_id: id_hash[:id], conversation_id: conversation.id, initialiser: true, read: true, content: 'initialiser')
            conversation.messages << initialiser_message
        end
        conversation.save!
        render json: conversation, current_user: current_user, include: ['messages', 'messages.user', 'users'], serializer: ConversationSerializer, status: :created 
    end

    def update
        conversation = find_conversation
        conversation.update!(conversation_params)
        render json: conversation
    end

    def update_unread
        conversation = find_conversation
        current_user_messages = conversation.messages.where.not(user_id: current_user.id)
        current_user_messages.update_all(read: true)
        render json: conversation, include: ['messages', 'messages.user', 'users']
    end

    def destroy
        conversation_user = current_user.conversation_users.find_by(conversation_id: params[:id])
      
        current_user.messages.where(conversation_id: params[:id]).update_all(deleted: true, read: true, content: nil)

        conversation_user.update(deleted: true)

        if conversation_user.conversation.conversation_users.all?(&:deleted)
            conversation_user.conversation.conversation_users.destroy_all
            conversation_user.conversation.destroy
        end
      
        head :no_content
    end

    private

    def find_conversation
        current_user.conversations.find(params[:id])
    end

    def authorize
        return render json: {errors: ["Not authorized"]}, status: :unauthorized unless session.include? :user_id
    end

    def conversation_params
        params.permit(:title, :id, :new_conv_user_ids)
    end
    def render_unprocessable_entity_response invalid
        render json: {errors: invalid.record.errors.full_messages}, status: :unprocessable_entity
    end
end
