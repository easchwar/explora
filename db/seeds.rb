User.destroy_all
Question.destroy_all
Tag.destroy_all
Tagging.destroy_all
Subscription.destroy_all



# Tags
# f = Tag.create!(tag_name: 'Food')
# s = Tag.create!(tag_name: 'Sports')
# t = Tag.create!(tag_name: 'Travel')
a = Tag.create!(tag_name: 'Lifestyles')
ex = Tag.create!(tag_name: 'Explora')

contents = File.readlines("config/seed_data/topic_names.txt")
contents.each do |topic|
  Tag.create!(tag_name: topic.strip)
end

f = Tag.find_by_tag_name('Food')
s = Tag.find_by_tag_name('Sports')
t = Tag.find_by_tag_name('Travel')

t_id_first = Tag.first.id
t_id_last = Tag.last.id

# Users
e = User.create!(username: 'eric', password: 'ericeric')
g = User.create!(username: 'ExploraNinja', password: 'exploraninja')
u = User.create!(username: 'user1', password: 'password')
u2 = User.create!(username: 'user2', password: 'password')

20.times do
  User.create!(username: Faker::Name.name, password: 'pw_faker')
end

u_id_first = User.first.id
u_id_last = User.last.id

# Subscriptions
Subscription.create!(user_id: e.id, subscribable_id: f.id, subscribable_type: 'Tag')
Subscription.create!(user_id: e.id, subscribable_id: s.id, subscribable_type: 'Tag')
Subscription.create!(user_id: e.id, subscribable_id: a.id, subscribable_type: 'Tag')
Subscription.create!(user_id: e.id, subscribable_id: u.id, subscribable_type: 'User')
Subscription.create!(user_id: u.id, subscribable_id: e.id, subscribable_type: 'User')
Subscription.create!(user_id: g.id, subscribable_id: e.id, subscribable_type: 'User')
Subscription.create!(user_id: g.id, subscribable_id: u.id, subscribable_type: 'User')
Subscription.create!(user_id: g.id, subscribable_id: f.id, subscribable_type: 'Tag')
Subscription.create!(user_id: g.id, subscribable_id: s.id, subscribable_type: 'Tag')

# Questions
u.questions.create!(body: 'user1 question1', tag_ids: [f.id, s.id, a.id])
u.questions.create!(body: 'user1 question2', tag_ids: [f.id, s.id, t.id])

q1 = e.questions.create!(body: "Why can't everybody know what's good?",
                         tag_ids: [a.id])
q2 = e.questions.create!(body: "Who knows the best place to buy Indiana Jones hats?",
                         tag_ids: [s.id, t.id])
q3 = e.questions.create!(body: "This entry is intentionally extremely long to see how the css handles really long questions in the question index item view on the dashboard_show. It should wrap nicely and not overflow into any adjacent entries...?",
                         tag_ids: [ex.id])

q4 = u2.questions.create!(body: 'How do you subscribe to other users?', tag_ids: [t.id])
q5 = u2.questions.create!(body: "Who is the best quarterback of all time?", tag_ids: [s.id])
q6 = u2.questions.create!(body: 'How many licks does it take to get to the center of a tootsie pop?', tag_ids: [f.id])

100.times do
  num_tags = rand(2..5)
  tag_ids = []
  num_tags.times do
    tag_ids << rand(t_id_first..t_id_last)
  end
  Question.create!(body: Faker::Lorem.sentence[0...-1] + '?',
                   author_id: rand(u_id_first..u_id_last),
                   tag_ids: tag_ids)
end

q_id_first = Question.first.id
q_id_last = Question.last.id

# Answers
q1.answers.create!(body: 'No one really knows', author_id: u.id)
q1.answers.create!(body: "I'm pretty sure the lyrics are 'Walk in everybody knows what's good'", author_id: u2.id)
q2.answers.create!(body: "You'll have to ask Indy", author_id: u.id)
q5.answers.create!(body: 'Tom Brady, of course.', author_id: u.id)
q4.answers.create!(body: "lol you can't", author_id: u.id)
q6.answers.create!(body: "http://journals.cambridge.org/action/displayAbstract?fromPage=online&aid=9533822&fileId=S0022112014007186", author_id: u.id)

100.times do
  Answer.create!(body: Faker::Lorem.paragraph,
                 author_id: rand(u_id_first..u_id_last),
                 question_id: rand(q_id_first..q_id_last))
  if rand(1..3) == 1
    Answer.create!(body: "The key is " + Faker::Company.catch_phrase.downcase + '.',
                   author_id: rand(u_id_first..u_id_last),
                   question_id: rand(q_id_first..q_id_last))
  end
end
