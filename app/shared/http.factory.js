(function() {
    'use strict';

    angular
        .module('LetLife')
        .factory('myHttpInterceptor', myHttpInterceptor);

    myHttpInterceptor.$inject = ['API', '$localStorage'];

    function myHttpInterceptor(API, $localStorage) {
        var service = {
            request: request
        }

        return service;

        ///////////////////////////////
        // functions implementations //
        ///////////////////////////////

        function request(config) {

          if ( $localStorage.isLogged ) {
              if(!config.headers.s3Request){
                config.headers.Authorization = 'Bearer ' + $localStorage.token;
              }else{
                config.headers.Authorization =undefined
              }
          } else {
            config.headers.Authorization = 'Basic ' + API.authBasic;
          }
          return config;
        }
    }
})();
