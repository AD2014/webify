(function() {
    'use strict';

    angular
        .module('LetLife.underconstruction')
        .config(config);

    function config($routeProvider) {
        $routeProvider
            .when('/uc', {
              templateUrl: 'view/components/underconstruction/underconstruction.html'
            });
    }

})();
