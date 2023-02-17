import { useEffect, useState } from 'react';
import './style.css';


function OnSearch({busqueda}){

  const [results, setResults]= useState([])

  useEffect(()=>{

  },[])

  return(<>
    <h4>Resultados para {busqueda}</h4>
    <div className="resultsSearch">

    </div>
  </>)
}

export default OnSearch;