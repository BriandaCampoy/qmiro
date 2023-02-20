import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import moviesServices from '../../services/moviesServices';
import { URL_BASE300 } from '../../services/config';
import './style.css';

function OnSearch({ busqueda }) {
  const [results, setResults] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    moviesServices
      .searchMovieBySearch(searchParams.get('search'))
      .then((res) => {
        setResults(res.results);
      });
  }, [searchParams]);

  return (
    <>
      <h4>Resultados para {busqueda}</h4>
      <div className="resultsSearch">
        <div className="movies__conteiner">
          {results.map((movie) => (
            <img
              src={`${URL_BASE300}${movie.poster_path}`}
              alt={movie.title}
              key={movie.id}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default OnSearch;
