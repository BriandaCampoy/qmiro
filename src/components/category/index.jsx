import './style.css';
import { useNavigate } from 'react-router-dom';

function Category({category}){
  const navigate = useNavigate();
  function toCategory(){
    navigate('/category/'+category.id, {state:{category}})
  }
  return(
  <div className="category__block" onClick={toCategory}>
    <p>{category.name}</p>
    <div className="category__color" id={'id'+category.id}>
    </div>
  </div>)
}

let categoryColor= []
categoryColor['action']="#000";
categoryColor['adventure']="#000";


export default Category;