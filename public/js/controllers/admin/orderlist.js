angular.module('gsoapAdminApp.adminControllers').controller('OrderListController', ['$scope', '$state', 'Order', function($scope, $state, Order) {
        loadPageData();

        $scope.openOrderForm = function(id) {
            $state.go('orderForm', {id: id});
        };
        $scope.tryDeleteOrder = function(id) {
            if(window.confirm('Вы уверены, что хотите удалить заказ?')) {
                Order.delete({id: id}, function() {
                    loadPageData();
                });
            }
        };

        function loadPageData() {
            $scope.orders = Order.query({}, function(data) {
            });
        }
}]);