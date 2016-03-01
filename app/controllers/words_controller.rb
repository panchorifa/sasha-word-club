class WordsController < ActionController::Base
  skip_before_action :authenticate
  respond_to :json

  def index
    @words = Word.order('id').all
  end
end
