class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :password, :password_confirmation, :avatar_url, :unread_message_count

  has_many :conversation_users
  has_many :messages
  has_many :conversations, through: :conversation_users

  def unread_message_count
    self.object.unread_message_count
  end

end
