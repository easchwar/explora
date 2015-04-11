Rails.application.routes.draw do
  root 'static_pages#root'

  resources :users, only: [:new, :create]
  resource :session, only: [:new, :create, :destroy]

  namespace :api, defaults: { format: :json } do
    get 'questions/feed', to: 'questions#feed'
    resources :questions, only: [:index, :show, :create, :update, :destroy]
    resources :answers, only: [:show, :create, :destroy]
    resources :tags, only: [:index, :show, :create]
    resources :subscriptions, only: [:create, :destroy]
  end
end
