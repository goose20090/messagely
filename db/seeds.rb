# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
5.times do

  password = "abc"
  User.create!(
    username: Faker::Internet.username,
    password: password,
    password_confirmation: password,
    avatar_url: Faker::Internet.url
  )
end

# create 2 conversations
2.times do
  Conversation.create!
end

# create messages for each conversation
Conversation.all.each do |conversation|

  user_id_1 = User.all.sample.id
  user_id_2 = User.all.sample.id

  users = [user_id_1, user_id_2]
  # create 10 messages for each conversation
  5.times do

    Message.create!(
      content: Faker::Lorem.sentence,
      user_id: users.sample,
      conversation_id: conversation.id
    )
  end
end