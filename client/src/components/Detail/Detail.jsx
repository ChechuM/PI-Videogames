import './Detail.css';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

export default function Detail() {
    const { idVideogame } = useParams();
    const navigate = useNavigate();


    const [videogame, setVideogame] = useState({
        id: '',
        name: '',
        image: '',
        platforms: '',
        description: '',
        launch: '',
        rating: '',
        genres: ''
    });

    useEffect(() => {
        fetch(`http://localhost:3001/videogames/${idVideogame}`)
            .then((response) => response.json())
            .then((game) => {
                setVideogame({
                    id: game.id,
                    name: game.name,
                    image: game.image,
                    platforms: game.platforms,
                    description: game.description,
                    launch: game.launch,
                    rating: game.rating,
                    genres: game.genres
                })
            })
    }, [idVideogame])

    return (
        <div className='total'>
            <button onClick={() => { navigate('/videogames') }} className='homeBtn'><Icon icon={faHome} /> </button>
            <div className='game'>
                <img src={videogame.image} alt='videogames image' className='detailImage' />
                <div className='textos'>
                    <h1>{videogame.name}</h1>
                    <p>id: {videogame.id}</p>
                    <div>{videogame.description} launched on {videogame.launch}</div>
                    <p> Genres: {videogame.genres}</p>
                    <p> You can play it in: {videogame.platforms}</p>
                    <h3> Rating: {videogame.rating}</h3>
                </div>
            </div>
        </div>
    )
};
