angular.module('gsoapAdminApp.adminControllers').controller('AdminArticleListController', ['$scope', '$state', 'Article',
    function($scope, $state, Article) {
        loadPageData();

        $scope.openArticleForm = function(id) {
            $state.go('articleForm', {id: id});
        };
        $scope.tryDeleteArticle = function(id) {
            if(window.confirm('Вы уверены, что хотите удалить бренд?')) {
                Article.delete({id: id}, function() {
                    loadPageData();
                });
            }
        };

        function loadPageData() {
            $scope.articles = Article.query({}, function(data) {
            });
        }
    }]);