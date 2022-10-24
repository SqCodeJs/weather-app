import React, { useCallback, useEffect, useState } from "react";
import {
  getApi,
  getLastCities,
  selectedToStorage,
  getBackgorundBasedOn,
  findCityFromList,
} from "../functions";

import styled from "styled-components";
import { createGlobalStyle } from "styled-components";
import ForecastBoard from "./ForecastBoard";
import Form from "./Form";
import ErrorComponent from "./ErrorComponent";
import Suggestion from "./Suggestion";
import Autocomplete from "./Autocomplete";
import Header from "./Header";
import Navigation from "./Navigation";
import citiesDatabase from "./list.json";

const GlobalStyle = createGlobalStyle`
*{
	margin:0;
	padding: 0;
   box-sizing: border-box;
}`;
const Wrapper = styled.div`
  width: 100%;
  /* height: -webkit-fill-available; */
  height: ${(props) => props.height};
  display: flex;
  border: 1px solid red;
  flex-direction: column;
  /* justify-content: center; */

  background-repeat: no-repeat;
  background-size: 100% 100%;
  opacity: 1;
  background-image: linear-gradient(
    20deg,
    rgba(30, 60, 114, 1) 0%,
    rgba(10, 70, 114, 0.8) 50%,
    rgba(30, 60, 114, 1) 90%
  );
`;

const apiGetCities = () => {
  return citiesDatabase.map((e) => e.name);
};

const LOCAL_STORAGE_KEY = "cities";

