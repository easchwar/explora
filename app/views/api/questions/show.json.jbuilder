json.extract! @question, :id, :body, :author_id, :created_at, :updated_at

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
