// Location Provider setting
let locationConfig = ($locationProvider) => {
  // use the HTML5 History API
  $locationProvider.html5Mode(false);
};
locationConfig.$inject = ['$locationProvider'];

let locationConfigModule = angular.module('locationConfigModule', [])
  .config(locationConfig);

export default locationConfigModule;