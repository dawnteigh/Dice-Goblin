class ValuesController < ApplicationController
    # To get all the values, for whatever reason
    get '/values' do
        Value.all.to_json
    end

    # Get all the values for a die using the die's id
    get '/values/:id' do
        Value.where(die_id: params[:id]).to_json
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

end