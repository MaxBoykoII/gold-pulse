'use strict';

angular.module('GoldPulse').controller('TableCtrl', ['$scope', 'QuoteService', 'ColoringService', 'QuantileService', function ($scope, QuoteService, ColoringService, QuantileService) {

    $scope.limit = 25;
    $scope.selection = 'auV';
    $scope.mode = 'test';
    $scope.tooltips = {
        'auV': "number of ounces of gold per dollar invested",
        'au_oz': "sum (in millions of ounces) of all proven, probable, measured, indicated and inferred gold ounces across all company projects",
        'mcap': 'market cap in millions of dollars',
        'grd': 'average gold grade, in grams per tonne, across all company projects and all resource classificiations',
        'price': 'closing price in CAD from TSX/TSXv'
    };
    $scope.set = function (selection) {
        $scope.selection = selection;
        var isMetric = $scope.metrics.find(function (metric) {
            return metric === selection;
        });
        console.log(isMetric);
        if (isMetric) {
            $scope.mode == 'test';
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = $scope.metrics[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var metric = _step.value;

                    if (metric === isMetric) {
                        $scope.weightings[metric] = 100;
                    } else {
                        $scope.weightings[metric] = 0;
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            console.log($scope.weightings);
        } else {
            $scope.mode = 'train';
        }
    };
    $scope.sort = function (stock) {
        var selection = $scope.selection;
        if (selection === 'name') {
            return stock.name;
        } else if (selection === 'ticker') {
            return stock.ticker;
        } else if ($scope.mode === 'train') {
            return parseFloat(stock.dates.find(function (el) {
                return el.ymd === $scope.dates[selection];
            }).change) * -1;
        } else {
            var weightedSum = 0;
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = $scope.metrics[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var metric = _step2.value;

                    weightedSum += -1 * QuantileService.quantileByMetric(stock, metric) * $scope.weightings[metric];
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }

            return weightedSum;
        }
    };

    $scope.generate = function (m) {
        QuoteService.fetch(m).then(function (data) {
            $scope.stocks = data.res;
            $scope.stocks_length = $scope.stocks.length;
            $scope.metrics = Object.keys(data.res[0].metrics);
            $scope.dates = data.res[0].dates.map(function (el) {
                return el.ymd;
            });
            if ($scope.limit !== 25 && $scope.limit !== 50) {
                $scope.limit = $scope.stocks_length;
            }
            if (!isNaN($scope.selection) && $scope.selection >= $scope.dates.length) {
                if (!$scope.dates.length) {
                    $scope.selection = 'auV';
                } else {
                    $scope.selection = $scope.dates.length - 1;
                }
            }
        });
    };

    $scope.colorByDate = ColoringService.colorByDate;
    $scope.colorByMetric = ColoringService.colorByMetric;

    $scope.generate('2013-01-04');
}]);
//# sourceMappingURL=table.js.map