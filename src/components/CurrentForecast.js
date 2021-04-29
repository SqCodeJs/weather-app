import React from 'react';
import PropTypes from "prop-types";
import styled from "styled-components";
import Forecast from './Forecast'
import './CurrentForecast.css'

const CurrentForecastWrapper = styled.div`
        width: 90%;
    height: 200px;
    margin:20px auto;
    
    color: rgba(255, 255, 255, 0.915);
    border-top:1px solid rgba(255, 255, 255, 0.915);
    border-bottom: 1px solid rgba(255, 255, 255, 0.915); 
`


const H2Component = styled.h2` //etc
    font-size: 1.225rem;
`

const MainTemp = styled.h3`
font-size: 3rem;
`

const   CurrentForecast = ({ forecast, weather }) => {
  
    const iconurl = "http://openweathermap.org/img/w/" + weather.weather[0].icon + ".png";

    console.log(weather);
    return ( 
    <>
    <CurrentForecastWrapper>
        <h1>{weather.name}</h1>
        <H2Component>{weather.weather[0].description}</H2Component>
        <MainTemp>{Math.floor(weather.main.temp)}<span>&#8451;</span></MainTemp>
            <div className="weather-icon">
                {weather.weather.icon}
                <img style={{width:'60px'}} src= {iconurl}alt='ok' />
            </div>
    </CurrentForecastWrapper>
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