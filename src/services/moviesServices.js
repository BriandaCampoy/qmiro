import {API_KEY} from './config'
const URL_API = 'https://api.themoviedb.org/3'

export default {
   getTrendingMovies : async ()=>{
    const result = await fetch(`${URL_API}/trending/movie/week?api_key=${API_KEY}`)
      const data = await result.json()
      return data;
  },
}