import './style.css';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from 'react';
import { useLocation, useSearchParams, useNavigate, Link } from 'react-router-dom';
import Trends from '../../components/trendsSlide';
import { ListSearch } from '../../components/pagination';
import Footer from '../../components/footer';
import CategoriesBox from '../../components/categoriesBox';

function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchBar, setSearchBar] = useState(searchParams.get('search') || '');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setSearchBar(searchParams.get('search'));
    window.scroll(0, 0);
  }, [location]);

  function onSearchValueChange(e) {
    setSearchBar(e.target.value.toLowerCase());
  }
  function throwSearch(e) {
    e.preventDefault();
    setSearchParams({ search: searchBar });
    navigate(`/1?search=${searchBar}`);
  }

  return (
    <div className="home">
      <header>
        <Link to="/">
          <h1>Qmiro</h1>
        </Link>
        <div className="searchBar__conteiner">
          <form
            action=""
            onSubmit={throwSearch}
            className="searchBar__conteiner"
          >
            <input
              type="text"
              value={searchBar ? searchBar : ''}
              onChange={onSearchValueChange}
            />
            <button type="submit" className="icon__conteiner">
              <SearchIcon fontSize="large" />
            </button>
          </form>
        </div>
      </header>
      {searchParams.get('search') ? (
        <ListSearch />
      ) : (
        <div className="trends-conteiner">
          <Trends mediaType={'movie'} />
          <Trends mediaType={'tv'} />
          <CategoriesBox/>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default Home;
