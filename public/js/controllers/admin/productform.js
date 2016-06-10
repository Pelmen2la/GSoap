angular.module('gsoapAdminApp.adminControllers')
    .controller('ProductEditController', ['$scope', '$stateParams', 'Product', function($scope, $stateParams, Product) {
        $scope.product = Product.get({id: $stateParams.id}, function() {
        });
    }])
    .controller('ProductCreateController', ['$scope', 'Product', function($scope, Product) {
        $scope.product = new Product();
        $scope.product.capacityList = [{capacity: 0, price: 0}];
        $scope.product.properties = [];
    }])
    .controller('ProductFormController', ['$scope', '$state', 'FileUploader', 'Brand', function($scope, $state, FileUploader, Brand) {
        $scope.brands = Brand.query({}, function(data) {
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
        $scope.deleteCapacityInfo = function(capacityInfo) {
            $scope.product.capacityList.splice($scope.product.capacityList.indexOf(capacityInfo), 1);
        };
        $scope.deleteProperty = function(index) {
            $scope.product.properties.splice(index, 1);
        };
        $scope.addCapacity = function() {
            $scope.product.capacityList.push({capacity: '', price: ''});
        };
        $scope.addProperty = function() {
            $scope.product.properties.push('');
        };
        $scope.deleteReview = function(index) {
            $scope.product.reviews.splice(index, 1);
        };
    }]);

