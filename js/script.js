window.addEventListener('DOMContentLoaded', function () {
    'use strict';

    let tab = document.querySelectorAll('.info-header-tab'),    //Додаємо в змінну всі таби
        tabHeader = document.querySelector('.info-header'),    // Додаємо в змінну батьківський елемент табів
        tabContent = document.querySelectorAll('.info-tabcontent'); // Додаємо в змінну всі тіла табів
    

    //Функція для скриття (через додавання класу 'hide') контенту для конкеретного табу    
    function tabContentHide(a) {
        for ( let i = a; i < tabContent.length; i++ ) { // Цикл, щоб перебрати всі таб-контенти ("а" задано параметром, задля того, щоб задати з якого елемента почати функцію)
            tabContent[i].classList.remove('show');     // Для і-го таб-контенту, що містить в собі клас 'show' видаляємо клас 'show'
            tabContent[i].classList.add('hide');        // Для і-го таб-контенту додаємо клас 'hide' (ховаємо таб-контент)
        }
    }

    tabContentHide(1);  //Виконуємо функцію починаючи не з 0-го елемента, а з першого

    //Функція для показу (через додавання класу 'show') контенту для конкеретного табу   
    function tabContentShow(b) {
        if (tabContent[b].classList.contains('hide')) { //Умова, якщо таб-контент з індексом b містить в собі клас 'hide'
            tabContent[b].classList.remove('hide');     // В таб-контенту з індексом b видаляємо клас 'hide'
            tabContent[b].classList.add('show');        // В таб-контенту з індексом b додаємо клас 'show' (показуємо певний таб-контент)
        }
    }

    tabHeader.addEventListener('click', function(event) {   //Оброляэмо подыю кліку на tabHeader
        let target = event.target;      // Створюємо змінну target (ціль)
        if (target && target.classList.contains('info-header-tab')) {   //Умова: якщо target(ціль) існує та target(ціль) містить в собі клас 'info-header-tab' (Впевнюємось що ми натиснули саме на таб)
            for (let i = 0; i < tab.length; i++) {  // Запускаємо цикл, щоб перебрати всі таби 
                if (target == tab[i]) {     //Умова: Якщо target(ціль) (натиснутий таб) =  знайденому при перебиранні табу
                    tabContentHide(0);      // запускаємо функцію tabContentHide починаючи з нульового індексу(елемента) – всі таб-контенти зникають
                    tabContentShow(i);      // Показуємо таб-контент з індексом і, який знайдено при співпадінні уиови вище!
                    break;                  // Перериваємо операцію
                }
            }
        }
    });
});