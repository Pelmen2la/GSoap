angular.module('gsoapApp.controllers', []);

angular.module('gsoapApp.controllers')
    .controller('MainController', ['$scope', '$state', '$stateParams', '$cookies', 'Utils', 'ButtonFilter', 'StringResources',
        function($scope, $state, $stateParams, $cookies, Utils, ButtonFilter, StringResources) {
            $scope.cartProducts = $cookies.getObject('cartProducts') || [];
            $scope.cartText = '';
            $scope.carouselIndex = 1;
            $scope.carouselImages = ['skidki_tut.jpg', 'podarok.jpg', 'dostavka_po_rf.jpg'].map(Utils.getCarouselImageUrl);
            $scope.filterButtonsData = ButtonFilter.query({}, function() {
            });
            $scope.utils = Utils;
            $scope.stringResources = StringResources;

            $scope.onBuyProductButtonClick = function(e, product, count) {
                count = count || 1;
                Utils.moveProductIconToCart({left: e.pageX, top: e.pageY}, product.imageName);
                for(var entry, i = 0; entry = $scope.cartProducts[i]; i++) {
                    if(entry.name == product.name && entry.capacityInfo.capacity == product.selectedCapacity.capacity) {
                        entry.count += count;
                        return;
                    }
                }
                $scope.cartProducts.push({
                    id: product._id,
                    name: product.name,
                    imageName: product.imageName,
                    capacityInfo: product.selectedCapacity,
                    capacityUnit: product.capacityUnit,
                    count: count,
                    discount: product.discount,
                    stockCount: product.stockCount,
                    orderCount: product.orderCount
                });
            };
            $scope.onFilterButtonClick = function(filter) {
                $scope.changeView('index', {buttonFilter: JSON.stringify(filter)});
            };
            $scope.changeView = function(name, params) {
                $state.go(name, params, {reload: $state.current.name === name});
            };
            $scope.onUpButtonClick = function() {
                document.body.scrollTop = 0;
                document.getElementsByTagName('HTML')[0].scrollTop = 0;
            };

            $(window).scroll(function() {
                $('#upButton').css('opacity', document.body.scrollTop || document.getElementsByTagName('HTML')[0].scrollTop > 150 ? 1 : 0);
            });
        }]);