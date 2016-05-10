angular.module('GoldPulse')
    .service('ColoringService', [function() {
        let quartilesByDate = [];

        this.setQuantiles = function(stocks) {
            let dates = stocks[0].dates.map((el) => el.ymd),
                returnsByDate = dates.map((date) => {
                    let obj = {
                        ymd: date,
                        returns: []
                    };
                    stocks.forEach((stock) => {
                        const change = stock.dates.find((el) => el.ymd === date).change;
                        if (change !== 'no data') {
                            obj.returns.push(parseFloat(change));
                        }
                    });
                    obj.returns.sort();
                    return obj;
                });
            quartilesByDate = returnsByDate.map((el) => {
                let obj = {
                    ymd: el.ymd,
                    quartiles: []
                };
                if (el.returns.length) {
                    [0.25, 0.50, 0.75, 1].forEach((alpha) => {
                        obj.quartiles.push(d3.quantile(el.returns, alpha));
                    });
                }
                return obj;

            });
            return quartilesByDate;
        };
        this.color = function(ymd, stock) {
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

        };
    }]);