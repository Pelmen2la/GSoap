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
