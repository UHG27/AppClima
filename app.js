const APIKEY = '3033a64084deb3816048ca1b914a971f';

const URLBASE = "https://api.openweathermap.org/data/2.5/weather?";
 
async function request(url){
    return fetch(url).then(data => data.json());
}



async function getWeather(lat, lon){
    url = `${ URLBASE }lat=${ lat }&lon=${ lon }&appid=${APIKEY}`;
    const weather = await request(url);
    console.log(weather); 
    updateDOM(weather.name, weather.main.temp);
}

async function getWeatherByCity(city){
    const url = URLBASE + `q=${ city }&appid=${ APIKEY }`;
    const weather = await request(url);
    updateDOM(weather.name, weather.main.temp);
}

function updateDOM(city, temp) {
    //actualizar h2 de ciudad
    const ciudad = document.getElementById('city')
    ciudad.textContent = city
    //actualizar h2 de temp
    const tempElement = document.getElementById('temp');
    tempElement.textContent =  temp - 273.15;
    //actualizar fondo dependiendo de la temperatura
    if (temp < 0) {
        document.body.style.backgroundColor = "#005a9c";
      } else if (temp >= 0 && temp < 10) {
        document.body.style.backgroundColor = "#008cba";
      } else if (temp >= 10 && temp < 20) {
        document.body.style.backgroundColor = "#7fcdbb";
      } else {
        document.body.style.backgroundColor = "#ffb6c1";
     }}

     async function getWeatherByCity(cityName, country){
        const url = URLBASE + `q=${ cityName},${ country }&appid=${ APIKEY }`;
        const weather = await request(url);
        updateDOM(weather.name, weather.main.temp);


    document.getElementById("weatherForm").addEventListener("submit", function(event){
        event.preventDefault();
        const city = document.getElementById("cityInput").value;
        const country = document.getElementById("countryInput").value;
        const query = country ? `q=${london}, ${UnitedKingdom}` : city;
        getWeatherByCity(query);
    })
     }


navigator.geolocation.getCurrentPosition(position => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    getWeather(lat, lon);
});