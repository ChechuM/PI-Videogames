import './Form.css';
import { React, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import * as actions from '../../redux/actions';

export function validate({ platforms, gens }) {
    let errors = {}
    if (platforms.length === 0) errors.platforms = 'Please pick at least one platform from the list';
    if (gens.length === 0) errors.gens = 'Please pick at least one genre from the list';
    return errors;
}

export default function Form(props) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(actions.getAllGenres())
    }, [dispatch])

    const genres = useSelector(store => store.genres); // es un array de objetos [{id: x, name: ''}]
    const { input, setInput, handleInputChange, setErrors, handleSubmit } = props;

    const platforms = ['PC', 'PS', 'Xbox', 'Nintendo', 'iOS', 'Android', 'MacOS', 'Linux', 'Wii', 'GameCube', 'Game Boy', 'Atari', 'Genesis', 'SEGA']

    const handlePlat = (event) => {
        let { value, checked, name } = event.target
        if (checked) {
            setInput(current => ({
                ...current,
                platforms: [...current.platforms, value]
            }))
        }
        if (!checked) {
            setInput({
                ...input,
                platforms: input.platforms.filter((plat) => plat !== value)
            })

        }
        setErrors(
            validate({
                ...input,
                [name]: value
            })
        )
    }

    const handleGens = (event) => {
        let { value, checked, id, name } = event.target
        if (checked) {
            setInput(current => (
                {
                    ...current,
                    gens: [...current.gens, { id: id, name: value }]
                }
            ))
        }
        if (!checked) {
            setInput(current => (
                {
                    ...current,
                    gens: current.gens.filter((gen) => gen.name !== value)
                }
            ))
        }
        setErrors(
            validate({
                ...input,
                [name]: value
            })
        )
    }

    return (
        <div className='formDiv'>
            <form onSubmit={handleSubmit}>
                <label>Name: </label>
                <input
                    className='inputGral'
                    name='name'
                    placeholder='Name of the game...'
                    type='text'
                    onChange={handleInputChange}
                    value={input.name}>
                </input>
                <hr />
                <label>Image: </label>
                <input
                    className='inputGral'
                    name='image'
                    placeholder='Copy the url of a cool image of the game...'
                    type='text'
                    onChange={handleInputChange} >
                </input>
                <hr />
                <label>Launch: </label>
                <input
                    className='inputGral'
                    name='launch'
                    type='date'
                    onChange={handleInputChange}
                    value={input.launch}>
                </input>
                <hr />
                <label>Rating: </label>
                <input
                    className='inputGral'
                    name='rating'
                    placeholder='Set initial rating (pick a number from 0-5)'
                    type='text'
                    onChange={handleInputChange}
                    value={input.rating}>
                </input>
                <hr />
                <label>Platforms: </label>
                <div className='platformsCheck'>
                    {
                        platforms.map((plat) => {
                            return <p>{plat}<input
                                className='platCheck'
                                name='platforms'
                                type='checkbox'
                                onChange={handlePlat}
                                value={plat} /></p>
                        })
                    }
                </div>
                <hr />
                <label>Genres: </label>
                <div className='platformsCheck'>
                    {
                        genres.map((gen) => {
                            return <p>{gen.name} <input
                                className='platCheck'
                                name='gens'
                                id={gen.id}
                                type='checkbox'
                                onChange={handleGens}
                                value={gen.name} /> </p>
                        })
                    }
                </div>
                <hr />
                <label>Description: </label>
                <textarea
                    className='inputGral'
                    name='description'
                    placeholder='Write what you want about the game...'
                    type='textarea'
                    onChange={handleInputChange}
                    value={input.description}>
                </textarea>
                <hr />
                <button className='newGame' onClick={handleSubmit}><Icon icon={faSquarePlus} /></button>
            </form>
        </div >
    )
}
