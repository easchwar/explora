json.extract! answer, :id, :body, :author_id, :question_id, :created_at, :updated_at

author_name = User.find(answer.author_id).username
json.author_name author_name
