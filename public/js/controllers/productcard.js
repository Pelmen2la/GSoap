angular.module('gsoapApp.controllers')
    .controller('ProductCardController', ['$scope', '$state', '$stateParams', '$http', '$cookies', 'Product', 'Utils',
        function($scope, $state, $stateParams, $http, $cookies, Product, Utils) {
            $scope.selectedCapacity = {};
            $scope.orderCount = 1;
            loadRecord($stateParams.id);
            initReview();

            $scope.openBrandCard = function(brand) {
                $state.go('brandCard', {name: brand});
            };
            $scope.onSendReviewButtonClick = function() {
                $http({
                    method: 'POST',
                    url: '/products/' + $scope.product._id + '/addreview',
                    data: $scope.review
                }).then(function(data) {
                    addReviewCookie($scope.product._id);
                    loadRecord($scope.product._id);
                }, function() {
                });

                initReview();
            };

            function loadRecord(id) {
                $scope.product = Product.get({id: id}, function() {
                    $scope.product.selectedCapacity = $scope.product.capacityList[0];
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