const App = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState([]);
  const [error, setError] = useState(false);

  const [currentCity, setCurrentCity] = useState("");
  const [localData, setLocalData] = useState([]);
  const [isDisplayed, setIsDisplayed] = useState(false);
  const [autocompleteCities, setAutocompleteCities] = useState([]);
  const [currentBackround, setCurrentBackround] = useState();
  const [activeCart, setActiveCart] = useState(0);
  const [isForecastDispled, setisForecastDispled] = useState(false);
  const [forecastIndex, setForecastIndex] = useState(0);

  const displayToggle = () => {
    setIsDisplayed((prev) => !prev);
  };
  function nextCart() {
    setActiveCart((prev) => prev + 1);
  }
  function prevCart() {
    setActiveCart((prev) => prev - 1);
  }
  function setMainDispelyOnForecast(i) {
    setisForecastDispled(true);
    setForecastIndex(i);
  }
  function setMainDispelyOnCurrent() {
    setisForecastDispled(false);
  }
  async function getWeatherData(town) {
    if (town) {
      const currentAPI = `http://api.openweathermap.org/data/2.5/weather?q=${town}&appid=afed69df412b0f195b8e5623033bda82&units=metric&lang=en`;
      const forecastAPI = `http://api.openweathermap.org/data/2.5/forecast?q=${town}&appid=afed69df412b0f195b8e5623033bda82&units=metric&lang=en`;
      const weatherData = await getApi(currentAPI);
      const forecastData = await getApi(forecastAPI);
      const data = Object.assign(weatherData, {
        forecast: forecastData.list,
        backgroundImage: getBackgorundBasedOn(weatherData.weather[0].main),
      });

      return data;
    }
  }
  const handleStateBasedOnTown = (currentWeather) => {
    setWeather(weather.concat(currentWeather));
    setActiveCart(weather.length);
    setCity("");
    setError(false);
    setisForecastDispled(false);
  };
  const handleStateBasedOnError = () => {
    setCity("");
    setError(true);
  };
  async function showCity(town) {
    if (town) {
      try {
        const data = await getWeatherData(town);
        if (weather.every((e) => e.name !== data.name)) {
          if (!selectedToStorage(town, currentCity))
            setLocalData((prev) => [town.toLocaleLowerCase(), ...prev]);
          handleStateBasedOnTown(data);
        } else {
          const index = findCityFromList(weather, data.name);
          //   setActiveCart(index + 1);
          setCity("");
        }
      } catch (error) {
        console.log(error.message);
        handleStateBasedOnError();
      }
    }
  }

  const getLastSeen = () => {
    const nextCities = getLastCities(LOCAL_STORAGE_KEY);
    if (nextCities !== null) {
      setLocalData(nextCities);
    }
  };
  const sendLastSeen = useCallback(() => {
    let lastSeen = [...localData];
    lastSeen = lastSeen.filter((e, i) => i < 3);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(lastSeen));
  }, [localData]);

  const handleChange = (e) => {
    const city = e.target.value;
    setCity(city);
    if (city.length > 2) {
      let list = apiGetCities();
      const finalCities = list.filter((elem) =>
        elem.toLowerCase().startsWith(e.target.value.toLowerCase())
      );
      setAutocompleteCities(finalCities);
    }
  };

  const handleCityRemove = (city) => {
    const tempWeather = [...weather];
    const newWeather = tempWeather.filter((e) => e.name !== city);
    setWeather(newWeather);
    setActiveCart(weather.length - 1);
  };
  async function findCurrentCity(location) {
    const API = `https://us1.locationiq.com/v1/reverse.php?key=pk.5390fac0de44ee903fcd342c08b9638f&lat=${location.coords.latitude}&lon=${location.coords.longitude}&format=json`;

    // const API = `https://us1.locationiq.com/v1/reverse.php?key=pk.5390fac0de44ee903fcd342c08b9638f&lat=${49.99365370594033}&lon=${19.953397412545534}&format=json`;
    const dt = await getApi(API);
    if ("city" in dt.address) {
      setCurrentCity(dt.address.city);
    }
    if ("village" in dt.address) {
      setCurrentCity(dt.address.village);
    }
  }

  const getPosition = useCallback(() => {
    const geoPosition = navigator.geolocation;

    geoPosition.getCurrentPosition(findCurrentCity);
  }, []);

  useEffect(() => {
    getPosition();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (currentCity) showCity(currentCity);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentCity]);

  useEffect(() => {
    setTimeout(displayToggle, 3000);
  }, []);
  useEffect(() => {
    getLastSeen();
  }, [city]);
  useEffect(() => {
    sendLastSeen();
  }, [sendLastSeen]);

  return (
    <React.Fragment>
      <GlobalStyle />

      <Wrapper
        height={window.innerHeight + "px"}
        background={
          currentBackround
            ? currentBackround
            : "https://images.unsplash.com/photo-1491484925566-336b202157a5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80"
        }
      >
        <Header />
        <Form
          showCity={showCity}
          handleChange={handleChange}
          autocompleteCities={autocompleteCities}
          city={city}
          activeCart={activeCart}
        >
          <Autocomplete
            data={autocompleteCities}
            city={city}
            showCity={showCity}
            setCity={setCity}
          />
        </Form>

        {error && (
          <ErrorComponent
            city={city}
            weather={weather}
            currentCity={currentCity}
            error={error}
            handleCityRemove={handleCityRemove}
          />
        )}
        {isDisplayed ? (
          <Suggestion
            localData={localData}
            city={city}
            showCity={showCity}
            displayToggle={displayToggle}
          />
        ) : null}

        {weather.length ? (
          <ForecastBoard
            weather={weather}
            activeCart={activeCart}
            currentCity={currentCity}
            error={error}
            handleCityRemove={handleCityRemove}
            isForecastDispled={isForecastDispled}
            setMainDispelyOnForecast={setMainDispelyOnForecast}
            setMainDispelyOnCurrent={setMainDispelyOnCurrent}
            forecastIndex={forecastIndex}
          />
        ) : (
          <div style={{ flexGrow: 1 }}></div>
        )}
        <Navigation
          weather={weather}
          activeCart={activeCart}
          nextCart={nextCart}
          prevCart={prevCart}
          setActiveCart={setActiveCart}
        />
      </Wrapper>
    </React.Fragment>
  );
};

export default App;
