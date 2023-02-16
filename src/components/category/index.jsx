import './style.css';

function Category({category}){
  console.log(category);
  return(
  <div className="category__block">
    <p>{category.name}</p>
    <div className="category__color" id={'id'+category.id}>
    </div>
  </div>)
}

let categoryColor= []
categoryColor['action']="#000";
categoryColor['adventure']="#000";


export default Category;