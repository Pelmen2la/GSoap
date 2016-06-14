angular.module('gsoapApp.services').service('Utils', function ($resource) {
    this.getProductImageUrl = function(product) {
        return getImageUrl(product, 'products');
    };
    this.getBrandImageUrl = function(brand) {
        return getImageUrl(brand, 'brands');
    };
    this.getProductCapacityText = function(product) {
        return getJoinedProperties(product.capacityList, 'capacity');
    };
    this.getProductPricesText = function(product) {
        return getJoinedProperties(product.capacityList, 'price');
    };
    this.getProductPriceText = function(product) {
        if(!product.capacityList) {
            return '';
        }
        var prices = product.capacityList.map(function(entry) {
                return entry.price;
            }),
            min = Math.min.apply(Math, prices),
            max = Math.max.apply(Math, prices);
        return min === max ? min : min + '-' + max + ' Р';
    };
    this.getNextDayDate = function(key, value) {
        var date = new Date();
        date.setDate(date.getDate() + 1);
        return date;
    };
    this.isProductCountAvailable = function(product, count) {
        return count <= product.stockCount - product.orderCount;
    };
    this.getProductPrice = function(product, selectedCapacity) {
        if(!selectedCapacity) {
            return 0;
        }
        return (selectedCapacity.price * (1 - product.discount / 100)).toFixed(0);
    };

    function getImageUrl(object, folderName) {
        return object && object.imageName ? '/resources/images/' + folderName + '/' + object.imageName : '';
    }
    function getJoinedProperties(objectArray, propertyName) {
        if(!objectArray) {
            return '';
        }
        var values = objectArray.map(function(entry) {
            return entry[propertyName];
        });
        return values.join('/');
    }
});