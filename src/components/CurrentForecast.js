import React from 'react';
import Forecast from './Forecast'
import './CurrentForecast.css'

const   CurrentForecast = (props) => {
  
    const iconurl = "http://openweathermap.org/img/w/" + props.weather.weather[0].icon + ".png";
    
    return ( 
    <>
    <div className="currentforecast">
        <h1>{props.weather.name}</h1>
        <h2>{props.weather.weather[0].description}</h2>
        <h3>{Math.floor(props.weather.main.temp)}<span>&#8451;</span></h3>
            <div className="weather-icon">
                {props.weather.weather.icon}
                <img style={{width:'60px'}} src= {iconurl}alt='ok' />
            </div>
    </div> 
    {props.forecast ? 
    <Forecast
        forecast={props.forecast}
        weather={props.weather}/>
        : ''}
    </>
    );
}

export default   CurrentForecast;