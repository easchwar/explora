Rails.application.routes.draw do
  root 'users#index'
  resources :users, only: [:new, :create]
  resource :session, only: [:new, :create, :destroy]

  namespace :api do
    resources :questions, only: [:index, :create, :update, :destroy]
  end
end
