angular.module('bee', [
    'ngAnimate',
    'ngSanitize',
    'ngTouch',
		'ui.router',
		'templates'
])
.run(function() {
  FastClick.attach(document.body);
})
.service('xhttp', ['$http', '$location',
  function ($http, $location) {
    var headers = function(user_token) {
      var xheaders = {
        'Content-Type': 'application/json; charset=utf-8',
        'Accept': 'application/json'
        // 'Authorization': config.API_TOKEN
      };
      // if(user_token != undefined) {
      //   xheaders['User-Authorization'] = user_token;
      // }
      return xheaders;
    };

    var xreq = function(xmethod, xurl, xdata, okFn, errorFn) {
      var xheaders = headers('');
      $http({
        method: xmethod,
        url: xurl,
        headers: xheaders,
        data: xdata
      }).then(
        function successCallback(data) {
          okFn(data);
        },
        function errorCallback(err) {
          console.log('ERROR===================================');
          console.log(err);
          console.log('========================================');
          if (errorFn) { errorFn(err); }
        }
      );
    };

    this.post = function(url, data, okFn, errorFn) {
      xreq('POST', url, data, okFn, errorFn);
    };

    this.get = function(url, okFn, errorFn) {
      xreq('GET', url, {}, okFn, errorFn);
    };

    this.xget = function(o, okFn, errorFn) {
      if (o === undefined) { $location.path('/'); }
      xreq('GET', o.url, {}, okFn, errorFn);
    };

    this.put = function(url, data, okFn, errorFn) {
      xreq('PUT', url, data, okFn, errorFn);
    };

    this.delete = function(url, okFn, errorFn) {
      xreq('DELETE', url, {}, okFn, errorFn);
    };
  }
])
.service('wordService', ['$q', '$state', 'xhttp',
  function ($q, $state, xhttp) {

    this.getWords = function(okFn, errorFn) {
      xhttp.get('/words', okFn, errorFn);
    };

    this.getWordsAsync = function() {
      var defer = $q.defer();
      this.getWords(function(data){
        var all = data.data.words;
        var rounds = [];
        var limit = 25;
        for(var i=0;i<all.length/limit;i++) {
          var x = i*limit;
          rounds[i] = all.slice(x, x+limit);
        }
        defer.resolve(rounds);
      });
      return defer.promise;
    };
  }
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
        url: '/bee',
        templateUrl: 'words.html',
        controller: 'WordsCtrl',
        resolve: { words: ['wordService', function(wordService) {
          console.log(wordService);
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
  '$timeout', 'xscroll', '$state', 'words',
  function ($scope, $sce, focus, $window, $timeout, xscroll, $state, words) {
    console.log(words);
    var AUDIO_URL = 'http://static.sfdict.com/staticrep/dictaudio/';

    $scope.audio = function(audio_path) {
      return $sce.trustAsResourceUrl(AUDIO_URL+audio_path);
    };

    $scope.updated = function(idx) {
      if($scope.checks[idx] == false) {
        $scope.checks[idx] = undefined;
      }
    }

    var w = angular.element($window);
    $scope.getWindowSize = function() {
      return { 'h': w.height(), 'w': w.width() };
    };
    $scope.$watch($scope.getWindowSize, function(newValue) {
      $scope.windowHeight = newValue.h;
      $scope.windowWidth = newValue.w;
    }, true);

    w.bind('resize', function() { $scope.$apply(); });

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
        $scope.words = $scope.bee.rounds[$scope.bee.round];
        $scope.values[idx] = '';
        focus('spelling'+ $scope.bee.wordIdx);
        setTimeout(function(){
          angular.element(document.getElementById('audio-player'+ $scope.bee.wordIdx).play());
        }, 1000);
      } else if (mode === 'study'){
        $scope.words = $scope.bee.rounds[$scope.bee.round];
        $scope.bee.practicing = idx;
        xscroll('xword'+idx);
      } else if (mode === 'test'){
        $scope.testWords = randomWords($scope.words, 10);
        focus('spelling0');
        setTimeout(function(){
          angular.element(document.getElementById('audio-player0').play());
        }, 1000);
      }
    }

    $scope.bee = {
      mode: 'study',
      practicing: undefined,
      roundLabels: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R'].slice(0, words.length),
      rounds: words,
      round: 0,
      wordIdx: 0,
      level: 'A',
      scored: false,
      colors: ['#0a0a0a', '#141414','#1f1f1f','#292929','#333333','#3d3d3d','#474747','#525252','#5c5c5c','#666666','#707070','#7a7a7a']
    };

    $scope.words = $scope.bee.rounds[$scope.bee.round];
    $scope.values = new Array($scope.words.length);
    $scope.checks = new Array($scope.words.length);
    $scope.congrats = new Array($scope.bee.rounds.length);

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
      var x = text === value? 1 : 0;
      $scope.checks[idx] = x;
      $scope.values[idx] = value;
      var expected = $scope.checks.length;
      var actual = $scope.checks.filter(function(x){return x===1}).length;
      if(expected === actual) {
        $scope.allwords = $scope.words.map(function(x){return x.word;}).join(', ');
        $scope.congrats[$scope.bee.round] = true;
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
      // $window.scrollTo(0, 0);
      $state.reload();
    };

    $scope.loadRound = function(idx) {
      $scope.words = $scope.bee.rounds[idx];
      $scope.checks = new Array($scope.words.length);
      $scope.values = new Array($scope.words.length);
      $scope.bee.mode='study';
      $scope.bee.round = idx;
      $scope.bee.level = $scope.bee.roundLabels[idx];
    };

    $scope.play = function(idx) {
      angular.element(document.getElementById('audio-player'+idx).play());
    }
  }
])
.factory('focus', function($timeout, $window) {
    return function(id) {
      // timeout makes sure that it is invoked after any other event has been triggered.
      // e.g. click events that need to run before the focus or
      // inputs elements that are in a disabled state but are enabled when those events
      // are triggered.
      $timeout(function() {
        var element = $window.document.getElementById(id);
        if(element) {
          element.focus();
        }
      });
    };
})
.factory('xscroll', function($timeout, $window) {
    return function(id) {
      $timeout(function() {
        var element = $window.document.getElementById(id);
        if(element) {
          $window.scrollTo(0, element.offsetTop-30);
        }
      });
    };
})
.directive('eventFocus', function(focus) {
   return function(scope, elem, attr) {
     elem.on(attr.eventFocus, function() {
       focus(attr.eventFocusId);
     });

     // Removes bound events in the element itself
     // when the scope is destroyed
     scope.$on('$destroy', function() {
       elem.off(attr.eventFocus);
     });
   };
})
.directive('myEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.myEnter);
                });

                event.preventDefault();
            }
        });
    };
})
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
})
.directive('focusMe', function($timeout, $parse) {
  return {
    //scope: true,   // optionally create a child scope
    link: function(scope, element, attrs) {
      var model = $parse(attrs.focusMe);
      scope.$watch(model, function(value) {
        if(value === true) {
          $timeout(function() {
            element[0].focus();
          });
        }
      });
      // to address @blesh's comment, set attribute value to 'false'
      // on blur event:
      element.bind('blur', function() {
         scope.$apply(model.assign(scope, false));
      });
    }
  };
});
