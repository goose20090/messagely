class User < ApplicationRecord
    has_many :messages
    has_many :conversations, -> {distinct},  through: :messages
    attr_accessor :remember_me

    validates :username, uniqueness: true
    validates :username, presence: true

    has_secure_password

    def total_unread_message_count
        Message.where(conversation_id: self.conversation_ids, read: false).where.not(user_id: self.id).count
    end

        # possible upgrade:  self.messages.where(conversation_id: self.conversation_ids, read: false).where.not(user_id: self.id).count

    def unique_conversations
        self.conversations.distinct
    end
      
end
