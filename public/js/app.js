angular.module('gsoapApp', ['ui.router', 'ngResource', 'gsoapApp.controllers', 'gsoapApp.services', 'angularFileUpload', 'ngCookies'])
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
    }).state('productForm', {
        url: '/products/edit/:id/',
        templateUrl: '/partials/productform.html',
        controller: 'ProductEditController'
    }).state('newProduct', {
        url: '/product/new',
        templateUrl: '/partials/productform.html',
        controller: 'ProductCreateController'
    }).state('brands', {
        url: '/brands/',
        templateUrl: '/partials/brandlist.html',
        controller: 'BrandListController'
    }).state('newBrand', {
        url: '/brand/new',
        templateUrl: '/partials/brandform.html',
        controller: 'BrandCreateController'
    }).state('cartProductList', {
        url: '/cart/',
        templateUrl: '/partials/cartproductlist.html',
        controller: 'CartProductListController'
    }).state('newButtonFilter', {
        url: '/buttonfilter/new',
        templateUrl: '/partials/buttonfilterform.html',
        controller: 'ButtonFilterCreateController'
    }).state('buttonFilterForm', {
        url: '/buttonfilter/:id/',
        templateUrl: '/partials/buttonfilterform.html',
        controller: 'ButtonFilterEditController'
    }).state('orders', {
        url: '/orders/',
        templateUrl: '/partials/orderlist.html',
        controller: 'OrderListController'
    });
}).run(function ($state) {
    $state.go('index');
});