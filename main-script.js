/*task 1
Поміняйте місцями контент блоків «4» та «5».
*/
function content_swap(){
const div4 = document.getElementById('div4');
const div5 = document.getElementById('div5');

const div4Content = div4.innerHTML;

div4.innerHTML = div5.innerHTML;
div5.innerHTML = div4Content;
}

/*task 2
Напишіть функцію, яка обчислює площу
трикутника, беручи необхідні значення із
відповідних змінних у скрипті, і виводить
отриманий результат в кінці контенту в блоці «3».*/
function calculate_area(event) {
    event.preventDefault();

    const sideA = parseFloat(document.getElementById('sideA').value);
    const sideB = parseFloat(document.getElementById('sideB').value);
    const sideC = parseFloat(document.getElementById('sideC').value);

    if (sideA + sideB > sideC && sideA + sideC > sideB && sideB + sideC > sideA) {
        const s = (sideA + sideB + sideC) / 2;
        const area = Math.sqrt(s * (s - sideA) * (s - sideB) * (s - sideC));
        document.getElementById('result-field').innerText = `Площа: ${area}`;
    } else {
        alert('Сума двох сторін перевищує значення 3-ї!');
    }
}

/*task 3
Напишіть скрипт, який визначає кількість
мінімальних чисел із 10 значень, беручи необхідні
значення із відповідної форми в блоці «3», а
отриманий результат виводить за допомогою
діалогового вікна і зберігає в cookies, причому:
а) при оновленні веб-сторінки в броузері користувачу за допомогою
діалогового вікна виводиться інформація, збережена в cookies, із
інформуванням, що після натискання кнопки «ОК» відбудеться видалення
даних із cookies, і не виводиться згадана вище форма;
б) при натисканні кнопки «ОК» відповідні cookies видаляються, і виводиться
наступне діалогове вікно із повідомленням, що cookies видалено, а натискання
кнопки «ОК» перезавантажує веб-сторінку з початковим станом із наявною
формою для введення даних.*/
function get_min_max(){
    let numbers = [];
    for(let i = 1; i<=10; i++){
        numbers.push(+document.getElementById('number'+i).value);
    }
    const minValue = Math.min(...numbers)
    const maxValue = Math.max(...numbers)
    return {minValue, maxValue};
}

function register_cookies(minValue, maxValue){
   document.cookie = `minValue=${minValue};`;
   document.cookie = `maxValue=${maxValue};`;
}

function retrieve_cookies(){
    let cookie_pairs = document.cookie.split('; ');
    let cookie_token = {};
    for(const cookie_pair of cookie_pairs){
        const [name, value] = cookie_pair.split('=');
        cookie_token[name] = value;
    }
    const min = +cookie_token.minValue;
    const max = +cookie_token.maxValue;
    return {min, max};
 }

 function delete_cookies(){
    document.cookie = `maxValue=; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
    document.cookie = `minValue=; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
 }
 
 function hide_min_max_form(){
    const min_max_to_hide = document.querySelector('.min-max-container');
    min_max_to_hide.remove();
 }

 function show_results(){
    const {min, max} = retrieve_cookies();
    alert(`Мінімальне значення = ${min}\n Максимальне значення = ${max}`);
 }

 function is_min_max_exists() {
        const { min, max } = retrieve_cookies();
        return !isNaN(min) && !isNaN(max);
    }

 function form_submission(event) {
    event.preventDefault();
    const { minValue, maxValue } = get_min_max();
    register_cookies(minValue, maxValue);
    show_results();
 }

 function remind_from_cookies(){
    const {min, max} = retrieve_cookies();
    const result_message = `Мінімальне значення = ${min}\nМаксимальне значення = ${max}`;
    const message = `${result_message}\n Видалити поточні значення?`;
    if(confirm(message)){
        delete_cookies();
        location.reload();
    }
    else{
        alert('Файли кукі не були очищенні - форма min/max не доступна.\nДля використання форми перезавантажте сторінку.');
        hide_min_max_form();
    }
 }

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementsByClassName('min-max-form')[0]; 
    form.addEventListener('submit', form_submission);
});

 (() => {
   if(is_min_max_exists()){
    remind_from_cookies();
   }
})();

/*Task 4
Напишіть скрипт, який при настанні події load змінює колір тексту блоку «3» на
вказаний користувачем і зберігає відповідне значення кольору в localStorage
броузера так, щоб при наступному відкриванні веб-сторінки значення кольору
тексту блоку «3» встановлювалось із збереженого значення в localStorage.*/

(() => {

  const changeTextColor = (color) => {
    document.querySelector('main').style.color = color;
  }
  
  //Змінює колір тексту при завантаженні сторінки
  const color = localStorage.getItem('color');
  if (color) {
    changeTextColor(color);
    let colorOutput = document.getElementById('color-output');
    colorOutput.value = color;
  }

  const form = document.querySelector('.color-picker-form');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const pickedColor = document.getElementById('color-input').value;
    let colorOutput = document.getElementById('color-output');
    colorOutput.value = pickedColor;
    localStorage.setItem('color', pickedColor);
    location.reload();
  });
})();

/*Task 5
Напишіть скрипт створення ненумерованого списку:
а) необхідні елементи форми появляються у відповідних номерних блоках (1..6)
внаслідок подвійного кліку на довільному контенті блоку;
б) кількість пунктів ненумерованого списку необмежена;
в) поруч розміщується кнопка, внаслідок натискання на яку внесені дані
ненумерованого списку зберігаються в localStorage броузера (структуровано на
ваш розсуд), а сам список заміщує початковий вміст відповідного номерного
блока;
г) перезавантаження веб-сторінки призводить до видалення нового вмісту із
localStorage броузера.*/

function createUnorderedList(content) {
  let listItems = content.split('\n').map(item => `<li>${item.trim()}</li>`).join('');
  return `<ul class="scrollable-list">${listItems}</ul>`;
}

function addListForm(event) {
  event.preventDefault();
  let targetBlock = event.target.closest('#div1, #div2, #div3, #div4, #div5, #div6');
  if (targetBlock) {
      let formHTML = `
          <form class="list-input-form">
              <label for="userInput">Додайте елементи списку (1 елемент на рядок):</label>
              <textarea id="userInput" class="user-input" rows="2" required></textarea>
              <button type="submit">Зберегти</button>
          </form>
      `;
      targetBlock.insertAdjacentHTML('beforeend', formHTML);

      let form = targetBlock.querySelector('.list-input-form');
      let userInputElement = form.querySelector('#userInput');

      form.addEventListener('submit', function (e) {
          e.preventDefault();
          let userInput = userInputElement.value;
          let unorderedList = createUnorderedList(userInput);
          targetBlock.innerHTML = unorderedList;
          localStorage.setItem(`block_${targetBlock.dataset.blockNumber}_list`, unorderedList);
      });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.body.addEventListener("dblclick", (event) => {
    event.preventDefault();
      addListForm(event);
  });
});


  window.addEventListener('beforeunload', () => {
      for(let i = 1; i<=6; i++)
      {
        localStorage.removeItem(`block_${i}_list`);
      }
  });



