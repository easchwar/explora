class Api::TagsController < ApplicationController
  def index
    if params[:user_id]
      @user_id = params[:user_id]
      @tags = User.find(params[:user_id]).subscribed_tags.order(:tag_name)
    elsif params[:search]
      @tags = Tag.search_by_tag_name(params[:search]).limit(6)
    else
      @tags = Tag.all.order(created_at: :asc).limit(6)
    end

    render :index
  end

  def find
    @tag = Tag.find_by("lower(tag_name) like ?", params[:tag_name].downcase)

    if @tag
      render json: @tag
    else
      render json: {}, status: 422
    end
  end

  def show
    @tag = Tag.find(params[:id])
    render json: @tag
  end

  def create
    @tag = Tag.new(tag_params)

    if @tag.save
      render json: @tag
    else
      render json: @tag.errors.full_messages, status: 422
    end
  end

  private

  def tag_params
    params.require(:tag).permit(:tag_name)
  end
end
