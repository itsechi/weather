import { App } from './App';
import { View } from './View';

export const Controller = () => {
  const app = App();
  const view = View();

  const getCity = async () => {
    try {
      const city = view.userInput();
      const weather = await app.getWeather(city);
      console.log(weather);
      view.clearInput();
    } catch (err) {
      view.renderError();
    }
  };

  const init = () => {
    view.addHandler(getCity);
  };

  return { init };
};
