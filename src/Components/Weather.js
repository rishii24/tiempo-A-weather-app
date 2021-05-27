import React, { useState } from 'react';
import background from '../Images/weather.jpg'

import '../Styles/Weather.css';

import fetchWeather from '../API/fetchWeather'

const Weather = () => {
    const [query, setQuery] = useState('')
    const [weather, setWeather] = useState({})

    const search = async (e) => {
        if (e.key === 'Enter') {
            const data = await fetchWeather(query)

            setWeather(data)
            setQuery('');
        }
    }


    return (
        <div className="main-container">
            <div className="app-bg">
                <img src={background} alt="" />
            </div>
            <h2>tiempo`</h2>
            <input
                type='text'
                className='search'
                autoFocus
                placeholder='Search here..'
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={search}
            />
            {/*Displaying weather info*/}
            {weather.main && (
                <div className="city">
                    <h3 className="city-name">
                        <span>
                            {weather.name}
                        </span>
                        <sup>
                            {weather.sys.country}
                        </sup>
                    </h3>
                    <div className="temp-status">
                        {Math.round(weather.main.temp)}
                        <sup>&deg;C</sup>
                    </div>
                    <div className="info">
                        <img className="city-icon" src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} />
                        <p>{weather.weather[0].description}</p>
                    </div>
                </div>
            )}
            <div className="footer">
                <p>	&#xA9;<b></b>tiempo` 2021 | All rights reserved.  </p>
            </div>
        </div>
    );
}

export default Weather
