import HomeController from './home.controller';
import Routes from './home.routes';

var homeModule = angular.module('HomeComponent', []);

homeModule.controller('HomeController', HomeController);
homeModule.config(Routes);

export default homeModule;
