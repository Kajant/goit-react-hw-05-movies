import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3/';
const API_KEY = '166f4a4e7660c9919e893f2d0732f073';

export async function fetchTrendingMovies() {
  axios.defaults.params = {
    api_key: API_KEY,
    language: 'en',
  };
  const response = await axios.get(`trending/movie/week`);
  return response.data.results;
}

export async function fetchSearchMovie(query) {
  axios.defaults.params = {
    api_key: API_KEY,
    query: query,
    include_adult: false,
    language: 'en',
  };
  const response = await axios.get(`/search/movie`);
  return response.data.results;
}

export async function fetchMovieDetails(id) {
  axios.defaults.params = {
    api_key: API_KEY,
    language: 'en',
  };
  const response = await axios.get(`/movie/${id}`);
  return response.data;
}

export async function fetchMovieCredits(id) {
  axios.defaults.params = {
    api_key: API_KEY,
    language: 'en',
  };
  const response = await axios.get(`/movie/${id}/credits`);
  return response.data.cast;
}

export async function fetchMovieReviews(id) {
  axios.defaults.params = {
    api_key: API_KEY,
    language: 'en',
  };
  const response = await axios.get(`/movie/${id}/reviews`);
  return response.data.results;
}