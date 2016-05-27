import locationConfigModule from './location';
import routerConfigModule from './ui-router';
import authConfigModule from './authentication';

var settingsModule = angular.module('settingsComponent', [
    routerConfigModule.name,
    locationConfigModule.name,
    authConfigModule.name
  ]);

export default settingsModule;
