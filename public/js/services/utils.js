angular.module('gsoapApp.services').service('Utils', function($resource) {
    this.getProductImageUrl = function(product) {
        return getImageUrl(product, 'products');
    };
    this.getBrandImageUrl = function(brand) {
        return getImageUrl(brand, 'brands');
    };
    this.getArticleImageUrl = function(article) {
        return getImageUrl(article, 'articles');
    };
    this.getCarouselImageUrl = function(brand) {
        return getImageUrl(brand, 'carousel');
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
    this.getProductPrice = function(product, selectedCapacity, count, skipFormat, withDiscount) {
        if(!selectedCapacity || !count) {
            return 0;
        }
        var discount = withDiscount ? product.discount || 0 : 0,
            price = (selectedCapacity.price * (1 - discount / 100) * (count || 1)).toFixed(0);
        return skipFormat ? parseInt(price) : this.formatPrice(price);
    };
    this.getProductsInfo = function(products, skipFormat) {
        var count = 0,
            price = 0,
            me = this;
        products.forEach(function(product) {
            count += product.count || 1;
            price += parseInt(me.getProductPrice(product, product.capacityInfo, product.count || 1, true, true));
        }.bind(this));
        return {
            count: count,
            price: skipFormat ? price : this.formatPrice(price)
        }
    };
    this.formatPrice = function(price, withoutSign) {
        var parts = [];
        price = price.toString();
        while(price.length > 3) {
            var dotIndex = price.length - 3;
            parts.unshift(price.substring(dotIndex));
            price = price.substring(0, dotIndex)
        }
        parts.unshift(price);
        return parts.join('.') + (withoutSign ? '' : ' руб.');
    };
    this.moveProductIconToCart = function(offset, imageName) {
        var imageUrl = getImageUrl({ imageName: imageName }, 'products'),
            icon = createElementFromString('<img class="product-fly-icon" src="' + imageUrl + '"></img>');
        document.body.appendChild(icon);
        var interval = window.setInterval(function() {
            var targetOffset = $('#MainCartIcon').offset(),
                leftDif = targetOffset.left - offset.left,
                topDif = targetOffset.top - offset.top,
                stepsCount = Math.max(Math.abs(leftDif), Math.abs(topDif)) / 10;
            if(Math.abs(offset.top - targetOffset.top) > 10) {
                offset.left += leftDif / stepsCount;
                offset.top += topDif / stepsCount;
                $(icon).offset(offset);
            } else {
                window.clearInterval(interval);
                document.body.removeChild(icon);
            }
        }, 10);
    };
    this.validateEmail = function(v) {
        var vArr = v.split('@');
        if(v.length > 254 || vArr.length !== 2) {
            return false;
        }
        return vArr[0].match(/[\wа-яА-Я\+\.\_\-\!]+/) && vArr[1].match(/[\wа-яА-Я]+\.[A-Za-zа-яА-Я]+/) && vArr[1].length <= 64;
    };
    this.getProductsCost = function(products, promocodeInfo) {
        var me = this;
        return products.reduce(function(accum, product) {
            var price = me.getProductPrice(product, product.capacityInfo, product.count, true, true),
                discount = (promocodeInfo.discount && (!promocodeInfo.brandId || promocodeInfo.brandId == product.brandId)) ? promocodeInfo.discount : 0;
            accum += Math.trunc(price * (100 - discount) / 100);
            return accum;
        }, 0);
    };
    this.getDeliveryCost = function(products, promocodeInfo, deliveryType) {
        return this.getProductsCost(products, promocodeInfo) >= 2500 || deliveryType !== 'delivery' ? 0 : 250;
    };
    this.getTotalCost = function(products, promocodeInfo, deliveryType) {
        return this.formatPrice(this.getProductsCost(products, promocodeInfo) + this.getDeliveryCost(products, promocodeInfo, deliveryType));
    };


    function getImageUrl(imageName, folderName) {
        imageName = imageName instanceof Object ? imageName.imageName : imageName;
        return imageName ? '/resources/images/' + folderName + '/' + imageName : '';
    };
    function createElementFromString(s) {
        var div = document.createElement('div');
        div.innerHTML = s;
        return div.firstChild;
    };
    function getJoinedProperties(objectArray, propertyName) {
        if(!objectArray) {
            return '';
        }
        var values = objectArray.map(function(entry) {
            return entry[propertyName];
        });
        return values.join('/');
    };
});
