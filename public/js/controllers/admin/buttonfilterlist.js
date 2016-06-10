angular.module('gsoapAdminApp.adminControllers').controller('ButtonFilterListController', ['$scope', '$state', 'ButtonFilter',
    function($scope, $state, ButtonFilter) {
        loadPageData();

        $scope.openFilterButtonForm = function(id) {
            $state.go('buttonFilterForm', {id: id});
        };
        $scope.tryDeleteFilterButton = function(id) {
            if(window.confirm('Вы уверены, что хотите удалить группу фильров?')) {
                ButtonFilter.delete({id: id}, function() {
                    loadPageData();
                });
            }
        };

        function loadPageData(resetPageIndex) {
            $scope.filterButtonsData = ButtonFilter.query({}, function() {
            });
        }
    }]);