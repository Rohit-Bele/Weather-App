import React, { useEffect } from 'react'
import searchIcon from '../src/assets/search.png'
import cloud from '../src/assets/cloud.png'
import clear from '../src/assets/clear.png'
import drizzel from '../src/assets/drizzle.png'
import humidity from '../src/assets/humidity.png'
import rain from '../src/assets/rain.png'
import snow from '../src/assets/snow.png'
import wind from '../src/assets/wind.png'
import './weather.css'

function Weather() {

  const fetchWeather = async (city) => {
    try {
        const api_key = "da578c7febc98487fcfd2687738283b5"

      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`;

      const response = await fetch(url);
      const data = await response.json();

      console.log(data);
      console.log("API KEY:", import.meta.env.VITE_API_KEY);

      console.log("City:", city);

    } catch (error) {
      console.log("Error:", error);
    }
  };

  useEffect(() => {
    fetchWeather("London");
  }, []);

  return (
    <div className='weather'>
      <div className='search-bar'>
        <input type="text" placeholder='search' />
        <img src={searchIcon} alt="search" />
      </div>

      <img className='weather-icon' src={clear} alt="weather" />
      <p className='temparature'>16°C</p>
      <p className='location'>London</p>

      <div className="weather-data">
        <div className="col">
          <img src={humidity} alt="humidity" />
          <div>
            <p>91%</p>
            <span>humidity</span>
          </div>
        </div>

        <div className="col">
          <img src={wind} alt="wind" />
          <div>
            <p>3.6 km/h</p>
            <span>wind speed</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Weather;
