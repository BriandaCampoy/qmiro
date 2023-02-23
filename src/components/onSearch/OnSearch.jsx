import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import moviesServices from '../../services/moviesServices';
import { URL_BASE300 } from '../../services/config';
import './style.css';

function OnSearch({ busqueda }) {
  const [results, setResults] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  useEffect(() => {
    moviesServices
      .searchMediaBySearch(searchParams.get('search'), 1)
      .then((res) => {
        console.log(res);
        setResults(res);
      });
  }, [searchParams]);

  return (
    <>
      <h4>Results for {busqueda}</h4>
      <div className="resultsSearch">
        <div className="movies__conteiner">
          {results.map((media) => (
            <img
              src={`${URL_BASE300}${media.poster_path}`}
              alt={media.title}
              key={media.id}
              onClick={()=>{navigate(`/${media.mediaType}/${media.id}`)}}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default OnSearch;
