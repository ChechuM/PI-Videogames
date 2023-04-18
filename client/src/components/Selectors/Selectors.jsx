
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

export default function Selectors() {
    return (
        <div className='bigDiv'>
            <div className='selectGenre'>
                <span className='spanTitle'>Filter by Genre: </span>
                <select className='selectBar'>
                    <option value="selectGenre">Select a genre...</option>
                    <option value="action">Action</option>
                    <option value="indie">Indie</option>
                    <option value="adventure">Adventure</option>
                    <option value="RPG">RPG</option>
                    <option value="strategy">Strategy</option>
                    <option value="shooter">Shooter</option>
                    <option value="casual">Casual</option>
                    <option value="simulation">Simulation</option>
                    <option value="puzzle">Puzzle</option>
                    <option value="arcade">Arcade</option>
                    <option value="platformer">Platformer</option>
                    <option value="racing">Racing</option>
                    <option value="multiplayer">Missively Multiplayer</option>
                    <option value="sports">Sports</option>
                    <option value="fighting">Fighting</option>
                    <option value="family">Family</option>
                    <option value="board">Board Games</option>
                    <option value="educational">Educational</option>
                    <option value="card">Card</option>
                </select>
            </div>
            <div className='selectOrigin'>
                <span className='spanTitle'>Filter by Origin: </span>
                <select className='selectBar'>
                    <option value="selectOrigin">Select origin...</option>
                    <option value="API">API</option>
                    <option value="BDD">BDD</option>
                </select>
            </div>
            <div className='orderByName'>
                <span className='spanTitle'>Order by Name: </span>
                <select className='selectBar'>
                    <option value="orderByName">Select order...</option>
                    <option value="ascName">Ascendente</option>
                    <option value="descName">Descendente</option>
                </select>
            </div>
            <div className='orderByRating'>
                <span className='spanTitle'>Order by Rating: </span>
                <select className='selectBar'>
                    <option value="orderByRating">Select order...</option>
                    <option value="ascRating">Ascendente</option>
                    <option value="descRating">Descendente</option>
                </select>
            </div>
        </div>
    )
}