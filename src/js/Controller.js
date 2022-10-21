import { App } from './App';
import { View } from './View';

export const Controller = () => {
  const getCity = () => {
    const city = View().userInput();
    App().getWeather(city);
    console.log(city);
    View().clearInput();
  };

  const init = () => {
    View().addHandler(getCity);
  };

  return { init };
};
