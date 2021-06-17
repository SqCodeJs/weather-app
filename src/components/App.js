import React, { useCallback, useEffect, useState } from "react";
import {
  getApi,
  getLastCities,
  selectedToStorage,
  getBackgorundBasedOn,
} from "./functions";

import styled from "styled-components";

import ForecastBoard from "./ForecastBoard";
import Form from "./Form";
import ErrorComponent from "./ErrorComponent";
import Suggestion from "./Suggestion";
import Autocomplete from "./Autocomplete";

import citiesDatabase from "./list.json";

const apiGetCities = () => {
  return citiesDatabase.map((e) => e.name);
};

const LOCAL_STORAGE_KEY = "cities";

const App = () => {
  // console.log("START");
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
  async function showCity(town) {
    console.log("town", town);
    console.log("currentCity", currentCity);
    if (town) {
      const currentAPI = `http://api.openweathermap.org/data/2.5/weather?q=${town}&appid=afed69df412b0f195b8e5623033bda82&units=metric&lang=pl`;
      const forecastAPI = `http://api.openweathermap.org/data/2.5/forecast?q=${town}&appid=afed69df412b0f195b8e5623033bda82&units=metric&lang=pl`;
      try {
        const weatherData = await getApi(currentAPI);
        const forecastData = await getApi(forecastAPI);
        const data = Object.assign(weatherData, {
          forecast: forecastData.list,
          backgroundImage: getBackgorundBasedOn(weatherData.weather[0].main),
        });

        if (weather.every((e) => e.name !== weatherData.name)) {
          setWeather(weather.concat(data));

          // console.log(
          //   "SELECTED TO STORAGE",
          //   selectedToStorage(town, currentCity)
          // );
          if (!selectedToStorage(town, currentCity))
            setLocalData((prev) => [town.toLocaleLowerCase(), ...prev]);

          setActiveCart(weather.length + 1);
          setCity("");
          setError(false);
          setisForecastDispled(false);
        }
      } catch (error) {
        console.log(error.message);
        setCity("");
        setError(true);
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
    console.log("WYSYLAM");
    let lastSeen = [...localData];
    lastSeen = lastSeen.filter((e, i) => i < 3);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(lastSeen));
  }, [localData]);
  ////////////////////////////
  const handleChange = (e) => {
    const city = e.target.value;
    setCity(city);

    console.log(autocompleteCities);

    if (city.length > 2) {
      // akcja po miasta
      let list = apiGetCities();
      // console.log(list);
      // console.log(e.target.value);
      const finalCities = list.filter((elem) =>
        elem.toLowerCase().startsWith(e.target.value.toLowerCase())
      );
      setAutocompleteCities(finalCities);
      console.log(finalCities);
    } else {
      console.log("p3 znaki");
    }
  };

  const handleCityRemove = (city) => {
    const tempWeather = [...weather];
    const newWeather = tempWeather.filter((e) => e.name !== city);

    setWeather(newWeather);

    setActiveCart(weather.length - 1);
  };

  const getPosition = useCallback(() => {
    const geoPosition = navigator.geolocation;

    // if (Object.keys(geoPosition).length > 0)
    // if (Object.keys(geoPosition).length !== 0)
    if (geoPosition) {
      console.log("sdfa");
      geoPosition.getCurrentPosition(async (location) => {
        const latitude = location.coords.latitude;
        const longitude = location.coords.longitude;
        const apiToken = "pk.5390fac0de44ee903fcd342c08b9638f";
        const API = `https://us1.locationiq.com/v1/reverse.php?key=${apiToken}&lat=${latitude}&lon=${longitude}&format=json`;
        const dt = await getApi(API);
        const cityName = dt.address.city;
        setCurrentCity(cityName);
      });
    }
  }, []);

  //useEffect
  useEffect(() => {
    // console.log("useEffect: getPosition");
    console.log("mount");
    getPosition();
  }, []);
  useEffect(() => {
    // console.log("useefect: showCity");
    if (currentCity) showCity(currentCity);
  }, [currentCity]);
  ///
  useEffect(() => {
    setTimeout(displayToggle, 3000);
  }, []);
  useEffect(() => {
    getLastSeen();
  }, [city]);
  useEffect(() => {
    sendLastSeen();
  }, [sendLastSeen]);

  // console.log(
  //   "RENDER: Miasto: " + city + "!",
  //   "Twoja pozycja: " + currentCity + "!"
  // );

  useEffect(() => {
    console.log("Background ");
    if (weather.length > 0) {
      setCurrentBackround(weather[activeCart - 1].backgroundImage);
    }
  }, [activeCart]);
  console.log("RENDER", weather);
  return (
    <React.Fragment>
      <Wrapper
        background={
          currentBackround
            ? currentBackround
            : "https://images.unsplash.com/photo-1491484925566-336b202157a5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80"
        }
      >
        <Form
          showCity={showCity}
          handleChange={handleChange}
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
            currentCity={currentCity}
            error={error}
            handleCityRemove={handleCityRemove}
            activeCart={activeCart}
            nextCart={nextCart}
            prevCart={prevCart}
            isForecastDispled={isForecastDispled}
            setMainDispelyOnForecast={setMainDispelyOnForecast}
            setMainDispelyOnCurrent={setMainDispelyOnCurrent}
            forecastIndex={forecastIndex}
          />
        ) : null}
      </Wrapper>
    </React.Fragment>
  );
};
const Wrapper = styled.div`
  margin: 0 auto;
  padding: 0;
  box-sizing: border-box;

  width: 100%;
  min-width: 1024px;
  height: 100vh;
  background-image: url(${(props) => props.background});
  background-repeat: no-repeat;
  background-size: 100% 100%;

  /* background: linear-gradient(
    320deg,
    rgba(140, 98, 167, 1) 0%,
    rgba(38, 78, 166, 1) 30%,
    rgba(0, 212, 255, 1) 90%
  ); */

  /* border: 2px solid rgb(216, 215, 215); */
`;

export default App;
