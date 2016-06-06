angular.module('gsoapApp.controllers').controller('OrderListController', ['$scope', '$state', 'Order', function ($scope, $state, Order) {
    $scope.orders = Order.query({}, function(data) {
    });
}]);