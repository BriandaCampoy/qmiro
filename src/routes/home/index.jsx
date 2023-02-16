import './style.css';
import SearchIcon from '@mui/icons-material/Search';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import SlideMovies from '../../components/slideMovies';
import moviesServices from '../../services/moviesServices';
import { useEffect, useState } from 'react';
//  import { API_KEY } from '../../services/moviesServices';

function Home() {

  const [movies, setMovies] = useState([]);

  useEffect(()=>{
    moviesServices.getTrendingMovies()
    .then((response)=>{
      setMovies(response.results)
    })
  },[])

  return (
    <div className='home'>
      <header>
        <h1>Qmiro</h1>
        <div className="searchBar__conteiner">
          <input type="text" />
          <div className="icon__conteiner">
            <SearchIcon fontSize='large'/>
          </div>
        </div>
      </header>
      <main>
        <section className="section">
          <div className="section__head">
            <h2>Trends - movies</h2>
            <button>See more</button>
          </div>
          <SlideMovies items={movies}/>
        </section>
        <section className="section">
          <div className="section__head">
            <h2>Trends - movies</h2>
            <button>See more</button>
          </div>
          <SlideMovies/>
        </section>
        <section className="categories">
          <h3>Categories</h3>
          <div className="categories__content">
            {/* categories list */}
          </div>
        </section>
      </main>
      <footer>
        <p>Made by BriandaCampoy</p>
        <GitHubIcon className='glowing__icon'/>
        <LinkedInIcon className='glowing__icon'/>
      </footer>
    </div>
  );
}

export default Home;
