import React, { useCallback, useEffect, useState } from "react";
import { getApi } from "./functions";

import styled from "styled-components";

import ForecastBoard from "./ForecastBoard";
import Form from "./Form";
import ErrorComponent from "./ErrorComponent";
import Suggestion from "./Suggestion";
import Autocomplete from "./Autocomplete";

import citiesDatabase from "./list.json";

const apiGetCities = () => {
  return citiesDatabase.map(e => e.name);
}

const LOCAL_STORAGE_KEY = "cities";

const App = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState([]);
  const [error, setError] = useState(false);
  const [carts, setCarts] = useState(0);
  const [currentCity, setCurrentCity] = useState("");
  const [localData, setLocalData] = useState([]);
  const [isDisplayed, setIsDisplayed] = useState(false);
  const [autocompleteCities, setAutocompleteCities] = useState([]);
  const displayToggle = () => {
    setIsDisplayed((prev) => !prev);
  };
  async function showCity(town) {
    console.log("town", town)
    console.log("currentCity", currentCity)
    if (town) {
      const currentAPI = `http://api.openweathermap.org/data/2.5/weather?q=${town}&appid=afed69df412b0f195b8e5623033bda82&units=metric&lang=pl`;
      const forecastAPI = `http://api.openweathermap.org/data/2.5/forecast?q=${town}&appid=afed69df412b0f195b8e5623033bda82&units=metric&lang=pl`;
      try {

        const weatherData = await getApi(currentAPI);
        const forecastData = await getApi(forecastAPI);
        const data = Object.assign(weatherData, {
          forecast: forecastData.list,
        });
        setWeather(weather.concat(data));

        // const tab = [1, 2, 3 ];
        //
        // const findIndex = tab.findIndex(elem => elem === 3);
        // zamiast tab.indexOf(3);
        // indexOf najlepiej nie uzywac
        const isTownInLocalStorage = localData.find(el => el.toLocaleLowerCase() === town.toLocaleLowerCase());
        if (
          town.toLocaleLowerCase() !== currentCity.toLocaleLowerCase() &&
          !isTownInLocalStorage
        ) {
          console.log('setlocaldata')
          setLocalData((prev) => [town.toLocaleLowerCase(), ...prev]);
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
    const city = e.target.value;
    setCity(city);

    console.log(autocompleteCities);
    // let list = cities;
    if (city.length > 3) {

      // akcja po miasta
      let list = apiGetCities();
      console.log(list)
      console.log(e.target.value);
      const finalCities = list.filter(elem => elem.toLowerCase().startsWith(e.target.value.toLowerCase()))
      setAutocompleteCities(finalCities);
      console.log(finalCities);
    } else {
      console.log('p3 znaki')
    }

    // setData(list);
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
    console.log("geo", geoPosition)
    // if({}) zwraca true
    //
    if (Object.keys(geoPosition).length > 0) {
      console.log("sdfa")
      geoPosition.getCurrentPosition((location) => {
        const latitude = location.coords.latitude;
        const longitude = location.coords.longitude;
        const apiToken = "pk.5390fac0de44ee903fcd342c08b9638f";
        const API = `https://us1.locationiq.com/v1/reverse.php?key=${apiToken}&lat=${latitude}&lon=${longitude}&format=json`;
        const asyncFunction = async () => {
          const data = await getApi(API);
          const cityName = data.address.city;
          console.log("geo", geoPosition)
          setCurrentCity(cityName);
        };
        asyncFunction();
      });
    }
  }, []);

  //useEffect
  useEffect(() => {
    // console.log("useEffect: getPosition");
    console.log("mount")
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

  return (
    <React.Fragment>
      <Wrapper>
        <Form
          showCity={showCity}
          handleChange={handleChange}
          city={city}
          carts={carts}
        />
        <Autocomplete
          data={autocompleteCities}
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
