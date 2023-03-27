class User < ApplicationRecord
    has_many :messages
    has_many :conversation_users
    has_many :conversations, through: :conversation_users

    attr_accessor :remember_me

    validates :username, uniqueness: true
    validates :username, presence: true

    has_secure_password

    def total_unread_message_count
        Message.where(conversation_id: self.conversation_ids, read: false).where.not(user_id: self.id).count
    end
      
end
