import './style.css';
import SearchIcon from '@mui/icons-material/Search';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import moviesServices from '../../services/moviesServices';
import { useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import Trends from '../../components/trends/Trends';
import OnSearch from '../../components/onSearch/OnSearch';
//  import { API_KEY } from '../../services/moviesServices';

function Home() {
  const [movies, setMovies] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchBar, setSearchBar ]= useState(searchParams.get('search')||'')
  const location = useLocation();

  useEffect(() => {
    moviesServices.getTrendingMovies().then((response) => {
      setMovies(response.results);
    });
    moviesServices.getCategories().then((response) => {
      setCategories(response.genres);
    });
    // setSearchParams({search : 'jamas'})
    // console.log(searchParams.get('search'));
  }, [location]);

  function onSearchValueChange(e) {
    setSearchBar( e.target.value.toLowerCase() );
  }
  function throwSearch(){
    setSearchParams({search : searchBar})
  }

  return (
    <div className="home">
      <header>
        <h1>Qmiro</h1>
        <div className="searchBar__conteiner">
          <input
            type="text"
            value={searchBar}
            onChange={onSearchValueChange}
          />
          <div className="icon__conteiner" onClick={throwSearch}>
            <SearchIcon fontSize="large" />
          </div>
        </div>
      </header>
      {searchParams.get('search') ? (
        <OnSearch busqueda={searchParams.get('search')} />
        ) : (
          <Trends movies={movies} categories={categories} />
      )}
      <footer>
        <p>Made by BriandaCampoy</p>
        <GitHubIcon className="glowing__icon" />
        <LinkedInIcon className="glowing__icon" />
      </footer>
    </div>
  );
}

export default Home;
