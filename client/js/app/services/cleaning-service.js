angular.module('GoldPulse')
    .service('CleaningService', [function() {
        this.clean = function(res) {

            //[0] helper function for cleaning data
            function handleVal(val) {
                var parsed = parseFloat(val);
                return isNaN(parsed) ? "no data" : parsed;
            }

            //[1] Bring in raw data and start building clean data using the m0 data
            var rawData = res.data.body.dates,
                cleanData = rawData[0].oids.map(function(el) {
                    var au1k = handleVal(el.au1k),
                        price = handleVal(el.close),
                        auV = (!isNaN(au1k) && !isNaN(price)) ? au1k / (1000 * price) : "no data",
                        aueq = handleVal(el.aueq),
                        mcap = handleVal(el.mcap),
                        per_aueq = handleVal(el.per_aueq),
                        grd = handleVal(el.grd),
                        id = el.id,
                        name = el.name,
                        ticker = el.ticker;

                    return {
                        id: id,
                        "startDate": rawData[0].ymd,
                        "dates": [],
                        name: name,
                        ticker: ticker,
                        "metrics": {
                            auV: auV,
                            aueq: aueq,
                            mcap: mcap,
                            per_aueq: per_aueq,
                            grd: grd,
                            price: price
                        }
                    };
                });

            //[2] Wherever possible, insert closing price on date for each id.

            for (var i = 0, l = cleanData.length; i < l; i++) {
                var stock = cleanData[i],
                    id = stock.id;
                for (var j = 0, l2 = rawData.length; j < l2; j++) {
                    var element = rawData[j];
                    if (element.ymd !== stock.startDate) {
                        var filtered = element.oids.filter(function(oidData) {
                                return oidData.id === id;
                            }),
                            close = filtered.length ? parseFloat(filtered[0].close) : "no data",
                            change = (close === "no data") ? "no data" : ((close - stock.metrics.price) / (stock.metrics.price) * 100).toFixed(2) + "%";
                        stock.dates.push({
                            "ymd": element.ymd,
                            close: close,
                            change: change
                        });
                    }
                }
            }


            return cleanData;
        };
    }]);