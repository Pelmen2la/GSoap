angular.module('gsoapAdminApp.adminControllers')
    .controller('ProductEditController', ['$scope', '$stateParams', 'Product', function($scope, $stateParams, Product) {
        $scope.product = Product.get({id: $stateParams.id}, function() {
        });
    }])
    .controller('ProductCreateController', ['$scope', 'Product', function($scope, Product) {
        $scope.product = new Product();
        $scope.product.capacityList = [{capacity: 0, price: 0}];
        $scope.product.properties = [];
        $scope.product.boughtTogetherProductIds = [];
        $scope.product.stockCount = 0;
        $scope.product.orderCount = 0;
        $scope.product.isHiddenInList = false;
    }])
    .controller('ProductFormController', ['$scope', '$state', 'FileUploader', 'Brand', 'Product', function($scope, $state, FileUploader, Brand, Product) {
        $scope.brands = Brand.query({}, function(data) {
        });
        $scope.fullProductsList = Product.query({}, function(data) {
        });
        $scope.uploader = new FileUploader({
            url: 'admin/upload/product/image/'
        });
        $scope.uploader.onAfterAddingFile = function(fileItem) {
            $scope.uploader.uploadAll();
        };
        $scope.uploader.onCompleteItem = function(fileItem, response) {
            response.success && ($scope.product.imageName = response.imageName);
            $('[uploader]').val(null);
        };

        $scope.submitProduct = function() {
            $scope.product.capacityList = $scope.product.capacityList.filter(function(capacityInfo) {
                return capacityInfo.price && capacityInfo.capacity;
            });
            $scope.product.properties = $scope.product.properties.filter(function(property) {
                return property;
            });
            if($scope.product._id) {
                $scope.product.$update({id: $scope.product._id}, function() {
                    $state.go('index');
                });
            } else {
                $scope.product.$save(function(result) {
                    $state.go('index');
                });
            }
        };
        $scope.back = function() {
            $state.go('index');
        };
        $scope.deleteArrayMember = function(array, index) {
            var properties = $scope.product.properties;
            array.splice(index, 1);
        };
        $scope.addCapacity = function(product) {
            $scope.addMemberToArray($scope.product.capacityList, {capacity: '', price: ''});
        };
        $scope.addMemberToArray = function(array, member) {
            array.push(member || '');
        };
        $scope.deleteReview = function(index) {
            $scope.product.reviews.splice(index, 1);
        };
    }]);

