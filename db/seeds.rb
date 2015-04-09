User.destroy_all
Question.destroy_all
Tag.destroy_all
Tagging.destroy_all
Subscription.destroy_all

# Tags
f = Tag.create!(tag_name: 'food')
s = Tag.create!(tag_name: 'sports')
t = Tag.create!(tag_name: 'travel')
a = Tag.create!(tag_name: 'animals')

# Users
e = User.create!(username: 'eric', password: 'ericeric')
u = User.create!(username: 'user1', password: 'password')
u2 = User.create!(username: 'user2', password: 'password')

# Subscriptions
Subscription.create!(user_id: e.id, subscribable_id: f.id, subscribable_type: 'Tag')
Subscription.create!(user_id: e.id, subscribable_id: s.id, subscribable_type: 'Tag')
Subscription.create!(user_id: e.id, subscribable_id: a.id, subscribable_type: 'Tag')
Subscription.create!(user_id: e.id, subscribable_id: u.id, subscribable_type: 'User')

# Questions
q1 = e.questions.create!(body: 'who?', tag_ids: [f.id, a.id, t.id])
q2 = e.questions.create!(body: 'what?', tag_ids: [a.id, s.id, t.id])
q3 = e.questions.create!(body: 'where?', tag_ids: [a.id])

u.questions.create!(body: 'user1 question1', tag_ids: [f.id, s.id, a.id])
u.questions.create!(body: 'user1 question2', tag_ids: [f.id, s.id, t.id])
u2.questions.create!(body: 'user2 q1 Not in feed', tag_ids: [t.id])
u2.questions.create!(body: 'user2 q2 Not in feed', tag_ids: [t.id])
u2.questions.create!(body: 'user2 q3 in feed because of tag', tag_ids: [f.id, s.id, t.id])

# Answers
q1.answers.create!(body: 'me', author_id: u.id)
q1.answers.create!(body: 'and you', author_id: u2.id)
q2.answers.create!(body: 'nothing', author_id: u.id)
