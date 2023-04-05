class AddInitialiserToMessages < ActiveRecord::Migration[6.1]
  def change
    add_column :messages, :initialiser, :boolean
  end
end
