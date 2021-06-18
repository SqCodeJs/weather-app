import React from "react";
import { getIconBasedOn } from "./functions";
import styled from "styled-components";
import PropTypes from "prop-types";

const CurrentForecast = ({
  weather,
  currentCity,
  setMainDispelyOnCurrent,
  name,
  timeZone,
}) => {
  return (
    <CurrentForecastStyled onClick={setMainDispelyOnCurrent}>
      <NameStyled>
        {currentCity === name ? <p>Obecnie znajdujesz sie {name} </p> : name}
      </NameStyled>
      <TimeStyled>
        {new Date((weather.dt + timeZone) * 1000).toLocaleTimeString("en-GB", {
          hour: "numeric",
          minute: "2-digit",
        })}
      </TimeStyled>
      <DescriptionSTyled>{weather.weather[0].description}</DescriptionSTyled>
      <TemperatureStyled>
        {Math.floor(weather.main.temp)}
        <span>&#8451;</span>
      </TemperatureStyled>
      <WeatherIconStyled>
        <ImageIconStyled
          src={getIconBasedOn(weather.weather[0].icon)}
          alt="ok"
        />
      </WeatherIconStyled>
    </CurrentForecastStyled>
  );
};
const CurrentForecastStyled = styled.div`
  width: 100%;

  margin: 20px auto;

  color: rgba(255, 255, 255, 1);
  border-top: 1px solid rgba(255, 255, 255, 0.915);
  border-bottom: 1px solid rgba(255, 255, 255, 0.915);
  cursor: pointer;
`;
const NameStyled = styled.h1`
  font-size: 26px;
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
  padding-bottom: 20px;
  width: 100%;
  height: 36px;
`;
const ImageIconStyled = styled.img`
  display: block;
  margin: 0 auto;
  width: 60px;
`;
CurrentForecast.propTypes = {
  weather: PropTypes.object,
  currentCity: PropTypes.string,
};
export default CurrentForecast;
