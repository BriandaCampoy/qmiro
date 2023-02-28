import { api } from './config';

export default {
  getTrending: async (media, page=1) => {
    // try {
    //   const res = await fetch(`${URL_API}/trending/movie/week?api_key=${API_KEY}`)
    //   const data = await res.json()
    //   return data
    // } catch (error) {
    //   console.error(error)
    // }
    try {
      const { data } = await api(`/trending/${media}/week`, {
        params: {
          page: page
        }
      });
      const trends = data.results;
      if((data.page<data.total_pages)||(data.page<data.total_pages)){
        trends['next']=parseInt(page)+1;
      }
      if(page>1){
        trends['previous']=parseInt(page)-1;
      }
      return trends;
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
      const { data } = await api(`/genre/movie/list`);
      // const data = await result.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  },
  getCategoryById: async (idCategory) => {
    try {
      const { data } = await api(`/genre/movie/list`);
      const category = data.genres.find(
        (category) => category.id == idCategory
      );
      return category;
    } catch (error) {
      // console.log(error);
    }
  },

  getMediaById: async (media, idMedia) => {
    const { data } = await api(`/${media}/${idMedia}`);
    const recommendations = await (
      await api(`/${media}/${idMedia}/recommendations`)
    ).data.results;
    const movie = {
      data,
      recommendations
    };
    return movie;
  },
  getMediaByCategory: async (idCategory, page=1) => {
    try {
      const dataMovies = await api(`/discover/movie`, {
        params: {
          with_genres: idCategory,
          page: page
        }
      });
      const dataTV = await api(`/discover/tv`, {
        params: {
          with_genres: idCategory,
          page: page
        }
      });
      dataMovies.data.results.map(data => data['mediaType']='movie')
      dataTV.data.results.map(data => data['mediaType']='tv')
      let searchedMedia = dataMovies.data.results.concat(dataTV.data.results);
      searchedMedia = searchedMedia.sort(function (a, b) {
        if (a.title < b.title) {
          return -1;
        }
        if (a.title > b.title) {
          return 1;
        }
        return 0;
      });
      if((dataTV.data.page<dataTV.data.total_pages)||(dataMovies.data.page<dataMovies.data.total_pages)){
        searchedMedia['next']=parseInt(page)+1;
      }
      if(page>1){
        searchedMedia['previous']=parseInt(page)-1;
      }
      return searchedMedia;
    } catch (error) {
      console.log(error);
    }
  },
  searchMediaBySearch: async (query, page=1) => {
    try {
      const dataMovies = await api(`/search/movie`, {
        params: {
          page: page,
          query: query,
        }
      });
      const dataTV = await api(`/search/tv`, {
        params: {
          page: page,
          query: query
        }
      });
      dataMovies.data.results.map(data => data['mediaType']='movie')
      dataTV.data.results.map(data => data['mediaType']='tv')
      let searchedMedia = dataMovies.data.results.concat(dataTV.data.results);
      searchedMedia = searchedMedia.sort(function (a, b) {
        if (a.title < b.title) {
          return -1;
        }
        if (a.title > b.title) {
          return 1;
        }
        return 0;
      });
      if((dataTV.data.page<dataTV.data.total_pages)||(dataMovies.data.page<dataMovies.data.total_pages)){
        searchedMedia['next']=parseInt(page)+1;
      }
      if(page>1){
        searchedMedia['previous']=parseInt(page)-1;
      }
      return searchedMedia;
    } catch (error) {
      // console.log(error);
    }
  }
};
