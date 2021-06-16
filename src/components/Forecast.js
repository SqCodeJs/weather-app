import React from "react";
import { getIconBasedOn } from "./functions";
import styled from "styled-components";
import PropTypes from "prop-types";
const Forecast = ({ weather }) => {
  const timeZone = weather.timezone;
  // console.log(Array.isArray(weather.forecast), "typ", typeof weather.forecast);
  const hurlyForecast = weather.forecast
    // .filter((treeHours, idx) => idx < 16)
    .map((item, i) => (
      <ColumnsStyled key={i}>
        <HourStyled>
          {new Date((item.dt + timeZone) * 1000).toLocaleTimeString("en-GB", {
            hour: "numeric",
            minute: "2-digit",
          })}
        </HourStyled>
        <WeatherIconStyled>
          <img
            // src={`http://openweathermap.org/img/w/${item.weather[0].icon}.png`}
            src={getIconBasedOn(weather.forecast[i].weather[0].icon)}
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
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  width: 100%;

  margin: 0 auto;
  overflow-x: scroll;

  display: flex;
  justify-content: flex-start;
  flex-grow: 0;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;
const ColumnsStyled = styled.div`
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  width: 30%;

  display: flex;
  flex-direction: column;
  justify-content: center;

  color: rgba(255, 255, 255, 0.792);
  font-family: sans-serif;
  text-align: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.915); ;
`;
const WeatherIconStyled = styled.div`
  width: 80%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
`;
const HourStyled = styled.p`
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
