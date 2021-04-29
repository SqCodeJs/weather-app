import React from 'react';
import PropTypes from "prop-types";
import Forecast from './Forecast'
import './CurrentForecast.css'

const   CurrentForecast = ({ forecast, weather }) => {
  
    const iconurl = "http://openweathermap.org/img/w/" + weather.weather[0].icon + ".png";

    console.log(weather);
    return ( 
    <>
    <div className="currentforecast">
        <h1>{weather.name}</h1>
        <h2>{weather.weather[0].description}</h2>
        <h3>{Math.floor(weather.main.temp)}<span>&#8451;</span></h3>
            <div className="weather-icon">
                {weather.weather.icon}
                <img style={{width:'60px'}} src= {iconurl}alt='ok' />
            </div>
    </div> 
    {forecast ?
    <Forecast
        forecast={forecast}
        weather={weather}/>
        : ''}
    </>
    );
}

CurrentForecast.propTypes = {
    // basic
    // weather: PropTypes.object.isRequired,

    // can be more specific:
    weather: PropTypes.shape({
        name: PropTypes.string,
        weather: PropTypes.array,
        main: PropTypes.object,
    }),

    forecast: PropTypes.array.isRequired
}

export default   CurrentForecast;