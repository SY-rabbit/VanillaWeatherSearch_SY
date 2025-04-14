function getWeather(response) {
  let tempElement = document.querySelector("#current-temp");
  let CityTemp = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.city;
  tempElement.innerHTML = Math.round(CityTemp);
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
