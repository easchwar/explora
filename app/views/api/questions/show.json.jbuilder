json.extract! @question, :id, :body, :author_id, :created_at, :updated_at

author_name = User.find(@question.author_id).username
json.author_name author_name

json.answers do
  json.array!(@question.answers.order(created_at: :asc)) do |answer|
    json.partial! 'api/answers/show', answer: answer
  end
end

json.tags do
  json.array!(@question.tags) do |tag|
    json.partial! 'api/tags/show', tag: tag
  end
end

json.related_questions do
  json.array!(@question.related_questions.limit(10).to_a.reverse!) do |related_question|
    json.partial! 'api/questions/show_simple', question: related_question
  end
end
