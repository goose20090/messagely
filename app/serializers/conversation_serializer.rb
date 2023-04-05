class ConversationSerializer < ActiveModel::Serializer
  attributes :id,:title, :updated_at, :created_at, :deleted, :unread_messages_count


  has_many :messages
  has_many :users, through: :conversation_users

  def deleted
    self.object.deleted_by_user?(current_user)
  end

  def unread_messages_count
    self.object.messages.filter { |message| !message.read && message.user_id != current_user.id }.count
  end
  
  def messages
    object.messages.order(created_at: :asc)
  end

end
