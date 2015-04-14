class Api::SubscriptionsController < ApplicationController
  wrap_parameters :abc, include: [:user_id, :subscribable_id, :subscribable_type]

  def create
    @subscription = Subscription.new(subscription_params)

    if @subscription.save()
      render json: @subscription
    else
      render json: @subscription.errors.full_messages, status: 422
    end
  end

  def destroy
    @subscription = Subscription.find(params[:id])
    @subscription.try(:destroy)
    render json: {}
  end

  private

  def subscription_params
    params.require(:abc).permit(:user_id, :subscribable_id, :subscribable_type)
  end
end
