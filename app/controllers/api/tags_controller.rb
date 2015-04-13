class Api::TagsController < ApplicationController
  def index
    if params[:user_id]
      @tags = User.find(params[:user_id]).subscribed_tags
    elsif params[:search]
      @tags = Tag.search_by_tag_name(params[:search])
    else
      @tags = Tag.all
    end

    render json: @tags
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
