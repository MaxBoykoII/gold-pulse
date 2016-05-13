angular.module('GoldPulse')
    .service('CleaningService', [function() {
        this.clean = function(res) {

            //[0] helper function for cleaning data
            function handleVal(val) {
                const parsed = parseFloat(val);
                return isNaN(parsed) ? "no data" : parsed;
            }

            //[1] Bring in raw data and start building clean data using the m0 data
            let rawData = res.data.body.dates,
                cleanData = rawData[0].oids.map(function(el) {
                    const au1k = handleVal(el.au1k),
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
                        id,
                        "startDate": rawData[0].ymd,
                            "dates": [],
                            name,
                            ticker,
                            "metrics": {
                                auV,
                                aueq,
                                mcap,
                                per_aueq,
                                grd,
                                price
                            }
                    };
                });

            //[2] Wherever possible, insert closing price on date for each id.

            for (let stock of cleanData) {
                let id = stock.id;
                for (let element of rawData) {
                    if (element.ymd !== stock.startDate) {
                        let filtered = element.oids.filter(function(oidData) {
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