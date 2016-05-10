angular.module('GoldPulse')
    .controller('DateCtrl', ['$scope', '$http', function($scope, $http) {
        var dates;
        $http.get('https://www.goldminerpulse.com/_demo/valid-dates-api.php').then(function(res) {
            dates = res.data;
            $scope.max = dates.reduce((acc, curr) => {
                return (Date.parse(curr) > Date.parse(acc)) ? curr : acc;
            });
            $scope.min = dates.reduce((acc, curr) => {
                return (Date.parse(curr) < Date.parse(acc)) ? curr : acc;
            });
            $scope.dateStr = '2013-01-04';
        });

        $scope.submit = function() {
            const timeStamp = Date.parse(this.dateStr);
            if (!isNaN(timeStamp)) {
                let closest = dates.filter((el) => Date.parse(el) >= timeStamp).reduce(
                    (acc, curr) => {
                        const diff1 = Date.parse(curr) - timeStamp,
                            diff2 = Date.parse(acc) - timeStamp;
                        return (diff1 < diff2) ? curr : acc;
                    }
                );
                this.dateStr = closest;
                this.generate(closest);

            }
            else {
                alert("Please enter a valid date in the yyyy-mm-dd format!");
            }
        };
    }]);