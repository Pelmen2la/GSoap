angular.module('gsoapApp.controllers').controller('MainProductListController', ['$scope', '$state', '$stateParams', '$http', 'Product',
    function($scope, $state, $stateParams, $http, Product) {
        $scope.pagingOptions = {
            pageIndex: 1,
            pageSize: 24,
            totalItemsCount: 0
        };
        $scope.filters = {
            typeFilter : null,
            searchFilter: '',
            buttonFilterId: $stateParams.buttonFilterId
        };
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
        $scope.onFilterRadiobuttonClick = function(filterName) {
            if(filterName === $scope.lastRadiobuttonFilterName && filterName === $scope.filters.typeFilter) {
                $scope.filters.typeFilter = false;
                $scope.lastRadiobuttonFilterName = null;
            } else {
                $scope.lastRadiobuttonFilterName = filterName;
            }
            $scope.pagingOptions.pageIndex = 0;
            loadPageData();
        };
        $scope.onPagerClick = function(pageIndex) {
            $scope.pagingOptions.pageIndex = pageIndex;
            loadPageData(function() {
                document.body.scrollTop = $('.products-container').offset().top
            });
        };

        function loadPageData(callback) {
            var params = {};
            ['searchFilter', 'buttonFilterId', 'typeFilter'].forEach(function(param) {
                params[param] = $scope.filters[param];
            });
            params['pagingOptions'] = $scope.pagingOptions;
            Product.query(params, function(data) {
                $scope.pagingOptions.totalItemsCount = data.pop();
                data.forEach(function(product) {
                    product.selectedCapacity = product.capacityList[0];
                });
                $scope.products = data;
                if(params.buttonFilterId) {
                    $http({
                        method: 'GET',
                        url: '/buttonFilters/get_filter_text/' + params.buttonFilterId,
                    }).then(function(res) {
                        $scope.mainText = res.data;
                    }, function() {
                    });
                }
                callback && callback();
            });
        }
    }]);