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
import Skeleton from './skeleton';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import useFavorites from '../../services/useFavorites';

function Media() {
  const { id, media } = useParams();
  const [movie, setMovie] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const [favorite, setFavorite] = useState(false);
  const { saveItem, items, unsaveItem } = useFavorites('favorites_v1', []);

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
  useEffect(() => {
    if (movie != undefined) {
      setLoading(false);
    }
  }, [movie]);
  useEffect(() => {
    // console.log(items);
    try {
      const liked = items?.find((item) => JSON.parse(item).id == id);
      setFavorite(liked != undefined);
    } catch (error) {
      console.log(error);
    }
  }, [items]);

  function like() {
    if (!favorite) {
      saveItem({ id: id, media: media });
    } else {
      unsaveItem({ id: id, media: media });
    }
  }

  if (loading) {
    return <Skeleton />;
  } else {
    return (
      <div className="movieDetails">
        <LazyLoadImage
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
            <p className="movieDetails__info__like" onClick={like}>
              {favorite && '💛'}
              {!favorite && '🤍'}
            </p>
            <div className="movieDetails__info__head__pts">
              {movie?.data?.vote_average} <GradeIcon />
            </div>
            <p className="movieDetails__info__overview">
              {movie?.data?.overview}
            </p>
            <LazyLoadImage
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
          <SlideMovies
            className="slideMedia"
            media={media}
            items={movie?.recommendations}
          />
        </div>
        <Footer />
      </div>
    );
  }
}

export default Media;
