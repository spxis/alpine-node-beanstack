class AuthenticationController {
  constructor(AuthenticationService, $location) {
    this.login = '';
    this.password = '';
    this.rememberMe = false;
    this.authenticationService = AuthenticationService;
    if (this.authenticationService.isLoggedIn()) {
      $location.path('/');
    }
  }

  doLogin() {
    this.authenticationService.login(this.login, this.password, this.rememberMe);
  }
}

AuthenticationController.$inject = ['AuthenticationService', '$location'];

export default AuthenticationController;
