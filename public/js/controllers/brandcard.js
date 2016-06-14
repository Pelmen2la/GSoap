angular.module('gsoapApp.controllers')
    .controller('BrandCardController', ['$scope', '$state', '$stateParams', 'Brand', function($scope, $state, $stateParams, Brand) {
        loadRecord($stateParams.name);
        $scope.searchFilter = '';
        $scope.typeFilter = '';

        $scope.onFilterButtonClick = function(type) {
            $scope.typeFilter = $scope.typeFilter == type ? '' : type;
        };
        $scope.openProductCard = function(id) {
            $state.go('productCard', {id: id});
        };
        $scope.selectProductCapacity = function(product, capacity) {
            product.selectedCapacity = capacity;
        };
        $scope.productListFilterFunction = function(product) {
            return product.name.indexOf($scope.searchFilter) > -1 && (!$scope.typeFilter || product.type === $scope.typeFilter);
        };

        function loadRecord(name) {
            $scope.brand = Brand.get({id: name}, function(data) {
                $scope.categories = {};
                data.products.forEach(function(product) {
                    var type = product.type;
                    if(type) {
                        $scope.categories[type] ? ($scope.categories[type] += 1) : ($scope.categories[type] = 1);
                    }
                    product.selectedCapacity = product.capacityList[0];
                });
            });
        }
    }]);