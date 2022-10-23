import format from 'date-fns/format';

export const App = () => {
  const API_KEY = '97a89e3b3c67cefd91f36cb6a4e3a692';
  const state = {
    city: '',
    units: 'metric',
  };

  const getWeather = async (city, units = state.units) => {
    if (city) state.city = city;
    try {
      const res = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${state.city}&APPID=${API_KEY}&units=${units}`
      );
      const data = await res.json();
      if (!res.ok) throw new Error(`City not found (${res.status})`);

      const weather = {
        temp: Math.round(data.main.temp),
        feels_like: Math.round(data.main.feels_like),
        humidity: Math.round(data.main.humidity),
        wind: Math.round(data.wind.speed),
        description: data.weather[0].main.toUpperCase(),
        city: data.name,
        date: format(new Date(), 'EEEE | p'),
      };

      return weather;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const switchUnits = () => {
    if (state.units === 'metric') return (state.units = 'imperial');
    if (state.units === 'imperial') return (state.units = 'metric');
  };

  return { getWeather, switchUnits, state };
};
