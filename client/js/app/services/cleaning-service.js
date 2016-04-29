angular.module('GoldPulse')
    .service('CleaningService', [function() {
        this.clean = function(res) {
            //[1] Bring in raw data and start building clean data using the m0 data
            var rawData = res.data.body.dates,
                cleanData = rawData[0].oids.map(function(el) {

                    return {
                        "id": el.id,
                        "dates": [],
                        "name": el.name,
                        "ticker": el.ticker,
                        "metrics": {
                            au1k: parseFloat(el.au1k),
                            aueq: parseFloat(el.aueq),
                            mcap: parseFloat(el.mcap),
                            per_aueq: parseFloat(el.per_aueq),
                            grd: parseFloat(el.grd)
                        }
                    };
                });

            //[2] Wheerever possible, insert closing price on date for each id.

            cleanData.forEach(function(el) {
                var id = el.id;
                rawData.forEach(function(element, i, arr) {
                    var filtered = element.oids.filter(function(oidData) {
                            return oidData.id === id;
                        }),
                        close = filtered.length ? parseFloat(filtered[0].close) : "no data";
                    el.dates.push({
                        "ymd": element.ymd,
                        close: close
                    });
                });
            });


            return cleanData;
        };
    }]);