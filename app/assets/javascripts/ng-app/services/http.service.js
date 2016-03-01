'use strict';

angular.module('bee.http', ['bee.storage', 'bee.log'])
.service('xhttp', ['$http', '$location', 'xstorage', 'xlog',
  function ($http, $location, xstorage, xlog) {
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
      xlog.log('xxxx--------------------------------->');
      xlog.log(xurl);
      xlog.log('xxxx--------------------------------->');
      $http({
        method: xmethod,
        url: xurl,
        headers: xheaders,
        data: xdata
      }).then(
        function successCallback(data) {
          console.log(data);
          okFn(data);
        },
        function errorCallback(err) {
          xlog.log('ERROR===================================');
          xlog.log(err);
          xlog.log('========================================');
          if (errorFn) { errorFn(err); }
        }
      );
    }

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
]);
