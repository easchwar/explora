User.destroy_all
Question.destroy_all


e = User.create!(username: 'eric', password: 'ericeric')
u = User.create!(username: 'user1', password: 'password')


e.questions.create!(body: 'who?')
e.questions.create!(body: 'what?')
e.questions.create!(body: 'where?')
e.questions.create!(body: 'when?')
e.questions.create!(body: 'why?')


u.questions.create!(body: 'user1 question')
