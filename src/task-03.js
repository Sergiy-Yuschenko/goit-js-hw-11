import './sass/main.scss';




//------------ ПІДЗАВДАННЯ 1 -----------------

//Знаходимо інпут підзавдання 1
const inputFirstEl = document.querySelector('#first-input');
//Знаходимо кнопку підзавдання 1
const buttonFirstEl = document.querySelector('[data-first]');
//дезактивуємо кнопку підзавдання 1
buttonFirstEl.disabled = 'true';
//контейнер для зберігання значення введеного в інпут підзавдання 1
let inputDelay = null;


//Слухач інпуту підзавдання 1
inputFirstEl.addEventListener('input', (event) => {
  inputDelay = event.currentTarget.value *1;
  if (event.currentTarget.value && event.currentTarget.value > 0 && event.currentTarget.value <= 10000) {
    buttonFirstEl.removeAttribute('disabled');
  } else {
    buttonFirstEl.disabled = 'true';
  }
});

// Функція яка повертає проміс, який виконується після затримки
const delay = ms => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(ms);
      // reject('ups');
    }, ms);
  });
};

//Функція яка чіпляється на обробку проміса
const logger = time => console.log(`Fulfilled after ${time}ms`);

//Слухач кнопки підзавдання 1
buttonFirstEl.addEventListener('click', () => {
  delay(inputDelay).then(logger);
});

// delay(inputDelay).then(logger)

// // Tests
// delay(inputDelay).then(logger); // Fulfilled after 2000ms
// delay(1000).then(logger); // Fulfilled after 1000ms
// delay(1500).then(logger); // Fulfilled after 1500ms

//------------ ПІДЗАВДАННЯ 2 -----------------

//Знаходимо інпут підзавдання 1
const inputSecondEl = document.querySelector('#second-input');
//Знаходимо кнопку підзавдання 1
const buttonSecondEl = document.querySelector('[data-second]');

buttonSecondEl.disabled = 'true';

let selectedUser = null;

const users = [
  { name: 'Mango', active: true },
  { name: 'Poly', active: false },
  { name: 'Ajax', active: false },
];

const toggleUserState = (allUsers, username) => {

    return new Promise((resolve) => {
      resolve(allUsers.map(user =>
        user.name === username ? { ...user, active: !user.active } : user
      ));
    });
};

//Слухач елементу поля "select"
inputSecondEl.addEventListener('input', (event) => {
  if (event.currentTarget.value !== "undefined") {
    buttonSecondEl.removeAttribute('disabled');
  } else {
    buttonSecondEl.disabled = 'true';
  }
  selectedUser = event.currentTarget.value;
});
//Слухач кнопки підзавдання 2
buttonSecondEl.addEventListener('click', () => {
  toggleUserState(users, selectedUser).then(console.table);
});

// // // The function should work like this
// toggleUserState(users, 'Mango').then(console.table);
// toggleUserState(users, 'Ajax').then(console.table);

//------------ ПІДЗАВДАННЯ 3 -----------------

// const randomIntegerFromInterval = (min, max) => {
//   return Math.floor(Math.random() * (max - min + 1) + min);
// };

// const makeTransaction = (transaction, onSuccess, onError) => {
//   const delay = randomIntegerFromInterval(200, 500);

//   setTimeout(() => {
//     const canProcess = Math.random() > 0.3;

//     if (canProcess) {
//       onSuccess({ id: transaction.id, time: delay });
//     } else {
//       onError(transaction.id);
//     }
//   }, delay);
// };

// const logSuccess = ({ id, time }) => {
//   console.log(`Transaction ${id} processed in ${time}ms`);
// };

// const logError = id => {
//   console.warn(`Error processing transaction ${id}. Please try again later.`);
// };

// // Currently the function works like this
// makeTransaction({ id: 70, amount: 150 }, logSuccess, logError);
// makeTransaction({ id: 71, amount: 230 }, logSuccess, logError);

// // The function should work like this
// makeTransaction({ id: 70, amount: 150 }).then(logSuccess).catch(logError);
// makeTransaction({ id: 71, amount: 230 }).then(logSuccess).catch(logError);