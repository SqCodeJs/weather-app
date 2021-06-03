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

export { getApi, findCityToRemove, titleCase };
