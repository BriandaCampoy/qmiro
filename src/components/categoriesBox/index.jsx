import Category from '../../components/category';
import { useEffect, useState } from 'react';
import moviesServices from '../../services/mediaServices';
import Skeleton from './skeleton';

function CategoriesBox() {
  const [categories, setCategories] = useState(undefined);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    moviesServices.getCategories().then((response) => {
      setCategories(response.genres);
    });
  }, []);
  
  useEffect(()=>{
    if(categories!=undefined){
      setLoading(false)
    }
  },[categories])

  if (loading) {
    return <Skeleton/>
  } else {
    return (
      <section className="categories">
        <h3>Categories</h3>
        <div className="categories__content">
          {categories?.map((category) => (
            <Category category={category} key={category.id} />
          ))}
        </div>
      </section>
    );
  }
}

export default CategoriesBox;
