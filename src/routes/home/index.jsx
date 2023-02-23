import './style.css';
import SearchIcon from '@mui/icons-material/Search';
import moviesServices from '../../services/moviesServices';
import { useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import Trends from '../../components/trends/Trends';
import OnSearch from '../../components/onSearch/OnSearch';
import Footer from '../../components/footer';
import CategoriesBox from '../../components/categoriesBox';
//  import { API_KEY } from '../../services/moviesServices';

function Home() {
  const [movies, setMovies] = useState([]);
  const [series, setSeries] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchBar, setSearchBar] = useState(searchParams.get('search') || '');
  const location = useLocation();

  useEffect(() => {
    moviesServices.getTrending(1,'movie').then((response) => {
      setMovies(response.results);
    });
    moviesServices.getCategories().then((response) => {
      setCategories(response.genres);
    });
    moviesServices.getTrending(1,'tv').then((response) => {
      setSeries(response.results);
    })

    window.scroll(0, 0);
    // setSearchParams({search : 'jamas'})
    // console.log(searchParams.get('search'));
  }, [location]);

  function onSearchValueChange(e) {
    setSearchBar(e.target.value.toLowerCase());
  }
  function throwSearch() {
    setSearchParams({ search: searchBar });
  }

  return (
    <div className="home">
      <header>
        <h1>Qmiro</h1>
        <div className="searchBar__conteiner">
          <input type="text" value={searchBar} onChange={onSearchValueChange} />
          <div className="icon__conteiner" onClick={throwSearch}>
            <SearchIcon fontSize="large" />
          </div>
        </div>
      </header>
      {searchParams.get('search') ? (
        <OnSearch busqueda={searchParams.get('search')} />
      ) : (
        <div className="trends-conteiner">
          <Trends
            media={movies}
            mediaType={'movie'}
          />
          <Trends
            media={series}
            mediaType={'tv'}
          />
          <CategoriesBox categories={categories} />
        </div>
      )}
      <Footer />
    </div>
  );
}

export default Home;
