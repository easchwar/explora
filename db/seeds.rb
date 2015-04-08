User.destroy_all
Question.destroy_all
Tag.destroy_all

Tag.create!(tag_name: 'food')
Tag.create!(tag_name: 'sports')
Tag.create!(tag_name: 'travel')
Tag.create!(tag_name: 'animals')


e = User.create!(username: 'eric', password: 'ericeric')
u = User.create!(username: 'user1', password: 'password')
u2 = User.create!(username: 'user2', password: 'password')


q1 = e.questions.create!(body: 'who?')
q2 = e.questions.create!(body: 'what?')
q3 = e.questions.create!(body: 'where?')

u.questions.create!(body: 'user1 question1')
u.questions.create!(body: 'user1 question2')

q1.answers.create!(body: 'me', author_id: u.id)
q1.answers.create!(body: 'and you', author_id: u2.id)
q2.answers.create!(body: 'nothing', author_id: u.id)
