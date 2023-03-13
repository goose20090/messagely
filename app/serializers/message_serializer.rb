class MessageSerializer < ActiveModel::Serializer
  attributes :id, :content, :user_id, :conversation_id

  belongs_to :user
  belongs_to :conversation
end
