require('../css/main.css');

let counter1 = 0;
let catClickerCounterElement1 = document.getElementById('cat-clicker1-counter');
let catClickerElement1= document.getElementById('cat-clicker1');

catClickerCounterElement1.innerHTML = counter1;
catClickerElement1.addEventListener('click', () => {
    counter1++;
    catClickerCounterElement1.innerHTML = counter1;
}, false);


let counter2 = 0;
let catClickerCounterElement2 = document.getElementById('cat-clicker2-counter');
let catClickerElement2 = document.getElementById('cat-clicker2');

catClickerCounterElement2.innerHTML = counter2;
catClickerElement2.addEventListener('click', () => {
    counter2++;
    catClickerCounterElement2.innerHTML = counter2;
}, false);
