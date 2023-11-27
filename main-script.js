function content_swap(){
const div4 = document.getElementById('div4');
const div5 = document.getElementById('div5');

const div4Content = div4.innerHTML;

div4.innerHTML = div5.innerHTML;
div5.innerHTML = div4Content;
}