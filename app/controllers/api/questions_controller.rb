class Api::QuestionsController < ApplicationController
  def index
    @questions = Question.all
    render json: @questions
  end

  def show
    @question = Question.find(params[:id])

    render json: @question
  end

  def create
    @question = current_user.questions.new(question_params)

    if @question.save
      render json: @question
    else
      render json: @question.errors.full_messages, status: 422
    end
  end

  def destroy
    @question = Question.find(params[:id])
    @question.try(:destroy)
    render json: {}
  end

  private

  def question_params
    params.require(:question).permit(:body)
  end
end
