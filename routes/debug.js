'use strict';

var mongoose = require('mongoose'),
    fs = require('fs'),
    path = require('path'),
    Jimp = require('jimp');

var Product = mongoose.model('product'),
    Brand = mongoose.model('brand'),
    ButtonFilter = mongoose.model('buttonFilter');

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
        var name = [getRandomName(), getRandomNumber(), getRandomAppointment()].join(' ');
        return name;
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

    function getRandomCapacityUnit() {
        return arrRandom(['gram', 'milliliters']);
    }

    function getBrands() {
        return ['Мастерская Олеси Мустаевой', 'Jurassic spa', 'Weleda', 'Sante', 'Mi&Ko', 'OZ!Organic Oze']
    }

    function getRandomBrand() {
        return arrRandom(getBrands());
    }

    function getType() {
        return arrRandom(['tonic', 'cream', 'mask', 'shampoo', 'balm', 'hairDye', 'deodorants', 'envelopment', 'soap',
            'beldi', 'showerGel', 'scrub', 'bashSalt', 'bubbleBall', 'powder', 'purification', 'base', 'essential']);
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

    function getAdditionalInfo() {
        return random(1) ? '' : arrRandom([
            'Глинка посоны',
            'Содержит котят',
            'БЕЗ ГМО',
            'Лада седан баклажан',
            'Какое-то фейковое инфо',
            'Охохохо'
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
            capacityUnit: getRandomCapacityUnit(),
            brand: getRandomBrand(),
            type: getType(),
            properties: getProperties(),
            description: getDescription(),
            use: getDescription(),
            ingredients: getDescription(),
            additionalInfo: getAdditionalInfo(),
            reviews: getReviews(),
            discount: getDiscount(),
            isBestseller: getIsBestseller(),
            stockCount: getStockCount(),
            orderCount: getOrderCount(),
            isActive: true,
            isHiddenInList: false
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

    app.get('/utils/products/setproperty', function(req, res, next) {
        var query = req.query,
            propertyName = query.propertyName,
            value = query.value;
        if(!propertyName || value === undefined ) {
            res.json('wrong params');
        }
        Product.find(null, function(err, data) {
            if(err) return next(err);
            data.forEach(function(entry) {
                entry[propertyName] = value;
                entry.save();
            });
            res.json('done');
        });
    });

    app.get('/utils/products/brandstoids', function(req, res, next) {
        Brand.find({}, function(err, brandsData) {
            var brandsHash = {};
            brandsData.forEach(function(brand) {
                brand.id = transliterate(brand.name);
                brand.save();
            });
            res.json('done');
        });
    });

    app.get('/utils/products/createsmallimages', function(req, res, next) {
        var imagesFolderPath = './public/resources/images/products/';
        fs.readdir(imagesFolderPath, function(err, files) {
            files.forEach(function(fileName) {
                if(fileName.indexOf('.jpg') > -1 || fileName.indexOf('.png') > -1) {
                    Jimp.read(path.join(imagesFolderPath, fileName), function(err, image) {
                        var isAutoHeight = image.bitmap.height < image.bitmap.width,
                            targetPath = path.join(imagesFolderPath, 'small', fileName);
                        image.resize(isAutoHeight ? 400 : Jimp.AUTO, isAutoHeight ? Jimp.AUTO : 400).quality(60).write(targetPath);
                    });
                }
            });
        });
        res.json('processing');
    });

    app.get('/utils/products/createsmallimages/:filename', function(req, res, next) {
        var imagesFolderPath = './public/resources/images/products/',
            fileName = req.params.filename;
        Jimp.read(path.join(imagesFolderPath, fileName), function(err, image) {
            var isAutoHeight = image.bitmap.height < image.bitmap.width,
                targetPath = path.join(imagesFolderPath, 'small', fileName);
            image.resize(isAutoHeight ? 400 : Jimp.AUTO, isAutoHeight ? Jimp.AUTO : 400).quality(60).write(targetPath);
        });
        res.json('processing');
    });

    app.get('/utils/buttonfilters/movetoarray', function(req, res, next) {
        ButtonFilter.find(null, function(err, data) {
            if(err) return next(err);
            data.forEach(function(entry) {
                entry.productTypes = [entry.filterType];
                entry.save();
            });
            res.json('done');
        });
    });

    app.get('/utils/transliterate/products', function(req, res, next) {
        Product.find({}, function(err, data) {
            data.forEach(function(entry) {
                entry.id = transliterate(entry.name || '');
                entry.save();
            });
        });
        res.json('products transliterating');
    });

    app.get('/utils/set_buttonfilters_ids', function(req, res, next) {
        ButtonFilter.find({}, function(err, data) {
            data.forEach(function(buttonFilter) {
                buttonFilter.filters.forEach(function(filter) {
                    filter.id = transliterate((filter.productTypes.length ? filter.productTypes.join('_') : '') + '_' +
                                (filter.properties.length ? filter.properties.join('_') : ''));
                });
                buttonFilter.save();
            });
        });
        res.json('button filters transliterating');
    });

    function transliterate(text) {
        var rus = "щ   ш  ч  ц  ю  я  ё  ж  ъ  ы э а б в г д е з и й к л м н о п р с т у ф х ь".split(/ +/g),
            eng = "shh sh ch cz yu ya yo zh `` i e a b v g d e z i j k l m n o p r s t u f x `".split(/ +/g),
            engToRus = false,
            x;
        for(x = 0; x < rus.length; x++) {
            text = text.split(engToRus ? eng[x] : rus[x]).join(engToRus ? rus[x] : eng[x]);
            text = text.split(engToRus ? eng[x].toUpperCase() : rus[x].toUpperCase()).join(engToRus ? rus[x].toUpperCase() : eng[x].toUpperCase());
        }
        return text.replace(/\s/g, '_').replace(/[\W]/g, '')
    }
};