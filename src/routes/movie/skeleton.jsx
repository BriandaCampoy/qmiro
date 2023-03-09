import './style.css'
import CategorySkeleton from '../../components/category/skeleton'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import GradeIcon from '@mui/icons-material/Grade';
import Footer from '../../components/footer';

function Skeleton(){
  return(
    <div className="movieDetails">
    <div className="movie__background--load loading"></div>
    <ArrowBackIosNewIcon
      className="movie__return"
    />
    <div className="movieDetails__info">
      <div className="movieDetails__info__head">
        <div className="movieDetails__info__title__load loading"></div>
        <div className="movieDetails__info__head__grade">
          <div className="grade loading"></div> <GradeIcon />
        </div>
        <div className="movieDetails__info__overview">
            <div className="movieDetails__info__overview__line loading"></div>
            <div className="movieDetails__info__overview__line loading"></div>
            <div className="movieDetails__info__overview__line loading"></div>
            <div className="movieDetails__info__overview__line loading"></div>
        </div>
        <div className="movieDetails__poster loading"></div>
        <div className="movieDetails__categories">
          <CategorySkeleton/>
          <CategorySkeleton/>
          <CategorySkeleton/>
        </div>
      </div>
      <h2 className="movieDetails__similars">Similar</h2>
      <div className="movies-conteiner">
          <div className="section__movie loading"></div>
          <div className="section__movie loading"></div>
          <div className="section__movie loading"></div>
          <div className="section__movie loading"></div>
        </div>
    </div>
    <Footer />
  </div>
  )
}

export default Skeleton;