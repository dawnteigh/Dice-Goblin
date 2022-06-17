class CreateValues < ActiveRecord::Migration[6.1]
  def change
    create_table :values do |t|
      t.integer :value
      t.integer :times_rolled
      t.integer :die_id
    end
  end
end
