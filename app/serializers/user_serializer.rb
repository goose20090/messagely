class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :password, :avatar_url
end
