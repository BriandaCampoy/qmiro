import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Category from "../../components/category";

function CategoryPage(){
  
  return(<div className="categoryPage">
    <ArrowBackIosNewIcon/>
    <Category/>
    <div className="categoryPage__movies">
      
    </div>
  </div>)
}

export default CategoryPage;