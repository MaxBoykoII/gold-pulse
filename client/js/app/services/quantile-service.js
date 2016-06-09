'use strict';

angular.module("GoldPulse").service('QuantileService', [function () {
    function percentRank(arr, v) {
        if (typeof v !== 'number') {
            throw new TypeError('v must be a number');
        }

        for (var i = 0, l = arr.length; i < l; i++) {
            if (v <= arr[i]) {
                while (i < l && v === arr[i]) {
                    i++;
                }if (i === 0) return 0;
                if (v !== arr[i - 1]) {
                    i += (v - arr[i - 1]) / (arr[i] - arr[i - 1]);
                }
                return i / l;
            }
        }
        return 1;
    }

    var dataByMetric = {};

    this.setDataByMetric = function (stocks) {
        var metrics = Object.keys(stocks[0].metrics);
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = metrics[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var metric = _step.value;

                var data = [];

                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                    for (var _iterator2 = stocks[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                        var stock = _step2.value;

                        var val = stock.metrics[metric];
                        if (!isNaN(val)) {
                            data.push(val);
                        }
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

                if (data.length) {
                    data.sort(function (a, b) {
                        return a - b;
                    });
                }
                dataByMetric[metric] = data;
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

        return dataByMetric;
    };

    this.quantileByMetric = function (stock, metric) {
        var data = dataByMetric[metric];
        return percentRank(data, stock.metrics[metric]);
    };
}]);
//# sourceMappingURL=quantile-service.js.map