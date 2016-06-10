angular.module('gsoapApp.services', []);

angular.module('gsoapApp.services')
    .factory('Product', function($resource) {
        return $resource('/products/:id', null, {
            update: {
                method: 'PUT'
            }
        });
    })
    .factory('Brand', function($resource) {
        return $resource('/brands/:id', null, {
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
    });