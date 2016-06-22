'use strict';

var mongoose = require('mongoose');

var Product = mongoose.model('product');
var Brand = mongoose.model('brand');
var ButtonFilter = mongoose.model('buttonFilter');

module.exports = function(app) {
    function random(max, min) {
        min = min ? min : 0;
        return Math.round((max - min) * Math.random() + min);
    }

    function arrRandom(arr) {
        return arr[random(arr.length - 1)];
    }

    function spliceArrayRandom(arr) {
        arr.forEach(function(item) {
            random(1) == 1 && arr.length > 1 && arr.splice(arr.indexOf(item), 1);
        });
        return arr;
    }

    function getRandomName() {
        return arrRandom(['Крем', 'Маска', 'Скраб', 'Шампунь', 'Мыло']);
    }

    function getRandomNumber() {
        return '№' + random(10);
    }

    function getRandomAppointment() {
        return arrRandom(['для лица', 'для тела', 'для ног', 'для детей', 'для волос']);
    }

    function getProductName() {
        return [getRandomName(), getRandomNumber(), getRandomAppointment()].join(' ');
    }

    function getImageName(index) {
        return 'product' + random(7) + '.jpg';
    }

    function getPrice() {
        return random(1000, 100);
    }

    function getCapacityList() {
        return spliceArrayRandom([50, 100, 150, 200, 250, 300]).map(function(capacity) {
            return {
                capacity: capacity,
                price: getPrice()
            }
        });
    }

    function getBrands() {
        return ['Мастерская Олеси Мустаевой', 'Jurassic spa', 'Weleda', 'Sante', 'Mi&Ko', 'OZ!Organic Oze']
    }

    function getRandomBrand() {
        return arrRandom(getBrands());
    }

    function getType() {
        return arrRandom(['tonic', 'cream', 'mask', 'shampoo', 'balm', 'hairDye', 'deodorants', 'envelopment', 'soap',
            'beldi', 'showerGel', 'scrub', 'bashSalt', 'bubbleBall', 'powder', 'purification', 'baseEssential']);
    }

    function getProperties() {
        return spliceArrayRandom(['face', 'hair', 'body', 'hands', 'legs', 'bath', 'decorativeCosmetics', 'oil']);
    }

    function getDescription() {
        return arrRandom([
            'Налетай, торопись, покупай живопись.',
            'Один крем хорошо, а два - хорошохорошо.',
            'Утром деньги, вечером крем',
            'Детям мороженное, бабам мыло, главное не перепутай',
            'За чужой счет моются даже трезвенники и язвенники',
            'Моются все!',
            'А у вас не будет такого же, только с перламутровым цветом?',
            'Я требую продолжения купания'
        ]);
    }

    function getReviewText() {
        return arrRandom(['Отлично', 'Норма', 'Мыльцо огонь', 'Дайте два', 'Ололо затралено', 'Ябпомылся']);
    }

    function getCustomerName() {
        return arrRandom(['Айслин', 'Нелка', 'Циель', 'Луна', 'Тамика', 'Валеска']);
    }

    function getReviews() {
        var reviews = [];
        for(var i = 0; i < random(5, 2); i++) {
            reviews.push({
                customerName: getCustomerName(),
                text: getReviewText()
            });
        }
        return reviews;
    }

    function getIsBestseller() {
        return !random(6);
    }

    function getDiscount() {
        return !random(4) ? random(25) : 0;
    }

    function getStockCount() {
        return random(2) ? random(20) : 0;
    }

    function getOrderCount() {
        return random(1) ? random(3) : 0;
    }

    function getRandomProduct() {
        var product = {
            name: getProductName(),
            imageName: getImageName(),
            capacityList: getCapacityList(),
            brand: getRandomBrand(),
            type: getType(),
            properties: getProperties(),
            description: getDescription(),
            reviews: getReviews(),
            discount: getDiscount(),
            isBestseller: getIsBestseller(),
            stockCount: getStockCount(),
            orderCount: getOrderCount()
        };
        return product;
    };

    function getBrand(name, index) {
        return {
            name: name,
            imageName: 'brand' + index + '.jpg',
            description: getDescription()
        }
    }

    app.get('/test/products/create', function(req, res) {
        for(var brandName, i = 0; brandName = getBrands()[i]; i++) {
            var brand = new Brand(getBrand(brandName, i));
            brand.save();
        }
        var i = 0,
            createProduct = function() {
                var product = new Product(getRandomProduct());
                i++;
                product.save(function() {
                    i < 100 ? createProduct() : res.json({result: 'created'});
                });
            };
        createProduct();
    });

    app.get('/test/products/deleteall', function(req, res, next) {
        Product.find(null, function(err, data) {
            if(err) return next(err);
            data.forEach(function(entry) {
                entry.remove();
            });
            Brand.find(null, function(err, data) {
                data.forEach(function(entry) {
                    entry.remove();
                });
                ButtonFilter.find(null, function(err, data) {
                    data.forEach(function(entry) {
                        entry.remove();
                    });
                    res.json('deleting');
                });
            });
        });
    });
};