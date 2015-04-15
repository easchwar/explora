json.array! @tags do |tag|
  json.extract! tag, :id, :tag_name, :created_at, :updated_at

  json.subscription do
    subscription = @tag.received_subscriptions.find_by(user_id: @user_id)
    json.extract! subscription, :id, :subscribable_id, :subscribable_type
  end
end
