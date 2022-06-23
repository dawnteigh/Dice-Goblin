puts "Clearing the weeds..."
Die.destroy_all
Value.destroy_all

puts "Planting dice! 🌱"
Die.create(description: "Area 51", type_of_die: "d4", image_url: "https://res.cloudinary.com/dvgfrkxl7/image/upload/v1655842374/a51_d4_vdoddq.jpg")
Die.create(description: "Rainbow", type_of_die: "d4", image_url: "https://res.cloudinary.com/dvgfrkxl7/image/upload/v1655842375/rainbow_d4_dobpce.jpg")
Die.create(description: "Shimmering Ocean", type_of_die: "d4", image_url: "https://res.cloudinary.com/dvgfrkxl7/image/upload/v1655842374/ocean_d4_yiastz.jpg")
Die.create(description: "Turquoise Swirl", type_of_die: "d6", image_url: "https://res.cloudinary.com/dvgfrkxl7/image/upload/v1655842375/turquoise_d6_aaq85g.jpg")
Die.create(description: "Lavender Cream", type_of_die: "d6", image_url: "https://res.cloudinary.com/dvgfrkxl7/image/upload/v1655842374/lavender_d6_e8tgj4.jpg")
Die.create(description: "Glittering Embers", type_of_die: "d6", image_url: "https://res.cloudinary.com/dvgfrkxl7/image/upload/v1655842374/glittering_embers_d6_oig2w9.jpg")
Die.create(description: "Glittering Embers", type_of_die: "d8", image_url: "https://res.cloudinary.com/dvgfrkxl7/image/upload/v1655842374/glittering_embers_d8_hpu7at.jpg")
Die.create(description: "Masterpiece", type_of_die: "d8", image_url: "https://res.cloudinary.com/dvgfrkxl7/image/upload/v1655842374/masterpiece_d8_i4tumv.jpg")
Die.create(description: "Wildberry Speckled", type_of_die: "d8", image_url: "https://res.cloudinary.com/dvgfrkxl7/image/upload/v1655842375/wildberry_speckled_d8_u6mbum.jpg")
Die.create(description: "Forest Speckled", type_of_die: "d10", image_url: "https://res.cloudinary.com/dvgfrkxl7/image/upload/v1655842374/forest_speckled_d10_edr6wu.jpg")
Die.create(description: "Blue", type_of_die: "d10", image_url: "https://res.cloudinary.com/dvgfrkxl7/image/upload/v1655842374/blue_d10_lugteb.jpg")
Die.create(description: "Forest Leaves", type_of_die: "d10", image_url: "https://res.cloudinary.com/dvgfrkxl7/image/upload/v1655842375/forest_leaves_d10_qhkbvf.jpg")
Die.create(description: "Opaque Orange", type_of_die: "d%", image_url: "https://res.cloudinary.com/dvgfrkxl7/image/upload/v1655842375/opaque_orange_dp_ipmqlj.jpg")
Die.create(description: "Violet Galaxy", type_of_die: "d%", image_url: "https://res.cloudinary.com/dvgfrkxl7/image/upload/v1655842375/violet_galaxy_dp_qf4qpr.jpg")
Die.create(description: "Gears", type_of_die: "d%", image_url: "https://res.cloudinary.com/dvgfrkxl7/image/upload/v1655842374/gears_dp_e4jdwi.jpg")
Die.create(description: "Rainbow", type_of_die: "d12", image_url: "https://res.cloudinary.com/dvgfrkxl7/image/upload/v1655842375/rainbow_d12_mcod1v.jpg")
Die.create(description: "Watermelon Slice", type_of_die: "d12", image_url: "https://res.cloudinary.com/dvgfrkxl7/image/upload/v1655842375/watermelon_d12_okzmm0.jpg")
Die.create(description: "Opaque Orange", type_of_die: "d12", image_url: "https://res.cloudinary.com/dvgfrkxl7/image/upload/v1655842375/opaque_orange_d12_rmcyqq.jpg")
Die.create(description: "Forest Leaves", type_of_die: "d20", image_url: "https://res.cloudinary.com/dvgfrkxl7/image/upload/v1655842374/forest_leaves_d20_ghunl2.jpg")
Die.create(description: "Violet Galaxy", type_of_die: "d20", image_url: "https://res.cloudinary.com/dvgfrkxl7/image/upload/v1655842376/violet_galaxy_d20_y9wapr.jpg")
Die.create(description: "Shimmering Ocean", type_of_die: "d20", image_url: "https://res.cloudinary.com/dvgfrkxl7/image/upload/v1655842375/ocean_d20_kgfzzs.jpg")
Die.create(description: "Monopoly Dice", type_of_die: "2d6", image_url: "https://sphero-media-sphero-prod.s3.amazonaws.com/cwist/gallery/b5/99/851f158e-b599-4314-8792-5a4ddfe85026_1024_768.jpg?v=1653943573")

Die.all.each{ |d| d.create_values }



puts "Let's roll! 🎲"
