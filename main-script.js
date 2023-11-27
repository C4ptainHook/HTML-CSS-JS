function content_swap(){
const div4 = document.getElementById('div4');
const div5 = document.getElementById('div5');

const div4Content = div4.innerHTML;

div4.innerHTML = div5.innerHTML;
div5.innerHTML = div4Content;
}

function calculateArea(event) {
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