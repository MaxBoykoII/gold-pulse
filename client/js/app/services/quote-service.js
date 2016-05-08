angular.module("GoldPulse")
    .service('QuoteService', ['$http', '$q', 'CleaningService', function($http, $q, CleaningService) {

        this.fetch = function(m) {
            var deferred = $q.defer(),
                query = 'm=' + m,
                requestUrl = '/api?' + query;

            $http.get(requestUrl).then(function(res) {
                res = CleaningService.clean(res);
                deferred.resolve({
                    res: res
                });
            }, function(err) {
                console.log(err);
                deferred.reject();
            });
            return deferred.promise;
        };
    }]);