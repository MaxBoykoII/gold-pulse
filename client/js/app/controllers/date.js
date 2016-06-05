'use strict';

angular.module('GoldPulse').controller('DateCtrl', ['$scope', '$http', function ($scope, $http) {
    var dates;
    $http.get('/dates').then(function (res) {
        dates = res.data.body;
        $scope.max = dates.reduce(function (acc, curr) {
            return Date.parse(curr) > Date.parse(acc) ? curr : acc;
        });
        $scope.min = dates.reduce(function (acc, curr) {
            return Date.parse(curr) < Date.parse(acc) ? curr : acc;
        });
        $scope.dateStr = '2013-01-04';
    });

    $scope.submit = function () {
        var timeStamp = Date.parse(this.dateStr);
        if (!isNaN(timeStamp)) {
            var closest = dates.filter(function (el) {
                return Date.parse(el) >= timeStamp;
            }).reduce(function (acc, curr) {
                var diff1 = Date.parse(curr) - timeStamp,
                    diff2 = Date.parse(acc) - timeStamp;
                return diff1 < diff2 ? curr : acc;
            });
            this.dateStr = closest;
            this.generate(closest);
        } else {
            alert("Please enter a valid date in the yyyy-mm-dd format!");
        }
    };
}]);
//# sourceMappingURL=date.js.map