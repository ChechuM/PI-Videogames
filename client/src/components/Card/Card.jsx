import './Card.css';
import { NavLink } from 'react-router-dom'

export default function Card({ id, name, image, genres }) {
    console.log('así llega props a Card:', id, name, image, genres)
    return (
        <div key={id} className='upperDiv'>
            <div className='imgName'>
                <img src={image} alt='This is a Game' className='image' />
                <NavLink to={`/${id}`}><h2 className='nameGame'> {name} </h2></NavLink>
                <div className='divGenres'> Genres: {genres}</div>
            </div>
        </div>
    )
}
