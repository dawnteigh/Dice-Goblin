puts "Clearing the weeds..."
Die.destroy_all
Value.destroy_all

puts "Planting dice! 🌱"
Die.create(description: "Area 51", type_of_die: "d4", image_url: "dice_images/a51_d4.jpg")
Die.create(description: "Rainbow", type_of_die: "d4", image_url: "dice_images/rainbow_d4.jpg")
Die.create(description: "Shimmering Ocean", type_of_die: "d4", image_url: "dice_images/ocean_d4.jpg")
Die.create(description: "Turquoise Swirl", type_of_die: "d6", image_url: "dice_images/turquoise_d6.jpg")
Die.create(description: "Lavender Cream", type_of_die: "d6", image_url: "dice_images/lavender_d6.jpg")
Die.create(description: "Glittering Embers", type_of_die: "d6", image_url: "dice_images/glittering_embers_d6.jpg")
Die.create(description: "Glittering Embers", type_of_die: "d8", image_url: "dice_images/glittering_embers_d8.jpg")
Die.create(description: "Masterpiece", type_of_die: "d8", image_url: "dice_images/masterpiece_d8.jpg")
Die.create(description: "Wildberry Speckled", type_of_die: "d8", image_url: "dice_images/wildberry_speckled_d8.jpg")
Die.create(description: "Forest Speckled", type_of_die: "d10", image_url: "dice_images/forest_speckled_d10.jpg")
Die.create(description: "Blue", type_of_die: "d10", image_url: "dice_images/blue_d10.jpg")
Die.create(description: "Forest Leaves", type_of_die: "d10", image_url: "dice_images/forest_leaves_d10.jpg")
Die.create(description: "Opaque Orange", type_of_die: "d%", image_url: "dice_images/opaque_orange_d%.jpg")
Die.create(description: "Violet Galaxy", type_of_die: "d%", image_url: "dice_images/violet_galaxy_d%.jpg")
Die.create(description: "Gears", type_of_die: "d%", image_url: "dice_images/gears_d%.jpg")
Die.create(description: "Rainbow", type_of_die: "d12", image_url: "dice_images/rainbow_d12.jpg")
Die.create(description: "Watermelon Slice", type_of_die: "d12", image_url: "dice_images/watermelon_d12.jpg")
Die.create(description: "Opaque Orange", type_of_die: "d12", image_url: "dice_images/opaque_orange_d12.jpg")
Die.create(description: "Forest Leaves", type_of_die: "d20", image_url: "dice_images/forest_leaves_d20.jpg")
Die.create(description: "Violet Galaxy", type_of_die: "d20", image_url: "dice_images/violet_galaxy_d20.jpg")
Die.create(description: "Shimmering Ocean", type_of_die: "d20", image_url: "dice_images/ocean_d20.jpg")
Die.create(description: "Monopoly Dice", type_of_die: "2d6", image_url: "https://static.wikia.nocookie.net/monopoly/images/4/42/Speed_Die_-_Blue.jpg/revision/latest/smart/width/250/height/250?cb=20140108153044")

Die.all.each{ |d| d.create_values }



puts "Let's roll! 🎲"
