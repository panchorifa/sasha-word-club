'use strict';

angular.module('bee.directives', [])
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
