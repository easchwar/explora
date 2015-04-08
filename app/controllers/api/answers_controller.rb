class Api::AnswersController < ApplicationController
  def create
    @answer = current_question.new(answer_params)

    @answer.author_id = current_user.id

    if @answer.save
      render json: @answer
    else
      render json: @answer.errors.full_messages, status: 422
    end
  end

  def destroy
    @answer = Answer.find(params[:id])
    @answer.try(:destroy)
    render json: {}
  end

  private

  def answer_params
    params.require(:answer).permit(:body)
  end
end
