import './Landing.css';
// Página de inicio o bienvenida con:
// * Imagen de fondo representativa al proyecto.
// * Botón para ingresar a la home page.
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faGamepad } from '@fortawesome/free-solid-svg-icons';


export default function Landing(props) {
    return (
        <div className='landing'>
            <button onClick={() => { props.goHome() }} className='start'><span><Icon icon={faGamepad} /> Start</span> </button>
            <div className='top'>Proyect by Cecilia Moroni for <img src='https://pbs.twimg.com/profile_images/1542845396032135168/o5AmaQyh_400x400.jpg' alt='logoHenry' className='logoHenry' /></div>
        </div>
    )
};
