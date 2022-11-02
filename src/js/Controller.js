import { App } from './App';
import { View } from './View';

export const Controller = () => {
  const app = App();
  const view = View();

  const getData = async () => {
    try {
      // view.renderSpinner();
      const city = view.userInput();
      const weather = await app.getWeather(city);
      view.clearInput();
      view.displayWeather(weather, app.state.units);
    } catch (err) {
      view.renderError();
    }
  };

  const switchUnits = async () => {
    const units = app.switchUnits();
    const city = view.userInput();
    const weather = await app.getWeather(city, units);
    view.updateWeather(weather, units);
  };

  const init = () => {
    view.addFormHandlers(getData);
    // view.addUnitsHandler(switchUnits);
  };

  return { init };
};
