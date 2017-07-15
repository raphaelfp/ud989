require('../css/main.css');

let counter = 0;
let catClickerCounterElement = document.getElementById('cat-clicker-counter');
let catClickerElement = document.getElementById('cat-clicker');

catClickerCounterElement.innerHTML = counter;
catClickerElement.addEventListener('click', () => {
    counter++;
    catClickerCounterElement.innerHTML = counter;
}, false);
