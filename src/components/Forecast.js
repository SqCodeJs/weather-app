import React from "react";
import { getIconBasedOn } from "../functions";
import styled from "styled-components";
import PropTypes from "prop-types";
import { device } from "../device";
const ForecastStyled = styled.div`
  margin: 3%;
  width: 94%;
  padding: 5%;
  box-sizing: border-box;
  overflow-x: scroll;
  background-color: rgba(50, 0, 0, 0.2);
  border-radius: 25px;
  letter-spacing: 2px;
  color: rgba(220, 240, 250, 1);
  font-family: Trebuchet MS, sans-serif;

  display: flex;
  justify-content: start;
  flex-grow: 0;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;
const ColumnsStyled = styled.div`
  margin: 0;
  padding: 20px;
  box-sizing: border-box;
  width: 400px;
  cursor: pointer;

  display: flex;
  flex-direction: column;
  justify-content: center;

  &:hover {
    border-radius: 25px;
    box-shadow: 0px 0px 10px 1px rgba(255, 255, 255, 0.215);
    background-color: rgba(0, 0, 0, 0.009);
  }
`;
const WeatherIconStyled = styled.div`
  width: 60%;
  margin: 0 auto;
  padding: 20px;

  justify-self: center;
`;
const HourStyled = styled.p`
  width: 60%;
  margin: 20px;

  @media ${device.tablet} {
    font-size: 12px;
    line-height: 24px;
  }
  @media ${device.laptop} {
    font-size: 14px;
    line-height: 26px;
  }
  @media ${device.laptopL} {
    font-size: 16px;
    line-height: 28px;
  }
`;
const TemperatureStyled = styled(HourStyled)``;
const SpanStyled = styled.span`
  font-size: 16px;

  padding: 0 0 5px;
`;
const Forecast = ({ weather, setMainDispelyOnForecast }) => {
  const timeZone = weather.timezone;
  //   const getDayName = (day, d) => {
  //     const days = [
  //       "Sunday",
  //       "Monday",
  //       "Tuesday",
  //       "Wednesday",
  //       "Thursday",
  //       "Friday",
  //       "Saturday",
  //     ];

  //     const i = new Date(day).getDay();
  //     if (i === d) return null;
  //     if (d === undefined) return days[0];

  //     return days[i];
  //   };
  //   const w = weather.forecast.map((e) => new Date(e.dt_txt).getDay());

  const hurlyForecast = weather.forecast.map((item, i) => (
    <ColumnsStyled key={i} onClick={() => setMainDispelyOnForecast(i)}>
      {/* <div>{getDayName(item.dt_txt, w[i + 1])}</div> */}
      <HourStyled>
        {new Date((item.dt + timeZone) * 1000).toLocaleTimeString("en-GB", {
          hour: "numeric",
          minute: "2-digit",
        })}
      </HourStyled>
      <WeatherIconStyled>
        <img src={getIconBasedOn(item.weather[0].icon)} alt="ok" />
      </WeatherIconStyled>
      <TemperatureStyled>
        {Math.floor(item.main.temp)}
        <SpanStyled>&#8451;</SpanStyled>
      </TemperatureStyled>
    </ColumnsStyled>
  ));

  return (
    <ForecastStyled>{hurlyForecast ? hurlyForecast : null}</ForecastStyled>
  );
};

Forecast.protoTypes = {
  weather: PropTypes.object,
  setMainDispelyOnForecast: PropTypes.func,
};
export default Forecast;
