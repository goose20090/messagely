class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :password, :password_confirmation, :total_unread_message_count

  has_many :conversation_users
  has_many :messages
  has_many :conversations, through: :conversation_users

  def total_unread_message_count
    self.object.total_unread_message_count
  end

end
