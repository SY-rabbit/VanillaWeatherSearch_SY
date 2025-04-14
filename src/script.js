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


