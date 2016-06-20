angular.module('gsoapAdminApp.adminControllers').controller('AdminBrandListController', ['$scope', '$state', 'Brand',
    function($scope, $state, Brand) {
        loadPageData();

        $scope.openBrandForm = function(name) {
            $state.go('brandForm', {name: name});
        };
        $scope.tryDeleteBrand = function(id) {
            if(window.confirm('Вы уверены, что хотите удалить бренд?')) {
                Brand.delete({id: id}, function() {
                    loadPageData();
                });
            }
        };

        function loadPageData() {
            $scope.brands = Brand.query({}, function(data) {
            });
        }
    }]);