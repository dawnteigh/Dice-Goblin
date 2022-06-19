class ValuesController < ApplicationController
    # To get all the values, for whatever reason
    get '/values' do
        Value.all.to_json
    end

    # Get all the values for a die using the die's id
    get '/values/:id' do
        Value.where(die_id: params[:id]).to_json
    end

    patch '/values/:id/:value' do
        value = Value.where(die_id: params[:id]).find_by(value: params[:value])
        value.update(times_rolled: params[:times_rolled])
        value.to_json
    end


end