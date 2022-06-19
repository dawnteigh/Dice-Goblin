class Die < ActiveRecord::Base
    self.table_name = "dice"
    has_many :values

    def self.create(description:, type_of_die:, image_url: nil)
        if self.type_of_die == "d%"
            @num_of_values = 10
            (0..9).to_a.each{ |val| Value.create(value: val, die_id: self.id) }
        elsif self.type_of_die == "2d6"
            @num_of_values = 11
            (2..12).to_a.each{ |val| Value.create(value: val, die_id: self.id) }
        else
            @num_of_values = @type_of_die.scan(/\d/).sample.to_i
            (1..@num_of_values).to_a.each{ |val| Value.create(value: val, die_id: self.id) }
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