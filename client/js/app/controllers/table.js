angular.module('GoldPulse')
    .controller('TableCtrl', ['$scope', 'QuoteService', function($scope, QuoteService) {
        QuoteService.fetch('2013-01-04').then(function(data) {
            $scope.stocks = data.res;
            $scope.metrics = Object.keys(data.res[0].metrics);
            $scope.dates = data.res[0].dates.map(function(el) {
                return el.ymd;
            });
        });
    }]);