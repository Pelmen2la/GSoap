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
                            discount: data.discount,
                            productType: data.productType
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
            $scope.$parent.cartProducts = [];
            $scope.oderIndex = 1;
            order.$save(function(data) {
            });
        };
    }]);