import AuthenticationController from './authentication.controller';
import Routes from './authentication.routes';
import AuthenticationService from './authentication.service';

var authenticationModule = angular.module('AuthenticationComponent', []);

authenticationModule.controller('AuthenticationController', AuthenticationController);
authenticationModule
  .config(Routes)
  .factory('AuthenticationService', AuthenticationService.factory);

export default authenticationModule;
