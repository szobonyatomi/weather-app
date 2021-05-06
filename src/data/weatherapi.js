import axios from 'axios';

const baseUrl = 'https://pro.openweathermap.org/data/2.5/weather?';
const forecastUrl = 'https://pro.openweathermap.org/data/2.5/forecast/daily?';

const apiKey = '9dab47acc24653fdecb0137367fae13c';

//Current data

export const getWeatherData = async (cityname, unit) => {
  try {
    const { data } = await axios.get(
      baseUrl + `q=${cityname}&units=${unit}&appid=${apiKey}`
    );
    console.log(data);
    return data;
  } catch (error) {
    throw error;
  }
};

//Forecast

export const getForecastData = async (cityname, unit) => {
  try {
    const { data } = await axios.get(
      forecastUrl + `q=${cityname}&units=${unit}&cnt=5&appid=${apiKey}`
    );
    console.log(data);
    return data;
  } catch (error) {
    throw error;
  }
};
