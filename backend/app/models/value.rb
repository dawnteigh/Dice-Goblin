class Value < ActiveRecord::Base
    belongs_to :die

    def self.total_rolls
        Value.all.map{ |v| v.times_rolled }.sum
    end

    def self.total_natural_twenties
        Value.all.where(value: 20).map{ |v| v.times_rolled }.sum
    end

    def self.total_natural_ones
        Die.all.where(type_of_die: "d20").map{ |d| d.values.where(value: 1) }.map{ |v| v[0].times_rolled }.sum
    end


end