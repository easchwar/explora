# == Schema Information
#
# Table name: answers
#
#  id          :integer          not null, primary key
#  author_id   :integer          not null
#  body        :string           not null
#  question_id :integer          not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Answer < ActiveRecord::Base
  validates :author_id, :body, :question_id, presence: true

  belongs_to :question
  belongs_to :author, class_name: 'User'
end
