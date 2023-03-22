class User < ApplicationRecord
    has_many :messages
    has_many :conversation_users
    has_many :conversations, through: :conversation_users

    validates :username, uniqueness: true
    validates :username, presence: true

    has_secure_password
end
