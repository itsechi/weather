export const View = () => {
  const form = document.getElementById('form');
  const searchBtn = document.getElementById('searchBtn');
  const weatherContainer = document.getElementById('weather');

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

  const addHandler = handler => {
    form.addEventListener('submit', e => {
      handlerHelper(e, handler);
    });
    searchBtn.addEventListener('click', e => {
      handlerHelper(e, handler);
    });
  };

  const displayWeather = weather => {
    const html = `
    <h1 id="temperature" class="weather__temp">${weather.temp}°C</h1>
    <p id="feelsLike" class="weather__info">Feels like <span class="weather__span">${weather.feels_like}°C</span></p>
    <p id="humidity" class="weather__info">Humidity <span class="weather__span">${weather.humidity}%</span></p>
    <p id="wind" class="weather__info">Wind <span class="weather__span">${weather.wind} km/h</span></p>
    `;
    weatherContainer.insertAdjacentHTML('beforeend', html);
  };

  return { userInput, addHandler, clearInput, renderError, displayWeather };
};
