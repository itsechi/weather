export const View = () => {
  const weatherContainer = document.getElementById('weather');
  // const spinner = document.querySelector('.lds-ripple');

  const userInput = () => {
    let input = document.getElementById('inputCity').value;
    return input;
  };

  const clearInput = () => {
    document.getElementById('inputCity').value = '';
    // spinner.style.display = "none"
  };

  // const renderSpinner = () => {
  //   spinner.style.display = "inline-block"
  // }

  const clearWeatherInfo = () => {
    document.getElementById('error').classList.add('hidden');
    document.getElementById('formInfo').classList.add('hidden');
    weatherContainer.innerHTML = '';
  };

  const renderError = () => {
    const errorMessage = document.getElementById('error');
    errorMessage.classList.remove('hidden');
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
    weatherContainer.addEventListener('click', e => {
      if (e.target.classList.contains('weather__units--inactive')) {
        const inactiveUnits = e.target;
        const activeUnits = document.querySelector('.weather__units--active');
        inactiveUnits.classList.remove('weather__units--inactive');
        inactiveUnits.classList.add('weather__units--active');
        activeUnits.classList.remove('weather__units--active');
        activeUnits.classList.add('weather__units--inactive');
        e.preventDefault();
        handler();
      }
    });
  };

  const displayWeather = (weather, units) => {
    weatherContainer.innerHTML = '';
    function importImages(r) {
      let images = {};
      r.keys().map(item => {
        images[item.replace('./', '')] = r(item);
      });
      return images;
    }

    const images = importImages(
      require.context('../assets', false, /\.(png|jpe?g|svg)$/)
    );
    console.log(images['icon-clouds.png']);

    const markup = `
      <div class="weather__details">
        <h3 class="weather__description">${weather.description}</h3>
        <p class="weather__location">${weather.city} | ${weather.date}</p>
        <img src="${images[`icon-${weather.icon}.png`]}" class="weather__img">
        <h1 class="weather__temperature">${weather.temp}°
        <span class="weather__units">
          <span class="weather__units--${
            units === 'metric' ? 'active' : 'inactive'
          }">C</span>
          |
          <span class="weather__units--${
            units === 'metric' ? 'inactive' : 'active'
          }">F</span>
        </span>
        </h1>
      </div>

      <div class="weather__info">
        <div class="weather__info--card">
          <p>Feels like</p>
          <img src="${images[`icon-feels_like.png`]}">
          <p>${weather.feels_like}°</p>
        </div>
        <div class="weather__info--card">
          <p>Wind</p>
          <img src="${images[`icon-wind.png`]}">
          <p>${weather.wind} ${units === 'metric' ? 'km/h' : 'mph'}</p>
        </div>
        <div class="weather__info--card">
          <p>Humidity</p>
          <img src="${images[`icon-humidity.png`]}">
          <p>${weather.humidity}%</p>
        </div>
      </div>
    `;

    weatherContainer.insertAdjacentHTML('beforeend', markup);
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
