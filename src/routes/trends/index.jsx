import { ListMore } from '../../components/pagination';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/footer';
import './style.css';

function Trends() {
  const navigate = useNavigate();
  return (
    <>
      <div className="trendsPage">
        <div className="trendsPage__header">
          <ArrowBackIosNewIcon
            onClick={() => {
              navigate('/');
            }}
          />
        <h3>Trends</h3>
        </div>
      </div>
      <ListMore/>
      <Footer/>
    </>
  );
}

export default Trends;
