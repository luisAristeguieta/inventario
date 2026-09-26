import axios from 'axios';

const API_URL = 'http://192.168.100.27:3001';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 segundos maximo para esperar la imagen
});