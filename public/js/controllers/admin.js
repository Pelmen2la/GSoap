angular.module('gsoapApp.controllers', []);

angular.module('gsoapApp.controllers')
    .controller('AdminController', ['$scope', '$state', 'Utils', 'StringResources', function($scope, $state, Utils, StringResources) {
        $scope.utils = Utils;
        $scope.stringResources = StringResources;

        $scope.openProductCard = function(id) {
            $state.go('productForm', {id: id});
        };
        $scope.onButtonFilterMainButtonClick = function(id) {
            $state.go('buttonFilterForm', {id: id});
        };
    }]);