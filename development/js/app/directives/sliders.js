angular.module('GoldPulse')
    .directive('sliders', function(){
        return {
            restrict: "E",
            templateUrl: "./templates/sliders.html",
            controller: 'SlidersCtrl'
        };
    })