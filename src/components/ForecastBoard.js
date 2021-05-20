import React from "react";
import CurrentForecast from "./CurrentForecast";
import CurrentForecastInfo from "./CurrentForecastInfo";
import Forecast from "./Forecast";
import styled from "styled-components";
import PropTypes from "prop-types";

const ForecastBoard = ({
  city,
  weather,
  currentCity,
  error,
  handleCityRemove,
}) => {
  // console.log(weather);

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
  width: 5%;
  height: 40px;

  border: 2px solid white;
  border-radius: 25px;
  background-color: transparent;
  opacity: ${(props) => (props.opacity === 4 ? "0.3" : "")};
  cursor: pointer;
  padding: 0;
  font-size: 20px;
  line-height: 34px;
`;
ForecastBoard.propTypes = {
  weather: PropTypes.array,
  error: PropTypes.bool,
  handleCityRemove: PropTypes.func,
};
export default ForecastBoard;
