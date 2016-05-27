class AuthenticationService {
  constructor(storageService, $state, $location, $preloaded, notificationService) {
    this.storageService = storageService;
    this.$state = $state;
    this.$location = $location;
    this.$preloaded = $preloaded;
    this.notificationService = notificationService;
  }

  isLoggedIn() {
    let loggedIn = this.getStorageValue().loggedIn;
    return this.$preloaded.config.credentials === false || this.$preloaded.config.credentials.toString() === 'false' || loggedIn;
  }

  login(user, password, rememberMe) {
    let [login, passwd] =  this.$preloaded.config.credentials.split('/');
    let storageValue = this.getStorageValue();
    if (user === login && password === passwd) {
      storageValue.loggedIn = true;
      if (! storageValue.redirectTo || storageValue.redirectTo.state === 'login') {
        this.$location.path('/');
      }
      else {
        this.$state.go(storageValue.redirectTo.state, storageValue.redirectTo.params);
      }
    } else {
      this.notificationService.error('Login or password incorrect');
    }
    this.setStorageValue(storageValue, rememberMe);
  }

  getStorageValue() {
    return (this.storageService.get('authentication') || {});
  }

  setStorageValue(value, rememberMe) {
    this.storageService.set('authentication', value, rememberMe);
  }

  static factory(storageService, $state, $location, $preloaded, notificationService) {
    return new AuthenticationService(storageService, $state, $location, $preloaded, notificationService);
  }
}
AuthenticationService.factory.$inject = ['storageService', '$state', '$location', '$preloaded', 'notificationService'];
export default AuthenticationService;
