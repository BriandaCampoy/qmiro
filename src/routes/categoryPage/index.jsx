import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Category from "../../components/category";

function CategoryPage(){
  const {id}= useParams();
  const [category, setCategory] = useState(useLocation().state?.category);
  const navigate = useNavigate();
  if(!category){
    //getCategoryById
  }
  
  return(<div className="categoryPage">
    <ArrowBackIosNewIcon onClick={()=>{navigate(-1)}}/>
    <Category category={category}/>
    <div className="categoryPage__movies">
      
    </div>
  </div>)
}

export default CategoryPage;