import SlideMovies from '../slideMovies';
import { useEffect, useState } from 'react';
import moviesServices from '../../services/mediaServices';
import { useLocation, useNavigate } from 'react-router-dom';

function TrendsSlide ({mediaType}){
  const navigate = useNavigate();
  const [media, setMedia] = useState([]);
  const location = useLocation()

  useEffect(() => {
    moviesServices.getTrending(mediaType, 1).then((response) => {
      setMedia(response);
    });

  }, [location]);

  return( <main>
    <section className="section">
      <div className="section__head">
        <h2>Trends - {mediaType}</h2>
        <button onClick={()=>{navigate(`/trends/${mediaType}/1`)}}>See more</button>
      </div>
      <SlideMovies media={mediaType} items={media}/>
    </section>
    {/* <section className="section">
      <div className="section__head">
        <h2>Trends - movies</h2>
        <button>See more</button>
      </div>
      <SlideMovies/>
    </section> */}
  </main>)
}

export default TrendsSlide;