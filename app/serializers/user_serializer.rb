class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :password, :password_confirmation, :avatar_url

  has_many :conversation_users
  has_many :messages
  has_many :conversations, through: :conversation_users

end
