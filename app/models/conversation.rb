class Conversation < ApplicationRecord
    
    has_many :messages, dependent: :destroy
    has_many :users, -> {distinct}, through: :messages
    attr_accessor :new_conv_user_ids


    validates :title, presence: true



    def deleted_by_user?(user)
      deleted_by.include?(user.id)
    end
end
  


    