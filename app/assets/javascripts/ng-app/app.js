angular.module('bee', [
    'ngAnimate',
    'ngSanitize',
		'ui.router',
		'templates'
])
.config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
  function($stateProvider, $urlRouterProvider, $locationProvider) {
  $stateProvider
    .state('app', {
        url: '/',
        templateUrl: 'app.html',
        controller: 'AppCtrl'
    })
    .state('words', {
        url: '/words',
        templateUrl: 'words.html',
        controller: 'WordsCtrl'
    });
  $urlRouterProvider.otherwise('/');
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });
}])
.controller('AppCtrl', ['$scope',
  function ($scope) {
  }
])
.controller('WordsCtrl', ['$scope', '$sce',
  function ($scope, $sce) {
    var AUDIO_URL = 'http://static.sfdict.com/staticrep/dictaudio/';
    var wordAudio = function(word, audio) {
      return {
        text: word,
        audio: $sce.trustAsResourceUrl(AUDIO_URL+audio)
      };
    };
    $scope.words = [
      wordAudio('mineral', 'M04/M0453800.mp3'),
      wordAudio('aloha',   'A03/A0344200.mp3'),
      wordAudio('coffee',  'C06/C0620300.mp3'),
      wordAudio('mustang', 'M07/M0708700.mp3'),
      wordAudio('parade',  'P00/P0089700.mp3'),
      wordAudio('kiwi',    'K01/K0134100.mp3'),
      wordAudio('eyebrow', 'E04/E0443100.mp3'),
      wordAudio('velcro',  'V00/V0061100.mp3'),
      wordAudio('random',  'R00/R0056000.mp3'),
      wordAudio('summary', 'S11/S1106500.mp3')
    ];
    $scope.checks = [];

    $scope.checkWord = function(text, value, idx) {
      $scope.checks[idx] = text === value? 1 : 0;
    };
  }
])
.directive('lowered', function() {
   return {
     require: 'ngModel',
     link: function(scope, element, attrs, modelCtrl) {
        var lower = function(inputValue) {
           if(inputValue == undefined) inputValue = '';
           var xlowered = inputValue.toLowerCase();
           if(xlowered !== inputValue) {
              modelCtrl.$setViewValue(xlowered);
              modelCtrl.$render();
            }
            return xlowered;
         }
         modelCtrl.$parsers.push(lower);
         lower(scope[attrs.ngModel]);
     }
   };
});