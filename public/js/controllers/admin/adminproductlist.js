angular.module('gsoapAdminApp.adminControllers').controller('AdminProductListController', ['$scope', '$state', '$stateParams', 'Product', 'Brand',
    function($scope, $state, $stateParams, Product, Brand) {
        $scope.filters = {
            searchFilter: '',
            brandIdFilter: ''
        }
        $scope.pagingOptions = {
            pageSize: 20,
            pageIndex: 1
        };
        $scope.brands = Brand.query({}, function(data) {});
        loadPageData(true);

        $(window).scroll(function() {
            var $window = $(window),
                $productList = $('#AdminProductList');
            productRow = $productList.find('tr')[0];
            if(productRow && $productList.offset().top + $productList.height() -
                productRow.offsetHeight < $window.height() + $window.scrollTop()) {
                loadPageData();
            }
        });

        $scope.openProductForm = function(id) {
            $state.go('productForm', {id: id});
        };
        $scope.tryDeleteProduct = function(id) {
            if(window.confirm('Вы уверены, что хотите удалить продукт?')) {
                Product.delete({id: id}, function() {
                    loadPageData(true);
                });
            }
        };
        $scope.openBrandForm = function(id) {
            $state.go('brandCard', {id: id});
        };
        $scope.onFilterInputKeyUp = function() {
            window.clearTimeout($scope.filterTimeoutId);
            $scope.filterTimeoutId = window.setTimeout(function() {
                loadPageData(true);
            }, 500);
        };
        $scope.onBrandFilterButtonClick = function(brandId) {
            if(brandId === $scope.lastBrandFilterId && brandId === $scope.filters.brandIdFilter) {
                $scope.filters.brandIdFilter = '';
                $scope.lastBrandFilterId = null;
            } else {
                $scope.lastBrandFilterId = brandId;
            }
            loadPageData(true);
        };

        function loadPageData(resetPageIndex) {
            var params = {};
            if($scope.dataLoading || (!resetPageIndex && $scope.products.length === $scope.pagingOptions.totalCount)) {
                return;
            }
            $scope.dataLoading = true;
            $scope.pagingOptions.pageIndex = resetPageIndex ? 1 : $scope.pagingOptions.pageIndex + 1;
            ['searchFilter', 'brandIdFilter'].forEach(function(param) {
                params[param] = $scope.filters[param]
            });
            params['pagingOptions'] = $scope.pagingOptions;
            params['showHiddenItems'] = true;
            Product.query(params, function(data) {
                $scope.dataLoading = false;
                $scope.pagingOptions.totalCount = data.pop();
                if($scope.pagingOptions.pageIndex === 1) {
                    $scope.products = data;
                } else {
                    $scope.products = $scope.products.concat(data);
                }
            });
        }
    }]);