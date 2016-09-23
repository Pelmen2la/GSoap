angular.module('gsoapApp.controllers')
    .controller('CartController', ['$scope', '$cookies', 'Utils', function($scope, $cookies, Utils) {
        $scope.$watch('cartProducts', function() {
            var count = 0,
                price = 0,
                productsInfo = Utils.getProductsInfo($scope.cartProducts);
            $cookies.putObject('cartProducts', $scope.cartProducts, { expires: Utils.getNextDayDate() });
            $scope.cartText = productsInfo.count + ' шт. на ' + productsInfo.price;
        }, true);
    }]);