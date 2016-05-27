import authenticationModule from './components/authentication/authentication.module';
import homeModule from './components/home/home.module';

// Config
import settingModule from './settings/settings.module';

// Defer angular setting to be sure all JS are loaded
setTimeout(function() {
  let app = angular.module('beanstack',[
    '$preloaded',
    'ngStorage',
    'ui.bootstrap',
    'ui.router',
    'ui-notification',
    'atigeoNgCommon',

    // Config
    settingModule.name,

    // Components
    homeModule.name,
    authenticationModule.name,
  ]);
  angular.bootstrap(document, ['beanstack'], {});
});