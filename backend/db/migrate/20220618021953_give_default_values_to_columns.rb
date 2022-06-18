class GiveDefaultValuesToColumns < ActiveRecord::Migration[6.1]
  def change
    remove_column :dice, :total_rolls
    remove_column :dice, :average_roll
    remove_column :values, :times_rolled
    add_column :dice, :total_rolls, :integer, default: 0
    add_column :dice, :average_roll, :float, default: 0
    add_column :values, :times_rolled, :integer, default: 1
  end
end
