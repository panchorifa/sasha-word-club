'use strict';

angular.module('bee.storage', [])
.service('xstorage', ['$cookies',
  function ($cookies) {

      this.setX = function(x) { $cookies.putObject('xstuff', x); };
      this.x = function() { return $cookies.getObject('xstuff'); };

      this.get = function(id) {
        return $cookies.get(id);
      };

      this.clear = function() {
        var cookies = $cookies.getAll();
        angular.forEach(cookies, function (v, k) {
            $cookies.remove(k);
        });
      };
    }
  ]);
