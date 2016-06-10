angular.module('gsoapAdminApp.adminControllers')
    .controller('ButtonFilterEditController', ['$scope', '$stateParams', 'ButtonFilter', function($scope, $stateParams, ButtonFilter) {
        $scope.buttonFilter = ButtonFilter.get({id: $stateParams.id}, function() {
        });
    }])
    .controller('ButtonFilterCreateController', ['$scope', 'ButtonFilter', function($scope, ButtonFilter) {
        $scope.buttonFilter = new ButtonFilter();
        $scope.buttonFilter.filters = [];
    }])
    .controller('ButtonFilterFormController', ['$scope', '$state', function($scope, $state) {
        $scope.addFilter = function() {
            $scope.buttonFilter.filters.push({
                name: '',
                type: '',
                properties: ['']
            });
        };
        $scope.deleteFilter = function(filter) {
            removeArrayMember($scope.buttonFilter.filters, filter);
        };
        $scope.addProperty = function(filter) {
            filter.properties.push('');
        };
        $scope.deleteProperty = function(filter, property) {
            removeArrayMember(filter.properties, property);
        };
        $scope.back = function() {
            $state.go('index');
        };
        $scope.submitButtonFilter = function() {
            if($scope.buttonFilter._id) {
                $scope.buttonFilter.$update({id: $scope.buttonFilter._id}, function() {
                    $state.go('buttonFilters');
                });
            } else {
                $scope.buttonFilter.$save(function(result) {
                    $state.go('indbuttonFiltersex');
                });
            }
        };

        function removeArrayMember(array, entry) {
            array.splice(array.indexOf(entry), 1);
        }
    }]);

