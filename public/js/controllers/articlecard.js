angular.module('gsoapApp.controllers')
    .controller('ArticleCardController', ['$scope', '$state', '$stateParams', 'Article', function($scope, $state, $stateParams, Article) {
        $scope.products = [];

        $scope.article = Article.get({id: $stateParams.id}, function(data) {
            (data.boughtTogetherProducts || []).forEach(function(p) {
                p.selectedCapacity = p.capacityList[0];
            });
            $scope.products = data.boughtTogetherProducts;
        });
    }]);