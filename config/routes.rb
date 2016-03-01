Rails.application.routes.draw do
  # ping
  get '/ping',  to: 'ping#index'
  get '/words', to: 'words#index'
  root 'dashboard#index'
  get '*path' => 'dashboard#index'
end
