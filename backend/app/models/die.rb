class Die < ActiveRecord::Base
    self.table_name = "dice"
    has_many :values

    def create_values
        if type_of_die == "d%"
            self.update(num_of_values: 10)
            (0..9).to_a.each{ |val| Value.create(value: val * 10, die_id: self.id) }
        elsif type_of_die == "2d6"
            self.update(num_of_values: 11)
            (2..12).to_a.each{ |val| Value.create(value: val, die_id: self.id) }
        else
            max_value = self.type_of_die.tr('^0-9', '').to_i
            self.update(num_of_values: max_value)
            (1..num_of_values).to_a.each{ |val| Value.create(value: val, die_id: self.id) }
        end
    end
    
    def update_total
        sum = self.values.map{ |v| v.times_rolled }.sum
        self.update(total_rolls: sum)
    end
    
    def update_avg
        if self.total_rolls == 0
            self.update(average_roll: 0)
        else
            avg = self.values.map{ |v| v.value * v.times_rolled }.sum / self.total_rolls.to_f
            self.update(average_roll: avg.round(2))
        end
    end

    def self.total_dice
        Die.all.size
    end

    def self.total_natural_twenties
        Die.all.where(type_of_die: "d20").map{ |d| d.values.where(value: 20) }.map{ |v| v[0].times_rolled }.sum
    end

    def self.total_natural_ones
        Die.all.where(type_of_die: "d20").map{ |d| d.values.where(value: 1) }.map{ |v| v[0].times_rolled }.sum
    end

    def self.seven_percentage
        sevens = Die.all.where(type_of_die: "2d6").map{ |d| d.values.where(value: 7) }.map{ |v| v[0].times_rolled }.sum
        craps_rolls = Die.all.where(type_of_die: "2d6").map{ |d| d.total_rolls }.sum
        ((sevens / craps_rolls.to_f) * 100).round(2)
    end

    def self.type_stats(type_of_die)
        qualifying_dice = Die.all.filter{ |d| d.type_of_die == type_of_die && d.total_rolls >= 50 }
        averages = qualifying_dice.map{ |d| d.average_roll }
        max_avg_name = qualifying_dice.find{ |d| d.average_roll == averages.max }.description
        min_avg_name = qualifying_dice.find{ |d| d.average_roll == averages.min }.description
        top_max_perc = qualifying_dice.map{ |d| ((d.values.last.times_rolled / d.total_rolls.to_f) * 100).round(2) }.max
        top_min_perc = qualifying_dice.map{ |d| ((d.values.first.times_rolled / d.total_rolls.to_f) * 100).round(2) }.max
        top_max_name = qualifying_dice.find{ |d| ((d.values.last.times_rolled / d.total_rolls.to_f) * 100).round(2) == top_max_perc }.description
        top_min_name = qualifying_dice.find{ |d| ((d.values.first.times_rolled / d.total_rolls.to_f) * 100).round(2) == top_min_perc }.description
        { 
            max_avg: averages.max,
            max_avg_name: max_avg_name,
            min_avg: averages.min,
            min_avg_name: min_avg_name,
            max_perc: top_max_perc,
            max_perc_name: top_max_name,
            min_perc: top_min_perc,
            min_perc_name: top_min_name
        }
    end
end