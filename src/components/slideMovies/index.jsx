import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import './style.css';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import { Pagination, Navigation, Mousewheel } from 'swiper';
import { URL_BASE300 } from '../../services/config';

function SlideMovies({ items }) {
  const navigate = useNavigate();
  return (
    <>
      <Swiper
        direction={'horizontal'}
        slidesPerView={4}
        spaceBetween={30}
        centeredSlides={true}
        navigation={true}
        loop={true}
        pagination={{
          clickable: true
        }}
        mousewheel={true}
        modules={[Pagination, Navigation, Mousewheel]}
        className="mySwiper swiper-custom"
      >
        {items?.map((item) => (
          <SwiperSlide key={item.id}>
            <img
              src={`${URL_BASE300}${item.poster_path}`}
              alt={item.title}
              onClick={() => {navigate('/movie/'+item.id)}}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}

export default SlideMovies;
