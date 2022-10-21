const API_KEY = "97a89e3b3c67cefd91f36cb6a4e3a692";

fetch(`http://api.openweathermap.org/data/2.5/weather?q=London&APPID=${API_KEY}
`)
  .then((res) => res.json())
  .then((data) => console.log(data));
