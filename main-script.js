/*task 1*/
function content_swap(){
const div4 = document.getElementById('div4');
const div5 = document.getElementById('div5');

const div4Content = div4.innerHTML;

div4.innerHTML = div5.innerHTML;
div5.innerHTML = div4Content;
}

/*task 2*/
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

/*task 3*/
function get_min_max(){
    let numbers = [];
    for(let i = 1; i<=10; i++){
        numbers.push(+document.getElementById('number'+i).value);
    }
    const minValue = Math.min(...numbers)
    const maxValue = Math.max(...numbers)
    alert(`${minValue} in get min max ${maxValue}`); //debug
    return {minValue, maxValue};
}

function register_cookies(minValue, maxValue){
    alert(`${minValue} in register ${maxValue}`); //debug
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
    alert(`${min} in retrieve ${max}`); //debug
    return {min, max};
 }

 function delete_cookies(){
    document.cookie = `maxValue=; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
    document.cookie = `minValue=; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
 }

 function show_results(){
    const {min, max} = retrieve_cookies();
    alert(`Мінімальне значення = ${min}\n Максимальне значення = ${max}`);
 }

 function is_min_max_exists(){
    const {min, max} = retrieve_cookies();
    if(min != null && max != null){
        return true;
    }
    else{
        return false;
    }
 }

 function form_submission(event) {
    event.preventDefault();
    const { minValue, maxValue } = get_min_max();
    alert(`Min: ${minValue}, before register Max: ${maxValue}`); //debug
    register_cookies(minValue, maxValue);
    show_results();
 }

 function remind_from_cookies(){
    const {min, max} = retrieve_cookies();
    const result_message = `Мінімальне значення = ${min}\nМаксимальне значення = ${max}`;
    const message = `${result_message}\n Видалити поточні значення?`;
    if(confirm(message)){
        delete_cookies();
    }
    else{
        alert('Файли кукі не були очищенні - форма min/max не доступна.\nДля використання форми перезавантажте сторінку.')
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






