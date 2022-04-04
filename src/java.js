


function search(searchInput){
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput}&units=imperial&appid=${apiKey}`;
  axios.get(url).then(showWeather);
}

function handleSubmit(event) {
  event.preventDefault();  
  let searchInput = document.querySelector("#city-entered").value;
  search(searchInput);

}

function getCurrentLocation(event) {
  console.log(event);
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(gpsPosition);
}

function showWeather(response) {

  let weatherIcon = document.querySelector("#weather-picture");

  farTemp = response.data.main.temp;

  document.querySelector("#weather-city").innerHTML = response.data.name;
  document.querySelector("#weather-data").innerHTML = Math.round(response.data.main.temp);

  document.querySelector("#max-and-min").innerHTML = `${Math.round(response.data.main.temp_max)}° / ${Math.round(response.data.main.temp_min)}°`;
  
  document.querySelector("#weather-description").innerHTML = response.data.weather[0].description;
  
  weatherIcon.setAttribute("src", `images/${response.data.weather[0].icon}.svg`);

  document.querySelector("#wind-speed").innerHTML = response.data.wind.speed;

  getForecast(response.data.coord);
}

function gpsPosition(position){
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
  axios.get(url).then(showWeather);
}




function formatDay(timestamp){
  let date = new Date(timestamp * 1000);
  let day = date.getDay();

  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
    forecastHTML =
      forecastHTML +
      `
      <div class="col-2" id="forecast">
        <h5 id="forecast-day">${formatDay(forecastDay.dt)}</br>
            <span id="forecast-icon"><img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          
        /></span></br>
            <span id="forecast-max">${Math.round(forecastDay.temp.max)}</span>/<span id="forecast-min">${Math.round(forecastDay.temp.min)}</span>
        </h5>

      </div>`;
        }
  })

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
}



let button = document.querySelector("#gps-button");

button.addEventListener("click", getCurrentLocation);


let farTemp = null;


let form = document.querySelector("#change-city");

form.addEventListener("submit", handleSubmit);





let now = new Date();

let h3 = document.querySelector("h3");

let date = now.getDate();
let hours = now.getHours();
if(hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if(minutes < 10) {
  minutes = `0${minutes}`;
}
let year = now.getFullYear();

let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
let month = months[now.getMonth()];

h3.innerHTML = `${month} ${date}, ${year} ${hours}:${minutes}`




search("New York");

displayForecast();