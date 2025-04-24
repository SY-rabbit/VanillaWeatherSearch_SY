function getWeather(response) {
  let tempElement = document.querySelector("#current-temp");
  let CityTemp = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  let descpriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind-speed");
  let timeElement = document.querySelector("#date-and-time");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#weather-icon");

  cityElement.innerHTML = response.data.city;
  tempElement.innerHTML = Math.round(CityTemp);
  descpriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = response.data.temperature.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  timeElement.innerHTML = `${date.getDate()} / ${
    date.getMonth() + 1
  } / ${date.getFullYear()} ${formatDate(date)}`;
  iconElement.setAttribute(
    "src",
    `https://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  iconElement.setAttribute("alt", response.data.condition.description);

  getForecast(response.data.city);
}

function formatDate(date) {
  let weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = weekdays[date.getDay()];
  let hour = date.getHours();
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hour < 10) {
    hour = `0${hour}`;
  }
  return ` |${day} | ${hour}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "a2t704ade1b003d643fa9333o6bb8862";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(getWeather);
}

function searchResult(event) {
  event.preventDefault();
  let input = document.querySelector("#search-input");
  searchCity(input.value);
}

let form = document.querySelector("form");
form.addEventListener("submit", searchResult);

function getForecast(city) {
  let apiKey = "a2t704ade1b003d643fa9333o6bb8862";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(displayforecast);
}
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}
function displayforecast(response) {
  console.log(response.data);
  let forecastHTML = "";
  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
      <div class="forecast-day">
      <div class="forecast-icon"><img src="${day.condition.icon_url}"/></div>
     <div class="forecast-date">${formatDay(day.time)}</div>
      <div class="forecast-max-temp">${Math.round(
        day.temperature.maximum
      )}<span class="forecat-temp-unit-max">°C</span></div>
      <div class="forecast-min-temp">${Math.round(
        day.temperature.minimum
      )}<span class="forecat-temp-unit-min">°C</span></div>
    </div>`;

      let forecastELement = document.querySelector("#forecast");
      forecastELement.innerHTML = forecastHTML;
    }
  });
}

searchCity("London");
getForecast("London");
displayforecast("London");
