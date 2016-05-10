angular.module('GoldPulse')
    .service('CleaningService', [function() {
        this.clean = function(res) {
            //[1] Bring in raw data and start building clean data using the m0 data
            let rawData = res.data.body.dates,
                cleanData = rawData[0].oids.map(function(el) {

                    return {
                        "id": el.id,
                        "startDate": rawData[0].ymd,
                        "dates": [],
                        "name": el.name,
                        "ticker": el.ticker,
                        "metrics": {
                            au1k: parseFloat(el.au1k),
                            aueq: parseFloat(el.aueq),
                            mcap: parseFloat(el.mcap),
                            per_aueq: parseFloat(el.per_aueq),
                            grd: parseFloat(el.grd),
                            price: parseFloat(el.close)
                        }
                    };
                });
            console.log(rawData);
            //[2] Wherever possible, insert closing price on date for each id.

            cleanData.forEach(function(stock) {
                let id = stock.id;
                rawData.forEach(function(element, i, arr) {
                    if (element.ymd !== stock.startDate) {
                        let filtered = element.oids.filter(function(oidData) {
                                return oidData.id === id;
                            }),
                            close = filtered.length ? parseFloat(filtered[0].close) : "no data",
                            change = (close === "no data") ? "no data" : ((close - stock.metrics.price)/(stock.metrics.price)*100).toFixed(2) + "%";
                        stock.dates.push({
                            "ymd": element.ymd,
                            close: close,
                            change: change
                        });
                    }
                });
            });


            return cleanData;
        };
    }]);