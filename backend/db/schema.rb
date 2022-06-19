# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2022_06_19_172218) do

  create_table "dice", force: :cascade do |t|
    t.string "description"
    t.string "type_of_die"
    t.string "image_url"
    t.integer "num_of_values"
    t.integer "total_rolls", default: 0
    t.float "average_roll", default: 0.0
  end

  create_table "values", force: :cascade do |t|
    t.integer "value"
    t.integer "die_id"
    t.integer "times_rolled", default: 0
  end

end
