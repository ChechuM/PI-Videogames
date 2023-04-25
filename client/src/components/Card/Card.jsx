import defaultIcon from '../Form/defaultIcon';
import './Card.css';
import { NavLink } from 'react-router-dom'

export default function Card({ id, name, image, genres }) {
    if (id.length > 10) {
        let gensBdd = genres.map((gen) => gen.name);
        genres = gensBdd.join(', ')
    }
    if (!image) image = defaultIcon.default
    return (
        <div key={id} className='upperDiv'>
            <div className='imgName'>
                <img src={image} alt='This is a Game' className='image' />
                <NavLink to={`/videogames/${id}`}><h2 className='nameGame'> {name} </h2></NavLink>
                <div className='divGenres'> Genres: {genres}</div>
            </div>
        </div>
    )
}
