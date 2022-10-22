import { App } from './App';
import { View } from './View';
import format from 'date-fns/format';

export const Controller = () => {
  const app = App();
  const view = View();

  const getData = async () => {
    try {
      const city = view.userInput();
      const data = await app.getWeather(city);
      const weather = {
        temp: Math.round(data.main.temp),
        feels_like: Math.round(data.main.feels_like),
        humidity: Math.round(data.main.humidity),
        wind: Math.round(data.wind.speed),
        description: data.weather[0].main.toUpperCase(),
        city: data.name,
        date: format(new Date(), 'EEEE | p'),
      };
      console.log(data);
      view.clearInput();
      view.displayWeather(weather);
    } catch (err) {
      view.renderError();
    }
  };

  const init = () => {
    view.addHandler(getData);
  };

  return { init };
};
