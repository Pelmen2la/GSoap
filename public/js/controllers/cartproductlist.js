angular.module('gsoapApp.controllers').controller('CartProductListController', ['$scope', '$http', '$state', 'StringResources', 'Order',
    function($scope, $http, $state, StringResources, Order) {
        $scope.customerInfo = {
        };
        $scope.promocodeInfo = {
            text: '',
            cssCls: ''
        };

        $scope.removeProductFromCard = function(index) {
            confirm('Вы действительно хотите удалить продукт из заказа?') && $scope.cartProducts.splice(index, 1);
        };
        $scope.onPromocodeInputKeyUp = function() {
            window.clearTimeout($scope.promocodeInputTimeout);
            $scope.promocodeInputTimeout = window.setTimeout(function() {
                $http({
                    method: 'GET',
                    url: '/promocodes/isavailable/' + $scope.customerInfo.promocode
                }).then(function(response) {
                        var data = response.data;
                        $scope.promocodeInfo = {
                            text: data.message,
                            isAvailable: data.isAvailable,
                            brandId: data.brandId,
                            discount: data.discount
                        };
                    }, function() {
                    }
                );
            }, 100);
        };
        $scope.sendOrder = function() {
            var order = new Order({
                status: 'new',
                customerInfo: $scope.customerInfo,
                products: $scope.cartProducts
            });
            order.$save(function(data) {
                $scope.$parent.cartProducts = [];
                $scope.oderIndex = data.orderIndex;
            });
        };
        $scope.getProductsCost = function() {
            return $scope.cartProducts.reduce(function(accum, product) {
                var price = $scope.utils.getProductPrice(product, product.capacityInfo, product.count, true, true),
                    info = $scope.promocodeInfo,
                    discount = (info.discount && (!info.brandId || info.brandId == product.brandId)) ? info.discount : 0;
                accum += price * (100 - discount) / 100;
                return accum;
            }, 0);
        };
        $scope.getDeliveryCost = function() {
            return $scope.getProductsCost() >= 2500 || $scope.customerInfo.deliveryType !== 'delivery' ? 0 : 250;
        };
        $scope.getTotalCost = function() {
            return $scope.getProductsCost() + $scope.getDeliveryCost();
        };
    }]);