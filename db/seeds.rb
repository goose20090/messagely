3.times do 
  User.create(
    username: Faker::Name.name,
    password: 'abc',
    password_confirmation: 'abc',
    avatar_url: Faker::Avatar.image
  )
end

2.times do
  Conversation.create()
end

10.times do
  Message.create(
    user_id: User.all.sample.id,
    conversation_id: Conversation.all.sample.id,
    content: Faker::Lorem.sentence
  )
end
