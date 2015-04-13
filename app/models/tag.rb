# == Schema Information
#
# Table name: tags
#
#  id         :integer          not null, primary key
#  tag_name   :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Tag < ActiveRecord::Base
  validates :tag_name, presence: true
  validates :tag_name, uniqueness: true

  has_many :taggings, dependent: :destroy
  has_many :tagged_questions, through: :taggings, source: :question

  has_many :received_subscriptions, class_name: 'Subscription', as: :subscribable

  has_many :subscribers,
  {
    through: :received_subscriptions,
    source: :user
  }

  def self.search_by_tag_name(query)
    where("lower(tag_name) like ?", "%#{query.downcase}%")
  end
end
