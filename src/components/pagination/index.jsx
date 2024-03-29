import {
  useNavigate,
  useParams,
  useLocation,
  useSearchParams
} from 'react-router-dom';
import { useEffect, useState } from 'react';
import moviesServices from '../../services/mediaServices';
import { URL_BASE300 } from '../../services/config';
import './style.css';
import Skeleton from './skeleton';
import { LazyLoadImage } from 'react-lazy-load-image-component';

function ListCategory() {
  return <Pagination view="categories" />;
}
function ListSearch() {
  return <Pagination view="search" />;
}
function ListMore() {
  return <Pagination view="viewMore" />;
}

function Pagination({ view }) {
  const { id, mediaType, page } = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [media, setMedia] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  function loadMedia(page) {
    switch (view) {
      case 'categories':
        navigate(`/category/${id}/${page}`);
        break;
      case 'search':
        navigate(`/${page}?${searchParams}`);
        break;
      case 'viewMore':
        navigate(`/trends/${mediaType}/${page}`);
        break;
    }
  }

  useEffect(() => {
    getMedia();
    window.scroll(0, 0);
  }, [location]);

  function getMedia() {
    switch (view) {
      case 'categories':
        moviesServices.getMediaByCategory(id, page).then((res) => {
          setMedia(res);
        });
        break;
      case 'search':
        moviesServices
          .searchMediaBySearch(searchParams.get('search'), page)
          .then((res) => {
            setMedia(res);
          });
        break;
      case 'viewMore':
        // if (media) {
        //   moviesServices.getTrending(mediaType, media.next).then((response) => {
        //     const moreMedia = media.concat(response);
        //     setMedia(moreMedia);
        //   });
        // } else {
          moviesServices.getTrending(mediaType, page).then((response) => {
            setMedia(response);
          });
        // }
        break;
    }
  }

  useEffect(() => {
    if (media != undefined) {
      setLoading(false);
    }
  }, [media]);

  if (loading) {
    return <Skeleton />;
  } else {
    return (
      <>
        <div className="movies__conteiner">
          {media?.length <= 0 && <h3>No more results</h3>}
          {media?.map((media) => (
            <LazyLoadImage
              src={
                media.poster_path != null
                  ? `${URL_BASE300}${media.poster_path}`
                  : 'https://res.cloudinary.com/dtn1pnbmu/image/upload/v1677214734/posterNotFound_ifcinb.jpg'
              }
              alt={media.title}
              key={media.id}
              onClick={() => {
                navigate(`/${media.media_type}/${media.id}`);
              }}
            />
          ))}
        </div>
        <div className="controlsBox">
          {media?.previous && (
            <button
              onClick={() => {
                loadMedia(media.previous);
              }}
            >
              Anterior
            </button>
          )}
          {/* <button onClick={getMedia}>Cargar mas</button> */}
          {media?.next && (
            <button
              onClick={() => {
                loadMedia(media.next);
              }}
            >
              Siguiente
            </button>
          )}
        </div>
      </>
    );
  }
}

export { ListCategory, ListSearch, ListMore };
