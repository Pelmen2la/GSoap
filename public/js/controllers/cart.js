angular.module('gsoapApp.controllers')
    .controller('CartController', ['$scope', '$cookies', 'Utils', function($scope, $cookies, Utils) {
        $scope.$watch('cartProducts', function() {
            var count = 0,
                price = 0;
            $scope.cartProducts.forEach(function(product) {
                count += product.count;
                price += product.capacityInfo.price * product.count;
            });
            $cookies.putObject('cartProducts', $scope.cartProducts, { expires: Utils.getNextDayDate() });
            $scope.cartText = 'Товаров в корзине: ' + count + ' на сумму ' + price + 'Р';
        }, true);
    }]);