console.log('Client side javascript file is loaded!')

const weatherForm = document.querySelector('form');
const search = weatherForm.querySelector('input');
const messageOne = document.querySelector('#messageOne');
const messageTwo = document.querySelector('#messageTwo');

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const location = search.value;

    messageOne.innerHTML = 'Loading..';
    messageTwo.innerHTML = '';

    fetch("http://localhost:3000/weather?address=" + location)
        .then((res) => res.json())
        .then((res) => {
            if(res.error) {
                messageOne.innerHTML = res.error;
            } else {
                messageOne.innerHTML = res.location;
                messageTwo.innerHTML = res.forecast;
            }
        });



    // getWeather.bind(event.target,event)();
});