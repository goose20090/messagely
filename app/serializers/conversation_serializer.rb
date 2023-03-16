class ConversationSerializer < ActiveModel::Serializer
  attributes :id, :updated_at, :created_at

  has_many :users
  has_many :messages
end
