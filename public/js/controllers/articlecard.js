angular.module('gsoapApp.controllers')
    .controller('ArticleCardController', ['$scope', '$state', '$stateParams', 'Article', function($scope, $state, $stateParams, Article) {
        loadRecord($stateParams.id);

        function loadRecord(id) {
            $scope.article = Article.get({id: id}, function(data) {
            });
        }
    }]);