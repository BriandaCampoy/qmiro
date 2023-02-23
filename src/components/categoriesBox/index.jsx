import Category from '../../components/category';

function CategoriesBox({categories}) {
  return (
    <section className="categories">
      <h3>Categories</h3>
      <div className="categories__content">
        {/* categories list */}
        {categories?.map((category) => (
          <Category category={category} key={category.id} />
        ))}
      </div>
    </section>
  );
}

export default CategoriesBox;
