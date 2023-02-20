import { useParams } from 'react-router-dom';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import GradeIcon from '@mui/icons-material/Grade';
import Category from '../../components/category';
import SlideMovies from '../../components/slideMovies';
import './style.css';
import { useEffect, useState } from 'react';
import moviesServices from '../../services/moviesServices';
import { URL_BASE500 } from '../../services/config';

function Movie() {
  const { id } = useParams();
  const [movie, setMovie] = useState();

  useEffect(() => {
    moviesServices.getMovieById(id)
    .then((res) => {
      setMovie(res)
      console.log(res);
    });
  }, []);

  return (
    <div className="movieDetails">
      <img className='movie__background' src={`${URL_BASE500}${movie?.poster_path}`} alt="" />
      <ArrowBackIosNewIcon />
      <div className="movieDetails__info">
        <div className="movieDetails__info__head">
          <h2>{movie?.title}</h2>
          <div className="movieDetails__info__head__pts">
            {movie?.vote_average} <GradeIcon />
          </div>
          <p>
           {movie?.overview}
          </p>
          <div className="movieDetails__categories">
            {movie?.genres.map((category)=>(
              <Category category={category} key={category.id}/>
            ))}
          </div>
        </div>
      </div>
      <SlideMovies></SlideMovies>
    </div>
  );
}

export default Movie;
