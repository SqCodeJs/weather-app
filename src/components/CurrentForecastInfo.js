import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const CurrentForecastInfo = ({ weather, error }) => {
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
            <h4>wschód</h4>
            <p>{sunriseTime}</p>
          </RowChilderenStyled>
          <RowChilderenStyled>
            <h4>zachód</h4> <p>{sunSetTime}</p>
          </RowChilderenStyled>
        </RowStyled>
        <RowStyled>
          <RowChilderenStyled>
            <h4>wilgotność</h4> <p>{weather.main.humidity} %</p>
          </RowChilderenStyled>
          <RowChilderenStyled>
            <h4>ciśnienie </h4>
            <p>{weather.main.pressure} hPa</p>
          </RowChilderenStyled>
        </RowStyled>
        <RowStyled>
          <RowChilderenStyled>
            <h4>odczuwalna</h4>
            <p>
              {Math.floor(weather.main.feels_like)}
              <span>&#8451;</span>{" "}
            </p>
          </RowChilderenStyled>
          <RowChilderenStyled>
            <h4>wiatr</h4>
            <p>{weather.wind.speed} m/s</p>
          </RowChilderenStyled>
        </RowStyled>
      </ColumnsStyled>
    </CurrentForecastInfoStyled>
  );
};
const CurrentForecastInfoStyled = styled.div`
  display: flex;
  margin: 0 auto;
  width: 80%;
`;
const ColumnsStyled = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  /* padding: 5px 0; */

  color: rgba(255, 255, 255, 0.692);
  /* color:rgb(68, 67, 67); */
  font-family: sans-serif;
  text-align: center;
`;
const RowStyled = styled.div`
  display: flex;

  width: 100%;
  border-bottom: 1px solid rgba(255, 255, 255, 0.915); ;
`;
const RowChilderenStyled = styled.div`
  margin: 5px 0;
  display: flex;
  flex-direction: column;
  width: 100%;
`;
CurrentForecastInfo.propTypes = {
  weather: PropTypes.object,
  error: PropTypes.bool,
};
export default CurrentForecastInfo;
