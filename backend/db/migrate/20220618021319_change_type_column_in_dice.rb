class ChangeTypeColumnInDice < ActiveRecord::Migration[6.1]
  def change
    rename_column :dice, :type, :type_of_die
  end
end
