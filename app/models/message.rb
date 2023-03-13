class Message < ApplicationRecord
    belongs_to :users
    belongs_to :conversations
end
