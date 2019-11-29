var api = "";
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
function dateToUTCStr(d) {
    d = new Date(d);
    var date = d.getUTCFullYear() + '-' + zerofix(d.getUTCMonth() + 1) + '-' + zerofix(d.getUTCDate());
    var time = zerofix(d.getUTCHours()) + ':' + zerofix(d.getUTCMinutes()) + ':' + zerofix(d.getUTCSeconds());
    return date + 'T' + time + '.000Z';
}

function zerofix(val) {
    return (val < 10 ? '0' : '') + val;
}

function isYoungChildYear(date) {
    if (!date) {
        return false;
    }
    var d = new Date(date.getFullYear() + youngAge + 1, date.getMonth(), date.getDate(), 0, 0, 0);
    return d.getTime() >= new Date().getTime();
}

function isYoungAndFemaleChild(date, gender) {
    return isYoungChildYear(date) && gender === 'female';
}

function isPreschoolChildYear(date) {
    if (!date) {
        return false;
    }
    var d = new Date(date.getFullYear() + preschoolAge + 1, date.getMonth(), date.getDate(), 0, 0, 0);
    return d.getTime() >= new Date().getTime();
}

function makeTrial() {
    var data = {
        "email": USER_DATA.email,
        "name": USER_DATA.parentName,
        "phone": USER_DATA.phone,
        "promo_code": USER_DATA.promo_code,
        //"students": students,
        "timezone": getTimeZone(),
        "region_code": 'RU',
        "visitor_id": USER_DATA.visitor_id,
        'utm_data': utm_data || undefined,
        "referral_code": USER_DATA.promo_code || (utm_data && utm_data.ref)
    };
    return $.ajax({
        url: api + 'trial_requests',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        data: JSON.stringify(data)
    });
}

function availableDays(){
    var from = dateToUTCStr(new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, now.getHours() + 1, now.getMinutes(), now.getSeconds())),
        to = dateToUTCStr(new Date(now.getFullYear(), now.getMonth(), now.getDate() + 30, 0, 0, 0));
    var data = {
        trial_id: data && data.id ? data.id : undefined,
        is_busy: false,
        accept_new_students: true,
        trial_rank_over_zero: true,
        region_code: 'RU',
        gender: isYoungAndFemaleChild(new Date(USER_DATA.bithdate), USER_DATA.gender) ? 'female' : undefined,
        teacher_l0_certified: isPreschoolChildYear(new Date(USER_DATA.bithdate)) ? true : undefined,
        teacher_is_near_native: USER_DATA.teacherType === 'native' ? true : false,
        start_time__gte: from,
        start_time__lte: to,
        timestamp: new Date().getTime()
    };
    return $.ajax({
        url: api + 'teachers_schedule/days',
        data: data
    });
};
function availableSlot() {
    var date = new Date(USER_DATA.trialLessonDate.split('.').reverse().join(' '));
    var data = {
        trial_id: data && data.id ? data.id : undefined,
        order_by: 'start_time',
        is_busy: false,
        accept_new_students: true,
        trial_rank_over_zero: true,
        region_code: USER_DATA.regionCode || undefined,
        gender: isYoungAndFemaleChild(new Date(USER_DATA.bithdate), USER_DATA.gender) ? 'female' : undefined,
        teacher_l0_certified: isPreschoolChildYear(new Date(USER_DATA.bithdate)) ? true : undefined,
        //teacher_is_near_native: $('#cbxOnlyNative').is(':checked') ? false : undefined,
        teacher_is_near_native: USER_DATA.teacherType === 'native' ? true : false,
        start_time__gte: dateToUTCStr(Math.max(date.getTime(), new Date().getTime() + 1000 * 60 * 60 * 24)),
        start_time__lte: dateToUTCStr(date.getTime() + 1000 * 60 * 60 * 24),
        timestamp: new Date().getTime()
    };
    return $.ajax({
        url: api + 'https://api-qa.novakidschool.com/api/0/teachers_schedule/slots',
        data: data
    });
};

