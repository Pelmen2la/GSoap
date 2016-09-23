angular.module('gsoapApp.controllers').controller('CartProductListController', ['$scope', '$http', '$state', 'StringResources', 'Order',
    function($scope, $http, $state, StringResources, Order) {
        $scope.customerInfo = {
            deliveryType: 'self'
        };
        $scope.promocodeTooltipInfo = {
            text: '',
            cssCls: ''
        };
            $scope.deliveryTypes = StringResources.deliveryTypes;

        $scope.openProductCard = function(id) {
            $state.go('productCard', {id: id});
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
                        $scope.promocodeTooltipInfo = {
                            text: response.data.message,
                            isAvailable: response.data.isAvailable
                        };
                        window.promocodeTooltipInfo = $scope.promocodeTooltipInfo;
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
            order.$save(function() {
                $scope.$parent.cartProducts = [];
                $state.go('index');
            });
        }
    }]);