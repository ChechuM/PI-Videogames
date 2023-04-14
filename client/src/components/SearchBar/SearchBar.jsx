// * SearchBar: un input de búsqueda para encontrar videojuegos por nombre

import './SearchBar.css';
import { useState } from 'react';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

export default function SearchBar(props) {

    const [input, setInput] = useState(0);

    const handleSearch = (event) => {
        let { value } = event.target;
        setInput(value);
    };

    const onSearch = (name) => {
        if (!name) return 'there is no name';
        fetch(`http://localhost:3001/videogames/name?name=${name}`)
            .then((response) => { return response.json() })
            //response es un array de objetos -> tengo que hacer que cambie el estado del componente Home para luego sean éstos los objetos que se rendericen
            .then((response) => {
                // aquí necesito el estado global para poder cambiar el estado videogames desde el SearchBar y desde otros componentes también
                console.log('esta es la respuesta del back al pedido de la fcion onSearch:', response)
            })
    }

    return (
        <div className='barra'>
            <input type='search' className="input" value={input.id} onChange={handleSearch} placeholder=' Search your game by name' /><span> </span>
            <button><Icon icon={faMagnifyingGlass} onClick={() => onSearch(input)} className='add' /></button>
        </div>
    )
}