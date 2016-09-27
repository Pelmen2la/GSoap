angular.module('gsoapAdminApp.adminControllers')
    .controller('OrderFormController', ['$scope', '$state', '$stateParams', 'Order', function($scope, $state, $stateParams, Order) {
        $scope.order = Order.get({id: $stateParams.id}, function(data) {
        });
        $scope.submitOrder = function() {
            $scope.order.$update({id: $scope.order._id}, function() {
                $state.go('orders');
            });
        };
        $scope.back = function() {
            $state.go('orders');
        };
    }]);

