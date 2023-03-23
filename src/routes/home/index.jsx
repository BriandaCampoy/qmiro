import './style.css';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from 'react';
import { useLocation, useSearchParams, useNavigate, Link } from 'react-router-dom';
import Trends from '../../components/trendsSlide';
import SlideFavorites from '../../components/favorites';
import { ListSearch } from '../../components/pagination';
import Footer from '../../components/footer';
import CategoriesBox from '../../components/categoriesBox';
import mediaServices from '../../services/mediaServices';
import { lang } from '../../services/mediaServices';

function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchBar, setSearchBar] = useState(searchParams.get('search') || '');
  const navigate = useNavigate();
  const location = useLocation();
  const [language, setLang] = useState(lang)

  useEffect(() => {
    setSearchBar(searchParams.get('search'));
    window.scroll(0, 0);
  }, [location]);

  function onSearchValueChange(e) {
    setSearchBar(e.target.value.toLowerCase());
  }
  function throwSearch(e) {
    e.preventDefault();
    if(e.target.search_bar.value){
      setSearchParams({ search: searchBar });
      navigate(`/1?search=${searchBar}`);
    }else{
      navigate(`/`);
    }
  }
  function changeLang(e){
    mediaServices.changeLang(e.target.value)
    setLang(e.target.value)
    navigate('/')
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
              name="search_bar"
              value={searchBar ? searchBar : ''}
              onChange={onSearchValueChange}
            />
            <button type="submit" className="icon__conteiner">
              <SearchIcon fontSize="large" />
            </button>
          </form>
          <select name="lang" id="" className='selectLang' onChange={changeLang} value={language}>
            <option value="es-Es">Español</option>
            <option value="en-EN">English</option>
            <option value="fr-FR">Frances</option>
          </select>
        </div>
      </header>
      {searchParams.get('search') ? (
        <ListSearch />
      ) : (
        <div className="trends-conteiner">
          <Trends mediaType={'movie'} />
          <Trends mediaType={'tv'} />
          <SlideFavorites/>
          <CategoriesBox/>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default Home;
