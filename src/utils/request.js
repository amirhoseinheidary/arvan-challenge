import axios from "axios";

const instance = axios.create({
  timeout: 10000,
  baseURL: "https://api.realworld.io",
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("arvan-token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      config.headers["Content-Type"] = "application/json";
    }

    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  ({ data }) => data,
  ({ message, response }) => Promise.reject(response ? response.data : message)
);

export default instance;
