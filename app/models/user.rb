class User < ApplicationRecord
    has_many :messages
    has_many :conversations, through: :messages

    validates :username, uniqueness: true
    validates :username, presence: true

    has_secure_password
end
