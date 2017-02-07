angular.module('gsoapApp.controllers', []);

angular.module('gsoapApp.controllers')
    .controller('MainController', ['$scope', '$state', '$stateParams', '$cookies', '$http', 'Utils', 'ButtonFilter', 'StringResources',
        function($scope, $state, $stateParams, $cookies, $http, Utils, ButtonFilter, StringResources) {
            ensureProductsInCart();
            $scope.cartText = '';
            $scope.carouselIndex = 0;
            $scope.subscribeEmail = '';
            $scope.carouselImages = ['NewLogona.jpg'].map(Utils.getCarouselImageUrl);
            $scope.filterButtonsData = ButtonFilter.query({}, function() {
            });
            $scope.utils = Utils;
            $scope.stringResources = StringResources;

            $scope.onBuyProductButtonClick = function(e, product, count) {
                ensureProductsInCart();
                count = count || 1;
                Utils.moveProductIconToCart({left: e.pageX, top: e.pageY}, product.imageName);
                for(var entry, i = 0; entry = $scope.cartProducts[i]; i++) {
                    if(entry.name == product.name && entry.capacityInfo.capacity == product.selectedCapacity.capacity) {
                        entry.count += count;
                        return;
                    }
                }
                $scope.cartProducts.push({
                    id: product.id || product._id,
                    name: product.name,
                    imageName: product.imageName,
                    capacityInfo: product.selectedCapacity,
                    capacityUnit: product.capacityUnit,
                    count: count,
                    discount: product.discount,
                    stockCount: product.stockCount,
                    orderCount: product.orderCount,
                    brandId: product.brandId,
                    type: product.type
                });
            };
            $scope.onFilterButtonClick = function(filter) {
                $scope.changeView('products');
            };
            $scope.changeView = function(name, params) {
                $state.go(name, params, {reload: $state.current.name === name});
            };
            $scope.onUpButtonClick = function() {
                document.body.scrollTop = 0;
                document.getElementsByTagName('HTML')[0].scrollTop = 0;
            };
            $scope.onButtonFilterClick = function() {
                window.setTimeout(function() {
                    $state.reload();
                }, 0);
            };
            $scope.onSubscribeButtonClick = function() {
                if($scope.utils.validateEmail($scope.subscribeEmail)) {
                    $http({
                        method: 'POST',
                        url: '/subscribe/',
                        data: { email: $scope.subscribeEmail }
                    }).then(function() {
                        $scope.subscribeEmail = '';
                    }, function() {
                    });
                }
            };

            function ensureProductsInCart() {
                $scope.cartProducts = $cookies.getObject('cartProducts') || [];
            }
        }]);