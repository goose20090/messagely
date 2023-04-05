class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :total_unread_message_count


  has_many :messages
  has_many :conversations, through: :messages

  def total_unread_message_count
    self.object.total_unread_message_count
  end
end
