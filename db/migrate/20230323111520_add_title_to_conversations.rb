class AddTitleToConversations < ActiveRecord::Migration[6.1]
  def change
    add_column :conversations, :title, :string
  end
end
