export const View = () => {
  const weatherContainer = document.getElementById('weather');
  const localInfo = document.getElementById('localInfo');

  const userInput = () => {
    let input = document.getElementById('inputCity').value;
    return input;
  };

  const clearInput = () => {
    document.getElementById('inputCity').value = '';
  };

  const clearWeatherInfo = () => {
    document.getElementById('message').textContent = '';
    weatherContainer.innerHTML = '';
    localInfo.innerHTML = '';
  };

  const renderError = () => {
    const errorMessage = document.getElementById('message');
    errorMessage.textContent = 'City not found';
  };

  const handlerHelper = (e, handler) => {
    e.preventDefault();
    clearWeatherInfo();
    handler();
  };

  const addFormHandlers = handler => {
    const form = document.getElementById('form');
    form.addEventListener('submit', e => {
      handlerHelper(e, handler);
    });

    const searchBtn = document.getElementById('searchBtn');
    searchBtn.addEventListener('click', e => {
      handlerHelper(e, handler);
    });
  };

  const addUnitsHandler = handler => {
    const switchUnitsBtn = document.getElementById('switchUnits');
    switchUnitsBtn.addEventListener('click', e => {
      e.preventDefault();
      handler();
    });
  };

  const displayWeather = weather => {
    const left = `
    <h1 id="temperature" class="weather__temp">${weather.temp}°C</h1>
    <p id="feelsLike" class="weather__info info">Feels like <span class="weather__span">${weather.feels_like}°C</span></p>
    <p id="humidity" class="weather__info info">Humidity <span class="weather__span">${weather.humidity}%</span></p>
    <p id="wind" class="weather__info info">Wind <span class="weather__span">${weather.wind} km/h</span></p>
    `;
    weatherContainer.insertAdjacentHTML('beforeend', left);

    const right = `<h2 class="local__weather">${weather.description}</h2>
    <p class="local__info info">${weather.city} | ${weather.date}</p>`;
    localInfo.insertAdjacentHTML('beforeend', right);
  };

  return {
    userInput,
    addFormHandlers,
    clearInput,
    renderError,
    displayWeather,
    addUnitsHandler,
  };
};
