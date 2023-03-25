class ConversationSerializer < ActiveModel::Serializer
  attributes :id,:title, :updated_at, :created_at, :deleted, :unread_messages_count

  has_many :conversation_users
  has_many :messages
  has_many :users, through: :conversation_users

  def deleted
    self.object.deleted_by_user?(scope)
  end

  def unread_messages_count
    self.object.messages.select { |message| !message.read && message.user_id != scope.id }.count
  end
end
