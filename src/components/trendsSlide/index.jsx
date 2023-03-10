import SlideMovies from '../slideMovies';
import { useEffect, useState } from 'react';
import moviesServices from '../../services/mediaServices';
import { useLocation, useNavigate } from 'react-router-dom';
import Skeleton from './skeleton';
import './style.css';

function TrendsSlide({ mediaType }) {
  const navigate = useNavigate();
  const [media, setMedia] = useState(undefined);
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    moviesServices.getTrending(mediaType, 1).then((response) => {
      setMedia(response);
    });
  }, [location]);
  useEffect(()=>{
    if(media!=undefined){
      setLoading(false)
    }
  },[media])

  if (loading) {
    return <Skeleton/>
  } else {
    return (
      <main>
        <section className="section">
          <div className="section__head">
            <h2>Trends - {mediaType}</h2>
            <button
              onClick={() => {
                navigate(`/trends/${mediaType}`);
              }}
            >
              See more
            </button>
          </div>
          <SlideMovies media={mediaType} items={media} />
        </section>
      </main>
    );
  }
}

export default TrendsSlide;
