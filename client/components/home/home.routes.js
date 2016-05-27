import template from './home.index.html!text';

class Routes {
  constructor($stateProvider){
    $stateProvider
      .state('home', {
        url: '/',
        controller : 'HomeController as homeController',
        template: template,
        authenticate: true,
      });
  }
}

Routes.$inject = ['$stateProvider'];

export default Routes;