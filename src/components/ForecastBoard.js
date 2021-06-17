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

  activeCart,
  prevCart,
  nextCart,
  isForecastDispled,
  setMainDispelyOnForecast,
  setMainDispelyOnCurrent,
  forecastIndex,
}) => {
  const cartslength = weather.length;
  const forecastBoard = weather
    .map((item, i) => (
      <WrappStyled key={i}>
        <ButtonsStyled>
          <ButtonPrevStyled onClick={prevCart} disabled={activeCart === 1}>
            Prev
          </ButtonPrevStyled>
        </ButtonsStyled>
        <ForecastBoardStyled weather={item}>
          <ButtonStyled
            onClick={() => handleCityRemove(item.name)}
            opacity={activeCart}
            disabled={activeCart === 1}
          >
            Usun
          </ButtonStyled>
          {isForecastDispled ? (
            <CurrentForecast
              weather={item.forecast[forecastIndex]}
              currentCity={currentCity}
              erorr={error}
              setMainDispelyOnCurrent={setMainDispelyOnCurrent}
            />
          ) : (
            <CurrentForecast
              weather={item}
              currentCity={currentCity}
              erorr={error}
              setMainDispelyOnCurrent={setMainDispelyOnCurrent}
            />
          )}
          <Forecast
            weather={item}
            erorr={error}
            setMainDispelyOnForecast={setMainDispelyOnForecast}
          />
          <CurrentForecastInfo weather={item} erorr={error} />
        </ForecastBoardStyled>
        <ButtonsStyled>
          <ButtonNextStyled
            onClick={nextCart}
            disabled={activeCart === weather.length}
            opacity={activeCart}
            cartslength={cartslength}
          >
            Next
          </ButtonNextStyled>
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

  cursor: pointer;
`;
const ButtonPrevStyled = styled(ButtonStyled)`
  opacity: ${(props) => (props.opacity === 0 ? "0.3" : "1")};
`;
const ButtonNextStyled = styled(ButtonStyled)`
  opacity: ${(props) => (props.opacity === props.cartslength ? "0.3" : "1")};
`;

ForecastBoard.propTypes = {
  weather: PropTypes.array,
  error: PropTypes.bool,
  currentCity: PropTypes.string,
  handleCityRemove: PropTypes.func,
};
export default ForecastBoard;
