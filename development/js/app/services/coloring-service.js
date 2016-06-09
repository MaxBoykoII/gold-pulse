angular.module('GoldPulse').service('ColoringService', [function() {
        //Initialize quartiles
        var quartilesByDate = [],
            quartilesByMetric = [];

        //Function to compute Quartiles for returns by date
        this.setQuartilesByDate = function(stocks) {
            var dates = stocks[0].dates.map(function(el) {
                    return el.ymd
                }),
                returnsByDate = dates.map(function(date) {
                    var obj = {
                        ymd: date,
                        returns: []
                    };
                    for (var i = 0, l = stocks.length; i < l; i++) {
                        var stock = stocks[i],
                            change = stock.dates.find(function(el) {
                                return el.ymd === date;
                            }).change;
                        if (change !== 'no data') {
                            obj.returns.push(parseFloat(change));
                        }
                    }
                    obj.returns.sort(function(a, b) {
                        return a - b;
                    });
                    return obj;
                });
            quartilesByDate = returnsByDate.map(function(el) {
                var obj = {
                    ymd: el.ymd,
                    quartiles: []
                };
                if (el.returns.length) {
                    for (var i = 0.25; i < 1; i += 0.25) {
                        obj.quartiles.push(d3.quantile(el.returns, i));
                    }
                }
                return obj;
            });
            return quartilesByDate;
        };
        this.setQuartilesByMetric = function(stocks) {
            var metrics = Object.keys(stocks[0].metrics);
            quartilesByMetric = metrics.map(function(metric) {
                var obj = {
                        metric: metric,
                        quartiles: []
                    },
                    data = [];
                for (var i = 0, l = stocks.length; i < l; i++) {
                    var stock = stocks[i],
                        val = stock.metrics[metric];
                    if (!isNaN(val)) {
                        data.push(val);
                    }
                }
                if (data.length) {
                    data.sort(function(a, b) {
                        return a - b;
                    });
                    for (var i = 0.25; i < 1; i += 0.25) {
                        obj.quartiles.push(d3.quantile(data, i));
                    }
                }
                return obj;
            });
            return quartilesByMetric;
        };

        //Functions for coloring logic
        this.colorByDate = function(dates, ymd, stock, mode, selection) {
            if (mode === "test" || selection === 'name' || selection === 'ticker') {
                var change = stock.dates.find(function(el) {
                    return el.ymd === ymd;
                }).change;
                if (change !== 'no data') {
                    change = parseFloat(change);
                    const quartiles = quartilesByDate.find(function(el) {
                        return el.ymd === ymd;
                    }).quartiles;
                    if (change <= quartiles[0]) {
                        return 'red';
                    }
                    else if (change <= quartiles[1]) {
                        return 'yellow';
                    }
                    else if (change <= quartiles[2]) {
                        return 'blue';
                    }
                    else {
                        return 'green';
                    }
                }
                else {
                    return null;
                }
            }
            else if (dates.indexOf(ymd) === selection) {
                return 'highlight';

            }
        };
        this.colorByMetric = function(metric, stock, mode, selection, weightings) {
            if ((weightings[metric] === 100 || weightings[metric] === -100) && (mode === 'test')) {
                return 'highlight';
            }
            else if (mode === 'train' || selection === 'name' || selection === 'ticker') {
                var val = stock.metrics[metric];
                if (!isNaN(val)) {
                    var quartiles = quartilesByMetric.find(function(el) {
                        return el.metric === metric;
                    }).quartiles;
                    if (val <= quartiles[0]) {
                        return 'red';
                    }
                    else if (val <= quartiles[1]) {
                        return 'yellow';
                    }
                    else if (val <= quartiles[2]) {
                        return 'blue';
                    }
                    else {
                        return 'green';
                    }
                    
                }
                else{
                    return null;
                }

            }
        };

    }

]);