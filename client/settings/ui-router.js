// UI Router settings
let routerConfig = ($urlRouterProvider, $urlMatcherFactoryProvider) => {
  $urlMatcherFactoryProvider.strictMode(false);

  // For any unmatched url, redirect to /
  $urlRouterProvider.otherwise('/');
};
routerConfig.$inject = ['$urlRouterProvider', '$urlMatcherFactoryProvider'];

let uiRouterConfigModule = angular.module('uiRouterConfigModule', [])
  .config(routerConfig);

export default uiRouterConfigModule;
