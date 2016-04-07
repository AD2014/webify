(function() {
  'use strict';

  angular
  .module('LetLife.header')
  .controller('HeaderController', HeaderController);

  HeaderController.$inject = ['$rootScope','$routeParams'];

  function HeaderController($rootScope,$routeParams) {
    var vm = this;
    // console.log('HeaderController');
    // render onload
    render();

    $rootScope.$on('header.render', render);

    function render(event){
      // if( LoginService.isLogged() ){
      //   console.log("view/components/header/header_auth.html");
      //   vm.template = 'view/components/header/header_auth.html';
      //   console.log(vm);
      // } else {
        vm.template = 'view/components/header/header_noauth.html';
      // }
    }

    vm.logout = function(){
      console.log("logout");
      // console.log(LoginService.isLogged());
      // console.log(LoginService.signIn());
      // console.log(LoginService.signOut());
      console.log(document.querySelector( '#html'));
      if( LoginService.signOut() ){
        angular.element( document.querySelector( '#html')).addClass('full');
        console.log(angular);
        $rootScope.$broadcast('header.render', '');
      }
    }
  }
})();
