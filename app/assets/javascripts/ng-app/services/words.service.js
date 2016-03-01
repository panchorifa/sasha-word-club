'use strict';

angular.module('bee.services', [])

.service('wordService', ['$q', '$state', '$location',
  function ($q, $state, $location) {

    this.getWords = function(okFn, errorFn) {
        xhttp.get('/words', okFn, errorFn);
    };

    this.getWordsAsync = function() {
      var defer = $q.defer();
      this.getWords(function(data){
        var all = data.data.words;
        var rounds = [];
        var limit = 25;
        for(var i=0;i<all.length/limit;i++){
          var x = i*limit;
          rounds[i] = all.slice(x, x+limit);
        }
        defer.resolve(rounds);
      });
      return defer.promise;
    };
  }
]);
