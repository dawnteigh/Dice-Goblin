class CreateDice < ActiveRecord::Migration[6.1]
  def change
    create_table :dice do |t|
      t.string :description
      t.string :type
      t.string :image_url
      t.integer :num_of_values
      t.integer :total_rolls
      t.float :average_roll
    end
  end
end
