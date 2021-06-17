const getApi = (API) => {
  return fetch(API)
    .then((response) => {
      if (response.ok) {
        return response;
      }
      throw Error(response.status);
    })
    .then((response) => response.json());
};
function titleCase(string) {
  return string[0].toUpperCase() + string.slice(1).toLowerCase();
}

const findCityToRemove = (weatherTab, city) => {
  const index = weatherTab.findIndex((e) => e.name === city);
  return index;
};
const getLastCities = (LOCAL_STORAGE_KEY) => {
  return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
};
function selectedToStorage(town, currentCity) {
  const isTownInLocalStorage = getLastCities("cities").find(
    (el) => el.toLocaleLowerCase() === town.toLocaleLowerCase()
  );
  const isInLocation =
    town.toLocaleLowerCase() === currentCity.toLocaleLowerCase();
  // console.log("isTownInLocalStorage", isTownInLocalStorage);
  // console.log("isInLocation", isInLocation);
  return isTownInLocalStorage || isInLocation;
}
const getIconBasedOn = (icon) => {
  const types = {
    "01d": "https://bmcdn.nl/assets/weather-icons/v1.5/clear-day.svg",
    "01n": "https://bmcdn.nl/assets/weather-icons/v1.5/clear-night.svg",
    "02d": "https://bmcdn.nl/assets/weather-icons/v1.5/overcast-day.svg",
    "02n": "https://bmcdn.nl/assets/weather-icons/v1.5/overcast-night.svg",
    "03d": "https://bmcdn.nl/assets/weather-icons/v1.5/cloudy.svg",
    "03n": "https://bmcdn.nl/assets/weather-icons/v1.5/cloudy.svg",
    "04d": "https://bmcdn.nl/assets/weather-icons/v1.5/overcast.svg",
    "04n": "https://bmcdn.nl/assets/weather-icons/v1.5/overcast.svg",
    "09d": "https://bmcdn.nl/assets/weather-icons/v1.5/drizzle.svg",
    "09n": "https://bmcdn.nl/assets/weather-icons/v1.5/drizzle.svg",
    "10d":
      "https://bmcdn.nl/assets/weather-icons/v1.5/partly-cloudy-day-drizzle.svg",
    "10n":
      "https://bmcdn.nl/assets/weather-icons/v1.5/partly-cloudy-night-drizzle.svg",
    "11d": "https://bmcdn.nl/assets/weather-icons/v1.5/thunderstorms-day.svg",
    "11n": "https://bmcdn.nl/assets/weather-icons/v1.5/thunderstorms-night.svg",
    "13d": "https://bmcdn.nl/assets/weather-icons/v1.5/snow.svg",
    "13n": "https://bmcdn.nl/assets/weather-icons/v1.5/snow.svg",
    "50d": "https://bmcdn.nl/assets/weather-icons/v1.5/mist.svg",
    "50n": "https://bmcdn.nl/assets/weather-icons/v1.5/mist.svg",
  };
  return types[icon];
};
const getBackgorundBasedOn = (image) => {
  const types = {
    // images SRC
    Clear:
      "https://images.unsplash.com/photo-1602331124146-43d2533909d3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    Rain: "https://images.unsplash.com/photo-1603262439120-3e17d13bab3f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    Clouds:
      "https://images.unsplash.com/photo-1544829728-e5cb9eedc20e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80",
    Thunderstorm:
      "https://images.unsplash.com/photo-1594668165958-72d34a3fb90d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=967&q=80",
    Drizzle:
      "https://images.unsplash.com/photo-1556485689-33e55ab56127?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    Snow: "https://images.unsplash.com/photo-1483664852095-d6cc6870702d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    Mist: "https://images.unsplash.com/photo-1512923927402-a9867a68180e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    Smoke:
      "https://images.unsplash.com/photo-1618782939818-7e304c830ea8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
    Haze: "https://images.unsplash.com/photo-1466377578534-552594dde567?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1189&q=80",
    Dust: "https://images.unsplash.com/photo-1481436183848-df276738a795?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1117&q=80",
    Sand: "https://images.unsplash.com/photo-1547235002-edab0f7f1395?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1053&q=80",
    Ash: "https://images.unsplash.com/photo-1617917197067-5de504d8518e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1051&q=80",
    Squall:
      "https://images.unsplash.com/photo-1567604154063-4e079ff60be3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80",
    Tornado:
      "https://images.unsplash.com/photo-1442213391790-7656f6e368b9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1053&q=80",
  };

  return types[
    image
    // "Clouds" || "ok" //CLear, rain
  ];
};

export {
  getApi,
  findCityToRemove,
  titleCase,
  getLastCities,
  selectedToStorage,
  getIconBasedOn,
  getBackgorundBasedOn,
};
