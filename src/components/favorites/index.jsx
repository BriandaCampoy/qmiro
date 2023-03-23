import './style.css';
import useFavorites from '../../services/useFavorites';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Skeleton from './skeleton';
import mediaServices from '../../services/mediaServices';
import SlideMovies from '../slideMovies';


function SlideFavorites() {
  const navigate = useNavigate()
  const [media, setMedia] = useState([]);
  const location = useLocation()
  const [loading, setLoading] = useState(true);
  const {
    items
  } = useFavorites('favorites_v1', [])
  useEffect(() => {
    // console.log(JSON.parse(items));
    if(items){
      getMedia(items).then((res)=>{
        setMedia(res)
      })
    }
  }, [location,items]);


  useEffect(() => {
    if (media!=undefined) {
      setLoading(false);
    }
  }, [media]);

  async function getMedia(data){
    const datos = await Promise.all(data.map(async (item)=>{
      const itemjs =JSON.parse(item)
      const result = await mediaServices.getMediaById(itemjs.media, itemjs.id )
      result.data['media'] = itemjs.media;
      return result.data;
    }))
    return datos;
  }

  if (loading) {
    return <Skeleton />;
  } else {
    return (
      <main>
        <section className="section">
          <div className="section__head">
            <h2>Favorites</h2>
            <button
              onClick={() => {
                // navigate(`/trends/${mediaType}/1`);
              }}
            >
              See more
            </button>
          </div>
          <SlideMovies items={media} />
        </section>
      </main>
    );
  }
}

export default SlideFavorites;
