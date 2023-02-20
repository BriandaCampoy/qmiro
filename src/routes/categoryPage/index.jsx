import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { URL_BASE300 } from '../../services/config';
import Category from '../../components/category';
import moviesServices from '../../services/moviesServices';
import './style.css'

function CategoryPage() {
  const { id } = useParams();
  const [category, setCategory] = useState(useLocation().state?.category);
  const [moviesByCategory, setMoviesByCategory] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (!category) {
    }
    moviesServices.getMoviesByCategory(id).then((res) => {
      setMoviesByCategory(res.results);
    });
  }, []);

  return (
    <div className="categoryPage">
      <ArrowBackIosNewIcon
        onClick={() => {
          navigate(-1);
        }}
      />
      <Category category={category} />
      <div className="categoryPage__movies">
        <div className="movies__conteiner">
        {moviesByCategory.map((movie) => (
          <img src={`${URL_BASE300}${movie.poster_path}`} alt={movie.title} key={movie.id}/>
          ))}
          </div>
      </div>
    </div>
  );
}

export default CategoryPage;
