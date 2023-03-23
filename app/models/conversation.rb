class Conversation < ApplicationRecord
    class ConversationError < StandardError
        attr_reader :record
    
        def initialize(record)
          @record = record
        end
      end

    has_many :messages
    has_many :conversation_users
    has_many :users, through: :conversation_users

    validates :title, presence: true

    validate :must_have_at_least_two_users

    private

    def must_have_at_least_two_users
        if users.size < 2
            errors.add(:users, message: "At least one recipient required")
            raise ConversationError, self
        end
    end
end
