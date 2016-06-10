angular.module('gsoapAdminApp.adminControllers')
    .controller('BrandEditController', ['$scope', '$stateParams', 'Brand', function($scope, $stateParams, Brand) {
        $scope.brand = Brand.get({id: $stateParams.name}, function() {
        });
    }])
    .controller('BrandCreateController', ['$scope', 'Brand', function($scope, Brand) {
        $scope.brand = new Brand();
    }])
    .controller('BrandFormController', ['$scope', '$state', 'FileUploader', function($scope, $state, FileUploader) {
        $scope.uploader = new FileUploader({
            url: 'admin/upload/brand/image/'
        });
        $scope.uploader.onAfterAddingFile = function(fileItem) {
            $scope.uploader.uploadAll();
        };
        $scope.uploader.onCompleteItem = function(fileItem, response) {
            response.success && ($scope.brand.imageName = response.imageName);
            $('[uploader]').val(null);
        };

        $scope.submitBrand = function() {
            if($scope.brand._id) {
                $scope.brand.$update({id: $scope.brand._id}, function() {
                    $state.go('brands');
                });
            } else {
                $scope.brand.$save(function(result) {
                    $state.go('brands');
                });
            }
        };
        $scope.back = function() {
            $state.go('brands');
        };
    }]);

