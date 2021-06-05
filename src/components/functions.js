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
  const isInLocation = town.toLocaleLowerCase() === currentCity.toLocaleLowerCase();
  console.log("isTownInLocalStorage", isTownInLocalStorage)
  console.log("isInLocation", isInLocation)
  return (isTownInLocalStorage || isInLocation);
}
export {
  getApi,
  findCityToRemove,
  titleCase,
  getLastCities,
  selectedToStorage,
};
