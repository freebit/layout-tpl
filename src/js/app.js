

const ngModule = angular.module('landingApp', ['ui.mask']);

ngModule.config(['$locationProvider','$httpProvider', ($locationProvider, $httpProvider) => {

    $locationProvider.html5Mode(true);

}]);



ngModule.controller('LandingCtrl', ['$scope', ($scope) => {

    $scope.user = {
        name: "Freebus"
    };


}]);
