angular.module('gsoapApp.controllers').controller('MainProductListController', ['$scope', '$state', '$stateParams', 'Product',
    function($scope, $state, $stateParams, Product) {
        $scope.isCardView = true;
        $scope.searchFilter = '';
        $scope.pageSize = 20;
        $scope.pageIndex = 0;
        $scope.buttonFilter = $stateParams.buttonFilter;
        loadPageData(true);

        $(window).scroll(function() {
            if($scope.dataLoading) {
                return;
            }
            var $window = $(window),
                productContainer = $('.product-container')[0],
                $mainContainer = $('#MainContainer');
            if(productContainer && $mainContainer.offset().top + $mainContainer.height() -
                productContainer.offsetHeight < $window.height() + $window.scrollTop()) {
                loadPageData();
            }
        });

        $scope.changeControlMode = function(isCardView) {
            $scope.isCardView = isCardView;
        };
        !$scope.openProductCard && ($scope.openProductCard = function(id) {
            $state.go('productCard', {id: id});
        });
        $scope.openBrandCard = function(brand) {
            $state.go('brandCard', { name: brand });
        };
        $scope.selectProductCapacity = function(product, capacity) {
            product.selectedCapacity = capacity;
        };
        $scope.onFilterInputKeyUp = function() {
            window.clearTimeout($scope.filterTimeoutId);
            $scope.filterTimeoutId = window.setTimeout(function() {
                loadPageData(true);
            }, 500);
        };

        function loadPageData(resetPageIndex) {
            var params = {};
            $scope.dataLoading = true;
            $scope.pageIndex = resetPageIndex ? 0 : $scope.pageIndex + 1;
            ['searchFilter', 'buttonFilter', 'pageSize', 'pageIndex'].forEach(function(param) {
                params[param] = $scope[param]
            });
            Product.query(params, function(data) {
                $scope.dataLoading = false;
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