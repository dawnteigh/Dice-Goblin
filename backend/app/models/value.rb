class Value < ActiveRecord::Base
    belongs_to :die

    def self.total_rolls
        Value.all.map{ |v| v.times_rolled }.sum
    end
end