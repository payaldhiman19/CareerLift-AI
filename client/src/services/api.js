import axios from "axios";

const api = axios.create({
  baseURL: "https://careerlift-backend-sojr.onrender.com/api",
});

export default api;