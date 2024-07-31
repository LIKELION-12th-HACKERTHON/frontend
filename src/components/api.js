import axios from "axios";

const api = axios.create({
  baseURL: 'https://ourvege.store',
  timeout: 5000,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

export default api;