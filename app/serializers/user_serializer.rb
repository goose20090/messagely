class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :password, :password_confirmation, :avatar_url

  has_many :conversations
  has_many :messages
end
