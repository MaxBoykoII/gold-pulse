angular.module("GoldPulse")
    .service('QuantileService', [function() {
        function percentRank(arr, v) {
            if (typeof v !== 'number') {
                throw new TypeError('v must be a number');
            }

            for (var i = 0, l = arr.length; i < l; i++) {
                if (v <= arr[i]) {
                    while (i < l && v === arr[i]) i++;
                    if (i === 0) return 0;
                    if (v !== arr[i - 1]) {
                        i += (v - arr[i - 1]) / (arr[i] - arr[i - 1]);
                    }
                    return i / l;
                }
            }
            return 1;
        }

        let dataByMetric = {};

        this.setDataByMetric = function(stocks) {
            const metrics = Object.keys(stocks[0].metrics);
            for (let metric of metrics) {
                let data = [];

                for (let stock of stocks) {
                    const val = stock.metrics[metric];
                    if (!isNaN(val)) {
                        data.push(val);
                    }

                }
                if (data.length) {
                    data.sort((a, b) => a - b);
                }
                dataByMetric[metric] = data;
            }
            return dataByMetric;
        };

        this.quantileByMetric = function(stock, metric) {
            const data = dataByMetric[metric];
            return percentRank(data, stock.metrics[metric]);
        };

    }]);