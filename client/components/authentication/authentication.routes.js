import template from './authentication.login.html!text';
class Routes {
  constructor($stateProvider){
    $stateProvider
      .state('login', {
        url: '/login',
        controller : 'AuthenticationController as authController',
        template: template
      });
  }
}

Routes.$inject = ['$stateProvider'];

export default Routes;