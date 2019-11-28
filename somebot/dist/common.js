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

function availableDays(){
    return $.ajax({
        url: api + 'teachers_schedule/days',
        data: {
            trial_id: data && data.id ? data.id : undefined,
            is_busy: false,
            accept_new_students: true,
            trial_rank_over_zero: true,
            region_code: regionCode || undefined,
            gender: isYoungAndFemaleChild($('#choose-first-child-year').data('date'), $('input[name=firstChildGender]')) ? 'female' : undefined,
            teacher_l0_certified: isPreschoolChildYear($('#choose-first-child-year').data('date')) ? true : undefined,
            //teacher_is_near_native: $('#cbxOnlyNative').is(':checked') ? false : undefined,
            teacher_is_near_native: teacherSelector ? $('input.thx-teacher-type:checked').val() !== 'native' : defaultTeacherType !== 'native',
            start_time__gte: from,
            start_time__lte: to,
            timestamp: new Date().getTime()
        }
    });
}

var now = (new Date());
var convForm;
var USER_DATA = {
    email: '',
    name: '',
    phone: '',
    gender: '',
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
        nextStateName: 'gender'
    },
    gender: {
        nextStateName: 'age',
        nextState: {
            type: 'select',
            questions: ['Уточните пол ребенка.'],
            mask: '',
            name: 'gender',
            disabled: true,
            answers: [{
                    text: 'Мальчик',
                    value: 'male'
                },
                {
                    text: 'Девочка',
                    value: 'female'
                }
            ]
        }
    },
    age: {
        pattern: /([\d]{1,2}\.){2}[\d]{4}/,
        nextStateName: 'trialLessonDate',
        nextState: {
            type: 'date',
            pattern: /([\d]{1,2}\.){2}[\d]{4}/,
            placeholder: 'Введите дату рождения',
            mask: '99.99.9999',
            name: 'age',
            minDate: new Date(now.getFullYear() - 12, 0, 1, 0, 0, 0),
            maxDate: new Date(now.getFullYear() - 4, now.getMonth(), new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate(), 0, 0, 0),
            questions: ['Дата рождения ребенка']
        }
    },
    trialLessonDate: {
        nextStateName: 'trialLessonInterval',
        nextState: {
            type: 'select',
            name: 'trialLessonDate',
            questions: ['Выберите дату и время пробного урока. Слоты доступны с 9 до 20.00 по мск времени.'],
            //TODO: загружаем даты с сервера
            answers: [
                {
                    text: 'Сегодня',
                    value: '1'
                },
                {
                    text: 'Завтра',
                    value: '2'
                },
                {
                    text: 'Послезавтра',
                    value: '3'
                }
            ]
        }
    },
    trialLessonInterval: {
        nextStateName: 'trialLessonTime',
        prevStateName: 'trialLessonDate',
        nextState: {
            type: 'select',
            name: 'trialLessonInterval',
            questions: ['Выберите удобный для Вас интервал.'],
            //TODO: загружаем даты с сервера
            answers: [
                {
                    text: 'Утро с 9:00 до 12:30',
                    value: '1'
                },
                {
                    text: 'День с 13:00 до 17:30',
                    value: '2'
                },
                {
                    text: 'Вечер с 18:00 до 20:00',
                    value: '3'
                },
                {
                    text: 'Выбрать другой день',
                    value: 'stepBack'
                },
                {
                    text: 'END',
                    value: 'END'
                }
            ]
        }
    },
    trialLessonTime: {
        nextStateName: 'teacherType',
        prevStateName: 'trialLessonInterval',
        nextState: {
            type: 'select',
            name: 'trialLessonTime',
            questions: ['Выберите дату и время пробного урока. Слоты доступны с 9 до 20.00 по мск времени.'],
            //TODO: загружаем время с сервера
            answers: [
                {
                    text: '17:30',
                    value: '1'
                },
                {
                    text: '18:00',
                    value: '2'
                },
                {
                    text: '20:00',
                    value: '3'
                },
                {
                    text: 'Выбрать интервал',
                    value: 'stepBack'
                }
            ]
        }
    },
    teacherType: {
        nextStateName: 'parentName',
        nextState: {
            type: 'select',
            name: 'teacherType',
            questions: ['Стандарт – занятие с преподавателем, свободно владеющим английским языком, от 490 р. / урок. Премиум– занятия с носителем английского языка, от 890 р. / урок'],
            //TODO: загружаем время с сервера
            answers: [
                {
                    text: 'Премиум',
                    value: 'native'
                },
                {
                    text: 'Стандарт',
                    value: 'near-native'
                }
            ]
        }
    },
    parentName: {
        nextStateName: 'email',
        nextState: {
            type: 'text',
            name: 'parentName',
            questions: [ 'Представьтесь, пожалуйста']
        }
    },
    email: {
        // Для кирилицы в адресе.
        // pattern: /^[a-zA-Zа-яё0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Zа-яё0-9-]+\.[a-zA-Zа-яё0-9-]+(?:\.[a-zA-Zа-яё0-9-]+)*$/,
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
        nextStateName: 'code',
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
    code: {
        nextStateName: 'end',
        nextState: {
            pattern: /\d{6}/,
            type: 'text',
            name: 'code',
            mask: '999999',
            questions: ['Введите код, который мы вам отправили на sms']
        }
    }
};
const openChat = function openChat(){
    if (convForm) {
        return false;
    }
    $('#demo').removeClass('hidden');
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
    convForm = $('#chat').convform({
        placeHolder: 'Введите текст',
        typeInputUi: 'input',
        eventList: {
            onInputSubmit: function (convState, ready) {
                var key = convState.current.input.name || convState.current.input.selected;
                var nextStateName = TEST_CONFIG[key] && TEST_CONFIG[key].nextStateName ? TEST_CONFIG[key].nextStateName : null;
                // TODO: Нужен ли тест валидации если это делает маска ввода?
                if (convState.current.answer.value === 'end') {

                    convState.current.next = false;
                    setTimeout(ready, Math.random() * 500 + 100);
                } else {
                    if (Array.isArray(convState.current.answer)) {
                        answer = convState.current.answer.join(', ');
                    } else {
                        answer = convState.current.answer.text;
                    }
                    if (convState.current.answer.value === 'stepBack') {
                        nextStateName = TEST_CONFIG[key].prevStateName;
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
};

const closeChat = function () {
    convForm.destroy();
    convForm = null;
    $('#demo').addClass('hidden');
};