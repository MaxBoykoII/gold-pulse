angular.module('GoldPulse').service('ColoringService', [function() {
        //Initialize quartiles
        let quartilesByDate = [],
            quartilesByMetric = [];

        //Function to compute Quartiles for returns by date
        this.setQuartilesByDate = function(stocks) {
            let dates = stocks[0].dates.map((el) => el.ymd),
                returnsByDate = dates.map((date) => {
                    let obj = {
                        ymd: date,
                        returns: []
                    };
                    for (let stock of stocks) {
                        const change = stock.dates.find((el) => el.ymd === date).change;
                        if (change !== 'no data') {
                            obj.returns.push(parseFloat(change));
                        }
                    }
                    obj.returns.sort((a, b) => a - b);
                    return obj;
                });
            quartilesByDate = returnsByDate.map((el) => {
                let obj = {
                    ymd: el.ymd,
                    quartiles: []
                };
                if (el.returns.length) {
                    for (let alpha of[0.25, 0.50, 0.75, 1]) {
                        obj.quartiles.push(d3.quantile(el.returns, alpha));
                    }
                }
                return obj;
            });
            return quartilesByDate;
        };
        this.setQuartilesByMetric = function(stocks) {
            let metrics = Object.keys(stocks[0].metrics);
            quartilesByMetric = metrics.map((metric) => {
                let obj = {
                        metric: metric,
                        quartiles: []
                    },
                    data = [];
                for (let stock of stocks) {
                    const val = stock.metrics[metric];
                    if (!isNaN(val)) {
                        data.push(val);
                    }
                }
                if (data.length) {
                    data.sort((a, b) => a - b);
                    for (let alpha of[0.25, 0.50, 0.75, 1]) {
                        obj.quartiles.push(d3.quantile(data, alpha));
                    }
                }
                return obj;
            });
            return quartilesByMetric;
        };

        //Functions for coloring logic
        this.colorByDate = function(dates, ymd, stock, mode, selection) {
            if (mode === "test") {
                let change = stock.dates.find((el) => el.ymd === ymd).change;
                if (change !== 'no data') {
                    change = parseFloat(change);
                    const quartiles = quartilesByDate.find((el) => el.ymd === ymd).quartiles;
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
        this.colorByMetric = function(metric, stock, mode, selection) {
            if (selection === metric) {
                return 'highlight';
            }
            else if (mode === 'train') {
                const val = stock.metrics[metric];
                if (!isNaN(val)) {
                    const quartiles = quartilesByMetric.find((el) => el.metric === metric).quartiles;
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

            }
        };

    }

]);