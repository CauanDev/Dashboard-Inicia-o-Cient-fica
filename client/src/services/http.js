import axios from 'axios';

const http = axios.create({
  baseURL: 'http://127.0.0.1:8000',
  headers: {
    'Content-type': 'application/json',
  },
  withCredentials: true,
});

export default http;