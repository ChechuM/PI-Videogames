import './Detail.css';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";


export default function Detail() {
    const { idVideogame } = useParams();

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
                if (game.id.length > 10) {
                    let genres = game.genres.map((gen) => gen.name);
                    game.gens = genres.join(', ')

                    game.platforms = game.platforms.join(', ')
                }
                setVideogame({
                    id: game.id,
                    name: game.name,
                    image: game.image,
                    platforms: game.platforms,
                    description: game.description,
                    launch: game.launch,
                    rating: game.rating,
                    genres: game.gens
                })
            })
    }, [idVideogame])

    return (
        <div className='total'>
            <p className='idDetail'>id: {videogame.id}</p>
            <h1 className='detailName'>{videogame.name}</h1>
            <img src={videogame.image} alt='videogame' className='detailImage' />
            <h3> Rating: {videogame.rating}</h3>
            <p className='genPlat'> Genres: {videogame.genres}</p>
            <p className='description'>{videogame.description}</p>
            <p className='genPlat'> You can play it in: {videogame.platforms}</p>
            <p className='launchDetail'> Launch: {videogame.launch}</p>
            <p className='launchDetail'> Launched: {(new Date(videogame.launch)).toDateString()}</p>
            <p className='launchDetail'> localLaunched: {(new Date(videogame.launch)).toLocaleDateString()}</p>

        </div>
    )
};
