class DiceController < ApplicationController
    # Get all dice, to render in a list view
    get '/dice' do
        Die.all.to_json
    end

    # Get a single die using its id for a show page, which will use the response values to create buttons to update said values
    get '/dice/:id' do
        Die.find(params[:id]).to_json(include: :values)
    end

    # Create new die with values, response is the new die
    post '/dice' do
        new_die = Die.create(
            description: params[:description],
            type_of_die: params[:type_of_die],
            image_url: params[:image_url]
            )
        new_die.create_values
        new_die.to_json
    end

    # Edit desc and image
    patch '/dice/:id' do
        updated_die = Die.find(params[:id]).update(
            description: params[:description],
            image_url: params[:image_url]
            )
        updated_die.to_json
    end

    # Delete a die and its values
    delete '/dice/:id' do
        Value.delete_all(die_id: params[:id])
        deleted_die = Die.find(params[:id])
        deleted_die.destroy
        deleted_die.to_json
    end
end