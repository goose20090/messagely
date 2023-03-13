class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :password, :avatar_url

  has_many :conversations
  has_many :messages
end
