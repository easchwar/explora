json.array! @questions do |question|
  json.extract! question, :id, :body, :author_id, :created_at, :updated_at

  json.top_answer do
      answer = question.answers.order(created_at: :desc).first
      if answer
        json.partial! 'api/answers/show', answer: answer
      else
        nil
      end
  end
end
