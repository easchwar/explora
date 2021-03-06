# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  username        :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

class User < ActiveRecord::Base
  attr_reader :password

  validates :username, :password_digest, :session_token, presence: true
  validates :username, :session_token, uniqueness: true
  validates :password, length: { minimum: 6, allow_nil: true }

  has_many :questions, foreign_key: :author_id, dependent: :destroy
  has_many :answers, foreign_key: :author_id, dependent: :destroy

  has_many :subscriptions
  has_many :received_subscriptions, class_name: 'Subscription', as: :subscribable

  has_many :subscribers,
  {
    through: :received_subscriptions,
    source: :user
  }

  has_many :subscribed_tags,
  {
    through: :subscriptions,
    source: :subscribable,
    source_type: 'Tag'
  }

  has_many :subscribed_tag_questions, -> { uniq },
  {
    through: :subscribed_tags,
    source: :tagged_questions,
    class_name: 'Question'
  }

  has_many :subscribed_users,
  {
    through: :subscriptions,
    source: :subscribable,
    source_type: 'User'
  }

  has_many :subscribed_user_questions, -> { uniq },
  {
    through: :subscribed_users,
    source: :questions,
  }

  after_initialize :ensure_session_token

  def self.generate_session_token
    token = SecureRandom.urlsafe_base64(16)

    while User.exists?(session_token: token)
      token = SecureRandom.urlsafe_base64(16)
    end

    token
  end

  def self.find_by_credentials(username, password)
    user = User.find_by_username(username)
    return nil if !user

    user.is_password?(password) ? user : nil
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def reset_session_token!
    self.session_token = User.generate_session_token
    self.save!
    self.session_token
  end

  private

  def ensure_session_token
    self.session_token ||= User.generate_session_token
  end
end
