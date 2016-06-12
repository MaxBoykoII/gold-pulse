angular.module('GoldPulse')
    .directive('sliders', function(){
        return {
            scope: {},
            restrict: "E",
            templateUrl: "./templates/sliders.html",
            controller: 'SlidersCtrl'
        };
    })