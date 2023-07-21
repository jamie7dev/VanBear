const API_KEY = "c740a1478fa3604acd8742f19339f05f";

function weather() {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=Vancouver&appid=${API_KEY}&units=metric`;
  // console.log(url);

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const weather = document.getElementById("weather");
      const temperature = document.getElementById("temperature");
      weather.innerText = data.weather[0].main;
      temperature.innerText = `${Math.floor(data.main.temp)}°C`;
    });
}
weather();
