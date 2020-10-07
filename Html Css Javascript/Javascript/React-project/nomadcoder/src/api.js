import axios from "axios";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  params: {
    "api_key": "344f1388677a88629b0c8651f19cbb04",
    "language": "en-US"
  }
});

export const tvApi = {
  nowPlaying: () => api.get("movie/now_playing"),
  upComming: () => api.get("movie/upComming"),
  popular: () => api.get("movie/popular")
}

export const MoviesApi = {

}

export default api;