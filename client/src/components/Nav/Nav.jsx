import './Nav.css';
import SearchBar from '../SearchBar/SearchBar';
import Selectors from '../Selectors/Selectors';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faHome, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export default function Nav() {
    const location = useLocation();
    const navigate = useNavigate();

    return (
        <div className='navBar'>
            {location.pathname !== '/videogames/newgame' && <SearchBar />}
            {location.pathname !== '/videogames' && <button onClick={() => { navigate(-1) }} className='homeBtn'><span className='spanHome'> <Icon icon={faArrowLeft} />  back home! </span><Icon icon={faHome} /></button>}
            {location.pathname !== '/videogames/newgame' && <Selectors />}
        </div>

    )
}