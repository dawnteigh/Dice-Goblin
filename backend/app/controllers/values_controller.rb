class ValuesController < ApplicationController

    get '/values' do
        Value.all.to_json
    end
end