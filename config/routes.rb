# TODO
# Update controllers to match path - see video
# How do we update the channel name instead of channel id being used in route?


Rails.application.routes.draw do
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :channels, only: [] do
        resources :messages, only: [ :index, :create ]
      end
    end
  end

  resources :channels, only: [ :show ]
  root to: 'channels#show'
end
