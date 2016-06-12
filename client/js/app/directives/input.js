'use strict';

angular.module('GoldPulse').directive('dateInput', function () {
    return {
        restrict: 'E',
        templateUrl: './templates/directives/dateInput.html',
        controller: 'DateCtrl',
        link: function link(scope, element) {
            scope.$watch('dateStr', function (newVal) {
                var invalid = isNaN(Date.parse(newVal));
                var input = element.find('.form-control-date');
                if (invalid && input.hasClass('valid')) {
                    input.removeClass('valid').addClass('invalid');
                } else if (invalid) {
                    input.addClass('invalid');
                } else if (!invalid && input.hasClass('invalid')) {
                    input.removeClass('invalid').addClass('valid');
                } else if (!invalid) {
                    input.addClass('valid');
                }
            });
        }
    };
});
//# sourceMappingURL=input.js.map