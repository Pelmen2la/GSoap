angular.module('gsoapAdminApp.adminControllers')
    .controller('OrderFormController', ['$scope', '$state', '$stateParams', 'Order', function($scope, $state, $stateParams, Order) {
        $scope.readOnlyProductList = true;
        $scope.promocodeInfo = {};
        $scope.order = Order.get({id: $stateParams.id}, function(data) {
            $scope.cartProducts = data.products;
            $scope.customerInfo = data.customerInfo;
            $scope.promocodeInfo = data.promocodeInfo;
        });
        $scope.submitOrder = function() {
            $scope.order.$update({id: $scope.order._id}, function(data) {
                $scope.orderId = data;
            });
        };
        $scope.back = function() {
            $state.go('orders');
        };
    }]);

