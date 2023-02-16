import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import GradeIcon from '@mui/icons-material/Grade';
import Categorie from '../../components/categories';
import SlideMovies from '../../components/slideMovies';
import './style.css';

function Movie() {
  return (
  <div className="movieDetails">
    <img src="" alt="" />
    <ArrowBackIosNewIcon/>
    <div className="movieDetails__info">
      <div className="movieDetails__info__head">
      <h2>NombreMovie</h2>
      <div className="movieDetails__info__head__pts">
        7.5 <GradeIcon/>
      </div>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex placeat cumque dignissimos nemo iste.</p>
      <div className="movieDetails__categories">
        <Categorie/>
      </div>
      </div>
    </div>
    <SlideMovies></SlideMovies>
  </div>);
}

export default Movie;
