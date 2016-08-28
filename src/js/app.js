
import angular from 'angular';
import ui_mask from 'angular-ui-mask';

const ngModule = angular.module('landingApp', [ui_mask]);

ngModule.config(['$locationProvider','$httpProvider', ($locationProvider, $httpProvider) => {

    $locationProvider.html5Mode(true);

}]);

ngModule.controller('MainCtrl', ['$scope',($scope) => {

    $scope.message = "";

    const draw = (count) => {
      let str = ''

      for (var i = 0; i < count; i++) {
        str += ( i % 2 == 0 ? '  ' : '') + new Array(5).join('#  ') + '\n';
      }

      return str;
    }

    const min = (a,b) => {
      return a > b ? b : a;
    }

    const isEven = (num) => {

    }

    const Increment = () => {
      let value_ = 0
      return () => ++value_
    }

    const increment = new Increment();

    //debugger

    $scope.message = increment();
    $scope.message += "\n" + increment();
    $scope.message += "\n" + increment();
    $scope.message += "\n" + increment();
    $scope.message += "\n" + increment();
    $scope.message += "\n" + increment();
    $scope.message += "\n" + increment();

    $scope.clearMessage = () => {
        return $scope.message = "";
    }

}]);
