// Formulario para crear un nuevo videojuego. Debe ser controlado completamente con JavaScritp. No se pueden utilizar validaciones HTML, ni utilizar librerías especiales para esto. Debe contar con los siguientes campos:
// Nombre
// Imagen
// Descripción 
// Plataformas
// Fecha de lanzamiento
// Rating
// Posibilidad de seleccionar/agregar varios géneros en simultáneo
// Botón para crear el nuevo videojuego.

// [IMPORANTE]: es requisito que el formulario de creación esté validado sólo con JavaScript. Puedes agregar las validaciones que consideres. Por ejemplo: que el nombre del videojuego no pueda contener símbolos, o que el rating no pueda exceder determinado valor, etc.

import './Create.css';
import Form from '../Form/Form';
import Boceto from '../Boceto/Boceto';
import { React, useState } from 'react';
import { useDispatch } from 'react-redux';
import defaultIcon from '../Form/defaultIcon';
import * as actions from '../../redux/actions';

export function validate({ name, rating, platforms, gens }) {

    const specialChars = /[`!@#$%^&*()_+\-=\]{};':"\\|,.<>?~]/;
    let errors = {};
    if (!name) errors.name = 'Please write the name of the game';
    if (name.length > 20) errors.name = 'Name must have 20 characters max';
    if (specialChars.test(name)) errors.name = 'Name must be alphanumeric only';
    if (rating > 5 || !rating) errors.rating = 'Rating must be a number from 0 to 5';
    if (platforms.length === 0) errors.platforms = 'Please pick at least one platform from the list';
    if (gens.length === 0) errors.gens = 'Please pick at least one genre from the list';
    return errors;
}

export default function Create() {
    const dispatch = useDispatch();

    const [input, setInput] = useState({
        name: '',
        image: '',
        platforms: [],
        launch: '',
        rating: '',
        gens: [],
        description: ''
    });

    const [errors, setErrors] = useState({
        name: '',
        rating: '',
        platforms: [],
        gens: []
    });

    const handleInputChange = (event) => {
        const { value, name } = event.target;
        setInput({
            ...input,
            [name]: value
        })
        setErrors(
            validate({
                ...input,
                [name]: value
            })
        )
    };

    const generateGame = () => {
        if (!input.image) {
            setInput(current => (
                {
                    ...current,
                    image: defaultIcon
                })
            )
        }
        if (!input.launch) {
            let defLaunch = '2023-05-02'
            setInput(current => (
                {
                    ...current,
                    launch: defLaunch
                }
            ))
        }
        if (!input.description) {
            let description = `${input.name} is a game that can be played in ${input.platforms.length} different platforms: ${input.platforms.join(', ')} `
            setInput(current => (
                {
                    ...current,
                    description: description
                }
            ))
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const errors = validate(input);
        if (Object.values(errors).length === 0) {
            dispatch(actions.addGame(input))
            alert('New game created!')
        }
        else {
            setErrors(errors);
            alert('The new game has to fulfill certain parameters, please check that everything is ok')
        }
    }

    return (
        <div className='bothDiv'>
            <Form handleInputChange={handleInputChange} input={input} setInput={setInput} errors={errors} setErrors={setErrors} handleSubmit={handleSubmit} />
            <Boceto input={input} errors={errors} generateGame={generateGame} setInput={setInput} />
        </div>
    )
}
