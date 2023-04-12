// HOME PAGE debe contener:
// * SearchBar: un input de búsqueda para encontrar videojuegos por nombre
// * Sector en el que se vea un listado de cards con los videojuegos. Al iniciar deberá cargar los primeros resultados obtenidos desde la ruta GET /videogames y deberá mostrar su: Imagen, Nombre, Géneros
// *Cuando se le hace click a una Card deberá redirigir al detalle de ese videojuego específico
// * Botones/Opciones para filtrar por género, y por si su origen es de la API o de la base de datos (creados por nosotros desde el formulario)
// * Botones/Opciones para ordenar tanto ascendentemente como descendentemente los videojuegos por orden alfabético y por rating
// * Paginado: el listado de videojuegos se hará por partes. Tu SPA debe contar con un paginado que muestre un total de 15 videojuegos por página -> cargar los primeros 100 juegos

import './Home.css';
import SearchBar from '../SearchBar/SearchBar';
import Cards from '../Cards/Cards'
import { React, useState, useEffect } from 'react';

export default function Home(props) {
    const [videogames, setVideogames] = useState([])

    useEffect(() => {
        fetch('http://localhost:3001/videogames')
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                setVideogames((videogames) => [...videogames, ...data])
            })
    }, [])

    return (
        <div className='home'>
            <div className='searchBar'>
                <SearchBar onSearch={props.onSearch} />
            </div>
            <div className='cards'>
                <Cards videogames={videogames} />
            </div>
        </div>
    )
};
