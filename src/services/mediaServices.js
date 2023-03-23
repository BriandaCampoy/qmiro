import { Axiosapi } from './config';
// export let lang = navigator.language
export let lang = navigator.language || 'en-ES';
// let lang = 'EN-en'

export default {
  getTrending: async (media, page = 1) => {
    try {
      console.log(lang);
      const api = Axiosapi(lang)
      const { data } = await api(`/trending/${media}/week`, {
        params: {
          page: page,
        }
      });
      const trends = data.results;
      if (data.page < data.total_pages || data.page < data.total_pages) {
        trends['next'] = parseInt(page) + 1;
      }
      if (page > 1) {
        trends['previous'] = parseInt(page) - 1;
      }
      return trends;
    } catch (error) {
      console.log(error);
      return [];
    }
  },
  getCategories: async () => {
    try {
      const api = Axiosapi(lang)
      const { data } = await api(`/genre/movie/list`);
      // const data = await result.json();
      return data;
    } catch (error) {
      console.log(error);
      return [];
    }
  },
  getCategoryById: async (idCategory) => {
    try {
      const api = Axiosapi(lang)
      const { data } = await api(`/genre/movie/list`);
      const category = data.genres.find(
        (category) => category.id == idCategory
      );
      return category;
    } catch (error) {
      // console.log(error);
      return [];
    }
  },

  getMediaById: async (media, idMedia) => {
    try {
      const api = Axiosapi(lang)
      const { data } = await api(`/${media}/${idMedia}`);
      const recommendations = await (
        await api(`/${media}/${idMedia}/recommendations`)
      ).data.results;
      const movie = {
        data,
        recommendations
      };
      return movie;
    } catch (error) {
      return [];
    }
  },
  getMediaByCategory: async (idCategory, page = 1) => {
    try {
      const api = Axiosapi(lang)
      const dataMovies = await api(`/discover/movie`, {
        params: {
          with_genres: idCategory,
          page: page,
        }
      });
      const dataTV = await api(`/discover/tv`, {
        params: {
          with_genres: idCategory,
          page: page,
        }
      });
      dataMovies.data.results.map((data) => (data['media_type'] = 'movie'));
      dataTV.data.results.map((data) => (data['media_type'] = 'tv'));
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
      if (
        dataTV.data.page < dataTV.data.total_pages ||
        dataMovies.data.page < dataMovies.data.total_pages
      ) {
        searchedMedia['next'] = parseInt(page) + 1;
      }
      if (page > 1) {
        searchedMedia['previous'] = parseInt(page) - 1;
      }
      return searchedMedia;
    } catch (error) {
      console.log(error);
      return [];
    }
  },
  searchMediaBySearch: async (query, page = 1) => {
    try {
      const api = Axiosapi(lang)
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
      dataMovies.data.results.map((data) => (data['media_type'] = 'movie'));
      dataTV.data.results.map((data) => (data['media_type'] = 'tv'));
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
      if (
        dataTV.data.page < dataTV.data.total_pages ||
        dataMovies.data.page < dataMovies.data.total_pages
      ) {
        searchedMedia['next'] = parseInt(page) + 1;
      }
      if (page > 1) {
        searchedMedia['previous'] = parseInt(page) - 1;
      }
      return searchedMedia;
    } catch (error) {
      // console.log(error);
      return [];
    }
  },
  changeLang: (newLang) => {
    lang = newLang;
    console.log(lang);
  }
};
