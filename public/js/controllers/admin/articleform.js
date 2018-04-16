angular.module('gsoapAdminApp.adminControllers')
    .controller('ArticleEditController', ['$scope', '$stateParams', 'Article', function($scope, $stateParams, Article) {
        $scope.article = Article.get({id: $stateParams.id}, function() {
            $scope.boughtTogetherProductIds = $scope.article.boughtTogetherProductIds;
        });
    }])
    .controller('ArticleCreateController', ['$scope', 'Article', function($scope, Article) {
        $scope.article = new Article();
        $scope.article.boughtTogetherProductIds = [];
        $scope.boughtTogetherProductIds = $scope.article.boughtTogetherProductIds;
    }])
    .controller('ArticleFormController', ['$scope', '$state', 'Product', 'FileUploader', function($scope, $state, Product, FileUploader) {
        $scope.fullProductsList = Product.query({}, function(data) {
        });
        $scope.uploader = new FileUploader({
            url: 'admin/upload/article/image/'
        });
        $scope.uploader.onAfterAddingFile = function(fileItem) {
            $scope.uploader.uploadAll();
        };
        $scope.uploader.onCompleteItem = function(fileItem, response) {
            response.success && ($scope.article.imageName = response.imageName);
            $('[uploader]').val(null);
        };

        $scope.submitArticle = function() {
            if($scope.article._id) {
                $scope.article.$update({id: $scope.article._id}, function() {
                    $state.go('articles');
                });
            } else {
                $scope.article.$save(function(result) {
                    $state.go('articles');
                });
            }
        };
        $scope.back = function() {
            $state.go('articles');
        };
    }]);

