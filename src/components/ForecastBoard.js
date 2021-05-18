import React from "react";
import CurrentForecast from "./CurrentForecast";
import CurrentForecastInfo from "./CurrentForecastInfo";
import Forecast from "./Forecast";
import styled from "styled-components";
import PropTypes from "prop-types";

const ForecastBoard = ({ weather, currentCity, error, handleCityRemove }) => {
  console.log(weather);

  const forecastBoard = weather.map((item, i) => (
    <ForecastBoardStyled weather={item} key={i}>
      <ButtonStyled onClick={() => handleCityRemove(item.name)}>
        usun
      </ButtonStyled>
      <CurrentForecast weather={item} currentCity={currentCity} erorr={error} />
      <Forecast weather={item} erorr={error} />
      <CurrentForecastInfo weather={item} erorr={error} />
    </ForecastBoardStyled>
  ));
  return <> {forecastBoard} </>;
};
const ForecastBoardStyled = styled.div`
  width: 100%;
`;
const ButtonStyled = styled.button`
  margin: 0 10px;
  background-color: #fff;
  border: 2px solid black;
  font-size: 30px;
  min-width: 50px;
  height: 50px;
  cursor: pointer;
  outline: none;
`;
ForecastBoard.propTypes = {
  weather: PropTypes.array,
  error: PropTypes.bool,
  handleCityRemove: PropTypes.func,
};
export default ForecastBoard;
