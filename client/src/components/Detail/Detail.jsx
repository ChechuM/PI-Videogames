import './Detail.css';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

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
            <button onClick={() => { navigate('/videogames') }} className='homeBtn'><span className='spanHome'> <Icon icon={faArrowLeft} />  back home! </span><Icon icon={faHome} /></button>
            <div className='detailTotal'>
                <div className='nameImgId'>
                    <h1 className='detailName'>{videogame.name}</h1>
                    <img src={videogame.image} alt='videogames image' className='detailImage' />
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
