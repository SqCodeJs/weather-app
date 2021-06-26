import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const CurrentForecastInfo = ({ weather }) => {
  const sunrise = weather.sys.sunrise;
  const sunset = weather.sys.sunset;
  const timeZone = weather.timezone - 3600;
  const sunriseTime = new Date((sunrise + timeZone) * 1000).toLocaleString(
    "en-GB",
    { hour: "numeric", minute: "2-digit" }
  );
  const sunSetTime = new Date((sunset + timeZone) * 1000).toLocaleString(
    "en-GB",
    { hour: "numeric", minute: "2-digit" }
  );
  return (
    <CurrentForecastInfoStyled>
      <ColumnsStyled>
        <RowStyled>
          <RowChilderenStyled>
            <TitleStyledH4>wschód</TitleStyledH4>
            <p>{sunriseTime}</p>
          </RowChilderenStyled>
          <RowChilderenStyled>
            <TitleStyledH4>zachód</TitleStyledH4> <p>{sunSetTime}</p>
          </RowChilderenStyled>
        </RowStyled>
        <RowStyled>
          <RowChilderenStyled>
            <TitleStyledH4>wilgotność</TitleStyledH4>{" "}
            <p>{weather.main.humidity} %</p>
          </RowChilderenStyled>
          <RowChilderenStyled>
            <TitleStyledH4>ciśnienie </TitleStyledH4>
            <p>{weather.main.pressure} hPa</p>
          </RowChilderenStyled>
        </RowStyled>
        <RowStyled>
          <RowChilderenStyled>
            <TitleStyledH4>odczuwalna</TitleStyledH4>
            <p>
              {Math.floor(weather.main.feels_like)}
              <span>&#8451;</span>{" "}
            </p>
          </RowChilderenStyled>
          <RowChilderenStyled>
            <TitleStyledH4>wiatr</TitleStyledH4>
            <p>{weather.wind.speed} m/s</p>
          </RowChilderenStyled>
        </RowStyled>
      </ColumnsStyled>
    </CurrentForecastInfoStyled>
  );
};
const CurrentForecastInfoStyled = styled.div`
 
  box-sizing: border-box;
  margin-left:5%;
  width:95%;
  height:300px;
  display: flex;
  border-radius: 25px;
 
  background-color:rgba(50, 0, 0, .2);
  
  
`;
const ColumnsStyled = styled.div`
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  width: 100%;

  display: flex;
  flex-direction: column;
  /* padding: 5px 0; */

  font-family: Trebuchet MS, sans-serif;
  color: rgba(220,240,250,1);
  letter-spacing: 1px;
 
  text-align: center;
`;
const RowStyled = styled.div`
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  display: flex;

  width: 100%;
  // border-bottom: 1px solid rgba(255, 255, 255, 0.915);
`;
const RowChilderenStyled = styled.div`
  margin: 0;
  padding: 0;
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  width: 100%;
`;
const TitleStyledH4 = styled.h4`
  font-size: 14px;
  line-height: 18px;
`;
CurrentForecastInfo.propTypes = {
  weather: PropTypes.object,
};
export default CurrentForecastInfo;
