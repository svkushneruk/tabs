window.addEventListener('DOMContentLoaded', function () {
    'use strict';

    //*************** ТАБИ ***************
    let tab = document.querySelectorAll('.info-header-tab'),        //Додаємо в змінну всі таби
        tabHeader = document.querySelector('.info-header'),         // Додаємо в змінну батьківський елемент табів
        tabContent = document.querySelectorAll('.info-tabcontent'); // Додаємо в змінну всі тіла табів


    //Функція для скриття (через додавання класу 'hide') контенту для конкеретного табу    
    function tabContentHide(a) {
        for (let i = a; i < tabContent.length; i++) {   // Цикл, щоб перебрати всі таб-контенти ("а" задано параметром, задля того, щоб задати з якого елемента почати функцію)
            tabContent[i].classList.remove('show');     // Для і-го таб-контенту, що містить в собі клас 'show' видаляємо клас 'show'
            tabContent[i].classList.add('hide');        // Для і-го таб-контенту додаємо клас 'hide' (ховаємо таб-контент)
        }
    }

    tabContentHide(1); //Виконуємо функцію починаючи не з 0-го елемента, а з першого

    //Функція для показу (через додавання класу 'show') контенту для конкеретного табу   
    function tabContentShow(b) {
        if (tabContent[b].classList.contains('hide')) {     //Умова, якщо таб-контент з індексом b містить в собі клас 'hide'
            tabContent[b].classList.remove('hide');         // В таб-контенту з індексом b видаляємо клас 'hide'
            tabContent[b].classList.add('show');            // В таб-контенту з індексом b додаємо клас 'show' (показуємо певний таб-контент)
        }
    }

    tabHeader.addEventListener('click', function (event) {              //Оброляємо подыю кліку на tabHeader
        let target = event.target;                                      // Створюємо змінну target (ціль)
        if (target && target.classList.contains('info-header-tab')) {   //Умова: якщо target(ціль) існує та target(ціль) містить в собі клас 'info-header-tab' (Впевнюємось що ми натиснули саме на таб)
            for (let i = 0; i < tab.length; i++) {                      // Запускаємо цикл, щоб перебрати всі таби 
                if (target == tab[i]) {                                 //Умова: Якщо target(ціль) (натиснутий таб) =  знайденому при перебиранні табу
                    tabContentHide(0);                                  // запускаємо функцію tabContentHide починаючи з нульового індексу(елемента) – всі таб-контенти зникають
                    tabContentShow(i);                                  // Показуємо таб-контент з індексом і, який знайдено при співпадінні уиови вище!
                    break;                                              // Перериваємо операцію
                }
            }
        }
    });


    //*************** ТАЙМЕР ***************
    let deadline = '2019-09-23'; //Встановлюємо кінець (дедлайн) відліку таймера в заданому форматі

    // Запишемо функцію для визначення різниці часу між deadline і поточним часом
    function getTimeRemaining(endtime) {                        // Функція з параметром endtime в який буде передаватись deadline
        let t = Date.parse(endtime) - Date.parse(new Date()),   // Змінна в якій міститься кількість мілісекунд в різниці між часами
            seconds = Math.floor((t / 1000) % 60),              // Рахуємо цілу кількість секунд 
            minutes = Math.floor((t / 1000 / 60) % 60),         // Рахуємо цілу кількість хвилин
            hours = Math.floor(t / (1000 * 60 * 60));           // Рахуємо цілу кількість годин

        return { // Оскільки з функції багато значень передати важко, то створюємо обєкт
            'total': t,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        }
    }

    // Запишемо функцію, яка буде встановлювати значення в таймері
    function setClock(id, endtime) {                        //Функція приймає 2 параметри: 1 - id блоку таймера, куди вставлятимуться дані, 2 - endtime – deadline (час завершення таймеру)
        let timer = document.getElementById(id),            // Додаємо в змінну блок з id=timer (оскільки при визові функції ми передаємо id (функція приймає цей параметр))
            hours = timer.querySelector('.hours'),          // В блоці timer шукаємо елемент з класом 'hours'
            minutes = timer.querySelector('.minutes'),      // В блоці timer шукаємо елемент з класом 'minutes'
            seconds = timer.querySelector('.seconds'),      // В блоці timer шукаємо елемент з класом 'seconds'
            timeInterval = setInterval(updateClock, 1000);  // Створюємо змінну, в яку поміщаємо інтервал виконання функції pdateClock 

        // Запишемо функцію, яка буде оновлювати значення в таймері
        function updateClock() {
            let t = getTimeRemaining(endtime);  // Створюємо "технічну" змінну, яка буде приймати в себе обєкт з функції getTimeRemaining
            if (t.total <= 0) {                 // Перевірка умови що таймер – не відємне число
                hours.textContent = '00',       // Запишемо в відповідне поле значення '00'
                minutes.textContent = '00',     // Запишемо в відповідне поле значення '00'
                seconds.textContent = '00';     // Запишемо в відповідне поле значення '00'
            } else {
                function addZero(num){          // Функція встановлення нуля
                    if(num <= 9) {              // Умова виконання функції
                        return '0' + num;       // Вертаємо 0+значення числа, що менше 10
                    } else return num;          // Вертаємо передане число, якщо умова не виконується
                };

                hours.textContent = addZero(t.hours),       // Запишемо в відповідне поле значення годин взяте з обєкту 't'
                minutes.textContent = addZero(t.minutes),   // Запишемо в відповідне поле значення хвилин взяте з обєкту 't'
                seconds.textContent = addZero(t.seconds);   // Запишемо в відповідне поле значення секунд взяте з обєкту 't'

                if (t.total <= 0) {                         // Умова:  якщо таймер дійшов до нуля, то перериваємо виконання функції 
                    clearInterval(timeInterval);
                }
            }
        }
    }

    setClock('timer', deadline); // Визиваємо функцію встановлення значень таймера з відповідними параметрами
});