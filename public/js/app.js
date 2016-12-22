angular.module('gsoapApp', ['ui.router', 'ngResource', 'ngSanitize', 'gsoapApp.controllers', 'gsoapApp.services', 'ngCookies', 'angular-carousel', 'bw.paging'])
angular.module('gsoapApp').config(function ($stateProvider) {
    $stateProvider.state('index', {
        url: '?buttonFilter',
        templateUrl: '/partials/main.html',
        controller: 'MainProductListController',
        reloadOnSearch: false
    }).state('products', {
        url: '/!/products_catalog/:buttonFilterId',
        templateUrl: '/partials/mainproductlist.html',
        controller: 'MainProductListController'
    }).state('productCard', {
        url: '/!/products/:id/',
        templateUrl: '/partials/productcard.html',
        controller: 'ProductCardController'
    }).state('brands', {
        url: '/!/brands/',
        templateUrl: '/partials/brandlist.html',
        controller: 'BrandListController'
    }).state('brandCard', {
        url: '/!/brands/:name/',
        templateUrl: '/partials/brandcard.html',
        controller: 'BrandCardController'
    }).state('articles', {
        url: '/!/articles/',
        templateUrl: '/partials/articlelist.html',
        controller: 'ArticleListController'
    }).state('articleCard', {
        url: '/!/articles/:id/',
        templateUrl: '/partials/articlecard.html',
        controller: 'ArticleCardController'
    }).state('cartProductList', {
        url: '/!/cart/',
        templateUrl: '/partials/cart.html',
        controller: 'CartProductListController'
    }).state('about', {
        url: '/!/about/',
        templateUrl: '/partials/simplepages/about.html',
        controller: ''
    }).state('delivery', {
        url: '/!/delivery/',
        templateUrl: '/partials/simplepages/delivery.html',
        controller: ''
    }).state('contacts', {
        url: '/!/contacts/',
        templateUrl: '/partials/simplepages/contacts.html',
        controller: ''
    });
}).run(function ($state) {
    $state.go('index');
});