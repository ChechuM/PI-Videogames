import './Detail.css';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";


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
            <div className='detailTotal'>
                <div className='nameImgId'>
                    <h1 className='detailName'>{videogame.name}</h1>
                    <img src={videogame.image} alt='videogame' className='detailImage' />
                    <p className='idDetail'>id: {videogame.id}</p>
                </div>
                <div className='textos'>
                    <div className='description'>{videogame.description} launched on {videogame.launch}</div>
                    <p> Genres: {videogame.genres}</p>
                    <p> You can play it in: {videogame.platforms}</p>
                    <h3> Rating: {videogame.rating}</h3>
                </div>
            </div>
        </div>
    )
};
