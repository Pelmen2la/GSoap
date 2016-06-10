angular.module('gsoapApp', ['ui.router', 'ngResource', 'gsoapApp.controllers', 'gsoapApp.services', 'ngCookies'])
angular.module('gsoapApp').config(function ($stateProvider) {
    $stateProvider.state('index', {
        url: '?buttonFilter',
        templateUrl: '/partials/mainproductlist.html',
        controller: 'MainProductListController',
        reloadOnSearch: false
    }).state('productCard', {
        url: '/products/:id/',
        templateUrl: '/partials/productcard.html',
        controller: 'ProductCardController'
    }).state('brands', {
        url: '/brands/',
        templateUrl: '/partials/brandlist.html',
        controller: 'BrandListController'
    }).state('brandCard', {
        url: '/brands/:name/',
        templateUrl: '/partials/brandcard.html',
        controller: 'BrandCardController'
    }).state('cartProductList', {
        url: '/cart/',
        templateUrl: '/partials/cartproductlist.html',
        controller: 'CartProductListController'
    });
}).run(function ($state) {
    $state.go('index');
});