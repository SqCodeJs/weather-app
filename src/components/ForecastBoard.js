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
          <ButtonPrevStyled onClick={prevCart}  opacity={activeCart}disabled={activeCart === 1}>
            Prev
          </ButtonPrevStyled>
        </ButtonsStyled>
        <ForecastBoardStyled weather={item}>
        <ColumnStyled>
          <ButtonStyled
            onClick={() => handleCityRemove(item.name)}
            opacity={activeCart}
           
          >
            Delate
          </ButtonStyled>
         <RowStyled>  
          {isForecastDispled ? (
            <CurrentForecast
              timeZone={weather[i].timezone}
              name={item.name}
              weather={item.forecast[forecastIndex]}
              currentCity={currentCity}
              erorr={error}
              setMainDispelyOnCurrent={setMainDispelyOnCurrent}
            />
          ) : (
            <CurrentForecast
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
       
          </ColumnStyled>
         
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

  width: 96%;
  height: 100%;

  
`;
const ButtonsStyled = styled.div`
 width:5%;
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
  display:flex;
  
`;
const ColumnStyled =styled.div`
display:flex;
flex-direction: column;
width:100%;
`;
const RowStyled=styled.div`
display:flex;
width:100%;

`;
const ChildColumnStyled =styled.div`
display: flex;
flex-direction: column;
width:70%;
`;
const ButtonStyled = styled.button`
  margin: 10px;
  padding: 5px;
  box-sizing: border-box;

  width: 100px;
  font-size: 16px;
  text-align: center;

  line-height: 26px;
  color: rgb(217, 215, 212);
  border: 2px solid rgba(50, 0, 0, .2);
  border-radius: 25px;
  background-color: transparent;

  cursor: pointer;
  &:hover {
    background-color:rgba(50, 0, 0, .2);
    
  }
`;
const ButtonPrevStyled = styled(ButtonStyled)`
  opacity: ${(props) => (props.opacity === 1 ? "0.3" : "1")};
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
