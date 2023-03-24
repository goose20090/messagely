class AddDeletedToConversationUsers < ActiveRecord::Migration[6.1]
  def change
    add_column :conversation_users, :deleted, :boolean, default: false
  end
end
