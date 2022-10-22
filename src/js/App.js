export const App = () => {
  const API_KEY = '97a89e3b3c67cefd91f36cb6a4e3a692';

  const getWeather = async city => {
    try {
      const res = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${API_KEY}&units=metric`
      );
      const data = await res.json();
      if (!res.ok) throw new Error(`City not found (${res.status})`);
      return data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  return { getWeather };
};
