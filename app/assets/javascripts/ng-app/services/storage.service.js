'use strict';

angular.module('bee.storage', [])
.service('xstorage', ['$cookies',
  function ($cookies) {

      this.setX = function(x) { $cookies.putObject('xstuff', x); };
      this.x = function() { return $cookies.getObject('xstuff'); };

      this.getBee = function(x) {
        var bee = $cookies.getObject('xbee');
        if(!bee) {
          bee = {
            mode: 'study',
            practicing: undefined,
            roundLabels: [
              'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K',
              'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V',
              'W', 'X', 'Y', 'Z'].slice(0, x),
            round: 0,
            wordIdx: 0,
            level: 'A',
            scored: false,
            colors: ['#0a0a0a', '#141414','#1f1f1f','#292929','#333333','#3d3d3d','#474747','#525252','#5c5c5c','#666666','#707070','#7a7a7a']
          }
          $cookies.putObject('xbee', bee);
          $cookies.putObject('xvalues', new Array(x));
          $cookies.putObject('xchecks', new Array(x));
          $cookies.putObject('xcongrats', new Array(x));
        }
        return bee;
      }

      this.get = function(id) {
        return $cookies.get(id);
      };

      this.putObject = function(x, o) {
        $cookies.putObject(x, o);
      };

      this.getObject = function(x) {
        return $cookies.getObject(x);
      };

      this.clear = function() {
        var cookies = $cookies.getAll();
        angular.forEach(cookies, function (v, k) {
            $cookies.remove(k);
        });
      };
    }
  ]);
