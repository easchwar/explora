class Api::AnswersController < ApplicationController
  def create
    @answer = current_question.answers.new(answer_params)

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

  def current_question
    if params[:id]
      @answer = Answer.find(params[:id])
      @question = @answer.question
    elsif params[:answer]
      @question = Question.find(params[:answer][:question_id])
    end
  end

  def answer_params
    params.require(:answer).permit(:body)
  end
end
