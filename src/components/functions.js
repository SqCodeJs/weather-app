const getApi = (API) => {
  return fetch(API)
    .then((response) => {
      if (response.ok) {
        return response;
      }
      // throw Error(response.statusText);
    })
    .then((response) => response.json())
    .catch((err) => {
      return err;
      console.log(err);
    });
};

const findCityToRemove = (weatherTab, city) => {
  const index = weatherTab.findIndex((e) => e.name === city);
  return index;
};
export { getApi, findCityToRemove };
