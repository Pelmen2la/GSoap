angular.module('gsoapAdminApp.adminControllers').controller('IsActiveSwitcherController', ['$scope', '$http', 'Product',
    function($scope, $http, Product) {
        setInitialData();

        $scope.isActiveOptions = {
            true: 'Есть в наличии',
            false: 'Нет в наличии'
        };

        $scope.fullProductsList = Product.query({}, function(data) {
        });

        $scope.submit = function() {
            $http({
                method: 'POST',
                url: '/admin/setisactive/',
                data: $scope.isActiveProps
            }).then(function() {
                setInitialData();
            }, function() {
            });
        };

        function setInitialData() {
            $scope.isActiveProps = {
                isActive: false,
                productIds: []
            };
        };
    }]);