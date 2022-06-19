puts "Clearing the weeds..."
Die.destroy_all
Value.destroy_all

puts "Planting dice! 🌱"
Die.create(description: "Area 51", type_of_die: "d4")
Die.create(description: "Turquoise Swirl", type_of_die: "d6")
Die.create(description: "Glittering Embers", type_of_die: "d8")
Die.create(description: "Forest Speckled", type_of_die: "d10")
Die.create(description: "Opaque Orange", type_of_die: "d%")
Die.create(description: "Violet Galaxy", type_of_die: "d%")
Die.create(description: "Gears", type_of_die: "d%")
Die.create(description: "Rainbow", type_of_die: "d12")
Die.create(description: "Forest Leaves", type_of_die: "d20")
Die.create(description: "Monopoly Dice", type_of_die: "2d6")

Die.all.each{ |d| d.create_values }



puts "Let's roll! 🎲"
