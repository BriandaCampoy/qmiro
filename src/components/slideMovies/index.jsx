import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import './style.css';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import { Pagination, Navigation, Mousewheel } from 'swiper';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { URL_BASE300 } from '../../services/config';

function SlideMovies({ media, items }) {
  return (
    <>
      {items?.length<=0 && 
      <h3>Nothing to show</h3>}
      <Swiper
        direction={'horizontal'}
        slidesPerView={4}
        spaceBetween={30}
        centeredSlides={true}
        navigation={true}
        loop={true}
        // pagination={{
        //   clickable: true
        // }}
        mousewheel={true}
        modules={[Pagination, Navigation, Mousewheel]}
        className="mySwiper swiper-custom"
      >
        {items?.map((item) => (
          <SwiperSlide key={item.id}>
            <Link to={`/${media?media:item.media}/`+item.id}>
            <LazyLoadImage
              src={`${URL_BASE300}${item.poster_path}`}
              alt={item.title}
              // onClick={()=>{onClickMedia(media, item.id)}}
              />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}

export default SlideMovies;
