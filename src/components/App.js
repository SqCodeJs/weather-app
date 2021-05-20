import React, { useCallback, useEffect, useState } from "react";
import ForecastBoard from "./ForecastBoard";
import Form from "./Form";
import { getApi } from "./functions";
import styled from "styled-components";

const App = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState([]);
  const [error, setError] = useState(false);
  const [carts, setCarts] = useState(0);
  const [currentCity, setCurrentCity] = useState("");

  async function showCity(town) {
    console.log("ShowCity");
    const currentAPI = `http://api.openweathermap.org/data/2.5/weather?q=${town}&appid=afed69df412b0f195b8e5623033bda82&units=metric&lang=pl`;
    const forecastAPI = `http://api.openweathermap.org/data/2.5/forecast?q=${town}&appid=afed69df412b0f195b8e5623033bda82&units=metric&lang=pl`;
    //try/catch
    const weatherData = await getApi(currentAPI);
    const forecastData = await getApi(forecastAPI);

    if (weatherData && forecastData) {
      const data = Object.assign(weatherData, {
        forecast: forecastData.list,
      });
      setWeather(weather.concat(data));
      setCarts(carts + 1);
      setCity("");
    } else {
      setCity("");
      setError(true);
      console.log("weatherData: ", weatherData, "forecast: ", forecastData);
    }
  }
  //funcje wyzej podpowiada mi zebym uzyl usecallback().

  const handleChange = (e) => {
    setCity(e.target.value);
  };

  const handleCityRemove = (city) => {
    setWeather(weather.filter((e) => e.name !== city));
    setCarts(carts - 1);
  };

  const getPosition = useCallback(() => {
    console.log("getPosition");
    const geoPosition = navigator.geolocation;
    if (geoPosition) {
      geoPosition.getCurrentPosition((location) => {
        const latitude = location.coords.latitude;
        const longitude = location.coords.longitude;
        const apiToken = "pk.5390fac0de44ee903fcd342c08b9638f";
        const API = `https://us1.locationiq.com/v1/reverse.php?key=${apiToken}&lat=${latitude}&lon=${longitude}&format=json`;

        const asyncFunction = async () => {
          const data = await getApi(API);
          const cityName = data.address.city;

          setCurrentCity(cityName);
        };

        asyncFunction();
      });
    }
  }, []);
  useEffect(() => {
    console.log("useEffect: getPosition");
    getPosition();
  }, []);
  useEffect(() => {
    console.log("useefect: showCity");
    if (currentCity) showCity(currentCity);
  }, [currentCity]);
  console.log(
    "RENDER: Miasto: " + city + "!",
    "Twoja pozycja: " + currentCity + "!"
  );
  return (
    <React.Fragment>
      <Wrapper>
        <Form
          showCity={showCity}
          handleChange={handleChange}
          city={city}
          carts={carts}
        />

        <ForecastBoard
          weather={weather}
          currentCity={currentCity}
          error={error}
          handleCityRemove={handleCityRemove}
        />
      </Wrapper>
    </React.Fragment>
  );
};
const Wrapper = styled.div`
  margin: 0 auto;

  width: 100%;
  max-width: 1660px;
  min-height: 100vh;
  background: linear-gradient(
    320deg,
    rgba(140, 98, 167, 1) 0%,
    rgba(38, 78, 166, 1) 30%,
    rgba(0, 212, 255, 1) 90%
  );
  opacity: 0.7;
  border: 2px solid rgb(216, 215, 215);
`;

export default App;
