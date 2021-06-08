import axios from "axios";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  params: {
    "api_key": "344f1388677a88629b0c8651f19cbb04",
    "language": "en-US"
  }
});

export const movieApi = {
  nowPlaying: () => api.get("movie/now_playing"),
  upComming: () => api.get("movie/upcoming"),
  popular: () => api.get("movie/popular"),
  movieDetail: (id) => api.get(`movie/${id}`, {
    params: {
      append_to_response: "videos"
    }
  }),
  search: term => api.get("search/movie", {
    params: {
      query: term
    }
  })
};

export const tvApi = {
  topRated: () => api.get("tv/top_rated"),
  popular: () => api.get("tv/popular"),
  aringToday: () => api.get("tv/airing_today"),
  showDetail: (id) => api.get(`tv/${id}`, {
    params: {
      append_to_response: "videos"
    }
  }),
  search: term => api.get("search/tv", {
    params: {
      query: term
    }
  })
};

export default api;