'use strict';

angular.module('bee.services', [])
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
]);
