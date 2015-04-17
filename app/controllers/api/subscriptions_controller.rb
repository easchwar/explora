class Api::SubscriptionsController < ApplicationController
  wrap_parameters :subscription, include: [:user_id, :subscribable_id, :subscribable_type]

  def create
    @subscription = Subscription.new(subscription_params)

    if @subscription.save()
      render json: @subscription
    else
      render json: @subscription.errors.full_messages, status: 422
    end
  end

  def destroy
    @subscription = current_user.subscriptions.find(params[:id])
    @subscription.try(:destroy)
    render json: {}
  end

  private

  def subscription_params
    params.require(:subscription).permit(:user_id, :subscribable_id, :subscribable_type)
  end
end
