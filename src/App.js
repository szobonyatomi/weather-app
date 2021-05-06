import React, { Component, useEffect, useState } from 'react';
import { getWeatherData, getForecastData } from './data/weatherapi';
import { FiSearch } from 'react-icons/fi';

import './App.css';

import 'weather-icons/css/weather-icons.css';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [city, setCity] = useState('Paris');
  const [unit, setUnit] = useState('metric');
  const [days, setDays] = useState([]);
  const [daily, setDaily] = useState([]);
  const [icon, setIcon] = useState('wi na');

  const getData = async () => {
    try {
      const data = await getWeatherData(city, unit);

      setWeatherData(data);
    } catch (error) {
      console.error(error);
    }
  };
  console.log(Array.isArray(weatherData));

  const getForecast = async () => {
    try {
      const data = await getForecastData(city, unit);

      //setForecastData(data);
      //console.log(forecastData);
      // console.log(forecastData.list);
      // setDays(forecastData.list);
      // console.log(days);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
    getForecast();
  }, []);

  function search() {
    getData();
    getForecast();
  }

  //time-converter:
  // const date = new Date(forecastData.list[0].dt * 1000);
  // const day = date.getDate();
  // const month = date.getMonth() + 1;

  //icon-converter
  // const rangeId = weatherData.weather[0].id;
  // const Thunderstorm = 'wi-thunderstorm';
  // const Drizzle = 'wi-sleet';
  // const Rain = 'wi-storm-showers';
  // const Snow = 'wi-snow';
  // const Atmosphere = 'wi-fog';
  // const Clear = 'wi-day-sunny';
  // const Clouds = 'wi-day-fog';

  function getWeatherIcon(rangeId) {
    switch (true) {
      case rangeId >= 200 && rangeId < 232:
        setIcon('wi-thunderstorm');
        break;
      case rangeId >= 300 && rangeId <= 321:
        setIcon('wi-sleet');
        break;
      case rangeId >= 500 && rangeId <= 521:
        setIcon('wi-storm-showers');
        break;
      case rangeId >= 600 && rangeId <= 622:
        setIcon('wi-snow');
        break;
      case rangeId >= 701 && rangeId <= 781:
        setIcon('wi-fog');
        break;
      case rangeId === 800:
        setIcon('wi-day-sunny');
        break;
      case rangeId >= 801 && rangeId <= 804:
        setIcon('wi-day-cloudy-high');
        break;
      default:
        setIcon('wi-thermometer');
    }
    return icon;
  }

  // getWeatherIcon(weatherData.weather[0].id);
  // console.log(icon);

  return (
    <div className="App">
      <div className="header">
        <form className="search-bar">
          <input
            type="search"
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter your city"
            className="custom"
          />
          <button className="searchIcon" type="button" onClick={() => search()}>
            <FiSearch />
          </button>
        </form>
      </div>
      {weatherData !== null ? (
        <div className="weatherContainer">
          <h3 className="location">{weatherData.name}</h3>
          <h2 className="wi"></h2>
          <h1>{parseFloat(weatherData.main.temp).toFixed(1)}</h1>
          <h5>
            Feels like: {parseFloat(weatherData.main.feels_like).toFixed(0)}
          </h5>
        </div>
      ) : null}

      {forecastData !== null ? (
        <div className="forecastContainer">
          {setDaily(
            forecastData.list.map(function (item) {
              return item;
              <h6>
                djslkjd
                {parseFloat(item.temp.min).toFixed(0)}/
                {parseFloat(item.temp.max).toFixed(0)}
              </h6>;
            })
          )}

          <div className="dayBox">
            <p>3/4</p>
            <i className=""></i>
            <h6>
              {parseFloat(forecastData.list[0].temp.min).toFixed(0)}/
              {parseFloat(forecastData.list[0].temp.max).toFixed(0)}
            </h6>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default App;
