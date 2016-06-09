angular.module('gsoapApp.controllers')
    .controller('ProductCardController', ['$scope', '$state', '$stateParams', '$http', 'Product', function ($scope, $state, $stateParams, $http, Product) {
        $scope.selectedCapacity = {};
        loadRecord($stateParams.id);
        initReview();


        $scope.openBrandCard = function(brand) {
            $state.go('brandCard', { name: brand });
        };
        $scope.onSendReviewButtonClick = function() {
            $http({
                method: 'POST',
                url: '/products/' + $scope.product._id + '/addreview',
                data: $scope.review
            }).then(function(data) {
                loadRecord($scope.product._id);
            }, function() {
                alert('Не удалось добавить отзыв');
            });

            initReview();
        };
        $scope.back = function() {
            $state.go('index');
        };

        function loadRecord(id) {
            $scope.product = Product.get({id: id}, function() {
                $scope.product.selectedCapacity = $scope.product.capacityList[0];
            });
        }
        function initReview() {
            $scope.review = {
                customerName: '',
                text: ''
            }
        }
    }]);