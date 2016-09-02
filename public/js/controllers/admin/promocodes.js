angular.module('gsoapAdminApp.adminControllers').controller('PromocodesController', ['$scope', '$state', 'Promocode', function($scope, $state, Promocode) {
        loadPageData();
        $scope.promocode = new Promocode();

        $scope.openOrderForm = function(id) {
            $state.go('orderForm', {id: id});
        };
        $scope.tryDeletePromocode = function(id) {
            if(window.confirm('Вы уверены, что хотите удалить промокод?')) {
                Promocode.delete({id: id}, function() {
                    loadPageData();
                });
            }
        };
        $scope.submitPromocode = function() {
            $scope.promocode.$save(function(result) {
                $scope.promocode = new Promocode();
                loadPageData();
            });
        };
        $scope.back = function() {
            $state.go('brands');
        };

        function loadPageData() {
            $scope.promocodes = Promocode.query({}, function(data) {
            });
        }
}]);