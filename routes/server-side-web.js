'use strict';

var mongoose = require('mongoose'),
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
            if(pageName === '/products') {
                sendProductListResult(req, res, queryString);
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
    }
};

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
    Brand.find({_id: brandId}, function(err, data) {
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
                productCategories: productCategories
            });
        });
    });
};

function sendMainPageResult(req, res, queryString) {
    sendProductListResult(req, res, queryString, 'main');
};

function sendProductListResult(req, res, queryString, pageName) {
    Product.find({}, null, {skip: 0, limit: 20}, function(err, data) {
        Product.count({}, function(err, totalCount) {
            sendResult(res, pageName || 'mainproductlist', {
                products: data,
                productsTotalCount: totalCount
            });
        });
    });
};

function sendProductCardResult(req, res, productId) {
    Product.findById(productId, function(err, productData) {
        Product.find({_id: {$in: productData.boughtTogetherProductIds || []}}, null, null, function(err, boughtTogetherProductsData) {
            productData = productData.toObject();
            boughtTogetherProductsData = boughtTogetherProductsData || [];
            sendResult(res, 'productcard', {
                productData: productData,
                products: boughtTogetherProductsData,
                productsTotalCount: boughtTogetherProductsData.length
            });
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
            showerGel: 'Гель для душа',
            scrub: 'Скрабы',
            bashSalt: 'Соль для ванн',
            bubbleBall: 'Бурлящие шарики',
            powder: 'Пудра',
            purification: 'Очищение',
            base: 'Базовые',
            essential: 'Эфирные',
            oral: 'Для полости рта',
            packaging: 'Упаковка'
        },
        productCapacityUnitTypes: {
            gram: 'г',
            milliliters: 'мл'
        },
        productProperties: [
            {
                value: 'face',
                label: 'Для лица'
            },
            {
                value: 'hair',
                label: 'Для волос'
            },
            {
                value: 'body',
                label: 'Для тела'
            },
            {
                value: 'hands',
                label: 'Для рук и ногтей'
            },
            {
                value: 'legs',
                label: 'Для ног'
            },
            {
                value: 'bath',
                label: 'Для ванны и душа'
            },
            {
                value: 'decorativeCosmetics',
                label: 'Декоративная косметика'
            },
            {
                value: 'oil',
                label: 'Масло'
            },
            {
                value: 'packaging',
                label: 'Упаковка'
            },
            {
                value: 'Sale',
                label: 'Распродажа'
            }
        ],
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