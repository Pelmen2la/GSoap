angular.module('gsoapAdminApp.adminControllers')
    .controller('SliderItemEditController', ['$scope', '$stateParams', 'SliderItem', function($scope, $stateParams, SliderItem) {
        $scope.sliderItem = SliderItem.get({id: $stateParams.id}, function() {
        });
    }])
    .controller('SliderItemCreateController', ['$scope', 'SliderItem', function($scope, SliderItem) {
        $scope.sliderItem = new SliderItem();
    }])
    .controller('SliderItemFormController', ['$scope', '$state', 'FileUploader', function($scope, $state, FileUploader) {
        $scope.uploader = new FileUploader({
            url: 'admin/upload/slideritem/image/'
        });
        $scope.uploader.onAfterAddingFile = function() {
            $scope.uploader.uploadAll();
        };
        $scope.uploader.onCompleteItem = function(fileItem, response) {
            response.success && ($scope.sliderItem.imageName = response.imageName);
            $('[uploader]').val(null);
        };

        $scope.submitSliderItem = function() {
            if($scope.sliderItem._id) {
                $scope.sliderItem.$update({id: $scope.sliderItem._id}, function() {
                    $state.go('sliderItems');
                });
            } else {
                $scope.sliderItem.$save(function() {
                    $state.go('sliderItems');
                });
            }
        };
        $scope.back = function() {
            $state.go('sliderItems');
        };
    }]);

