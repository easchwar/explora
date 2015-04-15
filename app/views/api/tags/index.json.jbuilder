json.array! @tags do |tag|
  json.extract! tag, :id, :tag_name, :created_at, :updated_at

  subscription = tag.received_subscriptions.find_by(user_id: @user_id)
  if subscription
    json.subscription do
      json.extract! subscription, :id, :subscribable_id, :subscribable_type
    end
  end
end
