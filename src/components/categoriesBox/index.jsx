import Category from '../../components/category';
import { useEffect, useState } from 'react';
import moviesServices from '../../services/mediaServices';


function CategoriesBox() {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    moviesServices.getCategories().then((response) => {
      setCategories(response.genres);
    });
  }, []);
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

export default CategoriesBox;
