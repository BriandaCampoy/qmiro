import './style.css'

function Skeleton() {
  return (
    <main>
      <section className="section">
        <div className="section__head">
          <div className="section__head__title loading"></div>
          <div className="section__head__button loading"></div>
        </div>
        {/* <SlideMovies media={mediaType} items={media} /> */}
        <div className="movies-conteiner">
          <div className="section__movie loading"></div>
          <div className="section__movie loading"></div>
          <div className="section__movie loading"></div>
          <div className="section__movie loading"></div>
        </div>
      </section>
    </main>
  );
}

export default Skeleton;
