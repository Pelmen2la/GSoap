angular.module('gsoapApp.services', []);

angular.module('gsoapApp.services')
    .factory('Product', function($resource) {
        var product = $resource('/products/:id', null, {
            update: {
                method: 'PUT'
            }
        });
        product.prototype.getId = function() {
            return this.id || this._id;
        };
        return product;
    })
    .factory('Brand', function($resource) {
        return $resource('/brands/:id', null, {
            update: {
                method: 'PUT'
            }
        });
    })
    .factory('Article', function($resource) {
        return $resource('/articles/:id', null, {
            update: {
                method: 'PUT'
            }
        });
    })
    .factory('ButtonFilter', function($resource) {
        return $resource('/buttonFilters/:id', null, {
            update: {
                method: 'PUT'
            }
        });
    }).factory('Order', function($resource) {
        return $resource('/orders/:id', null, {
            update: {
                method: 'PUT'
            }
        });
    }).factory('Promocode', function($resource) {
        return $resource('/promocodes/:id', null, {
            update: {
                method: 'PUT'
            }
        });
    });