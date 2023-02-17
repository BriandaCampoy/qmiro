import SlideMovies from '../../components/slideMovies';
import Category from '../../components/category';

function Trends ({movies, categories}){

  return( <main>
    <section className="section">
      <div className="section__head">
        <h2>Trends - movies</h2>
        <button>See more</button>
      </div>
      <SlideMovies items={movies}/>
    </section>
    <section className="section">
      <div className="section__head">
        <h2>Trends - movies</h2>
        <button>See more</button>
      </div>
      <SlideMovies/>
    </section>
    <section className="categories">
      <h3>Categories</h3>
      <div className="categories__content">
        {/* categories list */}
        {categories?.map((category) => (
          <Category category={category} key={category.id}/>
        ))}
      </div>
    </section>
  </main>)
}

export default Trends;