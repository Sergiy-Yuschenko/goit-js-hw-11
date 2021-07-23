import './sass/main.scss';

//Знаходимо елемент кнопки Start
const buttonStartEl = document.querySelector('[data-start]');
//Знаходимо елемент кнопки Stop
const buttonStopEl = document.querySelector('[data-stop]');
//Знаходимо елемент кнопки body
const bodyEl = document.querySelector('body');

// Ініціалізація контейнера для 
let backgroundTimerId = null;

//Початкова дезактивація кнопки Stop
    buttonStopEl.disabled = 'true';

//Функція для генерації кольору
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
//Слухач кнопки Start, який запускає функцію зміни кольору фону з інтервалом 1с
buttonStartEl.addEventListener('click', () => {
    //Початкова зміна фону.
    bodyEl.style = `background-color: ${getRandomHexColor()};`
    //інтервал, який міняє фон через 1с.
    backgroundTimerId = setInterval(() => {
        bodyEl.style = `background-color: ${getRandomHexColor()};`
    }, 1000);
    //Дезактивація кнопки Start
    buttonStartEl.disabled = 'true';
    // Активація кнопки Stop
    buttonStopEl.removeAttribute('disabled');
});
//Слухач кнопки Start, який знімає інтервал по зміні фону
buttonStopEl.addEventListener('click', () => {
    //Знімаємо інтервал
    clearInterval(backgroundTimerId);
    //Активація кнопки Start
    buttonStopEl.disabled = 'true';
    //Дезактивація кнопки Stop
    buttonStartEl.removeAttribute('disabled');
    //Очистка інлайнових стилів Body
    bodyEl.removeAttribute('style');
});
