class CreateTags < ActiveRecord::Migration
  def change
    create_table :tags do |t|
      t.string :tag_name, null: false

      t.timestamps null: false
    end
    add_index :tags, :tag_name, unique: true
  end
end
