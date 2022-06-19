class Die < ActiveRecord::Base
    self.table_name = "dice"
    has_many :values

    def create_values
        if type_of_die == "d%"
            self.update(num_of_values: 10)
            (0..9).to_a.each{ |val| Value.create(value: val, die_id: self.id) }
        elsif type_of_die == "2d6"
            self.update(num_of_values: 11)
            (2..12).to_a.each{ |val| Value.create(value: val, die_id: self.id) }
        else
            max_value = self.type_of_die.tr('^0-9', '').to_i
            self.update(num_of_values: max_value)
            (1..num_of_values).to_a.each{ |val| Value.create(value: val, die_id: self.id) }
        end
    end

    def update_avg
        avg = self.values.map{ |v| v.value * v.times_rolled }.sum / self.total_rolls.to_f
        self.update(average_roll: avg)
    end

    def update_total
        sum = self.values.map{ |v| v.times_rolled }.sum
        self.update(total_rolls: sum)
    end
end