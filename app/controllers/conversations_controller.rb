class ConversationsController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
    before_action :authorize

    def index
        conversations = Conversation.all
        render json: conversations, include: ['messages', 'messages.user', 'users']
    end

    def create
        if params[:new_conv_user_ids].blank?
            render json: { errors: ["There must be at least one recipient."] }, status: :unprocessable_entity
            return
          end
        conversation = Conversation.new(title: params[:title], new_conv_user_ids: params[:new_conv_user_ids])
        params[:new_conv_user_ids].each do |user_id|
          initialiser_message = Message.create(user_id: user_id[:id], conversation_id: conversation.id, initialiser: true, read: true, content: 'initialiser')
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

        conversation = find_conversation
        conversation.deleted_by << current_user.id unless conversation.deleted_by.include?(current_user.id)
        if conversation.deleted_by.length === conversation.users.length
            conversation.destroy
        else
            conversation.messages.where({user_id: current_user.id}).update_all({deleted: true, content: nil, read: true})
        end
        conversation.save
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
        params.permit(:title, :id, :new_conv_user_ids,)
    end
    def render_unprocessable_entity_response invalid
        render json: {errors: invalid.record.errors.full_messages}, status: :unprocessable_entity
    end
end
