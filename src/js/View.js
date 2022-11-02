export const View = () => {
  // const switchUnitsBtn = document.getElementById('switchUnits');
  const weatherContainer = document.getElementById('weather');
  // const localInfo = document.getElementById('localInfo');
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

  // const addUnitsHandler = handler => {
  //   switchUnitsBtn.addEventListener('click', e => {
  //     e.preventDefault();
  //     handler();
  //   });
  // };

  const displayWeather = (weather, units) => {
    function importImages(r) {
      let images = {};
      r.keys().map((item) => {
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
        <h1 class="weather__temperature">${weather.temp}°C</h1>
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
          <p>${weather.wind} km/h</p>
        </div>
        <div class="weather__info--card">
          <p>Humidity</p>
          <img src="${images[`icon-humidity.png`]}">
          <p>${weather.humidity}%</p>
        </div>
      </div>
    `;

    weatherContainer.insertAdjacentHTML('beforeend', markup);

    // const leftMarkup = `
    // <h1 id="temperature" class="weather__temp">${weather.temp}°${
    //   units === 'metric' ? 'C' : 'F'
    // }</h1>
    // <p id="feelsLike" class="weather__info info">Feels like <span class="weather__span">${
    //   weather.feels_like
    // }°${units === 'metric' ? 'C' : 'F'}</span></p>
    // <p id="humidity" class="weather__info info">Humidity <span class="weather__span">${
    //   weather.humidity
    // }%</span></p>
    // <p id="wind" class="weather__info info">Wind <span class="weather__span">${
    //   weather.wind
    // } ${units === 'metric' ? 'km/h' : 'mph'}</span></p>
    // `;

    // const rightMarkup = `
    // <div class="idk">    <h2 class="local__weather">${weather.description}</h2>
    // <p class="local__info info">${weather.city} | ${weather.date}</p></div>
    // <img src="${images[`icon-${weather.icon}.png`]}" class="weather-img">
    // `;

    // document.getElementById('bg').style.background = `url(${images[`bg-${weather.bg}.png`]}); background-position: center;`;
    // weatherContainer.insertAdjacentHTML('beforeend', leftMarkup);
    // localInfo.insertAdjacentHTML('beforeend', rightMarkup);
    // switchUnitsBtn.classList.remove('hidden');
    // switchUnitsBtn.textContent = `Switch to ${units === 'metric' ? 'F' : 'C'}`;
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
    // addUnitsHandler,
    updateWeather,
  };
};
