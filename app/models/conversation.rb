class Conversation < ApplicationRecord
    
    has_many :messages, dependent: :destroy
    has_many :users, through: :messages

    validates :title, presence: true

    # validate :must_have_at_least_two_users

    def deleted_by_user?(user)
      deleted_by.include?(user.id)
    end
    
    private

    
end


    # def must_have_at_least_two_users
    #     if users.size < 2
    #         errors.add(:users, message: "At least one recipient required")
    #     end
    # end