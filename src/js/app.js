

const ngModule = angular.module('landingApp', ['ui.mask']);

ngModule.config(['$locationProvider','$httpProvider', ($locationProvider, $httpProvider) => {

    $locationProvider.html5Mode(true);

}]);



ngModule.controller('LandingCtrl', ['$scope', ($scope) => {

}]);


ngModule.controller('TextAreaWithLimitCtrl', ['$scope',($scope) => {

    const MAX_LEN = 10;
    const WARN_THRESHOLD = 3;

    $scope.message = "";

    $scope.remaining = () => {
        return MAX_LEN - $scope.message.length;
    };

    $scope.hasValidLength = () => {
        return $scope.message.length <= MAX_LEN;
    }

    $scope.shouldWarn = function () {
        return $scope.remaining() < WARN_THRESHOLD;
    };

    $scope.checkMessageLength = (evt) => {
        if($scope.message.length == MAX_LEN){
            evt.preventDefault();
        }
    }

    $scope.clearMessage = () => {
        return $scope.message = "";
    }

}]);
