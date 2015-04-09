User.destroy_all
Question.destroy_all
Tag.destroy_all
Tagging.destroy_all

f = Tag.create!(tag_name: 'food')
s = Tag.create!(tag_name: 'sports')
t = Tag.create!(tag_name: 'travel')
a = Tag.create!(tag_name: 'animals')


e = User.create!(username: 'eric', password: 'ericeric')
u = User.create!(username: 'user1', password: 'password')
u2 = User.create!(username: 'user2', password: 'password')


q1 = e.questions.create!(body: 'who?', tag_ids: [f.id, a.id, t.id])
q2 = e.questions.create!(body: 'what?', tag_ids: [a.id, s.id, t.id])
q3 = e.questions.create!(body: 'where?', tag_ids: [a.id])

u.questions.create!(body: 'user1 question1', tag_ids: [f.id, s.id, a.id])
u.questions.create!(body: 'user1 question2', tag_ids: [f.id, s.id, t.id])

q1.answers.create!(body: 'me', author_id: u.id)
q1.answers.create!(body: 'and you', author_id: u2.id)
q2.answers.create!(body: 'nothing', author_id: u.id)
