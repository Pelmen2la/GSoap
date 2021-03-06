angular.module('gsoapApp.controllers')
    .controller('ProductCardController', ['$scope', '$state', '$stateParams', '$http', '$cookies', 'Product', 'Utils',
        function($scope, $state, $stateParams, $http, $cookies, Product, Utils) {
            $scope.selectedCapacity = {};
            $scope.orderCount = 1;
            $scope.selectedTabName = 'description';
            $scope.products = [];
            loadRecord($stateParams.id);
            initReview();

            $scope.onSendReviewButtonClick = function() {
                $http({
                    method: 'POST',
                    url: '/products/' + $scope.product.getId() + '/addreview',
                    data: $scope.review
                }).then(function(data) {
                    addReviewCookie($scope.product.getId());
                    loadRecord($scope.product.getId());
                }, function() {
                });

                initReview();
            };
            $scope.onTabClick = function(tabName) {
                $scope.selectedTabName = tabName;
            };

            function loadRecord(id) {
                $scope.product = Product.get({id: id}, function() {
                    $scope.product.selectedCapacity = $scope.product.capacityList[0];
                    $scope.product.boughtTogetherProducts.forEach(function(product) {
                        product.selectedCapacity = product.capacityList[0];
                    });
                    $scope.products = $scope.product.boughtTogetherProducts;
                });
                $scope.reviewsAllowed = isReviewsAllowed(getReviewTimes()[id]);
            };
            function initReview() {
                $scope.review = {
                    customerName: '',
                    text: ''
                }
            };
            function addReviewCookie(productId) {
                var reviewTimes = getReviewTimes();
                reviewTimes[productId] = Date.now();
                for(key in reviewTimes) {
                    if(reviewTimes.hasOwnProperty(key) && isReviewsAllowed(reviewTimes[key])) {
                        delete a[key];
                    }
                }
                $cookies.putObject('reviewTimes', reviewTimes, {expires: Utils.getNextDayDate()});
            };
            function getReviewTimes() {
                return $cookies.getObject('reviewTimes') || {}
            };
            function isReviewsAllowed(date) {
                return !date || Date.now() - date > 1000 * 60 * 60 * 24;
            };
        }]);