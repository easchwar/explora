class CreateSubscriptions < ActiveRecord::Migration
  def change
    create_table :subscriptions do |t|
      t.integer :user_id, null: false, index: true
      t.integer :subscribable_id, null: false
      t.string :subscribable_type, null: false

      t.timestamps null: false
    end

    add_index :subscriptions, [:subscribable_id, :subscribable_type]
    add_index :subscriptions, [:user_id, :subscribable_id, :subscribable_type],
      unique: true, name: 'index_subscriptions_unique_user_to_subscribable_obj'
  end
end
