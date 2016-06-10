angular.module('gsoapApp.controllers')
    .controller('BrandCardController', ['$scope', '$state', '$stateParams', 'Brand', function($scope, $state, $stateParams, Brand) {
        loadRecord($stateParams.name);

        $scope.openProductCard = function(id) {
            $state.go('productCard', {id: id});
        };
        $scope.selectProductCapacity = function(product, capacity) {
            product.selectedCapacity = capacity;
        };

        function loadRecord(name) {
            $scope.brand = Brand.get({id: name}, function(data) {
                data.products.forEach(function(product) {
                    product.selectedCapacity = product.capacityList[0];
                });
            });
        }
    }]);