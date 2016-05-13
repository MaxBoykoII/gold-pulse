angular.module('GoldPulse')
    .controller('TableCtrl', ['$scope', 'QuoteService', 'ColoringService', function($scope, QuoteService, ColoringService) {

        $scope.generate = function(m) {
            QuoteService.fetch(m).then(function(data) {
                $scope.stocks = data.res;
                $scope.metrics = Object.keys(data.res[0].metrics);
                $scope.dates = data.res[0].dates.map(function(el) {
                    return el.ymd;
                });
                $scope.limit = 25;
                $scope.selection = 'au1k';
                $scope.mode = 'test';
                $scope.set = function(selection) {
                    $scope.selection = selection;
                    $scope.mode = ($scope.metrics.indexOf(selection) !== -1) ? 'test' : 'train';
                };
                $scope.sort = function(stock) {
                    let selection = $scope.selection;
                    if ($scope.metrics.indexOf(selection) !== -1) {
                        return stock.metrics[selection] * -1;
                    }
                    else {
                        return parseFloat(stock.dates.find((el) => el.ymd === selection).change) * -1;
                    }
                };
            });
        };

        $scope.colorByDate = ColoringService.colorByDate;
        $scope.colorByMetric = ColoringService.colorByMetric;

        $scope.generate('2013-01-04');
    }]);