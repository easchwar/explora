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

require 'test_helper'

class SubscriptionTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
