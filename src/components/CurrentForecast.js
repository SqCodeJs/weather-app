import React from "react";
import { getIconBasedOn } from "./functions";
import styled from "styled-components";
import PropTypes from "prop-types";

const CurrentForecast = ({ weather, currentCity, setMainDispelyOnCurrent }) => {
  return (
    <CurrentForecastStyled onClick={setMainDispelyOnCurrent}>
      <NameStyled>
        {currentCity === weather.name ? (
          <p>Obecnie znajdujesz sie {weather.name} </p>
        ) : (
          weather.name
        )}
      </NameStyled>
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
  font-size: 32px;
  text-align: center;
  padding: 0 5px;
  font-weight: normal;
`;
const DescriptionSTyled = styled(NameStyled)`
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
