# == Schema Information
#
# Table name: subscriptions
#
#  id                :integer          not null, primary key
#  user_id           :integer          not null
#  subscribable_id   :integer          not null
#  subscribable_type :string           not null
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#

class Subscription < ActiveRecord::Base
  validates :user_id, :subscribable_id, :subscribable_type, presence: true

  belongs_to :user
  belongs_to :subscribable, polymorphic: true
end
