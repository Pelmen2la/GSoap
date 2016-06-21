angular.module('gsoapApp.controllers').controller('MainProductListController', ['$scope', '$state', '$stateParams', 'Product',
    function($scope, $state, $stateParams, Product) {
        $scope.products = [];
        $scope.isCardView = true;
        $scope.searchFilter = '';
        $scope.pageSize = 20;
        $scope.pageIndex = 0;
        $scope.withDiscount = !!$stateParams.withDiscount;
        $scope.isBestseller = !!$stateParams.isBestseller;
        $scope.buttonFilter = $stateParams.buttonFilter;
        loadPageData(true);

        $(window).scroll(function() {
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
        $scope.openProductCard = function(id) {
            $state.go('productCard', {id: id});
        };
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
        $scope.onPropertyFilterCheckboxChange = function() {
            loadPageData(true);
        };

        function loadPageData(resetPageIndex) {
            var params = {};
            if($scope.dataLoading || (!resetPageIndex && $scope.products.length == $scope.totalCount)) {
                return;
            }
            $scope.dataLoading = true;
            $scope.pageIndex = resetPageIndex ? 0 : $scope.pageIndex + 1;
            ['searchFilter', 'buttonFilter', 'pageSize', 'pageIndex', 'withDiscount', 'isBestseller' ].forEach(function(param) {
                params[param] = $scope[param]
            });
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