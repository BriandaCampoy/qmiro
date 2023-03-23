import axios from 'axios';
export const URL_BASE300= 'https://image.tmdb.org/t/p/w300'
export const URL_BASE500= 'https://image.tmdb.org/t/p/w500'
const API_KEY ='aae0a6372038478d3c71592f1be340a2';
const URL_API = 'https://api.themoviedb.org/3'

export const Axiosapi =(lang)=>{
  return axios.create({
    baseURL:URL_API,
    headers:{
      'Content-Type':'application/json;charset=utf-8'
    },
    params:{
      'api_key':API_KEY,
      'language': lang,
    }
  });
}