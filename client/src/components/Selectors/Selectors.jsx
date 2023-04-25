
// para filtar por género voy a tener que usar la BDD
// la idea sería setear el estado videogames con los videojuegos que me devuelva la BDD y renderizarlo

// para filtrar los games por si es de la API o BDD : -> uso Select 
// creo un desplegable que tenga tres opciones: todos/Api/BDD -> con la posibilidad de seleccionar 
// obtengo la selección y de ahí digo:
// si selección === BDD -> setVideogames (videogames = videogames.filter((game)=>{ game.id.length > 10}))
// si selección === API -> setVideogames (videogames = videogames.filter ((game) => {game.id.length < 10}))
// si selección === todos -> setVideogames como en el useEffect del inicio

// para ordenar ascendentemente/ descendientemente por nombre :
// creo un desplegable que diga on top: order by name - con las opciones ascendente/descendente
// obtengo la selección y de ahí digo:
// buscar cómo ordenar alfabéticamente 
// setVideogame en orden

// para ordenar ascendentemente/ descendientemente por rating:
// creo un desplegable que diga on top: order by rating - con las opciones ascendente/descendente
// obtengo la selección y de ahí digo:
// buscar cómo ordenar por número
// setVideogame en orden

import './Selectors.css';
import { useSelector } from 'react-redux';

export default function Selectors() {
    const genres = useSelector(store => store.genres);

    return (
        <div className='bigDiv'>
            <div className='selectGenre'>
                <span className='spanTitle'>Filter by Genre: </span>
                <select className='selectBar'>
                    <option value="selectGenre">Select a genre...</option>
                    {
                        genres.map((g) => {
                            return <option value={g.name}>{g.name}</option>
                        })
                    }
                </select>
            </div>
            <div className='selectOrigin'>
                <span className='spanTitle'>Filter by Origin: </span>
                <select className='selectBar'>
                    <option value="selectOrigin">Select origin...</option>
                    <option value="API">From Api</option>
                    <option value="BDD">Created by User</option>
                </select>
            </div>
            <div className='orderByName'>
                <span className='spanTitle'>Order by Name: </span>
                <select className='selectBar'>
                    <option value="orderByName">Select order...</option>
                    <option value="ascName">From A to Z</option>
                    <option value="descName">From Z to A</option>
                </select>
            </div>
            <div className='orderByRating'>
                <span className='spanTitle'>Order by Rating: </span>
                <select className='selectBar'>
                    <option value="orderByRating">Select order...</option>
                    <option value="ascRating">From 0 to 5</option>
                    <option value="descRating">From 5 to 0</option>
                </select>
            </div>
        </div>
    )
}