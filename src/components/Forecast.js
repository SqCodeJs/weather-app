import React from "react";
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
            // style={{ width: "40px" }}
            src={`http://openweathermap.org/img/w/${item.weather[0].icon}.png`}
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
  width: 90%;

  margin: 0 auto;
  overflow-x: scroll;

  display: flex;
  justify-content: flex-start;
  flex-grow: 1;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;
const ColumnsStyled = styled.div`
  width: 30%;
  height: 120px;

  display: flex;
  flex-direction: column;
  justify-content: center;

  padding-bottom: 10px;

  color: rgba(255, 255, 255, 0.792);
  font-family: sans-serif;
  text-align: center;
  border-bottom: 1.5px solid rgba(255, 255, 255, 0.915); ;
`;
const WeatherIconStyled = styled.div`
  width: 90%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
`;
const HourStyled = styled.p`
  font-size: 18px;
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
