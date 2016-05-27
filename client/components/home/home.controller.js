class HomeController {
  constructor($scope, $preloaded){
    this.preloaded = $preloaded;
  }
}

HomeController.$inject = ['$scope', '$preloaded'];

export default HomeController;
