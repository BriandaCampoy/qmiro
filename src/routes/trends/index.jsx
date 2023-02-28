import { ListMore } from '../../components/pagination';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useNavigate } from 'react-router-dom';

function Trends() {
  const navigate = useNavigate();
  return (
    <>
      <div className="categoryPage">
        <ArrowBackIosNewIcon
          onClick={() => {
            navigate('/');
          }}
        />
      </div>
      <h3>Trends</h3>
      <ListMore />
    </>
  );
}

export default Trends;
