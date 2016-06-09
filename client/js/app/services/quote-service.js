'use strict';

angular.module("GoldPulse").service('QuoteService', ['$http', '$q', 'CleaningService', 'QuantileService', 'ColoringService', function ($http, $q, CleaningService, QuantileService, ColoringService) {

    this.fetch = function (m) {
        var deferred = $q.defer(),
            query = 'm=' + m,
            requestUrl = '/api?' + query;

        $http.get(requestUrl).then(function (res) {
            res = CleaningService.clean(res);
            QuantileService.setDataByMetric(res);
            ColoringService.setQuartilesByDate(res);
            ColoringService.setQuartilesByMetric(res);

            deferred.resolve({
                res: res
            });
        }, function (err) {
            console.log(err);
            deferred.reject();
        });
        return deferred.promise;
    };
}]);
//# sourceMappingURL=quote-service.js.map