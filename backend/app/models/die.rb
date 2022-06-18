class Die < ActiveRecord::Base
    self.table_name = "dice"
    has_many :values

    def update_avg
        avg = self.values.map{ |v| v.value * v.times_rolled }.sum / self.total_rolls.to_f
        self.update(average_roll: avg)
    end

    def update_total
        sum = self.values.map{ |v| v.times_rolled }.sum
        self.update(total_rolls: sum)
    end
end