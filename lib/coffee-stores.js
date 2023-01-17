import { createApi } from "unsplash-js";

const unsplash = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_KEY_API,
});

const getUrlCoffeeStores = (query, langlat, limit) => {
  return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${langlat}&limit=${limit}`;
};

const getUnsplashPhotos = async (limit, query) => {
  const photoResults = await unsplash.search.getPhotos({
    query,
    page: 1,
    perPage: limit,
  });

  return photoResults.response.results.map((result) => result.urls.small);
};

export const fetchCoffeeStoresData = async (
  query = "coffee",
  langlat = "36.32639536730429%2C59.52713367357371",
  limit = 6
) => {
  const photosUrl = await getUnsplashPhotos(limit, query);
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: process.env.NEXT_PUBLIC_FOURSQUARE_AUTH_API,
    },
  };
  const response = await fetch(
    getUrlCoffeeStores(query, langlat, limit),
    options
  );
  const data = await response.json();
  return data.results.map((coffeeResults, i) => {
    return { ...coffeeResults, imgUrl: photosUrl[i] };
  });
};
