console.log('client side javascript file is loaded!');

const weatherForm = document.querySelector('form');
const value = document.querySelector('input');
const city = document.querySelector('.city');
const forecast = document.querySelector('.forecast');
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = value.value;
    city.textContent = 'Loading...'
    forecast.textContent = '';
    console.log(location);
    fetch(`http://localhost:3001/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
        if(data.error) {
            city.textContent = data.error;
        } else {
            city.textContent = data.location
            forecast.textContent = data.forecast
        }
    })
})

})