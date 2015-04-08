class Api::TagsController < ApplicationController
  def index
    @tags = Tag.all
    render json: @tags
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
