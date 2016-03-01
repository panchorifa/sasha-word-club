'use strict';

angular.module('bee.log', [])
.service('xlog', [//'config',
  function (config) {
    this.log = function(data) {
      // if(config.LOGS_ENABLED) {
      console.log(data);
      // }
    }
  }
]
);
