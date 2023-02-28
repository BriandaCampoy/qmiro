import {
  useNavigate,
  useParams,
  useLocation,
  useSearchParams
} from 'react-router-dom';
import { useEffect, useState } from 'react';
import moviesServices from '../../services/moviesServices';
import { URL_BASE300 } from '../../services/config';
import './style.css';

function ListCategory(){
  return(
      <Pagination view='categories'/>
  )
}
function ListSearch(){
  return(
      <Pagination view='search'/>
  )
}
function ListMore(){
  return(
      <Pagination view='viewMore'/>
  )
}

function Pagination({ view }) {
  const { id, mediaType, page } = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [media, setMedia] = useState([])
  const location = useLocation()

  function loadMedia(page) {
      switch(view){
        case 'categories':
          navigate(`/category/${id}/${page}`)
          break;
        case 'search':
          navigate(`/${page}?${searchParams}`)
          break;
        case 'viewMore':
          navigate(`/trends/${mediaType}/${page}`)
          break;
      }
  }

  useEffect(() => {
    switch (view){
      case 'categories':
        moviesServices.getMediaByCategory(id, page).then((res)=>{
          setMedia(res)
        })
        break;
      case 'search':
        moviesServices
        .searchMediaBySearch(searchParams.get('search'), page)
        .then((res) => {
          setMedia(res);
        });
        break;
      case 'viewMore':
        moviesServices.getTrending(mediaType, page).then((response) => {
          setMedia(response);
        });
        break;
    }
    window.scroll(0,0)
  }, [location]);
  return <>
         <div className="movies__conteiner">
          {media.map((media) => (
            <img
              src={
                media.poster_path != null
                  ? `${URL_BASE300}${media.poster_path}`
                  : 'https://res.cloudinary.com/dtn1pnbmu/image/upload/v1677214734/posterNotFound_ifcinb.jpg'
              }
              alt={media.title}
              key={media.id}
              onClick={() => {
                navigate(`/${media.mediaType}/${media.id}`);
              }}
            />
          ))}
        </div>
        <div className="controlsBox">
        {media.previous && <button onClick={()=>{loadMedia(media.previous)}}>Anterior</button>}
        {media.next && <button onClick={()=>{loadMedia(media.next)}}>Siguiente</button>}
      </div>
  </>;
}

export {ListCategory, ListSearch, ListMore};
