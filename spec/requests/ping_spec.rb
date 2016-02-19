require "spec_helper"
require "rails_helper"
require "json"

describe "ping API" do
  describe "GET /ping" do
    it "pings the api" do
      get "/ping", {}, headers
      expect(response.status).to eq 200
      expect(response.body).to eq "\"pong\""
    end
  end
end
