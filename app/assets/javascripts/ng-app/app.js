angular.module('bee', [
    'ngAnimate',
    'ngSanitize',
    'ngTouch',
    'ngCookies',
		'ui.router',
		'templates',
    'bee.services',
    'bee.directives',
    'bee.storage'
])
.run(function() {
  FastClick.attach(document.body);
})
.config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
  function($stateProvider, $urlRouterProvider, $locationProvider) {
    $stateProvider
    .state('app', {
        url: '/',
        templateUrl: 'app.html',
        controller: 'AppCtrl'
    })
    .state('words', {
        url: '/bee',
        templateUrl: 'words.html',
        controller: 'WordsCtrl',
        resolve: { words: ['wordService', function(wordService) {
          return wordService.getWordsAsync();
        }]}
    });
  $urlRouterProvider.otherwise('/');
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });
}])
.controller('AppCtrl', ['$scope', '$window',
  function ($scope, $window) {
    var w = angular.element($window);
    $scope.getWindowSize = function() {
      return { 'h': w.height(), 'w': w.width() };
    };

    $scope.$watch($scope.getWindowSize, function(newValue) {
      $scope.windowHeight = newValue.h;
      $scope.windowWidth = newValue.w;
    }, true);

    w.bind('resize', function() { $scope.$apply(); });
  }
])
.controller('WordsCtrl', ['$scope', '$sce', 'focus', '$window',
  '$timeout', 'xscroll', '$state', 'words', 'xstorage',
  function ($scope, $sce, focus, $window, $timeout, xscroll,
            $state, words, xstorage) {

    var w = angular.element($window);
    $scope.getWindowSize = function() {
      return { 'h': w.height(), 'w': w.width() };
    };
    $scope.$watch($scope.getWindowSize, function(newValue) {
      $scope.windowHeight = newValue.h;
      $scope.windowWidth = newValue.w;
    }, true);
    w.bind('resize', function() { $scope.$apply(); });

    var AUDIO_URL = 'http://static.sfdict.com/staticrep/dictaudio/';

    $scope.audio = function(audio_path) {
      return $sce.trustAsResourceUrl(AUDIO_URL+audio_path);
    };

    $scope.updated = function(idx) {
      if($scope.checks[idx] == false) {
        $scope.checks[idx] = undefined;
      }
    }

    function randomWords(arr, count) {
        var shuffled = arr.slice(0), i = arr.length, min = i - count, temp, index;
        while (i-- > min) {
            index = Math.floor((i + 1) * Math.random());
            temp = shuffled[index];
            shuffled[index] = shuffled[i];
            shuffled[i] = temp;
        }
        return shuffled.slice(min);
    };

    $scope.simon = function(mode, idx) {
      $scope.bee.mode = mode;
      $scope.bee.wordIdx = idx || 0;
      if(mode === 'practice') {
        $scope.words = $scope.rounds[$scope.bee.round];
        $scope.values[idx] = '';
        focus('spelling'+ $scope.bee.wordIdx);
        setTimeout(function(){
          angular.element(document.getElementById('audio-player'+ $scope.bee.wordIdx).play());
        }, 1000);
      } else if (mode === 'study'){
        $scope.words = $scope.rounds[$scope.bee.round];
        $scope.bee.practicing = idx;
        xscroll('xword'+idx);
      } else if (mode === 'test'){
        $scope.testWords = randomWords($scope.words, 10);
        focus('spelling0');
        setTimeout(function(){
          angular.element(document.getElementById('audio-player0').play());
        }, 1000);
      }
      xstorage.putObject('xbee', $scope.bee);
    }

    $scope.bee = xstorage.getBee(words.length);
    $scope.rounds = words;
    $scope.words = $scope.rounds[$scope.bee.round];
    $scope.values = xstorage.getObject('xvalues');
    $scope.checks = xstorage.getObject('xchecks');
    $scope.congrats = xstorage.getObject('xcongrats');
    if($scope.bee.mode !== 'study') {
      $scope.simon($scope.bee.mode, $scope.bee.wordIdx);
    }

    $scope.xcongrats = function() {
      return $scope.congrats[$scope.bee.round]===true;
    };

    $scope.xcolor = function(idx) {
      if ($scope.bee.scored) {
        if($scope.testWords.map(function(x){return x.word;})[idx] === document.getElementById('spelling'+idx).value) {
          return '#10b12a';
        } else {
          return '#df2602';
        }
      } else {
        return $scope.bee.colors[idx];
      }
    };

    $scope.checkWord = function(text, value, idx) {
      var x = text === value ? 1 : 0;
      $scope.checks[idx] = x;
      $scope.values[idx] = value;
      xstorage.putObject('xchecks', $scope.checks);
      xstorage.putObject('xvalues', $scope.values);
      var expected = $scope.checks.length;
      var actual = $scope.checks.filter(function(x){return x===1}).length;
      if(expected === actual) {
        $scope.allwords = $scope.words.map(function(x){return x.word;}).join(', ');
        $scope.congrats[$scope.bee.round] = true;
        xstorage.putObject('xcongrats', $scope.congrats);
        $scope.bee.mode = 'congrats';
        angular.element(document.getElementById('success').play());
      } else {
        if(x === 1) {
          angular.element(document.getElementById('ding').play());
          $scope.bee.wordIdx=idx+1;
          setTimeout(function(){
            focus('spelling'+$scope.bee.wordIdx);
            setTimeout(function(){
              angular.element(document.getElementById('audio-player'+ $scope.bee.wordIdx).play());
            },1000);
          }, 1000);
        } else {
          angular.element(document.getElementById('buzzer').play());
          focus('spelling'+idx);
        }
      }
      xstorage.putObject('xbee', $scope.bee);
    };

    $scope.testWord = function(idx) {
      var testIdx = idx + 1;
      if(testIdx < $scope.testWords.length) {
        focus('spelling' + testIdx);
        $scope.play(testIdx);
      }
    };

    $scope.score = function() {
      var values = []
      for(var i=0;i<$scope.testWords.length;i++) {
        values.push(document.getElementById('spelling'+i).value);
      }

      var expected = $scope.testWords.map(function(x){return x.word;});
      var errors = 0;
      for(var i=0;i<expected.length;i++) {
        if(values[i] !== expected[i]) {
          errors += 1;
        }
      }
      $scope.bee.score = 10 * (10 - errors);
      if($scope.bee.score === 100) {
        angular.element(document.getElementById('fanfarrias').play());
      }
    };

    $scope.up = function() {
      // focus('take-test');
      $window.scrollTo(0, 0);
      // $state.reload();
    };

    $scope.loadRound = function(idx) {
      $scope.words = $scope.rounds[idx];
      $scope.checks = new Array($scope.words.length);
      $scope.values = new Array($scope.words.length);
      $scope.bee.mode='study';
      $scope.bee.round = idx;
      $scope.bee.level = $scope.bee.roundLabels[idx];
      xstorage.putObject('xbee', $scope.bee);
      xstorage.putObject('xvalues', $scope.checks);
      xstorage.putObject('xchecks', $scope.values);
    };

    $scope.play = function(idx) {
      angular.element(document.getElementById('audio-player'+idx).play());
    }
  }
]);
