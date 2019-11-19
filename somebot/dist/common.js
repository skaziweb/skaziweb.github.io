/* Russian (UTF-8) initialisation for the jQuery UI date picker plugin. */
/* Written by Andrew Stromnov (stromnov@gmail.com). */
(function (factory) {
    if (typeof define === "function" && define.amd) {

        // AMD. Register as an anonymous module.
        define(["../widgets/datepicker"], factory);
    } else {

        // Browser globals
        factory(jQuery.datepicker);
    }
}(function (datepicker) {

    datepicker.regional.ru = {
        closeText: "Закрыть",
        prevText: "&#x3C;Пред",
        nextText: "След&#x3E;",
        currentText: "Сегодня",
        monthNames: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
            "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
        ],
        monthNamesShort: ["Янв", "Фев", "Мар", "Апр", "Май", "Июн",
            "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"
        ],
        dayNames: ["воскресенье", "понедельник", "вторник", "среда", "четверг", "пятница", "суббота"],
        dayNamesShort: ["вск", "пнд", "втр", "срд", "чтв", "птн", "сбт"],
        dayNamesMin: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
        weekHeader: "Нед",
        dateFormat: "dd.mm.yy",
        firstDay: 1,
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: ""
    };
    datepicker.setDefaults(datepicker.regional.ru);

    return datepicker.regional.ru;

}));
function getTimeZone() {
    var format, timezone;
    if (typeof Intl === "undefined" || typeof Intl.DateTimeFormat === "undefined") {
        return;
    }

    format = Intl.DateTimeFormat();

    if (typeof format === "undefined" || typeof format.resolvedOptions === "undefined") {
        return;
    }

    timezone = format.resolvedOptions().timeZone;

    if (timezone && (timezone.indexOf("/") > -1 || timezone === 'UTC')) {
        return timezone;
    }
}
var now = (new Date());
var USER_DATA = {
    email: '',
    name: '',
    phone: '',
    promo_code: '',
    //students: students,
    timezone: getTimeZone(),
    region_code: '',
    visitor_id: '',
    utm_data: '',
    referral_code: ''
};
var TEST_CONFIG = {
    name: {
        pattern: /[a-zA-ZА-Яа-яёй]{3,}/,
        nextStateName: 'age'
    },
    age: {
        pattern: /([\d]{1,2}\.){2}[\d]{4}/,
        nextStateName: 'email',
        nextState: {
            type: 'date',
            pattern: /([\d]{1,2}\.){2}[\d]{4}/,
            placeholder: 'Введите дату рождения',
            mask: '99.99.9999',
            name: 'age',
            minDate: new Date(now.getFullYear() - 12, 0, 1, 0, 0, 0),
            maxDate: new Date(now.getFullYear() - 4, now.getMonth(), new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate(), 0, 0, 0),
            questions: [
                'Когда {name} родился ⏰?',
                'Укажите дату рождаения {name} ⏰'
            ]
        }
    },
    email: {
        pattern: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        nextStateName: 'phone',
        nextState: {
            pattern: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
            type: 'email',
            name: 'email',
            questions: [
                'Укажите вашу почту для связи?',
                'Давайте продолжим регистрацию, напишите вашу почту'
            ]
        }
    },
    phone: {
        pattern: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        nextStateName: 'end',
        nextState: {
            pattern: '',
            type: 'text',
            name: 'phone',
            mask: '+9-(999)-999-9999',
            questions: [
                'Укажите ваш телефон?',
                'Для окончания регистрации необходимо ввести телефон, куда я отправлю смс для подтверждения.'
            ]
        }
    },
    end: {
        pattern: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        nextState: {
            questions: ['Ну ок! '],
            mask: '',
            disabled: true
        }
    },
    young: {
        pattern: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        nextState: {
            questions: ['Ну ок! '],
            mask: '',
            disabled: true
        }
    },
    grown: {
        pattern: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        nextState: {
            questions: ['Ну ок! Напиши "end" и мы начнем сначала!'],
            mask: '',
            disabled: true
        }
    }
};

jQuery(function ($) {
    var userInput;
    function changeUserInput(params) {
        if (params.type === 'date') {
            userInput.datepicker({
                minDate: params.minDate,
                maxDate: params.maxDate
            });
        } else {
            userInput.mask(params.mask || '');
        }
    }
    var convForm = $('#chat').convform({
        placeHolder: 'Введите текст',
        typeInputUi: 'input',
        eventList: {
            onInputSubmit: function (convState, ready) {
                console.dir(USER_DATA);
                var key = convState.current.input.name;
                var nextStateName = TEST_CONFIG[key] && TEST_CONFIG[key].nextStateName ? TEST_CONFIG[key].nextStateName : null;

                if (convState.current.answer.value === 'end') {
                    convState.current.next = false;
                    setTimeout(ready, Math.random() * 500 + 100);
                } else {
                    if (Array.isArray(convState.current.answer)) {
                        answer = convState.current.answer.join(', ');
                    } else {
                        answer = convState.current.answer.text;
                    }
                    if (TEST_CONFIG[key] && TEST_CONFIG[key].nextState && TEST_CONFIG[key].nextState.type === 'date') {
                        userInput.datepicker("destroy");
                        $('#ui-datepicker-div').remove();
                    }
                    USER_DATA[key] = answer;
                    if (nextStateName) {
                        changeUserInput(TEST_CONFIG[nextStateName].nextState);
                        convState.current.next = convState.newState(TEST_CONFIG[nextStateName].nextState);
                        setTimeout(ready, Math.random() * 500 + 100);
                    }
                }
            }
        }
    });
    userInput = $('#userInput');
    userInput.attr('autocomplete', false);
});