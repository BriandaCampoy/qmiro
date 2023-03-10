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
// import { LazyLoadImage } from 'react-lazy-load-image-component';
import InfiniteScroll from 'react-infinite-scroll-component';

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
  const { id, mediaType } = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [media, setMedia] = useState(undefined);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    getMedia();
  }, [location]);

  function getMedia() {
    switch (view) {
      case 'categories':
        moviesServices.getMediaByCategory(id, 1).then((res) => {
          setMedia(res);
          setPage(res['next']);
        });
        break;
      case 'search':
        moviesServices
          .searchMediaBySearch(searchParams.get('search'), 1)
          .then((res) => {
            setMedia(res);
            setPage(res['next']);
          });
        break;
      case 'viewMore':
        moviesServices.getTrending(mediaType, 1).then((response) => {
          setMedia(response);
          setPage(response['next']);
        });
        break;
    }
  }

  function getNext() {
    switch (view) {
      case 'categories':
        moviesServices.getMediaByCategory(id, page).then((res) => {
          const moreMedia = media.concat(res);
          setMedia(moreMedia);
          setPage(res['next']);
        });
        break;
      case 'search':
        // console.log(searchParams.get('search'), media);
        moviesServices
          .searchMediaBySearch(searchParams.get('search'), page)
          .then((res) => {
            const moreMedia = media.concat(res);
            setMedia(moreMedia);
            setPage(res['next']);
          });
        break;
      case 'viewMore':
        moviesServices.getTrending(mediaType, page).then((response) => {
          const moreMedia = media.concat(response);
          setMedia(moreMedia);
          setPage(response['next']);
        });
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
        <InfiniteScroll
          className="movies__conteiner"
          dataLength={media.length} //This is important field to render the next data
          next={getNext}
          hasMore={page != undefined}
          loader={<h4>Loading...</h4>}
          endMessage={<h3 className="endMessage">No more results</h3>}
          // below props only if you need pull down functionality
          refreshFunction={getMedia}
          // pullDownToRefresh
          pullDownToRefreshThreshold={50}
          pullDownToRefreshContent={
            <h3 style={{ textAlign: 'center' }}>
              &#8595; Pull down to refresh
            </h3>
          }
          releaseToRefreshContent={
            <h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>
          }
        >
          {media?.map((media) => (
            <img
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
        </InfiniteScroll>
        {/* <div className="movies__conteiner">
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
        </div> */}
        {/* <div className="controlsBox">
          <button onClick={getMedia}>Cargar mas</button>
        </div> */}
      </>
    );
  }
}

export { ListCategory, ListSearch, ListMore };
