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
        },
        {
            value: 'Children',
            label: 'Для детей'
        },
        {
            value: 'Home',
            label: 'Для дома'
        }
    ],
    deliveryTypes: {
        self: 'Самовывоз, г. Тула',
        delivery: 'Дотавка по РФ'
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
