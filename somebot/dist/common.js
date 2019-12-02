var api = "https://api-qa.novakidschool.com/api/0/";

var now = new Date();
var convForm;
var preschoolAge = 5;
var youngAge = 8;
var USER_DATA = {
    email: '',
    name: '',
    age: '',
    bithdate: '',
    phone: '',
    parsed_phone: '',
    gender: '',
    promo_code: '',
    students: [],
    timezone: getTimeZone(),
    region_code: 'RU',
    trialLessonTime: '',
    visitor_id: '',
    utm_data: '',
    referral_code: '',
    parentName: '',
    id: '',
    user_id: '',
    isCreated: false,
    token: '',
    codeErr: 0,
    answerErr: ''
};

var days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
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
        nextStateName: 'teacherType',
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
    teacherType: {
        nextStateName: 'trialLessonDate',
        nextState: {
            type: 'select',
            name: 'teacherType',
            questions: ['Стандарт – занятие с преподавателем, свободно владеющим английским языком, от 490 р. / урок. Премиум– занятия с носителем английского языка, от 890 р. / урок'],
            answers: [{
                    text: 'Премиум',
                    value: 'native'
                },
                {
                    text: 'Стандарт',
                    value: 'nearNative'
                }
            ]
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
        nextStateName: 'parentName',
        prevStateName: 'trialLessonInterval',
        nextState: {
            type: 'select',
            name: 'trialLessonTimeMorning',
            questions: ['Утренние слоты'],
            answers: []
        }
    },
    trialLessonTimeDay: {
        nextStateName: 'parentName',
        prevStateName: 'trialLessonInterval',
        nextState: {
            type: 'select',
            name: 'trialLessonTimeDay',
            questions: ['Дневные слоты'],
            answers: []
        }
    },
    trialLessonTimeEvening: {
        nextStateName: 'parentName',
        prevStateName: 'trialLessonInterval',
        nextState: {
            type: 'select',
            name: 'trialLessonTimeEvening',
            questions: ['Вечерние слоты'],
            answers: []
        }
    },
    parentName: {
        nextStateName: 'email',
        nextState: {
            type: 'text',
            name: 'parentName',
            questions: ['Представьтесь, пожалуйста']
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
        nextStateName: 'compareCode',
        nextState: {
            pattern: /\d{6}/,
            type: 'text',
            name: 'code',
            mask: '999999',
            questions: ['Введите код, который мы вам отправили на sms']
        }
    },
    compareCode: {
        nextStateName: 'end',
        nextState: {
            pattern: /\d{6}/,
            type: 'text',
            name: 'compareCode',
            mask: '999999',
            questions: ''
        }
    },
    end: {
        nextState: {
            type: 'text',
            name: 'lastquestion',
            questions: ['Спасибо за информацию!'],
            answers: [{
                text: 'Закончить диалог и закрыть чат',
                value: 'end'
            }]
        }
    }
};

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

function dateToStr(d) {
    d = new Date(d);
    var date = d.getFullYear() + '-' + zerofix(d.getMonth() + 1) + '-' + zerofix(d.getDate());
    var time = zerofix(d.getHours()) + ':' + zerofix(d.getMinutes()) + ':' + zerofix(d.getSeconds());
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

function createAuthToken(login, password) {
    return $.ajax({
        url: api + 'auth/tokens',
        method: 'post',
        data: {
            login: login,
            password: password
        }
    });
}

function makeTrial() {
    var data = {
        "email": USER_DATA.email,
        "name": USER_DATA.parentName,
        "phone": USER_DATA.phone,
        "promo_code": USER_DATA.promo_code,
        //"students": students,
        "timezone": USER_DATA.timezone,
        "region_code": 'RU',
        "visitor_id": USER_DATA.visitor_id,
        'utm_data': USER_DATA.utm_data || undefined,
        "referral_code": USER_DATA.promo_code //|| (utm_data && utm_data.ref)
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

function postUserCandidate(phone) {
    return $.ajax({
        url: api + 'trial_requests/' + USER_DATA.id + '/user_candidates',
        method: 'post',
        data: {
            phone: phone,
            email: null
        }
    });
}

function createStudent(token, id, student) {
    function operation() {
        return $.ajax({
            url: api + 'users/' + id + '/students/' + student.id + '/schedule/operations',
            method: 'post',
            headers: {
                'X-Novakid-Auth': token
            },
            data: {
                action: 'safe_reserve',
                start_time: student.start_time,
                //teacher_id: student.teacher_id,
                teacher_is_near_native: student.teacher_is_near_native
            }
        });
    }

    if (student.id) {
        return operation();
    }

    return $.ajax({
        url: api + 'users/' + id + '/students',
        method: 'post',
        headers: {
            'X-Novakid-Auth': token
        },
        data: {
            name: student.name,
            gender: student.gender,
            birth_date: student.birth_date,
            birth_year: student.birth_year
        }
    }).then(function (rsp) {
        student.id = rsp.id;
        return operation();
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
}

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
        url: api + 'teachers_schedule/slots',
        data: data
    });
}

function splitSlots(data) {
    BOT_CONFIG[EveningState].nextState.answers= [];
    BOT_CONFIG[DayState].nextState.answers = [];
    BOT_CONFIG[MorningState].nextState.answers = [];
    return new Promise(function(resolve, reject){
        var slots = data.map(function (e) {
            var time = e.start_time.substr(11, 5);
            var strTime = new Date(e.start_time).getTime();
            var teacher = e.teacher_id;
            return {
                text: time,
                value: strTime + ":" + teacher
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
        selectInputStyle: 'disabled',
        selectInputDisabledText: 'Выберите вариант ответа',
        eventList: {
            onSubmitForm: function(){
                return false;
            },
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
                    } else if (key === 'trialLessonDate') {
                        USER_DATA[key] = value;
                    } else if (key === 'trialLessonTimeMorning' || key === 'trialLessonTimeDay' || key === 'trialLessonTimeEvening') {
                        USER_DATA.trialLessonTime = convState.current.answer.value;
                    } else if (key === 'code') {
                        
                    } else if (key === 'age') {
                        var bithdate = new Date(answer.split('.').reverse().join(' '));
                        USER_DATA.bithdate = answer.split('.').reverse().join(' ');
                        USER_DATA.birth_date = dateToStr(new Date(USER_DATA.bithdate));
                        USER_DATA.birth_year = new Date(USER_DATA.bithdate).getFullYear();
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
                                            text: e.substr(0, 10).split('-').reverse().join('.') + " " +days[(new Date(e).getDay())],
                                            value: e.substr(0, 10).split('-').reverse().join('.')
                                        };
                                    });
                                } else {
                                    nextStateName = 'notSlot';
                                }
                                var nextState = {
                                    type: 'select',
                                    name: 'trialLessonDate',
                                    questions: ['Выберите дату и время пробного урока. Слоты доступны с 9 до 20.00 по мск времени.'],
                                    answers: answers.length > 6 ? answers.slice(0, 7) : answers
                                };
                                convState.current.next = convState.newState(nextState);
                            })
                            .catch(function (err) {
                                console.dir(err);
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
                            })
                            .catch(function (err) {
                                console.dir(err);
                            });
                        } else if (nextStateName === 'code') {
                            makeTrial()
                            .then(function (rsp) {
                                data = rsp;
                                USER_DATA.token = encodeURIComponent(btoa(JSON.stringify({
                                    id: data.id,
                                    email: data.email,
                                    phone: data.parsed_phone,
                                    region_code: data.region_code
                                })));
                                USER_DATA.parsed_phone = data.parsed_phone;
                                USER_DATA.id = data.id;
                                return postUserCandidate(USER_DATA.parsed_phone);
                            })
                            .then(function (rsp) {
                                USER_DATA.isCreated = true;
                                convState.current.next = convState.newState(BOT_CONFIG[nextStateName].nextState);
                            })
                            .catch(function(err){
                                console.dir(err);
                            });
                        } else if (nextStateName === 'compareCode') {
                            createAuthToken(USER_DATA.parsed_phone, answer)
                            .then(function(rsp){
                                USER_DATA.user_id = rsp.user_id;
                                USER_DATA.token = rsp.value;
                                var value = USER_DATA.trialLessonTime.split(':'),
                                    time = new Date(+value[0]),
                                    teacher_id = value[1];
                                var student = {
                                    'name': USER_DATA.name,
                                    'birth_date': USER_DATA.birth_date,
                                    'birth_year': USER_DATA.birth_year,
                                    'gender': USER_DATA.gender,
                                    'start_time': dateToUTCStr(time),
                                    'start_time_date': time,
                                    'is_preschool': isPreschoolChildYear(new Date(USER_DATA.bithdate)),
                                    'is_young': isYoungChildYear(new Date(USER_DATA.bithdate)),
                                    'teacher_is_near_native': USER_DATA.teacherType
                                };
                                USER_DATA.students.push(student);
                                console.table(USER_DATA.students[0]);
                                return createStudent(USER_DATA.token, USER_DATA.user_id, USER_DATA.students[0]);
                            })
                            .then(function (rsp) {
                                console.dir(rsp);
                                convState.current.next = convState.newState(BOT_CONFIG.code.nextState);
                            })
                            .catch(function(err){
                                console.dir(err);
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

var closeChat = function () {
    if (convForm) {
        convForm.destroy();
        convForm = null;
    }
    $('#demo').addClass('hidden');
};