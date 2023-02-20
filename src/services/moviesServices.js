import {api} from './config'

export default {
  getTrendingMovies: async () => {
    // try {
    //   const res = await fetch(`${URL_API}/trending/movie/week?api_key=${API_KEY}`)
    //   const data = await res.json()
    //   return data
    // } catch (error) {
    //   console.error(error)
    // }
    try {
      const {data} = await api('/trending/movie/week');
      // const data = await result.json();
      // console.log(data);
      return data;
      
    } catch (error) {
      console.log(error);
    }
  },
  getCategories: async () => {
    // try {
    //   const res = await fetch(`${URL_API}/genre/movie/list?api_key=${API_KEY}`)
    //   const data = await res.json()
    //   return data
    // } catch (error) {
    //   console.error(error)
    // }
    try {
      const {data} = await api(`/genre/movie/list`);
      // const data = await result.json();
      return data;
      
    } catch (error) {
      console.log(error);
    }
  },
  getCategoryById: async (idCategory)=>{

  },
  getMovieById: async (idMovie)=>{
    const {data} = await api(`/movie/${idMovie}`);
    return data;
  },
  getMoviesByCategory: async (idCategory)=>{
    try {
      const {data} = await api(`/discover/movie`,
      {params:{
        with_genres:idCategory
      },
    });
      return data;
    } catch (error) {
      console.log(error);
    }
  },
  searchMovieBySearch: async(query)=>{
    try {
      const {data} = await api(`/search/movie`,{
        params:{
          query:query,
        }})
      return data;
    } catch (error) {
      
    }
  },


};
