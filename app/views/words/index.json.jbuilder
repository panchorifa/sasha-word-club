json.words do
  json.array! @words do |w|
    json.partial! 'words/word', word: w
  end
end
