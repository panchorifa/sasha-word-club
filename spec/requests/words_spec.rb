require "spec_helper"
require "rails_helper"
require "json"

def headers(user_token='')
   {
     "Accept" => "application/json; version=1",
     "Content-Type" => "application/json"
    #  "Authorization" => "token",
    #  "User-Authorization" => user_token
   }
end

describe "words API" do
  describe "GET /words" do
    it "retrieves words" do
      w = Word.create(word:'abc', definition:'cde', part:'noun', audio_url:'x')
      get '/words', {}, headers('')
      expect(response.status).to eq 200
      words = (JSON.parse response.body)['words']
      expect(words.length).to eq 1
      expect(words[0]['word']).to eq w.word
      expect(words[0]['definition']).to eq w.definition
      expect(words[0]['audio_url']).to eq w.audio_url
      expect(words[0]['part']).to eq w.part
    end
  end
end
