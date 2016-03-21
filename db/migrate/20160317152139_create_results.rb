class CreateResults < ActiveRecord::Migration
  def change
    create_table :results do |t|
      t.string :title
      t.string :method
      t.text :notes

      t.timestamps null: false
    end
  end
end
