class ApplicationController < Sinatra::Base
  set :default_content_type, 'application/json'
  
  # Add your routes here
  get "/" do
    { message: "Hey, welcome to Dice Goblin!" }.to_json
  end

end
