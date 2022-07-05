class ValuesController < ApplicationController
    # To get all the values, for whatever reason
    get '/values' do
        Value.all.to_json
    end

    # Get all the values for a die using the die's id
    get '/values/:id' do
        Value.where(die_id: params[:id]).to_json
    end

    # Reset all values for a die using its id
    patch '/values/:id' do
        die = Die.find(params[:id])
        values = Value.where(die_id: params[:id])
        values.update_all(times_rolled: params[:times_rolled])
        die.update_total
        die.update_avg
        die.to_json(include: :values)
    end

    # Update a value onClick, getting :id from the selected die and :value from the button clicked
    patch '/values/:id/:value' do
        die = Die.find(params[:id])
        value = Value.where(die_id: params[:id]).find_by(value: params[:value])
        value.update(times_rolled: params[:times_rolled])
        die.update_total
        die.update_avg
        die.to_json(include: :values)
    end

    get '/stats' do
        types = Die.all.map{ |d| d.type_of_die }.uniq
        type_stat_object = types.map{ |t| {t => Die.type_stats(t)} }.reduce({}, :merge)
        stat_block = {
            total_dice: Die.total_dice,
            total_rolls: Value.total_rolls,
            total_twenties: Die.total_natural_twenties,
            total_ones: Die.total_natural_ones,
            seven_perc: Die.seven_percentage,
            type_stats: type_stat_object
        }
        stat_block.to_json
      end

end