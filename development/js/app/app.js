angular.module("GoldPulse", ['ngRoute', 'ngMaterial', 'ngMessages', 'material.svgAssetsCache'])
    .config($routeProvider => {
        $routeProvider.when('/', {
                templateUrl: './templates/pages/main/index.html'
            })
            .when('/sliders', {
                templateUrl: './templates/pages/sliders/index.html'
            })
            .otherwise({
                redirectTo: '/'
            });
    });