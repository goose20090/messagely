class ConversationSerializer < ActiveModel::Serializer
  attributes :id,:title, :updated_at, :created_at, :deleted

  has_many :conversation_users
  has_many :messages
  has_many :users, through: :conversation_users

  def deleted
    object.deleted_by_user?(scope)
  end
end
