class CreateConversations < ActiveRecord::Migration[6.1]
  def change
    create_table :conversations do |t|
      t.string :title
      t.integer :deleted_by, array: true, default: []
      t.timestamps
    end
  end
end
