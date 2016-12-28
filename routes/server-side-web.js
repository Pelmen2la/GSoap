'use strict';

var mongoose = require('mongoose'),
    Products = require('./data-helpers/products'),
    ButtonFilters = require('./data-helpers/buttonfilters'),
    Article = mongoose.model('article'),
    Brand = mongoose.model('brand'),
    ButtonFilter = mongoose.model('buttonFilter'),
    Product = mongoose.model('product');

module.exports = {
    sendServerSideRenderingResult: function(req, res, escapedFragment) {
        var escapedFragmentPaths = escapedFragment.split('?'),
            pageName = escapedFragmentPaths[0],
            queryString = escapedFragmentPaths.length > 1 ? escapedFragmentPaths[2] : '';
        if(pageName[pageName.length - 1] === '/') {
            pageName = pageName.substring(0, pageName.length - 1);
        }
        try {
            if(pageName === '/articles') {
                sendArticleListResult(req, res, queryString);
                return;
            }
            if(pageName.match(/\/articles\/.+/)) {
                sendArticleCardResult(req, res, pageName.split('/')[2]);
                return;
            }
            if(pageName === '/brands') {
                sendBrandListResult(req, res, queryString);
                return;
            }
            if(pageName.match(/\/brands\/.+/)) {
                sendBrandCardResult(req, res, pageName.split('/')[2]);
                return;
            }
            if(pageName === '/cart') {
                sendResult(res, 'cartproductlist', {});
                return;
            }
            if(pageName === '') {
                sendMainPageResult(req, res, queryString);
                return;
            }
            if(pageName === '/naturalnaya_kosmetika') {
                sendProductListResult(req, res, queryString);
                return;
            }
            if(pageName.match(/\/naturalnaya_kosmetika\/\w+/)) {
                sendProductListResult(req, res, queryString, null, pageName.split('/')[2]);
                return;
            }
            if(pageName.match(/\/products\/\w+/)) {
                sendProductCardResult(req, res, pageName.split('/')[2]);
                return;
            }
            if(pageName === '/sitemap') {
                sendSiteMapResult(req, res, queryString);
                return;
            }
            sendResult(res, 'simplepages' + pageName, {});
        } catch(err) {
            sendMainPageResult(req, res, queryString);
        }


        function sendArticleListResult(req, res, queryString) {
            Article.find({}, function(err, data) {
                sendResult(res, 'articlelist', {
                    articles: data
                });
            });
        };

        function sendArticleCardResult(req, res, articleId) {
            Article.findById(articleId, function(err, article) {
                sendResult(res, 'articlecard', {
                    article: article
                });
            });
        };

        function sendBrandListResult(req, res, queryString) {
            Brand.find({}, function(err, data) {
                sendResult(res, 'brandlist', {
                    brands: data
                });
            });
        };

        function sendBrandCardResult(req, res, brandId) {
            Brand.find({id: brandId}, function(err, data) {
                var brand = data[0];
                Product.find({brandId: brand._id}, function(err, productsData) {
                    var productCategories = {};
                    productsData.forEach(function(product) {
                        var type = product.type;
                        if(type) {
                            productCategories[type] ? (productCategories[type] += 1) : (productCategories[type] = 1);
                        }
                    });
                    sendResult(res, 'brandcard', {
                        brand: brand,
                        productsData: productsData,
                        productCategories: productCategories,
                        seoData: brand.seoData
                    });
                });
            });
        };

        function sendMainPageResult(req, res, queryString) {
            sendProductListResult(req, res, queryString, 'main');
        };

        function sendProductListResult(req, res, queryString, pageName, filterId) {
            Products.getProducts(null, filterId, {skip: 0, limit: 20}, function(productsData) {
                var totalProductsCount = productsData.pop();
                if(filterId) {
                    ButtonFilters.getFilter(filterId, function(filterData) {
                        sendResult(res, pageName || 'mainproductlist', {
                            products: productsData,
                            totalProductsCount: totalProductsCount,
                            pageText: filterData.pageText,
                            seoData: filterData.seoData
                        });
                    });
                } else {
                    sendResult(res, pageName || 'mainproductlist', {
                        products: productsData,
                        totalProductsCount: totalProductsCount
                    });
                }
            });
        };

        function sendProductCardResult(req, res, productId) {
            Products.getProductDataById(productId, function(productData) {
                var boughtTogetherProductsData = productData.boughtTogetherProducts || [];
                getProductSeoData(productData, function(productSeoData) {
                    sendResult(res, 'productcard', {
                        productData: productData,
                        products: boughtTogetherProductsData,
                        productsTotalCount: boughtTogetherProductsData.length,
                        seoData: productSeoData
                    });
                });
            });
        };

        function getProductSeoData(productData, callback) {
            Brand.findById(productData.brandId, function(err, brandData) {
                var descriptionArr = productData.description.split('.'),
                    description = descriptionArr[0] || '' + descriptionArr[1] || '',
                    properties = productData.properties.map(function(prop) {
                        return getStringResources().productProperties[prop]
                    }),
                    type = getStringResources().productTypes[productData.type];
                callback({
                    title: productData.name + 'от бренда ' + brandData.name,
                    description: description,
                    keywords: [productData.name, brandData.name, type].concat(properties).join(', ')
                });
            });
        };

        function sendSiteMapResult(req, res, queryString) {
            var data = {};
            Product.find({}, function(err, productsData) {
                data.productsData = productsData;
                Brand.find({}, function(err, brandsData) {
                    data.brandsData = brandsData;
                    Article.find({}, function(err, articlesData) {
                        data.acticlesData = articlesData;
                        sendResult(res, 'sitemap', data)
                    });
                });
            });
        };

        function sendResult(res, pageName, params) {
            params.stringResources = getStringResources();
            ButtonFilter.find({}, function(err, data) {
                params.filterButtonsData = data;
                res.render('server-side-pages/' + pageName + '.pug', params);
            });
        };

        function getStringResources() {
            return {
                productTypes: {
                    tonic: 'Тоники и гидролаты',
                    cream: 'Кремы',
                    mask: 'Маски',
                    shampoo: 'Шампунь',
                    balm: 'Бальзам',
                    hairDye: 'Краски',
                    deodorants: 'Дезодоранты',
                    envelopment: 'Обертывание',
                    soap: 'Мыло',
                    beldi: 'Бельди',
                    showerGel: 'Гель',
                    scrub: 'Скрабы',
                    bashSalt: 'Соль для ванн',
                    bubbleBall: 'Бурлящие шарики',
                    powder: 'Пудра',
                    purification: 'Очищение',
                    base: 'Базовые',
                    essential: 'Эфирные',
                    oral: 'Для полости рта',
                    packaging: 'Упаковка',
                    spray: 'Спрей',
                    foam: 'Пена',
                    powder2: 'Порошок',
                    milk: 'Молочко',
                    means: 'Средства'
                },
                productCapacityUnitTypes: {
                    gram: 'г',
                    milliliters: 'мл'
                },
                productProperties: {
                    face: 'Для лица',
                    hair: 'Для волос',
                    body: 'Для тела',
                    hands: 'Для рук и ногтей',
                    legs: 'Для ног',
                    bath: 'Для ванны и душа',
                    decorativeCosmetics: 'Декоративная косметика',
                    oil: 'Масло',
                    packaging: 'Упаковка',
                    Sale: 'Распродажа',
                    Children: 'Для детей',
                    Home: 'Для дома'
                },
                deliveryTypes: {
                    tulaTokareva: 'Самовывоз, г. Тула ул. Токарева',
                    tulaLenina: 'Самовывоз, г. Тула пр. Ленина',
                    tulaFree: 'Бесплатная доставка по Туле (заказ от 1000 рублей)',
                    rf: 'Доставка по РФ (бесплатно для заказов от 2500)'
                },
                orderStatus: {
                    new: 'Новый',
                    inProgress: 'В процессе',
                    close: 'Закрытый',
                    done: 'Выполненный'
                },
                validationMessages: {
                    wrongProductCountTitle: 'Такого количества товара в настоящий момент нет на складе'
                }
            }
        };
    }
};