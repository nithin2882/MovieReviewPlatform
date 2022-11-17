import axios from "axios";
//axios.baseurl ="http://localhost:3001/";
//axios.defaults.baseurl = "http://localhost:3001/";
let config = {
  headers: {
    "Content-Type": "application/json",
  },
};
export default class Dataservice {
  getUsers() {
    return axios.get("http://localhost:3001/user").then((res) => res.data);
  }
  postUsers(body) {
    return axios
      .post("http://localhost:3001/user", body, config)
      .then((res) => res.data);
  }
  getMovie() {
    return axios.get("http://localhost:3001/movie").then((res) => res.data);
  }
  gettopreviews() {
    return axios.get("http://localhost:3001/movie/topreviews").then((res) => res.data);
  }
  getPublishedMovies() {
    return axios.get("http://localhost:3001/movie/published").then((res) => res.data);
  }
  postMovie(body) {
    return axios
      .post("http://localhost:3001/movie", body, config)
      .then((res) => res.data);
  }
  updateMovie(body) {
    return axios
      .put("http://localhost:3001/movie", body, config)
      .then((res) => res.data);
  }
  postLogin(body) {
    console.log(body);
    return axios
      .post("http://localhost:3001/login", body, config)
      .then((res) => res.data);
  }
  getReview() {
    return axios.get("http://localhost:3001/review").then((res) => res.data);
  }
  getMovieBasedReview(body){
    return axios
      .post("http://localhost:3001/review/list", body, config)
      .then((res) => res.data);
  }

  
  postReview(body) {
    return axios
      .post("http://localhost:3001/review", body, config)
      .then((res) => res.data);
  }
}
