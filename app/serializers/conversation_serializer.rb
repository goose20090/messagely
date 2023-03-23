class ConversationSerializer < ActiveModel::Serializer
  attributes :id,:title, :updated_at, :created_at

  has_many :conversation_users
  has_many :messages
  has_many :users, through: :conversation_users
end
