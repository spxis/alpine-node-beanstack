let authenticationCheck = ($http, $rootScope, $state, storageService, AuthenticationService) => {
  $http.defaults.headers.common.Accept = 'application/json, text/plain';

  $rootScope.$on('$stateChangeStart', (event, toState, toParams, fromState, fromParams) => {
    if (toState.authenticate && !AuthenticationService.isLoggedIn()) {
      storageService.set('authentication', {redirectTo : {state: toState.name, params: toParams}});
      $state.go('login');
      event.preventDefault();
    }
  });
};
authenticationCheck.$inject = ['$http', '$rootScope', '$state', 'storageService', 'AuthenticationService'];

let authenticationSettingModule = angular.module('authenticationSettingModule', [])
  .run(authenticationCheck);

export default authenticationSettingModule;