'use strict';

angular.module("GoldPulse", ['ngRoute', 'ngMaterial', 'ngMessages', 'material.svgAssetsCache']).config(function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: './templates/pages/main/index.html'
    }).when('/sliders', {
        templateUrl: './templates/pages/sliders/index.html'
    }).otherwise({
        redirectTo: '/'
    });
});
//# sourceMappingURL=app.js.map