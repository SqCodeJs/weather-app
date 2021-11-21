
import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationArrow,
  faSun,
  faArrowUp,
  faArrowDown,
  faTint,
  faSortAmountDown,
  faThermometerHalf,
} from "@fortawesome/free-solid-svg-icons";
const CurrentForecastInfoStyled = styled.div`
  box-sizing: border-box;
  margin-left: 5%;
  width: 95%;
  height: 160px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 25px;
  background-color: rgba(50, 0, 0, 0.2);
`;
const ColumnsStyled = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: Trebuchet MS, sans-serif;
`;
const RowStyled = styled.div`
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  display: flex;

  width: 100%;
`;
const RowChilderenStyled = styled.div`
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  width: 50%;
  display: flex;
  justify-content: center;
`;
const ParagrafStyled = styled.p`
  padding: 0 5px;
  font-size: 16px;
  line-height: 28px;
  color: rgba(220, 240, 250, 1);
  letter-spacing: 1px;

  transform: rotate(${(props) => props.direction}deg);
`;

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
  const arrow = <FontAwesomeIcon icon={faLocationArrow} />;
  const sunRise = <FontAwesomeIcon icon={faSun} />;
  const sunRiseArrow = <FontAwesomeIcon icon={faArrowUp} />;
  const sunsetArrow = <FontAwesomeIcon icon={faArrowDown} />;
  const humidity = <FontAwesomeIcon icon={faTint} />;
  const pressure = <FontAwesomeIcon icon={faSortAmountDown} />;
  const temp = <FontAwesomeIcon icon={faThermometerHalf} />;
  return (
    <CurrentForecastInfoStyled>
      <ColumnsStyled>
        <RowStyled>
          <RowChilderenStyled>
            <ParagrafStyled>Sunrise</ParagrafStyled>
            <ParagrafStyled>{sunRiseArrow}</ParagrafStyled>
            <ParagrafStyled>{sunRise}</ParagrafStyled>
            <ParagrafStyled>{sunriseTime}</ParagrafStyled>
          </RowChilderenStyled>
          <RowChilderenStyled>
            <ParagrafStyled>Sunset</ParagrafStyled>
            <ParagrafStyled>{sunRise}</ParagrafStyled>
            <ParagrafStyled>{sunsetArrow}</ParagrafStyled>
            <ParagrafStyled>{sunSetTime}</ParagrafStyled>
          </RowChilderenStyled>
        </RowStyled>
        <RowStyled>
          <RowChilderenStyled>
            <ParagrafStyled>Humidity</ParagrafStyled>
            <ParagrafStyled>{humidity}</ParagrafStyled>
            <ParagrafStyled>{weather.main.humidity}%</ParagrafStyled>
          </RowChilderenStyled>
          <RowChilderenStyled>
            <ParagrafStyled>Pressure</ParagrafStyled>
            <ParagrafStyled>{pressure}</ParagrafStyled>
            <ParagrafStyled>{weather.main.pressure} hPa</ParagrafStyled>
          </RowChilderenStyled>
        </RowStyled>
        <RowStyled>
          <RowChilderenStyled>
            <ParagrafStyled>Feels like</ParagrafStyled>
            <ParagrafStyled>{temp}</ParagrafStyled>
            <ParagrafStyled>
              {Math.floor(weather.main.feels_like)}
              <span>&#8451;</span>
            </ParagrafStyled>
          </RowChilderenStyled>
          <RowChilderenStyled>
            <ParagrafStyled>Wind</ParagrafStyled>
            <ParagrafStyled direction={weather.wind.deg}>
              {arrow}
            </ParagrafStyled>
            <ParagrafStyled>{weather.wind.speed} m/s</ParagrafStyled>
          </RowChilderenStyled>
        </RowStyled>
      </ColumnsStyled>
    </CurrentForecastInfoStyled>
  );
};

CurrentForecastInfo.propTypes = {
  weather: PropTypes.object,
};
export default CurrentForecastInfo;

