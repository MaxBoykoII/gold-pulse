angular.module('GoldPulse')
    .directive('tooltip', function() {
        return {
            restrict: 'A',
            scope: {
                title: '@'
            },
            link: function(scope, element, attrs) {
                $(element).hover(function() {
                    // on mouseenter
                    $(element).tooltip('show');
                }, function() {
                    // on mouseleave
                    $(element).tooltip('hide');
                });
            }
        };
    });