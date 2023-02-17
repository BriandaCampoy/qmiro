import axios from 'axios';
import { API_KEY } from './config';
const URL_API = 'https://api.themoviedb.org/3';
const api = axios.create({
  baseURL:URL_API,
  headers:{
    'Content-Type':'application/json;charset=utf-8'
  },
  params:{
    'api_key':API_KEY,
  }
});

export default {
  getTrendingMovies: async () => {
    try {
      const {data} = await api('/trending/movie/week');
      // const data = await result.json();
      return data;
      
    } catch (error) {
      console.log(error);
    }
  },
  getCategories: async () => {
    try {
      const {data} = await api(`/genre/movie/list`);
      // const data = await result.json();
      return data;
      
    } catch (error) {
      console.log(error);
    }
  }
};
