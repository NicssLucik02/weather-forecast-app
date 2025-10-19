const API_KEY = "8d293de82001469399f143903251808";

export const findCity = (city: string, days: number = 5) => {
  // `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`
  const url = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=${days}&aqi=no&alerts=no`;

  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.status.toString());
      }
      return response.json();
    })
    .catch((error) => console.error(error));
};

export const findCoords = async (
  coords: { lat: number; lon: number },
  days: number = 5,
) => {
  const url = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${coords.lat},${coords.lon}&days=${days}&aqi=no&alerts=no`;

  try {
    const response = await fetch(url);
    return response.json();
  } catch (error) {
    console.error(error);
  }
};

// export const getForecast = (city, days = 5) => {
//   const url =
//   `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days${days}&aqi=no&alerts=no`

//   return fetch(url)
//   .then(response => {
//     if (!response.ok) {
//       throw new Error(response.status);
//     }
//     return response.json();
//   })
// }
