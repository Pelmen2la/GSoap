angular.module('gsoapApp.controllers', []);

angular.module('gsoapApp.controllers')
    .controller('MainController', ['$scope', '$state', '$stateParams', '$cookies', 'Utils', 'ButtonFilter', 'StringResources',
        function($scope, $state, $stateParams, $cookies, Utils, ButtonFilter, StringResources) {
        $scope.cartProducts = $cookies.getObject('cartProducts') || [];
        $scope.cartText = '';
        $scope.filterButtonsData = ButtonFilter.query({}, function() {
        });
        $scope.utils = Utils;
        $scope.stringResources = StringResources;

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
                count: count,
                discount: product.discount,
                stockCount: product.stockCount,
                orderCount: product.orderCount
            });
        };

        $scope.onFilterButtonClick = function(filter) {
            $scope.changeView('index', { buttonFilter: JSON.stringify(filter) });
        };
        $scope.changeView = function(name, params) {
            $state.go(name, params, { reload: $state.current.name === name });
        };
    }]);