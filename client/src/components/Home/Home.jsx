// HOME PAGE debe contener:
// * SearchBar: un input de búsqueda para encontrar videojuegos por nombre
// * Sector en el que se vea un listado de cards con los videojuegos. Al iniciar deberá cargar los primeros resultados obtenidos desde la ruta GET /videogames y deberá mostrar su: Imagen, Nombre, Géneros
// * Cuando se le hace click a una Card deberá redirigir al detalle de ese videojuego específico
// * Botones/Opciones para filtrar por género, y por si su origen es de la API o de la base de datos (creados por nosotros desde el formulario)
// * Botones/Opciones para ordenar tanto ascendentemente como descendentemente los videojuegos por orden alfabético y por rating
// * Paginado: el listado de videojuegos se hará por partes. Tu SPA debe contar con un paginado que muestre un total de 15 videojuegos por página -> cargar los primeros 100 juegos

import './Home.css';
import SearchBar from '../SearchBar/SearchBar';
import Cards from '../Cards/Cards'
import { React, useState, useEffect } from 'react';
import axios from 'axios';

export default function Home(props) {
    const [videogames, setVideogames] = useState([])

    // creo otro estado local que setee el nro de página inicial y que luego permita cambiarlo
    const [currentPg, setCurrentPage] = useState(0)

    const ITEMS_PER_PAGE = 15; // cuántos items quiero mostrar por página

    // CARGA EL TOTAL DE JUEGOS EN EL ESTADO LOCAL
    useEffect(() => {
        // fetch('http://localhost:3001/videogames')
        //     .then((response) => response.json())
        //     .then((data) => {
        //         setVideogames((videogames) => [...videogames, ...data])
        //     })
    }, [])

    const nextHandler = () => { // éste handler va a cambiar el nro de página + 1
        console.log('next page');
        let top = (videogames.length / ITEMS_PER_PAGE)
        if (currentPg < top) setCurrentPage((currentPg) => currentPg + 1);
        else return
    }

    const prevHandler = () => {// éste handler va a cambiar el nro de página - 1
        console.log('prev page');
        if (currentPg >= 1) setCurrentPage((currentPg) => currentPg - 1);
        else return
    }

    // setear responsive web

    // para filtar por género voy a tener que usar la BDD
    // géneros: Action, Indie, Adventure, RPG, Strategy, Shooter, Casual, Simulation, Puzzle, Arcade, Platformer, Racing, Missively Multiplayer, Sports, Fighting, Family, Board Games, Educational, Card
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


    return (

        <div className='home'>
            <div className='searchBar'>
                <SearchBar />
            </div>
            <button onClick={() => prevHandler()} className='prevBtn'> prev </button>
            <span> page {currentPg + 1} from {Math.floor(videogames.length / 15) + 1} </span>
            <button onClick={() => nextHandler()} className='nextBtn'> next </button>
            <div className='cards'>
                <Cards videogames={videogames} currentPg={currentPg} ITEMS_PER_PAGE={ITEMS_PER_PAGE} />
            </div>
            <button onClick={() => prevHandler()} className='prevBtn'> prev </button>
            <span> page {currentPg + 1} from {Math.floor(videogames.length / 15) + 1} </span>
            <button onClick={() => nextHandler()} className='nextBtn'> next </button>
        </div>
    )
};