function splitSlots(data) {
    BOT_CONFIG[EveningState].nextState.answers= [];
    BOT_CONFIG[DayState].nextState.answers = [];
    BOT_CONFIG[MorningState].nextState.answers = [];
    return new Promise(function(resolve, reject){
        
        var slots = data.map(function (e) {
            var time = e.start_time.substr(11, 5);
            var teacher = e.teacher_id;
            return {
                text: time,
                value: "" + time + ":" + teacher
            };
        });
        for (var idx in slots) {
            if (parseInt(slots[idx].text) < 13) {
                BOT_CONFIG[MorningState].nextState.answers.push(slots[idx]);
            } else if (parseInt(slots[idx].text) >= 13 && parseInt(slots[idx].text) < 18) {
                BOT_CONFIG[DayState].nextState.answers.push(slots[idx]);
            } else {
                BOT_CONFIG[EveningState].nextState.answers.push(slots[idx]);
            }
        }
        
        BOT_CONFIG[EveningState].nextState.answers.push(stepBack);
        BOT_CONFIG[DayState].nextState.answers.push(stepBack);
        BOT_CONFIG[MorningState].nextState.answers.push(stepBack);
        resolve(BOT_CONFIG);
    });
}

function getTimeIntervalAnswers(answers){
    return new Promise(function (resolve, reject) {
        if (BOT_CONFIG[MorningState].nextState.answers.length > 1) {
            answers.push({
                text : 'Утро с 09:00 до 12:30',
                value: MorningState
            });
        } 
        if (BOT_CONFIG[DayState].nextState.answers.length > 1) {
            answers.push({
                text : 'День с 13:00 до 17:30',
                value: DayState
            });
        } 
        if (BOT_CONFIG[EveningState].nextState.answers.length > 1) {
            answers.push({
                text : 'Вечер с 18:00 до 20:00',
                value: EveningState
            });
        } 
        answers.push(stepBackDay);
        resolve(answers);
    });
}

var now = new Date();
var convForm;
var preschoolAge = 5;
var youngAge = 8;
var USER_DATA = {
    email: '',
    name: '',
    age:'',
    bithdate: '',
    phone: '',
    gender: '',
    promo_code: '',
    //students: students,
    timezone: getTimeZone(),
    region_code: 'RU',
    visitor_id: '',
    utm_data: '',
    referral_code: '',
    parentName:'',
    phone:'',

};

var MorningState = 'trialLessonTimeMorning';
var DayState = 'trialLessonTimeDay';
var EveningState = 'trialLessonTimeEvening';
var stepBack = {
    text: 'Выбрать другой интервал',
    value: 'stepBack'
};
var stepBackDay = {
    text: 'Выбрать другой день',
    value: 'stepBack'
};

