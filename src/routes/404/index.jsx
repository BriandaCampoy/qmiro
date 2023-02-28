import './style.css';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';
function Error404(){

  const navigate = useNavigate()

  return(<div className="page404">
  <h1>Error 404 not found</h1>
  <button onClick={()=>{navigate('/')}}><HomeIcon fontSize='large'/></button>
  </div>)
}

export default Error404;