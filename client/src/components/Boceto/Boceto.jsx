import './Boceto.css';

export default function Boceto(props) {

    const { input, errors } = props

    return (
        <div className='bocetoDiv'>
            {
                input.image && <img src={input.image} alt='videogame' />
            }
            <h3>{input.name}</h3>
            <p>Rating: {input.rating}</p>
            <p>{input.description}</p>
            <p>Can be played in: {input.platforms}</p>
            <p>Genres: {input.genres}</p>
        </div>
    )

}