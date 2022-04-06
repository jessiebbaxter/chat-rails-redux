require 'faker'

Message.destroy_all
User.destroy_all
Channel.destroy_all

ActiveRecord::Base.connection.tables.each do |t|
  ActiveRecord::Base.connection.reset_pk_sequence!(t)
end

names = %w(general paris react)
nicknames = %w(Papillard ssaunier monsieurpaillard krokrob Eschults JBBax)

channels = names.map do |name|
  Channel.find_or_create_by(name: name)
end

users = nicknames.map do |nickname|
  User.create(email: "#{nickname.downcase}@lewagon.com", nickname: nickname, password: "password")
end

20.times do
	message_content = Faker::ChuckNorris.fact
  Message.create! user: users.sample, channel: channels.sample, content: message_content
end

puts 'Channels:'
channels.each do |channel|
  puts "- #{channel.id}: #{channel.name}"
end