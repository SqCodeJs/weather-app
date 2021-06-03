import React, { useCallback, useEffect, useState } from "react";
import { getApi } from "./functions";

import styled from "styled-components";

import ForecastBoard from "./ForecastBoard";
import Form from "./Form";
import ErrorComponent from "./ErrorComponent";
import Suggestion from "./Suggestion";
import Autocomplete from "./Autocomplete";

const LOCAL_STORAGE_KEY = "cities";

const App = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState([]);
  const [error, setError] = useState(false);
  const [carts, setCarts] = useState(0);
  const [currentCity, setCurrentCity] = useState("");
  const [localData, setLocalData] = useState([]);
  const [isDisplayed, setIsDisplayed] = useState(false);
  const [data, setData] = useState([]);
  const displayToggle = () => {
    setIsDisplayed((prev) => !prev);
  };
  async function showCity(town) {
    if (town) {
      const currentAPI = `http://api.openweathermap.org/data/2.5/weather?q=${town}&appid=afed69df412b0f195b8e5623033bda82&units=metric&lang=pl`;
      const forecastAPI = `http://api.openweathermap.org/data/2.5/forecast?q=${town}&appid=afed69df412b0f195b8e5623033bda82&units=metric&lang=pl`;
      try {
        let list = await getApi("list.json", {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });
        list = list.map((e) => e.name);
        setData(list);
        const weatherData = await getApi(currentAPI);
        const forecastData = await getApi(forecastAPI);
        const data = Object.assign(weatherData, {
          forecast: forecastData.list,
        });
        setWeather(weather.concat(data));
        if (
          town.toLocaleLowerCase() !== currentCity.toLocaleLowerCase() &&
          localData.indexOf(town.toLocaleLowerCase()) === -1
        ) {
          setLocalData((prev) => [town, ...prev]);
        }
        setCarts(carts + 1);
        setCity("");
        setError(false);
      } catch (error) {
        console.log(error.message);
        setCity("");
        setError(true);
      }
    }
  }

  const getLastSeen = () => {
    console.log("POBIERAM");
    if (localStorage.getItem(LOCAL_STORAGE_KEY) !== null) {
      setLocalData(JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)));
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
    setCity(e.target.value);
  };

  const handleCityRemove = (city) => {
    const tempWeather = [...weather];
    const newWeather = tempWeather.filter((e) => e.name !== city);
    const index = tempWeather.length - newWeather.length;

    setWeather(newWeather);
    setCarts(carts - index);
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
          const ke = "AIzaSyAE4vTmUlITrmh_ndTQBMBNFvSdxUu_bwU";
          const a = getApi(
            `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CnRvAAAAwMpdHeWlXl-lH0vp7lez4znKPIWSWvgvZFISdKx45AwJVP1Qp37YOrH7sqHMJ8C-vBDC546decipPHchJhHZL94RcTUfPa1jWzo-rSHaTlbNtjh-N68RkcToUCuY9v2HNpo5mziqkir37WU8FJEqVBIQ4k938TI3e7bf8xq-uwDZcxoUbO_ZJzPxremiQurAYzCTwRhE_V0&sensor=false&key=${ke}`
          );
          console.log(a);
        };
        asyncFunction();
      });
    }
  }, []);

  //useEffect
  useEffect(() => {
    // console.log("useEffect: getPosition");

    getPosition();
  }, []);
  useEffect(() => {
    // console.log("useefect: showCity");
    if (currentCity) showCity(currentCity);
  }, [currentCity]);
  ///
  useEffect(() => setTimeout(displayToggle, 9000), []);
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

  return (
    <React.Fragment>
      <Wrapper>
        <Form
          showCity={showCity}
          handleChange={handleChange}
          city={city}
          carts={carts}
          data={data}
        />
        <Autocomplete
          data={data}
          city={city}
          showCity={showCity}
          setCity={setCity}
        />
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
            carts={carts}
            localData={localData}
            city={city}
            showCity={showCity}
            displayToggle={displayToggle}
          />
        ) : null}
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
