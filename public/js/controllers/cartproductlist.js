angular.module('gsoapApp.controllers').controller('CartProductListController', ['$scope', '$state', 'StringResources', 'Order', function($scope, $state, StringResources, Order) {
    $scope.customerInfo = {};
    $scope.deliveryTypes = StringResources.deliveryTypes;

    $scope.openProductCard = function(id) {
        $state.go('productCard', {id: id});
    };
    $scope.removeProductFromCard = function(index) {
        confirm('Вы действительно хотите удалить продукт из заказа?') && $scope.cartProducts.splice(index, 1);
    };
    $scope.sendOrder = function() {
        var order = new Order({
            status: 'new',
            customerInfo: $scope.customerInfo,
            products: $scope.cartProducts
        });
        order.$save(function() {
            $scope.$parent.cartProducts = [];
            $state.go('index');
        });
    }
}]);