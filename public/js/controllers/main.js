angular.module('gsoapApp.controllers', []);

angular.module('gsoapApp.controllers')
    .controller('MainController', ['$scope', '$http', '$cookies', 'Utils', function($scope, $http, $cookies, Utils) {
        $scope.cartProducts = $cookies.getObject('cartProducts') || [];
        $scope.utils = Utils;

        $scope.addProductToCart = function(product, count) {
            count = count || 1;
            for(var entry, i = 0; entry = $scope.cartProducts[i]; i++) {
                if(entry.name == product.name && entry.capacityInfo.capacity == product.selectedCapacity.capacity) {
                    entry.count += count;
                    return;
                }
            }
            $scope.cartProducts.push({
                id: product._id,
                name: product.name,
                imageName: product.imageName,
                capacityInfo: product.selectedCapacity,
                count: count
            });
        }
    }]);