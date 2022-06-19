class DiceController < ApplicationController
    # Get all dice, to render in a list view
    get '/dice' do
        Die.all.to_json
    end

    # Get a single die using its id for a show page
    get '/dice/:id' do
        Die.find(params[:id]).to_json
    end

end