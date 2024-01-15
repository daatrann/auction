import axios from"axios"

const instance = axios.create({
    baseURL: 'https://bidviet.onrender.com/',
    timeout: 1000,
  });

  export default instance;
