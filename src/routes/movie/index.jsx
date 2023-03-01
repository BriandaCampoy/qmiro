import { useLocation, useNavigate, useParams } from 'react-router-dom';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import GradeIcon from '@mui/icons-material/Grade';
import Category from '../../components/category';
import SlideMovies from '../../components/slideMovies';
import './style.css';
import { useEffect, useState } from 'react';
import moviesServices from '../../services/mediaServices';
import { URL_BASE500, URL_BASE300 } from '../../services/config';
import Footer from '../../components/footer';

function Media() {
  const { id, media } = useParams();
  const [movie, setMovie] = useState();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    moviesServices
      .getMediaById(media, id)
      .then((res) => {
        setMovie(res);
      })
      .then(() => {
        window.scroll(0, 0);
      });
  }, [location]);

  return (
    <div className="movieDetails">
      <img
        className="movie__background"
        src={`${URL_BASE500}${movie?.data?.poster_path}`}
        alt=""
      />
      <ArrowBackIosNewIcon
        className="movie__return"
        onClick={() => {
          navigate(-1);
        }}
      />
      <div className="movieDetails__info">
        <div className="movieDetails__info__head">
          <h2 className="movieDetails__info__title">
            {media === 'movie' ? movie?.data?.title : movie?.data?.name}
          </h2>
          <div className="movieDetails__info__head__pts">
            {movie?.data?.vote_average} <GradeIcon />
          </div>
          <p className="movieDetails__info__overview">
            {movie?.data?.overview}
          </p>
          <img
            className="movie__img"
            src={`${URL_BASE300}${movie?.data?.poster_path}`}
            alt=""
          />
          <div className="movieDetails__categories">
            {movie?.data?.genres.map((category) => (
              <Category category={category} key={category.id} />
            ))}
          </div>
        </div>
        <h2 className="movieDetails__similars">Similar</h2>
        <SlideMovies className='slideMedia' media={media} items={movie?.recommendations} />
      </div>
      <Footer />
    </div>
  );
}

export default Media;
