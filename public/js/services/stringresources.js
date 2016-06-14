angular.module('gsoapApp.services').constant('StringResources', {
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
        baseEssential: 'Базовые\\эфирные'
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
        }
    ],
    deliveryTypes: [
        {
            value: 'tulaTokareva',
            label: 'Самовывоз, г. Тула ул. Токарева'
        },
        {
            value: 'tulaLenina',
            label: 'Самовывоз, г. Тула пр. Ленина'
        },
        {
            value: 'tulaFree',
            label: 'Бесплатная доставка по Туле (заказ от 1000 рублей)'
        },
        {
            value: 'rf',
            label: 'Доставка по РФ (бесплатно для заказов от 2500)'
        }
    ]
});
