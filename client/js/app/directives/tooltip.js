'use strict';

angular.module('GoldPulse').directive('tooltip', function () {
    return {
        restrict: 'A',
        scope: {
            title: '@'
        },
        link: function link(scope, element, attrs) {
            $(element).hover(function () {
                // on mouseenter
                $(element).tooltip('show');
            }, function () {
                // on mouseleave
                $(element).tooltip('hide');
            });
        }
    };
});
//# sourceMappingURL=tooltip.js.map