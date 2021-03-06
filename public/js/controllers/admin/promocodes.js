angular.module('gsoapAdminApp.adminControllers').controller('PromocodesController', ['$scope', '$state', 'Promocode', 'Brand', function($scope, $state, Promocode, Brand) {
    $scope.brands = Brand.query({}, function(data) {
    });
    loadPageData();
    $scope.promocode = new Promocode();

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
    $scope.getBrandName = function(brandId) {
        var brand = $scope.brands.find(function(brand) {
            return brand._id === brandId;
        });
        return brand ? brand.name : '';
    };

    function loadPageData() {
        $scope.promocodes = Promocode.query({}, function(data) {
        });
    }
}]);