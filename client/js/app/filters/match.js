angular.module('GoldPulse')
    .filter('match', function() {
        return function(dates, ymd) {
            return dates.filter(function(el) {
                return el.ymd === ymd;
            }).map(function(el) {
                return el.close;
            })[0];
        };
    });