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
});
