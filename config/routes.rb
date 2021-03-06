Rails.application.routes.draw do
  namespace :api do
  get 'users/show'
  end

  root 'static_pages#root'

  resources :users, only: [:new, :create]
  resource :session, only: [:new, :create, :destroy]

  namespace :api, defaults: { format: :json } do
    get 'questions/feed', to: 'questions#feed'
    get 'tags/find', to: 'tags#find'
    resources :users, only: [:show]
    resources :questions, only: [:index, :show, :create, :update, :destroy]
    resources :answers, only: [:show, :create, :destroy]
    resources :tags, only: [:index, :show, :create]
    resources :subscriptions, only: [:create, :destroy]
  end
end
