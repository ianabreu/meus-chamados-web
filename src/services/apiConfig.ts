import axios, { AxiosError } from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response?.status === 400 && error.response.data) {
      const { message } = error.response.data as { message: string };
      return Promise.reject(new Error(message));
    }
    if (error.response?.status === 401 && error.response.data) {
      return Promise.reject(new Error("Unauthorized"));
    }
    return Promise.reject(new Error("Internal server error"));
  }
);

export { api };
