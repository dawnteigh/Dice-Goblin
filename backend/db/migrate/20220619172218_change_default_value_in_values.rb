class ChangeDefaultValueInValues < ActiveRecord::Migration[6.1]
  def change
    change_column_default :values, :times_rolled, from: 1, to: 0
  end
end
