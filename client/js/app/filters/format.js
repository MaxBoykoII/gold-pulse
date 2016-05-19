angular.module("GoldPulse")
    .filter('format', ['$filter', function($filter) {
        return function(val, metric) {
            var IsNumeric = !isNaN(val);
            if (IsNumeric) {
                if (metric === 'price') {
                    return $filter('currency')(val);
                }
                else {
                    return $filter('number')(val, 2);
                }
            }
            else {
                return val;
            }

        };
    }]);