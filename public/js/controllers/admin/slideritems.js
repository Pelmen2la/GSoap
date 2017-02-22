angular.module('gsoapAdminApp.adminControllers').controller('SliderItemListController', ['$scope', '$state', 'SliderItem', function($scope, $state, SliderItem) {
    loadPageData();

    $scope.tryDeleteSliderItem = function(id) {
        if(window.confirm('Вы уверены, что хотите удалить слайд?')) {
            SliderItem.delete({id: id}, function() {
                loadPageData();
            });
        }
    };

    function loadPageData() {
        $scope.sliderItems = SliderItem.query({}, function(data) {
        });
    }
}]);