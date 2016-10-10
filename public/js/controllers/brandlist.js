angular.module('gsoapApp.controllers').controller('BrandListController', ['$scope', '$state', 'Brand', function($scope, $state, Brand) {
    $scope.brands = Brand.query({}, function(data) {
    });
}]);