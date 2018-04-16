angular.module('gsoapApp.controllers')
    .controller('ArticleCardController', ['$scope', '$state', '$stateParams', 'Article', function($scope, $state, $stateParams, Article) {
        $scope.products = [];

        $scope.article = Article.get({id: $stateParams.id}, function(data) {
            $scope.products = data.boughtTogetherProducts;
        });
    }]);