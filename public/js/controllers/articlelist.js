angular.module('gsoapApp.controllers').controller('ArticleListController', ['$scope', '$state', 'Article', function($scope, $state, Article) {
    $scope.articles = Article.query({}, function(data) {
    });
}]);