angular.module('gsoapAdminApp', ['ui.router', 'ngResource', 'gsoapAdminApp.adminControllers', 'gsoapApp.services', 'angularFileUpload', 'ngCookies', 'ui.select', 'ngSanitize', 'textAngular'])
angular.module('gsoapAdminApp').config(function ($stateProvider) {
    $stateProvider.state('index', {
        url: '',
        templateUrl: '/partials/admin/adminproductlist.html',
        controller: 'AdminProductListController'
    }).state('productForm', {
        url: '/products/edit/:id/',
        templateUrl: '/partials/admin/productform.html',
        controller: 'ProductEditController'
    }).state('newProduct', {
        url: '/product/new',
        templateUrl: '/partials/admin/productform.html',
        controller: 'ProductCreateController'
    }).state('brands', {
        url: '/brands/',
        templateUrl: '/partials/admin/adminbrandlist.html',
        controller: 'AdminBrandListController'
    }).state('brandForm', {
        url: '/brand/edit/:id/',
        templateUrl: '/partials/admin/brandform.html',
        controller: 'BrandEditController'
    }).state('newBrand', {
        url: '/brand/new',
        templateUrl: '/partials/admin/brandform.html',
        controller: 'BrandCreateController'
    }).state('articles', {
        url: '/articles/',
        templateUrl: '/partials/admin/adminarticlelist.html',
        controller: 'AdminArticleListController'
    }).state('articleForm', {
        url: '/article/edit/:id/',
        templateUrl: '/partials/admin/articleform.html',
        controller: 'ArticleEditController'
    }).state('newArticle', {
        url: '/article/new',
        templateUrl: '/partials/admin/articleform.html',
        controller: 'ArticleCreateController'
    }).state('buttonFilters', {
        url: '/buttonfilters/',
        templateUrl: '/partials/admin/buttonfilterlist.html',
        controller: 'ButtonFilterListController'
    }).state('newButtonFilter', {
        url: '/buttonfilter/new',
        templateUrl: '/partials/admin/buttonfilterform.html',
        controller: 'ButtonFilterCreateController'
    }).state('buttonFilterForm', {
        url: '/buttonfilter/:id/',
        templateUrl: '/partials/admin/buttonfilterform.html',
        controller: 'ButtonFilterEditController'
    }).state('orders', {
        url: '/orders/',
        templateUrl: '/partials/admin/orderlist.html',
        controller: 'OrderListController'
    }).state('orderForm', {
        url: '/orders/:id/',
        templateUrl: '/partials/admin/orderform.html',
        controller: 'OrderFormController'
    }).state('promocodes', {
        url: '/promocodes/',
        templateUrl: '/partials/admin/promocodes.html',
        controller: 'PromocodesController'
    });
}).run(function ($state) {
    $state.go('index');
});