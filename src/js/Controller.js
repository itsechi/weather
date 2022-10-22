import { App } from './App';
import { View } from './View';

export const Controller = () => {
  const app = App();
  const view = View();

  const getData = async () => {
    try {
      const city = view.userInput();
      const weather = await app.getWeather(city);
      view.clearInput();
      view.displayWeather(weather);
    } catch (err) {
      view.renderError();
    }
  };

  const init = () => {
    view.addFormHandlers(getData);
    view.addUnitsHandler();
  };

  return { init };
};
