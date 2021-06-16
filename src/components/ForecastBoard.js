import React from "react";
import CurrentForecast from "./CurrentForecast";
import CurrentForecastInfo from "./CurrentForecastInfo";
import Forecast from "./Forecast";
import styled from "styled-components";
import PropTypes from "prop-types";

const ForecastBoard = ({
  weather,
  currentCity,
  error,
  handleCityRemove,
  carts,
  activeCart,
  prevCart,
  nextCart,
}) => {
  const forecastBoard = weather
    .map((item, i) => (
      <WrappStyled key={i}>
        <ButtonsStyled>
          <ButtonStyled onClick={prevCart} disabled={activeCart === 1}>
            Prev
          </ButtonStyled>
        </ButtonsStyled>
        <ForecastBoardStyled weather={item}>
          <ButtonStyled onClick={() => handleCityRemove(item.name)}>
            Usun
          </ButtonStyled>
          <CurrentForecast
            weather={item}
            currentCity={currentCity}
            erorr={error}
          />
          <Forecast weather={item} erorr={error} />
          <CurrentForecastInfo weather={item} erorr={error} />
        </ForecastBoardStyled>
        <ButtonsStyled>
          <ButtonStyled onClick={nextCart} disabled={activeCart === carts}>
            Next
          </ButtonStyled>
        </ButtonsStyled>
      </WrappStyled>
    ))
    .filter((e, i) => i === activeCart - 1);
  return <>{forecastBoard}</>;
};
const WrappStyled = styled.div`
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  display: flex;

  width: 100%;
  height: 100%;
`;
const ButtonsStyled = styled.div`
  width: 5%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ForecastBoardStyled = styled.div`
  margin: 0;
  padding: 0;
  box-sizing: border-box;
 
  flex-grow: 0;

  width: 90%;
  /* background-image: url(${(props) =>
    props.background ? props.background : ""}); */
  background-repeat: no-repeat; */
`;
const ButtonStyled = styled.button`
  margin: 0;
  padding: 0;
  box-sizing: border-box;

  width: 60px;
  font-size: 16px;
  font-weight: bold;
  line-height: 24px;
  color: rgb(217, 215, 212);
  border: 2px solid white;
  border-radius: 25px;
  background-color: transparent;
  opacity: ${(props) => (props.opacity === 4 ? "0.3" : "")};
  cursor: pointer;
`;
ForecastBoard.propTypes = {
  weather: PropTypes.array,
  error: PropTypes.bool,
  currentCity: PropTypes.string,
  handleCityRemove: PropTypes.func,
};
export default ForecastBoard;
