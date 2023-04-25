import './Boceto.css';
import defaultIcon from '../Form/defaultIcon';


export default function Boceto(props) {

    const { input, errors, generateGame } = props

    let plataformas = input.platforms.join(', ')
    let generos = input.gens.map((gen) => gen.name);

    return (
        <div className='bocetoDiv'>
            {
                input.image
                    ? <img src={input.image} alt='videogame' />
                    : <img src={defaultIcon} alt='default icon' />
            }
            <h3>{input.name}</h3>
            {
                errors.name && <p className='warning'>{errors.name}</p>
            }
            <p>Rating: {input.rating}</p>
            {
                errors.rating && <p className='warning'>{errors.rating}</p>
            }
            <p>{input.description}</p>
            <p>Can be played in: {plataformas}</p>
            {
                errors.platforms && <p className='warning'>{errors.platforms}</p>
            }
            <p>Genres: {generos.join(', ')}</p>
            {
                errors.gens && <p className='warning'>{errors.gens}</p>
            }
            <p>Launched: {input.launch}</p>
            <hr />
            <button onClick={generateGame}>Generate Game</button>
        </div>
    )

}