class DashboardController < ApplicationController
  skip_before_action :authenticate

  def index
    @words = [
      { word: 'mineral', audio:'http://static.sfdict.com/staticrep/dictaudio/M04/M0453800.mp3' },
      { word: 'aloha', audio:'http://static.sfdict.com/staticrep/dictaudio/A03/A0344200.mp3' },
      { word: 'coffee', audio:'http://static.sfdict.com/staticrep/dictaudio/C06/C0620300.mp3'},
      { word: 'mustang', audio:'http://static.sfdict.com/staticrep/dictaudio/M07/M0708700.mp3'},
      { word: 'parade', audio:'http://static.sfdict.com/staticrep/dictaudio/P00/P0089700.mp3'},
      { word: 'kiwi', audio:'http://static.sfdict.com/staticrep/dictaudio/K01/K0134100.mp3'},
      { word: 'eyebrow', audio:'http://static.sfdict.com/staticrep/dictaudio/E04/E0443100.mp3'},
      { word: 'velcro', audio:'http://static.sfdict.com/staticrep/dictaudio/V00/V0061100.mp3'},
      { word: 'random', audio:'http://static.sfdict.com/staticrep/dictaudio/R00/R0056000.mp3'},
      { word: 'summary', audio:'http://static.sfdict.com/staticrep/dictaudio/S11/S1106500.mp3'}
    ]
      # { word: '', audio:''},
      # { word: '', audio:''},
      # { word: '', audio:''},
  end
end
