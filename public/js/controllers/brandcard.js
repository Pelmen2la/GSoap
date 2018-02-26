angular.module('gsoapApp.controllers')
    .controller('BrandCardController', ['$scope', '$state', '$stateParams', 'Brand', function($scope, $state, $stateParams, Brand) {
        loadRecord($stateParams.name);
        $scope.searchFilter = '';
        $scope.typeFilter = '';
        $scope.products = [];
        $scope.productListFilter = { $: '', type: '' };

        $scope.onFilterButtonClick = function(type) {
            $scope.productListFilter.type = $scope.productListFilter.type == type ? '' : type;
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
                $scope.products = data.products;
            });
        }
    }]);