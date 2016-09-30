angular.module('gsoapApp.controllers').controller('MainProductListController', ['$scope', '$state', '$stateParams', 'Product',
    function($scope, $state, $stateParams, Product) {
        $scope.searchFilter = '';
        $scope.pagingOptions = {
            pageIndex: 1,
            pageSize: 24,
            totalItemsCount: 0
        };
        $scope.withDiscount = !!$stateParams.withDiscount;
        $scope.isBestseller = !!$stateParams.isBestseller;
        $scope.buttonFilter = $stateParams.buttonFilter;
        if(!$scope.products) {
            $scope.products = [];
            loadPageData();
        }

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
        $scope.onPagerClick = function(pageIndex) {
            $scope.pagingOptions.pageIndex = pageIndex;
            loadPageData();
        };
        $scope.someFn = function()
        {
            var a = $scope;
            debugger;
        };

        function loadPageData() {
            var params = {};
            ['searchFilter', 'buttonFilter', 'pagingOptions', 'withDiscount', 'isBestseller' ].forEach(function(param) {
                params[param] = $scope[param]
            });
            Product.query(params, function(data) {
                $scope.pagingOptions.totalItemsCount = data.pop();
                data.forEach(function(product) {
                    product.selectedCapacity = product.capacityList[0];
                });
                $scope.products = data;
                document.body.scrollTop = $('.products-container').offset().top
            });
        }
    }]);