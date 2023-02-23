import SlideMovies from '../../components/slideMovies';

function Trends ({media, mediaType}){

  return( <main>
    <section className="section">
      <div className="section__head">
        <h2>Trends - {mediaType}</h2>
        <button>See more</button>
      </div>
      <SlideMovies media={mediaType} items={media}/>
    </section>
    {/* <section className="section">
      <div className="section__head">
        <h2>Trends - movies</h2>
        <button>See more</button>
      </div>
      <SlideMovies/>
    </section> */}
  </main>)
}

export default Trends;