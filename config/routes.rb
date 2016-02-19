Rails.application.routes.draw do
  # ping
  get '/ping',  to: 'ping#index'
  root 'dashboard#index'
  get '*path' => 'dashboard#index'
end
