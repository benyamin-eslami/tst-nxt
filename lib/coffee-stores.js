const getUrlCoffeeStores = (query, langlat, limit) => {
  return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${langlat}&limit=${limit}`;
};

export const fetchCoffeeStoresData = async () => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: process.env.FOURSQUARE_AUTH_API,
    },
  };

  const response = await fetch(
    getUrlCoffeeStores("coffee", "36.32639536730429%2C59.52713367357371", 6),
    options
  );
  const data = await response.json();
  return data.results;
};
