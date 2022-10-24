import React from "react";
import CurrentForecast from "./CurrentForecast";
import CurrentForecastInfo from "./CurrentForecastInfo";
import Forecast from "./Forecast";
import styled from "styled-components";
import PropTypes from "prop-types";
import { device } from "../device";

const WrappStyled = styled.div`
  flex-grow:1
  display: flex;
  overflow-y: scroll;
  border: 2px solid black;
`;
const ForecastBoardStyled = styled.div`
  width: 100%;
  display: flex;
  box-sizing: border-box;
`;
const ColumnStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: auto;
  width: 100%;
`;
const RowStyled = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;

  @media ${device.laptop} {
    flex-direction: row;
  }
`;
const ChildColumnStyled = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;

  @media ${device.mobileM} {
    font-size: 14px;
  }
  @media ${device.tablet} {
  }
  @media ${device.laptop} {
    width: 70%;
  }
  @media ${device.laptopL} {
  }
`;
const ButtonStyled = styled.button`
  margin: 0 2% 2%;

  box-sizing: border-box;
  justify-self: flex-end;
  align-self: flex-end;

  text-align: center;

  color: rgb(217, 215, 212);
  border: 1px solid rgba(50, 0, 0, 0.2);
  border-radius: 25px;
  background-color: transparent;
  font-size: 8px;
  cursor: pointer;
  &:hover {
    background-color: rgba(50, 0, 0, 0.2);
  }
  @media ${device.mobileM} {
    font-size: 12px;
  }
  @media ${device.tablet} {
    padding: 1% 1%;
    font-size: 18px;
  }
  @media ${device.laptop} {
    font-size: 20px;
  }
  @media ${device.laptopL} {
    width: 120px;
    font-size: 20px;
  }
`;
const ForecastBoard = ({
  weather,
  currentCity,
  error,
  handleCityRemove,
  activeCart,
  isForecastDispled,
  setMainDispelyOnForecast,
  setMainDispelyOnCurrent,
  forecastIndex,
}) => {
  const forecastBoard = weather
    .filter((e, i) => i === activeCart)
    .map((item, i) => (
      <WrappStyled key={i}>
        <ForecastBoardStyled weather={item}>
          <ColumnStyled>
            <RowStyled>
              {isForecastDispled ? (
                <CurrentForecast
                  isForecastDispled={isForecastDispled}
                  timeZone={weather[i].timezone}
                  name={item.name}
                  weather={item.forecast[forecastIndex]}
                  currentCity={currentCity}
                  erorr={error}
                  setMainDispelyOnCurrent={setMainDispelyOnCurrent}
                />
              ) : (
                <CurrentForecast
                  isForecastDispled={isForecastDispled}
                  timeZone={weather[i].timezone}
                  name={item.name}
                  weather={item}
                  currentCity={currentCity}
                  erorr={error}
                  setMainDispelyOnCurrent={setMainDispelyOnCurrent}
                />
              )}
              <ChildColumnStyled>
                <CurrentForecastInfo weather={item} erorr={error} />
                <Forecast
                  weather={item}
                  erorr={error}
                  setMainDispelyOnForecast={setMainDispelyOnForecast}
                />
              </ChildColumnStyled>
            </RowStyled>
            <ButtonStyled
              onClick={() => handleCityRemove(item.name)}
              opacity={activeCart}
            >
              Delate
            </ButtonStyled>
          </ColumnStyled>
        </ForecastBoardStyled>
      </WrappStyled>
    ));

  return <>{forecastBoard}</>;
};

ForecastBoard.propTypes = {
  weather: PropTypes.array,
  currentCity: PropTypes.string,
  error: PropTypes.bool,
  handleCityRemove: PropTypes.func,
  activeCart: PropTypes.number,
  prevCart: PropTypes.func,
  nextCart: PropTypes.func,
  isForecastDispled: PropTypes.bool,
  setMainDispelyOnForecast: PropTypes.func,
  setMainDispelyOnCurrent: PropTypes.func,
  forecastIndex: PropTypes.number,
};
export default ForecastBoard;
