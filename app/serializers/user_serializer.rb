class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :total_unread_message_count, :conversations


  has_many :messages
  has_many :conversations, through: :messages

  def total_unread_message_count
    self.object.total_unread_message_count
  end

  def conversations
    self.object.conversations.where('NOT ARRAY[?] <@ deleted_by', self.object.id)
  end
end
