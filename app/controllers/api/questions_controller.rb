class Api::QuestionsController < ApplicationController
  wrap_parameters :question, include: [:tag_ids, :body]

  def feed
    subbed_user_questions = current_user.subscribed_user_questions
    subbed_tag_questions = current_user.subscribed_tag_questions.
      where.not(author_id: current_user.id)

    @questions = (subbed_user_questions.to_a + subbed_tag_questions.to_a).uniq

    @questions.sort! { |a,b| a.created_at <=> b.created_at }

    render json: @questions
  end

  def tagged
    @tag = Tag.find(params[:id])
    @questions = @tag.tagged_questions.order(created_at: :asc)
    @questions.to_a.reverse!

    render json: @questions
  end

  def index
    @questions = current_user.questions.order(created_at: :asc) #add a limit() for pagination
    # allows correct ordering once paginated
    # @questions.to_a.reverse!

    render json: @questions
  end

  def show
    @question = Question.find(params[:id])

    render :show
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
    params.require(:question).permit(:body, :tag_ids)
  end
end
