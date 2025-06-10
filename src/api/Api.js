import axios from 'axios';
console.log("ENV", import.meta.env.VITE_API_BASE_URL)
const API_URL = import.meta.env.VITE_API_BASE_URL || "localhost:5000/api" // import from env
const instance = axios.create({
  baseURL: API_URL,  
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;