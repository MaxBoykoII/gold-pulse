angular.module('GoldPulse')
    .controller('TableCtrl', ['$scope', 'QuoteService', function($scope, QuoteService) {

        $scope.generate = function(m) {
            QuoteService.fetch(m).then(function(data) {
                $scope.stocks = data.res;
                $scope.metrics = Object.keys(data.res[0].metrics);
                $scope.dates = data.res[0].dates.map(function(el) {
                    return el.ymd;
                });
            });
        };

        $scope.generate('2013-01-04');
    }]);