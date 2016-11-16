angular.module('gsoapApp.controllers').controller('MainProductListController', ['$scope', '$state', '$stateParams', 'Product',
    function($scope, $state, $stateParams, Product) {
        $scope.pagingOptions = {
            pageIndex: 1,
            pageSize: 24,
            totalItemsCount: 0
        };
        $scope.filters = {
            searchFilter: '',
            buttonFilter: $stateParams.buttonFilter
        }
        if(!$scope.products) {
            $scope.products = [];
            loadPageData();
        }

        $scope.selectProductCapacity = function(product, capacity) {
            product.selectedCapacity = capacity;
        };
        $scope.onFilterInputKeyUp = function() {
            $scope.pagingOptions.pageIndex = 0;
            window.clearTimeout($scope.filterTimeoutId);
            $scope.filterTimeoutId = window.setTimeout(function() {
                loadPageData();
            }, 500);
        };
        $scope.onPagerClick = function(pageIndex) {
            $scope.pagingOptions.pageIndex = pageIndex;
            loadPageData(function() {
                document.body.scrollTop = $('.products-container').offset().top
            });
        };

        function loadPageData(callback) {
            var params = {};
            ['searchFilter', 'buttonFilter'].forEach(function(param) {
                params[param] = $scope.filters[param];
            });
            params['pagingOptions'] = $scope.pagingOptions;
            Product.query(params, function(data) {
                $scope.pagingOptions.totalItemsCount = data.pop();
                data.forEach(function(product) {
                    product.selectedCapacity = product.capacityList[0];
                });
                $scope.products = data;
                callback && callback();
            });
        }
    }]);