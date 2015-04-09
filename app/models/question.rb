# == Schema Information
#
# Table name: questions
#
#  id         :integer          not null, primary key
#  body       :string           not null
#  author_id  :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Question < ActiveRecord::Base
  validates :body, :author_id, presence: true

  belongs_to :author, class_name: 'User'
  has_many :answers, dependent: :destroy
  has_many :taggings

  has_many :tags, through: :taggings, source: :tag
end
