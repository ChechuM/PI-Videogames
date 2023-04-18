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

export function validate(rating) {
    console.log('entré a la fción validate')
    let errors = {};
    if (rating > 5 || rating < 0) errors.rating = 'Rating must be a number from 0 to 5'; // rating es un string, creo que puedo compararlo
}

export default function Create() {
    const [input, setInput] = useState({
        name: '',
        image: '',
        platforms: '',
        launch: '',
        rating: '',
        genres: '',
        description: ''
    });

    const [errors, setErrors] = useState({
        rating: ''
    });

    const handleInputChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;
        setInput({
            ...input,
            [name]: value
        })
    };

    const descripcion = `${input.name} is a ${input.genres} game with a rating of ${input.rating}`;
    const checkingSelect = (event) => {
        let genArray = event.map((gen) => gen.value)
        let genString = genArray.join(', ')
        setInput({
            ...input,
            genres: genString,
            description: descripcion
        })
    }

    const agreeDesc = () => {
        setInput({
            ...input,
            description: descripcion
        })
    }

    return (
        <div className='bothDiv'>
            <Form checkingSelect={checkingSelect} handleInputChange={handleInputChange} input={input} errors={errors} />
            <Boceto input={input} errors={errors} agreeDesc={agreeDesc} descripcion={descripcion} />
        </div>

    )
};
