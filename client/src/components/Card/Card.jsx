import './Card.css';
import { NavLink } from 'react-router-dom'

export default function Card({ id, name, image, genres }) {
    let genString;
    if (typeof id === 'string') {
        let genArr = genres.map((gen) => gen.name)
        genString = genArr.join(', ')
    }
    if (typeof id === 'number') {
        genString = genres.join(', ')
    }
    return (
        <div key={id} className='upperDiv'>
            <div className='imgName'>
                <img src={image} alt='This is a Game' className='image' />
                <NavLink to={`/videogames/${id}`}><h2 className='nameGame'> {name} </h2></NavLink>
                <div className='divGenres'> Genres: {genString}</div>
            </div>
        </div>
    )
}
