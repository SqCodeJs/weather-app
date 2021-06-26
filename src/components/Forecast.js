import React from "react";
import { getIconBasedOn } from "./functions";
import styled from "styled-components";
import PropTypes from "prop-types";
const Forecast = ({ weather, setMainDispelyOnForecast }) => {
  const timeZone = weather.timezone;
  // console.log(Array.isArray(weather.forecast), "typ", typeof weather.forecast);
  const hurlyForecast = weather.forecast
    // .filter((treeHours, idx) => idx < 16)
    .map((item, i) => (
      <ColumnsStyled key={i} onClick={() => setMainDispelyOnForecast(i)}>
        <HourStyled>
          {new Date((item.dt + timeZone) * 1000).toLocaleTimeString("en-GB", {
            hour: "numeric",
            minute: "2-digit",
          })}
        </HourStyled>
        <WeatherIconStyled>
          <img
            // src={`http://openweathermap.org/img/w/${item.weather[0].icon}.png`}
            //src={getIconBasedOn(weather.forecast[i].weather[0].icon)}
            src={getIconBasedOn(item.weather[0].icon)}
            alt="ok"
          />
        </WeatherIconStyled>
        <TemperatureStyled>
          {Math.floor(item.main.temp)}
          <SpanStyled>&#8451;</SpanStyled>
        </TemperatureStyled>
      </ColumnsStyled>
    ));

  return (
    <ForecastStyled>{hurlyForecast ? hurlyForecast : null}</ForecastStyled>
  );
};
const ForecastStyled = styled.div`

  
margin:5% 0 0 5%;
  width:95%;
  padding:20px;
box-sizing: border-box;
 overflow-x: scroll;

  // background-color:rgba(250, 250, 250, .2);
  background-color:rgba(50, 0, 0, .2);
border-radius: 25px;
letter-spacing: 2px;
color: rgba(220,240,250,1);
font-family: Trebuchet MS, sans-serif;

  display: flex;
   justify-content: start;
  flex-grow: 0;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;
const ColumnsStyled = styled.div`
  margin: 0;
  padding: 20px;
  box-sizing: border-box;
  width: 400px;
  cursor: pointer;

  display: flex;
  flex-direction: column;
  justify-content: center;
  // border: 2px solid white;

 


  // color: rgba(255, 255, 255, 0.792);
  // font-family: sans-serif;
  // text-align: center;
  // border-bottom: 1px solid rgba(255, 255, 255, 0.915); 
  &:hover{
     border: 1px solid rgba(255, 255, 255, 0.915); 
  }
`;
const WeatherIconStyled = styled.div`
  width: 60%;
  margin: 0 auto;
  padding:20px;
 
  justify-self: center;
`;
const HourStyled = styled.p`
width:60%;
margin:20px;
  font-size: 16px;
`;
const TemperatureStyled = styled(HourStyled)`
  font-size: 16px;
`;
const SpanStyled = styled.span`
  font-size: 16px;

  padding: 0 0 5px;
`;
Forecast.protoTypes = {
  weather: PropTypes.object,
};
export default Forecast;
