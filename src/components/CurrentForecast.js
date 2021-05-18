import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const CurrentForecast = ({ weather, currentCity }) => {
  const iconurl =
    "http://openweathermap.org/img/w/" + weather.weather[0].icon + ".png";

  return (
    <CurrentForecastStyled>
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
        <ImageIconStyled src={iconurl} alt="ok" />
      </WeatherIconStyled>
    </CurrentForecastStyled>
  );
};
const CurrentForecastStyled = styled.div`
  width: 90%;

  margin: 20px auto;

  color: rgba(255, 255, 255, 0.915);
  border-top: 1px solid rgba(255, 255, 255, 0.915);
  border-bottom: 1px solid rgba(255, 255, 255, 0.915);
`;
const NameStyled = styled.h1`
  font-size: 34px;
  text-align: center;
  padding: 5px 10px;
  font-weight: normal;
`;
const DescriptionSTyled = styled(NameStyled)`
  &::first-letter {
    text-transform: uppercase;
  }
`;
const TemperatureStyled = styled(NameStyled)``;
const WeatherIconStyled = styled.div`
  padding-bottom: 5px;
  width: 100%;
  height: 60px;
`;
const ImageIconStyled = styled.img`
  display: block;
  margin: 0 auto;
  width: 60px;
`;
CurrentForecast.propTypes = {
  weather: PropTypes.object,
};
export default CurrentForecast;
