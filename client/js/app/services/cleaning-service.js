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
                    var au_oz = handleVal(el.au_oz),
                        price = handleVal(el.close),
                        shares = handleVal(el.shares),
                        auV = (!isNaN(au_oz) && !isNaN(price)) ? au_oz / (Math.pow(10, 6) * shares * price) : "no data",
                        mcap = (!isNaN(shares) && !isNaN(price)) ? shares * price : "no data",
                        grd = handleVal(el.grd),
                        id = el.id,
                        name = el.name,
                        ticker = el.ticker;
                        
                        au_oz = isNaN(au_oz) ? au_oz : au_oz/Math.pow(10, 6)

                    return {
                        id: id,
                        "startDate": rawData[0].ymd,
                        "dates": [],
                        name: name,
                        ticker: ticker,
                        "metrics": {
                            auV: auV,
                            au_oz: au_oz,
                            mcap: mcap,
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
            cleanData = cleanData.filter(function(stock) {
                return stock.metrics.price > 0;
            });

            return cleanData;
        };
    }]);