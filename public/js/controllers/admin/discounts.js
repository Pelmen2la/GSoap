angular.module('gsoapAdminApp.adminControllers').controller('DiscountsController', ['$scope', '$state', 'Discount', 'Brand', function($scope, $state, Discount, Brand) {
    $scope.brands = Brand.query({}, function(data) {
    });
    loadPageData();
    $scope.discount = new Discount();

    $scope.tryDeleteDiscount = function(id) {
        if(window.confirm('Вы уверены, что хотите удалить скидку?')) {
            Discount.delete({id: id}, function() {
                loadPageData();
            });
        }
    };
    $scope.submitDiscount = function() {
        $scope.discount.$save(function(result) {
            $scope.discount = new Discount();
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
        $scope.Discounts = Discount.query({}, function(data) {
        });
    }
}]);