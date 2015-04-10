class SessionsController < ApplicationController
  before_action :require_not_signed_in, only: [:new, :create]

  def new
    @user = User.new()
    render :new
  end

  def create
    @user = User.find_by_credentials(params[:user][:username], params[:user][:password])

    if @user
      sign_in!
      redirect_to root_url
    else
      @user = User.new(username: params[:user][:username])
      flash.now[:errors] = ['Invalid Login']
      render :new
    end
  end

  def destroy
    @user = current_user
    if @user
      @user.reset_session_token!
    end
    session[:session_token] = nil
    render json: {message: "session terminated"}
  end
end
