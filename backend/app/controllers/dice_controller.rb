class DiceController < ApplicationController

    get '/dice' do
        Die.all.to_json
    end

end