angular.module('gsoapAdminApp.adminControllers').controller('OrderListController', ['$scope', '$state', 'Order', function ($scope, $state, Order) {
    $scope.orders = Order.query({}, function(data) {
    });
}]);