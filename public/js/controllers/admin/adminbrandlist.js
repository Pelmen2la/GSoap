angular.module('gsoapAdminApp.adminControllers').controller('AdminBrandListController', ['$scope', '$state', 'Brand',
    function($scope, $state, Brand) {
        loadPageData();

        $scope.openBrandForm = function(name) {
            $state.go('brandForm', {name: name});
        };
        $scope.tryDeleteBrand = function(id) {
            if(window.confirm('Вы уверены, что хотите удалить продукт?')) {
                Brand.delete({id: id}, function() {
                    loadPageData();
                });
            }
        };

        function loadPageData(resetPageIndex) {
            $scope.brands = Brand.query({}, function(data) {
            });
        }
    }]);