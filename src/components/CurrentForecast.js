import React from "react";
import { getIconBasedOn } from "../functions";
import styled from "styled-components";
import PropTypes from "prop-types";
const CurrentForecastStyled = styled.div`
  box-sizing: border-box;
  width: 90%;
  margin: 2% auto;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  font-family: Trebuchet MS, sans-serif;
  color: rgba(220, 240, 250, 1);
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 25px;
  cursor: pointer;
  &:hover {
    box-shadow: 0px 0px 17px 8px rgba(50, 0, 0, 0.1);
    background-color: rgba(255, 255, 255, 0.111);
  }
`;
const NameStyled = styled.h1`
  font-size: 24px;
  text-align: center;
  padding: 0 5px;
  font-weight: normal;
`;
const TimeStyled = styled(NameStyled)`
  font-size: 22px;
`;
const DescriptionSTyled = styled(NameStyled)`
  font-size: 20px;
  &::first-letter {
    text-transform: uppercase;
  }
`;
const TemperatureStyled = styled(NameStyled)``;
const WeatherIconStyled = styled.div`
  width: 30%;
`;
const ImageIconStyled = styled.img`
  width: 100%;
`;

const CurrentForecast = ({
  weather,
  currentCity,
  setMainDispelyOnCurrent,
  name,
  timeZone,
  isForecastDispled,
}) => {
  return (
    <CurrentForecastStyled onClick={setMainDispelyOnCurrent}>
      <NameStyled>
        {currentCity === name ? <p>Current location {name} </p> : name}
      </NameStyled>
      <TimeStyled>
        {isForecastDispled
          ? new Date((weather.dt + timeZone) * 1000).toLocaleTimeString(
              "en-GB",
              {
                hour: "numeric",
                minute: "2-digit",
              }
            )
          : "now"}
      </TimeStyled>
      <DescriptionSTyled>{weather.weather[0].description}</DescriptionSTyled>
      <TemperatureStyled>
        {Math.floor(weather.main.temp)}
        <span>&#8451;</span>
      </TemperatureStyled>
      <WeatherIconStyled>
        <ImageIconStyled
          src={getIconBasedOn(weather.weather[0].icon)}
          alt="icon"
        />
      </WeatherIconStyled>
    </CurrentForecastStyled>
  );
};

CurrentForecast.propTypes = {
  weather: PropTypes.object,
  currentCity: PropTypes.string,
  setMainDispelyOnCurrent: PropTypes.func,
  name: PropTypes.string,
  timeZone: PropTypes.number,
  isForecastDispled: PropTypes.bool,
};
export default CurrentForecast;
