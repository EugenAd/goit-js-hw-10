import axios from 'axios';
axios.defaults.headers.common['x-api-key'] =
  'live_Y9CBNzIo8Z5H365pirotGV6whcvLRWT3I9yK7rifRSBDrmOfXYtayGVjfYMYZy8h';
export function fetchBreeds() {
  return axios('https://api.thecatapi.com/v1/breeds')
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
}

export function fetchCatByBreed(param) {
  return axios(`https://api.thecatapi.com/v1/images/search?breed_ids=${param}`)
    .then(value => {
      return value.data;
    })
    .catch(error => {
      throw error;
    });
}
