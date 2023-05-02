// HOME PAGE debe contener:
// * SearchBar: un input de búsqueda para encontrar videojuegos por nombre
// * Sector en el que se vea un listado de cards con los videojuegos. Al iniciar deberá cargar los primeros resultados obtenidos desde la ruta GET /videogames y deberá mostrar su: Imagen, Nombre, Géneros
// * Cuando se le hace click a una Card deberá redirigir al detalle de ese videojuego específico
// * Botones/Opciones para filtrar por género, y por si su origen es de la API o de la base de datos (creados por nosotros desde el formulario)
// * Botones/Opciones para ordenar tanto ascendentemente como descendentemente los videojuegos por orden alfabético y por rating
// * Paginado: el listado de videojuegos se hará por partes. Tu SPA debe contar con un paginado que muestre un total de 15 videojuegos por página -> cargar los primeros 100 juegos

import './Home.css';
import Cards from '../Cards/Cards'
import { React, useState, useEffect } from 'react';
import * as actions from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';


export default function Home(props) {
    const videogames = useSelector(store => store.videogames)
    const dispatch = useDispatch();

    // No quiero que este useEffect se despache cada vez que entro en esta página ... quizás puedo lanzarlo si detecto que videogames está vacío, pero que no lo haga si ya tiene info -> porque significa que ya está seteado para que renderice algo -> pero mejor es que lo haga si hay cambios!
    useEffect(() => {
        // if (videogames.length === 0) 
        dispatch(actions.getAllGames())
        dispatch(actions.getAllGenres())
    }, [])

    // PAGINADO: creo otro estado local que setee el nro de página inicial y que luego permita cambiarlo
    const [currentPg, setCurrentPage] = useState(0)

    const ITEMS_PER_PAGE = 15; // cuántos items quiero mostrar por página

    const nextHandler = () => { // éste handler va a cambiar el nro de página + 1
        let top = (videogames.length / ITEMS_PER_PAGE)
        if (currentPg < top) setCurrentPage((currentPg) => currentPg + 1);
        else return
    }

    const prevHandler = () => {// éste handler va a cambiar el nro de página - 1
        if (currentPg >= 1) setCurrentPage((currentPg) => currentPg - 1);
        else return
    }

    return (

        <div className='home'>
            <button onClick={() => prevHandler()} className='prevBtn'> prev </button>
            <span> page {currentPg + 1} from {Math.floor(videogames.length / 15) + 1} </span>
            <button onClick={() => nextHandler()} className='nextBtn'> next </button>
            <div className='cards'>
                <Cards currentPg={currentPg} ITEMS_PER_PAGE={ITEMS_PER_PAGE} />
            </div>
            <button onClick={() => prevHandler()} className='prevBtn'> prev </button>
            <span> page {currentPg + 1} from {Math.floor(videogames.length / 15) + 1} </span>
            <button onClick={() => nextHandler()} className='nextBtn'> next </button>
        </div>
    )
};
