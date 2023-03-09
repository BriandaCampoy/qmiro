import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ListCategory } from '../../components/pagination';
import Category from '../../components/category';
import moviesServices from '../../services/mediaServices';
import Footer from '../../components/footer';
import CategorySkeleton from '../../components/category/skeleton'
import './style.css';

function CategoryPage() {
  const { id } = useParams();
  const [category, setCategory] = useState(useLocation().state?.category);
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate();
  useEffect(() => {
    if (!category) {
      moviesServices.getCategoryById(id).then((res) => {
        setCategory(res);
      });
    }
  }, []);
  useEffect(()=>{
    if(category!=undefined) {
      setLoading(false)
    }
  },[category])
  return (
    <div className="categoryPage">
      <div className="categoryPage__header">
        <ArrowBackIosNewIcon
          onClick={() => {
            navigate('/');
          }}
        />
        {loading && <CategorySkeleton/>}
        {!loading && <Category category={category} />}
      </div>
      <ListCategory />
      <Footer/>
    </div>
  );
}

export default CategoryPage;
