json.extract! @question, :id, :body, :author_id, :created_at, :updated_at

json.answers do
  json.array!(@question.answers) do |answer|
    json.partial! 'api/answers/show', answer: answer
  end
end
