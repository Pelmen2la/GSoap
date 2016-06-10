angular.module('gsoapAdminApp.adminControllers', []);

angular.module('gsoapAdminApp.adminControllers')
    .controller('AdminMainController', ['$scope', '$state', 'Utils', 'StringResources', function($scope, $state, Utils, StringResources) {
        $scope.utils = Utils;
        $scope.stringResources = StringResources;
    }]);