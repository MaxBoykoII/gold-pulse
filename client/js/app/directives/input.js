angular.module('GoldPulse')
    .directive('dateInput', function(){
        return {
          restrict: 'E',
          templateUrl: '/templates/dateInput.html',
          controller: 'DateCtrl'
        };
    });