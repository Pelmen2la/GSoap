angular.module('gsoapAdminApp.adminControllers').controller('DiscountsController', ['$scope', '$state', 'Discount', 'Brand', 'Product',
    function($scope, $state, Discount, Brand, Product) {
        $scope.brands = Brand.query({}, function(data) {
        });
        loadPageData();
        $scope.discount = new Discount({
            productIds: ['']
        });
        $scope.fullProductsList = Product.query({}, function(data) {
        });

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
        $scope.getProductNames = function(productIds) {
            return productIds.map(function(id) {
                var prod = $scope.fullProductsList.find(function(product) {
                    return product._id === id;
                });
                return prod ? prod.name : '';
            }).join(', ');
        };

        function loadPageData() {
            $scope.Discounts = Discount.query({}, function(data) {
            });
        }
    }]);