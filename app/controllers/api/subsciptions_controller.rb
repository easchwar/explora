class Api::SubsciptionsController < ApplicationController
  def create
    @subscription = current_user.subscriptions.new(subscription_params)

    if @subscription.save
      render json: @subscription
    else
      render json: @subscription.errors.full_messages, status: 422
    end
  end

  def destroy
    @subscription.find(params[:id])
    @subscription.try(:destroy)
    render json: {}
  end

  private

  def subscription_params
    params.require(:subscription).permit(:subscribable_id, :subscribable_type)
  end
end
