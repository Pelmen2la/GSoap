angular.module('gsoapAdminApp.adminControllers').controller('AdminProductListController', ['$scope', '$state', '$stateParams', 'Product',
    function($scope, $state, $stateParams, Product) {
        $scope.searchFilter = '';
        $scope.pageSize = 20;
        $scope.pageIndex = 0;
        loadPageData(true);

        $(window).scroll(function() {
            var $window = $(window),
                $productList = $('#AdminProductList')
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
        $scope.openBrandForm = function(brand) {
            $state.go('brandCard', {id: brand});
        };
        $scope.onFilterInputKeyUp = function() {
            window.clearTimeout($scope.filterTimeoutId);
            $scope.filterTimeoutId = window.setTimeout(function() {
                loadPageData(true);
            }, 500);
        };

        function loadPageData(resetPageIndex) {
            var params = {};
            if($scope.dataLoading || (!resetPageIndex && $scope.products.length == $scope.totalCount)) {
                return;
            }
            $scope.dataLoading = true;
            $scope.pageIndex = resetPageIndex ? 0 : $scope.pageIndex + 1;
            ['searchFilter', 'pageSize', 'pageIndex'].forEach(function(param) {
                params[param] = $scope[param]
            });
            params['showInactive'] = true;
            Product.query(params, function(data) {
                $scope.dataLoading = false;
                $scope.totalCount = data.pop();
                data.forEach(function(product) {
                    product.selectedCapacity = product.capacityList[0];
                });
                if($scope.pageIndex === 0) {
                    $scope.products = data;
                } else {
                    $scope.products = $scope.products.concat(data);
                }
            });
        }
    }]);