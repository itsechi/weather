export const View = () => {
  const switchUnitsBtn = document.getElementById('switchUnits');
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
    switchUnitsBtn.addEventListener('click', e => {
      e.preventDefault();
      handler();
    });
  };

  const displayWeather = (weather, units) => {
    const leftMarkup = `
    <h1 id="temperature" class="weather__temp">${weather.temp}°${
      units === 'metric' ? 'C' : 'F'
    }</h1>
    <p id="feelsLike" class="weather__info info">Feels like <span class="weather__span">${
      weather.feels_like
    }°${units === 'metric' ? 'C' : 'F'}</span></p>
    <p id="humidity" class="weather__info info">Humidity <span class="weather__span">${
      weather.humidity
    }%</span></p>
    <p id="wind" class="weather__info info">Wind <span class="weather__span">${
      weather.wind
    } ${units === 'metric' ? 'km/h' : 'mph'}</span></p>
    `;

    const rightMarkup = `<h2 class="local__weather">${weather.description}</h2>
    <p class="local__info info">${weather.city} | ${weather.date}</p>`;

    weatherContainer.insertAdjacentHTML('beforeend', leftMarkup);
    localInfo.insertAdjacentHTML('beforeend', rightMarkup);
    switchUnitsBtn.classList.remove('hidden');
    switchUnitsBtn.textContent = `Switch to ${units === 'metric' ? 'F' : 'C'}`;
  };

  const updateWeather = (weather, units) => {
    const leftMarkup = `
    <h1 id="temperature" class="weather__temp">${weather.temp}°${
      units === 'metric' ? 'C' : 'F'
    }</h1>
    <p id="feelsLike" class="weather__info info">Feels like <span class="weather__span">${
      weather.feels_like
    }°${units === 'metric' ? 'C' : 'F'}</span></p>
    <p id="humidity" class="weather__info info">Humidity <span class="weather__span">${
      weather.humidity
    }%</span></p>
    <p id="wind" class="weather__info info">Wind <span class="weather__span">${
      weather.wind
    } ${units === 'metric' ? 'km/h' : 'mph'}</span></p>
    `;

    switchUnitsBtn.textContent = `Switch to ${units === 'metric' ? 'F' : 'C'}`;
    const newDOM = document.createRange().createContextualFragment(leftMarkup);
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const curElements = Array.from(weatherContainer.querySelectorAll('*'));

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];
      if (curEl.lastChild.nodeName === '#text')
        curEl.textContent = newEl.textContent;
    });
  };

  return {
    userInput,
    addFormHandlers,
    clearInput,
    renderError,
    displayWeather,
    addUnitsHandler,
    updateWeather,
  };
};