var BOT_CONFIG = {
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
            answers: []
        }
    },
    trialLessonInterval: {
        nextStateName: 'dynamic',
        prevStateName: 'trialLessonDate',
        nextState: {
            type: 'select',
            name: 'trialLessonInterval',
            questions: ['Выберите удобный для Вас интервал.'],
            answers: []
        }
    },
    trialLessonTimeMorning: {
        nextStateName: 'teacherType',
        prevStateName: 'trialLessonInterval',
        nextState: {
            type: 'select',
            name: 'trialLessonTimeMorning',
            questions: ['Утренние слоты'],
            answers: []
        }
    },
    trialLessonTimeDay: {
        nextStateName: 'teacherType',
        prevStateName: 'trialLessonInterval',
        nextState: {
            type: 'select',
            name: 'trialLessonTimeDay',
            questions: ['Дневные слоты'],
            answers: []
        }
    },
    trialLessonTimeEvening: {
        nextStateName: 'teacherType',
        prevStateName: 'trialLessonInterval',
        nextState: {
            type: 'select',
            name: 'trialLessonTimeEvening',
            questions: ['Вечерние слоты'],
            answers: []
        }
    },
    teacherType: {
        nextStateName: 'parentName',
        nextState: {
            type: 'select',
            name: 'teacherType',
            questions: ['Стандарт – занятие с преподавателем, свободно владеющим английским языком, от 490 р. / урок. Премиум– занятия с носителем английского языка, от 890 р. / урок'],
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
    },
    end: {
        nextState: {
            type: 'text',
            name: 'lastquestion',
            questions: ['Спасибо за информацию!'],
            answers: [
                {
                    text: 'Закончить диалог и закрыть чат',
                    value: 'end'
                }
            ]
        }
    }
};
var openChat = function openChat(){
    if (convForm) {
        return false;
    }
    $('#demo').removeClass('hidden');
    var userInput;
    function changeUserInput(params) {
        if (params.type === 'date') {
            setTimeout(function(){
                userInput.datepicker({
                    position: 'top right',
                    view: 'years',
                    autoClose: true,
                    minDate: params.minDate,
                    maxDate: params.maxDate
                });
            }, 1000);
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
                var nextStateName = BOT_CONFIG[key] && BOT_CONFIG[key].nextStateName ? BOT_CONFIG[key].nextStateName : null;
                var answer, value;
                var answers = [];
                // TODO: Нужен ли тест валидации если это делает маска ввода?
                if (convState.current.answer.value === 'end' || nextStateName === 'end') {
                    convState.current.next = false;
                    setTimeout(ready, Math.random() * 500 + 100);
                } else {
                    if (Array.isArray(convState.current.answer)) {
                        answer = convState.current.answer.join(', ');
                    } else {
                        answer = convState.current.answer.text;
                        value = convState.current.answer.value;
                    }

                    if (convState.current.answer.value === 'stepBack') {
                        nextStateName = BOT_CONFIG[key].prevStateName;
                    }
                    if (nextStateName === 'dynamic') {
                        nextStateName = value;
                    }
                    if (BOT_CONFIG[key] && BOT_CONFIG[key].nextState && BOT_CONFIG[key].nextState.type === 'date') {
                        userInput.datepicker().data('datepicker').destroy();
                        userInput.val('');
                    }
                    if (key === 'gender' || key === 'teacherType') {
                        USER_DATA[key] = value;
                    } else if (key === 'age') {
                        var bithdate = new Date(answer.split('.').reverse().join(' '));
                        USER_DATA.bithdate = answer.split('.').reverse().join(' ');
                        USER_DATA[key] = (new Date().getFullYear() - bithdate.getFullYear());
                    } else {
                        USER_DATA[key] = answer;
                    }
                    if (nextStateName) {
                        changeUserInput(BOT_CONFIG[nextStateName].nextState);
                        if (nextStateName === 'trialLessonDate') {
                            availableDays()
                            .then(function (rsp) {
                                if (rsp && rsp.days.length > 0) {
                                    answers = rsp.days.map(function (e, idx) {
                                        return {
                                            text: e.substr(0, 10).split('-').reverse().join('.'),
                                            value: "" + idx + ""
                                        };
                                    });
                                } else {
                                    nextStateName = 'notSlot';
                                }
                                var nextState = {
                                    type: 'select',
                                    name: 'trialLessonDate',
                                    questions: ['Выберите дату и время пробного урока. Слоты доступны с 9 до 20.00 по мск времени.'],
                                    answers: answers
                                };
                                convState.current.next = convState.newState(nextState);
                            });
                        } else if (nextStateName === 'trialLessonInterval') {
                            availableSlot()
                            .then(function(rsp){
                                if (rsp && rsp._embedded && rsp._embedded.slots && rsp._embedded.slots.length > 0) {
                                    return splitSlots(rsp._embedded.slots);
                                }
                            })
                            .then(function (rsp) {
                                return getTimeIntervalAnswers(answers);
                            })
                            .then(function (rsp) {
                                var nextState = {
                                    type: 'select',
                                    name: 'trialLessonInterval',
                                    questions: rsp.length > 1 ? ['Выберите удобный для Вас интервал.'] : ['К сожалению в данный день все места уже заняты.'],
                                    answers: rsp
                                };
                                convState.current.next = convState.newState(nextState);
                            });
                        } else {
                            convState.current.next = convState.newState(BOT_CONFIG[nextStateName].nextState);
                        }
                        setTimeout(ready, Math.random() * 1000 + 100);
                    }
                }
            }
        }
    });
    userInput = $('#userInput');
    userInput.attr('autocomplete', false);
};

const closeChat = function () {
    if (convForm) {
        convForm.destroy();
        convForm = null;
    }
    $('#demo').addClass('hidden');
};