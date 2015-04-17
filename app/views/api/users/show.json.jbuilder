json.extract! @user, :id, :username, :created_at,:updated_at

json.question_count @user.questions.count
json.answer_count @user.answers.count
