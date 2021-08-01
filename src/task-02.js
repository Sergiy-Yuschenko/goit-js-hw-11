import './sass/main.scss';

//Підключення бібліотеки sweetalert2
import Swal from 'sweetalert2';

//Знаходимо елемент лічильника днів
const daysEl = document.querySelector('[data-days]');
//Знаходимо елемент лічильника годин
const hoursEl = document.querySelector('[data-hours]');
//Знаходимо елемент лічильника хвилин
const minutesEl = document.querySelector('[data-minutes]');
//Знаходимо елемент лічильника секунд
const secondsEl = document.querySelector('[data-seconds]');

const allcountersEl = document.querySelector('[data-allcounters]');
//Знаходимо елемент кнопки початку відліку
const buttonStartCountdownEl = document.querySelector('[data-start]');
//Знаходимо елемент поля вводу дати
const inputDateEl = document.querySelector('#date-selector');

//Контейнер для зберігання дати в мілісекундах
let targetTime = 'null';

let timerId = 'null';
//вимкнення кнопки старту лічильника по замовчуванню
buttonStartCountdownEl.disabled = 'true';




// const date = "2021.07.27";
//Переведення дати в мілісекунди та присвоєння контейнеру
// const targetTime = new Date(date).getTime();
// Ініціалізація контейнера для інтервал-id
// let timerId = 'null';

// Функція для підрахунку днів, годин, хвилин та секунд
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

//Функція перевірки правильності введення дати та збереження отриманої дати в контейнер
const checkValue = (value) => {
  //Якщо дата вже в минулому
  if (new Date(value.currentTarget.value).getTime() < Date.now()) {
    inputDateEl.classList.add('invalid'); //додавання класу invalid пелементу поля введення для його забарвлення в червоний
    //Якщо кнопка запуску лічильника вже активована, дезактивуємо її знову
    if (buttonStartCountdownEl.disabled = 'false') {
      buttonStartCountdownEl.disabled = 'true';
  }
    //Оголошення бібліотеки sweetalert2 про помилку якщо дата вже в минулому
    Swal.fire({
      title: 'Error!',
      text: 'Please choose a date in the future',
      icon: 'error',
      confirmButtonText: 'Змиритися...'
    });
  }
  //Якщо дата в майбутньому
  else {
    if (timerId !== 'null') {
      clearInterval(timerId);
      daysEl.textContent = '00';
      hoursEl.textContent = '00';
      minutesEl.textContent = '00';
      secondsEl.textContent = '00';
    }
    inputDateEl.classList.remove('invalid');
    buttonStartCountdownEl.removeAttribute('disabled');
    targetTime = new Date(value.currentTarget.value).getTime();
    //targetTime = '1627272170171';
  }
}
//console.log(Date.now());
inputDateEl.addEventListener('input', checkValue);




//Функція яка переводить дані лічильника з формату X в формат 0X. 
function pad(value) {
  return String(value).padStart(2, '0');
}

const counter = () => {
  //Вимикає кнопку запуску лічильника
  buttonStartCountdownEl.disabled = 'true';
  // buttonStartCountdownEl.disabled = 'true';
  if (timerId !== 'null') {
    clearInterval(timerId);
  }
  //Пустий цикл для затримки та синхронізації таймера  
  while ( (Date.now() % 1020) > 30) {}
  //Таймер - інтервал годинника 
  timerId = setInterval(() => {
    daysEl.textContent = `${pad(convertMs((targetTime - Date.now())).days)}`;
    hoursEl.textContent = `${pad(convertMs((targetTime - Date.now())).hours)}`;
    minutesEl.textContent = `${pad(convertMs((targetTime - Date.now())).minutes)}`;
    secondsEl.textContent = `${pad(convertMs((targetTime - Date.now())).seconds)}`;
    allcountersEl.textContent =`${pad(convertMs((targetTime - Date.now())).days)}:${pad(convertMs((targetTime - Date.now())).hours)}:${pad(convertMs((targetTime - Date.now())).minutes)}:${pad(convertMs((targetTime - Date.now())).seconds)}`
    if ((targetTime - Date.now()) < 1040) {
      clearInterval(timerId);
      Swal.fire('Обрана дата настала! Лічильник зупинено.');
    }
  }, 1000);
}
// Слухач кнопки лічильника, який запускає відлік при кліці на неї
buttonStartCountdownEl.addEventListener('click', counter);

