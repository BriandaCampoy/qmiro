import { useLocation, useNavigate, useParams } from 'react-router-dom';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import GradeIcon from '@mui/icons-material/Grade';
import Category from '../../components/category';
import SlideMovies from '../../components/slideMovies';
import './style.css';
import { useEffect, useState } from 'react';
import moviesServices from '../../services/moviesServices';
import { URL_BASE500 } from '../../services/config';
import Footer from '../../components/footer';

function Media() {
  const { id, media } = useParams();
  const [movie, setMovie] = useState();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    moviesServices.getMediaById(media, id)
    .then((res) => {
      setMovie(res)
    })
    .then(()=>{
      window.scroll(0,0)
    });
  }, [location]);


  return (
    <div className="movieDetails">
      <img className='movie__background' src={`${URL_BASE500}${movie?.data?.poster_path}`} alt="" />
      <ArrowBackIosNewIcon className='movie__return' onClick={()=>{navigate(-1)}}/>
      <div className="movieDetails__info">
        <div className="movieDetails__info__head">
          <h2>{movie?.data?.title}</h2>
          <div className="movieDetails__info__head__pts">
            {movie?.data?.vote_average} <GradeIcon />
          </div>
          <p>
           {movie?.data?.overview}
          </p>
          <div className="movieDetails__categories">
            {movie?.data?.genres.map((category)=>(
              <Category category={category} key={category.id}/>
            ))}
          </div>
        </div>
        <h2>{media} similares</h2>
      <SlideMovies media={media} items={movie?.recommendations}/>
      </div>
      <Footer/>
    </div>
  );
}

export default Media;
