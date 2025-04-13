function handleSearchFormSubmit(event) {
  event.preventDefault();
  let input = document.querySelector("#search-input");
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${input.value}`;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchFormSubmit);
